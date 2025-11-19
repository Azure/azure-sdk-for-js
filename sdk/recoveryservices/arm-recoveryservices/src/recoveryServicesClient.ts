// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext, RecoveryServicesClientOptionalParams } from "./api/index.js";
import { createRecoveryServices } from "./api/index.js";
import { getOperationResult, getOperationStatus } from "./api/operations.js";
import type {
  GetOperationResultOptionalParams,
  GetOperationStatusOptionalParams,
} from "./api/options.js";
import type { DeletedVaultsOperations } from "./classic/deletedVaults/index.js";
import { _getDeletedVaultsOperations } from "./classic/deletedVaults/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { RecoveryServicesOperations } from "./classic/recoveryServices/index.js";
import { _getRecoveryServicesOperations } from "./classic/recoveryServices/index.js";
import type { RegisteredIdentitiesOperations } from "./classic/registeredIdentities/index.js";
import { _getRegisteredIdentitiesOperations } from "./classic/registeredIdentities/index.js";
import type { ReplicationUsagesOperations } from "./classic/replicationUsages/index.js";
import { _getReplicationUsagesOperations } from "./classic/replicationUsages/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { VaultCertificatesOperations } from "./classic/vaultCertificates/index.js";
import { _getVaultCertificatesOperations } from "./classic/vaultCertificates/index.js";
import type { VaultExtendedInfoOperations } from "./classic/vaultExtendedInfo/index.js";
import { _getVaultExtendedInfoOperations } from "./classic/vaultExtendedInfo/index.js";
import type { VaultsOperations } from "./classic/vaults/index.js";
import { _getVaultsOperations } from "./classic/vaults/index.js";
import type { OperationResource, Vault } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { RecoveryServicesClientOptionalParams } from "./api/recoveryServicesContext.js";

export class RecoveryServicesClient {
  private _client: RecoveryServicesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: RecoveryServicesClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createRecoveryServices(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.recoveryServices = _getRecoveryServicesOperations(this._client);
    this.vaultExtendedInfo = _getVaultExtendedInfoOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.replicationUsages = _getReplicationUsagesOperations(this._client);
    this.registeredIdentities = _getRegisteredIdentitiesOperations(this._client);
    this.vaultCertificates = _getVaultCertificatesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.deletedVaults = _getDeletedVaultsOperations(this._client);
    this.vaults = _getVaultsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Gets the operation result for a resource. */
  getOperationResult(
    resourceGroupName: string,
    vaultName: string,
    operationId: string,
    options: GetOperationResultOptionalParams = { requestOptions: {} },
  ): Promise<Vault | null> {
    return getOperationResult(this._client, resourceGroupName, vaultName, operationId, options);
  }

  /** Gets the operation status for a resource. */
  getOperationStatus(
    resourceGroupName: string,
    vaultName: string,
    operationId: string,
    options: GetOperationStatusOptionalParams = { requestOptions: {} },
  ): Promise<OperationResource> {
    return getOperationStatus(this._client, resourceGroupName, vaultName, operationId, options);
  }

  /** The operation groups for recoveryServices */
  public readonly recoveryServices: RecoveryServicesOperations;
  /** The operation groups for vaultExtendedInfo */
  public readonly vaultExtendedInfo: VaultExtendedInfoOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for replicationUsages */
  public readonly replicationUsages: ReplicationUsagesOperations;
  /** The operation groups for registeredIdentities */
  public readonly registeredIdentities: RegisteredIdentitiesOperations;
  /** The operation groups for vaultCertificates */
  public readonly vaultCertificates: VaultCertificatesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for deletedVaults */
  public readonly deletedVaults: DeletedVaultsOperations;
  /** The operation groups for vaults */
  public readonly vaults: VaultsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
