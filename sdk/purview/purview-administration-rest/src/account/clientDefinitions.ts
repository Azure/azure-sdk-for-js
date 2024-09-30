// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  AccountsGetAccountPropertiesDefaultResponse,
  AccountsUpdateAccountProperties200Response,
  AccountsUpdateAccountPropertiesDefaultResponse,
  AccountsGetAccessKeys200Response,
  AccountsGetAccessKeysDefaultResponse,
  AccountsRegenerateAccessKey200Response,
  AccountsRegenerateAccessKeyDefaultResponse,
  CollectionsGetCollection200Response,
  CollectionsGetCollectionDefaultResponse,
  CollectionsCreateOrUpdateCollection200Response,
  CollectionsCreateOrUpdateCollectionDefaultResponse,
  CollectionsDeleteCollection204Response,
  CollectionsDeleteCollectionDefaultResponse,
  CollectionsListCollections200Response,
  CollectionsListCollectionsDefaultResponse,
  CollectionsListChildCollectionNames200Response,
  CollectionsListChildCollectionNamesDefaultResponse,
  CollectionsGetCollectionPath200Response,
  CollectionsGetCollectionPathDefaultResponse,
  ResourceSetRulesGetResourceSetRule200Response,
  ResourceSetRulesGetResourceSetRuleDefaultResponse,
  ResourceSetRulesCreateOrUpdateResourceSetRule200Response,
  ResourceSetRulesCreateOrUpdateResourceSetRuleDefaultResponse,
  ResourceSetRulesDeleteResourceSetRule200Response,
  ResourceSetRulesDeleteResourceSetRule204Response,
  ResourceSetRulesDeleteResourceSetRuleDefaultResponse,
  ResourceSetRulesListResourceSetRules200Response,
  ResourceSetRulesListResourceSetRulesDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface AccountsGetAccountProperties {
  /** Get an account */
  get(
    options?: AccountsGetAccountPropertiesParameters,
  ): StreamableMethod<
    | AccountsGetAccountProperties200Response
    | AccountsGetAccountPropertiesDefaultResponse
  >;
  /** Updates an account */
  patch(
    options: AccountsUpdateAccountPropertiesParameters,
  ): StreamableMethod<
    | AccountsUpdateAccountProperties200Response
    | AccountsUpdateAccountPropertiesDefaultResponse
  >;
}

export interface AccountsGetAccessKeys {
  /** List the authorization keys associated with this account. */
  post(
    options?: AccountsGetAccessKeysParameters,
  ): StreamableMethod<
    AccountsGetAccessKeys200Response | AccountsGetAccessKeysDefaultResponse
  >;
}

export interface AccountsRegenerateAccessKey {
  /** Regenerate the authorization keys associated with this data catalog. */
  post(
    options: AccountsRegenerateAccessKeyParameters,
  ): StreamableMethod<
    | AccountsRegenerateAccessKey200Response
    | AccountsRegenerateAccessKeyDefaultResponse
  >;
}

export interface CollectionsGetCollection {
  /** Get a collection */
  get(
    options?: CollectionsGetCollectionParameters,
  ): StreamableMethod<
    | CollectionsGetCollection200Response
    | CollectionsGetCollectionDefaultResponse
  >;
  /** Creates or updates a collection entity. */
  put(
    options: CollectionsCreateOrUpdateCollectionParameters,
  ): StreamableMethod<
    | CollectionsCreateOrUpdateCollection200Response
    | CollectionsCreateOrUpdateCollectionDefaultResponse
  >;
  /** Deletes a Collection entity. */
  delete(
    options?: CollectionsDeleteCollectionParameters,
  ): StreamableMethod<
    | CollectionsDeleteCollection204Response
    | CollectionsDeleteCollectionDefaultResponse
  >;
}

export interface CollectionsListCollections {
  /** List the collections in the account. */
  get(
    options?: CollectionsListCollectionsParameters,
  ): StreamableMethod<
    | CollectionsListCollections200Response
    | CollectionsListCollectionsDefaultResponse
  >;
}

export interface CollectionsListChildCollectionNames {
  /** Lists the child collections names in the collection. */
  get(
    options?: CollectionsListChildCollectionNamesParameters,
  ): StreamableMethod<
    | CollectionsListChildCollectionNames200Response
    | CollectionsListChildCollectionNamesDefaultResponse
  >;
}

export interface CollectionsGetCollectionPath {
  /** Gets the parent name and parent friendly name chains that represent the collection path. */
  get(
    options?: CollectionsGetCollectionPathParameters,
  ): StreamableMethod<
    | CollectionsGetCollectionPath200Response
    | CollectionsGetCollectionPathDefaultResponse
  >;
}

export interface ResourceSetRulesGetResourceSetRule {
  /** Get a resource set config service model. */
  get(
    options?: ResourceSetRulesGetResourceSetRuleParameters,
  ): StreamableMethod<
    | ResourceSetRulesGetResourceSetRule200Response
    | ResourceSetRulesGetResourceSetRuleDefaultResponse
  >;
  /** Creates or updates an resource set config. */
  put(
    options: ResourceSetRulesCreateOrUpdateResourceSetRuleParameters,
  ): StreamableMethod<
    | ResourceSetRulesCreateOrUpdateResourceSetRule200Response
    | ResourceSetRulesCreateOrUpdateResourceSetRuleDefaultResponse
  >;
  /** Deletes a ResourceSetRuleConfig resource. */
  delete(
    options?: ResourceSetRulesDeleteResourceSetRuleParameters,
  ): StreamableMethod<
    | ResourceSetRulesDeleteResourceSetRule200Response
    | ResourceSetRulesDeleteResourceSetRule204Response
    | ResourceSetRulesDeleteResourceSetRuleDefaultResponse
  >;
}

export interface ResourceSetRulesListResourceSetRules {
  /** Get a resource set config service model. */
  get(
    options?: ResourceSetRulesListResourceSetRulesParameters,
  ): StreamableMethod<
    | ResourceSetRulesListResourceSetRules200Response
    | ResourceSetRulesListResourceSetRulesDefaultResponse
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
  (
    path: "/collections/{collectionName}",
    collectionName: string,
  ): CollectionsGetCollection;
  /** Resource for '/collections' has methods for the following verbs: get */
  (path: "/collections"): CollectionsListCollections;
  /** Resource for '/collections/\{collectionName\}/getChildCollectionNames' has methods for the following verbs: get */
  (
    path: "/collections/{collectionName}/getChildCollectionNames",
    collectionName: string,
  ): CollectionsListChildCollectionNames;
  /** Resource for '/collections/\{collectionName\}/getCollectionPath' has methods for the following verbs: get */
  (
    path: "/collections/{collectionName}/getCollectionPath",
    collectionName: string,
  ): CollectionsGetCollectionPath;
  /** Resource for '/resourceSetRuleConfigs/defaultResourceSetRuleConfig' has methods for the following verbs: get, put, delete */
  (
    path: "/resourceSetRuleConfigs/defaultResourceSetRuleConfig",
  ): ResourceSetRulesGetResourceSetRule;
  /** Resource for '/resourceSetRuleConfigs' has methods for the following verbs: get */
  (path: "/resourceSetRuleConfigs"): ResourceSetRulesListResourceSetRules;
}

export type PurviewAccountClient = Client & {
  path: Routes;
};
