// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ItemScope, ItemTypeParameter } from "../../models/analyticsItems/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AnalyticsItemsDeleteOptionalParams extends OperationOptions {
  /** The Id of a specific item defined in the Application Insights component */
  id?: string;
  /** The name of a specific item defined in the Application Insights component */
  name?: string;
}

/** Optional parameters. */
export interface AnalyticsItemsPutOptionalParams extends OperationOptions {
  /** Flag indicating whether or not to force save an item. This allows overriding an item if it already exists. */
  overrideItem?: boolean;
}

/** Optional parameters. */
export interface AnalyticsItemsGetOptionalParams extends OperationOptions {
  /** The Id of a specific item defined in the Application Insights component */
  id?: string;
  /** The name of a specific item defined in the Application Insights component */
  name?: string;
}

/** Optional parameters. */
export interface AnalyticsItemsListOptionalParams extends OperationOptions {
  /** Enum indicating if this item definition is owned by a specific user or is shared between all users with access to the Application Insights component. */
  scope?: ItemScope;
  /** Enum indicating the type of the Analytics item. */
  type?: ItemTypeParameter;
  /** Flag indicating whether or not to return the content of each applicable item. If false, only return the item information. */
  includeContent?: boolean;
}
