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
import type { DedicatedHostGroupsOperations } from "./classic/dedicatedHostGroups/index.js";
import { _getDedicatedHostGroupsOperations } from "./classic/dedicatedHostGroups/index.js";
import type { DedicatedHostsOperations } from "./classic/dedicatedHosts/index.js";
import { _getDedicatedHostsOperations } from "./classic/dedicatedHosts/index.js";
import type { ImagesOperations } from "./classic/images/index.js";
import { _getImagesOperations } from "./classic/images/index.js";
import type { LogAnalyticsOperationGroupOperations } from "./classic/logAnalyticsOperationGroup/index.js";
import { _getLogAnalyticsOperationGroupOperations } from "./classic/logAnalyticsOperationGroup/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProximityPlacementGroupsOperations } from "./classic/proximityPlacementGroups/index.js";
import { _getProximityPlacementGroupsOperations } from "./classic/proximityPlacementGroups/index.js";
import type { RestorePointCollectionsOperations } from "./classic/restorePointCollections/index.js";
import { _getRestorePointCollectionsOperations } from "./classic/restorePointCollections/index.js";
import type { RestorePointsOperations } from "./classic/restorePoints/index.js";
import { _getRestorePointsOperations } from "./classic/restorePoints/index.js";
import type { RollingUpgradeStatusInfosOperations } from "./classic/rollingUpgradeStatusInfos/index.js";
import { _getRollingUpgradeStatusInfosOperations } from "./classic/rollingUpgradeStatusInfos/index.js";
import type { SshPublicKeyResourcesOperations } from "./classic/sshPublicKeyResources/index.js";
import { _getSshPublicKeyResourcesOperations } from "./classic/sshPublicKeyResources/index.js";
import type { UsageOperationGroupOperations } from "./classic/usageOperationGroup/index.js";
import { _getUsageOperationGroupOperations } from "./classic/usageOperationGroup/index.js";
import type { VirtualMachineExtensionImagesOperations } from "./classic/virtualMachineExtensionImages/index.js";
import { _getVirtualMachineExtensionImagesOperations } from "./classic/virtualMachineExtensionImages/index.js";
import type { VirtualMachineExtensionsOperations } from "./classic/virtualMachineExtensions/index.js";
import { _getVirtualMachineExtensionsOperations } from "./classic/virtualMachineExtensions/index.js";
import type { VirtualMachineImagesEdgeZoneOperationGroupOperations } from "./classic/virtualMachineImagesEdgeZoneOperationGroup/index.js";
import { _getVirtualMachineImagesEdgeZoneOperationGroupOperations } from "./classic/virtualMachineImagesEdgeZoneOperationGroup/index.js";
import type { VirtualMachineImagesOperationGroupOperations } from "./classic/virtualMachineImagesOperationGroup/index.js";
import { _getVirtualMachineImagesOperationGroupOperations } from "./classic/virtualMachineImagesOperationGroup/index.js";
import type { VirtualMachineRunCommandsOperations } from "./classic/virtualMachineRunCommands/index.js";
import { _getVirtualMachineRunCommandsOperations } from "./classic/virtualMachineRunCommands/index.js";
import type { VirtualMachineRunCommandsOperationGroupOperations } from "./classic/virtualMachineRunCommandsOperationGroup/index.js";
import { _getVirtualMachineRunCommandsOperationGroupOperations } from "./classic/virtualMachineRunCommandsOperationGroup/index.js";
import type { VirtualMachineScaleSetExtensionsOperations } from "./classic/virtualMachineScaleSetExtensions/index.js";
import { _getVirtualMachineScaleSetExtensionsOperations } from "./classic/virtualMachineScaleSetExtensions/index.js";
import type { VirtualMachineScaleSetVMExtensionsOperations } from "./classic/virtualMachineScaleSetVMExtensions/index.js";
import { _getVirtualMachineScaleSetVMExtensionsOperations } from "./classic/virtualMachineScaleSetVMExtensions/index.js";
import type { VirtualMachineScaleSetVMRunCommandsOperations } from "./classic/virtualMachineScaleSetVMRunCommands/index.js";
import { _getVirtualMachineScaleSetVMRunCommandsOperations } from "./classic/virtualMachineScaleSetVMRunCommands/index.js";
import type { VirtualMachineScaleSetVMSOperations } from "./classic/virtualMachineScaleSetVMS/index.js";
import { _getVirtualMachineScaleSetVMSOperations } from "./classic/virtualMachineScaleSetVMS/index.js";
import type { VirtualMachineScaleSetsOperations } from "./classic/virtualMachineScaleSets/index.js";
import { _getVirtualMachineScaleSetsOperations } from "./classic/virtualMachineScaleSets/index.js";
import type { VirtualMachineScaleSetsOperationGroupOperations } from "./classic/virtualMachineScaleSetsOperationGroup/index.js";
import { _getVirtualMachineScaleSetsOperationGroupOperations } from "./classic/virtualMachineScaleSetsOperationGroup/index.js";
import type { VirtualMachineSizesOperationGroupOperations } from "./classic/virtualMachineSizesOperationGroup/index.js";
import { _getVirtualMachineSizesOperationGroupOperations } from "./classic/virtualMachineSizesOperationGroup/index.js";
import type { VirtualMachinesOperations } from "./classic/virtualMachines/index.js";
import { _getVirtualMachinesOperations } from "./classic/virtualMachines/index.js";
import type { VirtualMachinesOperationGroupOperations } from "./classic/virtualMachinesOperationGroup/index.js";
import { _getVirtualMachinesOperationGroupOperations } from "./classic/virtualMachinesOperationGroup/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeManagementClientOptionalParams } from "./api/computeManagementContext.js";

export class ComputeManagementClient {
  private _client: ComputeManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Compute Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createComputeManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.virtualMachineRunCommandsOperationGroup =
      _getVirtualMachineRunCommandsOperationGroupOperations(this._client);
    this.logAnalyticsOperationGroup = _getLogAnalyticsOperationGroupOperations(this._client);
    this.virtualMachineImagesOperationGroup = _getVirtualMachineImagesOperationGroupOperations(
      this._client,
    );
    this.virtualMachineImagesEdgeZoneOperationGroup =
      _getVirtualMachineImagesEdgeZoneOperationGroupOperations(this._client);
    this.virtualMachinesOperationGroup = _getVirtualMachinesOperationGroupOperations(this._client);
    this.virtualMachineScaleSetsOperationGroup =
      _getVirtualMachineScaleSetsOperationGroupOperations(this._client);
    this.virtualMachineSizesOperationGroup = _getVirtualMachineSizesOperationGroupOperations(
      this._client,
    );
    this.usageOperationGroup = _getUsageOperationGroupOperations(this._client);
    this.virtualMachineScaleSetVMRunCommands = _getVirtualMachineScaleSetVMRunCommandsOperations(
      this._client,
    );
    this.virtualMachineRunCommands = _getVirtualMachineRunCommandsOperations(this._client);
    this.capacityReservations = _getCapacityReservationsOperations(this._client);
    this.capacityReservationGroups = _getCapacityReservationGroupsOperations(this._client);
    this.restorePoints = _getRestorePointsOperations(this._client);
    this.restorePointCollections = _getRestorePointCollectionsOperations(this._client);
    this.images = _getImagesOperations(this._client);
    this.sshPublicKeyResources = _getSshPublicKeyResourcesOperations(this._client);
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
    this.virtualMachineScaleSetVMS = _getVirtualMachineScaleSetVMSOperations(this._client);
    this.virtualMachineScaleSetExtensions = _getVirtualMachineScaleSetExtensionsOperations(
      this._client,
    );
    this.rollingUpgradeStatusInfos = _getRollingUpgradeStatusInfosOperations(this._client);
    this.virtualMachineScaleSets = _getVirtualMachineScaleSetsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for virtualMachineRunCommandsOperationGroup */
  public readonly virtualMachineRunCommandsOperationGroup: VirtualMachineRunCommandsOperationGroupOperations;
  /** The operation groups for logAnalyticsOperationGroup */
  public readonly logAnalyticsOperationGroup: LogAnalyticsOperationGroupOperations;
  /** The operation groups for virtualMachineImagesOperationGroup */
  public readonly virtualMachineImagesOperationGroup: VirtualMachineImagesOperationGroupOperations;
  /** The operation groups for virtualMachineImagesEdgeZoneOperationGroup */
  public readonly virtualMachineImagesEdgeZoneOperationGroup: VirtualMachineImagesEdgeZoneOperationGroupOperations;
  /** The operation groups for virtualMachinesOperationGroup */
  public readonly virtualMachinesOperationGroup: VirtualMachinesOperationGroupOperations;
  /** The operation groups for virtualMachineScaleSetsOperationGroup */
  public readonly virtualMachineScaleSetsOperationGroup: VirtualMachineScaleSetsOperationGroupOperations;
  /** The operation groups for virtualMachineSizesOperationGroup */
  public readonly virtualMachineSizesOperationGroup: VirtualMachineSizesOperationGroupOperations;
  /** The operation groups for usageOperationGroup */
  public readonly usageOperationGroup: UsageOperationGroupOperations;
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
  /** The operation groups for sshPublicKeyResources */
  public readonly sshPublicKeyResources: SshPublicKeyResourcesOperations;
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
  /** The operation groups for virtualMachineScaleSetVMS */
  public readonly virtualMachineScaleSetVMS: VirtualMachineScaleSetVMSOperations;
  /** The operation groups for virtualMachineScaleSetExtensions */
  public readonly virtualMachineScaleSetExtensions: VirtualMachineScaleSetExtensionsOperations;
  /** The operation groups for rollingUpgradeStatusInfos */
  public readonly rollingUpgradeStatusInfos: RollingUpgradeStatusInfosOperations;
  /** The operation groups for virtualMachineScaleSets */
  public readonly virtualMachineScaleSets: VirtualMachineScaleSetsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
