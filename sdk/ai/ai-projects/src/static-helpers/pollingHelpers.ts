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
 * CUSTOMIZATION: SDK-IMPROVEMENT: The emitted pollers resolve to the job's terminal
 * `result` payload, which does not carry the job identifier. This state adds the id so
 * callers can use the get/cancel/delete APIs without a list-and-match lookup.
 */
export interface JobOperationState<TResult> extends OperationState<TResult> {
  /** Server-assigned id of the created job. Available once `submitted()` resolves. */
  readonly jobId?: string;
}

/** A poller for a long-running operation that creates a job resource. */
export type JobPoller<TResult> = Omit<
  PollerLike<OperationState<TResult>, TResult>,
  "operationState"
> & {
  readonly operationState: JobOperationState<TResult> | undefined;
};

/**
 * Builds a {@link JobPoller} that records the created job's id from the initial response.
 *
 * CUSTOMIZATION: SDK-IMPROVEMENT: Why this helper exists at all
 * ------------------------------------------------------------
 * `@azure/core-lro` v3 offers no supported hook to write service-derived data into the
 * poller's state from the *initial* (create) response:
 *   - `updateState` is only invoked from `pollOperation`, never from `initOperation`.
 *   - `processResult` only runs once the operation reaches a terminal status.
 *   - `withOperationLocation` receives only a URL, and at init it runs before the state
 *     object even exists.
 * So the id has to be captured here and merged in by hand. Tracked upstream in
 * https://github.com/Azure/azure-sdk-for-js/issues/39476 — once core-lro grows an
 * `initializeState` hook, this whole helper collapses into a few lines of options.
 */
export function getJobPoller<TResponse extends PathUncheckedResponse, TResult = void>(
  client: Client,
  processResponseBody: (result: TResponse) => Promise<TResult>,
  expectedStatuses: string[],
  // `getInitialResponse` stays optional (i.e. we do NOT narrow it to required) so this
  // remains a drop-in replacement for `getLongRunningPoller`. Narrowing it would make the
  // `restoreFrom` resume path — which never sends an initial request — impossible to type.
  options: GetLongRunningPollerOptions<TResponse>,
): JobPoller<TResult> {
  const { getInitialResponse } = options;
  let jobId: string | undefined;

  // Capture the id inside the initial request. core-lro awaits this from `sendInitialRequest`,
  // which `submitted()` in turn awaits, so `jobId` is guaranteed to be set by the time
  // `submitted()` resolves — that is the contract the samples and CHANGELOG rely on.
  const base = getLongRunningPoller(client, processResponseBody, expectedStatuses, {
    ...options,
    getInitialResponse: getInitialResponse
      ? async () => {
          const response = await getInitialResponse();
          jobId = extractJobId(response);
          return response;
        }
      : undefined,
  });

  // core-lro deliberately shares ONE state object across `operationState`, `poll()`,
  // `onProgress()` and `serialize()` (see buildCreatePoller in @azure/core-lro). Mutating
  // that shared object — rather than handing back `{ ...state, jobId }` copies — is what
  // makes every channel agree and makes the id survive `serialize()` for free.
  //
  // Returning copies instead would reintroduce three bugs:
  //   1. `poll()` / `onProgress()` would hand back state without `jobId`, contradicting
  //      the `JobOperationState` type they are declared to return.
  //   2. Callers holding a reference to a previously returned state would see it go stale,
  //      since core-lro keeps updating the original object and not the copy.
  //   3. `serialize()` would drop `jobId`, so a resumed poller could never recover it.
  //
  // `??=` (rather than `=`) preserves an id that was already rehydrated from serialized
  // state, so resuming a poller does not clobber the restored value with `undefined`.
  const stamp = (
    state: OperationState<TResult> | undefined,
  ): JobOperationState<TResult> | undefined => {
    if (state && jobId !== undefined) {
      (state as { jobId?: string }).jobId ??= jobId;
    }
    return state as JobOperationState<TResult> | undefined;
  };

  // A delegating wrapper, rather than `Object.defineProperty` over the `operationState`
  // accessor. Patching the accessor would only fix that one channel, and it would depend on
  // `operationState` remaining an *own* accessor on a core-lro object literal — an
  // undocumented internal. If core-lro ever moved it to a prototype or a Proxy, the patch
  // would silently start returning `undefined` with no error and no failing test, and we
  // float on a caret range (`^3.1.0`) so a minor bump could do exactly that.
  return {
    get isDone(): boolean {
      return base.isDone;
    },
    get result(): TResult | undefined {
      return base.result;
    },
    get operationState(): JobOperationState<TResult> | undefined {
      return stamp(base.operationState);
    },
    // No stamping needed here: every channel that can expose state (`operationState`,
    // `poll()`, `onProgress()`, `serialize()`) stamps on access, so plain delegation is enough.
    submitted: () => base.submitted(),
    async poll(pollOptions?: {
      abortSignal?: AbortSignalLike;
    }): Promise<JobOperationState<TResult>> {
      return stamp(await base.poll(pollOptions))!;
    },
    // Intentionally NOT wrapped: `pollUntilDone` drives core-lro's internal `poll`, not the
    // one above. It resolves to `TResult`, which carries no state, and the shared state
    // object has already been stamped by `submitted()` — so progress handlers dispatched
    // from inside it still observe `jobId`.
    pollUntilDone: (pollOptions?: { abortSignal?: AbortSignalLike }) =>
      base.pollUntilDone(pollOptions),
    onProgress: (callback: (state: JobOperationState<TResult>) => void) =>
      base.onProgress((state) => callback(stamp(state)!)),
    async serialize(): Promise<string> {
      // `serialize()` stringifies core-lro's state object, so the id must be stamped onto it
      // first or it is lost. Awaiting `submitted()` guarantees the state exists and that
      // `jobId` has been captured; without it, serializing an unsubmitted poller would
      // silently produce state with no id.
      await base.submitted();
      stamp(base.operationState);
      return base.serialize();
    },
    // `then`/`catch`/`finally` delegate straight through, matching core-lro's own
    // implementation — a `PollerLike` is a thenable that resolves via `pollUntilDone()`.
    then: (onfulfilled, onrejected) => base.then(onfulfilled, onrejected),
    catch: (onrejected) => base.catch(onrejected),
    finally: (onfinally) => base.finally(onfinally),
    [Symbol.toStringTag]: "Poller",
  };
}

/**
 * Reads the created job's id from the initial response.
 *
 * Order matters: the TypeSpec models the create response body as the full job resource with a
 * required `id`, so the body is authoritative and is tried first. The headers are a defensive
 * fallback for an empty body — `location` (the created job's URL) is preferred over
 * `operation-location` (the polling URL) because the former is defined to point at the
 * resource. They happen to be the same route today, but that is not guaranteed.
 */
function extractJobId(response: PathUncheckedResponse): string | undefined {
  const id = (response.body as { id?: unknown } | undefined)?.id;
  if (typeof id === "string" && id.length > 0) {
    return id;
  }

  const url = response.headers["location"] ?? response.headers["operation-location"];
  if (!url) {
    return undefined;
  }

  // Parsed via `URL` rather than string slicing so query strings, fragments, trailing
  // slashes and percent-encoding are all handled correctly. The base is only needed to make
  // relative URLs parseable and never appears in the result.
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
