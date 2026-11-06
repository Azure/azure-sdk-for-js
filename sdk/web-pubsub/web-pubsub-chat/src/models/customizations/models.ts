// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** Response containing a Web PubSub client access token. */
export interface GenerateClientTokenResponse {
  /** Access token used to connect to Azure Web PubSub. */
  token: string;
}

export function generateClientTokenResponseDeserializer(item: any): GenerateClientTokenResponse {
  return {
    token: item["token"],
  };
}
