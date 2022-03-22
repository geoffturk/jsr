import EnumField from '~/components/EnumField'
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
    } else if (type === 'string') {
      if (schema.properties[name].enum) {
        let enumList = schema.properties[name].enum
        return (
          <EnumField name={name} title={title} enumList={enumList} key={name} />
        )
      }
      return <FormField name={name} type={type} title={title} key={name} />
    } else if (type === 'number') {
      return <FormField name={name} type={type} title={title} key={name} />
    } else {
      console.error('Undefined type in generateForm')
    }
  })
}
