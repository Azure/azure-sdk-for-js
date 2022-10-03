import {useEffect, useState} from "react"
import {useRequest, useSecrets, useValues} from "../hooks"

const App = () => {
  const values = useValues()
  const {userId} = useSecrets()
  const request = useRequest()

  const [defaultEmail, setDefaultEmail] = useState<string | undefined>()

  useEffect(() => {
    if (!userId) {
      setDefaultEmail("")
      return
    }

    request(`/users/${userId}`)
      .then(e => e.json())
      .then(({properties}) => setDefaultEmail(properties.email))
      .catch(e => {
        console.error("Could not prefill the email address!", e)
        setDefaultEmail("")
      })
  }, [userId, request])

  if (defaultEmail == undefined) return <div className="loading"></div>

  return (
    <form action={values.actionUrl} method="post" target="_blank" className="flex-columns-container height-fill">
      <div className="form-group">
        <label htmlFor="email" className="form-label">{values.label1}</label>
        <input id="email" type="email" className="form-control" name="email" placeholder="example@contoso.com"
               defaultValue={defaultEmail} />
      </div>
      <div className="form-group height-fill flex-columns-container">
        <label htmlFor="message" className="form-label">{values.label2}</label>
        <textarea id="message" className="form-control flex-grow" name="message" placeholder={values.placeholder}>
        </textarea>
      </div>
      <div className="form-group">
        <button type="submit" className="button button-primary">Submit</button>
      </div>
    </form>
  )
}

export default App
