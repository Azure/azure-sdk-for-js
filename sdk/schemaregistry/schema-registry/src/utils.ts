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

export interface SchemaLocationInfo {
  group: string;
  name: string;
}

/**
 * Parses the location header
 */
export function parseLocationHeader(url: string): SchemaLocationInfo {
  const regex = new RegExp(/\$schemagroups\/(.*)\/schemas\/(.*?)\/.*/);
  const res = regex.exec(url);
  if (res === null) {
    throw new Error(`Unexpected location header: "${url}"`);
  }
  return {
    group: res[1],
    name: res[2]
  };
}
