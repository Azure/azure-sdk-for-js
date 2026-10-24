// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const requestCompletions = new WeakMap<object, Promise<void>>();

export function setRequestCompletion(response: object, completion: Promise<void>): void {
  requestCompletions.set(response, completion);
  void completion.then(() => {
    if (requestCompletions.get(response) === completion) {
      requestCompletions.delete(response);
    }
    return undefined;
  });
}

/**
 * Returns a promise that resolves when the response's outgoing request has completed.
 *
 * @param response - The response whose request completion should be observed.
 * @returns The request completion promise, if the transport provides one.
 */
export function getRequestCompletion(response: object): Promise<void> | undefined {
  return requestCompletions.get(response);
}
