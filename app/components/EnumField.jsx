export default function EnumField({
  enumList,
  enumNamesList,
  multi,
  name,
  title
}) {
  return (
    <span>
      <label>
        <span className="key">{title}:</span>
        <select name={name} id={name} multiple={multi}>
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
