// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  HttpOperationMode,
  RunningOperation,
  ResourceLocationConfig,
  OperationResponse,
  RawResponse,
  ResponseBody,
} from "./models.js";
import type {
  LroError,
  OperationConfig,
  OperationState,
  OperationStatus,
  RestorableOperationState,
} from "../poller/models.js";
import { pollOperation } from "../poller/operation.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import { logger } from "../logger.js";

function getOperationLocationPollingUrl(inputs: {
  operationLocation?: string;
  azureAsyncOperation?: string;
}): string | undefined {
  const { azureAsyncOperation, operationLocation } = inputs;
  return operationLocation ?? azureAsyncOperation;
}

function getLocationHeader(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["location"];
}

function getOperationLocationHeader(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["operation-location"];
}

function getAzureAsyncOperationHeader(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["azure-asyncoperation"];
}

function findResourceLocation(inputs: {
  requestMethod?: string;
  location?: string;
  requestPath?: string;
  resourceLocationConfig?: ResourceLocationConfig;
  skipFinalGet?: boolean;
}): string | undefined {
  const { location, requestMethod, requestPath, resourceLocationConfig, skipFinalGet } = inputs;

  // If skipFinalGet is true, return undefined to skip the final GET request
  if (skipFinalGet) {
    return undefined;
  }

  switch (requestMethod) {
    case "PUT": {
      return requestPath;
    }
    case "DELETE": {
      return undefined;
    }
    case "PATCH": {
      return getDefault() ?? requestPath;
    }
    default: {
      return getDefault();
    }
  }

  function getDefault(): string | undefined {
    switch (resourceLocationConfig) {
      case "operation-location":
      case "azure-async-operation": {
        return undefined;
      }
      case "original-uri": {
        return requestPath;
      }
      case "location":
      default: {
        return location;
      }
    }
  }
}

export function inferLroMode(
  rawResponse: RawResponse,
  resourceLocationConfig?: ResourceLocationConfig,
  skipFinalGet?: boolean,
): (OperationConfig & { mode: HttpOperationMode }) | undefined {
  const requestPath = rawResponse.request.url;
  const requestMethod = rawResponse.request.method;
  const operationLocation = getOperationLocationHeader(rawResponse);
  const azureAsyncOperation = getAzureAsyncOperationHeader(rawResponse);
  const pollingUrl = getOperationLocationPollingUrl({ operationLocation, azureAsyncOperation });
  const location = getLocationHeader(rawResponse);
  const normalizedRequestMethod = requestMethod?.toLocaleUpperCase();
  if (pollingUrl !== undefined) {
    return {
      mode: "OperationLocation",
      operationLocation: pollingUrl,
      resourceLocation: findResourceLocation({
        requestMethod: normalizedRequestMethod,
        location,
        requestPath,
        resourceLocationConfig,
        skipFinalGet,
      }),
      initialRequestUrl: requestPath,
      requestMethod,
    };
  } else if (location !== undefined) {
    return {
      mode: "ResourceLocation",
      operationLocation: location,
      initialRequestUrl: requestPath,
      requestMethod,
    };
  } else if (normalizedRequestMethod === "PUT" && requestPath) {
    return {
      mode: "Body",
      operationLocation: requestPath,
      initialRequestUrl: requestPath,
      requestMethod,
    };
  } else {
    return undefined;
  }
}

function transformStatus(inputs: { status: unknown; statusCode: number }): OperationStatus {
  const { status, statusCode } = inputs;
  if (typeof status !== "string" && status !== undefined) {
    throw new Error(
      `Polling was unsuccessful. Expected status to have a string value or no value but it has instead: ${status}. This doesn't necessarily indicate the operation has failed. Check your Azure subscription or resource status for more information.`,
    );
  }
  logger.verbose(`LRO: Transforming status: ${status} with status code: ${statusCode}.`);
  const lowerCaseStatus = status?.toLocaleLowerCase();
  if (!lowerCaseStatus) {
    return toOperationStatus(statusCode);
  }
  if (lowerCaseStatus.includes("succeeded")) {
    return "succeeded";
  }
  if (lowerCaseStatus.includes("fail")) {
    return "failed";
  }
  if (["canceled", "cancelled"].includes(lowerCaseStatus)) {
    return "canceled";
  }
  return "running";
}

function getStatus(rawResponse: RawResponse): OperationStatus {
  const { status } = (rawResponse.body as ResponseBody) ?? {};
  return transformStatus({ status, statusCode: rawResponse.statusCode });
}

function getProvisioningState(rawResponse: RawResponse): OperationStatus {
  const { properties, provisioningState } = (rawResponse.body as ResponseBody) ?? {};
  const status = properties?.provisioningState ?? provisioningState;
  return transformStatus({ status, statusCode: rawResponse.statusCode });
}

function toOperationStatus(statusCode: number): OperationStatus {
  if (statusCode === 202) {
    return "running";
  } else if (statusCode < 300) {
    return "succeeded";
  } else {
    return "failed";
  }
}

const shortWeekday = String.raw`(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)`;
const longWeekday = String.raw`(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)`;
const month = String.raw`(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)`;
const imfFixdatePattern = new RegExp(
  String.raw`^(${shortWeekday}), (\d{2}) (${month}) (\d{4}) (\d{2}):(\d{2}):(\d{2}) GMT$`,
);
const rfc850DatePattern = new RegExp(
  String.raw`^(${longWeekday}), (\d{2})-(${month})-(\d{2}) (\d{2}):(\d{2}):(\d{2}) GMT$`,
);
const asctimeDatePattern = new RegExp(
  String.raw`^(${shortWeekday}) (${month}) (\d{2}| \d) (\d{2}):(\d{2}):(\d{2}) (\d{4})$`,
);
const shortWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const longWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Parses the `Retry-After` header into a polling interval in milliseconds.
 *
 * Returns `undefined` only when the header is absent, which means the server
 * expressed no opinion about the next polling interval. When the header is
 * present but cannot be honored — malformed, negative, non-finite after
 * conversion, or a date that is not in the future — `NaN` is returned so the
 * poller falls back to the caller's configured interval instead of reusing a
 * delay from an earlier response. Zero is a valid delay-seconds value, but
 * the poller falls back to the configured interval rather than scheduling
 * repeated zero-delay polls. The raw converted value is returned without any
 * timer bound; the poller is responsible for bounding it before scheduling.
 */
export function parseRetryAfter<T>({ rawResponse }: OperationResponse<T>): number | undefined {
  const retryAfter: string | undefined = rawResponse.headers["retry-after"];
  if (retryAfter === undefined) {
    return undefined;
  }
  // Retry-After header value is either in HTTP date format, or in seconds
  if (/^[0-9]+$/.test(retryAfter)) {
    return Number(retryAfter) * 1000;
  }
  const retryAfterDate = new Date(retryAfter);
  if (!isValidHttpDate(retryAfter, retryAfterDate)) {
    return Number.NaN;
  }
  return calculatePollingIntervalFromDate(retryAfterDate);
}

export function getErrorFromResponse<T>(response: OperationResponse<T>): LroError | undefined {
  const error = accessBodyProperty(response, "error");
  if (!error) {
    logger.warning(
      `The long-running operation failed but there is no error property in the response's body`,
    );
    return;
  }
  if (!error.code || !error.message) {
    logger.warning(
      `The long-running operation failed but the error property in the response's body doesn't contain code or message`,
    );
    return;
  }
  return error as LroError;
}

function isValidHttpDate(value: string, date: Date): boolean {
  let match: RegExpExecArray | null;
  let weekday: string;
  let day: number;
  let monthIndex: number;
  let year: number;
  let yearIsTwoDigits = false;
  let hours: number;
  let minutes: number;
  let seconds: number;

  if ((match = imfFixdatePattern.exec(value))) {
    weekday = match[1];
    day = Number(match[2]);
    monthIndex = months.indexOf(match[3]);
    year = Number(match[4]);
    hours = Number(match[5]);
    minutes = Number(match[6]);
    seconds = Number(match[7]);
  } else if ((match = rfc850DatePattern.exec(value))) {
    weekday = shortWeekdays[longWeekdays.indexOf(match[1])];
    day = Number(match[2]);
    monthIndex = months.indexOf(match[3]);
    year = Number(match[4]);
    yearIsTwoDigits = true;
    hours = Number(match[5]);
    minutes = Number(match[6]);
    seconds = Number(match[7]);
  } else if ((match = asctimeDatePattern.exec(value))) {
    weekday = match[1];
    monthIndex = months.indexOf(match[2]);
    day = Number(match[3].trim());
    hours = Number(match[4]);
    minutes = Number(match[5]);
    seconds = Number(match[6]);
    year = Number(match[7]);
  } else {
    return false;
  }

  return (
    Number.isFinite(date.getTime()) &&
    monthIndex >= 0 &&
    date.getUTCDate() === day &&
    date.getUTCMonth() === monthIndex &&
    (yearIsTwoDigits ? date.getUTCFullYear() % 100 === year : date.getUTCFullYear() === year) &&
    date.getUTCHours() === hours &&
    date.getUTCMinutes() === minutes &&
    date.getUTCSeconds() === seconds &&
    date.getUTCDay() === shortWeekdays.indexOf(weekday)
  );
}

function calculatePollingIntervalFromDate(retryAfterDate: Date): number {
  const timeNow = Math.floor(new Date().getTime());
  const retryAfterTime = retryAfterDate.getTime();
  if (timeNow < retryAfterTime) {
    return retryAfterTime - timeNow;
  }
  // The header was present but is unusable: either it is not a valid HTTP date
  // or the date is not in the future. `NaN` signals that no interval could be
  // derived from a header that was nonetheless sent by the server.
  return Number.NaN;
}

export function getStatusFromInitialResponse<
  TResult,
  TState extends OperationState<TResult>,
>(inputs: {
  response: OperationResponse<unknown>;
  state: RestorableOperationState<TResult, TState>;
  operationLocation?: string;
}): OperationStatus {
  const { response, state, operationLocation } = inputs;
  function helper(): OperationStatus {
    const mode = state.config.metadata?.["mode"];
    switch (mode) {
      case undefined:
        return toOperationStatus(response.rawResponse.statusCode);
      case "Body":
        return getOperationStatus(response, state);
      default:
        return "running";
    }
  }
  const status = helper();
  return status === "running" && operationLocation === undefined ? "succeeded" : status;
}

export function getOperationLocation<TResult, TState extends OperationState<TResult>>(
  { rawResponse }: OperationResponse,
  state: RestorableOperationState<TResult, TState>,
): string | undefined {
  const mode = state.config.metadata?.["mode"];
  switch (mode) {
    case "OperationLocation": {
      return getOperationLocationPollingUrl({
        operationLocation: getOperationLocationHeader(rawResponse),
        azureAsyncOperation: getAzureAsyncOperationHeader(rawResponse),
      });
    }
    case "ResourceLocation": {
      return getLocationHeader(rawResponse);
    }
    case "Body":
    default: {
      return undefined;
    }
  }
}

export function getOperationStatus<TResult, TState extends OperationState<TResult>>(
  { rawResponse }: OperationResponse,
  state: RestorableOperationState<TResult, TState>,
): OperationStatus {
  const mode = state.config.metadata?.["mode"];
  switch (mode) {
    case "OperationLocation": {
      return getStatus(rawResponse);
    }
    case "ResourceLocation": {
      return toOperationStatus(rawResponse.statusCode);
    }
    case "Body": {
      return getProvisioningState(rawResponse);
    }
    default:
      throw new Error(`Internal error: Unexpected operation mode: ${mode}`);
  }
}

function accessBodyProperty<P extends string>(
  { flatResponse, rawResponse }: OperationResponse,
  prop: P,
): ResponseBody[P] {
  return (flatResponse as ResponseBody)?.[prop] ?? (rawResponse.body as ResponseBody)?.[prop];
}

export function getResourceLocation<TResult, TState extends OperationState<TResult>>(
  res: OperationResponse,
  state: RestorableOperationState<TResult, TState>,
): string | undefined {
  const loc = accessBodyProperty(res, "resourceLocation");
  if (loc && typeof loc === "string") {
    state.config.resourceLocation = loc;
  }
  return state.config.resourceLocation;
}

export function isOperationError(e: Error): boolean {
  return e.name === "RestError";
}

/** Polls the long-running operation. */
export async function pollHttpOperation<TState extends OperationState<TResult>, TResult>(inputs: {
  lro: RunningOperation;
  processResult?: (result: unknown, state: TState) => Promise<TResult>;
  updateState?: (state: TState, lastResponse: OperationResponse) => void;
  isDone?: (lastResponse: OperationResponse, state: TState) => boolean;
  setDelay: (intervalInMs: number) => void;
  options?: { abortSignal?: AbortSignalLike };
  state: RestorableOperationState<TResult, TState>;
  setErrorAsResult: boolean;
}): Promise<void> {
  const { lro, options, processResult, updateState, setDelay, state, setErrorAsResult } = inputs;
  return pollOperation({
    state,
    setDelay,
    processResult: processResult
      ? ({ flatResponse }, inputState) => processResult(flatResponse, inputState)
      : ({ flatResponse }) => flatResponse as Promise<TResult>,
    getError: getErrorFromResponse,
    updateState,
    getPollingInterval: parseRetryAfter,
    getOperationLocation,
    getOperationStatus,
    isOperationError,
    getResourceLocation,
    options,
    /**
     * The expansion here is intentional because `lro` could be an object that
     * references an inner this, so we need to preserve a reference to it.
     */
    poll: (location: string, inputOptions?: { abortSignal?: AbortSignalLike }) =>
      lro.sendPollRequest(location, inputOptions),
    setErrorAsResult,
  });
}
