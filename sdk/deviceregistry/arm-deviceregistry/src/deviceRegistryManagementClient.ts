// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceRegistryManagementContext,
  DeviceRegistryManagementClientOptionalParams,
  createDeviceRegistryManagement,
} from "./api/index.js";
import {
  AssetEndpointProfilesOperations,
  _getAssetEndpointProfilesOperations,
} from "./classic/assetEndpointProfiles/index.js";
import { AssetsOperations, _getAssetsOperations } from "./classic/assets/index.js";
import {
  BillingContainersOperations,
  _getBillingContainersOperations,
} from "./classic/billingContainers/index.js";
import {
  NamespaceAssetsOperations,
  _getNamespaceAssetsOperations,
} from "./classic/namespaceAssets/index.js";
import {
  NamespaceDevicesOperations,
  _getNamespaceDevicesOperations,
} from "./classic/namespaceDevices/index.js";
import {
  NamespaceDiscoveredAssetsOperations,
  _getNamespaceDiscoveredAssetsOperations,
} from "./classic/namespaceDiscoveredAssets/index.js";
import {
  NamespaceDiscoveredDevicesOperations,
  _getNamespaceDiscoveredDevicesOperations,
} from "./classic/namespaceDiscoveredDevices/index.js";
import { NamespacesOperations, _getNamespacesOperations } from "./classic/namespaces/index.js";
import {
  OperationStatusOperations,
  _getOperationStatusOperations,
} from "./classic/operationStatus/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  SchemaRegistriesOperations,
  _getSchemaRegistriesOperations,
} from "./classic/schemaRegistries/index.js";
import {
  SchemaVersionsOperations,
  _getSchemaVersionsOperations,
} from "./classic/schemaVersions/index.js";
import { SchemasOperations, _getSchemasOperations } from "./classic/schemas/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DeviceRegistryManagementClientOptionalParams } from "./api/deviceRegistryManagementContext.js";

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
