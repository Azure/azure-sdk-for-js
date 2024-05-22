import {useCallback, useContext} from "react"
import {OnChange, onChangeWithOrigin} from "@azure/api-management-custom-widgets-tools"

import {Values} from "./values"
import {SecretsContext, WidgetDataContext} from "./providers"

export const useValues = () => useContext(WidgetDataContext).values
export const useEditorValues = () => useContext(WidgetDataContext).data.values
export const useSecrets = () => useContext(SecretsContext)

export function useOnChange(): OnChange<Values> {
  const {data: {instanceId}} = useContext(WidgetDataContext)
  return useCallback(values => onChangeWithOrigin("*", instanceId, values), [instanceId])
}

export function useRequest(): (url: string) => Promise<Response> {
  const secrets = useSecrets()

  return useCallback(url =>
    fetch(
      `${secrets.managementApiUrl}${url}?api-version=${secrets.apiVersion}`,
      secrets.token ? {headers: {Authorization: secrets.token}} : undefined,
    ), [secrets])
}
