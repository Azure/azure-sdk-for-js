// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext, ComputeClientOptionalParams } from "./api/index.js";
import { createCompute } from "./api/index.js";
import type { DiskAccessesOperations } from "./classic/diskAccesses/index.js";
import { _getDiskAccessesOperations } from "./classic/diskAccesses/index.js";
import type { DiskEncryptionSetsOperations } from "./classic/diskEncryptionSets/index.js";
import { _getDiskEncryptionSetsOperations } from "./classic/diskEncryptionSets/index.js";
import type { DiskRestorePointOperations } from "./classic/diskRestorePoint/index.js";
import { _getDiskRestorePointOperations } from "./classic/diskRestorePoint/index.js";
import type { DisksOperations } from "./classic/disks/index.js";
import { _getDisksOperations } from "./classic/disks/index.js";
import type { SnapshotsOperations } from "./classic/snapshots/index.js";
import { _getSnapshotsOperations } from "./classic/snapshots/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
