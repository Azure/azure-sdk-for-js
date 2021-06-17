import { Client, HttpResponse } from "@azure-rest/core-client";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import { createGetLROState, LROPoller } from "./lro";
import { LROPollerOptions } from "./lro/lroPoller";
import { LRO, LROBody, LROState } from "./lro/models";

export function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  pollerOptions: LROPollerOptions = {}
): PollerLike<PollOperationState<TResult>, TResult> {
  const lroResponse = gerLroResponse<TResult>(initialResponse);

  const poller: LRO<TResult> = {
    requestMethod: initialResponse.request.method,
    requestPath: initialResponse.request.url,
    sendInitialRequest: async (initializeState) => {
      initializeState(lroResponse.rawResponse, lroResponse.flatResponse);
      return lroResponse;
    },
    sendPollRequest: async (config, path) => {
      const response = (await client
        .pathUnchecked(path ?? initialResponse.request.url)
        .get()) as TResult;

      const lroResponse = gerLroResponse<TResult>(response);

      return createGetLROState<TResult>(poller, config)(
        lroResponse.rawResponse,
        lroResponse.flatResponse
      );
    }
  };

  return new LROPoller(pollerOptions, poller);
}

function gerLroResponse<TResult extends HttpResponse>(response: TResult): LROState<TResult> {
  return {
    flatResponse: response,
    rawResponse: {
      ...response,
      statusCode: Number.parseInt(response.status),
      body: response.body as LROBody
    },
    done: false
  };
}
