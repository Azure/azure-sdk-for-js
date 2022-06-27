import {getEditorData} from "@azure/apimanagement-custom-widget-tools"
import {valuesDefault} from "./values"

function initialize() {
  const editorData = getEditorData(valuesDefault)

  Object.entries(editorData).forEach(([key, value]) => {
    const element = document.getElementById(key)
    if (element) element.innerText = (value ?? "").toString()
  })

  Object.entries(editorData.values).forEach(([key, value]) => {
    const element = document.getElementById(key)
    if (element) element.innerText = value
  })
}

export default initialize
