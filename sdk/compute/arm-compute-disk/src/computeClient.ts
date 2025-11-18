// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createCompute,
  ComputeContext,
  ComputeClientOptionalParams,
} from "./api/index.js";
import {
  DiskAccessesOperations,
  _getDiskAccessesOperations,
} from "./classic/diskAccesses/index.js";
import {
  DiskEncryptionSetsOperations,
  _getDiskEncryptionSetsOperations,
} from "./classic/diskEncryptionSets/index.js";
import {
  DiskRestorePointOperations,
  _getDiskRestorePointOperations,
} from "./classic/diskRestorePoint/index.js";
import { DisksOperations, _getDisksOperations } from "./classic/disks/index.js";
import {
  SnapshotsOperations,
  _getSnapshotsOperations,
} from "./classic/snapshots/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeClientOptionalParams } from "./api/computeContext.js";

export class ComputeClient {
  private _client: ComputeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Compute Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCompute(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.diskRestorePoint = _getDiskRestorePointOperations(this._client);
    this.snapshots = _getSnapshotsOperations(this._client);
    this.diskEncryptionSets = _getDiskEncryptionSetsOperations(this._client);
    this.diskAccesses = _getDiskAccessesOperations(this._client);
    this.disks = _getDisksOperations(this._client);
  }

  /** The operation groups for diskRestorePoint */
  public readonly diskRestorePoint: DiskRestorePointOperations;
  /** The operation groups for snapshots */
  public readonly snapshots: SnapshotsOperations;
  /** The operation groups for diskEncryptionSets */
  public readonly diskEncryptionSets: DiskEncryptionSetsOperations;
  /** The operation groups for diskAccesses */
  public readonly diskAccesses: DiskAccessesOperations;
  /** The operation groups for disks */
  public readonly disks: DisksOperations;
}
