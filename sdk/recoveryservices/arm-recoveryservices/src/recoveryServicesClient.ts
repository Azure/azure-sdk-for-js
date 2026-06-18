// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RecoveryServicesContext,
  RecoveryServicesClientOptionalParams,
  createRecoveryServices,
} from "./api/index.js";
import { getOperationResult, getOperationStatus } from "./api/operations.js";
import {
  GetOperationResultOptionalParams,
  GetOperationStatusOptionalParams,
} from "./api/options.js";
import {
  DeletedVaultsOperations,
  _getDeletedVaultsOperations,
} from "./classic/deletedVaults/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import {
  RecoveryServicesOperations,
  _getRecoveryServicesOperations,
} from "./classic/recoveryServices/index.js";
import {
  RegisteredIdentitiesOperations,
  _getRegisteredIdentitiesOperations,
} from "./classic/registeredIdentities/index.js";
import {
  ReplicationUsagesOperations,
  _getReplicationUsagesOperations,
} from "./classic/replicationUsages/index.js";
import { UsagesOperations, _getUsagesOperations } from "./classic/usages/index.js";
import {
  VaultCertificatesOperations,
  _getVaultCertificatesOperations,
} from "./classic/vaultCertificates/index.js";
import {
  VaultExtendedInfoOperations,
  _getVaultExtendedInfoOperations,
} from "./classic/vaultExtendedInfo/index.js";
import { VaultsOperations, _getVaultsOperations } from "./classic/vaults/index.js";
import { OperationResource, Vault } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { RecoveryServicesClientOptionalParams } from "./api/recoveryServicesContext.js";

export class RecoveryServicesClient {
  private _client: RecoveryServicesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: RecoveryServicesClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: RecoveryServicesClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | RecoveryServicesClientOptionalParams,
    options?: RecoveryServicesClientOptionalParams,
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
    this._client = createRecoveryServices(credential, subscriptionId ?? "", {
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
  ): Promise<Vault | undefined> {
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
