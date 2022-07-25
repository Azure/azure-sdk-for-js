import {useEditorValues, useSecrets} from "../hooks"

const App = () => {
  const editorValues = useEditorValues()
  const secrets = useSecrets()

  return (
    <form action={editorValues.actionUrl} className="flex-columns-container height-fill">
      <div className="form-group">
        <label htmlFor="email" className="form-label">{editorValues.label1}</label>
        <input id="email" type="email" className="form-control" name="email" placeholder="example@contoso.com" />
      </div>
      <div className="form-group height-fill flex-columns-container">
        <label htmlFor="message" className="form-label">{editorValues.label2}</label>
        <textarea id="message" className="form-control flex-grow" name="message" placeholder={editorValues.placeholder}>
        </textarea>
      </div>
      <div className="form-group">
        <button type="submit" className="button button-primary">Submit</button>
      </div>
    </form>
  )
}

export default App
