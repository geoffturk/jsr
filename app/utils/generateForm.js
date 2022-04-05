import React from 'react'

import EnumField from '../components/EnumField'
import FormField from '../components/FormField'

export default function generateForm(schema, objName) {
  if (!schema.properties) return null
  return Object.keys(schema.properties).map(name => {
    if (name === 'linked_schemas') {
      return (
        <input
          type="hidden"
          name="linked_schemas"
          key="linked_schemas"
          value={schema.metadata.schema.name}
        />
      )
    }
    let title = schema.properties[name].title
    let type = schema.properties[name].type
    if (type === 'string') {
      if (schema.properties[name].enum) {
        let enumList = schema.properties[name].enum
        let enumNamesList = schema.properties[name].enumNames
        return (
          <EnumField
            name={name}
            title={title}
            enumList={enumList}
            enumNamesList={enumNamesList}
            key={name}
          />
        )
      }
      let maxLength = schema.properties[name].maxLength
      let minLength = schema.properties[name].minLength
      let pattern = schema.properties[name].pattern
      return (
        <FormField
          name={name}
          type={type}
          title={title}
          maxlength={maxLength}
          minlength={minLength}
          pattern={pattern}
          key={name}
        />
      )
    } else if (type === 'number') {
      let max = schema.properties[name].maximum
      let min = schema.properties[name].minimum
      let numName = name
      if (objName) numName = objName + '.' + name
      return (
        <FormField
          name={numName}
          type={type}
          title={title}
          max={max}
          min={min}
          key={numName}
        />
      )
    } else if (type === 'array') {
      if (schema.properties[name].items.type === 'string') {
        if (schema.properties[name].items.enum) {
          let enumList = schema.properties[name].items.enum
          let enumNamesList = schema.properties[name].items.enumNames
          return (
            <EnumField
              name={name}
              title={title}
              enumList={enumList}
              enumNamesList={enumNamesList}
              key={name}
              multi={true}
            />
          )
        } else {
          return <FormField name={name} type={type} title={title} key={name} />
        }
      }
    } else if (type === 'boolean' || type === 'null') {
      return null
    } else if (type === 'object') {
      return generateForm(schema.properties[name], name)
    } else {
      console.error('Undefined type in generateForm')
    }
  })
}
