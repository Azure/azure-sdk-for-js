// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  Account,
  ErrorResponseModel,
  AccessKeys,
  Collection,
  CollectionList,
  CollectionNameResponseList,
  CollectionPathResponse,
  ResourceSetRuleConfig,
  ResourceSetRuleConfigList,
} from "./models";

/** Get an account */
export interface AccountsGet200Response extends HttpResponse {
  status: "200";
  body: Account;
}

/** Get an account */
export interface AccountsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Updates an account */
export interface AccountsUpdate200Response extends HttpResponse {
  status: "200";
  body: Account;
}

/** Updates an account */
export interface AccountsUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List the authorization keys associated with this account. */
export interface AccountsListKeys200Response extends HttpResponse {
  status: "200";
  body: AccessKeys;
}

/** List the authorization keys associated with this account. */
export interface AccountsListKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Regenerate the authorization keys associated with this data catalog. */
export interface AccountsRegenerateKeys200Response extends HttpResponse {
  status: "200";
  body: AccessKeys;
}

/** Regenerate the authorization keys associated with this data catalog. */
export interface AccountsRegenerateKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a collection */
export interface CollectionsGet200Response extends HttpResponse {
  status: "200";
  body: Collection;
}

/** Get a collection */
export interface CollectionsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates or updates a collection entity. */
export interface CollectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Collection;
}

/** Creates or updates a collection entity. */
export interface CollectionsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes a Collection entity. */
export interface CollectionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a Collection entity. */
export interface CollectionsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List the collections in the account. */
export interface CollectionsListByAccount200Response extends HttpResponse {
  status: "200";
  body: CollectionList;
}

/** List the collections in the account. */
export interface CollectionsListByAccountdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Lists the child collections names in the collection. */
export interface CollectionsGetChildCollectionNames200Response extends HttpResponse {
  status: "200";
  body: CollectionNameResponseList;
}

/** Lists the child collections names in the collection. */
export interface CollectionsGetChildCollectionNamesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Gets the parent name and parent friendly name chains that represent the collection path. */
export interface CollectionsGetCollectionPath200Response extends HttpResponse {
  status: "200";
  body: CollectionPathResponse;
}

/** Gets the parent name and parent friendly name chains that represent the collection path. */
export interface CollectionsGetCollectionPathdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a resource set config service model. */
export interface ResourceSetRuleConfigsGet200Response extends HttpResponse {
  status: "200";
  body: ResourceSetRuleConfig;
}

/** Get a resource set config service model. */
export interface ResourceSetRuleConfigsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates or updates an resource set config. */
export interface ResourceSetRuleConfigsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ResourceSetRuleConfig;
}

/** Creates or updates an resource set config. */
export interface ResourceSetRuleConfigsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes a ResourceSetRuleConfig resource. */
export interface ResourceSetRuleConfigsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a ResourceSetRuleConfig resource. */
export interface ResourceSetRuleConfigsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a ResourceSetRuleConfig resource. */
export interface ResourceSetRuleConfigsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a resource set config service model. */
export interface ResourceSetRuleConfigsListByAccount200Response extends HttpResponse {
  status: "200";
  body: ResourceSetRuleConfigList;
}

/** Get a resource set config service model. */
export interface ResourceSetRuleConfigsListByAccountdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}
