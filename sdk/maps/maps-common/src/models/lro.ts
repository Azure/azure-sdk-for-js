// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  FullOperationResponse,
  OperationOptions,
  OperationSpec,
  ServiceClient,
} from "@azure/core-client";
import { LroResponse } from "@azure/core-lro";

/**
 * Extract several fields of the response to the rawResponse
 *
 * @param getResponse - A async function that actually call the backend API.
 * @param options - The options for the getResponse callback
 * @returns A promise for the API call.
 */
export async function getRawResponse<TOptions extends OperationOptions, TResponse>(
  getResponse: (options: TOptions) => Promise<TResponse>,
  options: TOptions,
): Promise<LroResponse<TResponse>> {
  const { onResponse } = options || {};
  let rawResponse: FullOperationResponse;
  const flatResponse = await getResponse({
    ...options,
    onResponse: (response, flatResponseParam) => {
      rawResponse = response;
      onResponse?.(response, flatResponseParam);
    },
  });
  return {
    flatResponse,
    rawResponse: {
      statusCode: rawResponse!.status,
      headers: rawResponse!.headers.toJSON(),
      body: rawResponse!.parsedBody,
    },
  };
}

/**
 * Helper function to create a method that can be passed to sendPollRequest in createHttpPoller.
 *
 * @param settings - The settings of the poll request, including client, options and the spec
 * @returns A callback that accept the path as input and return the promise of Lro response.
 */
export function createSendPollRequest<
  TOptions extends OperationOptions,
  TClient extends ServiceClient,
>(settings: {
  client: TClient;
  options: TOptions;
  spec: OperationSpec;
}): (path: string) => Promise<LroResponse<unknown>> {
  const { client, options, spec } = settings;
  return async (path: string) =>
    getRawResponse(
      (paramOptions) => client.sendOperationRequest({ options: paramOptions }, { path, ...spec }),
      options,
    );
}
