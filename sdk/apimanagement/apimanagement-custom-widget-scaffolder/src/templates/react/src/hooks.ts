import {useCallback, useMemo} from "react"
import {
  getEditorData,
  getEditorValues,
  onChangeWithOrigin,
  TEditorData,
  TOnChange,
  TValuesBase,
} from "@azure/apimanagement-custom-widget-tools"

export function useEditorData<TValues extends TValuesBase>(valuesDefault: TValues): TEditorData<TValues> {
  return useMemo(() => getEditorData(valuesDefault), [valuesDefault])
}

export function useEditorValues<TValues extends TValuesBase>(valuesDefault: TValues): TValues {
  return useMemo(() => getEditorValues(valuesDefault), [valuesDefault])
}

export function useOnChange<TValues extends TValuesBase>(valuesDefault: TValues): TOnChange<TValues> {
  const {origin, instanceId} = useEditorData<TValues>(valuesDefault)
  return useCallback(values => onChangeWithOrigin(origin, instanceId, values), [origin])
}
