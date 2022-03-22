export default function FormField({ max, min, name, title, type }) {
  return (
    <span>
      <label>
        <span className="key">{title}:</span>
        <input type={type} name={name} max={max} min={min} />
      </label>
      <br />
    </span>
  )
}
