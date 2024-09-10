// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AvailabilitySet,
  AvailabilitySetUpdate,
  CapacityReservation,
  CapacityReservationGroup,
  CapacityReservationGroupUpdate,
  CapacityReservationUpdate,
  CloudService,
  CloudServiceUpdate,
  DedicatedHost,
  DedicatedHostGroup,
  DedicatedHostGroupUpdate,
  DedicatedHostUpdate,
  Disk,
  DiskAccess,
  DiskAccessUpdate,
  DiskEncryptionSet,
  DiskEncryptionSetUpdate,
  DiskUpdate,
  Gallery,
  GalleryApplication,
  GalleryApplicationUpdate,
  GalleryApplicationVersion,
  GalleryApplicationVersionUpdate,
  GalleryImage,
  GalleryImageUpdate,
  GalleryImageVersion,
  GalleryImageVersionUpdate,
  GalleryUpdate,
  GrantAccessData,
  Image,
  ImageUpdate,
  OrchestrationServiceStateInput,
  PrivateEndpointConnection,
  ProximityPlacementGroup,
  ProximityPlacementGroupUpdate,
  RequestRateByIntervalInput,
  RestorePoint,
  RestorePointCollection,
  RestorePointCollectionUpdate,
  RoleInstances,
  RunCommandInput,
  SharingUpdate,
  Snapshot,
  SnapshotUpdate,
  SshPublicKeyResource,
  SshPublicKeyUpdateResource,
  ThrottledRequestsInput,
  UpdateDomain,
  VMScaleSetConvertToSinglePlacementGroupInput,
  VirtualMachine,
  VirtualMachineCaptureParameters,
  VirtualMachineExtension,
  VirtualMachineExtensionUpdate,
  VirtualMachineInstallPatchesParameters,
  VirtualMachineReimageParameters,
  VirtualMachineRunCommand,
  VirtualMachineRunCommandUpdate,
  VirtualMachineScaleSet,
  VirtualMachineScaleSetExtension,
  VirtualMachineScaleSetExtensionUpdate,
  VirtualMachineScaleSetReimageParameters,
  VirtualMachineScaleSetUpdate,
  VirtualMachineScaleSetVM,
  VirtualMachineScaleSetVMExtension,
  VirtualMachineScaleSetVMExtensionUpdate,
  VirtualMachineScaleSetVMInstanceIDs,
  VirtualMachineScaleSetVMInstanceRequiredIDs,
  VirtualMachineScaleSetVMReimageParameters,
  VirtualMachineUpdate,
} from "./models";

export interface OperationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface OperationsListQueryParam {
  queryParameters: OperationsListQueryParamProperties;
}

export type OperationsListParameters = OperationsListQueryParam & RequestParameters;

export interface UsageListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface UsageListQueryParam {
  queryParameters: UsageListQueryParamProperties;
}

export type UsageListParameters = UsageListQueryParam & RequestParameters;

export interface VirtualMachineSizesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineSizesListQueryParam {
  queryParameters: VirtualMachineSizesListQueryParamProperties;
}

export type VirtualMachineSizesListParameters = VirtualMachineSizesListQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetsListByLocationQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsListByLocationQueryParam {
  queryParameters: VirtualMachineScaleSetsListByLocationQueryParamProperties;
}

export type VirtualMachineScaleSetsListByLocationParameters =
  VirtualMachineScaleSetsListByLocationQueryParam & RequestParameters;

export interface VirtualMachineScaleSetsCreateOrUpdateBodyParam {
  /** The scale set object. */
  body: VirtualMachineScaleSet;
}

export interface VirtualMachineScaleSetsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsCreateOrUpdateQueryParam {
  queryParameters: VirtualMachineScaleSetsCreateOrUpdateQueryParamProperties;
}

export interface VirtualMachineScaleSetsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsCreateOrUpdateParameters =
  VirtualMachineScaleSetsCreateOrUpdateQueryParam &
    VirtualMachineScaleSetsCreateOrUpdateMediaTypesParam &
    VirtualMachineScaleSetsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetsUpdateBodyParam {
  /** The scale set object. */
  body: VirtualMachineScaleSetUpdate;
}

export interface VirtualMachineScaleSetsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsUpdateQueryParam {
  queryParameters: VirtualMachineScaleSetsUpdateQueryParamProperties;
}

export interface VirtualMachineScaleSetsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsUpdateParameters = VirtualMachineScaleSetsUpdateQueryParam &
  VirtualMachineScaleSetsUpdateMediaTypesParam &
  VirtualMachineScaleSetsUpdateBodyParam &
  RequestParameters;

export interface VirtualMachineScaleSetsDeleteQueryParamProperties {
  /** Optional parameter to force delete a VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsDeleteQueryParam {
  queryParameters: VirtualMachineScaleSetsDeleteQueryParamProperties;
}

export type VirtualMachineScaleSetsDeleteParameters = VirtualMachineScaleSetsDeleteQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
  /** The expand expression to apply on the operation. 'UserData' retrieves the UserData property of the VM scale set that was provided by the user during the VM scale set Create/Update operation */
  $expand?: "userData";
}

export interface VirtualMachineScaleSetsGetQueryParam {
  queryParameters: VirtualMachineScaleSetsGetQueryParamProperties;
}

export type VirtualMachineScaleSetsGetParameters = VirtualMachineScaleSetsGetQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetsDeallocateBodyParam {
  /** A list of virtual machine instance IDs from the VM scale set. */
  body?: VirtualMachineScaleSetVMInstanceIDs;
}

export interface VirtualMachineScaleSetsDeallocateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsDeallocateQueryParam {
  queryParameters: VirtualMachineScaleSetsDeallocateQueryParamProperties;
}

export interface VirtualMachineScaleSetsDeallocateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsDeallocateParameters =
  VirtualMachineScaleSetsDeallocateQueryParam &
    VirtualMachineScaleSetsDeallocateMediaTypesParam &
    VirtualMachineScaleSetsDeallocateBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetsDeleteInstancesBodyParam {
  /** A list of virtual machine instance IDs from the VM scale set. */
  body: VirtualMachineScaleSetVMInstanceRequiredIDs;
}

export interface VirtualMachineScaleSetsDeleteInstancesQueryParamProperties {
  /** Optional parameter to force delete virtual machines from the VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsDeleteInstancesQueryParam {
  queryParameters: VirtualMachineScaleSetsDeleteInstancesQueryParamProperties;
}

export interface VirtualMachineScaleSetsDeleteInstancesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsDeleteInstancesParameters =
  VirtualMachineScaleSetsDeleteInstancesQueryParam &
    VirtualMachineScaleSetsDeleteInstancesMediaTypesParam &
    VirtualMachineScaleSetsDeleteInstancesBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetsGetInstanceViewQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsGetInstanceViewQueryParam {
  queryParameters: VirtualMachineScaleSetsGetInstanceViewQueryParamProperties;
}

export type VirtualMachineScaleSetsGetInstanceViewParameters =
  VirtualMachineScaleSetsGetInstanceViewQueryParam & RequestParameters;

export interface VirtualMachineScaleSetsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsListQueryParam {
  queryParameters: VirtualMachineScaleSetsListQueryParamProperties;
}

export type VirtualMachineScaleSetsListParameters = VirtualMachineScaleSetsListQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetsListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsListAllQueryParam {
  queryParameters: VirtualMachineScaleSetsListAllQueryParamProperties;
}

export type VirtualMachineScaleSetsListAllParameters = VirtualMachineScaleSetsListAllQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetsListSkusQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsListSkusQueryParam {
  queryParameters: VirtualMachineScaleSetsListSkusQueryParamProperties;
}

export type VirtualMachineScaleSetsListSkusParameters = VirtualMachineScaleSetsListSkusQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetsGetOSUpgradeHistoryQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsGetOSUpgradeHistoryQueryParam {
  queryParameters: VirtualMachineScaleSetsGetOSUpgradeHistoryQueryParamProperties;
}

export type VirtualMachineScaleSetsGetOSUpgradeHistoryParameters =
  VirtualMachineScaleSetsGetOSUpgradeHistoryQueryParam & RequestParameters;

export interface VirtualMachineScaleSetsPowerOffBodyParam {
  /** A list of virtual machine instance IDs from the VM scale set. */
  body?: VirtualMachineScaleSetVMInstanceIDs;
}

export interface VirtualMachineScaleSetsPowerOffQueryParamProperties {
  /** The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified */
  skipShutdown?: boolean;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsPowerOffQueryParam {
  queryParameters: VirtualMachineScaleSetsPowerOffQueryParamProperties;
}

export interface VirtualMachineScaleSetsPowerOffMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsPowerOffParameters = VirtualMachineScaleSetsPowerOffQueryParam &
  VirtualMachineScaleSetsPowerOffMediaTypesParam &
  VirtualMachineScaleSetsPowerOffBodyParam &
  RequestParameters;

export interface VirtualMachineScaleSetsRestartBodyParam {
  /** A list of virtual machine instance IDs from the VM scale set. */
  body?: VirtualMachineScaleSetVMInstanceIDs;
}

export interface VirtualMachineScaleSetsRestartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsRestartQueryParam {
  queryParameters: VirtualMachineScaleSetsRestartQueryParamProperties;
}

export interface VirtualMachineScaleSetsRestartMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsRestartParameters = VirtualMachineScaleSetsRestartQueryParam &
  VirtualMachineScaleSetsRestartMediaTypesParam &
  VirtualMachineScaleSetsRestartBodyParam &
  RequestParameters;

export interface VirtualMachineScaleSetsStartBodyParam {
  /** A list of virtual machine instance IDs from the VM scale set. */
  body?: VirtualMachineScaleSetVMInstanceIDs;
}

export interface VirtualMachineScaleSetsStartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsStartQueryParam {
  queryParameters: VirtualMachineScaleSetsStartQueryParamProperties;
}

export interface VirtualMachineScaleSetsStartMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsStartParameters = VirtualMachineScaleSetsStartQueryParam &
  VirtualMachineScaleSetsStartMediaTypesParam &
  VirtualMachineScaleSetsStartBodyParam &
  RequestParameters;

export interface VirtualMachineScaleSetsRedeployBodyParam {
  /** A list of virtual machine instance IDs from the VM scale set. */
  body?: VirtualMachineScaleSetVMInstanceIDs;
}

export interface VirtualMachineScaleSetsRedeployQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsRedeployQueryParam {
  queryParameters: VirtualMachineScaleSetsRedeployQueryParamProperties;
}

export interface VirtualMachineScaleSetsRedeployMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsRedeployParameters = VirtualMachineScaleSetsRedeployQueryParam &
  VirtualMachineScaleSetsRedeployMediaTypesParam &
  VirtualMachineScaleSetsRedeployBodyParam &
  RequestParameters;

export interface VirtualMachineScaleSetsPerformMaintenanceBodyParam {
  /** A list of virtual machine instance IDs from the VM scale set. */
  body?: VirtualMachineScaleSetVMInstanceIDs;
}

export interface VirtualMachineScaleSetsPerformMaintenanceQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsPerformMaintenanceQueryParam {
  queryParameters: VirtualMachineScaleSetsPerformMaintenanceQueryParamProperties;
}

export interface VirtualMachineScaleSetsPerformMaintenanceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsPerformMaintenanceParameters =
  VirtualMachineScaleSetsPerformMaintenanceQueryParam &
    VirtualMachineScaleSetsPerformMaintenanceMediaTypesParam &
    VirtualMachineScaleSetsPerformMaintenanceBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetsUpdateInstancesBodyParam {
  /** A list of virtual machine instance IDs from the VM scale set. */
  body: VirtualMachineScaleSetVMInstanceRequiredIDs;
}

export interface VirtualMachineScaleSetsUpdateInstancesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsUpdateInstancesQueryParam {
  queryParameters: VirtualMachineScaleSetsUpdateInstancesQueryParamProperties;
}

export interface VirtualMachineScaleSetsUpdateInstancesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsUpdateInstancesParameters =
  VirtualMachineScaleSetsUpdateInstancesQueryParam &
    VirtualMachineScaleSetsUpdateInstancesMediaTypesParam &
    VirtualMachineScaleSetsUpdateInstancesBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetsReimageBodyParam {
  /** Parameters for Reimaging VM ScaleSet. */
  body?: VirtualMachineScaleSetReimageParameters;
}

export interface VirtualMachineScaleSetsReimageQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsReimageQueryParam {
  queryParameters: VirtualMachineScaleSetsReimageQueryParamProperties;
}

export interface VirtualMachineScaleSetsReimageMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsReimageParameters = VirtualMachineScaleSetsReimageQueryParam &
  VirtualMachineScaleSetsReimageMediaTypesParam &
  VirtualMachineScaleSetsReimageBodyParam &
  RequestParameters;

export interface VirtualMachineScaleSetsReimageAllBodyParam {
  /** A list of virtual machine instance IDs from the VM scale set. */
  body?: VirtualMachineScaleSetVMInstanceIDs;
}

export interface VirtualMachineScaleSetsReimageAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsReimageAllQueryParam {
  queryParameters: VirtualMachineScaleSetsReimageAllQueryParamProperties;
}

export interface VirtualMachineScaleSetsReimageAllMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsReimageAllParameters =
  VirtualMachineScaleSetsReimageAllQueryParam &
    VirtualMachineScaleSetsReimageAllMediaTypesParam &
    VirtualMachineScaleSetsReimageAllBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
  /** The platform update domain for which a manual recovery walk is requested */
  platformUpdateDomain: number;
  /** The zone in which the manual recovery walk is requested for cross zone virtual machine scale set */
  zone?: string;
  /** The placement group id for which the manual recovery walk is requested. */
  placementGroupId?: string;
}

export interface VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkQueryParam {
  queryParameters: VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkQueryParamProperties;
}

export type VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkParameters =
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkQueryParam &
    RequestParameters;

export interface VirtualMachineScaleSetsConvertToSinglePlacementGroupBodyParam {
  /** The input object for ConvertToSinglePlacementGroup API. */
  body: VMScaleSetConvertToSinglePlacementGroupInput;
}

export interface VirtualMachineScaleSetsConvertToSinglePlacementGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsConvertToSinglePlacementGroupQueryParam {
  queryParameters: VirtualMachineScaleSetsConvertToSinglePlacementGroupQueryParamProperties;
}

export interface VirtualMachineScaleSetsConvertToSinglePlacementGroupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsConvertToSinglePlacementGroupParameters =
  VirtualMachineScaleSetsConvertToSinglePlacementGroupQueryParam &
    VirtualMachineScaleSetsConvertToSinglePlacementGroupMediaTypesParam &
    VirtualMachineScaleSetsConvertToSinglePlacementGroupBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetsSetOrchestrationServiceStateBodyParam {
  /** The input object for SetOrchestrationServiceState API. */
  body: OrchestrationServiceStateInput;
}

export interface VirtualMachineScaleSetsSetOrchestrationServiceStateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetsSetOrchestrationServiceStateQueryParam {
  queryParameters: VirtualMachineScaleSetsSetOrchestrationServiceStateQueryParamProperties;
}

export interface VirtualMachineScaleSetsSetOrchestrationServiceStateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetsSetOrchestrationServiceStateParameters =
  VirtualMachineScaleSetsSetOrchestrationServiceStateQueryParam &
    VirtualMachineScaleSetsSetOrchestrationServiceStateMediaTypesParam &
    VirtualMachineScaleSetsSetOrchestrationServiceStateBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetExtensionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create VM scale set Extension operation. */
  body: VirtualMachineScaleSetExtension;
}

export interface VirtualMachineScaleSetExtensionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetExtensionsCreateOrUpdateQueryParam {
  queryParameters: VirtualMachineScaleSetExtensionsCreateOrUpdateQueryParamProperties;
}

export interface VirtualMachineScaleSetExtensionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetExtensionsCreateOrUpdateParameters =
  VirtualMachineScaleSetExtensionsCreateOrUpdateQueryParam &
    VirtualMachineScaleSetExtensionsCreateOrUpdateMediaTypesParam &
    VirtualMachineScaleSetExtensionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetExtensionsUpdateBodyParam {
  /** Parameters supplied to the Update VM scale set Extension operation. */
  body: VirtualMachineScaleSetExtensionUpdate;
}

export interface VirtualMachineScaleSetExtensionsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetExtensionsUpdateQueryParam {
  queryParameters: VirtualMachineScaleSetExtensionsUpdateQueryParamProperties;
}

export interface VirtualMachineScaleSetExtensionsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetExtensionsUpdateParameters =
  VirtualMachineScaleSetExtensionsUpdateQueryParam &
    VirtualMachineScaleSetExtensionsUpdateMediaTypesParam &
    VirtualMachineScaleSetExtensionsUpdateBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetExtensionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetExtensionsDeleteQueryParam {
  queryParameters: VirtualMachineScaleSetExtensionsDeleteQueryParamProperties;
}

export type VirtualMachineScaleSetExtensionsDeleteParameters =
  VirtualMachineScaleSetExtensionsDeleteQueryParam & RequestParameters;

export interface VirtualMachineScaleSetExtensionsGetQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetExtensionsGetQueryParam {
  queryParameters: VirtualMachineScaleSetExtensionsGetQueryParamProperties;
}

export type VirtualMachineScaleSetExtensionsGetParameters =
  VirtualMachineScaleSetExtensionsGetQueryParam & RequestParameters;

export interface VirtualMachineScaleSetExtensionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetExtensionsListQueryParam {
  queryParameters: VirtualMachineScaleSetExtensionsListQueryParamProperties;
}

export type VirtualMachineScaleSetExtensionsListParameters =
  VirtualMachineScaleSetExtensionsListQueryParam & RequestParameters;

export interface VirtualMachineScaleSetRollingUpgradesCancelQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetRollingUpgradesCancelQueryParam {
  queryParameters: VirtualMachineScaleSetRollingUpgradesCancelQueryParamProperties;
}

export type VirtualMachineScaleSetRollingUpgradesCancelParameters =
  VirtualMachineScaleSetRollingUpgradesCancelQueryParam & RequestParameters;

export interface VirtualMachineScaleSetRollingUpgradesStartOSUpgradeQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetRollingUpgradesStartOSUpgradeQueryParam {
  queryParameters: VirtualMachineScaleSetRollingUpgradesStartOSUpgradeQueryParamProperties;
}

export type VirtualMachineScaleSetRollingUpgradesStartOSUpgradeParameters =
  VirtualMachineScaleSetRollingUpgradesStartOSUpgradeQueryParam & RequestParameters;

export interface VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeQueryParam {
  queryParameters: VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeQueryParamProperties;
}

export type VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeParameters =
  VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeQueryParam & RequestParameters;

export interface VirtualMachineScaleSetRollingUpgradesGetLatestQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetRollingUpgradesGetLatestQueryParam {
  queryParameters: VirtualMachineScaleSetRollingUpgradesGetLatestQueryParamProperties;
}

export type VirtualMachineScaleSetRollingUpgradesGetLatestParameters =
  VirtualMachineScaleSetRollingUpgradesGetLatestQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMExtensionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Virtual Machine Extension operation. */
  body: VirtualMachineScaleSetVMExtension;
}

export interface VirtualMachineScaleSetVMExtensionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMExtensionsCreateOrUpdateQueryParam {
  queryParameters: VirtualMachineScaleSetVMExtensionsCreateOrUpdateQueryParamProperties;
}

export interface VirtualMachineScaleSetVMExtensionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetVMExtensionsCreateOrUpdateParameters =
  VirtualMachineScaleSetVMExtensionsCreateOrUpdateQueryParam &
    VirtualMachineScaleSetVMExtensionsCreateOrUpdateMediaTypesParam &
    VirtualMachineScaleSetVMExtensionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetVMExtensionsUpdateBodyParam {
  /** Parameters supplied to the Update Virtual Machine Extension operation. */
  body: VirtualMachineScaleSetVMExtensionUpdate;
}

export interface VirtualMachineScaleSetVMExtensionsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMExtensionsUpdateQueryParam {
  queryParameters: VirtualMachineScaleSetVMExtensionsUpdateQueryParamProperties;
}

export interface VirtualMachineScaleSetVMExtensionsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetVMExtensionsUpdateParameters =
  VirtualMachineScaleSetVMExtensionsUpdateQueryParam &
    VirtualMachineScaleSetVMExtensionsUpdateMediaTypesParam &
    VirtualMachineScaleSetVMExtensionsUpdateBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetVMExtensionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMExtensionsDeleteQueryParam {
  queryParameters: VirtualMachineScaleSetVMExtensionsDeleteQueryParamProperties;
}

export type VirtualMachineScaleSetVMExtensionsDeleteParameters =
  VirtualMachineScaleSetVMExtensionsDeleteQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMExtensionsGetQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMExtensionsGetQueryParam {
  queryParameters: VirtualMachineScaleSetVMExtensionsGetQueryParamProperties;
}

export type VirtualMachineScaleSetVMExtensionsGetParameters =
  VirtualMachineScaleSetVMExtensionsGetQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMExtensionsListQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMExtensionsListQueryParam {
  queryParameters: VirtualMachineScaleSetVMExtensionsListQueryParamProperties;
}

export type VirtualMachineScaleSetVMExtensionsListParameters =
  VirtualMachineScaleSetVMExtensionsListQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsReimageBodyParam {
  /** Parameters for the Reimaging Virtual machine in ScaleSet. */
  body?: VirtualMachineScaleSetVMReimageParameters;
}

export interface VirtualMachineScaleSetVMsReimageQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsReimageQueryParam {
  queryParameters: VirtualMachineScaleSetVMsReimageQueryParamProperties;
}

export interface VirtualMachineScaleSetVMsReimageMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetVMsReimageParameters =
  VirtualMachineScaleSetVMsReimageQueryParam &
    VirtualMachineScaleSetVMsReimageMediaTypesParam &
    VirtualMachineScaleSetVMsReimageBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetVMsReimageAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsReimageAllQueryParam {
  queryParameters: VirtualMachineScaleSetVMsReimageAllQueryParamProperties;
}

export type VirtualMachineScaleSetVMsReimageAllParameters =
  VirtualMachineScaleSetVMsReimageAllQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsDeallocateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsDeallocateQueryParam {
  queryParameters: VirtualMachineScaleSetVMsDeallocateQueryParamProperties;
}

export type VirtualMachineScaleSetVMsDeallocateParameters =
  VirtualMachineScaleSetVMsDeallocateQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsUpdateBodyParam {
  /** Parameters supplied to the Update Virtual Machine Scale Sets VM operation. */
  body: VirtualMachineScaleSetVM;
}

export interface VirtualMachineScaleSetVMsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsUpdateQueryParam {
  queryParameters: VirtualMachineScaleSetVMsUpdateQueryParamProperties;
}

export interface VirtualMachineScaleSetVMsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineScaleSetVMsUpdateParameters = VirtualMachineScaleSetVMsUpdateQueryParam &
  VirtualMachineScaleSetVMsUpdateMediaTypesParam &
  VirtualMachineScaleSetVMsUpdateBodyParam &
  RequestParameters;

export interface VirtualMachineScaleSetVMsDeleteQueryParamProperties {
  /** Optional parameter to force delete a virtual machine from a VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsDeleteQueryParam {
  queryParameters: VirtualMachineScaleSetVMsDeleteQueryParamProperties;
}

export type VirtualMachineScaleSetVMsDeleteParameters = VirtualMachineScaleSetVMsDeleteQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetVMsGetQueryParamProperties {
  /** The expand expression to apply on the operation. 'InstanceView' will retrieve the instance view of the virtual machine. 'UserData' will retrieve the UserData of the virtual machine. */
  $expand?: "instanceView" | "userData";
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsGetQueryParam {
  queryParameters: VirtualMachineScaleSetVMsGetQueryParamProperties;
}

export type VirtualMachineScaleSetVMsGetParameters = VirtualMachineScaleSetVMsGetQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetVMsGetInstanceViewQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsGetInstanceViewQueryParam {
  queryParameters: VirtualMachineScaleSetVMsGetInstanceViewQueryParamProperties;
}

export type VirtualMachineScaleSetVMsGetInstanceViewParameters =
  VirtualMachineScaleSetVMsGetInstanceViewQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsListQueryParamProperties {
  /** The filter to apply to the operation. Allowed values are 'startswith(instanceView/statuses/code, 'PowerState') eq true', 'properties/latestModelApplied eq true', 'properties/latestModelApplied eq false'. */
  $filter?: string;
  /** The list parameters. Allowed values are 'instanceView', 'instanceView/statuses'. */
  $select?: string;
  /** The expand expression to apply to the operation. Allowed values are 'instanceView'. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsListQueryParam {
  queryParameters: VirtualMachineScaleSetVMsListQueryParamProperties;
}

export type VirtualMachineScaleSetVMsListParameters = VirtualMachineScaleSetVMsListQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetVMsPowerOffQueryParamProperties {
  /** The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified */
  skipShutdown?: boolean;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsPowerOffQueryParam {
  queryParameters: VirtualMachineScaleSetVMsPowerOffQueryParamProperties;
}

export type VirtualMachineScaleSetVMsPowerOffParameters =
  VirtualMachineScaleSetVMsPowerOffQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsRestartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsRestartQueryParam {
  queryParameters: VirtualMachineScaleSetVMsRestartQueryParamProperties;
}

export type VirtualMachineScaleSetVMsRestartParameters =
  VirtualMachineScaleSetVMsRestartQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsStartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsStartQueryParam {
  queryParameters: VirtualMachineScaleSetVMsStartQueryParamProperties;
}

export type VirtualMachineScaleSetVMsStartParameters = VirtualMachineScaleSetVMsStartQueryParam &
  RequestParameters;

export interface VirtualMachineScaleSetVMsRedeployQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsRedeployQueryParam {
  queryParameters: VirtualMachineScaleSetVMsRedeployQueryParamProperties;
}

export type VirtualMachineScaleSetVMsRedeployParameters =
  VirtualMachineScaleSetVMsRedeployQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataQueryParamProperties {
  /** Expiration duration in minutes for the SAS URIs with a value between 1 to 1440 minutes. <br><br>NOTE: If not specified, SAS URIs will be generated with a default expiration duration of 120 minutes. */
  sasUriExpirationTimeInMinutes?: number;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataQueryParam {
  queryParameters: VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataQueryParamProperties;
}

export type VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataParameters =
  VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsPerformMaintenanceQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsPerformMaintenanceQueryParam {
  queryParameters: VirtualMachineScaleSetVMsPerformMaintenanceQueryParamProperties;
}

export type VirtualMachineScaleSetVMsPerformMaintenanceParameters =
  VirtualMachineScaleSetVMsPerformMaintenanceQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsSimulateEvictionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsSimulateEvictionQueryParam {
  queryParameters: VirtualMachineScaleSetVMsSimulateEvictionQueryParamProperties;
}

export type VirtualMachineScaleSetVMsSimulateEvictionParameters =
  VirtualMachineScaleSetVMsSimulateEvictionQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMsRunCommandBodyParam {
  /** Parameters supplied to the Run command operation. */
  body: RunCommandInput;
}

export interface VirtualMachineScaleSetVMsRunCommandQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMsRunCommandQueryParam {
  queryParameters: VirtualMachineScaleSetVMsRunCommandQueryParamProperties;
}

export interface VirtualMachineScaleSetVMsRunCommandMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "text/json";
}

export type VirtualMachineScaleSetVMsRunCommandParameters =
  VirtualMachineScaleSetVMsRunCommandQueryParam &
    VirtualMachineScaleSetVMsRunCommandMediaTypesParam &
    VirtualMachineScaleSetVMsRunCommandBodyParam &
    RequestParameters;

export interface VirtualMachineExtensionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Virtual Machine Extension operation. */
  body: VirtualMachineExtension;
}

export interface VirtualMachineExtensionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineExtensionsCreateOrUpdateQueryParam {
  queryParameters: VirtualMachineExtensionsCreateOrUpdateQueryParamProperties;
}

export interface VirtualMachineExtensionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineExtensionsCreateOrUpdateParameters =
  VirtualMachineExtensionsCreateOrUpdateQueryParam &
    VirtualMachineExtensionsCreateOrUpdateMediaTypesParam &
    VirtualMachineExtensionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualMachineExtensionsUpdateBodyParam {
  /** Parameters supplied to the Update Virtual Machine Extension operation. */
  body: VirtualMachineExtensionUpdate;
}

export interface VirtualMachineExtensionsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineExtensionsUpdateQueryParam {
  queryParameters: VirtualMachineExtensionsUpdateQueryParamProperties;
}

export interface VirtualMachineExtensionsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachineExtensionsUpdateParameters = VirtualMachineExtensionsUpdateQueryParam &
  VirtualMachineExtensionsUpdateMediaTypesParam &
  VirtualMachineExtensionsUpdateBodyParam &
  RequestParameters;

export interface VirtualMachineExtensionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineExtensionsDeleteQueryParam {
  queryParameters: VirtualMachineExtensionsDeleteQueryParamProperties;
}

export type VirtualMachineExtensionsDeleteParameters = VirtualMachineExtensionsDeleteQueryParam &
  RequestParameters;

export interface VirtualMachineExtensionsGetQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineExtensionsGetQueryParam {
  queryParameters: VirtualMachineExtensionsGetQueryParamProperties;
}

export type VirtualMachineExtensionsGetParameters = VirtualMachineExtensionsGetQueryParam &
  RequestParameters;

export interface VirtualMachineExtensionsListQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineExtensionsListQueryParam {
  queryParameters: VirtualMachineExtensionsListQueryParamProperties;
}

export type VirtualMachineExtensionsListParameters = VirtualMachineExtensionsListQueryParam &
  RequestParameters;

export interface VirtualMachinesListByLocationQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesListByLocationQueryParam {
  queryParameters: VirtualMachinesListByLocationQueryParamProperties;
}

export type VirtualMachinesListByLocationParameters = VirtualMachinesListByLocationQueryParam &
  RequestParameters;

export interface VirtualMachinesCaptureBodyParam {
  /** Parameters supplied to the Capture Virtual Machine operation. */
  body: VirtualMachineCaptureParameters;
}

export interface VirtualMachinesCaptureQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesCaptureQueryParam {
  queryParameters: VirtualMachinesCaptureQueryParamProperties;
}

export interface VirtualMachinesCaptureMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachinesCaptureParameters = VirtualMachinesCaptureQueryParam &
  VirtualMachinesCaptureMediaTypesParam &
  VirtualMachinesCaptureBodyParam &
  RequestParameters;

export interface VirtualMachinesCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Virtual Machine operation. */
  body: VirtualMachine;
}

export interface VirtualMachinesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesCreateOrUpdateQueryParam {
  queryParameters: VirtualMachinesCreateOrUpdateQueryParamProperties;
}

export interface VirtualMachinesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachinesCreateOrUpdateParameters = VirtualMachinesCreateOrUpdateQueryParam &
  VirtualMachinesCreateOrUpdateMediaTypesParam &
  VirtualMachinesCreateOrUpdateBodyParam &
  RequestParameters;

export interface VirtualMachinesUpdateBodyParam {
  /** Parameters supplied to the Update Virtual Machine operation. */
  body: VirtualMachineUpdate;
}

export interface VirtualMachinesUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesUpdateQueryParam {
  queryParameters: VirtualMachinesUpdateQueryParamProperties;
}

export interface VirtualMachinesUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachinesUpdateParameters = VirtualMachinesUpdateQueryParam &
  VirtualMachinesUpdateMediaTypesParam &
  VirtualMachinesUpdateBodyParam &
  RequestParameters;

export interface VirtualMachinesDeleteQueryParamProperties {
  /** Optional parameter to force delete virtual machines. */
  forceDeletion?: boolean;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesDeleteQueryParam {
  queryParameters: VirtualMachinesDeleteQueryParamProperties;
}

export type VirtualMachinesDeleteParameters = VirtualMachinesDeleteQueryParam & RequestParameters;

export interface VirtualMachinesGetQueryParamProperties {
  /** The expand expression to apply on the operation. 'InstanceView' retrieves a snapshot of the runtime properties of the virtual machine that is managed by the platform and can change outside of control plane operations. 'UserData' retrieves the UserData property as part of the VM model view that was provided by the user during the VM Create/Update operation. */
  $expand?: "instanceView" | "userData";
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesGetQueryParam {
  queryParameters: VirtualMachinesGetQueryParamProperties;
}

export type VirtualMachinesGetParameters = VirtualMachinesGetQueryParam & RequestParameters;

export interface VirtualMachinesInstanceViewQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesInstanceViewQueryParam {
  queryParameters: VirtualMachinesInstanceViewQueryParamProperties;
}

export type VirtualMachinesInstanceViewParameters = VirtualMachinesInstanceViewQueryParam &
  RequestParameters;

export interface VirtualMachinesConvertToManagedDisksQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesConvertToManagedDisksQueryParam {
  queryParameters: VirtualMachinesConvertToManagedDisksQueryParamProperties;
}

export type VirtualMachinesConvertToManagedDisksParameters =
  VirtualMachinesConvertToManagedDisksQueryParam & RequestParameters;

export interface VirtualMachinesDeallocateQueryParamProperties {
  /** Optional parameter to hibernate a virtual machine. (Feature in Preview) */
  hibernate?: boolean;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesDeallocateQueryParam {
  queryParameters: VirtualMachinesDeallocateQueryParamProperties;
}

export type VirtualMachinesDeallocateParameters = VirtualMachinesDeallocateQueryParam &
  RequestParameters;

export interface VirtualMachinesGeneralizeQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesGeneralizeQueryParam {
  queryParameters: VirtualMachinesGeneralizeQueryParamProperties;
}

export type VirtualMachinesGeneralizeParameters = VirtualMachinesGeneralizeQueryParam &
  RequestParameters;

export interface VirtualMachinesListQueryParamProperties {
  /** The system query option to filter VMs returned in the response. Allowed value is 'virtualMachineScaleSet/id' eq /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}' */
  $filter?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesListQueryParam {
  queryParameters: VirtualMachinesListQueryParamProperties;
}

export type VirtualMachinesListParameters = VirtualMachinesListQueryParam & RequestParameters;

export interface VirtualMachinesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
  /** statusOnly=true enables fetching run time status of all Virtual Machines in the subscription. */
  statusOnly?: string;
  /** The system query option to filter VMs returned in the response. Allowed value is 'virtualMachineScaleSet/id' eq /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}' */
  $filter?: string;
}

export interface VirtualMachinesListAllQueryParam {
  queryParameters: VirtualMachinesListAllQueryParamProperties;
}

export type VirtualMachinesListAllParameters = VirtualMachinesListAllQueryParam & RequestParameters;

export interface VirtualMachinesListAvailableSizesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesListAvailableSizesQueryParam {
  queryParameters: VirtualMachinesListAvailableSizesQueryParamProperties;
}

export type VirtualMachinesListAvailableSizesParameters =
  VirtualMachinesListAvailableSizesQueryParam & RequestParameters;

export interface VirtualMachinesPowerOffQueryParamProperties {
  /** The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified */
  skipShutdown?: boolean;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesPowerOffQueryParam {
  queryParameters: VirtualMachinesPowerOffQueryParamProperties;
}

export type VirtualMachinesPowerOffParameters = VirtualMachinesPowerOffQueryParam &
  RequestParameters;

export interface VirtualMachinesReapplyQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesReapplyQueryParam {
  queryParameters: VirtualMachinesReapplyQueryParamProperties;
}

export type VirtualMachinesReapplyParameters = VirtualMachinesReapplyQueryParam & RequestParameters;

export interface VirtualMachinesRestartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesRestartQueryParam {
  queryParameters: VirtualMachinesRestartQueryParamProperties;
}

export type VirtualMachinesRestartParameters = VirtualMachinesRestartQueryParam & RequestParameters;

export interface VirtualMachinesStartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesStartQueryParam {
  queryParameters: VirtualMachinesStartQueryParamProperties;
}

export type VirtualMachinesStartParameters = VirtualMachinesStartQueryParam & RequestParameters;

export interface VirtualMachinesRedeployQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesRedeployQueryParam {
  queryParameters: VirtualMachinesRedeployQueryParamProperties;
}

export type VirtualMachinesRedeployParameters = VirtualMachinesRedeployQueryParam &
  RequestParameters;

export interface VirtualMachinesReimageBodyParam {
  /** Parameters supplied to the Reimage Virtual Machine operation. */
  body?: VirtualMachineReimageParameters;
}

export interface VirtualMachinesReimageQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesReimageQueryParam {
  queryParameters: VirtualMachinesReimageQueryParamProperties;
}

export interface VirtualMachinesReimageMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachinesReimageParameters = VirtualMachinesReimageQueryParam &
  VirtualMachinesReimageMediaTypesParam &
  VirtualMachinesReimageBodyParam &
  RequestParameters;

export interface VirtualMachinesRetrieveBootDiagnosticsDataQueryParamProperties {
  /** Expiration duration in minutes for the SAS URIs with a value between 1 to 1440 minutes. <br><br>NOTE: If not specified, SAS URIs will be generated with a default expiration duration of 120 minutes. */
  sasUriExpirationTimeInMinutes?: number;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesRetrieveBootDiagnosticsDataQueryParam {
  queryParameters: VirtualMachinesRetrieveBootDiagnosticsDataQueryParamProperties;
}

export type VirtualMachinesRetrieveBootDiagnosticsDataParameters =
  VirtualMachinesRetrieveBootDiagnosticsDataQueryParam & RequestParameters;

export interface VirtualMachinesPerformMaintenanceQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesPerformMaintenanceQueryParam {
  queryParameters: VirtualMachinesPerformMaintenanceQueryParamProperties;
}

export type VirtualMachinesPerformMaintenanceParameters =
  VirtualMachinesPerformMaintenanceQueryParam & RequestParameters;

export interface VirtualMachinesSimulateEvictionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesSimulateEvictionQueryParam {
  queryParameters: VirtualMachinesSimulateEvictionQueryParamProperties;
}

export type VirtualMachinesSimulateEvictionParameters = VirtualMachinesSimulateEvictionQueryParam &
  RequestParameters;

export interface VirtualMachinesAssessPatchesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesAssessPatchesQueryParam {
  queryParameters: VirtualMachinesAssessPatchesQueryParamProperties;
}

export type VirtualMachinesAssessPatchesParameters = VirtualMachinesAssessPatchesQueryParam &
  RequestParameters;

export interface VirtualMachinesInstallPatchesBodyParam {
  /** Input for InstallPatches as directly received by the API */
  body: VirtualMachineInstallPatchesParameters;
}

export interface VirtualMachinesInstallPatchesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesInstallPatchesQueryParam {
  queryParameters: VirtualMachinesInstallPatchesQueryParamProperties;
}

export interface VirtualMachinesInstallPatchesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualMachinesInstallPatchesParameters = VirtualMachinesInstallPatchesQueryParam &
  VirtualMachinesInstallPatchesMediaTypesParam &
  VirtualMachinesInstallPatchesBodyParam &
  RequestParameters;

export interface VirtualMachinesRunCommandBodyParam {
  /** Parameters supplied to the Run command operation. */
  body: RunCommandInput;
}

export interface VirtualMachinesRunCommandQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachinesRunCommandQueryParam {
  queryParameters: VirtualMachinesRunCommandQueryParamProperties;
}

export interface VirtualMachinesRunCommandMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "text/json";
}

export type VirtualMachinesRunCommandParameters = VirtualMachinesRunCommandQueryParam &
  VirtualMachinesRunCommandMediaTypesParam &
  VirtualMachinesRunCommandBodyParam &
  RequestParameters;

export interface VirtualMachineImagesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesGetQueryParam {
  queryParameters: VirtualMachineImagesGetQueryParamProperties;
}

export type VirtualMachineImagesGetParameters = VirtualMachineImagesGetQueryParam &
  RequestParameters;

export interface VirtualMachineImagesListQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  $top?: number;
  $orderby?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesListQueryParam {
  queryParameters: VirtualMachineImagesListQueryParamProperties;
}

export type VirtualMachineImagesListParameters = VirtualMachineImagesListQueryParam &
  RequestParameters;

export interface VirtualMachineImagesListOffersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesListOffersQueryParam {
  queryParameters: VirtualMachineImagesListOffersQueryParamProperties;
}

export type VirtualMachineImagesListOffersParameters = VirtualMachineImagesListOffersQueryParam &
  RequestParameters;

export interface VirtualMachineImagesListPublishersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesListPublishersQueryParam {
  queryParameters: VirtualMachineImagesListPublishersQueryParamProperties;
}

export type VirtualMachineImagesListPublishersParameters =
  VirtualMachineImagesListPublishersQueryParam & RequestParameters;

export interface VirtualMachineImagesListSkusQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesListSkusQueryParam {
  queryParameters: VirtualMachineImagesListSkusQueryParamProperties;
}

export type VirtualMachineImagesListSkusParameters = VirtualMachineImagesListSkusQueryParam &
  RequestParameters;

export interface VirtualMachineImagesListByEdgeZoneQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesListByEdgeZoneQueryParam {
  queryParameters: VirtualMachineImagesListByEdgeZoneQueryParamProperties;
}

export type VirtualMachineImagesListByEdgeZoneParameters =
  VirtualMachineImagesListByEdgeZoneQueryParam & RequestParameters;

export interface VirtualMachineImagesEdgeZoneGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesEdgeZoneGetQueryParam {
  queryParameters: VirtualMachineImagesEdgeZoneGetQueryParamProperties;
}

export type VirtualMachineImagesEdgeZoneGetParameters = VirtualMachineImagesEdgeZoneGetQueryParam &
  RequestParameters;

export interface VirtualMachineImagesEdgeZoneListQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** An integer value specifying the number of images to return that matches supplied values. */
  $top?: number;
  /** Specifies the order of the results returned. Formatted as an OData query. */
  $orderby?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesEdgeZoneListQueryParam {
  queryParameters: VirtualMachineImagesEdgeZoneListQueryParamProperties;
}

export type VirtualMachineImagesEdgeZoneListParameters =
  VirtualMachineImagesEdgeZoneListQueryParam & RequestParameters;

export interface VirtualMachineImagesEdgeZoneListOffersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesEdgeZoneListOffersQueryParam {
  queryParameters: VirtualMachineImagesEdgeZoneListOffersQueryParamProperties;
}

export type VirtualMachineImagesEdgeZoneListOffersParameters =
  VirtualMachineImagesEdgeZoneListOffersQueryParam & RequestParameters;

export interface VirtualMachineImagesEdgeZoneListPublishersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesEdgeZoneListPublishersQueryParam {
  queryParameters: VirtualMachineImagesEdgeZoneListPublishersQueryParamProperties;
}

export type VirtualMachineImagesEdgeZoneListPublishersParameters =
  VirtualMachineImagesEdgeZoneListPublishersQueryParam & RequestParameters;

export interface VirtualMachineImagesEdgeZoneListSkusQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineImagesEdgeZoneListSkusQueryParam {
  queryParameters: VirtualMachineImagesEdgeZoneListSkusQueryParamProperties;
}

export type VirtualMachineImagesEdgeZoneListSkusParameters =
  VirtualMachineImagesEdgeZoneListSkusQueryParam & RequestParameters;

export interface VirtualMachineExtensionImagesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineExtensionImagesGetQueryParam {
  queryParameters: VirtualMachineExtensionImagesGetQueryParamProperties;
}

export type VirtualMachineExtensionImagesGetParameters =
  VirtualMachineExtensionImagesGetQueryParam & RequestParameters;

export interface VirtualMachineExtensionImagesListTypesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineExtensionImagesListTypesQueryParam {
  queryParameters: VirtualMachineExtensionImagesListTypesQueryParamProperties;
}

export type VirtualMachineExtensionImagesListTypesParameters =
  VirtualMachineExtensionImagesListTypesQueryParam & RequestParameters;

export interface VirtualMachineExtensionImagesListVersionsQueryParamProperties {
  /** The filter to apply on the operation. */
  $filter?: string;
  $top?: number;
  $orderby?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineExtensionImagesListVersionsQueryParam {
  queryParameters: VirtualMachineExtensionImagesListVersionsQueryParamProperties;
}

export type VirtualMachineExtensionImagesListVersionsParameters =
  VirtualMachineExtensionImagesListVersionsQueryParam & RequestParameters;

export interface AvailabilitySetsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Availability Set operation. */
  body: AvailabilitySet;
}

export interface AvailabilitySetsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface AvailabilitySetsCreateOrUpdateQueryParam {
  queryParameters: AvailabilitySetsCreateOrUpdateQueryParamProperties;
}

export interface AvailabilitySetsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AvailabilitySetsCreateOrUpdateParameters = AvailabilitySetsCreateOrUpdateQueryParam &
  AvailabilitySetsCreateOrUpdateMediaTypesParam &
  AvailabilitySetsCreateOrUpdateBodyParam &
  RequestParameters;

export interface AvailabilitySetsUpdateBodyParam {
  /** Parameters supplied to the Update Availability Set operation. */
  body: AvailabilitySetUpdate;
}

export interface AvailabilitySetsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface AvailabilitySetsUpdateQueryParam {
  queryParameters: AvailabilitySetsUpdateQueryParamProperties;
}

export interface AvailabilitySetsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AvailabilitySetsUpdateParameters = AvailabilitySetsUpdateQueryParam &
  AvailabilitySetsUpdateMediaTypesParam &
  AvailabilitySetsUpdateBodyParam &
  RequestParameters;

export interface AvailabilitySetsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface AvailabilitySetsDeleteQueryParam {
  queryParameters: AvailabilitySetsDeleteQueryParamProperties;
}

export type AvailabilitySetsDeleteParameters = AvailabilitySetsDeleteQueryParam & RequestParameters;

export interface AvailabilitySetsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface AvailabilitySetsGetQueryParam {
  queryParameters: AvailabilitySetsGetQueryParamProperties;
}

export type AvailabilitySetsGetParameters = AvailabilitySetsGetQueryParam & RequestParameters;

export interface AvailabilitySetsListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
  /** The expand expression to apply to the operation. Allowed values are 'instanceView'. */
  $expand?: string;
}

export interface AvailabilitySetsListBySubscriptionQueryParam {
  queryParameters: AvailabilitySetsListBySubscriptionQueryParamProperties;
}

export type AvailabilitySetsListBySubscriptionParameters =
  AvailabilitySetsListBySubscriptionQueryParam & RequestParameters;

export interface AvailabilitySetsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface AvailabilitySetsListQueryParam {
  queryParameters: AvailabilitySetsListQueryParamProperties;
}

export type AvailabilitySetsListParameters = AvailabilitySetsListQueryParam & RequestParameters;

export interface AvailabilitySetsListAvailableSizesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface AvailabilitySetsListAvailableSizesQueryParam {
  queryParameters: AvailabilitySetsListAvailableSizesQueryParamProperties;
}

export type AvailabilitySetsListAvailableSizesParameters =
  AvailabilitySetsListAvailableSizesQueryParam & RequestParameters;

export interface ProximityPlacementGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Proximity Placement Group operation. */
  body: ProximityPlacementGroup;
}

export interface ProximityPlacementGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ProximityPlacementGroupsCreateOrUpdateQueryParam {
  queryParameters: ProximityPlacementGroupsCreateOrUpdateQueryParamProperties;
}

export interface ProximityPlacementGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ProximityPlacementGroupsCreateOrUpdateParameters =
  ProximityPlacementGroupsCreateOrUpdateQueryParam &
    ProximityPlacementGroupsCreateOrUpdateMediaTypesParam &
    ProximityPlacementGroupsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ProximityPlacementGroupsUpdateBodyParam {
  /** Parameters supplied to the Update Proximity Placement Group operation. */
  body: ProximityPlacementGroupUpdate;
}

export interface ProximityPlacementGroupsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ProximityPlacementGroupsUpdateQueryParam {
  queryParameters: ProximityPlacementGroupsUpdateQueryParamProperties;
}

export interface ProximityPlacementGroupsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ProximityPlacementGroupsUpdateParameters = ProximityPlacementGroupsUpdateQueryParam &
  ProximityPlacementGroupsUpdateMediaTypesParam &
  ProximityPlacementGroupsUpdateBodyParam &
  RequestParameters;

export interface ProximityPlacementGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ProximityPlacementGroupsDeleteQueryParam {
  queryParameters: ProximityPlacementGroupsDeleteQueryParamProperties;
}

export type ProximityPlacementGroupsDeleteParameters = ProximityPlacementGroupsDeleteQueryParam &
  RequestParameters;

export interface ProximityPlacementGroupsGetQueryParamProperties {
  /** includeColocationStatus=true enables fetching the colocation status of all the resources in the proximity placement group. */
  includeColocationStatus?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ProximityPlacementGroupsGetQueryParam {
  queryParameters: ProximityPlacementGroupsGetQueryParamProperties;
}

export type ProximityPlacementGroupsGetParameters = ProximityPlacementGroupsGetQueryParam &
  RequestParameters;

export interface ProximityPlacementGroupsListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ProximityPlacementGroupsListBySubscriptionQueryParam {
  queryParameters: ProximityPlacementGroupsListBySubscriptionQueryParamProperties;
}

export type ProximityPlacementGroupsListBySubscriptionParameters =
  ProximityPlacementGroupsListBySubscriptionQueryParam & RequestParameters;

export interface ProximityPlacementGroupsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ProximityPlacementGroupsListByResourceGroupQueryParam {
  queryParameters: ProximityPlacementGroupsListByResourceGroupQueryParamProperties;
}

export type ProximityPlacementGroupsListByResourceGroupParameters =
  ProximityPlacementGroupsListByResourceGroupQueryParam & RequestParameters;

export interface DedicatedHostGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Dedicated Host Group. */
  body: DedicatedHostGroup;
}

export interface DedicatedHostGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostGroupsCreateOrUpdateQueryParam {
  queryParameters: DedicatedHostGroupsCreateOrUpdateQueryParamProperties;
}

export interface DedicatedHostGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DedicatedHostGroupsCreateOrUpdateParameters =
  DedicatedHostGroupsCreateOrUpdateQueryParam &
    DedicatedHostGroupsCreateOrUpdateMediaTypesParam &
    DedicatedHostGroupsCreateOrUpdateBodyParam &
    RequestParameters;

export interface DedicatedHostGroupsUpdateBodyParam {
  /** Parameters supplied to the Update Dedicated Host Group operation. */
  body: DedicatedHostGroupUpdate;
}

export interface DedicatedHostGroupsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostGroupsUpdateQueryParam {
  queryParameters: DedicatedHostGroupsUpdateQueryParamProperties;
}

export interface DedicatedHostGroupsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DedicatedHostGroupsUpdateParameters = DedicatedHostGroupsUpdateQueryParam &
  DedicatedHostGroupsUpdateMediaTypesParam &
  DedicatedHostGroupsUpdateBodyParam &
  RequestParameters;

export interface DedicatedHostGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostGroupsDeleteQueryParam {
  queryParameters: DedicatedHostGroupsDeleteQueryParamProperties;
}

export type DedicatedHostGroupsDeleteParameters = DedicatedHostGroupsDeleteQueryParam &
  RequestParameters;

export interface DedicatedHostGroupsGetQueryParamProperties {
  /** The expand expression to apply on the operation. 'InstanceView' will retrieve the list of instance views of the dedicated hosts under the dedicated host group. 'UserData' is not supported for dedicated host group. */
  $expand?: "instanceView" | "userData";
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostGroupsGetQueryParam {
  queryParameters: DedicatedHostGroupsGetQueryParamProperties;
}

export type DedicatedHostGroupsGetParameters = DedicatedHostGroupsGetQueryParam & RequestParameters;

export interface DedicatedHostGroupsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostGroupsListByResourceGroupQueryParam {
  queryParameters: DedicatedHostGroupsListByResourceGroupQueryParamProperties;
}

export type DedicatedHostGroupsListByResourceGroupParameters =
  DedicatedHostGroupsListByResourceGroupQueryParam & RequestParameters;

export interface DedicatedHostGroupsListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostGroupsListBySubscriptionQueryParam {
  queryParameters: DedicatedHostGroupsListBySubscriptionQueryParamProperties;
}

export type DedicatedHostGroupsListBySubscriptionParameters =
  DedicatedHostGroupsListBySubscriptionQueryParam & RequestParameters;

export interface DedicatedHostsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Dedicated Host. */
  body: DedicatedHost;
}

export interface DedicatedHostsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostsCreateOrUpdateQueryParam {
  queryParameters: DedicatedHostsCreateOrUpdateQueryParamProperties;
}

export interface DedicatedHostsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DedicatedHostsCreateOrUpdateParameters = DedicatedHostsCreateOrUpdateQueryParam &
  DedicatedHostsCreateOrUpdateMediaTypesParam &
  DedicatedHostsCreateOrUpdateBodyParam &
  RequestParameters;

export interface DedicatedHostsUpdateBodyParam {
  /** Parameters supplied to the Update Dedicated Host operation. */
  body: DedicatedHostUpdate;
}

export interface DedicatedHostsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostsUpdateQueryParam {
  queryParameters: DedicatedHostsUpdateQueryParamProperties;
}

export interface DedicatedHostsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DedicatedHostsUpdateParameters = DedicatedHostsUpdateQueryParam &
  DedicatedHostsUpdateMediaTypesParam &
  DedicatedHostsUpdateBodyParam &
  RequestParameters;

export interface DedicatedHostsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostsDeleteQueryParam {
  queryParameters: DedicatedHostsDeleteQueryParamProperties;
}

export type DedicatedHostsDeleteParameters = DedicatedHostsDeleteQueryParam & RequestParameters;

export interface DedicatedHostsGetQueryParamProperties {
  /** The expand expression to apply on the operation. 'InstanceView' will retrieve the list of instance views of the dedicated host. 'UserData' is not supported for dedicated host. */
  $expand?: "instanceView" | "userData";
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostsGetQueryParam {
  queryParameters: DedicatedHostsGetQueryParamProperties;
}

export type DedicatedHostsGetParameters = DedicatedHostsGetQueryParam & RequestParameters;

export interface DedicatedHostsListByHostGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostsListByHostGroupQueryParam {
  queryParameters: DedicatedHostsListByHostGroupQueryParamProperties;
}

export type DedicatedHostsListByHostGroupParameters = DedicatedHostsListByHostGroupQueryParam &
  RequestParameters;

export interface DedicatedHostsRestartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface DedicatedHostsRestartQueryParam {
  queryParameters: DedicatedHostsRestartQueryParamProperties;
}

export type DedicatedHostsRestartParameters = DedicatedHostsRestartQueryParam & RequestParameters;

export interface SshPublicKeysListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface SshPublicKeysListBySubscriptionQueryParam {
  queryParameters: SshPublicKeysListBySubscriptionQueryParamProperties;
}

export type SshPublicKeysListBySubscriptionParameters = SshPublicKeysListBySubscriptionQueryParam &
  RequestParameters;

export interface SshPublicKeysListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface SshPublicKeysListByResourceGroupQueryParam {
  queryParameters: SshPublicKeysListByResourceGroupQueryParamProperties;
}

export type SshPublicKeysListByResourceGroupParameters =
  SshPublicKeysListByResourceGroupQueryParam & RequestParameters;

export interface SshPublicKeysCreateBodyParam {
  /** Parameters supplied to create the SSH public key. */
  body: SshPublicKeyResource;
}

export interface SshPublicKeysCreateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface SshPublicKeysCreateQueryParam {
  queryParameters: SshPublicKeysCreateQueryParamProperties;
}

export interface SshPublicKeysCreateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SshPublicKeysCreateParameters = SshPublicKeysCreateQueryParam &
  SshPublicKeysCreateMediaTypesParam &
  SshPublicKeysCreateBodyParam &
  RequestParameters;

export interface SshPublicKeysUpdateBodyParam {
  /** Parameters supplied to update the SSH public key. */
  body: SshPublicKeyUpdateResource;
}

export interface SshPublicKeysUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface SshPublicKeysUpdateQueryParam {
  queryParameters: SshPublicKeysUpdateQueryParamProperties;
}

export interface SshPublicKeysUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SshPublicKeysUpdateParameters = SshPublicKeysUpdateQueryParam &
  SshPublicKeysUpdateMediaTypesParam &
  SshPublicKeysUpdateBodyParam &
  RequestParameters;

export interface SshPublicKeysDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface SshPublicKeysDeleteQueryParam {
  queryParameters: SshPublicKeysDeleteQueryParamProperties;
}

export type SshPublicKeysDeleteParameters = SshPublicKeysDeleteQueryParam & RequestParameters;

export interface SshPublicKeysGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface SshPublicKeysGetQueryParam {
  queryParameters: SshPublicKeysGetQueryParamProperties;
}

export type SshPublicKeysGetParameters = SshPublicKeysGetQueryParam & RequestParameters;

export interface SshPublicKeysGenerateKeyPairQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface SshPublicKeysGenerateKeyPairQueryParam {
  queryParameters: SshPublicKeysGenerateKeyPairQueryParamProperties;
}

export type SshPublicKeysGenerateKeyPairParameters = SshPublicKeysGenerateKeyPairQueryParam &
  RequestParameters;

export interface ImagesCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Image operation. */
  body: Image;
}

export interface ImagesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ImagesCreateOrUpdateQueryParam {
  queryParameters: ImagesCreateOrUpdateQueryParamProperties;
}

export interface ImagesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ImagesCreateOrUpdateParameters = ImagesCreateOrUpdateQueryParam &
  ImagesCreateOrUpdateMediaTypesParam &
  ImagesCreateOrUpdateBodyParam &
  RequestParameters;

export interface ImagesUpdateBodyParam {
  /** Parameters supplied to the Update Image operation. */
  body: ImageUpdate;
}

export interface ImagesUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ImagesUpdateQueryParam {
  queryParameters: ImagesUpdateQueryParamProperties;
}

export interface ImagesUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ImagesUpdateParameters = ImagesUpdateQueryParam &
  ImagesUpdateMediaTypesParam &
  ImagesUpdateBodyParam &
  RequestParameters;

export interface ImagesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ImagesDeleteQueryParam {
  queryParameters: ImagesDeleteQueryParamProperties;
}

export type ImagesDeleteParameters = ImagesDeleteQueryParam & RequestParameters;

export interface ImagesGetQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ImagesGetQueryParam {
  queryParameters: ImagesGetQueryParamProperties;
}

export type ImagesGetParameters = ImagesGetQueryParam & RequestParameters;

export interface ImagesListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ImagesListByResourceGroupQueryParam {
  queryParameters: ImagesListByResourceGroupQueryParamProperties;
}

export type ImagesListByResourceGroupParameters = ImagesListByResourceGroupQueryParam &
  RequestParameters;

export interface ImagesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface ImagesListQueryParam {
  queryParameters: ImagesListQueryParamProperties;
}

export type ImagesListParameters = ImagesListQueryParam & RequestParameters;

export interface RestorePointCollectionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create or Update restore point collection operation. */
  body: RestorePointCollection;
}

export interface RestorePointCollectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface RestorePointCollectionsCreateOrUpdateQueryParam {
  queryParameters: RestorePointCollectionsCreateOrUpdateQueryParamProperties;
}

export interface RestorePointCollectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RestorePointCollectionsCreateOrUpdateParameters =
  RestorePointCollectionsCreateOrUpdateQueryParam &
    RestorePointCollectionsCreateOrUpdateMediaTypesParam &
    RestorePointCollectionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface RestorePointCollectionsUpdateBodyParam {
  /** Parameters supplied to the Update restore point collection operation. */
  body: RestorePointCollectionUpdate;
}

export interface RestorePointCollectionsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface RestorePointCollectionsUpdateQueryParam {
  queryParameters: RestorePointCollectionsUpdateQueryParamProperties;
}

export interface RestorePointCollectionsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RestorePointCollectionsUpdateParameters = RestorePointCollectionsUpdateQueryParam &
  RestorePointCollectionsUpdateMediaTypesParam &
  RestorePointCollectionsUpdateBodyParam &
  RequestParameters;

export interface RestorePointCollectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface RestorePointCollectionsDeleteQueryParam {
  queryParameters: RestorePointCollectionsDeleteQueryParamProperties;
}

export type RestorePointCollectionsDeleteParameters = RestorePointCollectionsDeleteQueryParam &
  RequestParameters;

export interface RestorePointCollectionsGetQueryParamProperties {
  /** The expand expression to apply on the operation. If expand=restorePoints, server will return all contained restore points in the restorePointCollection. */
  $expand?: "restorePoints";
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface RestorePointCollectionsGetQueryParam {
  queryParameters: RestorePointCollectionsGetQueryParamProperties;
}

export type RestorePointCollectionsGetParameters = RestorePointCollectionsGetQueryParam &
  RequestParameters;

export interface RestorePointCollectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface RestorePointCollectionsListQueryParam {
  queryParameters: RestorePointCollectionsListQueryParamProperties;
}

export type RestorePointCollectionsListParameters = RestorePointCollectionsListQueryParam &
  RequestParameters;

export interface RestorePointCollectionsListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface RestorePointCollectionsListAllQueryParam {
  queryParameters: RestorePointCollectionsListAllQueryParamProperties;
}

export type RestorePointCollectionsListAllParameters = RestorePointCollectionsListAllQueryParam &
  RequestParameters;

export interface RestorePointsCreateBodyParam {
  /** Parameters supplied to the Create restore point operation. */
  body: RestorePoint;
}

export interface RestorePointsCreateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface RestorePointsCreateQueryParam {
  queryParameters: RestorePointsCreateQueryParamProperties;
}

export interface RestorePointsCreateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RestorePointsCreateParameters = RestorePointsCreateQueryParam &
  RestorePointsCreateMediaTypesParam &
  RestorePointsCreateBodyParam &
  RequestParameters;

export interface RestorePointsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface RestorePointsDeleteQueryParam {
  queryParameters: RestorePointsDeleteQueryParamProperties;
}

export type RestorePointsDeleteParameters = RestorePointsDeleteQueryParam & RequestParameters;

export interface RestorePointsGetQueryParamProperties {
  /** The expand expression to apply on the operation. 'InstanceView' retrieves information about the run-time state of a restore point. */
  $expand?: "instanceView";
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface RestorePointsGetQueryParam {
  queryParameters: RestorePointsGetQueryParamProperties;
}

export type RestorePointsGetParameters = RestorePointsGetQueryParam & RequestParameters;

export interface CapacityReservationGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create capacity reservation Group. */
  body: CapacityReservationGroup;
}

export interface CapacityReservationGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface CapacityReservationGroupsCreateOrUpdateQueryParam {
  queryParameters: CapacityReservationGroupsCreateOrUpdateQueryParamProperties;
}

export interface CapacityReservationGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CapacityReservationGroupsCreateOrUpdateParameters =
  CapacityReservationGroupsCreateOrUpdateQueryParam &
    CapacityReservationGroupsCreateOrUpdateMediaTypesParam &
    CapacityReservationGroupsCreateOrUpdateBodyParam &
    RequestParameters;

export interface CapacityReservationGroupsUpdateBodyParam {
  /** Parameters supplied to the Update capacity reservation Group operation. */
  body: CapacityReservationGroupUpdate;
}

export interface CapacityReservationGroupsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface CapacityReservationGroupsUpdateQueryParam {
  queryParameters: CapacityReservationGroupsUpdateQueryParamProperties;
}

export interface CapacityReservationGroupsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CapacityReservationGroupsUpdateParameters = CapacityReservationGroupsUpdateQueryParam &
  CapacityReservationGroupsUpdateMediaTypesParam &
  CapacityReservationGroupsUpdateBodyParam &
  RequestParameters;

export interface CapacityReservationGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface CapacityReservationGroupsDeleteQueryParam {
  queryParameters: CapacityReservationGroupsDeleteQueryParamProperties;
}

export type CapacityReservationGroupsDeleteParameters = CapacityReservationGroupsDeleteQueryParam &
  RequestParameters;

export interface CapacityReservationGroupsGetQueryParamProperties {
  /** The expand expression to apply on the operation. 'InstanceView' will retrieve the list of instance views of the capacity reservations under the capacity reservation group which is a snapshot of the runtime properties of a capacity reservation that is managed by the platform and can change outside of control plane operations. */
  $expand?: "instanceView";
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface CapacityReservationGroupsGetQueryParam {
  queryParameters: CapacityReservationGroupsGetQueryParamProperties;
}

export type CapacityReservationGroupsGetParameters = CapacityReservationGroupsGetQueryParam &
  RequestParameters;

export interface CapacityReservationGroupsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
  /** The expand expression to apply on the operation. Based on the expand param(s) specified we return Virtual Machine or ScaleSet VM Instance or both resource Ids which are associated to capacity reservation group in the response. */
  $expand?: "virtualMachineScaleSetVMs/$ref" | "virtualMachines/$ref";
}

export interface CapacityReservationGroupsListByResourceGroupQueryParam {
  queryParameters: CapacityReservationGroupsListByResourceGroupQueryParamProperties;
}

export type CapacityReservationGroupsListByResourceGroupParameters =
  CapacityReservationGroupsListByResourceGroupQueryParam & RequestParameters;

export interface CapacityReservationGroupsListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
  /** The expand expression to apply on the operation. Based on the expand param(s) specified we return Virtual Machine or ScaleSet VM Instance or both resource Ids which are associated to capacity reservation group in the response. */
  $expand?: "virtualMachineScaleSetVMs/$ref" | "virtualMachines/$ref";
}

export interface CapacityReservationGroupsListBySubscriptionQueryParam {
  queryParameters: CapacityReservationGroupsListBySubscriptionQueryParamProperties;
}

export type CapacityReservationGroupsListBySubscriptionParameters =
  CapacityReservationGroupsListBySubscriptionQueryParam & RequestParameters;

export interface CapacityReservationsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create capacity reservation. */
  body: CapacityReservation;
}

export interface CapacityReservationsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface CapacityReservationsCreateOrUpdateQueryParam {
  queryParameters: CapacityReservationsCreateOrUpdateQueryParamProperties;
}

export interface CapacityReservationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CapacityReservationsCreateOrUpdateParameters =
  CapacityReservationsCreateOrUpdateQueryParam &
    CapacityReservationsCreateOrUpdateMediaTypesParam &
    CapacityReservationsCreateOrUpdateBodyParam &
    RequestParameters;

export interface CapacityReservationsUpdateBodyParam {
  /** Parameters supplied to the Update capacity reservation operation. */
  body: CapacityReservationUpdate;
}

export interface CapacityReservationsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface CapacityReservationsUpdateQueryParam {
  queryParameters: CapacityReservationsUpdateQueryParamProperties;
}

export interface CapacityReservationsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CapacityReservationsUpdateParameters = CapacityReservationsUpdateQueryParam &
  CapacityReservationsUpdateMediaTypesParam &
  CapacityReservationsUpdateBodyParam &
  RequestParameters;

export interface CapacityReservationsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface CapacityReservationsDeleteQueryParam {
  queryParameters: CapacityReservationsDeleteQueryParamProperties;
}

export type CapacityReservationsDeleteParameters = CapacityReservationsDeleteQueryParam &
  RequestParameters;

export interface CapacityReservationsGetQueryParamProperties {
  /** The expand expression to apply on the operation. 'InstanceView' retrieves a snapshot of the runtime properties of the capacity reservation that is managed by the platform and can change outside of control plane operations. */
  $expand?: "instanceView";
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface CapacityReservationsGetQueryParam {
  queryParameters: CapacityReservationsGetQueryParamProperties;
}

export type CapacityReservationsGetParameters = CapacityReservationsGetQueryParam &
  RequestParameters;

export interface CapacityReservationsListByCapacityReservationGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface CapacityReservationsListByCapacityReservationGroupQueryParam {
  queryParameters: CapacityReservationsListByCapacityReservationGroupQueryParamProperties;
}

export type CapacityReservationsListByCapacityReservationGroupParameters =
  CapacityReservationsListByCapacityReservationGroupQueryParam & RequestParameters;

export interface LogAnalyticsExportRequestRateByIntervalBodyParam {
  /** Parameters supplied to the LogAnalytics getRequestRateByInterval Api. */
  body: RequestRateByIntervalInput;
}

export interface LogAnalyticsExportRequestRateByIntervalQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface LogAnalyticsExportRequestRateByIntervalQueryParam {
  queryParameters: LogAnalyticsExportRequestRateByIntervalQueryParamProperties;
}

export interface LogAnalyticsExportRequestRateByIntervalMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LogAnalyticsExportRequestRateByIntervalParameters =
  LogAnalyticsExportRequestRateByIntervalQueryParam &
    LogAnalyticsExportRequestRateByIntervalMediaTypesParam &
    LogAnalyticsExportRequestRateByIntervalBodyParam &
    RequestParameters;

export interface LogAnalyticsExportThrottledRequestsBodyParam {
  /** Parameters supplied to the LogAnalytics getThrottledRequests Api. */
  body: ThrottledRequestsInput;
}

export interface LogAnalyticsExportThrottledRequestsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface LogAnalyticsExportThrottledRequestsQueryParam {
  queryParameters: LogAnalyticsExportThrottledRequestsQueryParamProperties;
}

export interface LogAnalyticsExportThrottledRequestsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LogAnalyticsExportThrottledRequestsParameters =
  LogAnalyticsExportThrottledRequestsQueryParam &
    LogAnalyticsExportThrottledRequestsMediaTypesParam &
    LogAnalyticsExportThrottledRequestsBodyParam &
    RequestParameters;

export interface VirtualMachineRunCommandsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineRunCommandsListQueryParam {
  queryParameters: VirtualMachineRunCommandsListQueryParamProperties;
}

export type VirtualMachineRunCommandsListParameters = VirtualMachineRunCommandsListQueryParam &
  RequestParameters;

export interface VirtualMachineRunCommandsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineRunCommandsGetQueryParam {
  queryParameters: VirtualMachineRunCommandsGetQueryParamProperties;
}

export type VirtualMachineRunCommandsGetParameters = VirtualMachineRunCommandsGetQueryParam &
  RequestParameters;

export interface VirtualMachineRunCommandsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Virtual Machine RunCommand operation. */
  body: VirtualMachineRunCommand;
}

export interface VirtualMachineRunCommandsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineRunCommandsCreateOrUpdateQueryParam {
  queryParameters: VirtualMachineRunCommandsCreateOrUpdateQueryParamProperties;
}

export interface VirtualMachineRunCommandsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "text/json";
}

export type VirtualMachineRunCommandsCreateOrUpdateParameters =
  VirtualMachineRunCommandsCreateOrUpdateQueryParam &
    VirtualMachineRunCommandsCreateOrUpdateMediaTypesParam &
    VirtualMachineRunCommandsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualMachineRunCommandsUpdateBodyParam {
  /** Parameters supplied to the Update Virtual Machine RunCommand operation. */
  body: VirtualMachineRunCommandUpdate;
}

export interface VirtualMachineRunCommandsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineRunCommandsUpdateQueryParam {
  queryParameters: VirtualMachineRunCommandsUpdateQueryParamProperties;
}

export interface VirtualMachineRunCommandsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "text/json";
}

export type VirtualMachineRunCommandsUpdateParameters = VirtualMachineRunCommandsUpdateQueryParam &
  VirtualMachineRunCommandsUpdateMediaTypesParam &
  VirtualMachineRunCommandsUpdateBodyParam &
  RequestParameters;

export interface VirtualMachineRunCommandsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineRunCommandsDeleteQueryParam {
  queryParameters: VirtualMachineRunCommandsDeleteQueryParamProperties;
}

export type VirtualMachineRunCommandsDeleteParameters = VirtualMachineRunCommandsDeleteQueryParam &
  RequestParameters;

export interface VirtualMachineRunCommandsGetByVirtualMachineQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineRunCommandsGetByVirtualMachineQueryParam {
  queryParameters: VirtualMachineRunCommandsGetByVirtualMachineQueryParamProperties;
}

export type VirtualMachineRunCommandsGetByVirtualMachineParameters =
  VirtualMachineRunCommandsGetByVirtualMachineQueryParam & RequestParameters;

export interface VirtualMachineRunCommandsListByVirtualMachineQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineRunCommandsListByVirtualMachineQueryParam {
  queryParameters: VirtualMachineRunCommandsListByVirtualMachineQueryParamProperties;
}

export type VirtualMachineRunCommandsListByVirtualMachineParameters =
  VirtualMachineRunCommandsListByVirtualMachineQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMRunCommandsCreateOrUpdateBodyParam {
  /** Parameters supplied to the Create Virtual Machine RunCommand operation. */
  body: VirtualMachineRunCommand;
}

export interface VirtualMachineScaleSetVMRunCommandsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMRunCommandsCreateOrUpdateQueryParam {
  queryParameters: VirtualMachineScaleSetVMRunCommandsCreateOrUpdateQueryParamProperties;
}

export interface VirtualMachineScaleSetVMRunCommandsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "text/json";
}

export type VirtualMachineScaleSetVMRunCommandsCreateOrUpdateParameters =
  VirtualMachineScaleSetVMRunCommandsCreateOrUpdateQueryParam &
    VirtualMachineScaleSetVMRunCommandsCreateOrUpdateMediaTypesParam &
    VirtualMachineScaleSetVMRunCommandsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetVMRunCommandsUpdateBodyParam {
  /** Parameters supplied to the Update Virtual Machine RunCommand operation. */
  body: VirtualMachineRunCommandUpdate;
}

export interface VirtualMachineScaleSetVMRunCommandsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMRunCommandsUpdateQueryParam {
  queryParameters: VirtualMachineScaleSetVMRunCommandsUpdateQueryParamProperties;
}

export interface VirtualMachineScaleSetVMRunCommandsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "text/json";
}

export type VirtualMachineScaleSetVMRunCommandsUpdateParameters =
  VirtualMachineScaleSetVMRunCommandsUpdateQueryParam &
    VirtualMachineScaleSetVMRunCommandsUpdateMediaTypesParam &
    VirtualMachineScaleSetVMRunCommandsUpdateBodyParam &
    RequestParameters;

export interface VirtualMachineScaleSetVMRunCommandsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMRunCommandsDeleteQueryParam {
  queryParameters: VirtualMachineScaleSetVMRunCommandsDeleteQueryParamProperties;
}

export type VirtualMachineScaleSetVMRunCommandsDeleteParameters =
  VirtualMachineScaleSetVMRunCommandsDeleteQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMRunCommandsGetQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMRunCommandsGetQueryParam {
  queryParameters: VirtualMachineScaleSetVMRunCommandsGetQueryParamProperties;
}

export type VirtualMachineScaleSetVMRunCommandsGetParameters =
  VirtualMachineScaleSetVMRunCommandsGetQueryParam & RequestParameters;

export interface VirtualMachineScaleSetVMRunCommandsListQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: string;
  /** Api Version */
  "api-version": "2022-08-01";
}

export interface VirtualMachineScaleSetVMRunCommandsListQueryParam {
  queryParameters: VirtualMachineScaleSetVMRunCommandsListQueryParamProperties;
}

export type VirtualMachineScaleSetVMRunCommandsListParameters =
  VirtualMachineScaleSetVMRunCommandsListQueryParam & RequestParameters;

export interface DisksCreateOrUpdateBodyParam {
  /** Disk object supplied in the body of the Put disk operation. */
  body: Disk;
}

export interface DisksCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DisksCreateOrUpdateQueryParam {
  queryParameters: DisksCreateOrUpdateQueryParamProperties;
}

export interface DisksCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DisksCreateOrUpdateParameters = DisksCreateOrUpdateQueryParam &
  DisksCreateOrUpdateMediaTypesParam &
  DisksCreateOrUpdateBodyParam &
  RequestParameters;

export interface DisksUpdateBodyParam {
  /** Disk object supplied in the body of the Patch disk operation. */
  body: DiskUpdate;
}

export interface DisksUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DisksUpdateQueryParam {
  queryParameters: DisksUpdateQueryParamProperties;
}

export interface DisksUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DisksUpdateParameters = DisksUpdateQueryParam &
  DisksUpdateMediaTypesParam &
  DisksUpdateBodyParam &
  RequestParameters;

export interface DisksGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DisksGetQueryParam {
  queryParameters: DisksGetQueryParamProperties;
}

export type DisksGetParameters = DisksGetQueryParam & RequestParameters;

export interface DisksDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DisksDeleteQueryParam {
  queryParameters: DisksDeleteQueryParamProperties;
}

export type DisksDeleteParameters = DisksDeleteQueryParam & RequestParameters;

export interface DisksListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DisksListByResourceGroupQueryParam {
  queryParameters: DisksListByResourceGroupQueryParamProperties;
}

export type DisksListByResourceGroupParameters = DisksListByResourceGroupQueryParam &
  RequestParameters;

export interface DisksListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DisksListQueryParam {
  queryParameters: DisksListQueryParamProperties;
}

export type DisksListParameters = DisksListQueryParam & RequestParameters;

export interface DisksGrantAccessBodyParam {
  /** Access data object supplied in the body of the get disk access operation. */
  body: GrantAccessData;
}

export interface DisksGrantAccessQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DisksGrantAccessQueryParam {
  queryParameters: DisksGrantAccessQueryParamProperties;
}

export interface DisksGrantAccessMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DisksGrantAccessParameters = DisksGrantAccessQueryParam &
  DisksGrantAccessMediaTypesParam &
  DisksGrantAccessBodyParam &
  RequestParameters;

export interface DisksRevokeAccessQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DisksRevokeAccessQueryParam {
  queryParameters: DisksRevokeAccessQueryParamProperties;
}

export type DisksRevokeAccessParameters = DisksRevokeAccessQueryParam & RequestParameters;

export interface DiskAccessesCreateOrUpdateBodyParam {
  /** disk access object supplied in the body of the Put disk access operation. */
  body: DiskAccess;
}

export interface DiskAccessesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesCreateOrUpdateQueryParam {
  queryParameters: DiskAccessesCreateOrUpdateQueryParamProperties;
}

export interface DiskAccessesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiskAccessesCreateOrUpdateParameters = DiskAccessesCreateOrUpdateQueryParam &
  DiskAccessesCreateOrUpdateMediaTypesParam &
  DiskAccessesCreateOrUpdateBodyParam &
  RequestParameters;

export interface DiskAccessesUpdateBodyParam {
  /** disk access object supplied in the body of the Patch disk access operation. */
  body: DiskAccessUpdate;
}

export interface DiskAccessesUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesUpdateQueryParam {
  queryParameters: DiskAccessesUpdateQueryParamProperties;
}

export interface DiskAccessesUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiskAccessesUpdateParameters = DiskAccessesUpdateQueryParam &
  DiskAccessesUpdateMediaTypesParam &
  DiskAccessesUpdateBodyParam &
  RequestParameters;

export interface DiskAccessesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesGetQueryParam {
  queryParameters: DiskAccessesGetQueryParamProperties;
}

export type DiskAccessesGetParameters = DiskAccessesGetQueryParam & RequestParameters;

export interface DiskAccessesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesDeleteQueryParam {
  queryParameters: DiskAccessesDeleteQueryParamProperties;
}

export type DiskAccessesDeleteParameters = DiskAccessesDeleteQueryParam & RequestParameters;

export interface DiskAccessesListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesListByResourceGroupQueryParam {
  queryParameters: DiskAccessesListByResourceGroupQueryParamProperties;
}

export type DiskAccessesListByResourceGroupParameters = DiskAccessesListByResourceGroupQueryParam &
  RequestParameters;

export interface DiskAccessesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesListQueryParam {
  queryParameters: DiskAccessesListQueryParamProperties;
}

export type DiskAccessesListParameters = DiskAccessesListQueryParam & RequestParameters;

export interface DiskAccessesGetPrivateLinkResourcesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesGetPrivateLinkResourcesQueryParam {
  queryParameters: DiskAccessesGetPrivateLinkResourcesQueryParamProperties;
}

export type DiskAccessesGetPrivateLinkResourcesParameters =
  DiskAccessesGetPrivateLinkResourcesQueryParam & RequestParameters;

export interface DiskAccessesUpdateAPrivateEndpointConnectionBodyParam {
  /** private endpoint connection object supplied in the body of the Put private endpoint connection operation. */
  body: PrivateEndpointConnection;
}

export interface DiskAccessesUpdateAPrivateEndpointConnectionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesUpdateAPrivateEndpointConnectionQueryParam {
  queryParameters: DiskAccessesUpdateAPrivateEndpointConnectionQueryParamProperties;
}

export interface DiskAccessesUpdateAPrivateEndpointConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiskAccessesUpdateAPrivateEndpointConnectionParameters =
  DiskAccessesUpdateAPrivateEndpointConnectionQueryParam &
    DiskAccessesUpdateAPrivateEndpointConnectionMediaTypesParam &
    DiskAccessesUpdateAPrivateEndpointConnectionBodyParam &
    RequestParameters;

export interface DiskAccessesGetAPrivateEndpointConnectionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesGetAPrivateEndpointConnectionQueryParam {
  queryParameters: DiskAccessesGetAPrivateEndpointConnectionQueryParamProperties;
}

export type DiskAccessesGetAPrivateEndpointConnectionParameters =
  DiskAccessesGetAPrivateEndpointConnectionQueryParam & RequestParameters;

export interface DiskAccessesDeleteAPrivateEndpointConnectionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesDeleteAPrivateEndpointConnectionQueryParam {
  queryParameters: DiskAccessesDeleteAPrivateEndpointConnectionQueryParamProperties;
}

export type DiskAccessesDeleteAPrivateEndpointConnectionParameters =
  DiskAccessesDeleteAPrivateEndpointConnectionQueryParam & RequestParameters;

export interface DiskAccessesListPrivateEndpointConnectionsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskAccessesListPrivateEndpointConnectionsQueryParam {
  queryParameters: DiskAccessesListPrivateEndpointConnectionsQueryParamProperties;
}

export type DiskAccessesListPrivateEndpointConnectionsParameters =
  DiskAccessesListPrivateEndpointConnectionsQueryParam & RequestParameters;

export interface DiskEncryptionSetsCreateOrUpdateBodyParam {
  /** disk encryption set object supplied in the body of the Put disk encryption set operation. */
  body: DiskEncryptionSet;
}

export interface DiskEncryptionSetsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskEncryptionSetsCreateOrUpdateQueryParam {
  queryParameters: DiskEncryptionSetsCreateOrUpdateQueryParamProperties;
}

export interface DiskEncryptionSetsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiskEncryptionSetsCreateOrUpdateParameters =
  DiskEncryptionSetsCreateOrUpdateQueryParam &
    DiskEncryptionSetsCreateOrUpdateMediaTypesParam &
    DiskEncryptionSetsCreateOrUpdateBodyParam &
    RequestParameters;

export interface DiskEncryptionSetsUpdateBodyParam {
  /** disk encryption set object supplied in the body of the Patch disk encryption set operation. */
  body: DiskEncryptionSetUpdate;
}

export interface DiskEncryptionSetsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskEncryptionSetsUpdateQueryParam {
  queryParameters: DiskEncryptionSetsUpdateQueryParamProperties;
}

export interface DiskEncryptionSetsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiskEncryptionSetsUpdateParameters = DiskEncryptionSetsUpdateQueryParam &
  DiskEncryptionSetsUpdateMediaTypesParam &
  DiskEncryptionSetsUpdateBodyParam &
  RequestParameters;

export interface DiskEncryptionSetsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskEncryptionSetsGetQueryParam {
  queryParameters: DiskEncryptionSetsGetQueryParamProperties;
}

export type DiskEncryptionSetsGetParameters = DiskEncryptionSetsGetQueryParam & RequestParameters;

export interface DiskEncryptionSetsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskEncryptionSetsDeleteQueryParam {
  queryParameters: DiskEncryptionSetsDeleteQueryParamProperties;
}

export type DiskEncryptionSetsDeleteParameters = DiskEncryptionSetsDeleteQueryParam &
  RequestParameters;

export interface DiskEncryptionSetsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskEncryptionSetsListByResourceGroupQueryParam {
  queryParameters: DiskEncryptionSetsListByResourceGroupQueryParamProperties;
}

export type DiskEncryptionSetsListByResourceGroupParameters =
  DiskEncryptionSetsListByResourceGroupQueryParam & RequestParameters;

export interface DiskEncryptionSetsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskEncryptionSetsListQueryParam {
  queryParameters: DiskEncryptionSetsListQueryParamProperties;
}

export type DiskEncryptionSetsListParameters = DiskEncryptionSetsListQueryParam & RequestParameters;

export interface DiskEncryptionSetsListAssociatedResourcesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskEncryptionSetsListAssociatedResourcesQueryParam {
  queryParameters: DiskEncryptionSetsListAssociatedResourcesQueryParamProperties;
}

export type DiskEncryptionSetsListAssociatedResourcesParameters =
  DiskEncryptionSetsListAssociatedResourcesQueryParam & RequestParameters;

export interface DiskRestorePointGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskRestorePointGetQueryParam {
  queryParameters: DiskRestorePointGetQueryParamProperties;
}

export type DiskRestorePointGetParameters = DiskRestorePointGetQueryParam & RequestParameters;

export interface DiskRestorePointListByRestorePointQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskRestorePointListByRestorePointQueryParam {
  queryParameters: DiskRestorePointListByRestorePointQueryParamProperties;
}

export type DiskRestorePointListByRestorePointParameters =
  DiskRestorePointListByRestorePointQueryParam & RequestParameters;

export interface DiskRestorePointGrantAccessBodyParam {
  /** Access data object supplied in the body of the get disk access operation. */
  body: GrantAccessData;
}

export interface DiskRestorePointGrantAccessQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskRestorePointGrantAccessQueryParam {
  queryParameters: DiskRestorePointGrantAccessQueryParamProperties;
}

export interface DiskRestorePointGrantAccessMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiskRestorePointGrantAccessParameters = DiskRestorePointGrantAccessQueryParam &
  DiskRestorePointGrantAccessMediaTypesParam &
  DiskRestorePointGrantAccessBodyParam &
  RequestParameters;

export interface DiskRestorePointRevokeAccessQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface DiskRestorePointRevokeAccessQueryParam {
  queryParameters: DiskRestorePointRevokeAccessQueryParamProperties;
}

export type DiskRestorePointRevokeAccessParameters = DiskRestorePointRevokeAccessQueryParam &
  RequestParameters;

export interface SnapshotsCreateOrUpdateBodyParam {
  /** Snapshot object supplied in the body of the Put disk operation. */
  body: Snapshot;
}

export interface SnapshotsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface SnapshotsCreateOrUpdateQueryParam {
  queryParameters: SnapshotsCreateOrUpdateQueryParamProperties;
}

export interface SnapshotsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SnapshotsCreateOrUpdateParameters = SnapshotsCreateOrUpdateQueryParam &
  SnapshotsCreateOrUpdateMediaTypesParam &
  SnapshotsCreateOrUpdateBodyParam &
  RequestParameters;

export interface SnapshotsUpdateBodyParam {
  /** Snapshot object supplied in the body of the Patch snapshot operation. */
  body: SnapshotUpdate;
}

export interface SnapshotsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface SnapshotsUpdateQueryParam {
  queryParameters: SnapshotsUpdateQueryParamProperties;
}

export interface SnapshotsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SnapshotsUpdateParameters = SnapshotsUpdateQueryParam &
  SnapshotsUpdateMediaTypesParam &
  SnapshotsUpdateBodyParam &
  RequestParameters;

export interface SnapshotsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface SnapshotsGetQueryParam {
  queryParameters: SnapshotsGetQueryParamProperties;
}

export type SnapshotsGetParameters = SnapshotsGetQueryParam & RequestParameters;

export interface SnapshotsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface SnapshotsDeleteQueryParam {
  queryParameters: SnapshotsDeleteQueryParamProperties;
}

export type SnapshotsDeleteParameters = SnapshotsDeleteQueryParam & RequestParameters;

export interface SnapshotsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface SnapshotsListByResourceGroupQueryParam {
  queryParameters: SnapshotsListByResourceGroupQueryParamProperties;
}

export type SnapshotsListByResourceGroupParameters = SnapshotsListByResourceGroupQueryParam &
  RequestParameters;

export interface SnapshotsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface SnapshotsListQueryParam {
  queryParameters: SnapshotsListQueryParamProperties;
}

export type SnapshotsListParameters = SnapshotsListQueryParam & RequestParameters;

export interface SnapshotsGrantAccessBodyParam {
  /** Access data object supplied in the body of the get snapshot access operation. */
  body: GrantAccessData;
}

export interface SnapshotsGrantAccessQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface SnapshotsGrantAccessQueryParam {
  queryParameters: SnapshotsGrantAccessQueryParamProperties;
}

export interface SnapshotsGrantAccessMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SnapshotsGrantAccessParameters = SnapshotsGrantAccessQueryParam &
  SnapshotsGrantAccessMediaTypesParam &
  SnapshotsGrantAccessBodyParam &
  RequestParameters;

export interface SnapshotsRevokeAccessQueryParamProperties {
  /** Api Version */
  "api-version": "2022-07-02";
}

export interface SnapshotsRevokeAccessQueryParam {
  queryParameters: SnapshotsRevokeAccessQueryParamProperties;
}

export type SnapshotsRevokeAccessParameters = SnapshotsRevokeAccessQueryParam & RequestParameters;

export interface ResourceSkusListQueryParamProperties {
  /** Api Version */
  "api-version": "2021-07-01";
  /** The filter to apply on the operation. Only **location** filter is supported currently. */
  $filter?: string;
  /** To Include Extended Locations information or not in the response. */
  includeExtendedLocations?: string;
}

export interface ResourceSkusListQueryParam {
  queryParameters: ResourceSkusListQueryParamProperties;
}

export type ResourceSkusListParameters = ResourceSkusListQueryParam & RequestParameters;

export interface GalleriesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Shared Image Gallery operation. */
  body: Gallery;
}

export interface GalleriesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleriesCreateOrUpdateQueryParam {
  queryParameters: GalleriesCreateOrUpdateQueryParamProperties;
}

export interface GalleriesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleriesCreateOrUpdateParameters = GalleriesCreateOrUpdateQueryParam &
  GalleriesCreateOrUpdateMediaTypesParam &
  GalleriesCreateOrUpdateBodyParam &
  RequestParameters;

export interface GalleriesUpdateBodyParam {
  /** Parameters supplied to the update Shared Image Gallery operation. */
  body: GalleryUpdate;
}

export interface GalleriesUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleriesUpdateQueryParam {
  queryParameters: GalleriesUpdateQueryParamProperties;
}

export interface GalleriesUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleriesUpdateParameters = GalleriesUpdateQueryParam &
  GalleriesUpdateMediaTypesParam &
  GalleriesUpdateBodyParam &
  RequestParameters;

export interface GalleriesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
  /** The select expression to apply on the operation. */
  $select?: "Permissions";
  /** The expand query option to apply on the operation. */
  $expand?: "SharingProfile/Groups";
}

export interface GalleriesGetQueryParam {
  queryParameters: GalleriesGetQueryParamProperties;
}

export type GalleriesGetParameters = GalleriesGetQueryParam & RequestParameters;

export interface GalleriesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleriesDeleteQueryParam {
  queryParameters: GalleriesDeleteQueryParamProperties;
}

export type GalleriesDeleteParameters = GalleriesDeleteQueryParam & RequestParameters;

export interface GalleriesListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleriesListByResourceGroupQueryParam {
  queryParameters: GalleriesListByResourceGroupQueryParamProperties;
}

export type GalleriesListByResourceGroupParameters = GalleriesListByResourceGroupQueryParam &
  RequestParameters;

export interface GalleriesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleriesListQueryParam {
  queryParameters: GalleriesListQueryParamProperties;
}

export type GalleriesListParameters = GalleriesListQueryParam & RequestParameters;

export interface GalleryImagesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update gallery image operation. */
  body: GalleryImage;
}

export interface GalleryImagesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImagesCreateOrUpdateQueryParam {
  queryParameters: GalleryImagesCreateOrUpdateQueryParamProperties;
}

export interface GalleryImagesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleryImagesCreateOrUpdateParameters = GalleryImagesCreateOrUpdateQueryParam &
  GalleryImagesCreateOrUpdateMediaTypesParam &
  GalleryImagesCreateOrUpdateBodyParam &
  RequestParameters;

export interface GalleryImagesUpdateBodyParam {
  /** Parameters supplied to the update gallery image operation. */
  body: GalleryImageUpdate;
}

export interface GalleryImagesUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImagesUpdateQueryParam {
  queryParameters: GalleryImagesUpdateQueryParamProperties;
}

export interface GalleryImagesUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleryImagesUpdateParameters = GalleryImagesUpdateQueryParam &
  GalleryImagesUpdateMediaTypesParam &
  GalleryImagesUpdateBodyParam &
  RequestParameters;

export interface GalleryImagesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImagesGetQueryParam {
  queryParameters: GalleryImagesGetQueryParamProperties;
}

export type GalleryImagesGetParameters = GalleryImagesGetQueryParam & RequestParameters;

export interface GalleryImagesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImagesDeleteQueryParam {
  queryParameters: GalleryImagesDeleteQueryParamProperties;
}

export type GalleryImagesDeleteParameters = GalleryImagesDeleteQueryParam & RequestParameters;

export interface GalleryImagesListByGalleryQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImagesListByGalleryQueryParam {
  queryParameters: GalleryImagesListByGalleryQueryParamProperties;
}

export type GalleryImagesListByGalleryParameters = GalleryImagesListByGalleryQueryParam &
  RequestParameters;

export interface GalleryImageVersionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update gallery image version operation. */
  body: GalleryImageVersion;
}

export interface GalleryImageVersionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImageVersionsCreateOrUpdateQueryParam {
  queryParameters: GalleryImageVersionsCreateOrUpdateQueryParamProperties;
}

export interface GalleryImageVersionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleryImageVersionsCreateOrUpdateParameters =
  GalleryImageVersionsCreateOrUpdateQueryParam &
    GalleryImageVersionsCreateOrUpdateMediaTypesParam &
    GalleryImageVersionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface GalleryImageVersionsUpdateBodyParam {
  /** Parameters supplied to the update gallery image version operation. */
  body: GalleryImageVersionUpdate;
}

export interface GalleryImageVersionsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImageVersionsUpdateQueryParam {
  queryParameters: GalleryImageVersionsUpdateQueryParamProperties;
}

export interface GalleryImageVersionsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleryImageVersionsUpdateParameters = GalleryImageVersionsUpdateQueryParam &
  GalleryImageVersionsUpdateMediaTypesParam &
  GalleryImageVersionsUpdateBodyParam &
  RequestParameters;

export interface GalleryImageVersionsGetQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: "ReplicationStatus";
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImageVersionsGetQueryParam {
  queryParameters: GalleryImageVersionsGetQueryParamProperties;
}

export type GalleryImageVersionsGetParameters = GalleryImageVersionsGetQueryParam &
  RequestParameters;

export interface GalleryImageVersionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImageVersionsDeleteQueryParam {
  queryParameters: GalleryImageVersionsDeleteQueryParamProperties;
}

export type GalleryImageVersionsDeleteParameters = GalleryImageVersionsDeleteQueryParam &
  RequestParameters;

export interface GalleryImageVersionsListByGalleryImageQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryImageVersionsListByGalleryImageQueryParam {
  queryParameters: GalleryImageVersionsListByGalleryImageQueryParamProperties;
}

export type GalleryImageVersionsListByGalleryImageParameters =
  GalleryImageVersionsListByGalleryImageQueryParam & RequestParameters;

export interface GalleryApplicationsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update gallery Application operation. */
  body: GalleryApplication;
}

export interface GalleryApplicationsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationsCreateOrUpdateQueryParam {
  queryParameters: GalleryApplicationsCreateOrUpdateQueryParamProperties;
}

export interface GalleryApplicationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleryApplicationsCreateOrUpdateParameters =
  GalleryApplicationsCreateOrUpdateQueryParam &
    GalleryApplicationsCreateOrUpdateMediaTypesParam &
    GalleryApplicationsCreateOrUpdateBodyParam &
    RequestParameters;

export interface GalleryApplicationsUpdateBodyParam {
  /** Parameters supplied to the update gallery Application operation. */
  body: GalleryApplicationUpdate;
}

export interface GalleryApplicationsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationsUpdateQueryParam {
  queryParameters: GalleryApplicationsUpdateQueryParamProperties;
}

export interface GalleryApplicationsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleryApplicationsUpdateParameters = GalleryApplicationsUpdateQueryParam &
  GalleryApplicationsUpdateMediaTypesParam &
  GalleryApplicationsUpdateBodyParam &
  RequestParameters;

export interface GalleryApplicationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationsGetQueryParam {
  queryParameters: GalleryApplicationsGetQueryParamProperties;
}

export type GalleryApplicationsGetParameters = GalleryApplicationsGetQueryParam & RequestParameters;

export interface GalleryApplicationsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationsDeleteQueryParam {
  queryParameters: GalleryApplicationsDeleteQueryParamProperties;
}

export type GalleryApplicationsDeleteParameters = GalleryApplicationsDeleteQueryParam &
  RequestParameters;

export interface GalleryApplicationsListByGalleryQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationsListByGalleryQueryParam {
  queryParameters: GalleryApplicationsListByGalleryQueryParamProperties;
}

export type GalleryApplicationsListByGalleryParameters =
  GalleryApplicationsListByGalleryQueryParam & RequestParameters;

export interface GalleryApplicationVersionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update gallery Application Version operation. */
  body: GalleryApplicationVersion;
}

export interface GalleryApplicationVersionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationVersionsCreateOrUpdateQueryParam {
  queryParameters: GalleryApplicationVersionsCreateOrUpdateQueryParamProperties;
}

export interface GalleryApplicationVersionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleryApplicationVersionsCreateOrUpdateParameters =
  GalleryApplicationVersionsCreateOrUpdateQueryParam &
    GalleryApplicationVersionsCreateOrUpdateMediaTypesParam &
    GalleryApplicationVersionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface GalleryApplicationVersionsUpdateBodyParam {
  /** Parameters supplied to the update gallery Application Version operation. */
  body: GalleryApplicationVersionUpdate;
}

export interface GalleryApplicationVersionsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationVersionsUpdateQueryParam {
  queryParameters: GalleryApplicationVersionsUpdateQueryParamProperties;
}

export interface GalleryApplicationVersionsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GalleryApplicationVersionsUpdateParameters =
  GalleryApplicationVersionsUpdateQueryParam &
    GalleryApplicationVersionsUpdateMediaTypesParam &
    GalleryApplicationVersionsUpdateBodyParam &
    RequestParameters;

export interface GalleryApplicationVersionsGetQueryParamProperties {
  /** The expand expression to apply on the operation. */
  $expand?: "ReplicationStatus";
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationVersionsGetQueryParam {
  queryParameters: GalleryApplicationVersionsGetQueryParamProperties;
}

export type GalleryApplicationVersionsGetParameters = GalleryApplicationVersionsGetQueryParam &
  RequestParameters;

export interface GalleryApplicationVersionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationVersionsDeleteQueryParam {
  queryParameters: GalleryApplicationVersionsDeleteQueryParamProperties;
}

export type GalleryApplicationVersionsDeleteParameters =
  GalleryApplicationVersionsDeleteQueryParam & RequestParameters;

export interface GalleryApplicationVersionsListByGalleryApplicationQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GalleryApplicationVersionsListByGalleryApplicationQueryParam {
  queryParameters: GalleryApplicationVersionsListByGalleryApplicationQueryParamProperties;
}

export type GalleryApplicationVersionsListByGalleryApplicationParameters =
  GalleryApplicationVersionsListByGalleryApplicationQueryParam & RequestParameters;

export interface GallerySharingProfileUpdateBodyParam {
  /** Parameters supplied to the update gallery sharing profile. */
  body: SharingUpdate;
}

export interface GallerySharingProfileUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface GallerySharingProfileUpdateQueryParam {
  queryParameters: GallerySharingProfileUpdateQueryParamProperties;
}

export interface GallerySharingProfileUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GallerySharingProfileUpdateParameters = GallerySharingProfileUpdateQueryParam &
  GallerySharingProfileUpdateMediaTypesParam &
  GallerySharingProfileUpdateBodyParam &
  RequestParameters;

export interface SharedGalleriesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
  /** The query parameter to decide what shared galleries to fetch when doing listing operations. */
  sharedTo?: "tenant";
}

export interface SharedGalleriesListQueryParam {
  queryParameters: SharedGalleriesListQueryParamProperties;
}

export type SharedGalleriesListParameters = SharedGalleriesListQueryParam & RequestParameters;

export interface SharedGalleriesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface SharedGalleriesGetQueryParam {
  queryParameters: SharedGalleriesGetQueryParamProperties;
}

export type SharedGalleriesGetParameters = SharedGalleriesGetQueryParam & RequestParameters;

export interface SharedGalleryImagesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
  /** The query parameter to decide what shared galleries to fetch when doing listing operations. */
  sharedTo?: "tenant";
}

export interface SharedGalleryImagesListQueryParam {
  queryParameters: SharedGalleryImagesListQueryParamProperties;
}

export type SharedGalleryImagesListParameters = SharedGalleryImagesListQueryParam &
  RequestParameters;

export interface SharedGalleryImagesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface SharedGalleryImagesGetQueryParam {
  queryParameters: SharedGalleryImagesGetQueryParamProperties;
}

export type SharedGalleryImagesGetParameters = SharedGalleryImagesGetQueryParam & RequestParameters;

export interface SharedGalleryImageVersionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
  /** The query parameter to decide what shared galleries to fetch when doing listing operations. */
  sharedTo?: "tenant";
}

export interface SharedGalleryImageVersionsListQueryParam {
  queryParameters: SharedGalleryImageVersionsListQueryParamProperties;
}

export type SharedGalleryImageVersionsListParameters = SharedGalleryImageVersionsListQueryParam &
  RequestParameters;

export interface SharedGalleryImageVersionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface SharedGalleryImageVersionsGetQueryParam {
  queryParameters: SharedGalleryImageVersionsGetQueryParamProperties;
}

export type SharedGalleryImageVersionsGetParameters = SharedGalleryImageVersionsGetQueryParam &
  RequestParameters;

export interface CommunityGalleriesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface CommunityGalleriesGetQueryParam {
  queryParameters: CommunityGalleriesGetQueryParamProperties;
}

export type CommunityGalleriesGetParameters = CommunityGalleriesGetQueryParam & RequestParameters;

export interface CommunityGalleryImagesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface CommunityGalleryImagesGetQueryParam {
  queryParameters: CommunityGalleryImagesGetQueryParamProperties;
}

export type CommunityGalleryImagesGetParameters = CommunityGalleryImagesGetQueryParam &
  RequestParameters;

export interface CommunityGalleryImagesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface CommunityGalleryImagesListQueryParam {
  queryParameters: CommunityGalleryImagesListQueryParamProperties;
}

export type CommunityGalleryImagesListParameters = CommunityGalleryImagesListQueryParam &
  RequestParameters;

export interface CommunityGalleryImageVersionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface CommunityGalleryImageVersionsGetQueryParam {
  queryParameters: CommunityGalleryImageVersionsGetQueryParamProperties;
}

export type CommunityGalleryImageVersionsGetParameters =
  CommunityGalleryImageVersionsGetQueryParam & RequestParameters;

export interface CommunityGalleryImageVersionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-01-03";
}

export interface CommunityGalleryImageVersionsListQueryParam {
  queryParameters: CommunityGalleryImageVersionsListQueryParamProperties;
}

export type CommunityGalleryImageVersionsListParameters =
  CommunityGalleryImageVersionsListQueryParam & RequestParameters;

export interface CloudServiceRoleInstancesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceRoleInstancesDeleteQueryParam {
  queryParameters: CloudServiceRoleInstancesDeleteQueryParamProperties;
}

export type CloudServiceRoleInstancesDeleteParameters = CloudServiceRoleInstancesDeleteQueryParam &
  RequestParameters;

export interface CloudServiceRoleInstancesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
  /** The expand expression to apply to the operation. 'UserData' is not supported for cloud services. */
  $expand?: "instanceView" | "userData";
}

export interface CloudServiceRoleInstancesGetQueryParam {
  queryParameters: CloudServiceRoleInstancesGetQueryParamProperties;
}

export type CloudServiceRoleInstancesGetParameters = CloudServiceRoleInstancesGetQueryParam &
  RequestParameters;

export interface CloudServiceRoleInstancesGetInstanceViewQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceRoleInstancesGetInstanceViewQueryParam {
  queryParameters: CloudServiceRoleInstancesGetInstanceViewQueryParamProperties;
}

export type CloudServiceRoleInstancesGetInstanceViewParameters =
  CloudServiceRoleInstancesGetInstanceViewQueryParam & RequestParameters;

export interface CloudServiceRoleInstancesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
  /** The expand expression to apply to the operation. 'UserData' is not supported for cloud services. */
  $expand?: "instanceView" | "userData";
}

export interface CloudServiceRoleInstancesListQueryParam {
  queryParameters: CloudServiceRoleInstancesListQueryParamProperties;
}

export type CloudServiceRoleInstancesListParameters = CloudServiceRoleInstancesListQueryParam &
  RequestParameters;

export interface CloudServiceRoleInstancesRestartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceRoleInstancesRestartQueryParam {
  queryParameters: CloudServiceRoleInstancesRestartQueryParamProperties;
}

export type CloudServiceRoleInstancesRestartParameters =
  CloudServiceRoleInstancesRestartQueryParam & RequestParameters;

export interface CloudServiceRoleInstancesReimageQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceRoleInstancesReimageQueryParam {
  queryParameters: CloudServiceRoleInstancesReimageQueryParamProperties;
}

export type CloudServiceRoleInstancesReimageParameters =
  CloudServiceRoleInstancesReimageQueryParam & RequestParameters;

export interface CloudServiceRoleInstancesRebuildQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceRoleInstancesRebuildQueryParam {
  queryParameters: CloudServiceRoleInstancesRebuildQueryParamProperties;
}

export type CloudServiceRoleInstancesRebuildParameters =
  CloudServiceRoleInstancesRebuildQueryParam & RequestParameters;

export interface CloudServiceRoleInstancesGetRemoteDesktopFileQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceRoleInstancesGetRemoteDesktopFileQueryParam {
  queryParameters: CloudServiceRoleInstancesGetRemoteDesktopFileQueryParamProperties;
}

export type CloudServiceRoleInstancesGetRemoteDesktopFileParameters =
  CloudServiceRoleInstancesGetRemoteDesktopFileQueryParam & RequestParameters;

export interface CloudServiceRolesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceRolesGetQueryParam {
  queryParameters: CloudServiceRolesGetQueryParamProperties;
}

export type CloudServiceRolesGetParameters = CloudServiceRolesGetQueryParam & RequestParameters;

export interface CloudServiceRolesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceRolesListQueryParam {
  queryParameters: CloudServiceRolesListQueryParamProperties;
}

export type CloudServiceRolesListParameters = CloudServiceRolesListQueryParam & RequestParameters;

export interface CloudServicesCreateOrUpdateBodyParam {
  /** The cloud service object. */
  body?: CloudService;
}

export interface CloudServicesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesCreateOrUpdateQueryParam {
  queryParameters: CloudServicesCreateOrUpdateQueryParamProperties;
}

export interface CloudServicesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CloudServicesCreateOrUpdateParameters = CloudServicesCreateOrUpdateQueryParam &
  CloudServicesCreateOrUpdateMediaTypesParam &
  CloudServicesCreateOrUpdateBodyParam &
  RequestParameters;

export interface CloudServicesUpdateBodyParam {
  /** The cloud service object. */
  body?: CloudServiceUpdate;
}

export interface CloudServicesUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesUpdateQueryParam {
  queryParameters: CloudServicesUpdateQueryParamProperties;
}

export interface CloudServicesUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CloudServicesUpdateParameters = CloudServicesUpdateQueryParam &
  CloudServicesUpdateMediaTypesParam &
  CloudServicesUpdateBodyParam &
  RequestParameters;

export interface CloudServicesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesDeleteQueryParam {
  queryParameters: CloudServicesDeleteQueryParamProperties;
}

export type CloudServicesDeleteParameters = CloudServicesDeleteQueryParam & RequestParameters;

export interface CloudServicesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesGetQueryParam {
  queryParameters: CloudServicesGetQueryParamProperties;
}

export type CloudServicesGetParameters = CloudServicesGetQueryParam & RequestParameters;

export interface CloudServicesGetInstanceViewQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesGetInstanceViewQueryParam {
  queryParameters: CloudServicesGetInstanceViewQueryParamProperties;
}

export type CloudServicesGetInstanceViewParameters = CloudServicesGetInstanceViewQueryParam &
  RequestParameters;

export interface CloudServicesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesListAllQueryParam {
  queryParameters: CloudServicesListAllQueryParamProperties;
}

export type CloudServicesListAllParameters = CloudServicesListAllQueryParam & RequestParameters;

export interface CloudServicesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesListQueryParam {
  queryParameters: CloudServicesListQueryParamProperties;
}

export type CloudServicesListParameters = CloudServicesListQueryParam & RequestParameters;

export interface CloudServicesStartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesStartQueryParam {
  queryParameters: CloudServicesStartQueryParamProperties;
}

export type CloudServicesStartParameters = CloudServicesStartQueryParam & RequestParameters;

export interface CloudServicesPowerOffQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesPowerOffQueryParam {
  queryParameters: CloudServicesPowerOffQueryParamProperties;
}

export type CloudServicesPowerOffParameters = CloudServicesPowerOffQueryParam & RequestParameters;

export interface CloudServicesRestartBodyParam {
  /** List of cloud service role instance names. */
  body?: RoleInstances;
}

export interface CloudServicesRestartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesRestartQueryParam {
  queryParameters: CloudServicesRestartQueryParamProperties;
}

export interface CloudServicesRestartMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CloudServicesRestartParameters = CloudServicesRestartQueryParam &
  CloudServicesRestartMediaTypesParam &
  CloudServicesRestartBodyParam &
  RequestParameters;

export interface CloudServicesReimageBodyParam {
  /** List of cloud service role instance names. */
  body?: RoleInstances;
}

export interface CloudServicesReimageQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesReimageQueryParam {
  queryParameters: CloudServicesReimageQueryParamProperties;
}

export interface CloudServicesReimageMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CloudServicesReimageParameters = CloudServicesReimageQueryParam &
  CloudServicesReimageMediaTypesParam &
  CloudServicesReimageBodyParam &
  RequestParameters;

export interface CloudServicesRebuildBodyParam {
  /** List of cloud service role instance names. */
  body?: RoleInstances;
}

export interface CloudServicesRebuildQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesRebuildQueryParam {
  queryParameters: CloudServicesRebuildQueryParamProperties;
}

export interface CloudServicesRebuildMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CloudServicesRebuildParameters = CloudServicesRebuildQueryParam &
  CloudServicesRebuildMediaTypesParam &
  CloudServicesRebuildBodyParam &
  RequestParameters;

export interface CloudServicesDeleteInstancesBodyParam {
  /** List of cloud service role instance names. */
  body?: RoleInstances;
}

export interface CloudServicesDeleteInstancesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesDeleteInstancesQueryParam {
  queryParameters: CloudServicesDeleteInstancesQueryParamProperties;
}

export interface CloudServicesDeleteInstancesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CloudServicesDeleteInstancesParameters = CloudServicesDeleteInstancesQueryParam &
  CloudServicesDeleteInstancesMediaTypesParam &
  CloudServicesDeleteInstancesBodyParam &
  RequestParameters;

export interface CloudServicesUpdateDomainWalkUpdateDomainBodyParam {
  /** The update domain object. */
  body?: UpdateDomain;
}

export interface CloudServicesUpdateDomainWalkUpdateDomainQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesUpdateDomainWalkUpdateDomainQueryParam {
  queryParameters: CloudServicesUpdateDomainWalkUpdateDomainQueryParamProperties;
}

export interface CloudServicesUpdateDomainWalkUpdateDomainMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CloudServicesUpdateDomainWalkUpdateDomainParameters =
  CloudServicesUpdateDomainWalkUpdateDomainQueryParam &
    CloudServicesUpdateDomainWalkUpdateDomainMediaTypesParam &
    CloudServicesUpdateDomainWalkUpdateDomainBodyParam &
    RequestParameters;

export interface CloudServicesUpdateDomainGetUpdateDomainQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesUpdateDomainGetUpdateDomainQueryParam {
  queryParameters: CloudServicesUpdateDomainGetUpdateDomainQueryParamProperties;
}

export type CloudServicesUpdateDomainGetUpdateDomainParameters =
  CloudServicesUpdateDomainGetUpdateDomainQueryParam & RequestParameters;

export interface CloudServicesUpdateDomainListUpdateDomainsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServicesUpdateDomainListUpdateDomainsQueryParam {
  queryParameters: CloudServicesUpdateDomainListUpdateDomainsQueryParamProperties;
}

export type CloudServicesUpdateDomainListUpdateDomainsParameters =
  CloudServicesUpdateDomainListUpdateDomainsQueryParam & RequestParameters;

export interface CloudServiceOperatingSystemsGetOSVersionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceOperatingSystemsGetOSVersionQueryParam {
  queryParameters: CloudServiceOperatingSystemsGetOSVersionQueryParamProperties;
}

export type CloudServiceOperatingSystemsGetOSVersionParameters =
  CloudServiceOperatingSystemsGetOSVersionQueryParam & RequestParameters;

export interface CloudServiceOperatingSystemsListOSVersionsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceOperatingSystemsListOSVersionsQueryParam {
  queryParameters: CloudServiceOperatingSystemsListOSVersionsQueryParamProperties;
}

export type CloudServiceOperatingSystemsListOSVersionsParameters =
  CloudServiceOperatingSystemsListOSVersionsQueryParam & RequestParameters;

export interface CloudServiceOperatingSystemsGetOSFamilyQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceOperatingSystemsGetOSFamilyQueryParam {
  queryParameters: CloudServiceOperatingSystemsGetOSFamilyQueryParamProperties;
}

export type CloudServiceOperatingSystemsGetOSFamilyParameters =
  CloudServiceOperatingSystemsGetOSFamilyQueryParam & RequestParameters;

export interface CloudServiceOperatingSystemsListOSFamiliesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-04-04";
}

export interface CloudServiceOperatingSystemsListOSFamiliesQueryParam {
  queryParameters: CloudServiceOperatingSystemsListOSFamiliesQueryParamProperties;
}

export type CloudServiceOperatingSystemsListOSFamiliesParameters =
  CloudServiceOperatingSystemsListOSFamiliesQueryParam & RequestParameters;
