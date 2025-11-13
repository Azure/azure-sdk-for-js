// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DeviceRegistryManagementContext,
  DeviceRegistryManagementClientOptionalParams,
} from "./api/index.js";
import { createDeviceRegistryManagement } from "./api/index.js";
import type { AssetEndpointProfilesOperations } from "./classic/assetEndpointProfiles/index.js";
import { _getAssetEndpointProfilesOperations } from "./classic/assetEndpointProfiles/index.js";
import type { AssetsOperations } from "./classic/assets/index.js";
import { _getAssetsOperations } from "./classic/assets/index.js";
import type { BillingContainersOperations } from "./classic/billingContainers/index.js";
import { _getBillingContainersOperations } from "./classic/billingContainers/index.js";
import type { NamespaceAssetsOperations } from "./classic/namespaceAssets/index.js";
import { _getNamespaceAssetsOperations } from "./classic/namespaceAssets/index.js";
import type { NamespaceDevicesOperations } from "./classic/namespaceDevices/index.js";
import { _getNamespaceDevicesOperations } from "./classic/namespaceDevices/index.js";
import type { NamespaceDiscoveredAssetsOperations } from "./classic/namespaceDiscoveredAssets/index.js";
import { _getNamespaceDiscoveredAssetsOperations } from "./classic/namespaceDiscoveredAssets/index.js";
import type { NamespaceDiscoveredDevicesOperations } from "./classic/namespaceDiscoveredDevices/index.js";
import { _getNamespaceDiscoveredDevicesOperations } from "./classic/namespaceDiscoveredDevices/index.js";
import type { NamespacesOperations } from "./classic/namespaces/index.js";
import { _getNamespacesOperations } from "./classic/namespaces/index.js";
import type { OperationStatusOperations } from "./classic/operationStatus/index.js";
import { _getOperationStatusOperations } from "./classic/operationStatus/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SchemaRegistriesOperations } from "./classic/schemaRegistries/index.js";
import { _getSchemaRegistriesOperations } from "./classic/schemaRegistries/index.js";
import type { SchemaVersionsOperations } from "./classic/schemaVersions/index.js";
import { _getSchemaVersionsOperations } from "./classic/schemaVersions/index.js";
import type { SchemasOperations } from "./classic/schemas/index.js";
import { _getSchemasOperations } from "./classic/schemas/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { DeviceRegistryManagementClientOptionalParams } from "./api/deviceRegistryManagementContext.js";

export class DeviceRegistryManagementClient {
  private _client: DeviceRegistryManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.DeviceRegistry Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DeviceRegistryManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDeviceRegistryManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.schemaVersions = _getSchemaVersionsOperations(this._client);
    this.schemas = _getSchemasOperations(this._client);
    this.schemaRegistries = _getSchemaRegistriesOperations(this._client);
    this.namespaceDiscoveredDevices = _getNamespaceDiscoveredDevicesOperations(this._client);
    this.namespaceDiscoveredAssets = _getNamespaceDiscoveredAssetsOperations(this._client);
    this.namespaceDevices = _getNamespaceDevicesOperations(this._client);
    this.namespaceAssets = _getNamespaceAssetsOperations(this._client);
    this.namespaces = _getNamespacesOperations(this._client);
    this.billingContainers = _getBillingContainersOperations(this._client);
    this.assetEndpointProfiles = _getAssetEndpointProfilesOperations(this._client);
    this.assets = _getAssetsOperations(this._client);
    this.operationStatus = _getOperationStatusOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for schemaVersions */
  public readonly schemaVersions: SchemaVersionsOperations;
  /** The operation groups for schemas */
  public readonly schemas: SchemasOperations;
  /** The operation groups for schemaRegistries */
  public readonly schemaRegistries: SchemaRegistriesOperations;
  /** The operation groups for namespaceDiscoveredDevices */
  public readonly namespaceDiscoveredDevices: NamespaceDiscoveredDevicesOperations;
  /** The operation groups for namespaceDiscoveredAssets */
  public readonly namespaceDiscoveredAssets: NamespaceDiscoveredAssetsOperations;
  /** The operation groups for namespaceDevices */
  public readonly namespaceDevices: NamespaceDevicesOperations;
  /** The operation groups for namespaceAssets */
  public readonly namespaceAssets: NamespaceAssetsOperations;
  /** The operation groups for namespaces */
  public readonly namespaces: NamespacesOperations;
  /** The operation groups for billingContainers */
  public readonly billingContainers: BillingContainersOperations;
  /** The operation groups for assetEndpointProfiles */
  public readonly assetEndpointProfiles: AssetEndpointProfilesOperations;
  /** The operation groups for assets */
  public readonly assets: AssetsOperations;
  /** The operation groups for operationStatus */
  public readonly operationStatus: OperationStatusOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
