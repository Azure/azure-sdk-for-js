// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentType } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeploymentsListOptionalParams extends OperationOptions {
  /** Model publisher to filter models by */
  modelPublisher?: string;
  /** Model name (the publisher specific name) to filter models by */
  modelName?: string;
  /** Type of deployment to filter list by */
  deploymentType?: DeploymentType;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface DeploymentsGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
