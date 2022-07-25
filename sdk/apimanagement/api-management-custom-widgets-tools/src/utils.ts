// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Key for a search param, from which editor data will be loaded from.
 */
export const APIM_EDITOR_DATA_KEY = "editorData";
/**
 * Key for a post message object, it's used to propagate changes from editor to the DevPortal. Used to prevent interference with other applications.
 */
export const APIM_ON_CHANGE_MESSAGE_KEY = "customInputValueChangedMSAPIM";
/**
 * Key for a post message object, it's used to request and send secrets - token and user id, from the DevPortal. Used to prevent interference with other applications.
 */
export const APIM_ASK_FOR_SECRETS_MESSAGE_KEY = "askForSecretsMSAPIM";

/**
 * Base of a values obj
 */
export type ValuesCommon = Record<string, unknown>;
/**
 * All possible runtime environments
 */
export type Environment = "development" | "publishing" | "runtime" | "error";

/** Information about the widget instance received from the Dev Portal */
export interface PortalData {
  /** web content's origin (URL) of your Dev Portal */
  origin: string;
  /** current runtime environment */
  environment: Environment;
  /** ID of this particular instance of the widget */
  instanceId: string;
}

/** JSON object with all the data you'll receive from the Dev Portal */
export interface EditorData<Values extends ValuesCommon> extends PortalData {
  /** values you've set in the admin editor window */
  values: Values;
}

export function getEditorDataPure<Values extends ValuesCommon>(
  valuesDefault: Values,
  urlSearchParams: URLSearchParams
): EditorData<Values> {
  try {
    const urlEditorParams = JSON.parse(
      decodeURIComponent(urlSearchParams.get(APIM_EDITOR_DATA_KEY) ?? "")
    );

    if (!("origin" in urlEditorParams)) {
      console.error(
        "Could not get 'origin' from the search params of the URL:\n" + self.location.href
      );
    }
    return { ...urlEditorParams, values: { ...valuesDefault, ...urlEditorParams.values } };
  } catch (e) {
    console.error(
      `Could not get '${APIM_EDITOR_DATA_KEY}' from the search params of the URL:\n` +
        self.location,
      e
    );
    return { values: valuesDefault, environment: "error", origin: "error", instanceId: "error" };
  }
}

/**
 * Function to get all editor data
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function getEditorData<Values extends ValuesCommon>(
  valuesDefault: Values
): EditorData<Values> {
  return getEditorDataPure(valuesDefault, new URLSearchParams(self.location.search));
}

export function getEditorValuesPure<Values extends ValuesCommon>(
  valuesDefault: Values,
  urlSearchParams: URLSearchParams
): Values {
  return getEditorDataPure(valuesDefault, urlSearchParams).values;
}

/**
 * Function to get values you've set in the admin editor window.
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function getEditorValues<Values extends ValuesCommon>(valuesDefault: Values): Values {
  return getEditorValuesPure(valuesDefault, new URLSearchParams(self.location.search));
}

/**
 * Type of the onChange function.
 */
export type OnChange<Values extends ValuesCommon> = (values: Partial<Values>) => void;

/**
 * The onChange function itself with 'origin' provided as a param.
 *
 * @param origin - web content's origin (URL) of your Dev Portal to send changes to
 * @param instanceId - ID of this particular instance of the widget
 * @param values - values that changed
 */
export function onChangeWithOrigin<Values extends ValuesCommon>(
  origin: string,
  instanceId: string,
  values: Values
): void {
  Object.entries(values).forEach(([key, value]) => {
    self.parent.postMessage({ [APIM_ON_CHANGE_MESSAGE_KEY]: { key, value, instanceId } }, origin);
  });
}

/**
 * Build onChange function, which you can use, to send changed data from the editor.
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function buildOnChange<Values extends ValuesCommon>(
  valuesDefault: Values
): OnChange<Values> {
  const { origin, instanceId } = getEditorData(valuesDefault);
  return (values: Partial<Values>) => onChangeWithOrigin(origin, instanceId, values);
}

/**
 * Possible target modules
 * "app" for main application which is embedded in your Dev Portal
 * "editor" for form in admin panel
 */
export type TargetModule = "app" | "editor";
/**
 * Secrets needed for communication with Dev Portal back-end
 */
export type Secrets = {
  token: string;
  userId: string;
  apiVersion: string;
  managementApiUrl: string;
};
/**
 * Request secrets - token & userId, from the Dev portal parent window.
 *
 * @param targetModule - is the function invoke from the main "app" window or the admin "editor"?
 */
export async function askForSecrets(targetModule: TargetModule): Promise<Secrets> {
  return new Promise((resolve, reject) => {
    const { origin: targetOrigin, instanceId, environment }: PortalData = getEditorData({});
    self.addEventListener("message", ({ data, origin }) => {
      if (origin !== targetOrigin || !(APIM_ASK_FOR_SECRETS_MESSAGE_KEY in data)) return;

      const secrets = data[APIM_ASK_FOR_SECRETS_MESSAGE_KEY];
      if (typeof secrets !== "object" || !("token" in secrets) || !("userId" in secrets)) {
        reject("Secrets send by Dev Portal are invalid");
      }

      resolve(secrets);
    });

    const message = {
      [APIM_ASK_FOR_SECRETS_MESSAGE_KEY]: {
        instanceId,
        origin: self.location.origin,
        targetModule,
      },
    };

    if (targetModule === "app" && environment === "development") {
      self.parent.parent.postMessage(message, targetOrigin);
    } else {
      self.parent.postMessage(message, targetOrigin);
    }
  });
}
