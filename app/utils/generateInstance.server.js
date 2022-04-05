export default function generateInstance(schema, data) {
  let profile = {}

  Object.keys(data)
    .filter(name => data[name] !== '')
    .map(name => {
      if (schema.properties[name]?.type === 'number') {
        profile[name] = parseInt(data[name])
      } else if (
        schema.properties[name]?.type === 'array' &&
        schema.properties[name].items.type === 'string' &&
        !schema.properties[name].items.enum
      ) {
        profile[name] = data[name].split(',')
      } else if (name.includes('.')) {
        let names = name.split('.')
        let currentObj = profile
        let currentSchema = schema

        for (let i = 0; i < names.length; i++) {
          if (i === names.length - 1) {
            if (currentSchema.properties[names[i]]?.type === 'number') {
              currentObj[names[i]] = parseInt(data[name])
            } else {
              currentObj[names[i]] = data[name]
            }
          } else {
            if (
              currentObj[names[i]] === undefined ||
              currentObj[names[i]] === 0
            ) {
              currentObj[names[i]] = {}
            }
            currentObj = currentObj[names[i]]
            currentSchema = schema.properties[names[i]]
          }
        }
      } else {
        profile[name] = data[name]
      }
    })
  return profile
}
