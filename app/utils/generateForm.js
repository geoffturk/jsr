import React from 'react'

import EnumField from '../components/EnumField'
import FormField from '../components/FormField'
import MultipleFormField from '../components/MultipleFormField'

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
      let strName = name
      if (objName) strName = objName + '.' + name
      if (schema.properties[name].enum) {
        let enumList = schema.properties[name].enum
        let enumNamesList = schema.properties[name].enumNames
        return (
          <EnumField
            name={strName}
            title={title}
            enumList={enumList}
            enumNamesList={enumNamesList}
            key={strName}
          />
        )
      }
      let maxLength = schema.properties[name].maxLength
      let minLength = schema.properties[name].minLength
      let pattern = schema.properties[name].pattern
      return (
        <FormField
          name={strName}
          type={type}
          title={title}
          maxlength={maxLength}
          minlength={minLength}
          pattern={pattern}
          key={strName}
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
        let strName = name
        if (objName) strName = objName + '.' + name
        if (schema.properties[name].items.enum) {
          let enumList = schema.properties[name].items.enum
          let enumNamesList = schema.properties[name].items.enumNames
          return (
            <EnumField
              name={strName}
              title={title}
              enumList={enumList}
              enumNamesList={enumNamesList}
              key={strName}
              multi={true}
            />
          )
        } else {
          return (
            <FormField name={strName} type={type} title={title} key={strName} />
          )
        }
      } else if (schema.properties[name].items.type === 'object') {
        let objProperties = replaceObjNames(
          schema.properties[name].items.properties,
          {}
        )
        let strName = name
        if (objName) strName = objName + '.' + name
        let maxItems = schema.properties[name].maxItems
        return (
          <MultipleFormField
            name={strName}
            title={title}
            key={strName}
            objects={objProperties}
            maxItems={maxItems}
          />
        )
      }
    } else if (type === 'boolean' || type === 'null') {
      return null
    } else if (type === 'object') {
      if (objName) {
        objName = objName + '.' + name
        return generateForm(schema.properties[name], objName)
      }
      return generateForm(schema.properties[name], name)
    } else {
      console.error('Undefined type in generateForm')
    }
  })
}

// replace obj names with specific format
function replaceObjNames(objProperties, newObjProperties, parentName) {
  if (objProperties === undefined) {
    return newObjProperties
  }

  Object.keys(objProperties).map(name => {
    let newObjName = name
    if (parentName) newObjName = parentName + '.' + name
    if (objProperties[name].type === 'object') {
      newObjProperties = replaceObjNames(
        objProperties[name].properties,
        newObjProperties,
        newObjName
      )
    } else {
      newObjProperties[newObjName] = objProperties[name]
    }
  })

  return newObjProperties
}
