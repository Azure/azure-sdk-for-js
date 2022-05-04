import {ObjectKeys, buildOnChange, initEditor} from "@azure/apimanagement-custom-widget-tools"
import {valuesDefault} from "./values"

export const onChange = buildOnChange(valuesDefault)

function initialize() {
  const {data} = initEditor(valuesDefault)

  ObjectKeys(data).forEach(key => {
    const element = document.getElementById(key) as HTMLElement | HTMLInputElement | null
    if (element && "value" in element) element.value = data[key]
  })
}

export default initialize
