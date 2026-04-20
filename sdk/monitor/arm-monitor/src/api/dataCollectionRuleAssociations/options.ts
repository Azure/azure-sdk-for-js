// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource } from "../../models/microsoft/dataCollection/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataCollectionRuleAssociationsListByRuleOptionalParams extends OperationOptions {
  /** (Optional) The continuation token for paginated responses */
  skipToken?: string;
  /** (Optional) The max number of items to return per page */
  top?: number;
}

/** Optional parameters. */
export interface DataCollectionRuleAssociationsListByResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionRuleAssociationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionRuleAssociationsCreateOptionalParams extends OperationOptions {
  /** The payload */
  body?: MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource;
}

/** Optional parameters. */
export interface DataCollectionRuleAssociationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionRuleAssociationsListByDataCollectionEndpointOptionalParams extends OperationOptions {}
