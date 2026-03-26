// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** There is no content to send for this request, but the headers may be useful. */
export interface NoContentResponse {}

export function noContentResponseDeserializer(item: any): NoContentResponse {
  return item;
}
