// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AccountsGetParameters,
  AccountsUpdateParameters,
  AccountsListKeysParameters,
  AccountsRegenerateKeysParameters,
  CollectionsGetParameters,
  CollectionsCreateOrUpdateParameters,
  CollectionsDeleteParameters,
  CollectionsListByAccountParameters,
  CollectionsGetChildCollectionNamesParameters,
  CollectionsGetCollectionPathParameters,
  ResourceSetRuleConfigsGetParameters,
  ResourceSetRuleConfigsCreateOrUpdateParameters,
  ResourceSetRuleConfigsDeleteParameters,
  ResourceSetRuleConfigsListByAccountParameters
} from "./parameters";
import {
  AccountsGet200Response,
  AccountsGetdefaultResponse,
  AccountsUpdate200Response,
  AccountsUpdatedefaultResponse,
  AccountsListKeys200Response,
  AccountsListKeysdefaultResponse,
  AccountsRegenerateKeys200Response,
  AccountsRegenerateKeysdefaultResponse,
  CollectionsGet200Response,
  CollectionsGetdefaultResponse,
  CollectionsCreateOrUpdate200Response,
  CollectionsCreateOrUpdatedefaultResponse,
  CollectionsDelete204Response,
  CollectionsDeletedefaultResponse,
  CollectionsListByAccount200Response,
  CollectionsListByAccountdefaultResponse,
  CollectionsGetChildCollectionNames200Response,
  CollectionsGetChildCollectionNamesdefaultResponse,
  CollectionsGetCollectionPath200Response,
  CollectionsGetCollectionPathdefaultResponse,
  ResourceSetRuleConfigsGet200Response,
  ResourceSetRuleConfigsGetdefaultResponse,
  ResourceSetRuleConfigsCreateOrUpdate200Response,
  ResourceSetRuleConfigsCreateOrUpdatedefaultResponse,
  ResourceSetRuleConfigsDelete200Response,
  ResourceSetRuleConfigsDelete204Response,
  ResourceSetRuleConfigsDeletedefaultResponse,
  ResourceSetRuleConfigsListByAccount200Response,
  ResourceSetRuleConfigsListByAccountdefaultResponse
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface AccountsGet {
  /** Get an account */
  get(
    options?: AccountsGetParameters
  ): Promise<AccountsGet200Response | AccountsGetdefaultResponse>;
  /** Updates an account */
  patch(
    options: AccountsUpdateParameters
  ): Promise<AccountsUpdate200Response | AccountsUpdatedefaultResponse>;
}

export interface AccountsListKeys {
  /** List the authorization keys associated with this account. */
  post(
    options?: AccountsListKeysParameters
  ): Promise<AccountsListKeys200Response | AccountsListKeysdefaultResponse>;
}

export interface AccountsRegenerateKeys {
  /** Regenerate the authorization keys associated with this data catalog. */
  post(
    options: AccountsRegenerateKeysParameters
  ): Promise<
    AccountsRegenerateKeys200Response | AccountsRegenerateKeysdefaultResponse
  >;
}

export interface CollectionsGet {
  /** Get a collection */
  get(
    options?: CollectionsGetParameters
  ): Promise<CollectionsGet200Response | CollectionsGetdefaultResponse>;
  /** Creates or updates a collection entity. */
  put(
    options: CollectionsCreateOrUpdateParameters
  ): Promise<
    | CollectionsCreateOrUpdate200Response
    | CollectionsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a Collection entity. */
  delete(
    options?: CollectionsDeleteParameters
  ): Promise<CollectionsDelete204Response | CollectionsDeletedefaultResponse>;
}

export interface CollectionsListByAccount {
  /** List the collections in the account. */
  get(
    options?: CollectionsListByAccountParameters
  ): Promise<
    | CollectionsListByAccount200Response
    | CollectionsListByAccountdefaultResponse
  >;
}

export interface CollectionsGetChildCollectionNames {
  /** Lists the child collections names in the collection. */
  get(
    options?: CollectionsGetChildCollectionNamesParameters
  ): Promise<
    | CollectionsGetChildCollectionNames200Response
    | CollectionsGetChildCollectionNamesdefaultResponse
  >;
}

export interface CollectionsGetCollectionPath {
  /** Gets the parent name and parent friendly name chains that represent the collection path. */
  get(
    options?: CollectionsGetCollectionPathParameters
  ): Promise<
    | CollectionsGetCollectionPath200Response
    | CollectionsGetCollectionPathdefaultResponse
  >;
}

export interface ResourceSetRuleConfigsGet {
  /** Get a resource set config service model. */
  get(
    options?: ResourceSetRuleConfigsGetParameters
  ): Promise<
    | ResourceSetRuleConfigsGet200Response
    | ResourceSetRuleConfigsGetdefaultResponse
  >;
  /** Creates or updates an resource set config. */
  put(
    options: ResourceSetRuleConfigsCreateOrUpdateParameters
  ): Promise<
    | ResourceSetRuleConfigsCreateOrUpdate200Response
    | ResourceSetRuleConfigsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a ResourceSetRuleConfig resource. */
  delete(
    options?: ResourceSetRuleConfigsDeleteParameters
  ): Promise<
    | ResourceSetRuleConfigsDelete200Response
    | ResourceSetRuleConfigsDelete204Response
    | ResourceSetRuleConfigsDeletedefaultResponse
  >;
}

export interface ResourceSetRuleConfigsListByAccount {
  /** Get a resource set config service model. */
  get(
    options?: ResourceSetRuleConfigsListByAccountParameters
  ): Promise<
    | ResourceSetRuleConfigsListByAccount200Response
    | ResourceSetRuleConfigsListByAccountdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/' has methods for the following verbs: get, patch */
  (path: "/"): AccountsGet;
  /** Resource for '/listkeys' has methods for the following verbs: post */
  (path: "/listkeys"): AccountsListKeys;
  /** Resource for '/regeneratekeys' has methods for the following verbs: post */
  (path: "/regeneratekeys"): AccountsRegenerateKeys;
  /** Resource for '/collections/\{collectionName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/collections/{collectionName}",
    collectionName: string
  ): CollectionsGet;
  /** Resource for '/collections' has methods for the following verbs: get */
  (path: "/collections"): CollectionsListByAccount;
  /** Resource for '/collections/\{collectionName\}/getChildCollectionNames' has methods for the following verbs: get */
  (
    path: "/collections/{collectionName}/getChildCollectionNames",
    collectionName: string
  ): CollectionsGetChildCollectionNames;
  /** Resource for '/collections/\{collectionName\}/getCollectionPath' has methods for the following verbs: get */
  (
    path: "/collections/{collectionName}/getCollectionPath",
    collectionName: string
  ): CollectionsGetCollectionPath;
  /** Resource for '/resourceSetRuleConfigs/defaultResourceSetRuleConfig' has methods for the following verbs: get, put, delete */
  (
    path: "/resourceSetRuleConfigs/defaultResourceSetRuleConfig"
  ): ResourceSetRuleConfigsGet;
  /** Resource for '/resourceSetRuleConfigs' has methods for the following verbs: get */
  (path: "/resourceSetRuleConfigs"): ResourceSetRuleConfigsListByAccount;
}

export type PurviewAccountRestClient = Client & {
  path: Routes;
};

export default function PurviewAccount(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): PurviewAccountRestClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2019-11-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"]
    }
  };

  return getClient(baseUrl, credentials, options) as PurviewAccountRestClient;
}
