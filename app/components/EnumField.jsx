export default function EnumField({ enumList, enumNamesList, name, title }) {
  return (
    <span>
      <label>
        <span className="key">{title}:</span>
        <select name={name} id={name}>
          {enumList.map((item, index) => (
            <option value={item} key={item}>
              {enumNamesList ? enumNamesList[index] : item}
            </option>
          ))}
        </select>
      </label>
      <br />
    </span>
  )
}
