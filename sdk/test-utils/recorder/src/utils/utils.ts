// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "./env";
/**
 * A custom error type for failed pipeline requests.
 */
export class RecorderError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "RecorderError";
    this.statusCode = statusCode;
  }
}

export type RecordingState = "started" | "stopped";
/**
 * Helper class to manage the recording state to make sure the proxy-tool is not flooded with unintended requests.
 */
export class RecordingStateManager {
  private currentState: RecordingState = "stopped";

  /**
   * validateState
   */
  private validateState(nextState: RecordingState) {
    if (nextState === "started") {
      if (this.state === "started") {
        throw new RecorderError("Already started, should not have called start again.");
      }
    }
    if (nextState === "stopped") {
      if (this.state === "stopped") {
        throw new RecorderError("Already stopped, should not have called stop again.");
      }
    }
  }

  public get state(): RecordingState {
    return this.currentState;
  }

  public set state(nextState: RecordingState) {
    // Validate state transition
    this.validateState(nextState);
    this.currentState = nextState;
  }
}

/**
 * Keywords that should be passed as part of the headers(except for "Reset") to the proxy-tool to be able to leverage the sanitizer.
 *
 * "x-abstraction-identifier" - header
 */
export type ProxyToolSanitizers =
  | "GeneralRegexSanitizer"
  | "GeneralStringSanitizer"
  | "RemoveHeaderSanitizer"
  | "BodyKeySanitizer"
  | "BodyRegexSanitizer"
  | "BodyStringSanitizer"
  | "ContinuationSanitizer"
  | "HeaderRegexSanitizer"
  | "HeaderStringSanitizer"
  | "OAuthResponseSanitizer"
  | "UriRegexSanitizer"
  | "UriStringSanitizer"
  | "UriSubscriptionIdSanitizer"
  | "Reset";

/**
 * This sanitizer offers a general regex replace across request/response Body, Headers, and URI. For the body, this means regex applying to the raw JSON.
 */
export interface RegexSanitizer {
  /**
   * Set to true to show that regex replacement is to be used.
   */
  regex: true;

  /**
   * The substitution value.
   */
  value: string;

  /**
   * A regex. Can be defined as a simple regex replace OR if groupForReplace is set, a substitution operation.
   */
  target: string;
  /**
   * The capture group that needs to be operated upon. Do not set if you're invoking a simple replacement operation.
   */
  groupForReplace?: string;
}

/**
 * A sanitizer that performs a simple find/replace based on a plain string.
 */
export interface StringSanitizer {
  /**
   * If regex is set to false or is not specified, plain-text matching will be performed.
   */
  regex?: false;

  /**
   * The string to be replaced.
   */
  target: string;

  /**
   * The value that the string should be replaced with.
   */
  value: string;
}

export type FindReplaceSanitizer = RegexSanitizer | StringSanitizer;

export function isStringSanitizer(sanitizer: FindReplaceSanitizer): sanitizer is StringSanitizer {
  return !sanitizer.regex;
}

/**
 * This sanitizer offers regex update of a specific JTokenPath.
 *
 * EG: "TableName" within a json response body having its value replaced by whatever substitution is offered.
 * This simply means that if you are attempting to replace a specific key wholesale, this sanitizer will be simpler
 * than configuring a BodyRegexSanitizer that has to match against the full "KeyName": "Value" that is part of the json structure.
 *
 * Further reading is available [here](https://www.newtonsoft.com/json/help/html/SelectToken.htm#SelectTokenJSONPath).
 *
 * If the body is NOT a JSON object, this sanitizer will NOT be applied.
 */
type BodyKeySanitizer = {
  regex?: string;

  value?: string;

  groupForReplace?: string;

  /**
   * The SelectToken path (which could possibly match multiple entries) that will be used to select JTokens for value replacement.
   */
  jsonPath: string;
};

/**
 * Can be used for multiple purposes:
 *
 * 1) To replace a key with a specific value, do not set "regex" value.
 * 2) To do a simple regex replace operation, define arguments "key", "value", and "regex"
 * 3) To do a targeted substitution of a specific group, define all arguments "key", "value", and "regex"
 */
export interface HeaderSanitizer {
  key: string;

  regex?: boolean;
  target?: string;
  value?: string;
  groupForReplace?: string;
}

/**
 * Internally,
 * - connection strings are parsed and
 * - each part of the connection string is mapped with its corresponding fake value
 * - `generalRegexSanitizer` is applied for each of the parts with the real and fake values that are parsed
 */
export interface ConnectionStringSanitizer {
  /**
   * Real connection string with all the secrets
   */
  actualConnString?: string;
  /**
   * Fake connection string - with all the parts of the connection string mapped to fake values
   */
  fakeConnString: string;
}

export interface ContinuationSanitizer {
  key: string;
  method?: string;
  resetAfterFirst: boolean;
}

export interface RemoveHeaderSanitizer {
  headersForRemoval: string[];
}

/**
 * Test-proxy tool supports "extensions" or "customizations" to the recording experience.
 * This means that non-default sanitizations such as the generalized regex find/replace on different parts of the recordings in various ways are possible.
 */
export interface SanitizerOptions {
  /**
   * This sanitizer offers a general regex replace across request/response Body, Headers, and URI. For the body, this means regex applying to the raw JSON.
   */
  generalSanitizers?: FindReplaceSanitizer[];

  /**
   * This sanitizer offers regex replace within a returned body.
   *
   * Specifically, this means regex applying to the raw JSON.
   * If you are attempting to simply replace a specific key, the BodyKeySanitizer is probably the way to go.
   *
   * Regardless, there are examples present in `recorder/test/testProxyTests.spec.ts`.
   */
  bodySanitizers?: FindReplaceSanitizer[];
  /**
   * Can be used for multiple purposes:
   *
   * 1) To replace a key with a specific value, do not set "regex" value.
   * 2) To do a simple regex replace operation, define arguments "key", "value", and "regex"
   * 3) To do a targeted substitution of a specific group, define all arguments "key", "value", and "regex"
   */
  headerSanitizers?: HeaderSanitizer[];
  /**
   * General use sanitizer for cleaning URIs via regex. Runs a regex replace on the member of your choice.
   */
  uriSanitizers?: FindReplaceSanitizer[];
  /**
   * Internally,
   * - connection strings are parsed and
   * - each part of the connection string is mapped with its corresponding fake value
   * - `generalRegexSanitizer` is applied for each of the parts with the real and fake values that are parsed
   */
  connectionStringSanitizers?: ConnectionStringSanitizer[];

  /**
   * This sanitizer offers regex update of a specific JTokenPath.
   *
   * EG: "TableName" within a json response body having its value replaced by whatever substitution is offered.
   * This simply means that if you are attempting to replace a specific key wholesale, this sanitizer will be simpler
   * than configuring a BodyRegexSanitizer that has to match against the full "KeyName": "Value" that is part of the json structure.
   *
   * Further reading is available [here](https://www.newtonsoft.com/json/help/html/SelectToken.htm#SelectTokenJSONPath).
   *
   * If the body is NOT a JSON object, this sanitizer will NOT be applied.
   */
  bodyKeySanitizers?: BodyKeySanitizer[];

  /**
   * TODO
   * Has a bug, not implemented fully.
   */
  continuationSanitizers?: ContinuationSanitizer[];

  /**
   * A simple sanitizer that should be used to clean out one or multiple headers by their key.
   * Removes headers from before saving a recording.
   */
  removeHeaderSanitizer?: RemoveHeaderSanitizer;

  /**
   * TODO: To be tested with scenarios, not to be used yet.
   */
  oAuthResponseSanitizer?: boolean;

  /**
   * This sanitizer relies on UriRegexSanitizer to replace real subscriptionIds within a URI w/ a default or configured fake value.
   * This sanitizer is targeted using the regex "/subscriptions/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})". This is not a setting that can be changed for this sanitizer. For full regex support, take a look at UriRegexSanitizer. You CAN modify the value that the subscriptionId is replaced WITH however.
   */
  uriSubscriptionIdSanitizer?: {
    /**
     * The fake subscriptionId that will be placed where the real one is in the real request. The default replacement value is "00000000-0000-0000-0000-000000000000".
     */
    value: string;
  };

  /**
   * This clears the sanitizers that are added.
   */
  resetSanitizer?: boolean;
}

/**
 * Used in record and playback modes. No effect in live mode.
 *
 * Options to be provided as part of the `recorder.start()` call.
 */
export interface RecorderStartOptions {
  /**
   * Used in record and playback modes. No effect in live mode.
   *
   *  1. The key-value pairs will be used as the environment variables in playback mode.
   *  2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
   */
  envSetupForPlayback: Record<string, string>;
  /**
   * Used in record mode. No effect in playback and live modes.
   *
   * Generated recordings are updated by the "proxy-tool" based on the sanitizer options provided.
   */
  sanitizerOptions?: SanitizerOptions;
}

/**
 * Throws error message when the `label` is not defined when it should have been defined in the given mode.
 *
 * Returns true if the param exists.
 */
export function ensureExistence<T>(thing: T | undefined, label: string): thing is T {
  if (!thing) {
    throw new RecorderError(
      `Something went wrong, ${label} should not have been undefined in "${getTestMode()}" mode.`
    );
  }
  return true; // Since we would throw error if undefined
}

export type TestMode = "record" | "playback" | "live";

/**
 * Returns the test mode.
 *
 * If TEST_MODE is not defined, defaults to playback.
 */
export function getTestMode(): TestMode {
  if (isPlaybackMode()) {
    return "playback";
  }
  return env.TEST_MODE?.toLowerCase() as "record" | "live";
}

/** Make a lazy value that can be deferred and only computed once. */
export const once = <T>(make: () => T): (() => T) => {
  let value: T;
  return () => (value = value ?? make());
};

export function isRecordMode() {
  return env.TEST_MODE?.toLowerCase() === "record";
}

export function isLiveMode() {
  return env.TEST_MODE?.toLowerCase() === "live";
}

export function isPlaybackMode() {
  return !isRecordMode() && !isLiveMode();
}

/**
 * Loads the environment variables in both node and browser modes corresponding to the key-value pairs provided.
 *
 * Example-
 *
 * Suppose `variables` is { ACCOUNT_NAME: "my_account_name", ACCOUNT_KEY: "fake_secret" },
 * `setEnvironmentVariables` loads the ACCOUNT_NAME and ACCOUNT_KEY in the environment accordingly.
 */
export function setEnvironmentVariables(variables: { [key: string]: string }) {
  for (const [key, value] of Object.entries(variables)) {
    env[key] = value;
  }
}

/**
 * Returns the environment variable. Throws error if not defined.
 */
export function assertEnvironmentVariable(variable: string): string {
  const value = env[variable];
  if (!value) throw new Error(`${variable} is not defined`);
  return value;
}
