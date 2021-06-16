import { Client, RequestParameters, HttpResponse } from "@azure-rest/core-client";
import { PollOperationState, PollerLike, Poller, PollOperation } from "@azure/core-lro";
import { delay } from "@azure/core-util";

export type OperationStatus = "notStarted" | "running" | "succeeded" | "failed";

const terminalStates = ["succeeded", "failed", "canceled"];

export interface PollState<TResult extends HttpResponse> extends PollOperationState<TResult> {
  status?: OperationStatus;
  updateIntervalInMs?: number;
}
export interface PollingOperation<TResult extends HttpResponse>
  extends PollOperation<PollState<TResult>, TResult> {
  updateIntervalInMs?: number;
  pollUrl?: string;
}
export interface LROPollerOptions<TResult extends HttpResponse> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  intervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
  onProgress?: (state: PollState<TResult>) => void;
  updateIntervalInMs?: number;
}

// interface LongRunningOperations {
//   "/foo/{barId}": { result: HttpResponse, params: [barId: string, options?: RequestParameters]};
// }

// type OperationMethodMap = Record<string, HttpMethods>;

// const operationMethods: OperationMethodMap= {
//   "/foo/bar": "PUT",
//   "/foo/baz": "POST"
// };

export function beginOperation<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult
): PollerLike<PollState<TResult>, TResult> {
  const httpStatus = Number.parseInt(initialResponse.status);

  if (httpStatus > 299) {
    throw (initialResponse.body as any)?.error ??
      new Error(
        `Failed to begin long running operation, initial request failed with status code${httpStatus}`
      );
  }

  return coreBeginOperation(client, initialResponse);
}

export function coreBeginOperation<TResult extends HttpResponse>(
  client: Client,
  initialResponse: HttpResponse,
  options?: { pollerOptions?: LROPollerOptions<TResult>; requestOptions?: RequestParameters }
): PollerLike<PollState<TResult>, TResult> {
  const requestOptions = options?.requestOptions ?? {};
  return new OperationPoller(client, initialResponse, options?.pollerOptions ?? {}, requestOptions);
}

class OperationPoller<TResult extends HttpResponse> extends Poller<PollState<TResult>, TResult> {
  public updateIntervalInMs: number;
  constructor(
    client: Client,
    initialRequest: HttpResponse,
    pollerOptions: LROPollerOptions<TResult>,
    requestOptions: RequestParameters = {}
  ) {
    const { resumeFrom, onProgress, updateIntervalInMs = 5000 } = pollerOptions;
    let state: PollState<TResult> | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeBeginOperation<TResult>(
      client,
      initialRequest,
      requestOptions,
      updateIntervalInMs,
      {
        ...state,
        status: "notStarted"
      }
    );

    super(operation);

    this.updateIntervalInMs = updateIntervalInMs;

    if (typeof onProgress === "function") {
      this.onProgress(onProgress);
    }
  }
  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  async delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}

function isLocationOperation(response: HttpResponse) {
  if (!response.headers["location"]) {
    return false;
  }
  return true;
}

function isOperationLocation(response: HttpResponse) {
  if (!response.headers["operation-location"] || response.headers["location"]) {
    return false;
  }
  return true;
}

async function locationUpdate<TResult extends HttpResponse>(
  client: Client,
  initialResponse: HttpResponse,
  pollerState: PollState<TResult>,
  pollOperation: PollingOperation<TResult>,
  updateIntervalInMs: number,
  requestOptions: RequestParameters
) {
  if (!pollerState.isStarted) {
    pollerState.isStarted = true;
    const result = initialResponse;
    const httpStatus = Number.parseInt(result.status);

    if (httpStatus > 299) {
      const error = new Error(`Failed to begin long running operation`);
      pollOperation.state.isCompleted = true;
      pollOperation.state.error = error;
      return pollOperation;
    }

    if (result.status !== "202") {
      pollOperation.state.isCompleted = true;
      pollOperation.state.result = result as TResult;
      return pollOperation;
    }

    const location = getLocation(result);
    pollOperation.pollUrl = location;
    pollOperation.updateIntervalInMs = getRetryAfterInMs(result) || updateIntervalInMs;
  }

  if (!pollerState.isCompleted) {
    const result = await client.pathUnchecked(pollOperation.pollUrl!).get(requestOptions);
    const httpStatus = Number.parseInt(result.status);
    if (httpStatus > 299) {
      const error = new Error(`Failed to begin long running operation`);
      pollOperation.state.isCompleted = true;
      pollOperation.state.error = error;
      return pollOperation;
    }

    if (result.status !== "202") {
      pollOperation.state.isCompleted = true;
      pollOperation.state.result = result as TResult;
    }
  }

  return pollOperation;
}

async function operationLocationUpdate<TResult extends HttpResponse>(
  client: Client,
  initialResponse: HttpResponse,
  pollerState: PollState<TResult>,
  pollOperation: PollingOperation<TResult>,
  updateIntervalInMs: number,
  requestOptions: RequestParameters
) {
  if (!pollerState.isStarted) {
    pollerState.isStarted = true;
    const result = initialResponse;
    const httpStatus = Number.parseInt(result.status);

    if (httpStatus > 299) {
      const error = new Error(`Failed to begin long running operation`);
      pollOperation.state.isCompleted = true;
      pollOperation.state.error = error;
      return pollOperation;
    }

    const operationStatus = getOperationStatus(result);

    if (operationStatus && terminalStates.includes(operationStatus)) {
      pollOperation.state.isCompleted = true;
      pollOperation.state.result = result as TResult;
      return pollOperation;
    }

    const operationLocation = getOperationLocation(result);
    pollOperation.pollUrl = operationLocation;
    pollOperation.updateIntervalInMs = getRetryAfterInMs(result) || updateIntervalInMs;
  }

  if (!pollerState.isCompleted) {
    const result = await client.pathUnchecked(pollOperation.pollUrl!).get(requestOptions);
    const operationStatus = getOperationStatus(result);

    if (terminalStates.includes(operationStatus ?? "succeeded")) {
      pollOperation.state.isCompleted = true;
      pollOperation.state.result = result as TResult;
    }
  }

  return pollOperation;
}

function makeBeginOperation<TResult extends HttpResponse>(
  client: Client,
  initialResponse: HttpResponse,
  requestOptions: RequestParameters,
  updateIntervalInMs: number,
  state: PollState<TResult>
): PollingOperation<TResult> {
  const self: PollingOperation<TResult> = {
    state: { ...state },
    async cancel(): Promise<PollingOperation<TResult>> {
      // TODO
      throw new Error("Cancel operation is not supported.");
    },
    async update(): Promise<PollingOperation<TResult>> {
      const pollerState = self.state;
      if (isOperationLocation(initialResponse)) {
        return operationLocationUpdate(
          client,
          initialResponse,
          pollerState,
          self,
          updateIntervalInMs,
          requestOptions
        );
      }

      if (isLocationOperation(initialResponse)) {
        return locationUpdate(
          client,
          initialResponse,
          pollerState,
          self,
          updateIntervalInMs,
          requestOptions
        );
      }
      throw new Error("NYI");
    },
    toString() {
      return JSON.stringify({ state: self.state });
    }
  };

  return self;
}

interface GeneralLROBody extends Record<string, unknown> {
  status?: string;
  properties: { provisioningState?: string } & Record<string, unknown>;
}

function getRetryAfterInMs(response: HttpResponse): number | undefined {
  const retryAfter = response.headers["retry-after"];

  if (retryAfter && !Number.isNaN(retryAfter)) {
    return Number.parseInt(retryAfter);
  }

  return undefined;
}

function getOperationStatus(response: HttpResponse): string | undefined {
  const body = (response.body as GeneralLROBody) ?? {};
  const status = body.status || body?.properties?.provisioningState;

  return status?.toLocaleLowerCase();
}

function getOperationLocation(response: HttpResponse): string {
  const location =
    response.headers["operation-location"] ?? response.headers["azure-asyncoperation"];

  if (!location) {
    throw new Error(
      "Operation-Location or Azure-AsyncOperation not found in headers, one is needed for polling"
    );
  }

  return location;
}

function getLocation(response: HttpResponse): string {
  const location = response.headers["location"];

  if (!location) {
    throw new Error("Location not found in headers, it is needed for polling");
  }

  return location;
}

// function makeRequest(
//   client: Client,
//   path: string,
//   method: HttpMethods,
//   options: RequestParameters = {}
// ): Promise<HttpResponse> {
//   switch (method) {
//     case "DELETE":
//       return client.pathUnchecked(path).delete(options);
//     case "GET":
//       return client.pathUnchecked(path).get(options);
//     case "HEAD":
//       return client.pathUnchecked(path).head(options);
//     case "OPTIONS":
//       return client.pathUnchecked(path).options(options);
//     case "PATCH":
//       return client.pathUnchecked(path).patch(options);
//     case "POST":
//       return client.pathUnchecked(path).post(options);

//     case "PUT":
//       return client.pathUnchecked(path).put(options);

//     case "TRACE":
//       return client.pathUnchecked(path).trace(options);
//   }
// }
