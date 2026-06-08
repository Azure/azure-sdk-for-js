// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MicrosoftStorageSyncContext,
  MicrosoftStorageSyncOptionalParams,
} from "./api/index.js";
import { createMicrosoftStorageSync } from "./api/index.js";
import { locationOperationStatus } from "./api/operations.js";
import type { LocationOperationStatusOptionalParams } from "./api/options.js";
import type { CloudEndpointsOperations } from "./classic/cloudEndpoints/index.js";
import { _getCloudEndpointsOperations } from "./classic/cloudEndpoints/index.js";
import type { OperationStatusOperationsOperations } from "./classic/operationStatusOperations/index.js";
import { _getOperationStatusOperationsOperations } from "./classic/operationStatusOperations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { RegisteredServersOperations } from "./classic/registeredServers/index.js";
import { _getRegisteredServersOperations } from "./classic/registeredServers/index.js";
import type { ServerEndpointsOperations } from "./classic/serverEndpoints/index.js";
import { _getServerEndpointsOperations } from "./classic/serverEndpoints/index.js";
import type { StorageSyncServicesOperations } from "./classic/storageSyncServices/index.js";
import { _getStorageSyncServicesOperations } from "./classic/storageSyncServices/index.js";
import type { SyncGroupsOperations } from "./classic/syncGroups/index.js";
import { _getSyncGroupsOperations } from "./classic/syncGroups/index.js";
import type { WorkflowsOperations } from "./classic/workflows/index.js";
import { _getWorkflowsOperations } from "./classic/workflows/index.js";
import type { LocationOperationStatus } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { MicrosoftStorageSyncOptionalParams } from "./api/microsoftStorageSyncContext.js";

export class MicrosoftStorageSync {
  private _client: MicrosoftStorageSyncContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: MicrosoftStorageSyncOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: MicrosoftStorageSyncOptionalParams,
  );
  /** Microsoft Storage Sync Service API. This belongs to Microsoft.StorageSync Resource Provider */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | MicrosoftStorageSyncOptionalParams,
    options?: MicrosoftStorageSyncOptionalParams,
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
    this._client = createMicrosoftStorageSync(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operationStatusOperations = _getOperationStatusOperationsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.workflows = _getWorkflowsOperations(this._client);
    this.registeredServers = _getRegisteredServersOperations(this._client);
    this.serverEndpoints = _getServerEndpointsOperations(this._client);
    this.cloudEndpoints = _getCloudEndpointsOperations(this._client);
    this.syncGroups = _getSyncGroupsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.storageSyncServices = _getStorageSyncServicesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Get Operation status */
  locationOperationStatus(
    locationName: string,
    operationId: string,
    options: LocationOperationStatusOptionalParams = { requestOptions: {} },
  ): Promise<LocationOperationStatus> {
    return locationOperationStatus(this._client, locationName, operationId, options);
  }

  /** The operation groups for operationStatusOperations */
  public readonly operationStatusOperations: OperationStatusOperationsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for workflows */
  public readonly workflows: WorkflowsOperations;
  /** The operation groups for registeredServers */
  public readonly registeredServers: RegisteredServersOperations;
  /** The operation groups for serverEndpoints */
  public readonly serverEndpoints: ServerEndpointsOperations;
  /** The operation groups for cloudEndpoints */
  public readonly cloudEndpoints: CloudEndpointsOperations;
  /** The operation groups for syncGroups */
  public readonly syncGroups: SyncGroupsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for storageSyncServices */
  public readonly storageSyncServices: StorageSyncServicesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
