// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AccessKeyOptions,
  Collection,
  DataPlaneAccountUpdateParameters,
  ResourceSetRuleConfig,
} from "./models";

export type AccountsGetAccountPropertiesParameters = RequestParameters;

export interface AccountsUpdateAccountPropertiesBodyParam {
  body: DataPlaneAccountUpdateParameters;
}

export type AccountsUpdateAccountPropertiesParameters = AccountsUpdateAccountPropertiesBodyParam &
  RequestParameters;
export type AccountsGetAccessKeysParameters = RequestParameters;

export interface AccountsRegenerateAccessKeyBodyParam {
  body: AccessKeyOptions;
}

export type AccountsRegenerateAccessKeyParameters = AccountsRegenerateAccessKeyBodyParam &
  RequestParameters;
export type CollectionsGetCollectionParameters = RequestParameters;

export interface CollectionsCreateOrUpdateCollectionBodyParam {
  body: Collection;
}

export type CollectionsCreateOrUpdateCollectionParameters =
  CollectionsCreateOrUpdateCollectionBodyParam & RequestParameters;
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

export type CollectionsListChildCollectionNamesParameters =
  CollectionsListChildCollectionNamesQueryParam & RequestParameters;
export type CollectionsGetCollectionPathParameters = RequestParameters;
export type ResourceSetRulesGetResourceSetRuleParameters = RequestParameters;

export interface ResourceSetRulesCreateOrUpdateResourceSetRuleBodyParam {
  body: ResourceSetRuleConfig;
}

export type ResourceSetRulesCreateOrUpdateResourceSetRuleParameters =
  ResourceSetRulesCreateOrUpdateResourceSetRuleBodyParam & RequestParameters;
export type ResourceSetRulesDeleteResourceSetRuleParameters = RequestParameters;

export interface ResourceSetRulesListResourceSetRulesQueryParamProperties {
  $skipToken?: string;
}

export interface ResourceSetRulesListResourceSetRulesQueryParam {
  queryParameters?: ResourceSetRulesListResourceSetRulesQueryParamProperties;
}

export type ResourceSetRulesListResourceSetRulesParameters =
  ResourceSetRulesListResourceSetRulesQueryParam & RequestParameters;
