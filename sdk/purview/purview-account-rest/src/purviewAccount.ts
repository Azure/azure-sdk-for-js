// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AccountsGetAccountPropertiesParameters,
  AccountsUpdateAccountPropertiesParameters,
  AccountsGetAccessKeysParameters,
  AccountsRegenerateAccessKeyParameters,
  CollectionsGetCollectionParameters,
  CollectionsCreateOrUpdateCollectionParameters,
  CollectionsDeleteCollectionParameters,
  CollectionsListCollectionsParameters,
  CollectionsListChildCollectionNamesParameters,
  CollectionsGetCollectionPathParameters,
  ResourceSetRulesGetResourceSetRuleParameters,
  ResourceSetRulesCreateOrUpdateResourceSetRuleParameters,
  ResourceSetRulesDeleteResourceSetRuleParameters,
  ResourceSetRulesListResourceSetRulesParameters,
} from "./parameters";
import {
  AccountsGetAccountProperties200Response,
  AccountsGetAccountPropertiesdefaultResponse,
  AccountsUpdateAccountProperties200Response,
  AccountsUpdateAccountPropertiesdefaultResponse,
  AccountsGetAccessKeys200Response,
  AccountsGetAccessKeysdefaultResponse,
  AccountsRegenerateAccessKey200Response,
  AccountsRegenerateAccessKeydefaultResponse,
  CollectionsGetCollection200Response,
  CollectionsGetCollectiondefaultResponse,
  CollectionsCreateOrUpdateCollection200Response,
  CollectionsCreateOrUpdateCollectiondefaultResponse,
  CollectionsDeleteCollection204Response,
  CollectionsDeleteCollectiondefaultResponse,
  CollectionsListCollections200Response,
  CollectionsListCollectionsdefaultResponse,
  CollectionsListChildCollectionNames200Response,
  CollectionsListChildCollectionNamesdefaultResponse,
  CollectionsGetCollectionPath200Response,
  CollectionsGetCollectionPathdefaultResponse,
  ResourceSetRulesGetResourceSetRule200Response,
  ResourceSetRulesGetResourceSetRuledefaultResponse,
  ResourceSetRulesCreateOrUpdateResourceSetRule200Response,
  ResourceSetRulesCreateOrUpdateResourceSetRuledefaultResponse,
  ResourceSetRulesDeleteResourceSetRule200Response,
  ResourceSetRulesDeleteResourceSetRule204Response,
  ResourceSetRulesDeleteResourceSetRuledefaultResponse,
  ResourceSetRulesListResourceSetRules200Response,
  ResourceSetRulesListResourceSetRulesdefaultResponse,
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface AccountsGetAccountProperties {
  /** Get an account */
  get(
    options?: AccountsGetAccountPropertiesParameters
  ): Promise<AccountsGetAccountProperties200Response | AccountsGetAccountPropertiesdefaultResponse>;
  /** Updates an account */
  patch(
    options: AccountsUpdateAccountPropertiesParameters
  ): Promise<
    AccountsUpdateAccountProperties200Response | AccountsUpdateAccountPropertiesdefaultResponse
  >;
}

export interface AccountsGetAccessKeys {
  /** List the authorization keys associated with this account. */
  post(
    options?: AccountsGetAccessKeysParameters
  ): Promise<AccountsGetAccessKeys200Response | AccountsGetAccessKeysdefaultResponse>;
}

export interface AccountsRegenerateAccessKey {
  /** Regenerate the authorization keys associated with this data catalog. */
  post(
    options: AccountsRegenerateAccessKeyParameters
  ): Promise<AccountsRegenerateAccessKey200Response | AccountsRegenerateAccessKeydefaultResponse>;
}

export interface CollectionsGetCollection {
  /** Get a collection */
  get(
    options?: CollectionsGetCollectionParameters
  ): Promise<CollectionsGetCollection200Response | CollectionsGetCollectiondefaultResponse>;
  /** Creates or updates a collection entity. */
  put(
    options: CollectionsCreateOrUpdateCollectionParameters
  ): Promise<
    | CollectionsCreateOrUpdateCollection200Response
    | CollectionsCreateOrUpdateCollectiondefaultResponse
  >;
  /** Deletes a Collection entity. */
  delete(
    options?: CollectionsDeleteCollectionParameters
  ): Promise<CollectionsDeleteCollection204Response | CollectionsDeleteCollectiondefaultResponse>;
}

export interface CollectionsListCollections {
  /** List the collections in the account. */
  get(
    options?: CollectionsListCollectionsParameters
  ): Promise<CollectionsListCollections200Response | CollectionsListCollectionsdefaultResponse>;
}

export interface CollectionsListChildCollectionNames {
  /** Lists the child collections names in the collection. */
  get(
    options?: CollectionsListChildCollectionNamesParameters
  ): Promise<
    | CollectionsListChildCollectionNames200Response
    | CollectionsListChildCollectionNamesdefaultResponse
  >;
}

export interface CollectionsGetCollectionPath {
  /** Gets the parent name and parent friendly name chains that represent the collection path. */
  get(
    options?: CollectionsGetCollectionPathParameters
  ): Promise<CollectionsGetCollectionPath200Response | CollectionsGetCollectionPathdefaultResponse>;
}

export interface ResourceSetRulesGetResourceSetRule {
  /** Get a resource set config service model. */
  get(
    options?: ResourceSetRulesGetResourceSetRuleParameters
  ): Promise<
    | ResourceSetRulesGetResourceSetRule200Response
    | ResourceSetRulesGetResourceSetRuledefaultResponse
  >;
  /** Creates or updates an resource set config. */
  put(
    options: ResourceSetRulesCreateOrUpdateResourceSetRuleParameters
  ): Promise<
    | ResourceSetRulesCreateOrUpdateResourceSetRule200Response
    | ResourceSetRulesCreateOrUpdateResourceSetRuledefaultResponse
  >;
  /** Deletes a ResourceSetRuleConfig resource. */
  delete(
    options?: ResourceSetRulesDeleteResourceSetRuleParameters
  ): Promise<
    | ResourceSetRulesDeleteResourceSetRule200Response
    | ResourceSetRulesDeleteResourceSetRule204Response
    | ResourceSetRulesDeleteResourceSetRuledefaultResponse
  >;
}

export interface ResourceSetRulesListResourceSetRules {
  /** Get a resource set config service model. */
  get(
    options?: ResourceSetRulesListResourceSetRulesParameters
  ): Promise<
    | ResourceSetRulesListResourceSetRules200Response
    | ResourceSetRulesListResourceSetRulesdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/' has methods for the following verbs: get, patch */
  (path: "/"): AccountsGetAccountProperties;
  /** Resource for '/listkeys' has methods for the following verbs: post */
  (path: "/listkeys"): AccountsGetAccessKeys;
  /** Resource for '/regeneratekeys' has methods for the following verbs: post */
  (path: "/regeneratekeys"): AccountsRegenerateAccessKey;
  /** Resource for '/collections/\{collectionName\}' has methods for the following verbs: get, put, delete */
  (path: "/collections/{collectionName}", collectionName: string): CollectionsGetCollection;
  /** Resource for '/collections' has methods for the following verbs: get */
  (path: "/collections"): CollectionsListCollections;
  /** Resource for '/collections/\{collectionName\}/getChildCollectionNames' has methods for the following verbs: get */
  (
    path: "/collections/{collectionName}/getChildCollectionNames",
    collectionName: string
  ): CollectionsListChildCollectionNames;
  /** Resource for '/collections/\{collectionName\}/getCollectionPath' has methods for the following verbs: get */
  (
    path: "/collections/{collectionName}/getCollectionPath",
    collectionName: string
  ): CollectionsGetCollectionPath;
  /** Resource for '/resourceSetRuleConfigs/defaultResourceSetRuleConfig' has methods for the following verbs: get, put, delete */
  (
    path: "/resourceSetRuleConfigs/defaultResourceSetRuleConfig"
  ): ResourceSetRulesGetResourceSetRule;
  /** Resource for '/resourceSetRuleConfigs' has methods for the following verbs: get */
  (path: "/resourceSetRuleConfigs"): ResourceSetRulesListResourceSetRules;
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
      scopes: ["https://purview.azure.net/.default"],
    },
  };

  return getClient(baseUrl, credentials, options) as PurviewAccountRestClient;
}
