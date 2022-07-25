
export function RRadioBtn({checked, onChange, label}) {

  return (
    <label>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  )
}
