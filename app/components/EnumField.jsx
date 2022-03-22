export default function EnumField({ enumList, name, title }) {
  return (
    <span>
      <label>
        <span className="key">{title}:</span>
        <select name={name} id={name}>
          {enumList.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <br />
    </span>
  )
}
