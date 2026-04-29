// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ComputeManagementContext,
  ComputeManagementClientOptionalParams,
} from "./api/index.js";
import { createComputeManagement } from "./api/index.js";
import type { AvailabilitySetsOperations } from "./classic/availabilitySets/index.js";
import { _getAvailabilitySetsOperations } from "./classic/availabilitySets/index.js";
import type { CapacityReservationGroupsOperations } from "./classic/capacityReservationGroups/index.js";
import { _getCapacityReservationGroupsOperations } from "./classic/capacityReservationGroups/index.js";
import type { CapacityReservationsOperations } from "./classic/capacityReservations/index.js";
import { _getCapacityReservationsOperations } from "./classic/capacityReservations/index.js";
import type { CommunityGalleriesOperations } from "./classic/communityGalleries/index.js";
import { _getCommunityGalleriesOperations } from "./classic/communityGalleries/index.js";
import type { CommunityGalleryImageVersionsOperations } from "./classic/communityGalleryImageVersions/index.js";
import { _getCommunityGalleryImageVersionsOperations } from "./classic/communityGalleryImageVersions/index.js";
import type { CommunityGalleryImagesOperations } from "./classic/communityGalleryImages/index.js";
import { _getCommunityGalleryImagesOperations } from "./classic/communityGalleryImages/index.js";
import type { DedicatedHostGroupsOperations } from "./classic/dedicatedHostGroups/index.js";
import { _getDedicatedHostGroupsOperations } from "./classic/dedicatedHostGroups/index.js";
import type { DedicatedHostsOperations } from "./classic/dedicatedHosts/index.js";
import { _getDedicatedHostsOperations } from "./classic/dedicatedHosts/index.js";
import type { DiskAccessesOperations } from "./classic/diskAccesses/index.js";
import { _getDiskAccessesOperations } from "./classic/diskAccesses/index.js";
import type { DiskEncryptionSetsOperations } from "./classic/diskEncryptionSets/index.js";
import { _getDiskEncryptionSetsOperations } from "./classic/diskEncryptionSets/index.js";
import type { DiskRestorePointOperations } from "./classic/diskRestorePoint/index.js";
import { _getDiskRestorePointOperations } from "./classic/diskRestorePoint/index.js";
import type { DisksOperations } from "./classic/disks/index.js";
import { _getDisksOperations } from "./classic/disks/index.js";
import type { GalleriesOperations } from "./classic/galleries/index.js";
import { _getGalleriesOperations } from "./classic/galleries/index.js";
import type { GalleryApplicationVersionsOperations } from "./classic/galleryApplicationVersions/index.js";
import { _getGalleryApplicationVersionsOperations } from "./classic/galleryApplicationVersions/index.js";
import type { GalleryApplicationsOperations } from "./classic/galleryApplications/index.js";
import { _getGalleryApplicationsOperations } from "./classic/galleryApplications/index.js";
import type { GalleryImageVersionsOperations } from "./classic/galleryImageVersions/index.js";
import { _getGalleryImageVersionsOperations } from "./classic/galleryImageVersions/index.js";
import type { GalleryImagesOperations } from "./classic/galleryImages/index.js";
import { _getGalleryImagesOperations } from "./classic/galleryImages/index.js";
import type { GalleryInVMAccessControlProfileVersionsOperations } from "./classic/galleryInVMAccessControlProfileVersions/index.js";
import { _getGalleryInVMAccessControlProfileVersionsOperations } from "./classic/galleryInVMAccessControlProfileVersions/index.js";
import type { GalleryInVMAccessControlProfilesOperations } from "./classic/galleryInVMAccessControlProfiles/index.js";
import { _getGalleryInVMAccessControlProfilesOperations } from "./classic/galleryInVMAccessControlProfiles/index.js";
import type { GalleryScriptVersionsOperations } from "./classic/galleryScriptVersions/index.js";
import { _getGalleryScriptVersionsOperations } from "./classic/galleryScriptVersions/index.js";
import type { GalleryScriptsOperations } from "./classic/galleryScripts/index.js";
import { _getGalleryScriptsOperations } from "./classic/galleryScripts/index.js";
import type { GallerySharingProfileOperations } from "./classic/gallerySharingProfile/index.js";
import { _getGallerySharingProfileOperations } from "./classic/gallerySharingProfile/index.js";
import type { ImagesOperations } from "./classic/images/index.js";
import { _getImagesOperations } from "./classic/images/index.js";
import type { LogAnalyticsOperations } from "./classic/logAnalytics/index.js";
import { _getLogAnalyticsOperations } from "./classic/logAnalytics/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProximityPlacementGroupsOperations } from "./classic/proximityPlacementGroups/index.js";
import { _getProximityPlacementGroupsOperations } from "./classic/proximityPlacementGroups/index.js";
import type { ResourceSkusOperations } from "./classic/resourceSkus/index.js";
import { _getResourceSkusOperations } from "./classic/resourceSkus/index.js";
import type { RestorePointCollectionsOperations } from "./classic/restorePointCollections/index.js";
import { _getRestorePointCollectionsOperations } from "./classic/restorePointCollections/index.js";
import type { RestorePointsOperations } from "./classic/restorePoints/index.js";
import { _getRestorePointsOperations } from "./classic/restorePoints/index.js";
import type { SharedGalleriesOperations } from "./classic/sharedGalleries/index.js";
import { _getSharedGalleriesOperations } from "./classic/sharedGalleries/index.js";
import type { SharedGalleryImageVersionsOperations } from "./classic/sharedGalleryImageVersions/index.js";
import { _getSharedGalleryImageVersionsOperations } from "./classic/sharedGalleryImageVersions/index.js";
import type { SharedGalleryImagesOperations } from "./classic/sharedGalleryImages/index.js";
import { _getSharedGalleryImagesOperations } from "./classic/sharedGalleryImages/index.js";
import type { SnapshotsOperations } from "./classic/snapshots/index.js";
import { _getSnapshotsOperations } from "./classic/snapshots/index.js";
import type { SoftDeletedResourceOperations } from "./classic/softDeletedResource/index.js";
import { _getSoftDeletedResourceOperations } from "./classic/softDeletedResource/index.js";
import type { SshPublicKeysOperations } from "./classic/sshPublicKeys/index.js";
import { _getSshPublicKeysOperations } from "./classic/sshPublicKeys/index.js";
import type { UsageOperations } from "./classic/usage/index.js";
import { _getUsageOperations } from "./classic/usage/index.js";
import type { VirtualMachineExtensionImagesOperations } from "./classic/virtualMachineExtensionImages/index.js";
import { _getVirtualMachineExtensionImagesOperations } from "./classic/virtualMachineExtensionImages/index.js";
import type { VirtualMachineExtensionsOperations } from "./classic/virtualMachineExtensions/index.js";
import { _getVirtualMachineExtensionsOperations } from "./classic/virtualMachineExtensions/index.js";
import type { VirtualMachineImagesOperations } from "./classic/virtualMachineImages/index.js";
import { _getVirtualMachineImagesOperations } from "./classic/virtualMachineImages/index.js";
import type { VirtualMachineImagesEdgeZoneOperations } from "./classic/virtualMachineImagesEdgeZone/index.js";
import { _getVirtualMachineImagesEdgeZoneOperations } from "./classic/virtualMachineImagesEdgeZone/index.js";
import type { VirtualMachineRunCommandsOperations } from "./classic/virtualMachineRunCommands/index.js";
import { _getVirtualMachineRunCommandsOperations } from "./classic/virtualMachineRunCommands/index.js";
import type { VirtualMachineScaleSetExtensionsOperations } from "./classic/virtualMachineScaleSetExtensions/index.js";
import { _getVirtualMachineScaleSetExtensionsOperations } from "./classic/virtualMachineScaleSetExtensions/index.js";
import type { VirtualMachineScaleSetLifeCycleHookEventsOperations } from "./classic/virtualMachineScaleSetLifeCycleHookEvents/index.js";
import { _getVirtualMachineScaleSetLifeCycleHookEventsOperations } from "./classic/virtualMachineScaleSetLifeCycleHookEvents/index.js";
import type { VirtualMachineScaleSetRollingUpgradesOperations } from "./classic/virtualMachineScaleSetRollingUpgrades/index.js";
import { _getVirtualMachineScaleSetRollingUpgradesOperations } from "./classic/virtualMachineScaleSetRollingUpgrades/index.js";
import type { VirtualMachineScaleSetVMExtensionsOperations } from "./classic/virtualMachineScaleSetVMExtensions/index.js";
import { _getVirtualMachineScaleSetVMExtensionsOperations } from "./classic/virtualMachineScaleSetVMExtensions/index.js";
import type { VirtualMachineScaleSetVMRunCommandsOperations } from "./classic/virtualMachineScaleSetVMRunCommands/index.js";
import { _getVirtualMachineScaleSetVMRunCommandsOperations } from "./classic/virtualMachineScaleSetVMRunCommands/index.js";
import type { VirtualMachineScaleSetVMsOperations } from "./classic/virtualMachineScaleSetVMs/index.js";
import { _getVirtualMachineScaleSetVMsOperations } from "./classic/virtualMachineScaleSetVMs/index.js";
import type { VirtualMachineScaleSetsOperations } from "./classic/virtualMachineScaleSets/index.js";
import { _getVirtualMachineScaleSetsOperations } from "./classic/virtualMachineScaleSets/index.js";
import type { VirtualMachineSizesOperations } from "./classic/virtualMachineSizes/index.js";
import { _getVirtualMachineSizesOperations } from "./classic/virtualMachineSizes/index.js";
import type { VirtualMachinesOperations } from "./classic/virtualMachines/index.js";
import { _getVirtualMachinesOperations } from "./classic/virtualMachines/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
