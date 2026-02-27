// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureDedicatedHSMResourceProviderContext,
  AzureDedicatedHSMResourceProviderOptionalParams} from "./api/index.js";
import {
  createAzureDedicatedHSMResourceProvider
} from "./api/index.js";
import type {
  DedicatedHsmOperations} from "./classic/dedicatedHsm/index.js";
import {
  _getDedicatedHsmOperations,
} from "./classic/dedicatedHsm/index.js";
import type {
  CloudHsmClusterPrivateEndpointConnectionsOperations} from "./classic/cloudHsmClusterPrivateEndpointConnections/index.js";
import {
  _getCloudHsmClusterPrivateEndpointConnectionsOperations,
} from "./classic/cloudHsmClusterPrivateEndpointConnections/index.js";
import type {
  CloudHsmClusterRestoreStatusOperations} from "./classic/cloudHsmClusterRestoreStatus/index.js";
import {
  _getCloudHsmClusterRestoreStatusOperations,
} from "./classic/cloudHsmClusterRestoreStatus/index.js";
import type {
  CloudHsmClusterBackupStatusOperations} from "./classic/cloudHsmClusterBackupStatus/index.js";
import {
  _getCloudHsmClusterBackupStatusOperations,
} from "./classic/cloudHsmClusterBackupStatus/index.js";
import type {
  CloudHsmClusterPrivateLinkResourcesOperations} from "./classic/cloudHsmClusterPrivateLinkResources/index.js";
import {
  _getCloudHsmClusterPrivateLinkResourcesOperations,
} from "./classic/cloudHsmClusterPrivateLinkResources/index.js";
import type {
  PrivateEndpointConnectionsOperations} from "./classic/privateEndpointConnections/index.js";
import {
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import type {
  CloudHsmClustersOperations} from "./classic/cloudHsmClusters/index.js";
import {
  _getCloudHsmClustersOperations,
} from "./classic/cloudHsmClusters/index.js";
import type { OperationsOperations} from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { AzureDedicatedHSMResourceProviderOptionalParams } from "./api/azureDedicatedHSMResourceProviderContext.js";

export class AzureDedicatedHSMResourceProvider {
  private _client: AzureDedicatedHSMResourceProviderContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Azure management API provides a RESTful set of web services that interact with Hardware Security Modules. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureDedicatedHSMResourceProviderOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureDedicatedHSMResourceProvider(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.dedicatedHsm = _getDedicatedHsmOperations(this._client);
    this.cloudHsmClusterPrivateEndpointConnections =
      _getCloudHsmClusterPrivateEndpointConnectionsOperations(this._client);
    this.cloudHsmClusterRestoreStatus = _getCloudHsmClusterRestoreStatusOperations(this._client);
    this.cloudHsmClusterBackupStatus = _getCloudHsmClusterBackupStatusOperations(this._client);
    this.cloudHsmClusterPrivateLinkResources = _getCloudHsmClusterPrivateLinkResourcesOperations(
      this._client,
    );
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.cloudHsmClusters = _getCloudHsmClustersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for dedicatedHsm */
  public readonly dedicatedHsm: DedicatedHsmOperations;
  /** The operation groups for cloudHsmClusterPrivateEndpointConnections */
  public readonly cloudHsmClusterPrivateEndpointConnections: CloudHsmClusterPrivateEndpointConnectionsOperations;
  /** The operation groups for cloudHsmClusterRestoreStatus */
  public readonly cloudHsmClusterRestoreStatus: CloudHsmClusterRestoreStatusOperations;
  /** The operation groups for cloudHsmClusterBackupStatus */
  public readonly cloudHsmClusterBackupStatus: CloudHsmClusterBackupStatusOperations;
  /** The operation groups for cloudHsmClusterPrivateLinkResources */
  public readonly cloudHsmClusterPrivateLinkResources: CloudHsmClusterPrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for cloudHsmClusters */
  public readonly cloudHsmClusters: CloudHsmClustersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
