// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { MetadataPolicy } from "./models";

export type MetadataRolesListParameters = RequestParameters;

export interface MetadataPolicyListAllQueryParamProperties {
  /** The name of an existing collection for which one policy needs to be fetched. */
  collectionName?: string;
}

export interface MetadataPolicyListAllQueryParam {
  queryParameters?: MetadataPolicyListAllQueryParamProperties;
}

export type MetadataPolicyListAllParameters = MetadataPolicyListAllQueryParam &
  RequestParameters;

export interface MetadataPolicyUpdateBodyParam {
  /** Policy to be updated. */
  body?: MetadataPolicy;
}

export interface MetadataPolicyUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MetadataPolicyUpdateParameters = MetadataPolicyUpdateMediaTypesParam &
  MetadataPolicyUpdateBodyParam &
  RequestParameters;
export type MetadataPolicyGetParameters = RequestParameters;
