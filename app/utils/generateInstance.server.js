export default function generateInstance(schema, data) {
  let profile = {}

  Object.keys(data)
    .filter(name => data[name] !== '')
    .map(
      name =>
        (profile[name] =
          schema.properties[name].type === 'number'
            ? parseInt(data[name])
            : data[name])
    )

  return profile
}
