import React, {useMemo, useState} from "react"
import {askForSecrets, getEditorData, Secrets, TargetModule} from "@azure/api-management-custom-widgets-tools"

import {valuesDefault} from "./values"
import {useEditorData} from "./hooks"

export const EditorDataContext = React.createContext(getEditorData(valuesDefault))
export const EditorDataProvider: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <EditorDataContext.Provider value={getEditorData(valuesDefault)}>{children}</EditorDataContext.Provider>
)

export const SecretsContext = React.createContext<Secrets>({token: "", userId: ""})
export const SecretsProvider: React.FC<{children?: React.ReactNode; targetModule: TargetModule}> = ({
  children,
  targetModule,
}) => {
  const [secrets, setSecrets] = useState<Secrets | undefined>()
  const editorData = useEditorData()

  useMemo(() => {
    askForSecrets(targetModule, editorData)
      .then(value => setSecrets(value))
      .catch(console.error)
  }, [editorData.origin, editorData.instanceId])

  return secrets ? <SecretsContext.Provider value={secrets}>{children}</SecretsContext.Provider> : <>Loading...</>
}
