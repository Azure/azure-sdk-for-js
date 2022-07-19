import {askForSecrets, getEditorData, TSecrets} from "@azure/api-management-custom-widgets-tools"
import {valuesDefault} from "./values"

class app {
  private readonly editorData
  private secrets: TSecrets | undefined

  constructor() {
    this.editorData = getEditorData(valuesDefault)

    Object.entries(this.editorData).forEach(([key, value]) => {
      const element = document.getElementById(key)
      if (element) element.innerText = (value ?? "").toString()
    })

    Object.entries(this.editorData.values).forEach(([key, value]) => {
      const element = document.getElementById(key)
      if (element) element.innerText = value
    })

    askForSecrets("app", this.editorData)
      .then(secrets => this.secrets = secrets)
      .catch(e => console.error("Failed to retrieve secrets from the Developer Portal. The app might not work as expected!", e))
  }

  public async sendData(data: Record<string, unknown>) {
    if (!this.secrets) throw new Error()

    console.log({data, authorization: this.secrets})
  }
}

export default app
