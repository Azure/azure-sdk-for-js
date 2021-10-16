// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
 * Test-proxy tool supports "extensions" or "customizations" to the recording experience.
 * This means that non-default sanitizations such as the generalized regex find/replace on different parts of the recordings in various ways are possible.
 */
export interface SanitizerOptions {
  /**
   * This sanitizer offers a general regex replace across request/response Body, Headers, and URI. For the body, this means regex applying to the raw JSON.
   */
  generalRegexSanitizers?: Array<{
    /**
     * The substitution value.
     */
    value: string;
    /**
     * A regex. Can be defined as a simple regex replace OR if groupForReplace is set, a subsitution operation.
     */
    regex: string;
    /**
     * The capture group that needs to be operated upon. Do not set if you're invoking a simple replacement operation.
     */
    groupForReplace?: string;
  }>;
  /**
   * Internally,
   * - connection strings are parsed and
   * - each part of the connection string is mapped with its corresponding fake value
   * - `generalRegexSanitizer` is applied for each of the parts with the real and fake values that are parsed
   */
  connectionStringSanitizers?: Array<{
    /**
     * Real connection string with all the secrets
     */
    actualConnString: string;
    /**
     * Fake connection string - with all the parts of the connection string mapped to fake values
     */
    fakeConnString: string;
  }>;
  /**
   * This sanitizer offers regex replace within a returned body.
   *
   * Specifically, this means regex applying to the raw JSON.
   * If you are attempting to simply replace a specific key, the BodyKeySanitizer is probably the way to go.
   *
   * Regardless, there are examples present in `recorder-new/test/testProxyTests.spec.ts`.
   */
  bodyRegexSanitizers?: Array<{
    /**
     * The substitution value.
     */
    value: string;
    /**
     * A regex. Can be defined as a simple regex replace OR if groupForReplace is set, a subsitution operation.
     */
    regex: string;
    /**
     * The capture group that needs to be operated upon. Do not set if you're invoking a simple replacement operation.
     */
    groupForReplace?: string;
  }>;
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
  bodyKeySanitizers?: Array<{
    /**
     * The substitution value.
     */
    value: string;
    /**
     * A regex. Can be defined as a simple regex replace OR if groupForReplace is set, a subsitution operation. Defaults to replacing the entire string.
     */
    regex: string;
    /**
     * The SelectToken path (which could possibly match multiple entries) that will be used to select JTokens for value replacement.
     */
    jsonPath: string;
    /**
     * A regex. Can be defined as a simple regex replace OR if groupForReplace is set, a subsitution operation. Defaults to replacing the entire string.
     */
    groupForReplace?: string;
  }>;
  /**
   * TODO
   * Has a bug, not implemented fully.
   */
  continuationSanitizers?: Array<{ key: string; method?: string; resetAfterFirst: boolean }>;
  /**
   * Can be used for multiple purposes:
   *
   * 1) To replace a key with a specific value, do not set "regex" value.
   * 2) To do a simple regex replace operation, define arguments "key", "value", and "regex"
   * 3) To do a targeted substitution of a specific group, define all arguments "key", "value", and "regex"
   */
  headerRegexSanitizers?: Array<{
    /**
     * The name of the header we're operating against.
     */
    key: string;
    /**
     * The substitution or whole new header value, depending on "regex" setting.
     */
    value: string;
    /**
     * A regex. Can be defined as a simple regex replace OR if groupForReplace is set, a subsitution operation.
     */
    regex?: string;
    /**
     * The capture group that needs to be operated upon. Do not set if you're invoking a simple replacement operation.
     */
    groupForReplace?: string;
  }>;
  /**
   * General use sanitizer for cleaning URIs via regex. Runs a regex replace on the member of your choice.
   */
  uriRegexSanitizers?: Array<{
    /**
     * The substitution value.
     */
    value: string;
    /**
     * A regex. Can be defined as a simple regex replace OR if groupForReplace is set, a subsitution operation.
     */
    regex: string;
    /**
     * The capture group that needs to be operated upon. Do not set if you're invoking a simple replacement operation.
     */
    groupForReplace?: string;
  }>;
  /**
   * A simple sanitizer that should be used to clean out one or multiple headers by their key.
   * Removes headers from before saving a recording.
   */
  removeHeaderSanitizer?: {
    /**
     * Array of header names.
     */
    headersForRemoval: string[];
  };
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
     *
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
 * Helper TypeGuard that checks if something is defined.
 * @param thing - Anything
 * @internal
 */
export function isDefined<T>(thing: T | undefined | null): thing is T {
  return typeof thing !== "undefined" && thing !== null;
}

/**
 * Template error message when the `label` is not defined when it should have been defined.
 */
export function shouldExistErrorMessage(label: string, mode: string) {
  return `Something went wrong, ${label} should not have been undefined in ${mode} mode.`;
}
