// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ElasticSanManagementContext,
  ElasticSanManagementOptionalParams,
} from "./api/index.js";
import { createElasticSanManagement } from "./api/index.js";
import type { ElasticSansOperations } from "./classic/elasticSans/index.js";
import { _getElasticSansOperations } from "./classic/elasticSans/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { SkusOperations } from "./classic/skus/index.js";
import { _getSkusOperations } from "./classic/skus/index.js";
import type { VolumeGroupsOperations } from "./classic/volumeGroups/index.js";
import { _getVolumeGroupsOperations } from "./classic/volumeGroups/index.js";
import type { VolumeSnapshotsOperations } from "./classic/volumeSnapshots/index.js";
import { _getVolumeSnapshotsOperations } from "./classic/volumeSnapshots/index.js";
import type { VolumesOperations } from "./classic/volumes/index.js";
import { _getVolumesOperations } from "./classic/volumes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ElasticSanManagementOptionalParams } from "./api/elasticSanManagementContext.js";

export class ElasticSanManagement {
  private _client: ElasticSanManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Elastic SAN is a fully integrated solution that simplifies deploying, scaling, managing, and configuring a storage area network (SAN). It also offers built-in cloud capabilities like high availability. Elastic SAN works with many types of compute resources, such as Azure Virtual Machines, Azure VMware Solution, and Azure Kubernetes Service. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ElasticSanManagementOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createElasticSanManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.skus = _getSkusOperations(this._client);
    this.volumeSnapshots = _getVolumeSnapshotsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.volumeGroups = _getVolumeGroupsOperations(this._client);
    this.volumes = _getVolumesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.elasticSans = _getElasticSansOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for skus */
  public readonly skus: SkusOperations;
  /** The operation groups for volumeSnapshots */
  public readonly volumeSnapshots: VolumeSnapshotsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for volumeGroups */
  public readonly volumeGroups: VolumeGroupsOperations;
  /** The operation groups for volumes */
  public readonly volumes: VolumesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for elasticSans */
  public readonly elasticSans: ElasticSansOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
