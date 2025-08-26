// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createAzureSiteRecoveryManagementServiceAPI,
  AzureSiteRecoveryManagementServiceAPIContext,
  AzureSiteRecoveryManagementServiceAPIOptionalParams,
} from "./api/index.js";
import {
  LocationBasedOperationResultsOperations,
  _getLocationBasedOperationResultsOperations,
} from "./classic/locationBasedOperationResults/index.js";
import {
  OperationResultsOperations,
  _getOperationResultsOperations,
} from "./classic/operationResults/index.js";
import {
  DeploymentPreflightOperations,
  _getDeploymentPreflightOperations,
} from "./classic/deploymentPreflight/index.js";
import {
  CheckNameAvailabilityOperations,
  _getCheckNameAvailabilityOperations,
} from "./classic/checkNameAvailability/index.js";
import {
  ReplicationExtensionOperations,
  _getReplicationExtensionOperations,
} from "./classic/replicationExtension/index.js";
import {
  RecoveryPointOperations,
  _getRecoveryPointOperations,
} from "./classic/recoveryPoint/index.js";
import {
  ProtectedItemOperations,
  _getProtectedItemOperations,
} from "./classic/protectedItem/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import {
  PrivateEndpointConnectionProxiesOperations,
  _getPrivateEndpointConnectionProxiesOperations,
} from "./classic/privateEndpointConnectionProxies/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import { PolicyOperations, _getPolicyOperations } from "./classic/policy/index.js";
import { JobOperations, _getJobOperations } from "./classic/job/index.js";
import { FabricAgentOperations, _getFabricAgentOperations } from "./classic/fabricAgent/index.js";
import { FabricOperations, _getFabricOperations } from "./classic/fabric/index.js";
import { EventOperations, _getEventOperations } from "./classic/event/index.js";
import { VaultOperations, _getVaultOperations } from "./classic/vault/index.js";
import {
  EmailConfigurationOperations,
  _getEmailConfigurationOperations,
} from "./classic/emailConfiguration/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { AzureSiteRecoveryManagementServiceAPIOptionalParams } from "./api/azureSiteRecoveryManagementServiceAPIContext.js";

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
