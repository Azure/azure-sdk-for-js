import React, {useMemo, useState} from "react"
import {askForSecrets, getEditorData, TSecrets, TTargetModule} from "@azure/apimanagement-custom-widget-tools"

import {valuesDefault} from "./values"
import {useEditorData} from "./hooks"

export const EditorDataContext = React.createContext(getEditorData(valuesDefault))
export const EditorDataProvider: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <EditorDataContext.Provider value={getEditorData(valuesDefault)}>{children}</EditorDataContext.Provider>
)

export const SecretsContext = React.createContext<TSecrets>({token: "", userId: ""})
export const SecretsProvider: React.FC<{children?: React.ReactNode; targetModule: TTargetModule}> = ({
  children,
  targetModule,
}) => {
  const [secrets, setSecrets] = useState<TSecrets | undefined>()
  const editorData = useEditorData()

  useMemo(() => {
    askForSecrets(editorData.origin, editorData.instanceId, targetModule, editorData.environment)
      .then(value => setSecrets(value))
      .catch(console.error)
  }, [editorData.origin, editorData.instanceId])

  return secrets ? <SecretsContext.Provider value={secrets}>{children}</SecretsContext.Provider> : <>Loading...</>
}
