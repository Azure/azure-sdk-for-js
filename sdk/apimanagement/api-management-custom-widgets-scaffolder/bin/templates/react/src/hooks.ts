import {useCallback, useContext} from "react"
import {onChangeWithOrigin, TOnChange} from "@azure/api-management-custom-widgets-tools"

import {TValues} from "./values"
import {EditorDataContext, SecretsContext} from "./providers"

export const useEditorData = () => useContext(EditorDataContext)
export const useEditorValues = () => useContext(EditorDataContext).values
export const useSecrets = () => useContext(SecretsContext)

export function useOnChange(): TOnChange<TValues> {
  const {origin, instanceId} = useEditorData()
  return useCallback(values => onChangeWithOrigin(origin, instanceId, values), [origin, instanceId])
}
