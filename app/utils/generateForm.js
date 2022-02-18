import FormField from '~/components/FormField'

export default function generateForm(schema) {
  return Object.keys(schema.properties).map(name => {
    let title = schema.properties[name].title
    let type = schema.properties[name].type
    if (
      type === 'object' ||
      type === 'array' ||
      type === 'boolean' ||
      type === 'null'
    ) {
      return null
    } else {
      return <FormField name={name} type={type} title={title} key={name} />
    }
  })
}
