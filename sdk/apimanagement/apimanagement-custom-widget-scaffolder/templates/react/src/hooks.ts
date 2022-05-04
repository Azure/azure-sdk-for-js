import {useCallback, useMemo} from "react"
import {
  TValuesBase,
  TEditorObj,
  getEditorValues,
  onChangeWithOrigin,
  TOnChange,
} from "@azure/apimanagement-custom-widget-tools"

export function useEditorValues<TValues extends TValuesBase>(valuesDefault: TValues): TEditorObj<TValues> {
  return useMemo(() => getEditorValues(valuesDefault), [valuesDefault])
}

export function useOnChange<TValues extends TValuesBase>(valuesDefault: TValues): TOnChange<TValues> {
  const {origin, instanceId} = useEditorValues<TValues>(valuesDefault)
  return useCallback(values => onChangeWithOrigin(origin, instanceId, values), [origin])
}
