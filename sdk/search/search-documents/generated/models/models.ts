// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  searchIndexResponseArrayDeserializer,
  SearchIndexResponse,
} from "./azure/search/documents/indexes/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Configures a SharePoint connector app registration for the index, enabling document-level permissions from SharePoint. */
export interface SharePointConnectorAppRegistration {
  /** The application (client) ID of the app registration used to connect to SharePoint. */
  applicationId: string;
  /** The federated credential ID configured on the app registration. */
  federatedCredentialId: string;
  /** The tenant ID of the app registration. If not specified, the tenant of the search service is used. */
  tenantId?: string;
}

export function sharePointConnectorAppRegistrationSerializer(
  item: SharePointConnectorAppRegistration,
): any {
  return {
    applicationId: item["applicationId"],
    federatedCredentialId: item["federatedCredentialId"],
    tenantId: item["tenantId"],
  };
}

export function sharePointConnectorAppRegistrationDeserializer(
  item: any,
): SharePointConnectorAppRegistration {
  return {
    applicationId: item["applicationId"],
    federatedCredentialId: item["federatedCredentialId"],
    tenantId: item["tenantId"],
  };
}

/** Response from a List Indexes request. If successful, it includes the full definitions of all indexes. */
export interface _ListIndexesSelectedResult {
  /** The total count of indexes in the service, or null if the count was not requested. */
  readonly count?: number;
  /** The indexes in the Search service. */
  readonly value: SearchIndexResponse[];
  /** The URL that can be used to fetch the next set of results. */
  readonly nextLink?: string;
}

export function _listIndexesSelectedResultDeserializer(item: any): _ListIndexesSelectedResult {
  return {
    count: item["@odata.count"],
    value: searchIndexResponseArrayDeserializer(item["value"]),
    nextLink: item["@odata.nextLink"],
  };
}

/** The chunking strategy used by the Content Understanding skill. Default is 'fixedSize'. */
export enum KnownContentUnderstandingSkillChunkingMethod {
  /** Fixed-size character-based windowed chunking. */
  FixedSize = "fixedSize",
  /** Layout-aware, paragraph-boundary-respecting chunking. */
  Semantic = "semantic",
}

/**
 * The chunking strategy used by the Content Understanding skill. Default is 'fixedSize'. \
 * {@link KnownContentUnderstandingSkillChunkingMethod} can be used interchangeably with ContentUnderstandingSkillChunkingMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **fixedSize**: Fixed-size character-based windowed chunking. \
 * **semantic**: Layout-aware, paragraph-boundary-respecting chunking.
 */
export type ContentUnderstandingSkillChunkingMethod = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-11-01-preview API version. */
  V20251101Preview = "2025-11-01-preview",
  /** The 2026-04-01 API version. */
  V20260401 = "2026-04-01",
  /** The 2026-05-01-preview API version. */
  V20260501Preview = "2026-05-01-preview",
}
