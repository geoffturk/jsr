export default function generateInstance(schema, data) {
  let profile = {}

  Object.keys(data)
    .filter(name => data[name] !== '')
    .map(
      name => {
          if (schema.properties[name]?.type === 'number') {
              profile[name] = parseInt(data[name])
          } else if (schema.properties[name]?.type === 'array' && schema.properties[name].items.type === 'string' && !schema.properties[name].items.enum) {
              profile[name] = data[name].split(',')
          } else if (name.includes('.')) {
              let names = name.split('.')
              let currentObj = profile
              for (let i = 0; i < names.length; i++) {
                  if (i === names.length - 1) {
                      // todo: type need to be matched, don't know how to check the type
                      currentObj[names[i]] = parseInt(data[name])
                  } else {
                      if (currentObj[names[i]] === undefined || currentObj[names[i]] === 0) {
                          currentObj[names[i]] = {}
                      }
                      currentObj = currentObj[names[i]]
                  }
              }
          } else {
              profile[name] = data[name]
          }
      }
    )
  console.log(profile)
  return profile
}
