import EnumField from '~/components/EnumField'
import FormField from '~/components/FormField'

export default function generateForm(schema) {
  return Object.keys(schema.properties).map(name => {
    let title = schema.properties[name].title
    let type = schema.properties[name].type
    if (type === 'string') {
      if (schema.properties[name].enum) {
        let enumList = schema.properties[name].enum
        return (
          <EnumField name={name} title={title} enumList={enumList} key={name} />
        )
      }
      let maxLength = schema.properties[name].maxLength
      let minLength = schema.properties[name].minLength
      return (
        <FormField
          name={name}
          type={type}
          title={title}
          maxlength={maxLength}
          minlength={minLength}
          key={name}
        />
      )
    } else if (type === 'number') {
      let max = schema.properties[name].maximum
      let min = schema.properties[name].minimum
      return (
        <FormField
          name={name}
          type={type}
          title={title}
          max={max}
          min={min}
          key={name}
        />
      )
    } else if (
      type === 'array' ||
      type === 'object' ||
      type === 'boolean' ||
      type === 'null'
    ) {
      return null
    } else {
      console.error('Undefined type in generateForm')
    }
  })
}
