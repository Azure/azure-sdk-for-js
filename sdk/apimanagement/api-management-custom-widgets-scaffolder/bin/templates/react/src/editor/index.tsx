import {useEditorValues, useOnChange} from "../hooks"
import {Values} from "../values"

function InputField({valueKey, title}: {valueKey: keyof Values, title?: string}) {
  const values = useEditorValues()
  const onChange = useOnChange()

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={valueKey}>
        {title ?? valueKey}
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
  <fieldset className="form">
    <div className="form-group">
      <InputField valueKey="label1" title="Label 1" />
      <InputField valueKey="label2" title="Label 2" />
      <InputField valueKey="placeholder" title="Placeholder" />
      <InputField valueKey="actionUrl" title="Action URL" />
    </div>
  </fieldset>
)

export default Editor
