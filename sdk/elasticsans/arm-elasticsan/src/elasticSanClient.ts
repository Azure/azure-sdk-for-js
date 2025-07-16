// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createElasticSan,
  ElasticSanContext,
  ElasticSanClientOptionalParams,
} from "./api/index.js";
import { Volume } from "./models/models.js";
import { RestoreVolumeOptionalParams } from "./api/options.js";
import { restoreVolume } from "./api/operations.js";
import { SkusOperations, _getSkusOperations } from "./classic/skus/index.js";
import {
  VolumeSnapshotsOperations,
  _getVolumeSnapshotsOperations,
} from "./classic/volumeSnapshots/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import {
  VolumeGroupsOperations,
  _getVolumeGroupsOperations,
} from "./classic/volumeGroups/index.js";
import { VolumesOperations, _getVolumesOperations } from "./classic/volumes/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import { ElasticSansOperations, _getElasticSansOperations } from "./classic/elasticSans/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";

export { ElasticSanClientOptionalParams } from "./api/elasticSanContext.js";

export class ElasticSanClient {
  private _client: ElasticSanContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** (missing-service-description) Add service description */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ElasticSanClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createElasticSan(credential, subscriptionId, {
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

  /** Restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group */
  restoreVolume(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    options: RestoreVolumeOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<Volume>, Volume> {
    return restoreVolume(
      this._client,
      resourceGroupName,
      elasticSanName,
      volumeGroupName,
      volumeName,
      options,
    );
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
