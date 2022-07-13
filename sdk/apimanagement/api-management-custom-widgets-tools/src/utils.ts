// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Key for a search param, from which editor data will be loaded from.
 */
export const EDITOR_DATA_KEY = "editorData";
/**
 * Key for a post message object, it's used to propagate changes from editor to the DevPortal. Used to prevent interference with other applications.
 */
export const ON_CHANGE_MESSAGE_KEY = "customInputValueChangedMSAPIM";
/**
 * Key for a post message object, it's used to request and send secrets - token and user id, from the DevPortal. Used to prevent interference with other applications.
 */
export const ASK_FOR_SECRETS_MESSAGE_KEY = "askForSecretsMSAPIM";

/**
 * Base of a values obj
 */
export type TValuesCommon = Record<string, unknown>;
/**
 * All possible runtime environments
 */
export type TEnvironment = "development" | "publishing" | "runtime" | "error";

/** JSON object with all the data you'll receive from the Dev Portal */
export interface TEditorData<TValues extends TValuesCommon> {
  /** values you've set in the admin editor window */
  values: TValues;
  /** web content's origin (URL) of your Dev Portal */
  origin: string;
  /** current runtime environment */
  environment: TEnvironment;
  /** ID of this particular instance of the widget */
  instanceId: string;
}

/**
 * Function to get all editor data
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function getEditorData<TValues extends TValuesCommon>(
  valuesDefault: TValues
): TEditorData<TValues> {
  try {
    const urlEditorParams = JSON.parse(
      decodeURIComponent(new URLSearchParams(self.location.search).get(EDITOR_DATA_KEY) ?? "")
    );

    if (!("origin" in urlEditorParams)) {
      console.error(
        "Could not get 'origin' from the search params of the URL:\n" + self.location.href
      );
    }
    return { ...urlEditorParams, values: { ...valuesDefault, ...urlEditorParams.values } };
  } catch (e) {
    console.error(
      `Could not get '${EDITOR_DATA_KEY}' from the search params of the URL:\n` + self.location,
      e
    );
    return { values: valuesDefault, environment: "error", origin: "error", instanceId: "error" };
  }
}

/**
 * Function to get values you've set in the admin editor window.
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function getEditorValues<TValues extends TValuesCommon>(valuesDefault: TValues): TValues {
  return getEditorData(valuesDefault).values;
}

/**
 * Type of the onChange function.
 */
export type TOnChange<TValues extends TValuesCommon> = (values: Partial<TValues>) => void;

/**
 * The onChange function itself with 'origin' provided as a param.
 *
 * @param origin - web content's origin (URL) of your Dev Portal to send changes to
 * @param instanceId - ID of this particular instance of the widget
 * @param values - values that changed
 */
export function onChangeWithOrigin<TValues extends TValuesCommon>(
  origin: TEditorData<TValues>["origin"],
  instanceId: TEditorData<TValues>["instanceId"],
  values: TValues
): void {
  Object.entries(values).forEach(([key, value]) => {
    self.parent.postMessage({ [ON_CHANGE_MESSAGE_KEY]: { key, value, instanceId } }, origin);
  });
}

/**
 * Build onChange function, which you can use, to send changed data from the editor.
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function buildOnChange<TValues extends TValuesCommon>(
  valuesDefault: TValues
): TOnChange<TValues> {
  const { origin, instanceId } = getEditorData(valuesDefault);
  return (values: Partial<TValues>) => onChangeWithOrigin(origin, instanceId, values);
}

/**
 * Possible target modules
 * "app" for main application which is embedded in your Dev Portal
 * "editor" for form in admin panel
 */
export type TTargetModule = "app" | "editor";
/**
 * Secrets needed for communication with Dev Portal back-end
 */
export type TSecrets = { token: string; userId: string };
/**
 * Request secrets - token & userId, from the Dev portal parent window.
 *
 * @param targetOrigin - web content's origin (URL) of your Dev Portal to send changes to
 * @param instanceId - ID of this particular instance of the widget
 * @param targetModule - is the function invoke from the main "app" window or the admin "editor"?
 * @param environment - what environment is it running on
 */
export const askForSecrets = async (
  targetOrigin: string,
  instanceId: string,
  targetModule: TTargetModule,
  environment: TEnvironment
): Promise<TSecrets> =>
  new Promise((resolve) => {
    self.addEventListener("message", ({ data, origin }) => {
      if (origin !== targetOrigin || !(ASK_FOR_SECRETS_MESSAGE_KEY in data)) return;

      const secrets = data[ASK_FOR_SECRETS_MESSAGE_KEY];
      if (typeof secrets !== "object" || !("token" in secrets) || !("userId" in secrets)) {
        throw new Error("Secrets send by Dev Portal are invalid");
      }

      resolve(secrets);
    });

    const message = {
      [ASK_FOR_SECRETS_MESSAGE_KEY]: { instanceId, origin: self.location.origin, targetModule },
    };

    if (targetModule === "app" && environment === "development") {
      self.parent.parent.postMessage(message, targetOrigin);
    } else {
      self.parent.postMessage(message, targetOrigin);
    }
  });
