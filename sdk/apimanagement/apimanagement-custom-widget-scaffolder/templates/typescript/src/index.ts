import {ObjectKeys, init} from "@azure/apimanagement-custom-widget-tools"
import {valuesDefault} from "./values"

function initialize() {
  const values = init(valuesDefault)

  ObjectKeys(values).forEach(key => {
    const element = document.getElementById(key)
    if (element) element.innerText = (values[key] ?? "").toString()
  })

  ObjectKeys(values.data).forEach(key => {
    const element = document.getElementById(key)
    if (element) element.innerText = values.data[key]
  })
}

export default initialize
