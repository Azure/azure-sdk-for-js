// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

const g: any = globalThis;

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
  // /** web content's origin (URL) of your Dev Portal */
  // origin: string;
  /** current runtime environment */
  environment: Environment;
  /** ID of this particular instance of the widget */
  instanceId: string;
}

/** JSON object with all the data you'll receive from the Dev Portal */
export interface EditorData<Values extends ValuesCommon> extends PortalData {
  /** values you've set in the admin editor window */
  values: Partial<Values>;
}

function parseWidgetData<Values extends ValuesCommon>(
  urlSearchParams: URLSearchParams,
): EditorData<Values> {
  try {
    const urlEditorParams: EditorData<Values> = JSON.parse(
      decodeURIComponent(urlSearchParams.get(APIM_EDITOR_DATA_KEY) ?? ""),
    );

    // if (!("origin" in urlEditorParams)) {
    //   console.error(
    //     "Could not get 'origin' from the search params of the URL:\n" + self.location.href
    //   );
    // }
    return urlEditorParams;
  } catch (e) {
    console.error(
      `Could not get '${APIM_EDITOR_DATA_KEY}' from the search params of the URL:\n` + g.location,
      e,
    );
    return { values: {}, environment: "error", instanceId: "error" };
  }
}

export function getWidgetDataPure<Values extends ValuesCommon>(
  urlSearchParams: URLSearchParams,
): EditorData<Values> {
  return parseWidgetData<Values>(urlSearchParams);
}

/**
 * Function to get all data related to the widget including technical values not expected to be needed in most cases.
 * Intended mostly for internal use, API might change. Consider using getValues or getEditorValues instead.
 */
export function getWidgetData<Values extends ValuesCommon>(): EditorData<Values> {
  return getWidgetDataPure(new URLSearchParams(g.location?.search ?? ""));
}

export function getEditorValuesPure<Values extends ValuesCommon>(
  urlSearchParams: URLSearchParams,
): Partial<Values> {
  return getWidgetDataPure<Values>(urlSearchParams).values;
}

/**
 * Function to get values you've set in the admin editor window.
 */
export function getEditorValues<Values extends ValuesCommon>(): Partial<Values> {
  return getEditorValuesPure<Values>(new URLSearchParams(g.location?.search ?? ""));
}

export function getValuesPure<Values extends ValuesCommon>(
  valuesDefault: Values,
  urlSearchParams: URLSearchParams,
): Values {
  const values = { ...valuesDefault }; // set Obj to contain all possible values and prefill default value
  const urlValues = parseWidgetData<Values>(urlSearchParams).values;

  Object.keys(values).forEach((key: keyof Values) => {
    const value = urlValues[key];
    if (value != null) values[key] = value as Values[typeof key]; // if value is specified in the URL, replace the default value
  });
  return values;
}

/**
 * Function to get values you've set in the admin editor window. Undefined/empty values are replaced with default values.
 *
 * @param valuesDefault - object with your default values to use, just import valuesDefault object from values.ts folder
 */
export function getValues<Values extends ValuesCommon>(valuesDefault: Values): Values {
  return getValuesPure(valuesDefault, new URLSearchParams(g.location?.search ?? ""));
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
  values: Values,
): void {
  Object.entries(values).forEach(([key, value]) => {
    g.parent?.postMessage?.({ [APIM_ON_CHANGE_MESSAGE_KEY]: { key, value, instanceId } }, origin);
  });
}

/**
 * Build onChange function, which you can use, to send changed data from the editor.
 */
export function buildOnChange<Values extends ValuesCommon>(): OnChange<Values> {
  const { instanceId } = getWidgetData();
  return (values: Partial<Values>) => onChangeWithOrigin("*", instanceId, values);
}

/**
 * Possible target modules
 * "app" for main application which is embedded in your Dev Portal
 * "editor" for form in admin panel
 */
export type TargetModule = "app" | "editor";
/**
 * Secrets needed for communication with Dev Portal back-end and other runtime data
 */
export type Secrets = {
  managementApiUrl: string;
  apiVersion: string;
  userId?: string;
  token?: string;
  parentLocation: {
    host: string;
    hostname: string;
    href: string;
    origin: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
  };
};

/**
 * Request secrets - token & userId, from the Dev portal parent window.
 *
 * @param targetModule - is the function invoke from the main "app" window or the admin "editor"?
 */
export async function askForSecrets(targetModule: TargetModule): Promise<Secrets> {
  let receiveSecrets: (e: MessageEvent) => void;

  const promise = new Promise<Secrets>((resolve, reject) => {
    const { instanceId, environment }: PortalData = getWidgetData();

    receiveSecrets = ({ data }) => {
      if (!(APIM_ASK_FOR_SECRETS_MESSAGE_KEY in data)) return;

      const secrets = data[APIM_ASK_FOR_SECRETS_MESSAGE_KEY];
      if (typeof secrets !== "object" || !("managementApiUrl" in secrets)) {
        reject("Secrets send by Dev Portal are invalid");
      }

      resolve(secrets);
    };

    g.addEventListener?.("message", receiveSecrets);

    const message = {
      [APIM_ASK_FOR_SECRETS_MESSAGE_KEY]: {
        instanceId,
        origin: g.location?.origin,
        targetModule,
      },
    };

    if (targetModule === "app" && environment === "development") {
      g.parent?.parent?.postMessage?.(message, "*");
    } else {
      g.parent?.postMessage?.(message, "*");
    }
  });

  return promise.finally(() => g.removeEventListener?.("message", receiveSecrets));
}
