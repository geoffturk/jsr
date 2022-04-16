import React from 'react'

export default function FormField({
  description,
  max,
  maxlength,
  min,
  minlength,
  name,
  pattern,
  title,
  type
}) {
  return (
    <span>
      <label>
        <span className="key">{title}:</span>
        <input
          type={type}
          name={name}
          max={max}
          maxLength={maxlength}
          min={min}
          minLength={minlength}
          pattern={pattern}
        />
      </label>
      <br />
      <span>{description}</span>
      <br />
    </span>
  )
}
