import React from 'react'

export default function EnumField({
  description,
  enumList,
  enumNamesList,
  multi,
  name,
  title,
  objectTitle,
  objectDescription
}) {
  return (
    <span>
      {objectTitle ? objectTitle : ''}
      <br />
      {objectDescription ? objectDescription : ''}
      <label>
        <span className="key">{title}:</span>
        <select name={name} id={name} multiple={multi}>
          {multi ? null : <option value="" key="0"></option>}
          {enumList.map((item, index) => (
            <option value={item} key={item}>
              {enumNamesList ? enumNamesList[index] : item}
            </option>
          ))}
        </select>
      </label>
      <br />
      <span>{description}</span>
      <br />
    </span>
  )
}
