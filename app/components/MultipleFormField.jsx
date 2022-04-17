import React, { useState } from 'react'

export default function MultipleFormField({
  description,
  max,
  maxlength,
  min,
  minlength,
  name,
  pattern,
  title,
  maxItems,
  objects,
  objTitle,
  objDescription
}) {
  // Initialize an empty object
  // Format is fieldName-id-objectName
  let fields = {}
  Object.keys(objects).map(obj => {
    let objName = name + '-0-' + obj
    if (obj === 'TYPE') {
      objName = name + '-0'
    }
    fields[objName] = ''
  })

  const [inputList, setInputList] = useState([fields])

  const handleChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const handleAddInput = index => {
    let addFields = {}
    Object.keys(objects).map(obj => {
      let objName = name + '-' + (index + 1) + '-' + obj
      if (obj === 'TYPE') {
        objName = name + '-' + (index + 1)
      }
      addFields[objName] = ''
    })
    setInputList([...inputList, addFields])
  }

  const handleRemoveInput = index => {
    const list = [...inputList]
    list.splice(index, 1)

    // reorder the list after delete
    list.map((l, lIndex) => {
      for (const object in l) {
        let oldIndex = object.replace(/[^0-9]/g, '')
        let newFieldName = object.replace(oldIndex, lIndex.toString())
        if (object !== newFieldName) {
          l[newFieldName] = l[object]
          delete l[object]
        }
      }
    })
    setInputList(list)
  }

  return inputList.map((item, i) => {
    return (
      <span key={i}>
        <label>
          {i === 0 && title !== undefined && (
            <>
              <span className="key">{title}:</span>
              <br />
              <span>{description}</span>
              <br />
              <br />
            </>
          )}
          {objTitle !== undefined && (
            <>
              <span className="key">{objTitle}:</span>
              <br />
              <span>{objDescription}</span>
              <br />
            </>
          )}
          {Object.keys(objects).map((obj, objIndex) => {
            let value = item[name + '-' + i + '-' + obj]
            let fieldName = name + '-' + i + '-' + obj
            if (obj === 'TYPE') {
              value = item[name + '-' + i]
              fieldName = name + '-' + i
            }
            let title = objects[obj].title
            let description = objects[obj].description
            let objType = objects[obj].type
            if (objType === 'array') {
              objType = objects[obj].items.type
            }
            if (objects[obj].enum || objects[obj].items?.enum) {
              let multi = false
              let enumList = objects[obj].enum
              let enumNamesList = objects[obj].enumNames
              if (objects[obj]?.items?.enum) {
                enumList = objects[obj].items.enum
                enumNamesList = objects[obj].items.enumNames
                multi = true
              }

              return (
                <label key={objIndex}>
                  {title}:
                  <select name={fieldName} id={fieldName} multiple={multi}>
                    {multi ? null : (
                      <option value="" key="0">
                        Select
                      </option>
                    )}
                    {enumList.map((enumV, enumI) => (
                      <option value={enumV} key={enumV}>
                        {enumNamesList ? enumNamesList[enumI] : enumV}
                      </option>
                    ))}
                  </select>
                  <br />
                  <span>{description}</span>
                  <br />
                </label>
              )
            } else {
              return (
                <label key={objIndex}>
                  {title}:
                  <input
                    key={objIndex}
                    type={objType}
                    name={fieldName}
                    max={max}
                    maxLength={maxlength}
                    min={min}
                    minLength={minlength}
                    pattern={pattern}
                    value={value}
                    onChange={e => handleChange(e, i)}
                  />
                  <br />
                  <span>{description}</span>
                  <br />
                </label>
              )
            }
          })}
          {inputList.length !== 1 && (
            <input
              type="button"
              value="Remove"
              onClick={() => handleRemoveInput(i)}
            />
          )}
          {inputList.length - 1 === i &&
            (maxItems === undefined || inputList.length < maxItems) && (
              <input
                type="button"
                value="Add"
                onClick={() => handleAddInput(i)}
              />
            )}
        </label>
        <br />
      </span>
    )
  })
}
