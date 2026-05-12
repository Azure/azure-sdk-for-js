// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureStackHCIVMManagementContext,
  AzureStackHCIVMManagementClientOptionalParams,
} from "./api/index.js";
import { createAzureStackHCIVMManagement } from "./api/index.js";
import type { AttestationStatusesOperations } from "./classic/attestationStatuses/index.js";
import { _getAttestationStatusesOperations } from "./classic/attestationStatuses/index.js";
import type { GalleryImagesOperations } from "./classic/galleryImages/index.js";
import { _getGalleryImagesOperations } from "./classic/galleryImages/index.js";
import type { GuestAgentsOperations } from "./classic/guestAgents/index.js";
import { _getGuestAgentsOperations } from "./classic/guestAgents/index.js";
import type { HybridIdentityMetadataOperations } from "./classic/hybridIdentityMetadata/index.js";
import { _getHybridIdentityMetadataOperations } from "./classic/hybridIdentityMetadata/index.js";
import type { InboundRulesOperations } from "./classic/inboundRules/index.js";
import { _getInboundRulesOperations } from "./classic/inboundRules/index.js";
import type { LoadBalancersOperations } from "./classic/loadBalancers/index.js";
import { _getLoadBalancersOperations } from "./classic/loadBalancers/index.js";
import type { LogicalNetworksOperations } from "./classic/logicalNetworks/index.js";
import { _getLogicalNetworksOperations } from "./classic/logicalNetworks/index.js";
import type { MarketplaceGalleryImagesOperations } from "./classic/marketplaceGalleryImages/index.js";
import { _getMarketplaceGalleryImagesOperations } from "./classic/marketplaceGalleryImages/index.js";
import type { NatGatewaysOperations } from "./classic/natGateways/index.js";
import { _getNatGatewaysOperations } from "./classic/natGateways/index.js";
import type { NetworkInterfacesOperations } from "./classic/networkInterfaces/index.js";
import { _getNetworkInterfacesOperations } from "./classic/networkInterfaces/index.js";
import type { NetworkSecurityGroupsOperations } from "./classic/networkSecurityGroups/index.js";
import { _getNetworkSecurityGroupsOperations } from "./classic/networkSecurityGroups/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PublicIPAddressesOperations } from "./classic/publicIPAddresses/index.js";
import { _getPublicIPAddressesOperations } from "./classic/publicIPAddresses/index.js";
import type { SecurityRulesOperations } from "./classic/securityRules/index.js";
import { _getSecurityRulesOperations } from "./classic/securityRules/index.js";
import type { SnapshotsOperations } from "./classic/snapshots/index.js";
import { _getSnapshotsOperations } from "./classic/snapshots/index.js";
import type { StorageContainersOperations } from "./classic/storageContainers/index.js";
import { _getStorageContainersOperations } from "./classic/storageContainers/index.js";
import type { VirtualHardDisksOperations } from "./classic/virtualHardDisks/index.js";
import { _getVirtualHardDisksOperations } from "./classic/virtualHardDisks/index.js";
import type { VirtualMachineInstancesOperations } from "./classic/virtualMachineInstances/index.js";
import { _getVirtualMachineInstancesOperations } from "./classic/virtualMachineInstances/index.js";
import type { VirtualNetworkSubnetsOperations } from "./classic/virtualNetworkSubnets/index.js";
import { _getVirtualNetworkSubnetsOperations } from "./classic/virtualNetworkSubnets/index.js";
import type { VirtualNetworksOperations } from "./classic/virtualNetworks/index.js";
import { _getVirtualNetworksOperations } from "./classic/virtualNetworks/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureStackHCIVMManagementClientOptionalParams } from "./api/azureStackHcivmManagementContext.js";

export class AzureStackHCIVMManagementClient {
  private _client: AzureStackHCIVMManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureStackHCIVMManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureStackHCIVMManagementClientOptionalParams,
  );
  /** Azure Stack HCI management service */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureStackHCIVMManagementClientOptionalParams,
    options?: AzureStackHCIVMManagementClientOptionalParams,
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
    this._client = createAzureStackHCIVMManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = _getOperationsOperations(this._client);
    this.loadBalancers = _getLoadBalancersOperations(this._client);
    this.inboundRules = _getInboundRulesOperations(this._client);
    this.natGateways = _getNatGatewaysOperations(this._client);
    this.publicIPAddresses = _getPublicIPAddressesOperations(this._client);
    this.virtualNetworkSubnets = _getVirtualNetworkSubnetsOperations(this._client);
    this.virtualNetworks = _getVirtualNetworksOperations(this._client);
    this.guestAgents = _getGuestAgentsOperations(this._client);
    this.attestationStatuses = _getAttestationStatusesOperations(this._client);
    this.hybridIdentityMetadata = _getHybridIdentityMetadataOperations(this._client);
    this.virtualMachineInstances = _getVirtualMachineInstancesOperations(this._client);
    this.virtualHardDisks = _getVirtualHardDisksOperations(this._client);
    this.storageContainers = _getStorageContainersOperations(this._client);
    this.snapshots = _getSnapshotsOperations(this._client);
    this.securityRules = _getSecurityRulesOperations(this._client);
    this.networkSecurityGroups = _getNetworkSecurityGroupsOperations(this._client);
    this.networkInterfaces = _getNetworkInterfacesOperations(this._client);
    this.marketplaceGalleryImages = _getMarketplaceGalleryImagesOperations(this._client);
    this.logicalNetworks = _getLogicalNetworksOperations(this._client);
    this.galleryImages = _getGalleryImagesOperations(this._client);
  }

  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for loadBalancers */
  public readonly loadBalancers: LoadBalancersOperations;
  /** The operation groups for inboundRules */
  public readonly inboundRules: InboundRulesOperations;
  /** The operation groups for natGateways */
  public readonly natGateways: NatGatewaysOperations;
  /** The operation groups for publicIPAddresses */
  public readonly publicIPAddresses: PublicIPAddressesOperations;
  /** The operation groups for virtualNetworkSubnets */
  public readonly virtualNetworkSubnets: VirtualNetworkSubnetsOperations;
  /** The operation groups for virtualNetworks */
  public readonly virtualNetworks: VirtualNetworksOperations;
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
  /** The operation groups for snapshots */
  public readonly snapshots: SnapshotsOperations;
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
