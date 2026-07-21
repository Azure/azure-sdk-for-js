// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Error response. */
export interface QueryFailure {
  /** Error definition. */
  error?: QueryFailureError;
}

export function queryFailureDeserializer(item: any): QueryFailure {
  return {
    error: !item["error"] ? item["error"] : queryFailureErrorDeserializer(item["error"]),
  };
}

/** Error definition. */
export interface QueryFailureError {
  /** Service specific error code which serves as the substatus for the HTTP error code. */
  readonly code?: string;
  /** Description of the error. */
  readonly message?: string;
}

export function queryFailureErrorDeserializer(item: any): QueryFailureError {
  return {
    code: item["code"],
    message: item["message"],
  };
}
