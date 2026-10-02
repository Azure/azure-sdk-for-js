// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PollerLike,
  OperationState,
  OperationStatus,
  ResourceLocationConfig,
  RunningOperation,
  OperationResponse,
} from "@azure/core-lro";
import { createHttpPoller } from "@azure/core-lro";

import type { Client, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { KnownApiVersions } from "../models/models.js";

export interface GetLongRunningPollerOptions<TResponse> {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /**
   * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
   */
  resourceLocationConfig?: ResourceLocationConfig;
  /**
   * The original url of the LRO
   * Should not be null when restoreFrom is set
   */
  initialRequestUrl?: string;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  restoreFrom?: string;
  /**
   * The api-version of the LRO
   */
  apiVersion?: KnownApiVersions;
  /**
   * Additional headers to include on poll requests (e.g. feature-flag headers required by the endpoint).
   */
  pollHeaders?: Record<string, string>;
  /**
   * Optional mapping from service-specific status values to the core-lro status values
   * ("running", "succeeded", "failed", "canceled"). Use this when the service returns
   * non-standard terminal status strings (e.g. "completed" instead of "succeeded").
   */
  statusNormalizations?: Record<string, OperationStatus>;
  /**
   * The function to get the initial response
   */
  getInitialResponse?: () => PromiseLike<TResponse>;
}

/**
 * Operation state for a long-running operation that creates a job resource.
 *
 * CUSTOMIZATION: SDK-IMPROVEMENT: the emitted pollers resolve to the job's terminal `result`
 * payload, which carries no identifier; `jobId` keeps the created job reachable.
 */
export interface JobOperationState<TResult> extends OperationState<TResult> {
  /** Server-assigned id of the created job. Available once `submitted()` resolves. */
  readonly jobId?: string;
}

/** A poller for a long-running operation that creates a job resource. */
export type JobPoller<TResult> = PollerLike<JobOperationState<TResult>, TResult>;

/**
 * Operation state for a long-running operation that creates a run resource.
 *
 * CUSTOMIZATION: SDK-IMPROVEMENT: the emitted poller resolves to the run's terminal `result`
 * payload, which carries no identifier; `runId` keeps the created run reachable.
 */
export interface RunOperationState<TResult> extends OperationState<TResult> {
  /** Server-assigned id of the created run. Available once `submitted()` resolves. */
  readonly runId?: string;
}

/** A poller for a long-running operation that creates a run resource. */
export type RunPoller<TResult> = PollerLike<RunOperationState<TResult>, TResult>;

/**
 * Builds a {@link JobPoller} that records the created job's id from the initial response.
 *
 * CUSTOMIZATION: SDK-IMPROVEMENT: core-lro v3 has no hook for writing service-derived data into
 * poller state from the initial response, so the id is captured and merged in by hand. Tracked
 * in https://github.com/Azure/azure-sdk-for-js/issues/39476.
 */
export function getJobPoller<TResponse extends PathUncheckedResponse, TResult = void>(
  client: Client,
  processResponseBody: (result: TResponse) => Promise<TResult>,
  expectedStatuses: string[],
  options: GetLongRunningPollerOptions<TResponse>,
): JobPoller<TResult> {
  return getIdentifiedPoller<TResponse, TResult, JobOperationState<TResult>>(
    client,
    processResponseBody,
    expectedStatuses,
    options,
    "jobId",
  );
}

/**
 * Builds a {@link RunPoller} that records the created run's id from the initial response.
 *
 * CUSTOMIZATION: SDK-IMPROVEMENT: core-lro v3 has no hook for writing service-derived data into
 * poller state from the initial response, so the id is captured and merged in by hand. Tracked
 * in https://github.com/Azure/azure-sdk-for-js/issues/39476.
 */
export function getRunPoller<TResponse extends PathUncheckedResponse, TResult>(
  client: Client,
  processResponseBody: (result: TResponse) => Promise<TResult>,
  expectedStatuses: string[],
  options: GetLongRunningPollerOptions<TResponse>,
): RunPoller<TResult> {
  return getIdentifiedPoller<TResponse, TResult, RunOperationState<TResult>>(
    client,
    processResponseBody,
    expectedStatuses,
    options,
    "runId",
  );
}

function getIdentifiedPoller<
  TResponse extends PathUncheckedResponse,
  TResult,
  TState extends OperationState<TResult>,
>(
  client: Client,
  processResponseBody: (result: TResponse) => Promise<TResult>,
  expectedStatuses: string[],
  options: GetLongRunningPollerOptions<TResponse>,
  identityKey: "jobId" | "runId",
): PollerLike<TState, TResult> {
  const { getInitialResponse } = options;
  let resourceId: string | undefined;

  // core-lro awaits this from `sendInitialRequest`, which `submitted()` awaits in turn, so
  // `resourceId` is set by the time `submitted()` resolves.
  const base = getLongRunningPoller(client, processResponseBody, expectedStatuses, {
    ...options,
    getInitialResponse: getInitialResponse
      ? async () => {
          const response = await getInitialResponse();
          resourceId = extractResourceId(response);
          return response;
        }
      : undefined,
  });

  // core-lro shares one state object across every channel, so mutating it in place keeps them
  // consistent and lets the id survive `serialize()`. `??=` preserves an id restored from
  // serialized state.
  const stamp = (state: OperationState<TResult> | undefined): TState | undefined => {
    if (state && resourceId !== undefined) {
      const identifiedState = state as OperationState<TResult> & {
        jobId?: string;
        runId?: string;
      };
      identifiedState[identityKey] ??= resourceId;
    }
    return state as TState | undefined;
  };

  return {
    get isDone(): boolean {
      return base.isDone;
    },
    get result(): TResult | undefined {
      return base.result;
    },
    get operationState(): TState | undefined {
      return stamp(base.operationState);
    },
    submitted: () => base.submitted(),
    async poll(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<TState> {
      return stamp(await base.poll(pollOptions))!;
    },
    // Not wrapped: this drives core-lro's internal `poll`, not the one above, and the state it
    // dispatches to progress handlers is already stamped.
    pollUntilDone: (pollOptions?: { abortSignal?: AbortSignalLike }) =>
      base.pollUntilDone(pollOptions),
    onProgress: (callback: (state: TState) => void) =>
      base.onProgress((state) => callback(stamp(state)!)),
    async serialize(): Promise<string> {
      // The id must be stamped before core-lro's state object is stringified; `submitted()`
      // guarantees that object exists and that the resource id has been captured.
      await base.submitted();
      stamp(base.operationState);
      return base.serialize();
    },
    then: (onfulfilled, onrejected) => base.then(onfulfilled, onrejected),
    catch: (onrejected) => base.catch(onrejected),
    finally: (onfinally) => base.finally(onfinally),
    [Symbol.toStringTag]: "Poller",
  };
}

/**
 * Reads the created resource's id from the initial response.
 *
 * The create response body is the resource with a required `id`, so it is authoritative.
 * The `location` header is a fallback for an empty body because it identifies the resource.
 * `operation-location` identifies the polling operation and is not a resource id.
 */
function extractResourceId(response: PathUncheckedResponse): string | undefined {
  const id = (response.body as { id?: unknown } | undefined)?.id;
  if (typeof id === "string" && id.length > 0) {
    return id;
  }

  const url = response.headers["location"];
  if (!url) {
    return undefined;
  }

  // The base only makes relative URLs parseable; it never appears in the result.
  const { pathname } = new URL(url, "https://placeholder.invalid");
  const segment = pathname.replace(/\/+$/, "").split("/").pop();
  return segment ? decodeURIComponent(segment) : undefined;
}

export function getLongRunningPoller<TResponse extends PathUncheckedResponse, TResult = void>(
  client: Client,
  processResponseBody: (result: TResponse) => Promise<TResult>,
  expectedStatuses: string[],
  options: GetLongRunningPollerOptions<TResponse>,
): PollerLike<OperationState<TResult>, TResult> {
  const { restoreFrom, getInitialResponse, apiVersion, pollHeaders, statusNormalizations } =
    options;
  if (!restoreFrom && !getInitialResponse) {
    throw new Error("Either restoreFrom or getInitialResponse must be specified");
  }
  let initialResponse: TResponse | undefined = undefined;
  const pollAbortController = new AbortController();
  const poller: RunningOperation<TResponse> = {
    sendInitialRequest: async () => {
      if (!getInitialResponse) {
        throw new Error("getInitialResponse is required when initializing a new poller");
      }
      initialResponse = await getInitialResponse();
      return getLroResponse(initialResponse, expectedStatuses, statusNormalizations);
    },
    sendPollRequest: async (
      path: string,
      pollOptions?: {
        abortSignal?: AbortSignalLike;
      },
    ) => {
      // The poll request would both listen to the user provided abort signal and the poller's own abort signal
      function abortListener(): void {
        pollAbortController.abort();
      }
      const abortSignal = pollAbortController.signal;
      if (options.abortSignal?.aborted) {
        pollAbortController.abort();
      } else if (pollOptions?.abortSignal?.aborted) {
        pollAbortController.abort();
      } else if (!abortSignal.aborted) {
        options.abortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
        pollOptions?.abortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
      }
      let response;
      try {
        const pollingPath = apiVersion ? addApiVersionToUrl(path, apiVersion) : path;
        response = await client
          .pathUnchecked(pollingPath)
          .get({ abortSignal, headers: pollHeaders });
      } finally {
        options.abortSignal?.removeEventListener("abort", abortListener);
        pollOptions?.abortSignal?.removeEventListener("abort", abortListener);
      }

      return getLroResponse(response as TResponse, expectedStatuses, statusNormalizations);
    },
  };
  return createHttpPoller(poller, {
    intervalInMs: options?.updateIntervalInMs,
    resourceLocationConfig: options?.resourceLocationConfig,
    restoreFrom: options?.restoreFrom,
    processResult: (result: unknown) => {
      return processResponseBody(result as TResponse);
    },
  });
}
/**
 * Converts a Rest Client response to a response that the LRO implementation understands
 * @param response - a rest client http response
 * @param deserializeFn - deserialize function to convert Rest response to modular output
 * @returns - An LRO response that the LRO implementation understands
 */
function getLroResponse<TResponse extends PathUncheckedResponse>(
  response: TResponse,
  expectedStatuses: string[],
  statusNormalizations?: Record<string, OperationStatus>,
): OperationResponse<TResponse> {
  if (!expectedStatuses.includes(response.status)) {
    throw createRestError(response);
  }

  const body = response.body as Record<string, unknown> | undefined;
  const rawStatus = body?.["status"];
  const normalizedBody =
    statusNormalizations && typeof rawStatus === "string" && rawStatus in statusNormalizations
      ? { ...body, status: statusNormalizations[rawStatus] }
      : body;

  return {
    flatResponse: response,
    rawResponse: {
      ...response,
      statusCode: Number.parseInt(response.status),
      body: normalizedBody,
    },
  };
}

/**
 * Sets the api-version query parameter on a URL, replacing any existing value.
 * @param url - the URL to modify
 * @param apiVersion - the API version to set
 * @returns - the URL with the api-version query parameter set
 */
function addApiVersionToUrl(url: string, apiVersion: string): string {
  // The base URL is only used for parsing and won't appear in the returned URL
  const urlObj = new URL(url, "https://microsoft.com");
  const existingVersion = urlObj.searchParams.get("api-version");
  if (!existingVersion) {
    // Append one if there is no apiVersion
    return `${url}${
      Array.from(urlObj.searchParams.keys()).length > 0 ? "&" : "?"
    }api-version=${apiVersion}`;
  }

  if (existingVersion === apiVersion) {
    return url;
  }
  // Replace the service-returned api-version with the client's configured version
  return url.replace(`api-version=${existingVersion}`, `api-version=${apiVersion}`);
}
