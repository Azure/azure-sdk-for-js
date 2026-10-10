// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext, ApiManagementClientOptionalParams } from "./api/index.js";
import { createApiManagement } from "./api/index.js";
import type { AiGatewayResourcesOperations } from "./classic/aiGatewayResources/index.js";
import { _getAiGatewayResourcesOperations } from "./classic/aiGatewayResources/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ApiManagementClientOptionalParams } from "./api/apiManagementContext.js";

export class ApiManagementClient {
  private _client: ApiManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ApiManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ApiManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ApiManagementClientOptionalParams,
    options?: ApiManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    this._client = createApiManagement(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.aiGatewayResources = _getAiGatewayResourcesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for aiGatewayResources */
  public readonly aiGatewayResources: AiGatewayResourcesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
