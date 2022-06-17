import {useEditorValues, useOnChange} from "../hooks"
import {TValues} from "../values"

function InputField({valueKey}: {valueKey: keyof TValues}) {
  const values = useEditorValues()
  const onChange = useOnChange()

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={valueKey}>
        {valueKey}
      </label>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          defaultValue={values[valueKey]}
          onInput={e => {
            const target = e.target as HTMLInputElement
            onChange({[valueKey]: target.value})
          }}
        />
      </div>
    </div>
  )
}

const Editor = () => (
  <fieldset className="form flex flex-item flex-item-grow no-overflow">
    <div className="form-group">
      <InputField valueKey="field1" />
      <InputField valueKey="field2" />
    </div>
  </fieldset>
)

export default Editor
