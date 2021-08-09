// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse, OperationOptions } from "@azure/core-client";

export interface ReturnType<T> {
  flatResponse: T;
  rawResponse: FullOperationResponse;
}

export async function getRawResponse<TOptions extends OperationOptions, TResult>(
  f: (options: TOptions) => Promise<TResult>,
  options: TOptions
): Promise<ReturnType<TResult>> {
  const { onResponse } = options || {};
  let rawResponse: FullOperationResponse | undefined = undefined;
  const flatResponse = await f({
    ...options,
    onResponse: (response: FullOperationResponse, flatResponseParam: unknown) => {
      rawResponse = response;
      onResponse?.(response, flatResponseParam);
    }
  });
  return { flatResponse, rawResponse: rawResponse! };
}
