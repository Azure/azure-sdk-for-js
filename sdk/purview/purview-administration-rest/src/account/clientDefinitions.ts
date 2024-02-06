// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client } from "@azure-rest/core-client";
import {
  AccountsGetAccessKeysParameters,
  AccountsGetAccountPropertiesParameters,
  AccountsRegenerateAccessKeyParameters,
  AccountsUpdateAccountPropertiesParameters,
  CollectionsCreateOrUpdateCollectionParameters,
  CollectionsDeleteCollectionParameters,
  CollectionsGetCollectionParameters,
  CollectionsGetCollectionPathParameters,
  CollectionsListChildCollectionNamesParameters,
  CollectionsListCollectionsParameters,
  ResourceSetRulesCreateOrUpdateResourceSetRuleParameters,
  ResourceSetRulesDeleteResourceSetRuleParameters,
  ResourceSetRulesGetResourceSetRuleParameters,
  ResourceSetRulesListResourceSetRulesParameters,
} from "./parameters";
import {
  AccountsGetAccessKeys200Response,
  AccountsGetAccessKeysdefaultResponse,
  AccountsGetAccountProperties200Response,
  AccountsGetAccountPropertiesdefaultResponse,
  AccountsRegenerateAccessKey200Response,
  AccountsRegenerateAccessKeydefaultResponse,
  AccountsUpdateAccountProperties200Response,
  AccountsUpdateAccountPropertiesdefaultResponse,
  CollectionsCreateOrUpdateCollection200Response,
  CollectionsCreateOrUpdateCollectiondefaultResponse,
  CollectionsDeleteCollection204Response,
  CollectionsDeleteCollectiondefaultResponse,
  CollectionsGetCollection200Response,
  CollectionsGetCollectiondefaultResponse,
  CollectionsGetCollectionPath200Response,
  CollectionsGetCollectionPathdefaultResponse,
  CollectionsListChildCollectionNames200Response,
  CollectionsListChildCollectionNamesdefaultResponse,
  CollectionsListCollections200Response,
  CollectionsListCollectionsdefaultResponse,
  ResourceSetRulesCreateOrUpdateResourceSetRule200Response,
  ResourceSetRulesCreateOrUpdateResourceSetRuledefaultResponse,
  ResourceSetRulesDeleteResourceSetRule200Response,
  ResourceSetRulesDeleteResourceSetRule204Response,
  ResourceSetRulesDeleteResourceSetRuledefaultResponse,
  ResourceSetRulesGetResourceSetRule200Response,
  ResourceSetRulesGetResourceSetRuledefaultResponse,
  ResourceSetRulesListResourceSetRules200Response,
  ResourceSetRulesListResourceSetRulesdefaultResponse,
} from "./responses";

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
