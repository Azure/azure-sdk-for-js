// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ComputeManagementContext,
  ComputeManagementClientOptionalParams,
  createComputeManagement,
} from "./api/index.js";
import {
  AvailabilitySetsOperations,
  _getAvailabilitySetsOperations,
} from "./classic/availabilitySets/index.js";
import {
  CapacityReservationGroupsOperations,
  _getCapacityReservationGroupsOperations,
} from "./classic/capacityReservationGroups/index.js";
import {
  CapacityReservationsOperations,
  _getCapacityReservationsOperations,
} from "./classic/capacityReservations/index.js";
import {
  CommunityGalleriesOperations,
  _getCommunityGalleriesOperations,
} from "./classic/communityGalleries/index.js";
import {
  CommunityGalleryImageVersionsOperations,
  _getCommunityGalleryImageVersionsOperations,
} from "./classic/communityGalleryImageVersions/index.js";
import {
  CommunityGalleryImagesOperations,
  _getCommunityGalleryImagesOperations,
} from "./classic/communityGalleryImages/index.js";
import {
  DedicatedHostGroupsOperations,
  _getDedicatedHostGroupsOperations,
} from "./classic/dedicatedHostGroups/index.js";
import {
  DedicatedHostsOperations,
  _getDedicatedHostsOperations,
} from "./classic/dedicatedHosts/index.js";
import {
  DiskAccessesOperations,
  _getDiskAccessesOperations,
} from "./classic/diskAccesses/index.js";
import {
  DiskEncryptionSetsOperations,
  _getDiskEncryptionSetsOperations,
} from "./classic/diskEncryptionSets/index.js";
import {
  DiskRestorePointOperations,
  _getDiskRestorePointOperations,
} from "./classic/diskRestorePoint/index.js";
import { DisksOperations, _getDisksOperations } from "./classic/disks/index.js";
import { GalleriesOperations, _getGalleriesOperations } from "./classic/galleries/index.js";
import {
  GalleryApplicationVersionsOperations,
  _getGalleryApplicationVersionsOperations,
} from "./classic/galleryApplicationVersions/index.js";
import {
  GalleryApplicationsOperations,
  _getGalleryApplicationsOperations,
} from "./classic/galleryApplications/index.js";
import {
  GalleryImageVersionsOperations,
  _getGalleryImageVersionsOperations,
} from "./classic/galleryImageVersions/index.js";
import {
  GalleryImagesOperations,
  _getGalleryImagesOperations,
} from "./classic/galleryImages/index.js";
import {
  GalleryInVMAccessControlProfileVersionsOperations,
  _getGalleryInVMAccessControlProfileVersionsOperations,
} from "./classic/galleryInVMAccessControlProfileVersions/index.js";
import {
  GalleryInVMAccessControlProfilesOperations,
  _getGalleryInVMAccessControlProfilesOperations,
} from "./classic/galleryInVMAccessControlProfiles/index.js";
import {
  GalleryScriptVersionsOperations,
  _getGalleryScriptVersionsOperations,
} from "./classic/galleryScriptVersions/index.js";
import {
  GalleryScriptsOperations,
  _getGalleryScriptsOperations,
} from "./classic/galleryScripts/index.js";
import {
  GallerySharingProfileOperations,
  _getGallerySharingProfileOperations,
} from "./classic/gallerySharingProfile/index.js";
import { ImagesOperations, _getImagesOperations } from "./classic/images/index.js";
import {
  InterconnectBlocksOperations,
  _getInterconnectBlocksOperations,
} from "./classic/interconnectBlocks/index.js";
import {
  LogAnalyticsOperations,
  _getLogAnalyticsOperations,
} from "./classic/logAnalytics/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  ProximityPlacementGroupsOperations,
  _getProximityPlacementGroupsOperations,
} from "./classic/proximityPlacementGroups/index.js";
import {
  ResourceSkusOperations,
  _getResourceSkusOperations,
} from "./classic/resourceSkus/index.js";
import {
  RestorePointCollectionsOperations,
  _getRestorePointCollectionsOperations,
} from "./classic/restorePointCollections/index.js";
import {
  RestorePointsOperations,
  _getRestorePointsOperations,
} from "./classic/restorePoints/index.js";
import {
  SharedGalleriesOperations,
  _getSharedGalleriesOperations,
} from "./classic/sharedGalleries/index.js";
import {
  SharedGalleryImageVersionsOperations,
  _getSharedGalleryImageVersionsOperations,
} from "./classic/sharedGalleryImageVersions/index.js";
import {
  SharedGalleryImagesOperations,
  _getSharedGalleryImagesOperations,
} from "./classic/sharedGalleryImages/index.js";
import {
  SharedGalleryInvitesOperations,
  _getSharedGalleryInvitesOperations,
} from "./classic/sharedGalleryInvites/index.js";
import { SnapshotsOperations, _getSnapshotsOperations } from "./classic/snapshots/index.js";
import {
  SoftDeletedResourceOperations,
  _getSoftDeletedResourceOperations,
} from "./classic/softDeletedResource/index.js";
import {
  SshPublicKeysOperations,
  _getSshPublicKeysOperations,
} from "./classic/sshPublicKeys/index.js";
import {
  TenantLevelSharedGalleryInvitesOperations,
  _getTenantLevelSharedGalleryInvitesOperations,
} from "./classic/tenantLevelSharedGalleryInvites/index.js";
import { UsageOperations, _getUsageOperations } from "./classic/usage/index.js";
import {
  VirtualMachineExtensionImagesOperations,
  _getVirtualMachineExtensionImagesOperations,
} from "./classic/virtualMachineExtensionImages/index.js";
import {
  VirtualMachineExtensionsOperations,
  _getVirtualMachineExtensionsOperations,
} from "./classic/virtualMachineExtensions/index.js";
import {
  VirtualMachineImagesOperations,
  _getVirtualMachineImagesOperations,
} from "./classic/virtualMachineImages/index.js";
import {
  VirtualMachineImagesEdgeZoneOperations,
  _getVirtualMachineImagesEdgeZoneOperations,
} from "./classic/virtualMachineImagesEdgeZone/index.js";
import {
  VirtualMachineRunCommandsOperations,
  _getVirtualMachineRunCommandsOperations,
} from "./classic/virtualMachineRunCommands/index.js";
import {
  VirtualMachineScaleSetExtensionsOperations,
  _getVirtualMachineScaleSetExtensionsOperations,
} from "./classic/virtualMachineScaleSetExtensions/index.js";
import {
  VirtualMachineScaleSetLifeCycleHookEventsOperations,
  _getVirtualMachineScaleSetLifeCycleHookEventsOperations,
} from "./classic/virtualMachineScaleSetLifeCycleHookEvents/index.js";
import {
  VirtualMachineScaleSetRollingUpgradesOperations,
  _getVirtualMachineScaleSetRollingUpgradesOperations,
} from "./classic/virtualMachineScaleSetRollingUpgrades/index.js";
import {
  VirtualMachineScaleSetVMExtensionsOperations,
  _getVirtualMachineScaleSetVMExtensionsOperations,
} from "./classic/virtualMachineScaleSetVMExtensions/index.js";
import {
  VirtualMachineScaleSetVMRunCommandsOperations,
  _getVirtualMachineScaleSetVMRunCommandsOperations,
} from "./classic/virtualMachineScaleSetVMRunCommands/index.js";
import {
  VirtualMachineScaleSetVMsOperations,
  _getVirtualMachineScaleSetVMsOperations,
} from "./classic/virtualMachineScaleSetVMs/index.js";
import {
  VirtualMachineScaleSetsOperations,
  _getVirtualMachineScaleSetsOperations,
} from "./classic/virtualMachineScaleSets/index.js";
import {
  VirtualMachineSizesOperations,
  _getVirtualMachineSizesOperations,
} from "./classic/virtualMachineSizes/index.js";
import {
  VirtualMachinesOperations,
  _getVirtualMachinesOperations,
} from "./classic/virtualMachines/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ComputeManagementClientOptionalParams } from "./api/computeManagementContext.js";

export class ComputeManagementClient {
  private _client: ComputeManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ComputeManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ComputeManagementClientOptionalParams,
  );
  /** Compute Client */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ComputeManagementClientOptionalParams,
    options?: ComputeManagementClientOptionalParams,
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
    this._client = createComputeManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.gallerySharingProfile = _getGallerySharingProfileOperations(this._client);
    this.softDeletedResource = _getSoftDeletedResourceOperations(this._client);
    this.diskRestorePoint = _getDiskRestorePointOperations(this._client);
    this.logAnalytics = _getLogAnalyticsOperations(this._client);
    this.virtualMachineImages = _getVirtualMachineImagesOperations(this._client);
    this.virtualMachineImagesEdgeZone = _getVirtualMachineImagesEdgeZoneOperations(this._client);
    this.virtualMachineSizes = _getVirtualMachineSizesOperations(this._client);
    this.usage = _getUsageOperations(this._client);
    this.sshPublicKeys = _getSshPublicKeysOperations(this._client);
    this.virtualMachineScaleSetVMs = _getVirtualMachineScaleSetVMsOperations(this._client);
    this.virtualMachineScaleSetRollingUpgrades =
      _getVirtualMachineScaleSetRollingUpgradesOperations(this._client);
    this.resourceSkus = _getResourceSkusOperations(this._client);
    this.tenantLevelSharedGalleryInvites = _getTenantLevelSharedGalleryInvitesOperations(
      this._client,
    );
    this.sharedGalleryInvites = _getSharedGalleryInvitesOperations(this._client);
    this.communityGalleryImageVersions = _getCommunityGalleryImageVersionsOperations(this._client);
    this.communityGalleryImages = _getCommunityGalleryImagesOperations(this._client);
    this.communityGalleries = _getCommunityGalleriesOperations(this._client);
    this.sharedGalleryImageVersions = _getSharedGalleryImageVersionsOperations(this._client);
    this.sharedGalleryImages = _getSharedGalleryImagesOperations(this._client);
    this.sharedGalleries = _getSharedGalleriesOperations(this._client);
    this.galleryInVMAccessControlProfileVersions =
      _getGalleryInVMAccessControlProfileVersionsOperations(this._client);
    this.galleryInVMAccessControlProfiles = _getGalleryInVMAccessControlProfilesOperations(
      this._client,
    );
    this.galleryScriptVersions = _getGalleryScriptVersionsOperations(this._client);
    this.galleryScripts = _getGalleryScriptsOperations(this._client);
    this.galleryApplicationVersions = _getGalleryApplicationVersionsOperations(this._client);
    this.galleryApplications = _getGalleryApplicationsOperations(this._client);
    this.galleryImageVersions = _getGalleryImageVersionsOperations(this._client);
    this.galleryImages = _getGalleryImagesOperations(this._client);
    this.galleries = _getGalleriesOperations(this._client);
    this.snapshots = _getSnapshotsOperations(this._client);
    this.diskEncryptionSets = _getDiskEncryptionSetsOperations(this._client);
    this.diskAccesses = _getDiskAccessesOperations(this._client);
    this.disks = _getDisksOperations(this._client);
    this.virtualMachineScaleSetVMRunCommands = _getVirtualMachineScaleSetVMRunCommandsOperations(
      this._client,
    );
    this.virtualMachineRunCommands = _getVirtualMachineRunCommandsOperations(this._client);
    this.interconnectBlocks = _getInterconnectBlocksOperations(this._client);
    this.capacityReservations = _getCapacityReservationsOperations(this._client);
    this.capacityReservationGroups = _getCapacityReservationGroupsOperations(this._client);
    this.restorePoints = _getRestorePointsOperations(this._client);
    this.restorePointCollections = _getRestorePointCollectionsOperations(this._client);
    this.images = _getImagesOperations(this._client);
    this.dedicatedHosts = _getDedicatedHostsOperations(this._client);
    this.dedicatedHostGroups = _getDedicatedHostGroupsOperations(this._client);
    this.proximityPlacementGroups = _getProximityPlacementGroupsOperations(this._client);
    this.availabilitySets = _getAvailabilitySetsOperations(this._client);
    this.virtualMachineExtensionImages = _getVirtualMachineExtensionImagesOperations(this._client);
    this.virtualMachineExtensions = _getVirtualMachineExtensionsOperations(this._client);
    this.virtualMachines = _getVirtualMachinesOperations(this._client);
    this.virtualMachineScaleSetVMExtensions = _getVirtualMachineScaleSetVMExtensionsOperations(
      this._client,
    );
    this.virtualMachineScaleSetLifeCycleHookEvents =
      _getVirtualMachineScaleSetLifeCycleHookEventsOperations(this._client);
    this.virtualMachineScaleSetExtensions = _getVirtualMachineScaleSetExtensionsOperations(
      this._client,
    );
    this.virtualMachineScaleSets = _getVirtualMachineScaleSetsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for gallerySharingProfile */
  public readonly gallerySharingProfile: GallerySharingProfileOperations;
  /** The operation groups for softDeletedResource */
  public readonly softDeletedResource: SoftDeletedResourceOperations;
  /** The operation groups for diskRestorePoint */
  public readonly diskRestorePoint: DiskRestorePointOperations;
  /** The operation groups for logAnalytics */
  public readonly logAnalytics: LogAnalyticsOperations;
  /** The operation groups for virtualMachineImages */
  public readonly virtualMachineImages: VirtualMachineImagesOperations;
  /** The operation groups for virtualMachineImagesEdgeZone */
  public readonly virtualMachineImagesEdgeZone: VirtualMachineImagesEdgeZoneOperations;
  /** The operation groups for virtualMachineSizes */
  public readonly virtualMachineSizes: VirtualMachineSizesOperations;
  /** The operation groups for usage */
  public readonly usage: UsageOperations;
  /** The operation groups for sshPublicKeys */
  public readonly sshPublicKeys: SshPublicKeysOperations;
  /** The operation groups for virtualMachineScaleSetVMs */
  public readonly virtualMachineScaleSetVMs: VirtualMachineScaleSetVMsOperations;
  /** The operation groups for virtualMachineScaleSetRollingUpgrades */
  public readonly virtualMachineScaleSetRollingUpgrades: VirtualMachineScaleSetRollingUpgradesOperations;
  /** The operation groups for resourceSkus */
  public readonly resourceSkus: ResourceSkusOperations;
  /** The operation groups for tenantLevelSharedGalleryInvites */
  public readonly tenantLevelSharedGalleryInvites: TenantLevelSharedGalleryInvitesOperations;
  /** The operation groups for sharedGalleryInvites */
  public readonly sharedGalleryInvites: SharedGalleryInvitesOperations;
  /** The operation groups for communityGalleryImageVersions */
  public readonly communityGalleryImageVersions: CommunityGalleryImageVersionsOperations;
  /** The operation groups for communityGalleryImages */
  public readonly communityGalleryImages: CommunityGalleryImagesOperations;
  /** The operation groups for communityGalleries */
  public readonly communityGalleries: CommunityGalleriesOperations;
  /** The operation groups for sharedGalleryImageVersions */
  public readonly sharedGalleryImageVersions: SharedGalleryImageVersionsOperations;
  /** The operation groups for sharedGalleryImages */
  public readonly sharedGalleryImages: SharedGalleryImagesOperations;
  /** The operation groups for sharedGalleries */
  public readonly sharedGalleries: SharedGalleriesOperations;
  /** The operation groups for galleryInVMAccessControlProfileVersions */
  public readonly galleryInVMAccessControlProfileVersions: GalleryInVMAccessControlProfileVersionsOperations;
  /** The operation groups for galleryInVMAccessControlProfiles */
  public readonly galleryInVMAccessControlProfiles: GalleryInVMAccessControlProfilesOperations;
  /** The operation groups for galleryScriptVersions */
  public readonly galleryScriptVersions: GalleryScriptVersionsOperations;
  /** The operation groups for galleryScripts */
  public readonly galleryScripts: GalleryScriptsOperations;
  /** The operation groups for galleryApplicationVersions */
  public readonly galleryApplicationVersions: GalleryApplicationVersionsOperations;
  /** The operation groups for galleryApplications */
  public readonly galleryApplications: GalleryApplicationsOperations;
  /** The operation groups for galleryImageVersions */
  public readonly galleryImageVersions: GalleryImageVersionsOperations;
  /** The operation groups for galleryImages */
  public readonly galleryImages: GalleryImagesOperations;
  /** The operation groups for galleries */
  public readonly galleries: GalleriesOperations;
  /** The operation groups for snapshots */
  public readonly snapshots: SnapshotsOperations;
  /** The operation groups for diskEncryptionSets */
  public readonly diskEncryptionSets: DiskEncryptionSetsOperations;
  /** The operation groups for diskAccesses */
  public readonly diskAccesses: DiskAccessesOperations;
  /** The operation groups for disks */
  public readonly disks: DisksOperations;
  /** The operation groups for virtualMachineScaleSetVMRunCommands */
  public readonly virtualMachineScaleSetVMRunCommands: VirtualMachineScaleSetVMRunCommandsOperations;
  /** The operation groups for virtualMachineRunCommands */
  public readonly virtualMachineRunCommands: VirtualMachineRunCommandsOperations;
  /** The operation groups for interconnectBlocks */
  public readonly interconnectBlocks: InterconnectBlocksOperations;
  /** The operation groups for capacityReservations */
  public readonly capacityReservations: CapacityReservationsOperations;
  /** The operation groups for capacityReservationGroups */
  public readonly capacityReservationGroups: CapacityReservationGroupsOperations;
  /** The operation groups for restorePoints */
  public readonly restorePoints: RestorePointsOperations;
  /** The operation groups for restorePointCollections */
  public readonly restorePointCollections: RestorePointCollectionsOperations;
  /** The operation groups for images */
  public readonly images: ImagesOperations;
  /** The operation groups for dedicatedHosts */
  public readonly dedicatedHosts: DedicatedHostsOperations;
  /** The operation groups for dedicatedHostGroups */
  public readonly dedicatedHostGroups: DedicatedHostGroupsOperations;
  /** The operation groups for proximityPlacementGroups */
  public readonly proximityPlacementGroups: ProximityPlacementGroupsOperations;
  /** The operation groups for availabilitySets */
  public readonly availabilitySets: AvailabilitySetsOperations;
  /** The operation groups for virtualMachineExtensionImages */
  public readonly virtualMachineExtensionImages: VirtualMachineExtensionImagesOperations;
  /** The operation groups for virtualMachineExtensions */
  public readonly virtualMachineExtensions: VirtualMachineExtensionsOperations;
  /** The operation groups for virtualMachines */
  public readonly virtualMachines: VirtualMachinesOperations;
  /** The operation groups for virtualMachineScaleSetVMExtensions */
  public readonly virtualMachineScaleSetVMExtensions: VirtualMachineScaleSetVMExtensionsOperations;
  /** The operation groups for virtualMachineScaleSetLifeCycleHookEvents */
  public readonly virtualMachineScaleSetLifeCycleHookEvents: VirtualMachineScaleSetLifeCycleHookEventsOperations;
  /** The operation groups for virtualMachineScaleSetExtensions */
  public readonly virtualMachineScaleSetExtensions: VirtualMachineScaleSetExtensionsOperations;
  /** The operation groups for virtualMachineScaleSets */
  public readonly virtualMachineScaleSets: VirtualMachineScaleSetsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
