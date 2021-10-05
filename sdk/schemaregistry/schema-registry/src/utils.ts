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

// return undefined if the response has 404 code
export async function undefinedfyOn404<T>(c: Promise<T>): Promise<T | undefined> {
  try {
    const r = await c;
    return r;
  } catch (e) {
    if (typeof e === "object" && (e as { statusCode: number })?.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
}
