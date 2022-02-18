export default function FormField({ name, schema }) {
  return (
    <span>
      <label>
        <span className="key">{schema.properties[name].title}:</span>
        <input
          type={schema.properties[name].type === 'number' ? 'number' : 'text'}
          name={name}
        />
      </label>
      <br />
    </span>
  )
}
