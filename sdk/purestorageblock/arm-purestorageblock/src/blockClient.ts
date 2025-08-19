// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createBlock, BlockContext, BlockClientOptionalParams } from "./api/index.js";
import {
  AvsVmVolumesOperations,
  _getAvsVmVolumesOperations,
} from "./classic/avsVmVolumes/index.js";
import { AvsVmsOperations, _getAvsVmsOperations } from "./classic/avsVms/index.js";
import {
  AvsStorageContainerVolumesOperations,
  _getAvsStorageContainerVolumesOperations,
} from "./classic/avsStorageContainerVolumes/index.js";
import {
  AvsStorageContainersOperations,
  _getAvsStorageContainersOperations,
} from "./classic/avsStorageContainers/index.js";
import {
  StoragePoolsOperations,
  _getStoragePoolsOperations,
} from "./classic/storagePools/index.js";
import {
  ReservationsOperations,
  _getReservationsOperations,
} from "./classic/reservations/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { BlockClientOptionalParams } from "./api/blockContext.js";

export class BlockClient {
  private _client: BlockContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: BlockClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBlock(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.avsVmVolumes = _getAvsVmVolumesOperations(this._client);
    this.avsVms = _getAvsVmsOperations(this._client);
    this.avsStorageContainerVolumes = _getAvsStorageContainerVolumesOperations(this._client);
    this.avsStorageContainers = _getAvsStorageContainersOperations(this._client);
    this.storagePools = _getStoragePoolsOperations(this._client);
    this.reservations = _getReservationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for avsVmVolumes */
  public readonly avsVmVolumes: AvsVmVolumesOperations;
  /** The operation groups for avsVms */
  public readonly avsVms: AvsVmsOperations;
  /** The operation groups for avsStorageContainerVolumes */
  public readonly avsStorageContainerVolumes: AvsStorageContainerVolumesOperations;
  /** The operation groups for avsStorageContainers */
  public readonly avsStorageContainers: AvsStorageContainersOperations;
  /** The operation groups for storagePools */
  public readonly storagePools: StoragePoolsOperations;
  /** The operation groups for reservations */
  public readonly reservations: ReservationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
