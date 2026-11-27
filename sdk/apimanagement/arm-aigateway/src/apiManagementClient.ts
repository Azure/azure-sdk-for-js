// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext, ApiManagementClientOptionalParams } from "./api/index.js";
import { createApiManagement } from "./api/index.js";
import type { AiGatewayAliasResourcesOperations } from "./classic/aiGatewayAliasResources/index.js";
import { _getAiGatewayAliasResourcesOperations } from "./classic/aiGatewayAliasResources/index.js";
import type { AiGatewayApiKeyResourcesOperations } from "./classic/aiGatewayApiKeyResources/index.js";
import { _getAiGatewayApiKeyResourcesOperations } from "./classic/aiGatewayApiKeyResources/index.js";
import type { AiGatewayModelProviderResourcesOperations } from "./classic/aiGatewayModelProviderResources/index.js";
import { _getAiGatewayModelProviderResourcesOperations } from "./classic/aiGatewayModelProviderResources/index.js";
import type { AiGatewayModelResourcesOperations } from "./classic/aiGatewayModelResources/index.js";
import { _getAiGatewayModelResourcesOperations } from "./classic/aiGatewayModelResources/index.js";
import type { AiGatewayNameAvailabilityOperationsOperations } from "./classic/aiGatewayNameAvailabilityOperations/index.js";
import { _getAiGatewayNameAvailabilityOperationsOperations } from "./classic/aiGatewayNameAvailabilityOperations/index.js";
import type { AiGatewayPrivateEndpointConnectionsOperations } from "./classic/aiGatewayPrivateEndpointConnections/index.js";
import { _getAiGatewayPrivateEndpointConnectionsOperations } from "./classic/aiGatewayPrivateEndpointConnections/index.js";
import type { AiGatewayPrivateLinkResourcesOperations } from "./classic/aiGatewayPrivateLinkResources/index.js";
import { _getAiGatewayPrivateLinkResourcesOperations } from "./classic/aiGatewayPrivateLinkResources/index.js";
import type { AiGatewayResourcesOperations } from "./classic/aiGatewayResources/index.js";
import { _getAiGatewayResourcesOperations } from "./classic/aiGatewayResources/index.js";
import type { AiGatewayTelemetryExporterResourcesOperations } from "./classic/aiGatewayTelemetryExporterResources/index.js";
import { _getAiGatewayTelemetryExporterResourcesOperations } from "./classic/aiGatewayTelemetryExporterResources/index.js";
import type { AiGatewayToolServerResourcesOperations } from "./classic/aiGatewayToolServerResources/index.js";
import { _getAiGatewayToolServerResourcesOperations } from "./classic/aiGatewayToolServerResources/index.js";
import type { AiGatewayWorkspaceModelOperationsOperations } from "./classic/aiGatewayWorkspaceModelOperations/index.js";
import { _getAiGatewayWorkspaceModelOperationsOperations } from "./classic/aiGatewayWorkspaceModelOperations/index.js";
import type { AiGatewayWorkspaceResourcesOperations } from "./classic/aiGatewayWorkspaceResources/index.js";
import { _getAiGatewayWorkspaceResourcesOperations } from "./classic/aiGatewayWorkspaceResources/index.js";
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
    this.aiGatewayWorkspaceModelOperations = _getAiGatewayWorkspaceModelOperationsOperations(
      this._client,
    );
    this.aiGatewayApiKeyResources = _getAiGatewayApiKeyResourcesOperations(this._client);
    this.aiGatewayToolServerResources = _getAiGatewayToolServerResourcesOperations(this._client);
    this.aiGatewayModelResources = _getAiGatewayModelResourcesOperations(this._client);
    this.aiGatewayModelProviderResources = _getAiGatewayModelProviderResourcesOperations(
      this._client,
    );
    this.aiGatewayWorkspaceResources = _getAiGatewayWorkspaceResourcesOperations(this._client);
    this.aiGatewayPrivateLinkResources = _getAiGatewayPrivateLinkResourcesOperations(this._client);
    this.aiGatewayPrivateEndpointConnections = _getAiGatewayPrivateEndpointConnectionsOperations(
      this._client,
    );
    this.aiGatewayResources = _getAiGatewayResourcesOperations(this._client);
    this.aiGatewayAliasResources = _getAiGatewayAliasResourcesOperations(this._client);
    this.aiGatewayTelemetryExporterResources = _getAiGatewayTelemetryExporterResourcesOperations(
      this._client,
    );
    this.aiGatewayNameAvailabilityOperations = _getAiGatewayNameAvailabilityOperationsOperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for aiGatewayWorkspaceModelOperations */
  public readonly aiGatewayWorkspaceModelOperations: AiGatewayWorkspaceModelOperationsOperations;
  /** The operation groups for aiGatewayApiKeyResources */
  public readonly aiGatewayApiKeyResources: AiGatewayApiKeyResourcesOperations;
  /** The operation groups for aiGatewayToolServerResources */
  public readonly aiGatewayToolServerResources: AiGatewayToolServerResourcesOperations;
  /** The operation groups for aiGatewayModelResources */
  public readonly aiGatewayModelResources: AiGatewayModelResourcesOperations;
  /** The operation groups for aiGatewayModelProviderResources */
  public readonly aiGatewayModelProviderResources: AiGatewayModelProviderResourcesOperations;
  /** The operation groups for aiGatewayWorkspaceResources */
  public readonly aiGatewayWorkspaceResources: AiGatewayWorkspaceResourcesOperations;
  /** The operation groups for aiGatewayPrivateLinkResources */
  public readonly aiGatewayPrivateLinkResources: AiGatewayPrivateLinkResourcesOperations;
  /** The operation groups for aiGatewayPrivateEndpointConnections */
  public readonly aiGatewayPrivateEndpointConnections: AiGatewayPrivateEndpointConnectionsOperations;
  /** The operation groups for aiGatewayResources */
  public readonly aiGatewayResources: AiGatewayResourcesOperations;
  /** The operation groups for aiGatewayAliasResources */
  public readonly aiGatewayAliasResources: AiGatewayAliasResourcesOperations;
  /** The operation groups for aiGatewayTelemetryExporterResources */
  public readonly aiGatewayTelemetryExporterResources: AiGatewayTelemetryExporterResourcesOperations;
  /** The operation groups for aiGatewayNameAvailabilityOperations */
  public readonly aiGatewayNameAvailabilityOperations: AiGatewayNameAvailabilityOperationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
