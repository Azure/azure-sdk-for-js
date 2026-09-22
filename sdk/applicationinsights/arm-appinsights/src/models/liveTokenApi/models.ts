// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The response to a live token query. */
export interface LiveTokenResponse {
  /** JWT token for accessing live metrics stream data. */
  readonly liveToken?: string;
}

export function liveTokenResponseDeserializer(item: any): LiveTokenResponse {
  return {
    liveToken: item["liveToken"],
  };
}
