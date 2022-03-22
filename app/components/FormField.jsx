export default function FormField({
  max,
  maxlength,
  min,
  minlength,
  name,
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
          maxlength={maxlength}
          min={min}
          minlength={minlength}
        />
      </label>
      <br />
    </span>
  )
}
