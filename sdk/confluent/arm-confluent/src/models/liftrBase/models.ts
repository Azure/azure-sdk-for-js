// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** Details for VNet injection */
export interface VnetInjectionDetails {
  /** Resource ID of the virtual network */
  virtualNetworkResourceId: string;
  /** Resource ID of the subnet */
  subnetResourceId: string;
}

export function vnetInjectionDetailsSerializer(item: VnetInjectionDetails): any {
  return {
    virtualNetworkResourceId: item["virtualNetworkResourceId"],
    subnetResourceId: item["subnetResourceId"],
  };
}

export function vnetInjectionDetailsDeserializer(item: any): VnetInjectionDetails {
  return {
    virtualNetworkResourceId: item["virtualNetworkResourceId"],
    subnetResourceId: item["subnetResourceId"],
  };
}
