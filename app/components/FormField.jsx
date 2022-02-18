export default function FormField({ name, title, type }) {
  return (
    <span>
      <label>
        <span className="key">{title}:</span>
        <input type={type} name={name} />
      </label>
      <br />
    </span>
  )
}
