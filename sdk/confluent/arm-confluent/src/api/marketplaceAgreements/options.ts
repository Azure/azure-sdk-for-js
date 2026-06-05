// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentAgreementResource } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MarketplaceAgreementsCreateOptionalParams extends OperationOptions {
  /** The request body */
  body?: ConfluentAgreementResource;
}

/** Optional parameters. */
export interface MarketplaceAgreementsListOptionalParams extends OperationOptions {}
