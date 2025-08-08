// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createAzureStackHCI,
  AzureStackHCIContext,
  AzureStackHCIClientOptionalParams,
} from "./api/index.js";
import {
  AttestationStatusesOperations,
  _getAttestationStatusesOperations,
} from "./classic/attestationStatuses/index.js";
import {
  GalleryImagesOperations,
  _getGalleryImagesOperations,
} from "./classic/galleryImages/index.js";
import { GuestAgentsOperations, _getGuestAgentsOperations } from "./classic/guestAgents/index.js";
import {
  HybridIdentityMetadataOperations,
  _getHybridIdentityMetadataOperations,
} from "./classic/hybridIdentityMetadata/index.js";
import {
  LogicalNetworksOperations,
  _getLogicalNetworksOperations,
} from "./classic/logicalNetworks/index.js";
import {
  MarketplaceGalleryImagesOperations,
  _getMarketplaceGalleryImagesOperations,
} from "./classic/marketplaceGalleryImages/index.js";
import {
  NetworkInterfacesOperations,
  _getNetworkInterfacesOperations,
} from "./classic/networkInterfaces/index.js";
import {
  NetworkSecurityGroupsOperations,
  _getNetworkSecurityGroupsOperations,
} from "./classic/networkSecurityGroups/index.js";
import {
  SecurityRulesOperations,
  _getSecurityRulesOperations,
} from "./classic/securityRules/index.js";
import {
  StorageContainersOperations,
  _getStorageContainersOperations,
} from "./classic/storageContainers/index.js";
import {
  VirtualHardDisksOperations,
  _getVirtualHardDisksOperations,
} from "./classic/virtualHardDisks/index.js";
import {
  VirtualMachineInstancesOperations,
  _getVirtualMachineInstancesOperations,
} from "./classic/virtualMachineInstances/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { AzureStackHCIClientOptionalParams } from "./api/azureStackHCIContext.js";

export class AzureStackHCIClient {
  private _client: AzureStackHCIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Stack HCI management service */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureStackHCIClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureStackHCI(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.guestAgents = _getGuestAgentsOperations(this._client);
    this.attestationStatuses = _getAttestationStatusesOperations(this._client);
    this.hybridIdentityMetadata = _getHybridIdentityMetadataOperations(this._client);
    this.virtualMachineInstances = _getVirtualMachineInstancesOperations(this._client);
    this.virtualHardDisks = _getVirtualHardDisksOperations(this._client);
    this.storageContainers = _getStorageContainersOperations(this._client);
    this.securityRules = _getSecurityRulesOperations(this._client);
    this.networkSecurityGroups = _getNetworkSecurityGroupsOperations(this._client);
    this.networkInterfaces = _getNetworkInterfacesOperations(this._client);
    this.marketplaceGalleryImages = _getMarketplaceGalleryImagesOperations(this._client);
    this.logicalNetworks = _getLogicalNetworksOperations(this._client);
    this.galleryImages = _getGalleryImagesOperations(this._client);
  }

  /** The operation groups for guestAgents */
  public readonly guestAgents: GuestAgentsOperations;
  /** The operation groups for attestationStatuses */
  public readonly attestationStatuses: AttestationStatusesOperations;
  /** The operation groups for hybridIdentityMetadata */
  public readonly hybridIdentityMetadata: HybridIdentityMetadataOperations;
  /** The operation groups for virtualMachineInstances */
  public readonly virtualMachineInstances: VirtualMachineInstancesOperations;
  /** The operation groups for virtualHardDisks */
  public readonly virtualHardDisks: VirtualHardDisksOperations;
  /** The operation groups for storageContainers */
  public readonly storageContainers: StorageContainersOperations;
  /** The operation groups for securityRules */
  public readonly securityRules: SecurityRulesOperations;
  /** The operation groups for networkSecurityGroups */
  public readonly networkSecurityGroups: NetworkSecurityGroupsOperations;
  /** The operation groups for networkInterfaces */
  public readonly networkInterfaces: NetworkInterfacesOperations;
  /** The operation groups for marketplaceGalleryImages */
  public readonly marketplaceGalleryImages: MarketplaceGalleryImagesOperations;
  /** The operation groups for logicalNetworks */
  public readonly logicalNetworks: LogicalNetworksOperations;
  /** The operation groups for galleryImages */
  public readonly galleryImages: GalleryImagesOperations;
}
