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
      } else if (name.includes('-')) {
        profile = parseArrayObject(name, data[name], schema, profile)
      } else {
        profile[name] = data[name]
      }
    })
  return profile
}

function parseArrayObject(fieldName, fieldData, schema, profile) {
  if (!fieldName.includes('-')) {
    profile[fieldName] = fieldData
  } else {
    let arrayFields = fieldName.split('-')
    let currentProfile = profile
    let currentSchema = schema

    for (let i = 0; i < arrayFields.length; i++) {
      // last item of array comes with value
      if (i === arrayFields.length - 1) {
        if (currentSchema.properties[arrayFields[i]]?.type === 'array') {
          let newArray = []
          newArray.push(fieldData)
          currentProfile[arrayFields[i]] = newArray
        } else if (
          currentSchema.properties[arrayFields[i]]?.type === 'number'
        ) {
          currentProfile[arrayFields[i]] = parseInt(fieldData)
        } else {
          currentProfile[arrayFields[i]] = fieldData
        }
      } else {
        // check is number or not
        if (
          !isNaN(arrayFields[i + 1]) &&
          (currentProfile[arrayFields[i]] === undefined ||
            currentProfile[arrayFields[i]] === 0)
        ) {
          currentProfile[arrayFields[i]] = []
        }

        if (
          currentProfile[arrayFields[i]] === undefined ||
          currentProfile[arrayFields[i]] === 0
        ) {
          currentProfile[arrayFields[i]] = {}
        }
        currentProfile = currentProfile[arrayFields[i]]

        if (!isNaN(arrayFields[i])) {
          currentSchema = currentSchema.items
        } else {
          currentSchema = currentSchema.properties[arrayFields[i]]
        }
      }
    }
  }
  return profile
}
