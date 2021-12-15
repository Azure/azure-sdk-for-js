// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  DataPlaneAccountUpdateParameters,
  AccessKeyOptions,
  Collection,
  ResourceSetRuleConfig
} from "./models";

export type AccountsGetAccountPropertiesParameters = RequestParameters;

export interface AccountsUpdateAccountPropertiesBodyParam {
  body: DataPlaneAccountUpdateParameters;
}

export interface AccountsUpdateAccountPropertiesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AccountsUpdateAccountPropertiesParameters = AccountsUpdateAccountPropertiesMediaTypesParam &
  AccountsUpdateAccountPropertiesBodyParam &
  RequestParameters;
export type AccountsGetAccessKeysParameters = RequestParameters;

export interface AccountsRegenerateAccessKeyBodyParam {
  body: AccessKeyOptions;
}

export interface AccountsRegenerateAccessKeyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AccountsRegenerateAccessKeyParameters = AccountsRegenerateAccessKeyMediaTypesParam &
  AccountsRegenerateAccessKeyBodyParam &
  RequestParameters;
export type CollectionsGetCollectionParameters = RequestParameters;

export interface CollectionsCreateOrUpdateCollectionBodyParam {
  body: Collection;
}

export interface CollectionsCreateOrUpdateCollectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CollectionsCreateOrUpdateCollectionParameters = CollectionsCreateOrUpdateCollectionMediaTypesParam &
  CollectionsCreateOrUpdateCollectionBodyParam &
  RequestParameters;
export type CollectionsDeleteCollectionParameters = RequestParameters;

export interface CollectionsListCollectionsQueryParamProperties {
  $skipToken?: string;
}

export interface CollectionsListCollectionsQueryParam {
  queryParameters?: CollectionsListCollectionsQueryParamProperties;
}

export type CollectionsListCollectionsParameters = CollectionsListCollectionsQueryParam &
  RequestParameters;

export interface CollectionsListChildCollectionNamesQueryParamProperties {
  $skipToken?: string;
}

export interface CollectionsListChildCollectionNamesQueryParam {
  queryParameters?: CollectionsListChildCollectionNamesQueryParamProperties;
}

export type CollectionsListChildCollectionNamesParameters = CollectionsListChildCollectionNamesQueryParam &
  RequestParameters;
export type CollectionsGetCollectionPathParameters = RequestParameters;
export type ResourceSetRulesGetResourceSetRuleParameters = RequestParameters;

export interface ResourceSetRulesCreateOrUpdateResourceSetRuleBodyParam {
  body: ResourceSetRuleConfig;
}

export interface ResourceSetRulesCreateOrUpdateResourceSetRuleMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ResourceSetRulesCreateOrUpdateResourceSetRuleParameters = ResourceSetRulesCreateOrUpdateResourceSetRuleMediaTypesParam &
  ResourceSetRulesCreateOrUpdateResourceSetRuleBodyParam &
  RequestParameters;
export type ResourceSetRulesDeleteResourceSetRuleParameters = RequestParameters;

export interface ResourceSetRulesListResourceSetRulesQueryParamProperties {
  $skipToken?: string;
}

export interface ResourceSetRulesListResourceSetRulesQueryParam {
  queryParameters?: ResourceSetRulesListResourceSetRulesQueryParamProperties;
}

export type ResourceSetRulesListResourceSetRulesParameters = ResourceSetRulesListResourceSetRulesQueryParam &
  RequestParameters;
