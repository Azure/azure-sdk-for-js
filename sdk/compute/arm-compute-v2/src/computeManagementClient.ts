import * as coreHttp from "@azure/core-http";
import {
  Operations,
  AvailabilitySets,
  ProximityPlacementGroups,
  DedicatedHostGroups,
  DedicatedHosts,
  SshPublicKeys,
  VirtualMachineExtensionImages,
  VirtualMachineExtensions,
  VirtualMachineImages,
  VirtualMachineImagesEdgeZone,
  Usage,
  VirtualMachines,
  VirtualMachineScaleSets,
  VirtualMachineSizes,
  Images,
  VirtualMachineScaleSetExtensions,
  VirtualMachineScaleSetRollingUpgrades,
  VirtualMachineScaleSetVMExtensions,
  VirtualMachineScaleSetVMs,
  LogAnalytics,
  VirtualMachineRunCommands,
  VirtualMachineScaleSetVMRunCommands,
  ResourceSkus,
  Disks,
  Snapshots,
  DiskEncryptionSets,
  DiskAccesses,
  DiskRestorePoint,
  Galleries,
  GalleryImages,
  GalleryImageVersions,
  GalleryApplications,
  GalleryApplicationVersions
} from "./operations";
import { ComputeManagementClientContext } from "./computeManagementClientContext";
import { ComputeManagementClientOptionalParams } from "./models";

export class ComputeManagementClient extends ComputeManagementClientContext {
  /**
   * Initializes a new instance of the ComputeManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Subscription credentials which uniquely identify Microsoft Azure subscription.
   *                       The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: ComputeManagementClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.operations = new Operations(this);
    this.availabilitySets = new AvailabilitySets(this);
    this.proximityPlacementGroups = new ProximityPlacementGroups(this);
    this.dedicatedHostGroups = new DedicatedHostGroups(this);
    this.dedicatedHosts = new DedicatedHosts(this);
    this.sshPublicKeys = new SshPublicKeys(this);
    this.virtualMachineExtensionImages = new VirtualMachineExtensionImages(
      this
    );
    this.virtualMachineExtensions = new VirtualMachineExtensions(this);
    this.virtualMachineImages = new VirtualMachineImages(this);
    this.virtualMachineImagesEdgeZone = new VirtualMachineImagesEdgeZone(this);
    this.usage = new Usage(this);
    this.virtualMachines = new VirtualMachines(this);
    this.virtualMachineScaleSets = new VirtualMachineScaleSets(this);
    this.virtualMachineSizes = new VirtualMachineSizes(this);
    this.images = new Images(this);
    this.virtualMachineScaleSetExtensions = new VirtualMachineScaleSetExtensions(
      this
    );
    this.virtualMachineScaleSetRollingUpgrades = new VirtualMachineScaleSetRollingUpgrades(
      this
    );
    this.virtualMachineScaleSetVMExtensions = new VirtualMachineScaleSetVMExtensions(
      this
    );
    this.virtualMachineScaleSetVMs = new VirtualMachineScaleSetVMs(this);
    this.logAnalytics = new LogAnalytics(this);
    this.virtualMachineRunCommands = new VirtualMachineRunCommands(this);
    this.virtualMachineScaleSetVMRunCommands = new VirtualMachineScaleSetVMRunCommands(
      this
    );
    this.resourceSkus = new ResourceSkus(this);
    this.disks = new Disks(this);
    this.snapshots = new Snapshots(this);
    this.diskEncryptionSets = new DiskEncryptionSets(this);
    this.diskAccesses = new DiskAccesses(this);
    this.diskRestorePoint = new DiskRestorePoint(this);
    this.galleries = new Galleries(this);
    this.galleryImages = new GalleryImages(this);
    this.galleryImageVersions = new GalleryImageVersions(this);
    this.galleryApplications = new GalleryApplications(this);
    this.galleryApplicationVersions = new GalleryApplicationVersions(this);
  }

  operations: Operations;
  availabilitySets: AvailabilitySets;
  proximityPlacementGroups: ProximityPlacementGroups;
  dedicatedHostGroups: DedicatedHostGroups;
  dedicatedHosts: DedicatedHosts;
  sshPublicKeys: SshPublicKeys;
  virtualMachineExtensionImages: VirtualMachineExtensionImages;
  virtualMachineExtensions: VirtualMachineExtensions;
  virtualMachineImages: VirtualMachineImages;
  virtualMachineImagesEdgeZone: VirtualMachineImagesEdgeZone;
  usage: Usage;
  virtualMachines: VirtualMachines;
  virtualMachineScaleSets: VirtualMachineScaleSets;
  virtualMachineSizes: VirtualMachineSizes;
  images: Images;
  virtualMachineScaleSetExtensions: VirtualMachineScaleSetExtensions;
  virtualMachineScaleSetRollingUpgrades: VirtualMachineScaleSetRollingUpgrades;
  virtualMachineScaleSetVMExtensions: VirtualMachineScaleSetVMExtensions;
  virtualMachineScaleSetVMs: VirtualMachineScaleSetVMs;
  logAnalytics: LogAnalytics;
  virtualMachineRunCommands: VirtualMachineRunCommands;
  virtualMachineScaleSetVMRunCommands: VirtualMachineScaleSetVMRunCommands;
  resourceSkus: ResourceSkus;
  disks: Disks;
  snapshots: Snapshots;
  diskEncryptionSets: DiskEncryptionSets;
  diskAccesses: DiskAccesses;
  diskRestorePoint: DiskRestorePoint;
  galleries: Galleries;
  galleryImages: GalleryImages;
  galleryImageVersions: GalleryImageVersions;
  galleryApplications: GalleryApplications;
  galleryApplicationVersions: GalleryApplicationVersions;
}
