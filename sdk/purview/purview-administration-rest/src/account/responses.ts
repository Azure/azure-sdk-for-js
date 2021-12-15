// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  AccountOutput,
  ErrorResponseModelOutput,
  AccessKeysOutput,
  CollectionOutput,
  CollectionListOutput,
  CollectionNameResponseListOutput,
  CollectionPathResponseOutput,
  ResourceSetRuleConfigOutput,
  ResourceSetRuleConfigListOutput
} from "./outputModels";

/** Get an account */
export interface AccountsGetAccountProperties200Response extends HttpResponse {
  status: "200";
  body: AccountOutput;
}

/** Get an account */
export interface AccountsGetAccountPropertiesdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Updates an account */
export interface AccountsUpdateAccountProperties200Response
  extends HttpResponse {
  status: "200";
  body: AccountOutput;
}

/** Updates an account */
export interface AccountsUpdateAccountPropertiesdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** List the authorization keys associated with this account. */
export interface AccountsGetAccessKeys200Response extends HttpResponse {
  status: "200";
  body: AccessKeysOutput;
}

/** List the authorization keys associated with this account. */
export interface AccountsGetAccessKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Regenerate the authorization keys associated with this data catalog. */
export interface AccountsRegenerateAccessKey200Response extends HttpResponse {
  status: "200";
  body: AccessKeysOutput;
}

/** Regenerate the authorization keys associated with this data catalog. */
export interface AccountsRegenerateAccessKeydefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Get a collection */
export interface CollectionsGetCollection200Response extends HttpResponse {
  status: "200";
  body: CollectionOutput;
}

/** Get a collection */
export interface CollectionsGetCollectiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Creates or updates a collection entity. */
export interface CollectionsCreateOrUpdateCollection200Response
  extends HttpResponse {
  status: "200";
  body: CollectionOutput;
}

/** Creates or updates a collection entity. */
export interface CollectionsCreateOrUpdateCollectiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Deletes a Collection entity. */
export interface CollectionsDeleteCollection204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a Collection entity. */
export interface CollectionsDeleteCollectiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** List the collections in the account. */
export interface CollectionsListCollections200Response extends HttpResponse {
  status: "200";
  body: CollectionListOutput;
}

/** List the collections in the account. */
export interface CollectionsListCollectionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Lists the child collections names in the collection. */
export interface CollectionsListChildCollectionNames200Response
  extends HttpResponse {
  status: "200";
  body: CollectionNameResponseListOutput;
}

/** Lists the child collections names in the collection. */
export interface CollectionsListChildCollectionNamesdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Gets the parent name and parent friendly name chains that represent the collection path. */
export interface CollectionsGetCollectionPath200Response extends HttpResponse {
  status: "200";
  body: CollectionPathResponseOutput;
}

/** Gets the parent name and parent friendly name chains that represent the collection path. */
export interface CollectionsGetCollectionPathdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Get a resource set config service model. */
export interface ResourceSetRulesGetResourceSetRule200Response
  extends HttpResponse {
  status: "200";
  body: ResourceSetRuleConfigOutput;
}

/** Get a resource set config service model. */
export interface ResourceSetRulesGetResourceSetRuledefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Creates or updates an resource set config. */
export interface ResourceSetRulesCreateOrUpdateResourceSetRule200Response
  extends HttpResponse {
  status: "200";
  body: ResourceSetRuleConfigOutput;
}

/** Creates or updates an resource set config. */
export interface ResourceSetRulesCreateOrUpdateResourceSetRuledefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Deletes a ResourceSetRuleConfig resource. */
export interface ResourceSetRulesDeleteResourceSetRule200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a ResourceSetRuleConfig resource. */
export interface ResourceSetRulesDeleteResourceSetRule204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a ResourceSetRuleConfig resource. */
export interface ResourceSetRulesDeleteResourceSetRuledefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}

/** Get a resource set config service model. */
export interface ResourceSetRulesListResourceSetRules200Response
  extends HttpResponse {
  status: "200";
  body: ResourceSetRuleConfigListOutput;
}

/** Get a resource set config service model. */
export interface ResourceSetRulesListResourceSetRulesdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModelOutput;
}
