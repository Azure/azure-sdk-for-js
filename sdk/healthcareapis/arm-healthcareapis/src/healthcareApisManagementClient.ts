// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  HealthcareApisManagementContext,
  HealthcareApisManagementClientOptionalParams,
} from "./api/index.js";
import { createHealthcareApisManagement } from "./api/index.js";
import type { DicomServicesOperations } from "./classic/dicomServices/index.js";
import { _getDicomServicesOperations } from "./classic/dicomServices/index.js";
import type { FhirDestinationsOperations } from "./classic/fhirDestinations/index.js";
import { _getFhirDestinationsOperations } from "./classic/fhirDestinations/index.js";
import type { FhirServicesOperations } from "./classic/fhirServices/index.js";
import { _getFhirServicesOperations } from "./classic/fhirServices/index.js";
import type { IotConnectorFhirDestinationOperations } from "./classic/iotConnectorFhirDestination/index.js";
import { _getIotConnectorFhirDestinationOperations } from "./classic/iotConnectorFhirDestination/index.js";
import type { IotConnectorsOperations } from "./classic/iotConnectors/index.js";
import { _getIotConnectorsOperations } from "./classic/iotConnectors/index.js";
import type { OperationResultsOperations } from "./classic/operationResults/index.js";
import { _getOperationResultsOperations } from "./classic/operationResults/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { ServicesOperations } from "./classic/services/index.js";
import { _getServicesOperations } from "./classic/services/index.js";
import type { WorkspacePrivateEndpointConnectionsOperations } from "./classic/workspacePrivateEndpointConnections/index.js";
import { _getWorkspacePrivateEndpointConnectionsOperations } from "./classic/workspacePrivateEndpointConnections/index.js";
import type { WorkspacePrivateLinkResourcesOperations } from "./classic/workspacePrivateLinkResources/index.js";
import { _getWorkspacePrivateLinkResourcesOperations } from "./classic/workspacePrivateLinkResources/index.js";
import type { WorkspacesOperations } from "./classic/workspaces/index.js";
import { _getWorkspacesOperations } from "./classic/workspaces/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { HealthcareApisManagementClientOptionalParams } from "./api/healthcareApisManagementContext.js";

export class HealthcareApisManagementClient {
  private _client: HealthcareApisManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: HealthcareApisManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: HealthcareApisManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | HealthcareApisManagementClientOptionalParams,
    options?: HealthcareApisManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createHealthcareApisManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operationResults = _getOperationResultsOperations(this._client);
    this.fhirDestinations = _getFhirDestinationsOperations(this._client);
    this.iotConnectorFhirDestination = _getIotConnectorFhirDestinationOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.services = _getServicesOperations(this._client);
    this.fhirServices = _getFhirServicesOperations(this._client);
    this.iotConnectors = _getIotConnectorsOperations(this._client);
    this.dicomServices = _getDicomServicesOperations(this._client);
    this.workspaces = _getWorkspacesOperations(this._client);
    this.workspacePrivateLinkResources = _getWorkspacePrivateLinkResourcesOperations(this._client);
    this.workspacePrivateEndpointConnections = _getWorkspacePrivateEndpointConnectionsOperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for operationResults */
  public readonly operationResults: OperationResultsOperations;
  /** The operation groups for fhirDestinations */
  public readonly fhirDestinations: FhirDestinationsOperations;
  /** The operation groups for iotConnectorFhirDestination */
  public readonly iotConnectorFhirDestination: IotConnectorFhirDestinationOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for services */
  public readonly services: ServicesOperations;
  /** The operation groups for fhirServices */
  public readonly fhirServices: FhirServicesOperations;
  /** The operation groups for iotConnectors */
  public readonly iotConnectors: IotConnectorsOperations;
  /** The operation groups for dicomServices */
  public readonly dicomServices: DicomServicesOperations;
  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for workspacePrivateLinkResources */
  public readonly workspacePrivateLinkResources: WorkspacePrivateLinkResourcesOperations;
  /** The operation groups for workspacePrivateEndpointConnections */
  public readonly workspacePrivateEndpointConnections: WorkspacePrivateEndpointConnectionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
