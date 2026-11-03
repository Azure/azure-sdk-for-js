// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatadogAgreementResource } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MarketplaceAgreementsCreateOrUpdateOptionalParams extends OperationOptions {
  /** The request body */
  body?: DatadogAgreementResource;
}

/** Optional parameters. */
export interface MarketplaceAgreementsListOptionalParams extends OperationOptions {}
