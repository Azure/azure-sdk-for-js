// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TroubleshooterResource, ContinueRequestBody } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TroubleshootersRestartOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TroubleshootersEndOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TroubleshootersContinueOptionalParams extends OperationOptions {
  /** The required request body for going to next step in Troubleshooter resource. */
  continueRequestBody?: ContinueRequestBody;
}

/** Optional parameters. */
export interface TroubleshootersCreateOptionalParams extends OperationOptions {
  /** The required request body for this Troubleshooter resource creation. */
  createTroubleshooterRequestBody?: TroubleshooterResource;
}

/** Optional parameters. */
export interface TroubleshootersGetOptionalParams extends OperationOptions {}
