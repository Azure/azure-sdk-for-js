// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  HybridComputeManagementContext,
  HybridComputeManagementClientOptionalParams,
} from "./api/index.js";
import { createHybridComputeManagement } from "./api/index.js";
import { setupExtensions, upgradeExtensions } from "./api/operations.js";
import type {
  SetupExtensionsOptionalParams,
  UpgradeExtensionsOptionalParams,
} from "./api/options.js";
import type { ExtensionMetadataOperations } from "./classic/extensionMetadata/index.js";
import { _getExtensionMetadataOperations } from "./classic/extensionMetadata/index.js";
import type { ExtensionMetadataV2Operations } from "./classic/extensionMetadataV2/index.js";
import { _getExtensionMetadataV2Operations } from "./classic/extensionMetadataV2/index.js";
import type { ExtensionPublisherOperations } from "./classic/extensionPublisher/index.js";
import { _getExtensionPublisherOperations } from "./classic/extensionPublisher/index.js";
import type { ExtensionTypeOperations } from "./classic/extensionType/index.js";
import { _getExtensionTypeOperations } from "./classic/extensionType/index.js";
import type { GatewaysOperations } from "./classic/gateways/index.js";
import { _getGatewaysOperations } from "./classic/gateways/index.js";
import type { LicenseProfilesOperations } from "./classic/licenseProfiles/index.js";
import { _getLicenseProfilesOperations } from "./classic/licenseProfiles/index.js";
import type { LicensesOperations } from "./classic/licenses/index.js";
import { _getLicensesOperations } from "./classic/licenses/index.js";
import type { MachineExtensionsOperations } from "./classic/machineExtensions/index.js";
import { _getMachineExtensionsOperations } from "./classic/machineExtensions/index.js";
import type { MachineRunCommandsOperations } from "./classic/machineRunCommands/index.js";
import { _getMachineRunCommandsOperations } from "./classic/machineRunCommands/index.js";
import type { MachinesOperations } from "./classic/machines/index.js";
import { _getMachinesOperations } from "./classic/machines/index.js";
import type { NetworkProfileOperationsOperations } from "./classic/networkProfileOperations/index.js";
import { _getNetworkProfileOperationsOperations } from "./classic/networkProfileOperations/index.js";
import type { NetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import { _getNetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { PrivateLinkScopesOperations } from "./classic/privateLinkScopes/index.js";
import { _getPrivateLinkScopesOperations } from "./classic/privateLinkScopes/index.js";
import type { SettingsOperations } from "./classic/settings/index.js";
import { _getSettingsOperations } from "./classic/settings/index.js";
import type { MachineExtensionUpgrade, SetupExtensionRequest } from "./models/models.js";
import type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "./static-helpers/simplePollerHelpers.js";
import type { TokenCredential } from "@azure/core-auth";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { HybridComputeManagementClientOptionalParams } from "./api/hybridComputeManagementContext.js";

export class HybridComputeManagementClient {
  private _client: HybridComputeManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: HybridComputeManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: HybridComputeManagementClientOptionalParams,
  );
  /** Azure Arc API reference for managing connected machines, machine extensions, run commands, gateways, licenses, license profiles, private link scopes, and related HybridCompute resources. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | HybridComputeManagementClientOptionalParams,
    options?: HybridComputeManagementClientOptionalParams,
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
    this._client = createHybridComputeManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.extensionPublisher = _getExtensionPublisherOperations(this._client);
    this.extensionType = _getExtensionTypeOperations(this._client);
    this.settings = _getSettingsOperations(this._client);
    this.extensionMetadataV2 = _getExtensionMetadataV2Operations(this._client);
    this.extensionMetadata = _getExtensionMetadataOperations(this._client);
    this.privateLinkScopes = _getPrivateLinkScopesOperations(this._client);
    this.networkProfileOperations = _getNetworkProfileOperationsOperations(this._client);
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.gateways = _getGatewaysOperations(this._client);
    this.machineRunCommands = _getMachineRunCommandsOperations(this._client);
    this.machineExtensions = _getMachineExtensionsOperations(this._client);
    this.licenseProfiles = _getLicenseProfilesOperations(this._client);
    this.machines = _getMachinesOperations(this._client);
    this.licenses = _getLicensesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation to Setup Machine Extensions. */
  setupExtensions(
    resourceGroupName: string,
    machineName: string,
    extensions: SetupExtensionRequest,
    options: SetupExtensionsOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<SetupExtensionRequest>, SetupExtensionRequest> {
    return setupExtensions(this._client, resourceGroupName, machineName, extensions, options);
  }

  /** @deprecated use setupExtensions instead */
  async beginSetupExtensions(
    resourceGroupName: string,
    machineName: string,
    extensions: SetupExtensionRequest,
    options: SetupExtensionsOptionalParams = { requestOptions: {} },
  ): Promise<SimplePollerLike<OperationState<SetupExtensionRequest>, SetupExtensionRequest>> {
    const poller = setupExtensions(
      this._client,
      resourceGroupName,
      machineName,
      extensions,
      options,
    );
    await poller.submitted();
    return getSimplePoller(poller);
  }

  /** @deprecated use setupExtensions instead */
  async beginSetupExtensionsAndWait(
    resourceGroupName: string,
    machineName: string,
    extensions: SetupExtensionRequest,
    options: SetupExtensionsOptionalParams = { requestOptions: {} },
  ): Promise<SetupExtensionRequest> {
    return await setupExtensions(this._client, resourceGroupName, machineName, extensions, options);
  }

  /** The operation to Upgrade Machine Extensions. */
  upgradeExtensions(
    resourceGroupName: string,
    machineName: string,
    extensionUpgradeParameters: MachineExtensionUpgrade,
    options: UpgradeExtensionsOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<void>, void> {
    return upgradeExtensions(
      this._client,
      resourceGroupName,
      machineName,
      extensionUpgradeParameters,
      options,
    );
  }

  /** @deprecated use upgradeExtensions instead */
  async beginUpgradeExtensions(
    resourceGroupName: string,
    machineName: string,
    extensionUpgradeParameters: MachineExtensionUpgrade,
    options: UpgradeExtensionsOptionalParams = { requestOptions: {} },
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const poller = upgradeExtensions(
      this._client,
      resourceGroupName,
      machineName,
      extensionUpgradeParameters,
      options,
    );
    await poller.submitted();
    return getSimplePoller(poller);
  }

  /** @deprecated use upgradeExtensions instead */
  async beginUpgradeExtensionsAndWait(
    resourceGroupName: string,
    machineName: string,
    extensionUpgradeParameters: MachineExtensionUpgrade,
    options: UpgradeExtensionsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return await upgradeExtensions(
      this._client,
      resourceGroupName,
      machineName,
      extensionUpgradeParameters,
      options,
    );
  }

  /** The operation groups for extensionPublisher */
  public readonly extensionPublisher: ExtensionPublisherOperations;
  /** The operation groups for extensionType */
  public readonly extensionType: ExtensionTypeOperations;
  /** The operation groups for settings */
  public readonly settings: SettingsOperations;
  /** The operation groups for extensionMetadataV2 */
  public readonly extensionMetadataV2: ExtensionMetadataV2Operations;
  /** The operation groups for extensionMetadata */
  public readonly extensionMetadata: ExtensionMetadataOperations;
  /** The operation groups for privateLinkScopes */
  public readonly privateLinkScopes: PrivateLinkScopesOperations;
  /** The operation groups for networkProfileOperations */
  public readonly networkProfileOperations: NetworkProfileOperationsOperations;
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for gateways */
  public readonly gateways: GatewaysOperations;
  /** The operation groups for machineRunCommands */
  public readonly machineRunCommands: MachineRunCommandsOperations;
  /** The operation groups for machineExtensions */
  public readonly machineExtensions: MachineExtensionsOperations;
  /** The operation groups for licenseProfiles */
  public readonly licenseProfiles: LicenseProfilesOperations;
  /** The operation groups for machines */
  public readonly machines: MachinesOperations;
  /** The operation groups for licenses */
  public readonly licenses: LicensesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
