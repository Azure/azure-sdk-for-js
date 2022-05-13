import {buildOnChange, getEditorValues} from "@azure/apimanagement-custom-widget-tools"
import {valuesDefault} from "./values"

export const onChange = buildOnChange(valuesDefault)

function initialize() {
  const values = getEditorValues(valuesDefault)

  Object.entries(values).forEach(([key, value]) => {
    const element = document.getElementById(key) as HTMLElement | HTMLInputElement | null
    if (element && "value" in element) element.value = value
  })
}

export default initialize
