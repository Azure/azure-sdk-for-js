// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const responseBodyCompletions = new WeakMap<object, Promise<void>>();

export function setResponseBodyCompletion(response: object, completion: Promise<void>): void {
  responseBodyCompletions.set(response, completion);
  void completion.then(() => {
    if (responseBodyCompletions.get(response) === completion) {
      responseBodyCompletions.delete(response);
    }
    return undefined;
  });
}

/**
 * Returns a promise that resolves when the response body has completed, errored, or been canceled.
 *
 * @param response - The response whose body completion should be observed.
 * @returns The response body completion promise, if the transport provides one.
 */
export function getResponseBodyCompletion(response: object): Promise<void> | undefined {
  return responseBodyCompletions.get(response);
}
