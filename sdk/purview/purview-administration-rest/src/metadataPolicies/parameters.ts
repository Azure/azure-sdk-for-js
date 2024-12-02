// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type { MetadataPolicy } from "./models.js";

export type MetadataRolesListParameters = RequestParameters;

export interface MetadataPolicyListAllQueryParamProperties {
  /** The name of an existing collection for which one policy needs to be fetched. */
  collectionName?: string;
}

export interface MetadataPolicyListAllQueryParam {
  queryParameters?: MetadataPolicyListAllQueryParamProperties;
}

export type MetadataPolicyListAllParameters = MetadataPolicyListAllQueryParam & RequestParameters;

export interface MetadataPolicyUpdateBodyParam {
  /** Policy to be updated. */
  body?: MetadataPolicy;
}

export type MetadataPolicyUpdateParameters = MetadataPolicyUpdateBodyParam & RequestParameters;
export type MetadataPolicyGetParameters = RequestParameters;
