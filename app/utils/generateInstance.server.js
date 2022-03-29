export default function generateInstance(schema, data) {
  let profile = {}

  Object.keys(data)
    .filter(name => data[name] !== '')
    .map(
      name =>
        (profile[name] =
          schema.properties[name]?.type === 'number'
            ? parseInt(data[name])
            : schema.properties[name]?.type === 'array' &&
              schema.properties[name].items.type === 'string' &&
              !schema.properties[name].items.enum
            ? data[name].split(',')
            : name.includes('.')
            ? console.log(data[name])
            : data[name])
    )
  console.log(profile)
  return profile
}
