import React, {useEffect, useState} from "react"
import {
  askForSecrets,
  getValues,
  getWidgetData,
  Secrets,
  TargetModule,
} from "@azure/api-management-custom-widgets-tools"
import {Values, valuesDefault} from "./values"

export const WidgetDataContext = React.createContext({data: getWidgetData<Values>(), values: getValues(valuesDefault)})
export const WidgetDataProvider: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <WidgetDataContext.Provider value={{data: getWidgetData<Values>(), values: getValues(valuesDefault)}}>
    {children}
  </WidgetDataContext.Provider>
)

export const SecretsContext = React.createContext<Secrets>({
  token: "",
  userId: "",
  apiVersion: "",
  managementApiUrl: "",
  parentLocation: {
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    port: "",
    protocol: "",
    search: "",
  },
})
export const SecretsProvider: React.FC<{children?: React.ReactNode; targetModule: TargetModule}> = (
  {children, targetModule},
) => {
  const [secrets, setSecrets] = useState<Secrets | undefined>()

  useEffect(() => {
    askForSecrets(targetModule)
      .then(value => setSecrets(value))
      .catch(console.error)
  }, [targetModule])

  return secrets ? (
    <SecretsContext.Provider value={secrets}>{children}</SecretsContext.Provider>
  ) : <div className="loading"></div>
}
