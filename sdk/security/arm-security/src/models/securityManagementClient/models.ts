// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** model interface PrivateLinkParameters */
export interface PrivateLinkParameters {
  /** The name of the private link resource. */
  privateLinkName: string;
}

export function privateLinkParametersSerializer(_item: PrivateLinkParameters): any {
  return {};
}
