import {getValues, Secrets} from "@azure/api-management-custom-widgets-tools"
import {valuesDefault} from "./values"

class App {
  public readonly values
  public request: ((url: string) => Promise<Response>)

  constructor(
    public readonly secrets: Secrets,
  ) {
    this.request = url =>
      fetch(
        `${secrets.managementApiUrl}${url}?api-version=${secrets.apiVersion}`,
        secrets.token ? {headers: {Authorization: secrets.token}} : undefined,
      )

    this.values = getValues(valuesDefault)

    Object.entries(this.values).forEach(([key, value]) => {
      const element = document.getElementById(`values.${key}`)
      if (element) element.innerText = value
    })
    document.getElementById("message")?.setAttribute("placeholder", this.values.placeholder)
    document.getElementById("form")?.setAttribute("action", this.values.actionUrl)
  }
}

export default App
