import React, { useState } from 'react'

export default function MultipleFormField({
  max,
  maxlength,
  min,
  minlength,
  name,
  pattern,
  title,
  maxItems,
  objects
}) {
  // Initialize an empty object
  // Format is fieldName-id-objectName
  let fields = {}
  Object.keys(objects).map(obj => {
    let objName = name + '-0-' + obj
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
          <span className="key">{title}:</span>
          {Object.keys(objects).map((obj, objIndex) => {
            let value = item[name + '-' + i + '-' + obj]
            return (
              <input
                key={objIndex}
                type={objects[obj].type}
                name={name + '-' + i + '-' + obj}
                max={max}
                maxLength={maxlength}
                min={min}
                minLength={minlength}
                pattern={pattern}
                value={value}
                onChange={e => handleChange(e, i)}
              />
            )
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
