// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MicrosoftDataCollectionResourceForUpdate,
  MicrosoftDataCollectionDataCollectionRuleResource,
} from "../../models/microsoft/dataCollection/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataCollectionRulesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionRulesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionRulesDeleteOptionalParams extends OperationOptions {
  /** If set to 'true' then all associations of this data collection rule will also be deleted */
  deleteAssociations?: boolean;
}

/** Optional parameters. */
export interface DataCollectionRulesUpdateOptionalParams extends OperationOptions {
  /** The payload */
  body?: MicrosoftDataCollectionResourceForUpdate;
}

/** Optional parameters. */
export interface DataCollectionRulesCreateOptionalParams extends OperationOptions {
  /** The payload */
  body?: MicrosoftDataCollectionDataCollectionRuleResource;
}

/** Optional parameters. */
export interface DataCollectionRulesGetOptionalParams extends OperationOptions {}
