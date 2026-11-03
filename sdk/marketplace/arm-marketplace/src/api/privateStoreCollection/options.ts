// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Collection, TransferOffersProperties, Operation } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateStoreCollectionPostOptionalParams extends OperationOptions {
  payload?: Operation;
}

/** Optional parameters. */
export interface PrivateStoreCollectionDisableApproveAllItemsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCollectionApproveAllItemsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCollectionTransferOffersOptionalParams extends OperationOptions {
  payload?: TransferOffersProperties;
}

/** Optional parameters. */
export interface PrivateStoreCollectionListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCollectionDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCollectionCreateOrUpdateOptionalParams extends OperationOptions {
  payload?: Collection;
}

/** Optional parameters. */
export interface PrivateStoreCollectionGetOptionalParams extends OperationOptions {}
