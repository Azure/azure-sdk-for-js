// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CollectionOffersByAllContextsPayload,
  MultiContextAndPlansPayload,
  Operation,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateStoreCollectionOfferPostOptionalParams extends OperationOptions {
  payload?: Operation;
}

/** Optional parameters. */
export interface PrivateStoreCollectionOfferUpsertOfferWithMultiContextOptionalParams extends OperationOptions {
  payload?: MultiContextAndPlansPayload;
}

/** Optional parameters. */
export interface PrivateStoreCollectionOfferContextsViewOptionalParams extends OperationOptions {
  payload?: CollectionOffersByAllContextsPayload;
}

/** Optional parameters. */
export interface PrivateStoreCollectionOfferListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCollectionOfferDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCollectionOfferCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCollectionOfferGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCollectionOfferListByContextsOptionalParams extends OperationOptions {
  payload?: CollectionOffersByAllContextsPayload;
}
