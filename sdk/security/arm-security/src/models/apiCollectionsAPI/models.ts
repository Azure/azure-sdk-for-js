// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommonProvisioningState } from "../common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An API collection as represented by Microsoft Defender for APIs. */
export interface ApiCollectionsAPIApiCollection extends ExtensionResource {
  /** Gets the provisioning state of the API collection. */
  readonly provisioningState?: CommonProvisioningState;
  /** The display name of the API collection. */
  readonly displayName?: string;
  /** The resource Id of the resource from where this API collection was discovered. */
  readonly discoveredVia?: string;
  /** The base URI for this API collection. All endpoints of this API collection extend this base URI. */
  readonly baseUrl?: string;
  /** The number of API endpoints discovered in this API collection. */
  readonly numberOfApiEndpoints?: number;
  /** The number of API endpoints in this API collection that have not received any API traffic in the last 30 days. */
  readonly numberOfInactiveApiEndpoints?: number;
  /** The number of API endpoints in this API collection that are unauthenticated. */
  readonly numberOfUnauthenticatedApiEndpoints?: number;
  /** The number of API endpoints in this API collection for which API traffic from the internet was observed. */
  readonly numberOfExternalApiEndpoints?: number;
  /** The number of API endpoints in this API collection which are exposing sensitive data in their requests and/or responses. */
  readonly numberOfApiEndpointsWithSensitiveDataExposed?: number;
  /** The highest priority sensitivity label from Microsoft Purview in this API collection. */
  readonly sensitivityLabel?: string;
}

export function apiCollectionsAPIApiCollectionDeserializer(
  item: any,
): ApiCollectionsAPIApiCollection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _apiCollectionPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of an API collection. */
export interface ApiCollectionsAPIApiCollectionProperties {
  /** Gets the provisioning state of the API collection. */
  readonly provisioningState?: CommonProvisioningState;
  /** The display name of the API collection. */
  readonly displayName?: string;
  /** The resource Id of the resource from where this API collection was discovered. */
  readonly discoveredVia?: string;
  /** The base URI for this API collection. All endpoints of this API collection extend this base URI. */
  readonly baseUrl?: string;
  /** The number of API endpoints discovered in this API collection. */
  readonly numberOfApiEndpoints?: number;
  /** The number of API endpoints in this API collection that have not received any API traffic in the last 30 days. */
  readonly numberOfInactiveApiEndpoints?: number;
  /** The number of API endpoints in this API collection that are unauthenticated. */
  readonly numberOfUnauthenticatedApiEndpoints?: number;
  /** The number of API endpoints in this API collection for which API traffic from the internet was observed. */
  readonly numberOfExternalApiEndpoints?: number;
  /** The number of API endpoints in this API collection which are exposing sensitive data in their requests and/or responses. */
  readonly numberOfApiEndpointsWithSensitiveDataExposed?: number;
  /** The highest priority sensitivity label from Microsoft Purview in this API collection. */
  readonly sensitivityLabel?: string;
}

export function apiCollectionsAPIApiCollectionPropertiesDeserializer(
  item: any,
): ApiCollectionsAPIApiCollectionProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    discoveredVia: item["discoveredVia"],
    baseUrl: item["baseUrl"],
    numberOfApiEndpoints: item["numberOfApiEndpoints"],
    numberOfInactiveApiEndpoints: item["numberOfInactiveApiEndpoints"],
    numberOfUnauthenticatedApiEndpoints: item["numberOfUnauthenticatedApiEndpoints"],
    numberOfExternalApiEndpoints: item["numberOfExternalApiEndpoints"],
    numberOfApiEndpointsWithSensitiveDataExposed:
      item["numberOfApiEndpointsWithSensitiveDataExposed"],
    sensitivityLabel: item["sensitivityLabel"],
  };
}

/** Page of a list of API collections as represented by Microsoft Defender for APIs. */
export interface _ApiCollectionsAPIApiCollectionList {
  /** API collections in this page. */
  readonly value?: ApiCollectionsAPIApiCollection[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _apiCollectionsAPIApiCollectionListDeserializer(
  item: any,
): _ApiCollectionsAPIApiCollectionList {
  return {
    value: !item["value"]
      ? item["value"]
      : apiCollectionsAPIApiCollectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiCollectionsAPIApiCollectionArrayDeserializer(
  result: Array<ApiCollectionsAPIApiCollection>,
): any[] {
  return result.map((item) => {
    return apiCollectionsAPIApiCollectionDeserializer(item);
  });
}

export function _apiCollectionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    discoveredVia: item["discoveredVia"],
    baseUrl: item["baseUrl"],
    numberOfApiEndpoints: item["numberOfApiEndpoints"],
    numberOfInactiveApiEndpoints: item["numberOfInactiveApiEndpoints"],
    numberOfUnauthenticatedApiEndpoints: item["numberOfUnauthenticatedApiEndpoints"],
    numberOfExternalApiEndpoints: item["numberOfExternalApiEndpoints"],
    numberOfApiEndpointsWithSensitiveDataExposed:
      item["numberOfApiEndpointsWithSensitiveDataExposed"],
    sensitivityLabel: item["sensitivityLabel"],
  };
}
