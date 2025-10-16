// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ComputeManagementContext,
  ComputeManagementClientOptionalParams,
} from "./api/index.js";
import { createComputeManagement } from "./api/index.js";
import type { DiskAccessesOperations } from "./classic/diskAccesses/index.js";
import { _getDiskAccessesOperations } from "./classic/diskAccesses/index.js";
import type { DiskEncryptionSetsOperations } from "./classic/diskEncryptionSets/index.js";
import { _getDiskEncryptionSetsOperations } from "./classic/diskEncryptionSets/index.js";
import type { DiskRestorePointsOperations } from "./classic/diskRestorePoints/index.js";
import { _getDiskRestorePointsOperations } from "./classic/diskRestorePoints/index.js";
import type { DisksOperations } from "./classic/disks/index.js";
import { _getDisksOperations } from "./classic/disks/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { SnapshotsOperations } from "./classic/snapshots/index.js";
import { _getSnapshotsOperations } from "./classic/snapshots/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeManagementClientOptionalParams } from "./api/computeManagementContext.js";

export class ComputeManagementClient {
  private _client: ComputeManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Compute Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createComputeManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.snapshots = _getSnapshotsOperations(this._client);
    this.diskRestorePoints = _getDiskRestorePointsOperations(this._client);
    this.diskEncryptionSets = _getDiskEncryptionSetsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.diskAccesses = _getDiskAccessesOperations(this._client);
    this.disks = _getDisksOperations(this._client);
  }

  /** The operation groups for snapshots */
  public readonly snapshots: SnapshotsOperations;
  /** The operation groups for diskRestorePoints */
  public readonly diskRestorePoints: DiskRestorePointsOperations;
  /** The operation groups for diskEncryptionSets */
  public readonly diskEncryptionSets: DiskEncryptionSetsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for diskAccesses */
  public readonly diskAccesses: DiskAccessesOperations;
  /** The operation groups for disks */
  public readonly disks: DisksOperations;
}
