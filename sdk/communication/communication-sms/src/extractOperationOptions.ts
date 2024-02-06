// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

export const extractOperationOptions = <T extends OperationOptions>(
  obj: T
): {
  operationOptions: OperationOptions;
  restOptions: Pick<T, Exclude<keyof T, keyof OperationOptions>>;
} => {
  const {
    abortSignal,
    onResponse,
    requestOptions,
    serializerOptions,
    tracingOptions,
    ...restOptions
  } = obj;

  return {
    operationOptions: {
      abortSignal,
      requestOptions,
      tracingOptions,
    },
    restOptions,
  };
};
