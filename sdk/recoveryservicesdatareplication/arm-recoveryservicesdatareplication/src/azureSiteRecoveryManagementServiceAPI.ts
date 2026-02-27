// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureSiteRecoveryManagementServiceAPIContext,
  AzureSiteRecoveryManagementServiceAPIOptionalParams} from "./api/index.js";
import {
  createAzureSiteRecoveryManagementServiceAPI
} from "./api/index.js";
import type {
  LocationBasedOperationResultsOperations} from "./classic/locationBasedOperationResults/index.js";
import {
  _getLocationBasedOperationResultsOperations,
} from "./classic/locationBasedOperationResults/index.js";
import type {
  OperationResultsOperations} from "./classic/operationResults/index.js";
import {
  _getOperationResultsOperations,
} from "./classic/operationResults/index.js";
import type {
  DeploymentPreflightOperations} from "./classic/deploymentPreflight/index.js";
import {
  _getDeploymentPreflightOperations,
} from "./classic/deploymentPreflight/index.js";
import type {
  CheckNameAvailabilityOperations} from "./classic/checkNameAvailability/index.js";
import {
  _getCheckNameAvailabilityOperations,
} from "./classic/checkNameAvailability/index.js";
import type {
  ReplicationExtensionOperations} from "./classic/replicationExtension/index.js";
import {
  _getReplicationExtensionOperations,
} from "./classic/replicationExtension/index.js";
import type {
  RecoveryPointOperations} from "./classic/recoveryPoint/index.js";
import {
  _getRecoveryPointOperations,
} from "./classic/recoveryPoint/index.js";
import type {
  ProtectedItemOperations} from "./classic/protectedItem/index.js";
import {
  _getProtectedItemOperations,
} from "./classic/protectedItem/index.js";
import type {
  PrivateLinkResourcesOperations} from "./classic/privateLinkResources/index.js";
import {
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import type {
  PrivateEndpointConnectionProxiesOperations} from "./classic/privateEndpointConnectionProxies/index.js";
import {
  _getPrivateEndpointConnectionProxiesOperations,
} from "./classic/privateEndpointConnectionProxies/index.js";
import type {
  PrivateEndpointConnectionsOperations} from "./classic/privateEndpointConnections/index.js";
import {
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import type { PolicyOperations} from "./classic/policy/index.js";
import { _getPolicyOperations } from "./classic/policy/index.js";
import type { JobOperations} from "./classic/job/index.js";
import { _getJobOperations } from "./classic/job/index.js";
import type { FabricAgentOperations} from "./classic/fabricAgent/index.js";
import { _getFabricAgentOperations } from "./classic/fabricAgent/index.js";
import type { FabricOperations} from "./classic/fabric/index.js";
import { _getFabricOperations } from "./classic/fabric/index.js";
import type { EventOperations} from "./classic/event/index.js";
import { _getEventOperations } from "./classic/event/index.js";
import type { VaultOperations} from "./classic/vault/index.js";
import { _getVaultOperations } from "./classic/vault/index.js";
import type {
  EmailConfigurationOperations} from "./classic/emailConfiguration/index.js";
import {
  _getEmailConfigurationOperations,
} from "./classic/emailConfiguration/index.js";
import type { OperationsOperations} from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { AzureSiteRecoveryManagementServiceAPIOptionalParams } from "./api/azureSiteRecoveryManagementServiceAPIContext.js";

export class AzureSiteRecoveryManagementServiceAPI {
  private _client: AzureSiteRecoveryManagementServiceAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** A first party Azure service enabling the data replication. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureSiteRecoveryManagementServiceAPIOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureSiteRecoveryManagementServiceAPI(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.locationBasedOperationResults = _getLocationBasedOperationResultsOperations(this._client);
    this.operationResults = _getOperationResultsOperations(this._client);
    this.deploymentPreflight = _getDeploymentPreflightOperations(this._client);
    this.checkNameAvailability = _getCheckNameAvailabilityOperations(this._client);
    this.replicationExtension = _getReplicationExtensionOperations(this._client);
    this.recoveryPoint = _getRecoveryPointOperations(this._client);
    this.protectedItem = _getProtectedItemOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnectionProxies = _getPrivateEndpointConnectionProxiesOperations(
      this._client,
    );
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.policy = _getPolicyOperations(this._client);
    this.job = _getJobOperations(this._client);
    this.fabricAgent = _getFabricAgentOperations(this._client);
    this.fabric = _getFabricOperations(this._client);
    this.event = _getEventOperations(this._client);
    this.vault = _getVaultOperations(this._client);
    this.emailConfiguration = _getEmailConfigurationOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for locationBasedOperationResults */
  public readonly locationBasedOperationResults: LocationBasedOperationResultsOperations;
  /** The operation groups for operationResults */
  public readonly operationResults: OperationResultsOperations;
  /** The operation groups for deploymentPreflight */
  public readonly deploymentPreflight: DeploymentPreflightOperations;
  /** The operation groups for checkNameAvailability */
  public readonly checkNameAvailability: CheckNameAvailabilityOperations;
  /** The operation groups for replicationExtension */
  public readonly replicationExtension: ReplicationExtensionOperations;
  /** The operation groups for recoveryPoint */
  public readonly recoveryPoint: RecoveryPointOperations;
  /** The operation groups for protectedItem */
  public readonly protectedItem: ProtectedItemOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnectionProxies */
  public readonly privateEndpointConnectionProxies: PrivateEndpointConnectionProxiesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for policy */
  public readonly policy: PolicyOperations;
  /** The operation groups for job */
  public readonly job: JobOperations;
  /** The operation groups for fabricAgent */
  public readonly fabricAgent: FabricAgentOperations;
  /** The operation groups for fabric */
  public readonly fabric: FabricOperations;
  /** The operation groups for event */
  public readonly event: EventOperations;
  /** The operation groups for vault */
  public readonly vault: VaultOperations;
  /** The operation groups for emailConfiguration */
  public readonly emailConfiguration: EmailConfigurationOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
