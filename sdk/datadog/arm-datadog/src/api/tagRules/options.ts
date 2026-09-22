// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitoringTagRules } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TagRulesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagRulesCreateOrUpdateOptionalParams extends OperationOptions {
  body?: MonitoringTagRules;
}

/** Optional parameters. */
export interface TagRulesGetOptionalParams extends OperationOptions {}
