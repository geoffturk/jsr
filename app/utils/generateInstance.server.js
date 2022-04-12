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
        profile[name] = profile[name].map(item => item.trim())
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
      } else if (name.includes('-')) {
        let names = name.split('-')
        let currentObj = profile

        // The format is fieldName-id-objectName
        // The first element is fieldName[]
        if (currentObj[names[0]] === undefined || currentObj[names[0]] === 0) {
          currentObj[names[0]] = []
        }
        currentObj = currentObj[names[0]]

        // The rest is as same as object
        for (let i = 1; i < names.length; i++) {
          if (i === names.length - 1) {
            currentObj[names[i]] = data[name]
          } else {
            if (
              currentObj[names[i]] === undefined ||
              currentObj[names[i]] === 0
            ) {
              currentObj[names[i]] = {}
            }
            currentObj = currentObj[names[i]]
          }
        }
      } else {
        profile[name] = data[name]
      }
    })
  console.log(profile)
  return profile
}
