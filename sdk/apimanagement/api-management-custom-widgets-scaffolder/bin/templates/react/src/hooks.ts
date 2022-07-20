import {useCallback, useContext} from "react"
import {onChangeWithOrigin, OnChange} from "@azure/api-management-custom-widgets-tools"

import {Values} from "./values"
import {EditorDataContext, SecretsContext} from "./providers"

export const useEditorData = () => useContext(EditorDataContext)
export const useEditorValues = () => useContext(EditorDataContext).values
export const useSecrets = () => useContext(SecretsContext)

export function useOnChange(): OnChange<Values> {
  const {origin, instanceId} = useEditorData()
  return useCallback(values => onChangeWithOrigin(origin, instanceId, values), [origin, instanceId])
}
