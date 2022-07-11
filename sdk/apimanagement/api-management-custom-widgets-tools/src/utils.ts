/**
 * Key for a search param, from which editor data will be loaded from.
 */
export const EDITOR_DATA_KEY = "editorData"
/**
 * Key for a post message object, it's used to propagate changes from editor to the DevPortal. Used to prevent interference with other applications.
 */
export const ON_CHANGE_MESSAGE_KEY = "customInputValueChangedMSAPIM"
/**
 * Key for a post message object, it's used to request and send secrets - token and user id, from the DevPortal. Used to prevent interference with other applications.
 */
export const ASK_FOR_SECRETS_MESSAGE_KEY = "askForSecretsMSAPIM"

export type TValuesBase = Record<string, unknown>
type TEnvironment = "development" | "runtime" | "error" | string

/**
 * JSON object with all the data you'll receive from the Dev Portal.
 */
export interface TEditorData<TValues extends TValuesBase> {
  values: TValues
  origin: string
  environment: TEnvironment
  instanceId: string
}

/**
 * Function to get all editor data
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function getEditorData<TValues extends TValuesBase>(valuesDefault: TValues): TEditorData<TValues> {
  try {
    const urlEditorParams = JSON.parse(
      decodeURIComponent(new URLSearchParams(window.location.search).get(EDITOR_DATA_KEY) ?? "")
    )

    if (!("origin" in urlEditorParams)) {
      console.error("Could not get 'origin' from the search params of the URL:\n" + window.location.href)
    }
    return {...urlEditorParams, values: {...valuesDefault, ...urlEditorParams.values}}
  } catch (e) {
    console.error(`Could not get '${EDITOR_DATA_KEY}' from the search params of the URL:\n` + window.location, e)
    return {values: valuesDefault, environment: "error", origin: "error", instanceId: "error"}
  }
}

/**
 * Function to get values you've set in the admin editor window.
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function getEditorValues<TValues extends TValuesBase>(valuesDefault: TValues): TValues {
  return getEditorData(valuesDefault).values
}

export type TOnChange<TValues extends TValuesBase> = (values: Partial<TValues>) => void

export function onChangeWithOrigin<TValues extends TValuesBase>(
  origin: TEditorData<TValues>["origin"],
  instanceId: TEditorData<TValues>["instanceId"],
  values: TValues
) {
  Object.entries(values).forEach(([key, value]) => {
    window.parent.postMessage({[ON_CHANGE_MESSAGE_KEY]: {key, value, instanceId}}, origin)
  })
}

/**
 * Build onChange function, which you can use, to send changed data from the editor.
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function buildOnChange<TValues extends TValuesBase>(valuesDefault: TValues): TOnChange<TValues> {
  const {origin, instanceId} = getEditorData(valuesDefault)
  return (values: Partial<TValues>) => onChangeWithOrigin(origin, instanceId, values)
}

export type TTargetModule = "app" | "editor"
export type TSecrets = {token: string; userId: string}
export const askForSecrets = async (
  targetOrigin: string,
  instanceId: string,
  targetModule: TTargetModule,
  environment: TEnvironment
): Promise<TSecrets> =>
  new Promise(resolve => {
    window.addEventListener("message", ({data, origin}) => {
      if (origin !== targetOrigin || !(ASK_FOR_SECRETS_MESSAGE_KEY in data)) return

      const secrets = data[ASK_FOR_SECRETS_MESSAGE_KEY]
      if (typeof secrets !== "object" || !("token" in secrets) || !("userId" in secrets)) {
        throw new Error("Secrets send by Dev Portal are invalid")
      }

      resolve(secrets)
    })

    const message = {[ASK_FOR_SECRETS_MESSAGE_KEY]: {instanceId, origin: window.location.origin, targetModule}}

    if (targetModule === "app" && environment === "development") window.parent.parent.postMessage(message, targetOrigin)
    else window.parent.postMessage(message, targetOrigin)
  })
