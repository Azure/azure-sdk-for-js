// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  updateNetworkSiblingSet,
  queryNetworkSiblingSet,
  queryRegionInfo,
  checkQuotaAvailability,
  checkFilePathAvailability,
  checkNameAvailability,
} from "../../api/netAppResource/operations.js";
import type {
  NetAppResourceUpdateNetworkSiblingSetOptionalParams,
  NetAppResourceQueryNetworkSiblingSetOptionalParams,
  NetAppResourceQueryRegionInfoOptionalParams,
  NetAppResourceCheckQuotaAvailabilityOptionalParams,
  NetAppResourceCheckFilePathAvailabilityOptionalParams,
  NetAppResourceCheckNameAvailabilityOptionalParams,
} from "../../api/netAppResource/options.js";
import type {
  RegionInfo,
  ResourceNameAvailabilityRequest,
  CheckAvailabilityResponse,
  FilePathAvailabilityRequest,
  QuotaAvailabilityRequest,
  QueryNetworkSiblingSetRequest,
  NetworkSiblingSet,
  UpdateNetworkSiblingSetRequest,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetAppResource operations. */
export interface NetAppResourceOperations {
  /** Update the network features of the specified network sibling set. */
  updateNetworkSiblingSet: (
    location: string,
    body: UpdateNetworkSiblingSetRequest,
    options?: NetAppResourceUpdateNetworkSiblingSetOptionalParams,
  ) => PollerLike<OperationState<NetworkSiblingSet>, NetworkSiblingSet>;
  /** Get details of the specified network sibling set. */
  queryNetworkSiblingSet: (
    location: string,
    body: QueryNetworkSiblingSetRequest,
    options?: NetAppResourceQueryNetworkSiblingSetOptionalParams,
  ) => Promise<NetworkSiblingSet>;
  /** Provides storage to network proximity and logical zone mapping information. */
  queryRegionInfo: (
    location: string,
    options?: NetAppResourceQueryRegionInfoOptionalParams,
  ) => Promise<RegionInfo>;
  /** Check if a quota is available. */
  checkQuotaAvailability: (
    location: string,
    body: QuotaAvailabilityRequest,
    options?: NetAppResourceCheckQuotaAvailabilityOptionalParams,
  ) => Promise<CheckAvailabilityResponse>;
  /** Check if a file path is available. */
  checkFilePathAvailability: (
    location: string,
    body: FilePathAvailabilityRequest,
    options?: NetAppResourceCheckFilePathAvailabilityOptionalParams,
  ) => Promise<CheckAvailabilityResponse>;
  /** Check if a resource name is available. */
  checkNameAvailability: (
    location: string,
    body: ResourceNameAvailabilityRequest,
    options?: NetAppResourceCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckAvailabilityResponse>;
}

function _getNetAppResource(context: NetAppManagementContext) {
  return {
    updateNetworkSiblingSet: (
      location: string,
      body: UpdateNetworkSiblingSetRequest,
      options?: NetAppResourceUpdateNetworkSiblingSetOptionalParams,
    ) => updateNetworkSiblingSet(context, location, body, options),
    queryNetworkSiblingSet: (
      location: string,
      body: QueryNetworkSiblingSetRequest,
      options?: NetAppResourceQueryNetworkSiblingSetOptionalParams,
    ) => queryNetworkSiblingSet(context, location, body, options),
    queryRegionInfo: (location: string, options?: NetAppResourceQueryRegionInfoOptionalParams) =>
      queryRegionInfo(context, location, options),
    checkQuotaAvailability: (
      location: string,
      body: QuotaAvailabilityRequest,
      options?: NetAppResourceCheckQuotaAvailabilityOptionalParams,
    ) => checkQuotaAvailability(context, location, body, options),
    checkFilePathAvailability: (
      location: string,
      body: FilePathAvailabilityRequest,
      options?: NetAppResourceCheckFilePathAvailabilityOptionalParams,
    ) => checkFilePathAvailability(context, location, body, options),
    checkNameAvailability: (
      location: string,
      body: ResourceNameAvailabilityRequest,
      options?: NetAppResourceCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, body, options),
  };
}

export function _getNetAppResourceOperations(
  context: NetAppManagementContext,
): NetAppResourceOperations {
  return {
    ..._getNetAppResource(context),
  };
}
