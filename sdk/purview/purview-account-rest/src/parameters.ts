// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  DataPlaneAccountUpdateParameters,
  AccessKeyOptions,
  Collection,
  ResourceSetRuleConfig,
} from "./models";

export type AccountsGetParameters = RequestParameters;

export interface AccountsUpdateBodyParam {
  body: DataPlaneAccountUpdateParameters;
}

export type AccountsUpdateParameters = AccountsUpdateBodyParam & RequestParameters;
export type AccountsListKeysParameters = RequestParameters;

export interface AccountsRegenerateKeysBodyParam {
  body: AccessKeyOptions;
}

export type AccountsRegenerateKeysParameters = AccountsRegenerateKeysBodyParam & RequestParameters;
export type CollectionsGetParameters = RequestParameters;

export interface CollectionsCreateOrUpdateBodyParam {
  body: Collection;
}

export type CollectionsCreateOrUpdateParameters = CollectionsCreateOrUpdateBodyParam &
  RequestParameters;
export type CollectionsDeleteParameters = RequestParameters;

export interface CollectionsListByAccountQueryParamProperties {
  $skipToken?: string;
}

export interface CollectionsListByAccountQueryParam {
  queryParameters?: CollectionsListByAccountQueryParamProperties;
}

export type CollectionsListByAccountParameters = CollectionsListByAccountQueryParam &
  RequestParameters;

export interface CollectionsGetChildCollectionNamesQueryParamProperties {
  $skipToken?: string;
}

export interface CollectionsGetChildCollectionNamesQueryParam {
  queryParameters?: CollectionsGetChildCollectionNamesQueryParamProperties;
}

export type CollectionsGetChildCollectionNamesParameters = CollectionsGetChildCollectionNamesQueryParam &
  RequestParameters;

export interface CollectionsGetCollectionPathQueryParamProperties {
  $skipToken?: string;
}

export interface CollectionsGetCollectionPathQueryParam {
  queryParameters?: CollectionsGetCollectionPathQueryParamProperties;
}

export type CollectionsGetCollectionPathParameters = CollectionsGetCollectionPathQueryParam &
  RequestParameters;
export type ResourceSetRuleConfigsGetParameters = RequestParameters;

export interface ResourceSetRuleConfigsCreateOrUpdateBodyParam {
  body: ResourceSetRuleConfig;
}

export type ResourceSetRuleConfigsCreateOrUpdateParameters = ResourceSetRuleConfigsCreateOrUpdateBodyParam &
  RequestParameters;
export type ResourceSetRuleConfigsDeleteParameters = RequestParameters;

export interface ResourceSetRuleConfigsListByAccountQueryParamProperties {
  $skipToken?: string;
}

export interface ResourceSetRuleConfigsListByAccountQueryParam {
  queryParameters?: ResourceSetRuleConfigsListByAccountQueryParamProperties;
}

export type ResourceSetRuleConfigsListByAccountParameters = ResourceSetRuleConfigsListByAccountQueryParam &
  RequestParameters;
