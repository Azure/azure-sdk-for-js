// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetClusterManifestParameters,
  GetClusterHealthParameters,
  GetClusterHealthUsingPolicyParameters,
  GetClusterHealthChunkParameters,
  GetClusterHealthChunkUsingPolicyAndAdvancedFiltersParameters,
  ReportClusterHealthParameters,
  GetProvisionedFabricCodeVersionInfoListParameters,
  GetProvisionedFabricConfigVersionInfoListParameters,
  GetClusterUpgradeProgressParameters,
  GetClusterConfigurationParameters,
  GetClusterConfigurationUpgradeStatusParameters,
  GetUpgradeOrchestrationServiceStateParameters,
  SetUpgradeOrchestrationServiceStateParameters,
  ProvisionClusterParameters,
  UnprovisionClusterParameters,
  RollbackClusterUpgradeParameters,
  ResumeClusterUpgradeParameters,
  StartClusterUpgradeParameters,
  StartClusterConfigurationUpgradeParameters,
  UpdateClusterUpgradeParameters,
  GetAadMetadataParameters,
  GetClusterVersionParameters,
  GetClusterLoadParameters,
  ToggleVerboseServicePlacementHealthReportingParameters,
  GetNodeInfoListParameters,
  GetNodeInfoParameters,
  GetNodeHealthParameters,
  GetNodeHealthUsingPolicyParameters,
  ReportNodeHealthParameters,
  GetNodeLoadInfoParameters,
  DisableNodeParameters,
  EnableNodeParameters,
  RemoveNodeStateParameters,
  RestartNodeParameters,
  RemoveConfigurationOverridesParameters,
  GetConfigurationOverridesParameters,
  AddConfigurationParameterOverridesParameters,
  RemoveNodeTagsParameters,
  AddNodeTagsParameters,
  GetApplicationTypeInfoListParameters,
  GetApplicationTypeInfoListByNameParameters,
  ProvisionApplicationTypeParameters,
  UnprovisionApplicationTypeParameters,
  GetServiceTypeInfoListParameters,
  GetServiceTypeInfoByNameParameters,
  GetServiceManifestParameters,
  GetDeployedServiceTypeInfoListParameters,
  GetDeployedServiceTypeInfoByNameParameters,
  CreateApplicationParameters,
  DeleteApplicationParameters,
  GetApplicationLoadInfoParameters,
  GetApplicationInfoListParameters,
  GetApplicationInfoParameters,
  GetApplicationHealthParameters,
  GetApplicationHealthUsingPolicyParameters,
  ReportApplicationHealthParameters,
  StartApplicationUpgradeParameters,
  GetApplicationUpgradeParameters,
  UpdateApplicationUpgradeParameters,
  UpdateApplicationParameters,
  ResumeApplicationUpgradeParameters,
  RollbackApplicationUpgradeParameters,
  GetDeployedApplicationInfoListParameters,
  GetDeployedApplicationInfoParameters,
  GetDeployedApplicationHealthParameters,
  GetDeployedApplicationHealthUsingPolicyParameters,
  ReportDeployedApplicationHealthParameters,
  GetApplicationManifestParameters,
  GetServiceInfoListParameters,
  GetServiceInfoParameters,
  GetApplicationNameInfoParameters,
  CreateServiceParameters,
  CreateServiceFromTemplateParameters,
  DeleteServiceParameters,
  UpdateServiceParameters,
  GetServiceDescriptionParameters,
  GetServiceHealthParameters,
  GetServiceHealthUsingPolicyParameters,
  ReportServiceHealthParameters,
  ResolveServiceParameters,
  GetUnplacedReplicaInformationParameters,
  GetLoadedPartitionInfoListParameters,
  GetPartitionInfoListParameters,
  GetPartitionInfoParameters,
  GetServiceNameInfoParameters,
  GetPartitionHealthParameters,
  GetPartitionHealthUsingPolicyParameters,
  ReportPartitionHealthParameters,
  GetPartitionLoadInformationParameters,
  ResetPartitionLoadParameters,
  RecoverPartitionParameters,
  RecoverServicePartitionsParameters,
  RecoverSystemPartitionsParameters,
  RecoverAllPartitionsParameters,
  MovePrimaryReplicaParameters,
  MoveSecondaryReplicaParameters,
  UpdatePartitionLoadParameters,
  MoveInstanceParameters,
  MoveAuxiliaryReplicaParameters,
  CreateRepairTaskParameters,
  CancelRepairTaskParameters,
  DeleteRepairTaskParameters,
  GetRepairTaskListParameters,
  ForceApproveRepairTaskParameters,
  UpdateRepairTaskHealthPolicyParameters,
  UpdateRepairExecutionStateParameters,
  GetReplicaInfoListParameters,
  GetReplicaInfoParameters,
  GetReplicaHealthParameters,
  GetReplicaHealthUsingPolicyParameters,
  ReportReplicaHealthParameters,
  GetDeployedServiceReplicaInfoListParameters,
  GetDeployedServiceReplicaDetailInfoParameters,
  GetDeployedServiceReplicaDetailInfoByPartitionIdParameters,
  RestartReplicaParameters,
  RemoveReplicaParameters,
  GetDeployedServicePackageInfoListParameters,
  GetDeployedServicePackageInfoListByNameParameters,
  GetDeployedServicePackageHealthParameters,
  GetDeployedServicePackageHealthUsingPolicyParameters,
  ReportDeployedServicePackageHealthParameters,
  DeployServicePackageToNodeParameters,
  GetDeployedCodePackageInfoListParameters,
  RestartDeployedCodePackageParameters,
  GetContainerLogsDeployedOnNodeParameters,
  InvokeContainerApiParameters,
  CreateComposeDeploymentParameters,
  GetComposeDeploymentStatusParameters,
  GetComposeDeploymentStatusListParameters,
  GetComposeDeploymentUpgradeProgressParameters,
  RemoveComposeDeploymentParameters,
  StartComposeDeploymentUpgradeParameters,
  StartRollbackComposeDeploymentUpgradeParameters,
  GetChaosParameters,
  StartChaosParameters,
  StopChaosParameters,
  GetChaosEventsParameters,
  GetChaosScheduleParameters,
  PostChaosScheduleParameters,
  UploadFileParameters,
  GetImageStoreContentParameters,
  DeleteImageStoreContentParameters,
  GetImageStoreRootContentParameters,
  CopyImageStoreContentParameters,
  DeleteImageStoreUploadSessionParameters,
  CommitImageStoreUploadSessionParameters,
  GetImageStoreUploadSessionByIdParameters,
  GetImageStoreUploadSessionByPathParameters,
  UploadFileChunkParameters,
  GetImageStoreRootFolderSizeParameters,
  GetImageStoreFolderSizeParameters,
  GetImageStoreInfoParameters,
  InvokeInfrastructureCommandParameters,
  InvokeInfrastructureQueryParameters,
  StartDataLossParameters,
  GetDataLossProgressParameters,
  StartQuorumLossParameters,
  GetQuorumLossProgressParameters,
  StartPartitionRestartParameters,
  GetPartitionRestartProgressParameters,
  StartNodeTransitionParameters,
  GetNodeTransitionProgressParameters,
  GetFaultOperationListParameters,
  CancelOperationParameters,
  CreateBackupPolicyParameters,
  DeleteBackupPolicyParameters,
  GetBackupPolicyListParameters,
  GetBackupPolicyByNameParameters,
  GetAllEntitiesBackedUpByPolicyParameters,
  UpdateBackupPolicyParameters,
  EnableApplicationBackupParameters,
  DisableApplicationBackupParameters,
  GetApplicationBackupConfigurationInfoParameters,
  GetApplicationBackupListParameters,
  SuspendApplicationBackupParameters,
  ResumeApplicationBackupParameters,
  EnableServiceBackupParameters,
  DisableServiceBackupParameters,
  GetServiceBackupConfigurationInfoParameters,
  GetServiceBackupListParameters,
  SuspendServiceBackupParameters,
  ResumeServiceBackupParameters,
  EnablePartitionBackupParameters,
  DisablePartitionBackupParameters,
  GetPartitionBackupConfigurationInfoParameters,
  GetPartitionBackupListParameters,
  SuspendPartitionBackupParameters,
  ResumePartitionBackupParameters,
  BackupPartitionParameters,
  GetPartitionBackupProgressParameters,
  RestorePartitionParameters,
  GetPartitionRestoreProgressParameters,
  GetBackupsFromBackupLocationParameters,
  CreateNameParameters,
  GetNameExistsInfoParameters,
  DeleteNameParameters,
  GetSubNameInfoListParameters,
  GetPropertyInfoListParameters,
  PutPropertyParameters,
  GetPropertyInfoParameters,
  DeletePropertyParameters,
  SubmitPropertyBatchParameters,
  GetClusterEventListParameters,
  GetContainersEventListParameters,
  GetNodeEventListParameters,
  GetNodesEventListParameters,
  GetApplicationEventListParameters,
  GetApplicationsEventListParameters,
  GetServiceEventListParameters,
  GetServicesEventListParameters,
  GetPartitionEventListParameters,
  GetPartitionsEventListParameters,
  GetPartitionReplicaEventListParameters,
  GetPartitionReplicasEventListParameters,
  GetCorrelatedEventListParameters,
  MeshSecretCreateOrUpdateParameters,
  MeshSecretGetParameters,
  MeshSecretDeleteParameters,
  MeshSecretListParameters,
  MeshSecretValueAddValueParameters,
  MeshSecretValueGetParameters,
  MeshSecretValueDeleteParameters,
  MeshSecretValueListParameters,
  MeshSecretValueShowParameters,
  MeshVolumeCreateOrUpdateParameters,
  MeshVolumeGetParameters,
  MeshVolumeDeleteParameters,
  MeshVolumeListParameters,
  MeshNetworkCreateOrUpdateParameters,
  MeshNetworkGetParameters,
  MeshNetworkDeleteParameters,
  MeshNetworkListParameters,
  MeshApplicationCreateOrUpdateParameters,
  MeshApplicationGetParameters,
  MeshApplicationDeleteParameters,
  MeshApplicationListParameters,
  MeshApplicationGetUpgradeProgressParameters,
  MeshServiceGetParameters,
  MeshServiceListParameters,
  MeshCodePackageGetContainerLogsParameters,
  MeshServiceReplicaGetParameters,
  MeshServiceReplicaListParameters,
  MeshGatewayCreateOrUpdateParameters,
  MeshGatewayGetParameters,
  MeshGatewayDeleteParameters,
  MeshGatewayListParameters,
} from "./parameters";
import {
  GetClusterManifest200Response,
  GetClusterManifestdefaultResponse,
  GetClusterHealth200Response,
  GetClusterHealthdefaultResponse,
  GetClusterHealthUsingPolicy200Response,
  GetClusterHealthUsingPolicydefaultResponse,
  GetClusterHealthChunk200Response,
  GetClusterHealthChunkdefaultResponse,
  GetClusterHealthChunkUsingPolicyAndAdvancedFilters200Response,
  GetClusterHealthChunkUsingPolicyAndAdvancedFiltersdefaultResponse,
  ReportClusterHealth200Response,
  ReportClusterHealthdefaultResponse,
  GetProvisionedFabricCodeVersionInfoList200Response,
  GetProvisionedFabricCodeVersionInfoListdefaultResponse,
  GetProvisionedFabricConfigVersionInfoList200Response,
  GetProvisionedFabricConfigVersionInfoListdefaultResponse,
  GetClusterUpgradeProgress200Response,
  GetClusterUpgradeProgressdefaultResponse,
  GetClusterConfiguration200Response,
  GetClusterConfigurationdefaultResponse,
  GetClusterConfigurationUpgradeStatus200Response,
  GetClusterConfigurationUpgradeStatusdefaultResponse,
  GetUpgradeOrchestrationServiceState200Response,
  GetUpgradeOrchestrationServiceStatedefaultResponse,
  SetUpgradeOrchestrationServiceState200Response,
  SetUpgradeOrchestrationServiceStatedefaultResponse,
  ProvisionCluster200Response,
  ProvisionClusterdefaultResponse,
  UnprovisionCluster200Response,
  UnprovisionClusterdefaultResponse,
  RollbackClusterUpgrade202Response,
  RollbackClusterUpgradedefaultResponse,
  ResumeClusterUpgrade200Response,
  ResumeClusterUpgradedefaultResponse,
  StartClusterUpgrade202Response,
  StartClusterUpgradedefaultResponse,
  StartClusterConfigurationUpgrade202Response,
  StartClusterConfigurationUpgradedefaultResponse,
  UpdateClusterUpgrade200Response,
  UpdateClusterUpgradedefaultResponse,
  GetAadMetadata200Response,
  GetAadMetadatadefaultResponse,
  GetClusterVersion200Response,
  GetClusterVersiondefaultResponse,
  GetClusterLoad200Response,
  GetClusterLoaddefaultResponse,
  ToggleVerboseServicePlacementHealthReporting200Response,
  ToggleVerboseServicePlacementHealthReportingdefaultResponse,
  GetNodeInfoList200Response,
  GetNodeInfoListdefaultResponse,
  GetNodeInfo200Response,
  GetNodeInfo204Response,
  GetNodeInfodefaultResponse,
  GetNodeHealth200Response,
  GetNodeHealthdefaultResponse,
  GetNodeHealthUsingPolicy200Response,
  GetNodeHealthUsingPolicydefaultResponse,
  ReportNodeHealth200Response,
  ReportNodeHealthdefaultResponse,
  GetNodeLoadInfo200Response,
  GetNodeLoadInfodefaultResponse,
  DisableNode200Response,
  DisableNodedefaultResponse,
  EnableNode200Response,
  EnableNodedefaultResponse,
  RemoveNodeState200Response,
  RemoveNodeStatedefaultResponse,
  RestartNode200Response,
  RestartNodedefaultResponse,
  RemoveConfigurationOverrides200Response,
  RemoveConfigurationOverridesdefaultResponse,
  GetConfigurationOverrides200Response,
  GetConfigurationOverridesdefaultResponse,
  AddConfigurationParameterOverrides200Response,
  AddConfigurationParameterOverridesdefaultResponse,
  RemoveNodeTags200Response,
  RemoveNodeTagsdefaultResponse,
  AddNodeTags200Response,
  AddNodeTagsdefaultResponse,
  GetApplicationTypeInfoList200Response,
  GetApplicationTypeInfoListdefaultResponse,
  GetApplicationTypeInfoListByName200Response,
  GetApplicationTypeInfoListByNamedefaultResponse,
  ProvisionApplicationType200Response,
  ProvisionApplicationType202Response,
  ProvisionApplicationTypedefaultResponse,
  UnprovisionApplicationType200Response,
  UnprovisionApplicationType202Response,
  UnprovisionApplicationTypedefaultResponse,
  GetServiceTypeInfoList200Response,
  GetServiceTypeInfoListdefaultResponse,
  GetServiceTypeInfoByName200Response,
  GetServiceTypeInfoByName204Response,
  GetServiceTypeInfoByNamedefaultResponse,
  GetServiceManifest200Response,
  GetServiceManifestdefaultResponse,
  GetDeployedServiceTypeInfoList200Response,
  GetDeployedServiceTypeInfoListdefaultResponse,
  GetDeployedServiceTypeInfoByName200Response,
  GetDeployedServiceTypeInfoByName204Response,
  GetDeployedServiceTypeInfoByNamedefaultResponse,
  CreateApplication201Response,
  CreateApplicationdefaultResponse,
  DeleteApplication200Response,
  DeleteApplicationdefaultResponse,
  GetApplicationLoadInfo200Response,
  GetApplicationLoadInfo204Response,
  GetApplicationLoadInfodefaultResponse,
  GetApplicationInfoList200Response,
  GetApplicationInfoListdefaultResponse,
  GetApplicationInfo200Response,
  GetApplicationInfo204Response,
  GetApplicationInfodefaultResponse,
  GetApplicationHealth200Response,
  GetApplicationHealthdefaultResponse,
  GetApplicationHealthUsingPolicy200Response,
  GetApplicationHealthUsingPolicydefaultResponse,
  ReportApplicationHealth200Response,
  ReportApplicationHealthdefaultResponse,
  StartApplicationUpgrade200Response,
  StartApplicationUpgradedefaultResponse,
  GetApplicationUpgrade200Response,
  GetApplicationUpgradedefaultResponse,
  UpdateApplicationUpgrade200Response,
  UpdateApplicationUpgradedefaultResponse,
  UpdateApplication200Response,
  UpdateApplicationdefaultResponse,
  ResumeApplicationUpgrade200Response,
  ResumeApplicationUpgradedefaultResponse,
  RollbackApplicationUpgrade200Response,
  RollbackApplicationUpgradedefaultResponse,
  GetDeployedApplicationInfoList200Response,
  GetDeployedApplicationInfoListdefaultResponse,
  GetDeployedApplicationInfo200Response,
  GetDeployedApplicationInfo204Response,
  GetDeployedApplicationInfodefaultResponse,
  GetDeployedApplicationHealth200Response,
  GetDeployedApplicationHealthdefaultResponse,
  GetDeployedApplicationHealthUsingPolicy200Response,
  GetDeployedApplicationHealthUsingPolicydefaultResponse,
  ReportDeployedApplicationHealth200Response,
  ReportDeployedApplicationHealthdefaultResponse,
  GetApplicationManifest200Response,
  GetApplicationManifestdefaultResponse,
  GetServiceInfoList200Response,
  GetServiceInfoListdefaultResponse,
  GetServiceInfo200Response,
  GetServiceInfo204Response,
  GetServiceInfodefaultResponse,
  GetApplicationNameInfo200Response,
  GetApplicationNameInfodefaultResponse,
  CreateService202Response,
  CreateServicedefaultResponse,
  CreateServiceFromTemplate202Response,
  CreateServiceFromTemplatedefaultResponse,
  DeleteService200Response,
  DeleteServicedefaultResponse,
  UpdateService200Response,
  UpdateServicedefaultResponse,
  GetServiceDescription200Response,
  GetServiceDescriptiondefaultResponse,
  GetServiceHealth200Response,
  GetServiceHealthdefaultResponse,
  GetServiceHealthUsingPolicy200Response,
  GetServiceHealthUsingPolicydefaultResponse,
  ReportServiceHealth200Response,
  ReportServiceHealthdefaultResponse,
  ResolveService200Response,
  ResolveServicedefaultResponse,
  GetUnplacedReplicaInformation200Response,
  GetUnplacedReplicaInformationdefaultResponse,
  GetLoadedPartitionInfoList200Response,
  GetLoadedPartitionInfoListdefaultResponse,
  GetPartitionInfoList200Response,
  GetPartitionInfoListdefaultResponse,
  GetPartitionInfo200Response,
  GetPartitionInfo204Response,
  GetPartitionInfodefaultResponse,
  GetServiceNameInfo200Response,
  GetServiceNameInfodefaultResponse,
  GetPartitionHealth200Response,
  GetPartitionHealthdefaultResponse,
  GetPartitionHealthUsingPolicy200Response,
  GetPartitionHealthUsingPolicydefaultResponse,
  ReportPartitionHealth200Response,
  ReportPartitionHealthdefaultResponse,
  GetPartitionLoadInformation200Response,
  GetPartitionLoadInformationdefaultResponse,
  ResetPartitionLoad200Response,
  ResetPartitionLoaddefaultResponse,
  RecoverPartition200Response,
  RecoverPartitiondefaultResponse,
  RecoverServicePartitions200Response,
  RecoverServicePartitionsdefaultResponse,
  RecoverSystemPartitions200Response,
  RecoverSystemPartitionsdefaultResponse,
  RecoverAllPartitions200Response,
  RecoverAllPartitionsdefaultResponse,
  MovePrimaryReplica200Response,
  MovePrimaryReplicadefaultResponse,
  MoveSecondaryReplica200Response,
  MoveSecondaryReplicadefaultResponse,
  UpdatePartitionLoad200Response,
  UpdatePartitionLoaddefaultResponse,
  MoveInstance200Response,
  MoveInstancedefaultResponse,
  MoveAuxiliaryReplica200Response,
  MoveAuxiliaryReplicadefaultResponse,
  CreateRepairTask200Response,
  CreateRepairTaskdefaultResponse,
  CancelRepairTask200Response,
  CancelRepairTaskdefaultResponse,
  DeleteRepairTask200Response,
  DeleteRepairTaskdefaultResponse,
  GetRepairTaskList200Response,
  GetRepairTaskListdefaultResponse,
  ForceApproveRepairTask200Response,
  ForceApproveRepairTaskdefaultResponse,
  UpdateRepairTaskHealthPolicy200Response,
  UpdateRepairTaskHealthPolicydefaultResponse,
  UpdateRepairExecutionState200Response,
  UpdateRepairExecutionStatedefaultResponse,
  GetReplicaInfoList200Response,
  GetReplicaInfoListdefaultResponse,
  GetReplicaInfo200Response,
  GetReplicaInfo204Response,
  GetReplicaInfodefaultResponse,
  GetReplicaHealth200Response,
  GetReplicaHealthdefaultResponse,
  GetReplicaHealthUsingPolicy200Response,
  GetReplicaHealthUsingPolicydefaultResponse,
  ReportReplicaHealth200Response,
  ReportReplicaHealthdefaultResponse,
  GetDeployedServiceReplicaInfoList200Response,
  GetDeployedServiceReplicaInfoList204Response,
  GetDeployedServiceReplicaInfoListdefaultResponse,
  GetDeployedServiceReplicaDetailInfo200Response,
  GetDeployedServiceReplicaDetailInfodefaultResponse,
  GetDeployedServiceReplicaDetailInfoByPartitionId200Response,
  GetDeployedServiceReplicaDetailInfoByPartitionIddefaultResponse,
  RestartReplica200Response,
  RestartReplicadefaultResponse,
  RemoveReplica200Response,
  RemoveReplicadefaultResponse,
  GetDeployedServicePackageInfoList200Response,
  GetDeployedServicePackageInfoListdefaultResponse,
  GetDeployedServicePackageInfoListByName200Response,
  GetDeployedServicePackageInfoListByName204Response,
  GetDeployedServicePackageInfoListByNamedefaultResponse,
  GetDeployedServicePackageHealth200Response,
  GetDeployedServicePackageHealthdefaultResponse,
  GetDeployedServicePackageHealthUsingPolicy200Response,
  GetDeployedServicePackageHealthUsingPolicydefaultResponse,
  ReportDeployedServicePackageHealth200Response,
  ReportDeployedServicePackageHealthdefaultResponse,
  DeployServicePackageToNode200Response,
  DeployServicePackageToNodedefaultResponse,
  GetDeployedCodePackageInfoList200Response,
  GetDeployedCodePackageInfoListdefaultResponse,
  RestartDeployedCodePackage200Response,
  RestartDeployedCodePackagedefaultResponse,
  GetContainerLogsDeployedOnNode200Response,
  GetContainerLogsDeployedOnNodedefaultResponse,
  InvokeContainerApi200Response,
  InvokeContainerApidefaultResponse,
  CreateComposeDeployment202Response,
  CreateComposeDeploymentdefaultResponse,
  GetComposeDeploymentStatus200Response,
  GetComposeDeploymentStatusdefaultResponse,
  GetComposeDeploymentStatusList200Response,
  GetComposeDeploymentStatusListdefaultResponse,
  GetComposeDeploymentUpgradeProgress200Response,
  GetComposeDeploymentUpgradeProgressdefaultResponse,
  RemoveComposeDeployment202Response,
  RemoveComposeDeploymentdefaultResponse,
  StartComposeDeploymentUpgrade202Response,
  StartComposeDeploymentUpgradedefaultResponse,
  StartRollbackComposeDeploymentUpgrade200Response,
  StartRollbackComposeDeploymentUpgradedefaultResponse,
  GetChaos200Response,
  GetChaosdefaultResponse,
  StartChaos200Response,
  StartChaosdefaultResponse,
  StopChaos200Response,
  StopChaosdefaultResponse,
  GetChaosEvents200Response,
  GetChaosEventsdefaultResponse,
  GetChaosSchedule200Response,
  GetChaosScheduledefaultResponse,
  PostChaosSchedule200Response,
  PostChaosScheduledefaultResponse,
  UploadFile200Response,
  UploadFiledefaultResponse,
  GetImageStoreContent200Response,
  GetImageStoreContentdefaultResponse,
  DeleteImageStoreContent200Response,
  DeleteImageStoreContentdefaultResponse,
  GetImageStoreRootContent200Response,
  GetImageStoreRootContentdefaultResponse,
  CopyImageStoreContent200Response,
  CopyImageStoreContentdefaultResponse,
  DeleteImageStoreUploadSession200Response,
  DeleteImageStoreUploadSessiondefaultResponse,
  CommitImageStoreUploadSession200Response,
  CommitImageStoreUploadSessiondefaultResponse,
  GetImageStoreUploadSessionById200Response,
  GetImageStoreUploadSessionByIddefaultResponse,
  GetImageStoreUploadSessionByPath200Response,
  GetImageStoreUploadSessionByPathdefaultResponse,
  UploadFileChunk200Response,
  UploadFileChunkdefaultResponse,
  GetImageStoreRootFolderSize200Response,
  GetImageStoreRootFolderSizedefaultResponse,
  GetImageStoreFolderSize200Response,
  GetImageStoreFolderSizedefaultResponse,
  GetImageStoreInfo200Response,
  GetImageStoreInfodefaultResponse,
  InvokeInfrastructureCommand200Response,
  InvokeInfrastructureCommanddefaultResponse,
  InvokeInfrastructureQuery200Response,
  InvokeInfrastructureQuerydefaultResponse,
  StartDataLoss202Response,
  StartDataLossdefaultResponse,
  GetDataLossProgress200Response,
  GetDataLossProgressdefaultResponse,
  StartQuorumLoss202Response,
  StartQuorumLossdefaultResponse,
  GetQuorumLossProgress200Response,
  GetQuorumLossProgressdefaultResponse,
  StartPartitionRestart202Response,
  StartPartitionRestartdefaultResponse,
  GetPartitionRestartProgress200Response,
  GetPartitionRestartProgressdefaultResponse,
  StartNodeTransition202Response,
  StartNodeTransitiondefaultResponse,
  GetNodeTransitionProgress200Response,
  GetNodeTransitionProgressdefaultResponse,
  GetFaultOperationList200Response,
  GetFaultOperationListdefaultResponse,
  CancelOperation200Response,
  CancelOperationdefaultResponse,
  CreateBackupPolicy201Response,
  CreateBackupPolicydefaultResponse,
  DeleteBackupPolicy200Response,
  DeleteBackupPolicydefaultResponse,
  GetBackupPolicyList200Response,
  GetBackupPolicyListdefaultResponse,
  GetBackupPolicyByName200Response,
  GetBackupPolicyByNamedefaultResponse,
  GetAllEntitiesBackedUpByPolicy200Response,
  GetAllEntitiesBackedUpByPolicydefaultResponse,
  UpdateBackupPolicy200Response,
  UpdateBackupPolicydefaultResponse,
  EnableApplicationBackup202Response,
  EnableApplicationBackupdefaultResponse,
  DisableApplicationBackup202Response,
  DisableApplicationBackupdefaultResponse,
  GetApplicationBackupConfigurationInfo200Response,
  GetApplicationBackupConfigurationInfodefaultResponse,
  GetApplicationBackupList200Response,
  GetApplicationBackupListdefaultResponse,
  SuspendApplicationBackup202Response,
  SuspendApplicationBackupdefaultResponse,
  ResumeApplicationBackup202Response,
  ResumeApplicationBackupdefaultResponse,
  EnableServiceBackup202Response,
  EnableServiceBackupdefaultResponse,
  DisableServiceBackup202Response,
  DisableServiceBackupdefaultResponse,
  GetServiceBackupConfigurationInfo200Response,
  GetServiceBackupConfigurationInfodefaultResponse,
  GetServiceBackupList200Response,
  GetServiceBackupListdefaultResponse,
  SuspendServiceBackup202Response,
  SuspendServiceBackupdefaultResponse,
  ResumeServiceBackup202Response,
  ResumeServiceBackupdefaultResponse,
  EnablePartitionBackup202Response,
  EnablePartitionBackupdefaultResponse,
  DisablePartitionBackup202Response,
  DisablePartitionBackupdefaultResponse,
  GetPartitionBackupConfigurationInfo200Response,
  GetPartitionBackupConfigurationInfodefaultResponse,
  GetPartitionBackupList200Response,
  GetPartitionBackupListdefaultResponse,
  SuspendPartitionBackup202Response,
  SuspendPartitionBackupdefaultResponse,
  ResumePartitionBackup202Response,
  ResumePartitionBackupdefaultResponse,
  BackupPartition202Response,
  BackupPartitiondefaultResponse,
  GetPartitionBackupProgress200Response,
  GetPartitionBackupProgressdefaultResponse,
  RestorePartition202Response,
  RestorePartitiondefaultResponse,
  GetPartitionRestoreProgress200Response,
  GetPartitionRestoreProgressdefaultResponse,
  GetBackupsFromBackupLocation200Response,
  GetBackupsFromBackupLocationdefaultResponse,
  CreateName201Response,
  CreateNamedefaultResponse,
  GetNameExistsInfo200Response,
  GetNameExistsInfodefaultResponse,
  DeleteName200Response,
  DeleteNamedefaultResponse,
  GetSubNameInfoList200Response,
  GetSubNameInfoListdefaultResponse,
  GetPropertyInfoList200Response,
  GetPropertyInfoListdefaultResponse,
  PutProperty200Response,
  PutPropertydefaultResponse,
  GetPropertyInfo200Response,
  GetPropertyInfodefaultResponse,
  DeleteProperty200Response,
  DeletePropertydefaultResponse,
  SubmitPropertyBatch200Response,
  SubmitPropertyBatch409Response,
  SubmitPropertyBatchdefaultResponse,
  GetClusterEventList200Response,
  GetClusterEventListdefaultResponse,
  GetContainersEventList200Response,
  GetContainersEventListdefaultResponse,
  GetNodeEventList200Response,
  GetNodeEventListdefaultResponse,
  GetNodesEventList200Response,
  GetNodesEventListdefaultResponse,
  GetApplicationEventList200Response,
  GetApplicationEventListdefaultResponse,
  GetApplicationsEventList200Response,
  GetApplicationsEventListdefaultResponse,
  GetServiceEventList200Response,
  GetServiceEventListdefaultResponse,
  GetServicesEventList200Response,
  GetServicesEventListdefaultResponse,
  GetPartitionEventList200Response,
  GetPartitionEventListdefaultResponse,
  GetPartitionsEventList200Response,
  GetPartitionsEventListdefaultResponse,
  GetPartitionReplicaEventList200Response,
  GetPartitionReplicaEventListdefaultResponse,
  GetPartitionReplicasEventList200Response,
  GetPartitionReplicasEventListdefaultResponse,
  GetCorrelatedEventList200Response,
  GetCorrelatedEventListdefaultResponse,
  MeshSecretCreateOrUpdate200Response,
  MeshSecretCreateOrUpdate201Response,
  MeshSecretCreateOrUpdate202Response,
  MeshSecretCreateOrUpdatedefaultResponse,
  MeshSecretGet200Response,
  MeshSecretGetdefaultResponse,
  MeshSecretDelete200Response,
  MeshSecretDelete202Response,
  MeshSecretDelete204Response,
  MeshSecretDeletedefaultResponse,
  MeshSecretList200Response,
  MeshSecretListdefaultResponse,
  MeshSecretValueAddValue200Response,
  MeshSecretValueAddValue201Response,
  MeshSecretValueAddValue202Response,
  MeshSecretValueAddValuedefaultResponse,
  MeshSecretValueGet200Response,
  MeshSecretValueGetdefaultResponse,
  MeshSecretValueDelete200Response,
  MeshSecretValueDelete202Response,
  MeshSecretValueDelete204Response,
  MeshSecretValueDeletedefaultResponse,
  MeshSecretValueList200Response,
  MeshSecretValueListdefaultResponse,
  MeshSecretValueShow200Response,
  MeshSecretValueShowdefaultResponse,
  MeshVolumeCreateOrUpdate200Response,
  MeshVolumeCreateOrUpdate201Response,
  MeshVolumeCreateOrUpdate202Response,
  MeshVolumeCreateOrUpdatedefaultResponse,
  MeshVolumeGet200Response,
  MeshVolumeGetdefaultResponse,
  MeshVolumeDelete200Response,
  MeshVolumeDelete202Response,
  MeshVolumeDelete204Response,
  MeshVolumeDeletedefaultResponse,
  MeshVolumeList200Response,
  MeshVolumeListdefaultResponse,
  MeshNetworkCreateOrUpdate200Response,
  MeshNetworkCreateOrUpdate201Response,
  MeshNetworkCreateOrUpdate202Response,
  MeshNetworkCreateOrUpdatedefaultResponse,
  MeshNetworkGet200Response,
  MeshNetworkGetdefaultResponse,
  MeshNetworkDelete200Response,
  MeshNetworkDelete202Response,
  MeshNetworkDelete204Response,
  MeshNetworkDeletedefaultResponse,
  MeshNetworkList200Response,
  MeshNetworkListdefaultResponse,
  MeshApplicationCreateOrUpdate200Response,
  MeshApplicationCreateOrUpdate201Response,
  MeshApplicationCreateOrUpdate202Response,
  MeshApplicationCreateOrUpdatedefaultResponse,
  MeshApplicationGet200Response,
  MeshApplicationGetdefaultResponse,
  MeshApplicationDelete200Response,
  MeshApplicationDelete202Response,
  MeshApplicationDelete204Response,
  MeshApplicationDeletedefaultResponse,
  MeshApplicationList200Response,
  MeshApplicationListdefaultResponse,
  MeshApplicationGetUpgradeProgress200Response,
  MeshApplicationGetUpgradeProgressdefaultResponse,
  MeshServiceGet200Response,
  MeshServiceGetdefaultResponse,
  MeshServiceList200Response,
  MeshServiceListdefaultResponse,
  MeshCodePackageGetContainerLogs200Response,
  MeshCodePackageGetContainerLogsdefaultResponse,
  MeshServiceReplicaGet200Response,
  MeshServiceReplicaGetdefaultResponse,
  MeshServiceReplicaList200Response,
  MeshServiceReplicaListdefaultResponse,
  MeshGatewayCreateOrUpdate200Response,
  MeshGatewayCreateOrUpdate201Response,
  MeshGatewayCreateOrUpdate202Response,
  MeshGatewayCreateOrUpdatedefaultResponse,
  MeshGatewayGet200Response,
  MeshGatewayGetdefaultResponse,
  MeshGatewayDelete200Response,
  MeshGatewayDelete202Response,
  MeshGatewayDelete204Response,
  MeshGatewayDeletedefaultResponse,
  MeshGatewayList200Response,
  MeshGatewayListdefaultResponse,
} from "./responses";
import { Client } from "@azure-rest/core-client";

/** Contains operations for Client operations */
export interface ClientOperations {
  /**
   * Get the Service Fabric cluster manifest. The cluster manifest contains properties of the cluster that include different node types on the cluster,
   * security configurations, fault, and upgrade domain topologies, etc.
   *
   * These properties are specified as part of the ClusterConfig.JSON file while deploying a stand-alone cluster. However, most of the information in the cluster manifest
   * is generated internally by service fabric during cluster deployment in other deployment scenarios (e.g. when using Azure portal).
   *
   * The contents of the cluster manifest are for informational purposes only and users are not expected to take a dependency on the format of the file contents or its interpretation.
   */
  getClusterManifest(
    options?: GetClusterManifestParameters
  ): Promise<GetClusterManifest200Response | GetClusterManifestdefaultResponse>;
  /**
   * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
   * Similarly, use NodesHealthStateFilter and ApplicationsHealthStateFilter to filter the collection of nodes and applications returned based on their aggregated health state.
   */
  getClusterHealth(
    options?: GetClusterHealthParameters
  ): Promise<GetClusterHealth200Response | GetClusterHealthdefaultResponse>;
  /**
   * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
   * Similarly, use NodesHealthStateFilter and ApplicationsHealthStateFilter to filter the collection of nodes and applications returned based on their aggregated health state.
   * Use ClusterHealthPolicies to override the health policies used to evaluate the health.
   */
  getClusterHealthUsingPolicy(
    options?: GetClusterHealthUsingPolicyParameters
  ): Promise<GetClusterHealthUsingPolicy200Response | GetClusterHealthUsingPolicydefaultResponse>;
  /**
   * Gets the health of a Service Fabric cluster using health chunks. Includes the aggregated health state of the cluster, but none of the cluster entities.
   * To expand the cluster health and get the health state of all or some of the entities, use the POST URI and specify the cluster health chunk query description.
   */
  getClusterHealthChunk(
    options?: GetClusterHealthChunkParameters
  ): Promise<GetClusterHealthChunk200Response | GetClusterHealthChunkdefaultResponse>;
  /**
   * Gets the health of a Service Fabric cluster using health chunks. The health evaluation is done based on the input cluster health chunk query description.
   * The query description allows users to specify health policies for evaluating the cluster and its children.
   * Users can specify very flexible filters to select which cluster entities to return. The selection can be done based on the entities health state and based on the hierarchy.
   * The query can return multi-level children of the entities based on the specified filters. For example, it can return one application with a specified name, and for this application, return
   * only services that are in Error or Warning, and all partitions and replicas for one of these services.
   */
  getClusterHealthChunkUsingPolicyAndAdvancedFilters(
    options?: GetClusterHealthChunkUsingPolicyAndAdvancedFiltersParameters
  ): Promise<
    | GetClusterHealthChunkUsingPolicyAndAdvancedFilters200Response
    | GetClusterHealthChunkUsingPolicyAndAdvancedFiltersdefaultResponse
  >;
  /**
   * Sends a health report on a Service Fabric cluster. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway node, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetClusterHealth and check that the report appears in the HealthEvents section.
   */
  reportClusterHealth(
    options: ReportClusterHealthParameters
  ): Promise<ReportClusterHealth200Response | ReportClusterHealthdefaultResponse>;
  /** Gets a list of information about fabric code versions that are provisioned in the cluster. The parameter CodeVersion can be used to optionally filter the output to only that particular version. */
  getProvisionedFabricCodeVersionInfoList(
    options?: GetProvisionedFabricCodeVersionInfoListParameters
  ): Promise<
    | GetProvisionedFabricCodeVersionInfoList200Response
    | GetProvisionedFabricCodeVersionInfoListdefaultResponse
  >;
  /** Gets a list of information about fabric config versions that are provisioned in the cluster. The parameter ConfigVersion can be used to optionally filter the output to only that particular version. */
  getProvisionedFabricConfigVersionInfoList(
    options?: GetProvisionedFabricConfigVersionInfoListParameters
  ): Promise<
    | GetProvisionedFabricConfigVersionInfoList200Response
    | GetProvisionedFabricConfigVersionInfoListdefaultResponse
  >;
  /** Gets the current progress of the ongoing cluster upgrade. If no upgrade is currently in progress, get the last state of the previous cluster upgrade. */
  getClusterUpgradeProgress(
    options?: GetClusterUpgradeProgressParameters
  ): Promise<GetClusterUpgradeProgress200Response | GetClusterUpgradeProgressdefaultResponse>;
  /**
   * The cluster configuration contains properties of the cluster that include different node types on the cluster,
   * security configurations, fault, and upgrade domain topologies, etc.
   */
  getClusterConfiguration(
    options: GetClusterConfigurationParameters
  ): Promise<GetClusterConfiguration200Response | GetClusterConfigurationdefaultResponse>;
  /** Get the cluster configuration upgrade status details of a Service Fabric standalone cluster. */
  getClusterConfigurationUpgradeStatus(
    options?: GetClusterConfigurationUpgradeStatusParameters
  ): Promise<
    | GetClusterConfigurationUpgradeStatus200Response
    | GetClusterConfigurationUpgradeStatusdefaultResponse
  >;
  /** Get the service state of Service Fabric Upgrade Orchestration Service. This API is internally used for support purposes. */
  getUpgradeOrchestrationServiceState(
    options?: GetUpgradeOrchestrationServiceStateParameters
  ): Promise<
    | GetUpgradeOrchestrationServiceState200Response
    | GetUpgradeOrchestrationServiceStatedefaultResponse
  >;
  /** Update the service state of Service Fabric Upgrade Orchestration Service. This API is internally used for support purposes. */
  setUpgradeOrchestrationServiceState(
    options: SetUpgradeOrchestrationServiceStateParameters
  ): Promise<
    | SetUpgradeOrchestrationServiceState200Response
    | SetUpgradeOrchestrationServiceStatedefaultResponse
  >;
  /** Validate and provision the code or configuration packages of a Service Fabric cluster. */
  provisionCluster(
    options: ProvisionClusterParameters
  ): Promise<ProvisionCluster200Response | ProvisionClusterdefaultResponse>;
  /** It is supported to unprovision code and configuration separately. */
  unprovisionCluster(
    options: UnprovisionClusterParameters
  ): Promise<UnprovisionCluster200Response | UnprovisionClusterdefaultResponse>;
  /** Roll back the code or configuration upgrade of a Service Fabric cluster. */
  rollbackClusterUpgrade(
    options?: RollbackClusterUpgradeParameters
  ): Promise<RollbackClusterUpgrade202Response | RollbackClusterUpgradedefaultResponse>;
  /** Make the cluster code or configuration upgrade move on to the next upgrade domain if appropriate. */
  resumeClusterUpgrade(
    options: ResumeClusterUpgradeParameters
  ): Promise<ResumeClusterUpgrade200Response | ResumeClusterUpgradedefaultResponse>;
  /** Validate the supplied upgrade parameters and start upgrading the code or configuration version of a Service Fabric cluster if the parameters are valid. */
  startClusterUpgrade(
    options: StartClusterUpgradeParameters
  ): Promise<StartClusterUpgrade202Response | StartClusterUpgradedefaultResponse>;
  /** Validate the supplied configuration upgrade parameters and start upgrading the cluster configuration if the parameters are valid. */
  startClusterConfigurationUpgrade(
    options: StartClusterConfigurationUpgradeParameters
  ): Promise<
    StartClusterConfigurationUpgrade202Response | StartClusterConfigurationUpgradedefaultResponse
  >;
  /** Update the upgrade parameters used during a Service Fabric cluster upgrade. */
  updateClusterUpgrade(
    options: UpdateClusterUpgradeParameters
  ): Promise<UpdateClusterUpgrade200Response | UpdateClusterUpgradedefaultResponse>;
  /**
   * Gets the Azure Active Directory metadata used for secured connection to cluster.
   * This API is not supposed to be called separately. It provides information needed to set up an Azure Active Directory secured connection with a Service Fabric cluster.
   */
  getAadMetadata(
    options?: GetAadMetadataParameters
  ): Promise<GetAadMetadata200Response | GetAadMetadatadefaultResponse>;
  /** If a cluster upgrade is happening, then this API will return the lowest (older) version of the current and target cluster runtime versions. */
  getClusterVersion(
    options?: GetClusterVersionParameters
  ): Promise<GetClusterVersion200Response | GetClusterVersiondefaultResponse>;
  /** Retrieves the load information of a Service Fabric cluster for all the metrics that have load or capacity defined. */
  getClusterLoad(
    options?: GetClusterLoadParameters
  ): Promise<GetClusterLoad200Response | GetClusterLoaddefaultResponse>;
  /**
   * If verbosity is set to true, then detailed health reports will be generated when replicas cannot be placed or dropped.
   * If verbosity is set to false, then no health reports will be generated when replicas cannot be placed or dropped.
   */
  toggleVerboseServicePlacementHealthReporting(
    options: ToggleVerboseServicePlacementHealthReportingParameters
  ): Promise<
    | ToggleVerboseServicePlacementHealthReporting200Response
    | ToggleVerboseServicePlacementHealthReportingdefaultResponse
  >;
  /** The response includes the name, status, ID, health, uptime, and other details about the nodes. */
  getNodeInfoList(
    options?: GetNodeInfoListParameters
  ): Promise<GetNodeInfoList200Response | GetNodeInfoListdefaultResponse>;
  /** The response includes the name, status, ID, health, uptime, and other details about the node. */
  getNodeInfo(
    nodeName: string,
    options?: GetNodeInfoParameters
  ): Promise<GetNodeInfo200Response | GetNodeInfo204Response | GetNodeInfodefaultResponse>;
  /** Gets the health of a Service Fabric node. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. If the node that you specify by name does not exist in the health store, this returns an error. */
  getNodeHealth(
    nodeName: string,
    options?: GetNodeHealthParameters
  ): Promise<GetNodeHealth200Response | GetNodeHealthdefaultResponse>;
  /** Gets the health of a Service Fabric node. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. Use ClusterHealthPolicy in the POST body to override the health policies used to evaluate the health. If the node that you specify by name does not exist in the health store, this returns an error. */
  getNodeHealthUsingPolicy(
    nodeName: string,
    options?: GetNodeHealthUsingPolicyParameters
  ): Promise<GetNodeHealthUsingPolicy200Response | GetNodeHealthUsingPolicydefaultResponse>;
  /**
   * Reports health state of the specified Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway node, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetNodeHealth and check that the report appears in the HealthEvents section.
   */
  reportNodeHealth(
    nodeName: string,
    options: ReportNodeHealthParameters
  ): Promise<ReportNodeHealth200Response | ReportNodeHealthdefaultResponse>;
  /** Retrieves the load information of a Service Fabric node for all the metrics that have load or capacity defined. */
  getNodeLoadInfo(
    nodeName: string,
    options?: GetNodeLoadInfoParameters
  ): Promise<GetNodeLoadInfo200Response | GetNodeLoadInfodefaultResponse>;
  /** Deactivate a Service Fabric cluster node with the specified deactivation intent. Once the deactivation is in progress, the deactivation intent can be increased, but not decreased (for example, a node that is deactivated with the Pause intent can be deactivated further with Restart, but not the other way around. Nodes may be reactivated using the Activate a node operation any time after they are deactivated. If the deactivation is not complete, this will cancel the deactivation. A node that goes down and comes back up while deactivated will still need to be reactivated before services will be placed on that node. */
  disableNode(
    nodeName: string,
    options: DisableNodeParameters
  ): Promise<DisableNode200Response | DisableNodedefaultResponse>;
  /** Activates a Service Fabric cluster node that is currently deactivated. Once activated, the node will again become a viable target for placing new replicas, and any deactivated replicas remaining on the node will be reactivated. */
  enableNode(
    nodeName: string,
    options?: EnableNodeParameters
  ): Promise<EnableNode200Response | EnableNodedefaultResponse>;
  /** This implies that it is not possible to recover the persisted state of that node. This generally happens if a hard disk has been wiped clean, or if a hard disk crashes. The node has to be down for this operation to be successful. This operation lets Service Fabric know that the replicas on that node no longer exist, and that Service Fabric should stop waiting for those replicas to come back up. Do not run this cmdlet if the state on the node has not been removed and the node can come back up with its state intact. Starting from Service Fabric 6.5, in order to use this API for seed nodes, please change the seed nodes to regular (non-seed) nodes and then invoke this API to remove the node state. If the cluster is running on Azure, after the seed node goes down, Service Fabric will try to change it to a non-seed node automatically. To make this happen, make sure the number of non-seed nodes in the primary node type is no less than the number of Down seed nodes. If necessary, add more nodes to the primary node type to achieve this. For standalone cluster, if the Down seed node is not expected to come back up with its state intact, please remove the node from the cluster, see https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-windows-server-add-remove-nodes */
  removeNodeState(
    nodeName: string,
    options?: RemoveNodeStateParameters
  ): Promise<RemoveNodeState200Response | RemoveNodeStatedefaultResponse>;
  /** Restarts a Service Fabric cluster node that is already started. */
  restartNode(
    nodeName: string,
    options: RestartNodeParameters
  ): Promise<RestartNode200Response | RestartNodedefaultResponse>;
  /** This api allows removing all existing configuration overrides on specified node. */
  removeConfigurationOverrides(
    nodeName: string,
    options?: RemoveConfigurationOverridesParameters
  ): Promise<RemoveConfigurationOverrides200Response | RemoveConfigurationOverridesdefaultResponse>;
  /** This api allows getting all existing configuration overrides on the specified node. */
  getConfigurationOverrides(
    nodeName: string,
    options?: GetConfigurationOverridesParameters
  ): Promise<GetConfigurationOverrides200Response | GetConfigurationOverridesdefaultResponse>;
  /** This api allows adding all existing configuration overrides on the specified node. */
  addConfigurationParameterOverrides(
    nodeName: string,
    options: AddConfigurationParameterOverridesParameters
  ): Promise<
    | AddConfigurationParameterOverrides200Response
    | AddConfigurationParameterOverridesdefaultResponse
  >;
  /** This api allows removing set of tags from the specified node. */
  removeNodeTags(
    nodeName: string,
    options: RemoveNodeTagsParameters
  ): Promise<RemoveNodeTags200Response | RemoveNodeTagsdefaultResponse>;
  /** This api allows adding tags to the specified node. */
  addNodeTags(
    nodeName: string,
    options: AddNodeTagsParameters
  ): Promise<AddNodeTags200Response | AddNodeTagsdefaultResponse>;
  /** Returns the information about the application types that are provisioned or in the process of being provisioned in the Service Fabric cluster. Each version of an application type is returned as one application type. The response includes the name, version, status, and other details about the application type. This is a paged query, meaning that if not all of the application types fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. For example, if there are 10 application types but a page only fits the first three application types, or if max results is set to 3, then three is returned. To access the rest of the results, retrieve subsequent pages by using the returned continuation token in the next query. An empty continuation token is returned if there are no subsequent pages. */
  getApplicationTypeInfoList(
    options?: GetApplicationTypeInfoListParameters
  ): Promise<GetApplicationTypeInfoList200Response | GetApplicationTypeInfoListdefaultResponse>;
  /** Returns the information about the application types that are provisioned or in the process of being provisioned in the Service Fabric cluster. These results are of application types whose name match exactly the one specified as the parameter, and which comply with the given query parameters. All versions of the application type matching the application type name are returned, with each version returned as one application type. The response includes the name, version, status, and other details about the application type. This is a paged query, meaning that if not all of the application types fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. For example, if there are 10 application types but a page only fits the first three application types, or if max results is set to 3, then three is returned. To access the rest of the results, retrieve subsequent pages by using the returned continuation token in the next query. An empty continuation token is returned if there are no subsequent pages. */
  getApplicationTypeInfoListByName(
    applicationTypeName: string,
    options?: GetApplicationTypeInfoListByNameParameters
  ): Promise<
    GetApplicationTypeInfoListByName200Response | GetApplicationTypeInfoListByNamedefaultResponse
  >;
  /**
   * Provisions a Service Fabric application type with the cluster. The provision is required before any new applications can be instantiated.
   * The provision operation can be performed either on the application package specified by the relativePathInImageStore, or by using the URI of the external '.sfpkg'.
   */
  provisionApplicationType(
    options: ProvisionApplicationTypeParameters
  ): Promise<
    | ProvisionApplicationType200Response
    | ProvisionApplicationType202Response
    | ProvisionApplicationTypedefaultResponse
  >;
  /** This operation can only be performed if all application instances of the application type have been deleted. Once the application type is unregistered, no new application instances can be created for this particular application type. */
  unprovisionApplicationType(
    applicationTypeName: string,
    options: UnprovisionApplicationTypeParameters
  ): Promise<
    | UnprovisionApplicationType200Response
    | UnprovisionApplicationType202Response
    | UnprovisionApplicationTypedefaultResponse
  >;
  /** Gets the list containing the information about service types that are supported by a provisioned application type in a Service Fabric cluster. The provided application type must exist. Otherwise, a 404 status is returned. */
  getServiceTypeInfoList(
    applicationTypeName: string,
    options: GetServiceTypeInfoListParameters
  ): Promise<GetServiceTypeInfoList200Response | GetServiceTypeInfoListdefaultResponse>;
  /** Gets the information about a specific service type that is supported by a provisioned application type in a Service Fabric cluster. The provided application type must exist. Otherwise, a 404 status is returned. A 204 response is returned if the specified service type is not found in the cluster. */
  getServiceTypeInfoByName(
    applicationTypeName: string,
    serviceTypeName: string,
    options: GetServiceTypeInfoByNameParameters
  ): Promise<
    | GetServiceTypeInfoByName200Response
    | GetServiceTypeInfoByName204Response
    | GetServiceTypeInfoByNamedefaultResponse
  >;
  /** Gets the manifest describing a service type. The response contains the service manifest XML as a string. */
  getServiceManifest(
    applicationTypeName: string,
    options: GetServiceManifestParameters
  ): Promise<GetServiceManifest200Response | GetServiceManifestdefaultResponse>;
  /** Gets the list containing the information about service types from the applications deployed on a node in a Service Fabric cluster. The response includes the name of the service type, its registration status, the code package that registered it and activation ID of the service package. */
  getDeployedServiceTypeInfoList(
    nodeName: string,
    applicationId: string,
    options?: GetDeployedServiceTypeInfoListParameters
  ): Promise<
    GetDeployedServiceTypeInfoList200Response | GetDeployedServiceTypeInfoListdefaultResponse
  >;
  /** Gets the list containing the information about a specific service type from the applications deployed on a node in a Service Fabric cluster. The response includes the name of the service type, its registration status, the code package that registered it and activation ID of the service package. Each entry represents one activation of a service type, differentiated by the activation ID. */
  getDeployedServiceTypeInfoByName(
    nodeName: string,
    applicationId: string,
    serviceTypeName: string,
    options?: GetDeployedServiceTypeInfoByNameParameters
  ): Promise<
    | GetDeployedServiceTypeInfoByName200Response
    | GetDeployedServiceTypeInfoByName204Response
    | GetDeployedServiceTypeInfoByNamedefaultResponse
  >;
  /** Creates a Service Fabric application using the specified description. */
  createApplication(
    options: CreateApplicationParameters
  ): Promise<CreateApplication201Response | CreateApplicationdefaultResponse>;
  /** An application must be created before it can be deleted. Deleting an application will delete all services that are part of that application. By default, Service Fabric will try to close service replicas in a graceful manner and then delete the service. However, if a service is having issues closing the replica gracefully, the delete operation may take a long time or get stuck. Use the optional ForceRemove flag to skip the graceful close sequence and forcefully delete the application and all of its services. */
  deleteApplication(
    applicationId: string,
    options?: DeleteApplicationParameters
  ): Promise<DeleteApplication200Response | DeleteApplicationdefaultResponse>;
  /** Returns the load information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, minimum nodes, maximum nodes, the number of nodes the application is occupying currently, and application load metric information about the application. */
  getApplicationLoadInfo(
    applicationId: string,
    options?: GetApplicationLoadInfoParameters
  ): Promise<
    | GetApplicationLoadInfo200Response
    | GetApplicationLoadInfo204Response
    | GetApplicationLoadInfodefaultResponse
  >;
  /** Gets the information about the applications that were created or in the process of being created in the Service Fabric cluster and match the specified filters. The response includes the name, type, status, parameters, and other details about the application. If the applications do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. Filters ApplicationTypeName and ApplicationDefinitionKindFilter cannot be specified at the same time. */
  getApplicationInfoList(
    options?: GetApplicationInfoListParameters
  ): Promise<GetApplicationInfoList200Response | GetApplicationInfoListdefaultResponse>;
  /** Returns the information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, type, status, parameters, and other details about the application. */
  getApplicationInfo(
    applicationId: string,
    options?: GetApplicationInfoParameters
  ): Promise<
    | GetApplicationInfo200Response
    | GetApplicationInfo204Response
    | GetApplicationInfodefaultResponse
  >;
  /** Returns the heath state of the service fabric application. The response reports either Ok, Error or Warning health state. If the entity is not found in the health store, it will return Error. */
  getApplicationHealth(
    applicationId: string,
    options?: GetApplicationHealthParameters
  ): Promise<GetApplicationHealth200Response | GetApplicationHealthdefaultResponse>;
  /** Gets the health of a Service Fabric application. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. Use ClusterHealthPolicies to override the health policies used to evaluate the health. */
  getApplicationHealthUsingPolicy(
    applicationId: string,
    options?: GetApplicationHealthUsingPolicyParameters
  ): Promise<
    GetApplicationHealthUsingPolicy200Response | GetApplicationHealthUsingPolicydefaultResponse
  >;
  /**
   * Reports health state of the specified Service Fabric application. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, get application health and check that the report appears in the HealthEvents section.
   */
  reportApplicationHealth(
    applicationId: string,
    options: ReportApplicationHealthParameters
  ): Promise<ReportApplicationHealth200Response | ReportApplicationHealthdefaultResponse>;
  /**
   * Validates the supplied application upgrade parameters and starts upgrading the application if the parameters are valid.
   * Note, [ApplicationParameter](https://docs.microsoft.com/dotnet/api/system.fabric.description.applicationdescription.applicationparameters)s are not preserved across an application upgrade.
   * In order to preserve current application parameters, the user should get the parameters using [GetApplicationInfo](./GetApplicationInfo.md) operation first and pass them into the upgrade API call as shown in the example.
   */
  startApplicationUpgrade(
    applicationId: string,
    options: StartApplicationUpgradeParameters
  ): Promise<StartApplicationUpgrade200Response | StartApplicationUpgradedefaultResponse>;
  /** Returns information about the state of the latest application upgrade along with details to aid debugging application health issues. */
  getApplicationUpgrade(
    applicationId: string,
    options?: GetApplicationUpgradeParameters
  ): Promise<GetApplicationUpgrade200Response | GetApplicationUpgradedefaultResponse>;
  /** Updates the parameters of an ongoing application upgrade from the ones specified at the time of starting the application upgrade. This may be required to mitigate stuck application upgrades due to incorrect parameters or issues in the application to make progress. */
  updateApplicationUpgrade(
    applicationId: string,
    options: UpdateApplicationUpgradeParameters
  ): Promise<UpdateApplicationUpgrade200Response | UpdateApplicationUpgradedefaultResponse>;
  /** Updates a Service Fabric application instance. The set of properties that can be updated are a subset of the properties that were specified at the time of creating the application. */
  updateApplication(
    applicationId: string,
    options: UpdateApplicationParameters
  ): Promise<UpdateApplication200Response | UpdateApplicationdefaultResponse>;
  /** Resumes an unmonitored manual Service Fabric application upgrade. Service Fabric upgrades one upgrade domain at a time. For unmonitored manual upgrades, after Service Fabric finishes an upgrade domain, it waits for you to call this API before proceeding to the next upgrade domain. */
  resumeApplicationUpgrade(
    applicationId: string,
    options: ResumeApplicationUpgradeParameters
  ): Promise<ResumeApplicationUpgrade200Response | ResumeApplicationUpgradedefaultResponse>;
  /** Starts rolling back the current application upgrade to the previous version. This API can only be used to roll back the current in-progress upgrade that is rolling forward to new version. If the application is not currently being upgraded use StartApplicationUpgrade API to upgrade it to desired version, including rolling back to a previous version. */
  rollbackApplicationUpgrade(
    applicationId: string,
    options?: RollbackApplicationUpgradeParameters
  ): Promise<RollbackApplicationUpgrade200Response | RollbackApplicationUpgradedefaultResponse>;
  /** Gets the list of applications deployed on a Service Fabric node. The results do not include information about deployed system applications unless explicitly queried for by ID. Results encompass deployed applications in active, activating, and downloading states. This query requires that the node name corresponds to a node on the cluster. The query fails if the provided node name does not point to any active Service Fabric nodes on the cluster. */
  getDeployedApplicationInfoList(
    nodeName: string,
    options?: GetDeployedApplicationInfoListParameters
  ): Promise<
    GetDeployedApplicationInfoList200Response | GetDeployedApplicationInfoListdefaultResponse
  >;
  /** This query returns system application information if the application ID provided is for system application. Results encompass deployed applications in active, activating, and downloading states. This query requires that the node name corresponds to a node on the cluster. The query fails if the provided node name does not point to any active Service Fabric nodes on the cluster. */
  getDeployedApplicationInfo(
    nodeName: string,
    applicationId: string,
    options?: GetDeployedApplicationInfoParameters
  ): Promise<
    | GetDeployedApplicationInfo200Response
    | GetDeployedApplicationInfo204Response
    | GetDeployedApplicationInfodefaultResponse
  >;
  /** Gets the information about health of an application deployed on a Service Fabric node. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed application based on health state. Use DeployedServicePackagesHealthStateFilter to optionally filter for DeployedServicePackageHealth children based on health state. */
  getDeployedApplicationHealth(
    nodeName: string,
    applicationId: string,
    options?: GetDeployedApplicationHealthParameters
  ): Promise<GetDeployedApplicationHealth200Response | GetDeployedApplicationHealthdefaultResponse>;
  /** Gets the information about health of an application deployed on a Service Fabric node using the specified policy. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed application based on health state. Use DeployedServicePackagesHealthStateFilter to optionally filter for DeployedServicePackageHealth children based on health state. Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the deployed application. */
  getDeployedApplicationHealthUsingPolicy(
    nodeName: string,
    applicationId: string,
    options?: GetDeployedApplicationHealthUsingPolicyParameters
  ): Promise<
    | GetDeployedApplicationHealthUsingPolicy200Response
    | GetDeployedApplicationHealthUsingPolicydefaultResponse
  >;
  /**
   * Reports health state of the application deployed on a Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, get deployed application health and check that the report appears in the HealthEvents section.
   */
  reportDeployedApplicationHealth(
    nodeName: string,
    applicationId: string,
    options: ReportDeployedApplicationHealthParameters
  ): Promise<
    ReportDeployedApplicationHealth200Response | ReportDeployedApplicationHealthdefaultResponse
  >;
  /** The response contains the application manifest XML as a string. */
  getApplicationManifest(
    applicationTypeName: string,
    options: GetApplicationManifestParameters
  ): Promise<GetApplicationManifest200Response | GetApplicationManifestdefaultResponse>;
  /** Returns the information about all services belonging to the application specified by the application ID. */
  getServiceInfoList(
    applicationId: string,
    options?: GetServiceInfoListParameters
  ): Promise<GetServiceInfoList200Response | GetServiceInfoListdefaultResponse>;
  /** Returns the information about the specified service belonging to the specified Service Fabric application. */
  getServiceInfo(
    applicationId: string,
    serviceId: string,
    options?: GetServiceInfoParameters
  ): Promise<GetServiceInfo200Response | GetServiceInfo204Response | GetServiceInfodefaultResponse>;
  /** Gets the name of the application for the specified service. A 404 FABRIC_E_SERVICE_DOES_NOT_EXIST error is returned if a service with the provided service ID does not exist. */
  getApplicationNameInfo(
    serviceId: string,
    options?: GetApplicationNameInfoParameters
  ): Promise<GetApplicationNameInfo200Response | GetApplicationNameInfodefaultResponse>;
  /** This api allows creating a new Service Fabric stateless or stateful service under a specified Service Fabric application. The description for creating the service includes partitioning information and optional properties for placement and load balancing. Some of the properties can later be modified using `UpdateService` API. */
  createService(
    applicationId: string,
    options: CreateServiceParameters
  ): Promise<CreateService202Response | CreateServicedefaultResponse>;
  /** Creates a Service Fabric service from the service template defined in the application manifest. A service template contains the properties that will be same for the service instance of the same type. The API allows overriding the properties that are usually different for different services of the same service type. */
  createServiceFromTemplate(
    applicationId: string,
    options: CreateServiceFromTemplateParameters
  ): Promise<CreateServiceFromTemplate202Response | CreateServiceFromTemplatedefaultResponse>;
  /** A service must be created before it can be deleted. By default, Service Fabric will try to close service replicas in a graceful manner and then delete the service. However, if the service is having issues closing the replica gracefully, the delete operation may take a long time or get stuck. Use the optional ForceRemove flag to skip the graceful close sequence and forcefully delete the service. */
  deleteService(
    serviceId: string,
    options?: DeleteServiceParameters
  ): Promise<DeleteService200Response | DeleteServicedefaultResponse>;
  /** This API allows updating properties of a running Service Fabric service. The set of properties that can be updated are a subset of the properties that were specified at the time of creating the service. The current set of properties can be obtained using `GetServiceDescription` API. Note that updating the properties of a running service is different than upgrading your application using `StartApplicationUpgrade` API. The upgrade is a long running background operation that involves moving the application from one version to another, one upgrade domain at a time, whereas update applies the new properties immediately to the service. */
  updateService(
    serviceId: string,
    options: UpdateServiceParameters
  ): Promise<UpdateService200Response | UpdateServicedefaultResponse>;
  /** Gets the description of an existing Service Fabric service. A service must be created before its description can be obtained. */
  getServiceDescription(
    serviceId: string,
    options?: GetServiceDescriptionParameters
  ): Promise<GetServiceDescription200Response | GetServiceDescriptiondefaultResponse>;
  /**
   * Gets the health information of the specified service.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
   * Use PartitionsHealthStateFilter to filter the collection of partitions returned.
   * If you specify a service that does not exist in the health store, this request returns an error.
   */
  getServiceHealth(
    serviceId: string,
    options?: GetServiceHealthParameters
  ): Promise<GetServiceHealth200Response | GetServiceHealthdefaultResponse>;
  /**
   * Gets the health information of the specified service.
   * If the application health policy is specified, the health evaluation uses it to get the aggregated health state.
   * If the policy is not specified, the health evaluation uses the application health policy defined in the application manifest, or the default health policy, if no policy is defined in the manifest.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
   * Use PartitionsHealthStateFilter to filter the collection of partitions returned.
   * If you specify a service that does not exist in the health store, this request returns an error.
   */
  getServiceHealthUsingPolicy(
    serviceId: string,
    options?: GetServiceHealthUsingPolicyParameters
  ): Promise<GetServiceHealthUsingPolicy200Response | GetServiceHealthUsingPolicydefaultResponse>;
  /**
   * Reports health state of the specified Service Fabric service. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetServiceHealth and check that the report appears in the HealthEvents section.
   */
  reportServiceHealth(
    serviceId: string,
    options: ReportServiceHealthParameters
  ): Promise<ReportServiceHealth200Response | ReportServiceHealthdefaultResponse>;
  /** Resolve a Service Fabric service partition to get the endpoints of the service replicas. */
  resolveService(
    serviceId: string,
    options?: ResolveServiceParameters
  ): Promise<ResolveService200Response | ResolveServicedefaultResponse>;
  /**
   * Returns the information about the unplaced replicas of the service.
   * If PartitionId is specified, then result will contain information only about unplaced replicas for that partition.
   * If PartitionId is not specified, then result will contain information about unplaced replicas for all partitions of that service.
   * If OnlyQueryPrimaries is set to true, then result will contain information only about primary replicas, and will ignore unplaced secondary replicas.
   */
  getUnplacedReplicaInformation(
    serviceId: string,
    options?: GetUnplacedReplicaInformationParameters
  ): Promise<
    GetUnplacedReplicaInformation200Response | GetUnplacedReplicaInformationdefaultResponse
  >;
  /** Retrieves partitions which are most/least loaded according to specified metric. */
  getLoadedPartitionInfoList(
    options: GetLoadedPartitionInfoListParameters
  ): Promise<GetLoadedPartitionInfoList200Response | GetLoadedPartitionInfoListdefaultResponse>;
  /** The response includes the partition ID, partitioning scheme information, keys supported by the partition, status, health, and other details about the partition. */
  getPartitionInfoList(
    serviceId: string,
    options?: GetPartitionInfoListParameters
  ): Promise<GetPartitionInfoList200Response | GetPartitionInfoListdefaultResponse>;
  /** Gets the information about the specified partition. The response includes the partition ID, partitioning scheme information, keys supported by the partition, status, health, and other details about the partition. */
  getPartitionInfo(
    partitionId: string,
    options?: GetPartitionInfoParameters
  ): Promise<
    GetPartitionInfo200Response | GetPartitionInfo204Response | GetPartitionInfodefaultResponse
  >;
  /** Gets name of the service for the specified partition. A 404 error is returned if the partition ID does not exist in the cluster. */
  getServiceNameInfo(
    partitionId: string,
    options?: GetServiceNameInfoParameters
  ): Promise<GetServiceNameInfo200Response | GetServiceNameInfodefaultResponse>;
  /**
   * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
   * Use ReplicasHealthStateFilter to filter the collection of ReplicaHealthState objects on the partition.
   * If you specify a partition that does not exist in the health store, this request returns an error.
   */
  getPartitionHealth(
    partitionId: string,
    options?: GetPartitionHealthParameters
  ): Promise<GetPartitionHealth200Response | GetPartitionHealthdefaultResponse>;
  /**
   * Gets the health information of the specified partition.
   * If the application health policy is specified, the health evaluation uses it to get the aggregated health state.
   * If the policy is not specified, the health evaluation uses the application health policy defined in the application manifest, or the default health policy, if no policy is defined in the manifest.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the partition based on the health state.
   * Use ReplicasHealthStateFilter to filter the collection of ReplicaHealthState objects on the partition. Use ApplicationHealthPolicy in the POST body to override the health policies used to evaluate the health.
   * If you specify a partition that does not exist in the health store, this request returns an error.
   */
  getPartitionHealthUsingPolicy(
    partitionId: string,
    options?: GetPartitionHealthUsingPolicyParameters
  ): Promise<
    GetPartitionHealthUsingPolicy200Response | GetPartitionHealthUsingPolicydefaultResponse
  >;
  /**
   * Reports health state of the specified Service Fabric partition. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Partition, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetPartitionHealth and check that the report appears in the HealthEvents section.
   */
  reportPartitionHealth(
    partitionId: string,
    options: ReportPartitionHealthParameters
  ): Promise<ReportPartitionHealth200Response | ReportPartitionHealthdefaultResponse>;
  /**
   * Returns information about the load of a specified partition.
   * The response includes a list of load reports for a Service Fabric partition.
   * Each report includes the load metric name, value, and last reported time in UTC.
   */
  getPartitionLoadInformation(
    partitionId: string,
    options?: GetPartitionLoadInformationParameters
  ): Promise<GetPartitionLoadInformation200Response | GetPartitionLoadInformationdefaultResponse>;
  /** Resets the current load of a Service Fabric partition to the default load for the service. */
  resetPartitionLoad(
    partitionId: string,
    options?: ResetPartitionLoadParameters
  ): Promise<ResetPartitionLoad200Response | ResetPartitionLoaddefaultResponse>;
  /** This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
  recoverPartition(
    partitionId: string,
    options?: RecoverPartitionParameters
  ): Promise<RecoverPartition200Response | RecoverPartitiondefaultResponse>;
  /** Indicates to the Service Fabric cluster that it should attempt to recover the specified service that is currently stuck in quorum loss. This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
  recoverServicePartitions(
    serviceId: string,
    options?: RecoverServicePartitionsParameters
  ): Promise<RecoverServicePartitions200Response | RecoverServicePartitionsdefaultResponse>;
  /** Indicates to the Service Fabric cluster that it should attempt to recover the system services that are currently stuck in quorum loss. This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
  recoverSystemPartitions(
    options?: RecoverSystemPartitionsParameters
  ): Promise<RecoverSystemPartitions200Response | RecoverSystemPartitionsdefaultResponse>;
  /** This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
  recoverAllPartitions(
    options?: RecoverAllPartitionsParameters
  ): Promise<RecoverAllPartitions200Response | RecoverAllPartitionsdefaultResponse>;
  /**
   * This command moves the primary replica of a partition of a stateful service, respecting all constraints.
   * If NodeName parameter is specified, primary will be moved to the specified node (if constraints allow it).
   * If NodeName parameter is not specified, primary replica will be moved to a random node in the cluster.
   * If IgnoreConstraints parameter is specified and set to true, then primary will be moved regardless of the constraints.
   */
  movePrimaryReplica(
    partitionId: string,
    options?: MovePrimaryReplicaParameters
  ): Promise<MovePrimaryReplica200Response | MovePrimaryReplicadefaultResponse>;
  /**
   * This command moves the secondary replica of a partition of a stateful service, respecting all constraints.
   * CurrentNodeName parameter must be specified to identify the replica that is moved.
   * Source node name must be specified, but new node name can be omitted, and in that case replica is moved to a random node.
   * If IgnoreConstraints parameter is specified and set to true, then secondary will be moved regardless of the constraints.
   */
  moveSecondaryReplica(
    partitionId: string,
    options: MoveSecondaryReplicaParameters
  ): Promise<MoveSecondaryReplica200Response | MoveSecondaryReplicadefaultResponse>;
  /** Updates the load value and predicted load value for all the partitions provided for specified metrics. */
  updatePartitionLoad(
    options: UpdatePartitionLoadParameters
  ): Promise<UpdatePartitionLoad200Response | UpdatePartitionLoaddefaultResponse>;
  /**
   * This command moves the instance of a partition of a stateless service, respecting all constraints.
   * Partition id and service name must be specified to be able to move the instance.
   * CurrentNodeName when specified identifies the instance that is moved. If not specified, random instance will be moved
   * New node name can be omitted, and in that case instance is moved to a random node.
   * If IgnoreConstraints parameter is specified and set to true, then instance will be moved regardless of the constraints.
   */
  moveInstance(
    serviceId: string,
    partitionId: string,
    options?: MoveInstanceParameters
  ): Promise<MoveInstance200Response | MoveInstancedefaultResponse>;
  /**
   * This command moves the auxiliary replica of a partition of a stateful service, respecting all constraints.
   * CurrentNodeName can be omitted, and in that case a random auxiliary replica is chosen.
   * NewNodeName can be omitted, and in that case the auxiliary replica is moved to a random node.
   * If IgnoreConstraints parameter is specified and set to true, then auxiliary will be moved regardless of the constraints.
   */
  moveAuxiliaryReplica(
    serviceId: string,
    partitionId: string,
    options?: MoveAuxiliaryReplicaParameters
  ): Promise<MoveAuxiliaryReplica200Response | MoveAuxiliaryReplicadefaultResponse>;
  /**
   * For clusters that have the Repair Manager Service configured,
   * this API provides a way to create repair tasks that run automatically or manually.
   * For repair tasks that run automatically, an appropriate repair executor
   * must be running for each repair action to run automatically.
   * These are currently only available in specially-configured Azure Cloud Services.
   *
   * To create a manual repair task, provide the set of impacted node names and the
   * expected impact. When the state of the created repair task changes to approved,
   * you can safely perform repair actions on those nodes.
   *
   * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
   */
  createRepairTask(
    options: CreateRepairTaskParameters
  ): Promise<CreateRepairTask200Response | CreateRepairTaskdefaultResponse>;
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  cancelRepairTask(
    options: CancelRepairTaskParameters
  ): Promise<CancelRepairTask200Response | CancelRepairTaskdefaultResponse>;
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  deleteRepairTask(
    options: DeleteRepairTaskParameters
  ): Promise<DeleteRepairTask200Response | DeleteRepairTaskdefaultResponse>;
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  getRepairTaskList(
    options?: GetRepairTaskListParameters
  ): Promise<GetRepairTaskList200Response | GetRepairTaskListdefaultResponse>;
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  forceApproveRepairTask(
    options: ForceApproveRepairTaskParameters
  ): Promise<ForceApproveRepairTask200Response | ForceApproveRepairTaskdefaultResponse>;
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  updateRepairTaskHealthPolicy(
    options: UpdateRepairTaskHealthPolicyParameters
  ): Promise<UpdateRepairTaskHealthPolicy200Response | UpdateRepairTaskHealthPolicydefaultResponse>;
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  updateRepairExecutionState(
    options: UpdateRepairExecutionStateParameters
  ): Promise<UpdateRepairExecutionState200Response | UpdateRepairExecutionStatedefaultResponse>;
  /** The GetReplicas endpoint returns information about the replicas of the specified partition. The response includes the ID, role, status, health, node name, uptime, and other details about the replica. */
  getReplicaInfoList(
    partitionId: string,
    options?: GetReplicaInfoListParameters
  ): Promise<GetReplicaInfoList200Response | GetReplicaInfoListdefaultResponse>;
  /** The response includes the ID, role, status, health, node name, uptime, and other details about the replica. */
  getReplicaInfo(
    partitionId: string,
    replicaId: string,
    options?: GetReplicaInfoParameters
  ): Promise<GetReplicaInfo200Response | GetReplicaInfo204Response | GetReplicaInfodefaultResponse>;
  /**
   * Gets the health of a Service Fabric replica.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the replica based on the health state.
   */
  getReplicaHealth(
    partitionId: string,
    replicaId: string,
    options?: GetReplicaHealthParameters
  ): Promise<GetReplicaHealth200Response | GetReplicaHealthdefaultResponse>;
  /**
   * Gets the health of a Service Fabric stateful service replica or stateless service instance.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
   * Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the replica.
   */
  getReplicaHealthUsingPolicy(
    partitionId: string,
    replicaId: string,
    options?: GetReplicaHealthUsingPolicyParameters
  ): Promise<GetReplicaHealthUsingPolicy200Response | GetReplicaHealthUsingPolicydefaultResponse>;
  /**
   * Reports health state of the specified Service Fabric replica. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Replica, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetReplicaHealth and check that the report appears in the HealthEvents section.
   */
  reportReplicaHealth(
    partitionId: string,
    replicaId: string,
    options: ReportReplicaHealthParameters
  ): Promise<ReportReplicaHealth200Response | ReportReplicaHealthdefaultResponse>;
  /** Gets the list containing the information about replicas deployed on a Service Fabric node. The information include partition ID, replica ID, status of the replica, name of the service, name of the service type, and other information. Use PartitionId or ServiceManifestName query parameters to return information about the deployed replicas matching the specified values for those parameters. */
  getDeployedServiceReplicaInfoList(
    nodeName: string,
    applicationId: string,
    options?: GetDeployedServiceReplicaInfoListParameters
  ): Promise<
    | GetDeployedServiceReplicaInfoList200Response
    | GetDeployedServiceReplicaInfoList204Response
    | GetDeployedServiceReplicaInfoListdefaultResponse
  >;
  /** Gets the details of the replica deployed on a Service Fabric node. The information includes service kind, service name, current service operation, current service operation start date time, partition ID, replica/instance ID, reported load, and other information. */
  getDeployedServiceReplicaDetailInfo(
    nodeName: string,
    partitionId: string,
    replicaId: string,
    options?: GetDeployedServiceReplicaDetailInfoParameters
  ): Promise<
    | GetDeployedServiceReplicaDetailInfo200Response
    | GetDeployedServiceReplicaDetailInfodefaultResponse
  >;
  /** Gets the details of the replica deployed on a Service Fabric node. The information includes service kind, service name, current service operation, current service operation start date time, partition ID, replica/instance ID, reported load, and other information. */
  getDeployedServiceReplicaDetailInfoByPartitionId(
    nodeName: string,
    partitionId: string,
    options?: GetDeployedServiceReplicaDetailInfoByPartitionIdParameters
  ): Promise<
    | GetDeployedServiceReplicaDetailInfoByPartitionId200Response
    | GetDeployedServiceReplicaDetailInfoByPartitionIddefaultResponse
  >;
  /** Restarts a service replica of a persisted service running on a node. Warning - There are no safety checks performed when this API is used. Incorrect use of this API can lead to availability loss for stateful services. */
  restartReplica(
    nodeName: string,
    partitionId: string,
    replicaId: string,
    options?: RestartReplicaParameters
  ): Promise<RestartReplica200Response | RestartReplicadefaultResponse>;
  /** This API simulates a Service Fabric replica failure by removing a replica from a Service Fabric cluster. The removal closes the replica, transitions the replica to the role None, and then removes all of the state information of the replica from the cluster. This API tests the replica state removal path, and simulates the report fault permanent path through client APIs. Warning - There are no safety checks performed when this API is used. Incorrect use of this API can lead to data loss for stateful services. In addition, the forceRemove flag impacts all other replicas hosted in the same process. */
  removeReplica(
    nodeName: string,
    partitionId: string,
    replicaId: string,
    options?: RemoveReplicaParameters
  ): Promise<RemoveReplica200Response | RemoveReplicadefaultResponse>;
  /** Returns the information about the service packages deployed on a Service Fabric node for the given application. */
  getDeployedServicePackageInfoList(
    nodeName: string,
    applicationId: string,
    options?: GetDeployedServicePackageInfoListParameters
  ): Promise<
    GetDeployedServicePackageInfoList200Response | GetDeployedServicePackageInfoListdefaultResponse
  >;
  /** Returns the information about the service packages deployed on a Service Fabric node for the given application. These results are of service packages whose name match exactly the service package name specified as the parameter. */
  getDeployedServicePackageInfoListByName(
    nodeName: string,
    applicationId: string,
    servicePackageName: string,
    options?: GetDeployedServicePackageInfoListByNameParameters
  ): Promise<
    | GetDeployedServicePackageInfoListByName200Response
    | GetDeployedServicePackageInfoListByName204Response
    | GetDeployedServicePackageInfoListByNamedefaultResponse
  >;
  /** Gets the information about health of a service package for a specific application deployed on a Service Fabric node. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed service package based on health state. */
  getDeployedServicePackageHealth(
    nodeName: string,
    applicationId: string,
    servicePackageName: string,
    options?: GetDeployedServicePackageHealthParameters
  ): Promise<
    GetDeployedServicePackageHealth200Response | GetDeployedServicePackageHealthdefaultResponse
  >;
  /** Gets the information about health of a service package for a specific application deployed on a Service Fabric node. using the specified policy. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed service package based on health state. Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the deployed service package. */
  getDeployedServicePackageHealthUsingPolicy(
    nodeName: string,
    applicationId: string,
    servicePackageName: string,
    options?: GetDeployedServicePackageHealthUsingPolicyParameters
  ): Promise<
    | GetDeployedServicePackageHealthUsingPolicy200Response
    | GetDeployedServicePackageHealthUsingPolicydefaultResponse
  >;
  /**
   * Reports health state of the service package of the application deployed on a Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, get deployed service package health and check that the report appears in the HealthEvents section.
   */
  reportDeployedServicePackageHealth(
    nodeName: string,
    applicationId: string,
    servicePackageName: string,
    options: ReportDeployedServicePackageHealthParameters
  ): Promise<
    | ReportDeployedServicePackageHealth200Response
    | ReportDeployedServicePackageHealthdefaultResponse
  >;
  /** This API provides a way to download code packages including the container images on a specific node outside of the normal application deployment and upgrade path. This is useful for the large code packages and container images to be present on the node before the actual application deployment and upgrade, thus significantly reducing the total time required for the deployment or upgrade. */
  deployServicePackageToNode(
    nodeName: string,
    options: DeployServicePackageToNodeParameters
  ): Promise<DeployServicePackageToNode200Response | DeployServicePackageToNodedefaultResponse>;
  /** Gets the list of code packages deployed on a Service Fabric node for the given application. */
  getDeployedCodePackageInfoList(
    nodeName: string,
    applicationId: string,
    options?: GetDeployedCodePackageInfoListParameters
  ): Promise<
    GetDeployedCodePackageInfoList200Response | GetDeployedCodePackageInfoListdefaultResponse
  >;
  /** Restarts a code package deployed on a Service Fabric node in a cluster. This aborts the code package process, which will restart all the user service replicas hosted in that process. */
  restartDeployedCodePackage(
    nodeName: string,
    applicationId: string,
    options: RestartDeployedCodePackageParameters
  ): Promise<RestartDeployedCodePackage200Response | RestartDeployedCodePackagedefaultResponse>;
  /** Gets the container logs for container deployed on a Service Fabric node for the given code package. */
  getContainerLogsDeployedOnNode(
    nodeName: string,
    applicationId: string,
    options: GetContainerLogsDeployedOnNodeParameters
  ): Promise<
    GetContainerLogsDeployedOnNode200Response | GetContainerLogsDeployedOnNodedefaultResponse
  >;
  /** Invoke container API on a container deployed on a Service Fabric node for the given code package. */
  invokeContainerApi(
    nodeName: string,
    applicationId: string,
    options: InvokeContainerApiParameters
  ): Promise<InvokeContainerApi200Response | InvokeContainerApidefaultResponse>;
  /** Compose is a file format that describes multi-container applications. This API allows deploying container based applications defined in compose format in a Service Fabric cluster. Once the deployment is created, its status can be tracked via the `GetComposeDeploymentStatus` API. */
  createComposeDeployment(
    options: CreateComposeDeploymentParameters
  ): Promise<CreateComposeDeployment202Response | CreateComposeDeploymentdefaultResponse>;
  /** Returns the status of the compose deployment that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, status, and other details about the deployment. */
  getComposeDeploymentStatus(
    deploymentName: string,
    options?: GetComposeDeploymentStatusParameters
  ): Promise<GetComposeDeploymentStatus200Response | GetComposeDeploymentStatusdefaultResponse>;
  /** Gets the status about the compose deployments that were created or in the process of being created in the Service Fabric cluster. The response includes the name, status, and other details about the compose deployments. If the list of deployments do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. */
  getComposeDeploymentStatusList(
    options?: GetComposeDeploymentStatusListParameters
  ): Promise<
    GetComposeDeploymentStatusList200Response | GetComposeDeploymentStatusListdefaultResponse
  >;
  /** Returns the information about the state of the compose deployment upgrade along with details to aid debugging application health issues. */
  getComposeDeploymentUpgradeProgress(
    deploymentName: string,
    options?: GetComposeDeploymentUpgradeProgressParameters
  ): Promise<
    | GetComposeDeploymentUpgradeProgress200Response
    | GetComposeDeploymentUpgradeProgressdefaultResponse
  >;
  /** Deletes an existing Service Fabric compose deployment. */
  removeComposeDeployment(
    deploymentName: string,
    options?: RemoveComposeDeploymentParameters
  ): Promise<RemoveComposeDeployment202Response | RemoveComposeDeploymentdefaultResponse>;
  /** Validates the supplied upgrade parameters and starts upgrading the deployment if the parameters are valid. */
  startComposeDeploymentUpgrade(
    deploymentName: string,
    options: StartComposeDeploymentUpgradeParameters
  ): Promise<
    StartComposeDeploymentUpgrade202Response | StartComposeDeploymentUpgradedefaultResponse
  >;
  /** Rollback a service fabric compose deployment upgrade. */
  startRollbackComposeDeploymentUpgrade(
    deploymentName: string,
    options?: StartRollbackComposeDeploymentUpgradeParameters
  ): Promise<
    | StartRollbackComposeDeploymentUpgrade200Response
    | StartRollbackComposeDeploymentUpgradedefaultResponse
  >;
  /** Get the status of Chaos indicating whether or not Chaos is running, the Chaos parameters used for running Chaos and the status of the Chaos Schedule. */
  getChaos(options?: GetChaosParameters): Promise<GetChaos200Response | GetChaosdefaultResponse>;
  /**
   * If Chaos is not already running in the cluster, it starts Chaos with the passed in Chaos parameters.
   * If Chaos is already running when this call is made, the call fails with the error code FABRIC_E_CHAOS_ALREADY_RUNNING.
   * Refer to the article [Induce controlled Chaos in Service Fabric clusters](https://docs.microsoft.com/azure/service-fabric/service-fabric-controlled-chaos) for more details.
   */
  startChaos(
    options: StartChaosParameters
  ): Promise<StartChaos200Response | StartChaosdefaultResponse>;
  /**
   * Stops Chaos from executing new faults. In-flight faults will continue to execute until they are complete. The current Chaos Schedule is put into a stopped state.
   * Once a schedule is stopped, it will stay in the stopped state and not be used to Chaos Schedule new runs of Chaos. A new Chaos Schedule must be set in order to resume scheduling.
   */
  stopChaos(
    options?: StopChaosParameters
  ): Promise<StopChaos200Response | StopChaosdefaultResponse>;
  /**
   * To get the next segment of the Chaos events, you can specify the ContinuationToken. To get the start of a new segment of Chaos events, you can specify the time range
   * through StartTimeUtc and EndTimeUtc. You cannot specify both the ContinuationToken and the time range in the same call.
   * When there are more than 100 Chaos events, the Chaos events are returned in multiple segments where a segment contains no more than 100 Chaos events and to get the next segment you make a call to this API with the continuation token.
   */
  getChaosEvents(
    options?: GetChaosEventsParameters
  ): Promise<GetChaosEvents200Response | GetChaosEventsdefaultResponse>;
  /** Gets the version of the Chaos Schedule in use and the Chaos Schedule that defines when and how to run Chaos. */
  getChaosSchedule(
    options?: GetChaosScheduleParameters
  ): Promise<GetChaosSchedule200Response | GetChaosScheduledefaultResponse>;
  /**
   * Chaos will automatically schedule runs based on the Chaos Schedule.
   * The Chaos Schedule will be updated if the provided version matches the version on the server.
   * When updating the Chaos Schedule, the version on the server is incremented by 1.
   * The version on the server will wrap back to 0 after reaching a large number.
   * If Chaos is running when this call is made, the call will fail.
   */
  postChaosSchedule(
    options: PostChaosScheduleParameters
  ): Promise<PostChaosSchedule200Response | PostChaosScheduledefaultResponse>;
  /** Uploads contents of the file to the image store. Use this API if the file is small enough to upload again if the connection fails. The file's data needs to be added to the request body. The contents will be uploaded to the specified path. Image store service uses a mark file to indicate the availability of the folder. The mark file is an empty file named "_.dir". The mark file is generated by the image store service when all files in a folder are uploaded. When using File-by-File approach to upload application package in REST, the image store service isn't aware of the file hierarchy of the application package; you need to create a mark file per folder and upload it last, to let the image store service know that the folder is complete. */
  uploadFile(
    contentPath: string,
    options?: UploadFileParameters
  ): Promise<UploadFile200Response | UploadFiledefaultResponse>;
  /** Returns the information about the image store content at the specified contentPath. The contentPath is relative to the root of the image store. */
  getImageStoreContent(
    contentPath: string,
    options?: GetImageStoreContentParameters
  ): Promise<GetImageStoreContent200Response | GetImageStoreContentdefaultResponse>;
  /** Deletes existing image store content being found within the given image store relative path. This command can be used to delete uploaded application packages once they are provisioned. */
  deleteImageStoreContent(
    contentPath: string,
    options?: DeleteImageStoreContentParameters
  ): Promise<DeleteImageStoreContent200Response | DeleteImageStoreContentdefaultResponse>;
  /** Returns the information about the image store content at the root of the image store. */
  getImageStoreRootContent(
    options?: GetImageStoreRootContentParameters
  ): Promise<GetImageStoreRootContent200Response | GetImageStoreRootContentdefaultResponse>;
  /** Copies the image store content from the source image store relative path to the destination image store relative path. */
  copyImageStoreContent(
    options: CopyImageStoreContentParameters
  ): Promise<CopyImageStoreContent200Response | CopyImageStoreContentdefaultResponse>;
  /** The DELETE request will cause the existing upload session to expire and remove any previously uploaded file chunks. */
  deleteImageStoreUploadSession(
    options: DeleteImageStoreUploadSessionParameters
  ): Promise<
    DeleteImageStoreUploadSession200Response | DeleteImageStoreUploadSessiondefaultResponse
  >;
  /** When all file chunks have been uploaded, the upload session needs to be committed explicitly to complete the upload. Image store preserves the upload session until the expiration time, which is 30 minutes after the last chunk received. */
  commitImageStoreUploadSession(
    options: CommitImageStoreUploadSessionParameters
  ): Promise<
    CommitImageStoreUploadSession200Response | CommitImageStoreUploadSessiondefaultResponse
  >;
  /** Gets the image store upload session identified by the given ID. User can query the upload session at any time during uploading. */
  getImageStoreUploadSessionById(
    options: GetImageStoreUploadSessionByIdParameters
  ): Promise<
    GetImageStoreUploadSessionById200Response | GetImageStoreUploadSessionByIddefaultResponse
  >;
  /** Gets the image store upload session associated with the given image store relative path. User can query the upload session at any time during uploading. */
  getImageStoreUploadSessionByPath(
    contentPath: string,
    options?: GetImageStoreUploadSessionByPathParameters
  ): Promise<
    GetImageStoreUploadSessionByPath200Response | GetImageStoreUploadSessionByPathdefaultResponse
  >;
  /**
   * Uploads a file chunk to the image store with the specified upload session ID and image store relative path. This API allows user to resume the file upload operation. user doesn't have to restart the file upload from scratch whenever there is a network interruption. Use this option if the file size is large.
   *
   * To perform a resumable file upload, user need to break the file into multiple chunks and upload these chunks to the image store one-by-one. Chunks don't have to be uploaded in order. If the file represented by the image store relative path already exists, it will be overwritten when the upload session commits.
   */
  uploadFileChunk(
    contentPath: string,
    options: UploadFileChunkParameters
  ): Promise<UploadFileChunk200Response | UploadFileChunkdefaultResponse>;
  /** Returns the total size of files at the root and children folders in image store. */
  getImageStoreRootFolderSize(
    options?: GetImageStoreRootFolderSizeParameters
  ): Promise<GetImageStoreRootFolderSize200Response | GetImageStoreRootFolderSizedefaultResponse>;
  /** Gets the total size of file under a image store folder, specified by contentPath. The contentPath is relative to the root of the image store. */
  getImageStoreFolderSize(
    contentPath: string,
    options?: GetImageStoreFolderSizeParameters
  ): Promise<GetImageStoreFolderSize200Response | GetImageStoreFolderSizedefaultResponse>;
  /** Returns information about the primary ImageStore replica, such as disk capacity and available disk space at the node it is on, and several categories of the ImageStore's file system usage. */
  getImageStoreInfo(
    options?: GetImageStoreInfoParameters
  ): Promise<GetImageStoreInfo200Response | GetImageStoreInfodefaultResponse>;
  /**
   * For clusters that have one or more instances of the Infrastructure Service configured,
   * this API provides a way to send infrastructure-specific commands to a particular
   * instance of the Infrastructure Service.
   *
   * Available commands and their corresponding response formats vary depending upon
   * the infrastructure on which the cluster is running.
   *
   * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
   */
  invokeInfrastructureCommand(
    options: InvokeInfrastructureCommandParameters
  ): Promise<InvokeInfrastructureCommand200Response | InvokeInfrastructureCommanddefaultResponse>;
  /**
   * For clusters that have one or more instances of the Infrastructure Service configured,
   * this API provides a way to send infrastructure-specific queries to a particular
   * instance of the Infrastructure Service.
   *
   * Available commands and their corresponding response formats vary depending upon
   * the infrastructure on which the cluster is running.
   *
   * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
   */
  invokeInfrastructureQuery(
    options: InvokeInfrastructureQueryParameters
  ): Promise<InvokeInfrastructureQuery200Response | InvokeInfrastructureQuerydefaultResponse>;
  /**
   * This API will induce data loss for the specified partition. It will trigger a call to the OnDataLoss API of the partition.
   * Actual data loss will depend on the specified DataLossMode.
   *
   * - PartialDataLoss - Only a quorum of replicas are removed and OnDataLoss is triggered for the partition but actual data loss depends on the presence of in-flight replication.
   * - FullDataLoss - All replicas are removed hence all data is lost and OnDataLoss is triggered.
   *
   * This API should only be called with a stateful service as the target.
   *
   * Calling this API with a system service as the target is not advised.
   *
   * Note:  Once this API has been called, it cannot be reversed. Calling CancelOperation will only stop execution and clean up internal system state.
   * It will not restore data if the command has progressed far enough to cause data loss.
   *
   * Call the GetDataLossProgress API with the same OperationId to return information on the operation started with this API.
   */
  startDataLoss(
    serviceId: string,
    partitionId: string,
    options: StartDataLossParameters
  ): Promise<StartDataLoss202Response | StartDataLossdefaultResponse>;
  /** Gets the progress of a data loss operation started with StartDataLoss, using the OperationId. */
  getDataLossProgress(
    serviceId: string,
    partitionId: string,
    options: GetDataLossProgressParameters
  ): Promise<GetDataLossProgress200Response | GetDataLossProgressdefaultResponse>;
  /**
   * This API is useful for a temporary quorum loss situation on your service.
   *
   * Call the GetQuorumLossProgress API with the same OperationId to return information on the operation started with this API.
   *
   * This can only be called on stateful persisted (HasPersistedState==true) services.  Do not use this API on stateless services or stateful in-memory only services.
   */
  startQuorumLoss(
    serviceId: string,
    partitionId: string,
    options: StartQuorumLossParameters
  ): Promise<StartQuorumLoss202Response | StartQuorumLossdefaultResponse>;
  /** Gets the progress of a quorum loss operation started with StartQuorumLoss, using the provided OperationId. */
  getQuorumLossProgress(
    serviceId: string,
    partitionId: string,
    options: GetQuorumLossProgressParameters
  ): Promise<GetQuorumLossProgress200Response | GetQuorumLossProgressdefaultResponse>;
  /**
   * This API is useful for testing failover.
   *
   * If used to target a stateless service partition, RestartPartitionMode must be AllReplicasOrInstances.
   *
   * Call the GetPartitionRestartProgress API using the same OperationId to get the progress.
   */
  startPartitionRestart(
    serviceId: string,
    partitionId: string,
    options: StartPartitionRestartParameters
  ): Promise<StartPartitionRestart202Response | StartPartitionRestartdefaultResponse>;
  /** Gets the progress of a PartitionRestart started with StartPartitionRestart using the provided OperationId. */
  getPartitionRestartProgress(
    serviceId: string,
    partitionId: string,
    options: GetPartitionRestartProgressParameters
  ): Promise<GetPartitionRestartProgress200Response | GetPartitionRestartProgressdefaultResponse>;
  /**
   * Starts or stops a cluster node.  A cluster node is a process, not the OS instance itself.  To start a node, pass in "Start" for the NodeTransitionType parameter.
   * To stop a node, pass in "Stop" for the NodeTransitionType parameter.  This API starts the operation - when the API returns the node may not have finished transitioning yet.
   * Call GetNodeTransitionProgress with the same OperationId to get the progress of the operation.
   */
  startNodeTransition(
    nodeName: string,
    options: StartNodeTransitionParameters
  ): Promise<StartNodeTransition202Response | StartNodeTransitiondefaultResponse>;
  /** Gets the progress of an operation started with StartNodeTransition using the provided OperationId. */
  getNodeTransitionProgress(
    nodeName: string,
    options: GetNodeTransitionProgressParameters
  ): Promise<GetNodeTransitionProgress200Response | GetNodeTransitionProgressdefaultResponse>;
  /** Gets the list of user-induced fault operations filtered by provided input. */
  getFaultOperationList(
    options: GetFaultOperationListParameters
  ): Promise<GetFaultOperationList200Response | GetFaultOperationListdefaultResponse>;
  /**
   * The following APIs start fault operations that may be cancelled by using CancelOperation: StartDataLoss, StartQuorumLoss, StartPartitionRestart, StartNodeTransition.
   *
   * If force is false, then the specified user-induced operation will be gracefully stopped and cleaned up.  If force is true, the command will be aborted, and some internal state
   * may be left behind.  Specifying force as true should be used with care.  Calling this API with force set to true is not allowed until this API has already
   * been called on the same test command with force set to false first, or unless the test command already has an OperationState of OperationState.RollingBack.
   * Clarification: OperationState.RollingBack means that the system will be/is cleaning up internal system state caused by executing the command.  It will not restore data if the
   * test command was to cause data loss.  For example, if you call StartDataLoss then call this API, the system will only clean up internal state from running the command.
   * It will not restore the target partition's data, if the command progressed far enough to cause data loss.
   *
   * Important note:  if this API is invoked with force==true, internal state may be left behind.
   */
  cancelOperation(
    options: CancelOperationParameters
  ): Promise<CancelOperation200Response | CancelOperationdefaultResponse>;
  /** Creates a backup policy which can be associated later with a Service Fabric application, service or a partition for periodic backup. */
  createBackupPolicy(
    options: CreateBackupPolicyParameters
  ): Promise<CreateBackupPolicy201Response | CreateBackupPolicydefaultResponse>;
  /** Deletes an existing backup policy. A backup policy must be created before it can be deleted. A currently active backup policy, associated with any Service Fabric application, service or partition, cannot be deleted without first deleting the mapping. */
  deleteBackupPolicy(
    backupPolicyName: string,
    options?: DeleteBackupPolicyParameters
  ): Promise<DeleteBackupPolicy200Response | DeleteBackupPolicydefaultResponse>;
  /** Get a list of all the backup policies configured. */
  getBackupPolicyList(
    options?: GetBackupPolicyListParameters
  ): Promise<GetBackupPolicyList200Response | GetBackupPolicyListdefaultResponse>;
  /** Gets a particular backup policy identified by {backupPolicyName} */
  getBackupPolicyByName(
    backupPolicyName: string,
    options?: GetBackupPolicyByNameParameters
  ): Promise<GetBackupPolicyByName200Response | GetBackupPolicyByNamedefaultResponse>;
  /** Returns a list of Service Fabric application, service or partition which are associated with this backup policy. */
  getAllEntitiesBackedUpByPolicy(
    backupPolicyName: string,
    options?: GetAllEntitiesBackedUpByPolicyParameters
  ): Promise<
    GetAllEntitiesBackedUpByPolicy200Response | GetAllEntitiesBackedUpByPolicydefaultResponse
  >;
  /** Updates the backup policy identified by {backupPolicyName} */
  updateBackupPolicy(
    backupPolicyName: string,
    options: UpdateBackupPolicyParameters
  ): Promise<UpdateBackupPolicy200Response | UpdateBackupPolicydefaultResponse>;
  /**
   * Enables periodic backup of stateful partitions which are part of this Service Fabric application. Each partition is backed up individually as per the specified backup policy description.
   * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
   */
  enableApplicationBackup(
    applicationId: string,
    options: EnableApplicationBackupParameters
  ): Promise<EnableApplicationBackup202Response | EnableApplicationBackupdefaultResponse>;
  /** Disables periodic backup of Service Fabric application which was previously enabled. */
  disableApplicationBackup(
    applicationId: string,
    options?: DisableApplicationBackupParameters
  ): Promise<DisableApplicationBackup202Response | DisableApplicationBackupdefaultResponse>;
  /** Gets the Service Fabric backup configuration information for the application and the services and partitions under this application. */
  getApplicationBackupConfigurationInfo(
    applicationId: string,
    options?: GetApplicationBackupConfigurationInfoParameters
  ): Promise<
    | GetApplicationBackupConfigurationInfo200Response
    | GetApplicationBackupConfigurationInfodefaultResponse
  >;
  /** Returns a list of backups available for every partition in this Service Fabric application. The server enumerates all the backups available at the backup location configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for every partition. */
  getApplicationBackupList(
    applicationId: string,
    options?: GetApplicationBackupListParameters
  ): Promise<GetApplicationBackupList200Response | GetApplicationBackupListdefaultResponse>;
  /** The application which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. This operation applies to the entire application's hierarchy. It means all the services and partitions under this application are now suspended for backup. */
  suspendApplicationBackup(
    applicationId: string,
    options?: SuspendApplicationBackupParameters
  ): Promise<SuspendApplicationBackup202Response | SuspendApplicationBackupdefaultResponse>;
  /** The previously suspended Service Fabric application resumes taking periodic backup as per the backup policy currently configured for the same. */
  resumeApplicationBackup(
    applicationId: string,
    options?: ResumeApplicationBackupParameters
  ): Promise<ResumeApplicationBackup202Response | ResumeApplicationBackupdefaultResponse>;
  /**
   * Enables periodic backup of stateful partitions which are part of this Service Fabric service. Each partition is backed up individually as per the specified backup policy description. In case the application, which the service is part of, is already enabled for backup then this operation would override the policy being used to take the periodic backup for this service and its partitions (unless explicitly overridden at the partition level).
   * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
   */
  enableServiceBackup(
    serviceId: string,
    options: EnableServiceBackupParameters
  ): Promise<EnableServiceBackup202Response | EnableServiceBackupdefaultResponse>;
  /**
   * Disables periodic backup of Service Fabric service which was previously enabled. Backup must be explicitly enabled before it can be disabled.
   * In case the backup is enabled for the Service Fabric application, which this service is part of, this service would continue to be periodically backed up as per the policy mapped at the application level.
   */
  disableServiceBackup(
    serviceId: string,
    options?: DisableServiceBackupParameters
  ): Promise<DisableServiceBackup202Response | DisableServiceBackupdefaultResponse>;
  /** Gets the Service Fabric backup configuration information for the service and the partitions under this service. */
  getServiceBackupConfigurationInfo(
    serviceId: string,
    options?: GetServiceBackupConfigurationInfoParameters
  ): Promise<
    GetServiceBackupConfigurationInfo200Response | GetServiceBackupConfigurationInfodefaultResponse
  >;
  /** Returns a list of backups available for every partition in this Service Fabric service. The server enumerates all the backups available in the backup store configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for every partition. */
  getServiceBackupList(
    serviceId: string,
    options?: GetServiceBackupListParameters
  ): Promise<GetServiceBackupList200Response | GetServiceBackupListdefaultResponse>;
  /** The service which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. This operation applies to the entire service's hierarchy. It means all the partitions under this service are now suspended for backup. */
  suspendServiceBackup(
    serviceId: string,
    options?: SuspendServiceBackupParameters
  ): Promise<SuspendServiceBackup202Response | SuspendServiceBackupdefaultResponse>;
  /** The previously suspended Service Fabric service resumes taking periodic backup as per the backup policy currently configured for the same. */
  resumeServiceBackup(
    serviceId: string,
    options?: ResumeServiceBackupParameters
  ): Promise<ResumeServiceBackup202Response | ResumeServiceBackupdefaultResponse>;
  /**
   * Enables periodic backup of stateful persisted partition. Each partition is backed up as per the specified backup policy description. In case the application or service, which is partition is part of, is already enabled for backup then this operation would override the policy being used to take the periodic backup of this partition.
   * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
   */
  enablePartitionBackup(
    partitionId: string,
    options: EnablePartitionBackupParameters
  ): Promise<EnablePartitionBackup202Response | EnablePartitionBackupdefaultResponse>;
  /**
   * Disables periodic backup of partition which was previously enabled. Backup must be explicitly enabled before it can be disabled.
   * In case the backup is enabled for the Service Fabric application or service, which this partition is part of, this partition would continue to be periodically backed up as per the policy mapped at the higher level entity.
   */
  disablePartitionBackup(
    partitionId: string,
    options?: DisablePartitionBackupParameters
  ): Promise<DisablePartitionBackup202Response | DisablePartitionBackupdefaultResponse>;
  /** Gets the Service Fabric Backup configuration information for the specified partition. */
  getPartitionBackupConfigurationInfo(
    partitionId: string,
    options?: GetPartitionBackupConfigurationInfoParameters
  ): Promise<
    | GetPartitionBackupConfigurationInfo200Response
    | GetPartitionBackupConfigurationInfodefaultResponse
  >;
  /** Returns a list of backups available for the specified partition. The server enumerates all the backups available in the backup store configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for the partition. */
  getPartitionBackupList(
    partitionId: string,
    options?: GetPartitionBackupListParameters
  ): Promise<GetPartitionBackupList200Response | GetPartitionBackupListdefaultResponse>;
  /** The partition which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. */
  suspendPartitionBackup(
    partitionId: string,
    options?: SuspendPartitionBackupParameters
  ): Promise<SuspendPartitionBackup202Response | SuspendPartitionBackupdefaultResponse>;
  /** The previously suspended partition resumes taking periodic backup as per the backup policy currently configured for the same. */
  resumePartitionBackup(
    partitionId: string,
    options?: ResumePartitionBackupParameters
  ): Promise<ResumePartitionBackup202Response | ResumePartitionBackupdefaultResponse>;
  /**
   * Creates a backup of the stateful persisted partition's state. In case the partition is already being periodically backed up, then by default the new backup is created at the same backup storage. One can also override the same by specifying the backup storage details as part of the request body. Once the backup is initiated, its progress can be tracked using the GetBackupProgress operation.
   * In case, the operation times out, specify a greater backup timeout value in the query parameter.
   */
  backupPartition(
    partitionId: string,
    options?: BackupPartitionParameters
  ): Promise<BackupPartition202Response | BackupPartitiondefaultResponse>;
  /** Returns information about the state of the latest backup along with details or failure reason in case of completion. */
  getPartitionBackupProgress(
    partitionId: string,
    options?: GetPartitionBackupProgressParameters
  ): Promise<GetPartitionBackupProgress200Response | GetPartitionBackupProgressdefaultResponse>;
  /**
   * Restores the state of a of the stateful persisted partition using the specified backup point. In case the partition is already being periodically backed up, then by default the backup point is looked for in the storage specified in backup policy. One can also override the same by specifying the backup storage details as part of the restore partition description in body. Once the restore is initiated, its progress can be tracked using the GetRestoreProgress operation.
   * In case, the operation times out, specify a greater restore timeout value in the query parameter.
   */
  restorePartition(
    partitionId: string,
    options: RestorePartitionParameters
  ): Promise<RestorePartition202Response | RestorePartitiondefaultResponse>;
  /** Returns information about the state of the latest restore operation along with details or failure reason in case of completion. */
  getPartitionRestoreProgress(
    partitionId: string,
    options?: GetPartitionRestoreProgressParameters
  ): Promise<GetPartitionRestoreProgress200Response | GetPartitionRestoreProgressdefaultResponse>;
  /** Gets the list of backups available for the specified backed up entity (Application, Service or Partition) at the specified backup location (FileShare or Azure Blob Storage). */
  getBackupsFromBackupLocation(
    options: GetBackupsFromBackupLocationParameters
  ): Promise<GetBackupsFromBackupLocation200Response | GetBackupsFromBackupLocationdefaultResponse>;
  /** Creates the specified Service Fabric name. */
  createName(
    options: CreateNameParameters
  ): Promise<CreateName201Response | CreateNamedefaultResponse>;
  /** Returns whether the specified Service Fabric name exists. */
  getNameExistsInfo(
    nameId: string,
    options?: GetNameExistsInfoParameters
  ): Promise<GetNameExistsInfo200Response | GetNameExistsInfodefaultResponse>;
  /** Deletes the specified Service Fabric name. A name must be created before it can be deleted. Deleting a name with child properties will fail. */
  deleteName(
    nameId: string,
    options?: DeleteNameParameters
  ): Promise<DeleteName200Response | DeleteNamedefaultResponse>;
  /** Enumerates all the Service Fabric names under a given name. If the subnames do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. Querying a name that doesn't exist will fail. */
  getSubNameInfoList(
    nameId: string,
    options?: GetSubNameInfoListParameters
  ): Promise<GetSubNameInfoList200Response | GetSubNameInfoListdefaultResponse>;
  /** A Service Fabric name can have one or more named properties that store custom information. This operation gets the information about these properties in a paged list. The information includes name, value, and metadata about each of the properties. */
  getPropertyInfoList(
    nameId: string,
    options?: GetPropertyInfoListParameters
  ): Promise<GetPropertyInfoList200Response | GetPropertyInfoListdefaultResponse>;
  /** Creates or updates the specified Service Fabric property under a given name. */
  putProperty(
    nameId: string,
    options: PutPropertyParameters
  ): Promise<PutProperty200Response | PutPropertydefaultResponse>;
  /** Gets the specified Service Fabric property under a given name. This will always return both value and metadata. */
  getPropertyInfo(
    nameId: string,
    options: GetPropertyInfoParameters
  ): Promise<GetPropertyInfo200Response | GetPropertyInfodefaultResponse>;
  /** Deletes the specified Service Fabric property under a given name. A property must be created before it can be deleted. */
  deleteProperty(
    nameId: string,
    options: DeletePropertyParameters
  ): Promise<DeleteProperty200Response | DeletePropertydefaultResponse>;
  /** Submits a batch of property operations. Either all or none of the operations will be committed. */
  submitPropertyBatch(
    nameId: string,
    options: SubmitPropertyBatchParameters
  ): Promise<
    | SubmitPropertyBatch200Response
    | SubmitPropertyBatch409Response
    | SubmitPropertyBatchdefaultResponse
  >;
  /** The response is list of ClusterEvent objects. */
  getClusterEventList(
    options: GetClusterEventListParameters
  ): Promise<GetClusterEventList200Response | GetClusterEventListdefaultResponse>;
  /** The response is list of ContainerInstanceEvent objects. */
  getContainersEventList(
    options: GetContainersEventListParameters
  ): Promise<GetContainersEventList200Response | GetContainersEventListdefaultResponse>;
  /** The response is list of NodeEvent objects. */
  getNodeEventList(
    nodeName: string,
    options: GetNodeEventListParameters
  ): Promise<GetNodeEventList200Response | GetNodeEventListdefaultResponse>;
  /** The response is list of NodeEvent objects. */
  getNodesEventList(
    options: GetNodesEventListParameters
  ): Promise<GetNodesEventList200Response | GetNodesEventListdefaultResponse>;
  /** The response is list of ApplicationEvent objects. */
  getApplicationEventList(
    applicationId: string,
    options: GetApplicationEventListParameters
  ): Promise<GetApplicationEventList200Response | GetApplicationEventListdefaultResponse>;
  /** The response is list of ApplicationEvent objects. */
  getApplicationsEventList(
    options: GetApplicationsEventListParameters
  ): Promise<GetApplicationsEventList200Response | GetApplicationsEventListdefaultResponse>;
  /** The response is list of ServiceEvent objects. */
  getServiceEventList(
    serviceId: string,
    options: GetServiceEventListParameters
  ): Promise<GetServiceEventList200Response | GetServiceEventListdefaultResponse>;
  /** The response is list of ServiceEvent objects. */
  getServicesEventList(
    options: GetServicesEventListParameters
  ): Promise<GetServicesEventList200Response | GetServicesEventListdefaultResponse>;
  /** The response is list of PartitionEvent objects. */
  getPartitionEventList(
    partitionId: string,
    options: GetPartitionEventListParameters
  ): Promise<GetPartitionEventList200Response | GetPartitionEventListdefaultResponse>;
  /** The response is list of PartitionEvent objects. */
  getPartitionsEventList(
    options: GetPartitionsEventListParameters
  ): Promise<GetPartitionsEventList200Response | GetPartitionsEventListdefaultResponse>;
  /** The response is list of ReplicaEvent objects. */
  getPartitionReplicaEventList(
    partitionId: string,
    replicaId: string,
    options: GetPartitionReplicaEventListParameters
  ): Promise<GetPartitionReplicaEventList200Response | GetPartitionReplicaEventListdefaultResponse>;
  /** The response is list of ReplicaEvent objects. */
  getPartitionReplicasEventList(
    partitionId: string,
    options: GetPartitionReplicasEventListParameters
  ): Promise<
    GetPartitionReplicasEventList200Response | GetPartitionReplicasEventListdefaultResponse
  >;
  /** The response is list of FabricEvents. */
  getCorrelatedEventList(
    eventInstanceId: string,
    options?: GetCorrelatedEventListParameters
  ): Promise<GetCorrelatedEventList200Response | GetCorrelatedEventListdefaultResponse>;
}

/** Contains operations for MeshSecret operations */
export interface MeshSecretOperations {
  /** Creates a Secret resource with the specified name, description and properties. If Secret resource with the same name exists, then it is updated with the specified description and properties. Once created, the kind and contentType of a secret resource cannot be updated. */
  createOrUpdate(
    secretResourceName: string,
    options: MeshSecretCreateOrUpdateParameters
  ): Promise<
    | MeshSecretCreateOrUpdate200Response
    | MeshSecretCreateOrUpdate201Response
    | MeshSecretCreateOrUpdate202Response
    | MeshSecretCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Secret resource with the given name. The information include the description and other properties of the Secret. */
  get(
    secretResourceName: string,
    options?: MeshSecretGetParameters
  ): Promise<MeshSecretGet200Response | MeshSecretGetdefaultResponse>;
  /** Deletes the specified Secret resource and all of its named values. */
  delete(
    secretResourceName: string,
    options?: MeshSecretDeleteParameters
  ): Promise<
    | MeshSecretDelete200Response
    | MeshSecretDelete202Response
    | MeshSecretDelete204Response
    | MeshSecretDeletedefaultResponse
  >;
  /** Gets the information about all secret resources in a given resource group. The information include the description and other properties of the Secret. */
  list(
    options?: MeshSecretListParameters
  ): Promise<MeshSecretList200Response | MeshSecretListdefaultResponse>;
}

/** Contains operations for MeshSecretValue operations */
export interface MeshSecretValueOperations {
  /** Creates a new value of the specified secret resource. The name of the value is typically the version identifier. Once created the value cannot be changed. */
  addValue(
    secretResourceName: string,
    secretValueResourceName: string,
    options: MeshSecretValueAddValueParameters
  ): Promise<
    | MeshSecretValueAddValue200Response
    | MeshSecretValueAddValue201Response
    | MeshSecretValueAddValue202Response
    | MeshSecretValueAddValuedefaultResponse
  >;
  /** Get the information about the specified named secret value resources. The information does not include the actual value of the secret. */
  get(
    secretResourceName: string,
    secretValueResourceName: string,
    options?: MeshSecretValueGetParameters
  ): Promise<MeshSecretValueGet200Response | MeshSecretValueGetdefaultResponse>;
  /** Deletes the secret value resource identified by the name. The name of the resource is typically the version associated with that value. Deletion will fail if the specified value is in use. */
  delete(
    secretResourceName: string,
    secretValueResourceName: string,
    options?: MeshSecretValueDeleteParameters
  ): Promise<
    | MeshSecretValueDelete200Response
    | MeshSecretValueDelete202Response
    | MeshSecretValueDelete204Response
    | MeshSecretValueDeletedefaultResponse
  >;
  /** Gets information about all secret value resources of the specified secret resource. The information includes the names of the secret value resources, but not the actual values. */
  list(
    secretResourceName: string,
    options?: MeshSecretValueListParameters
  ): Promise<MeshSecretValueList200Response | MeshSecretValueListdefaultResponse>;
  /** Lists the decrypted value of the specified named value of the secret resource. This is a privileged operation. */
  show(
    secretResourceName: string,
    secretValueResourceName: string,
    options?: MeshSecretValueShowParameters
  ): Promise<MeshSecretValueShow200Response | MeshSecretValueShowdefaultResponse>;
}

/** Contains operations for MeshVolume operations */
export interface MeshVolumeOperations {
  /** Creates a Volume resource with the specified name, description and properties. If Volume resource with the same name exists, then it is updated with the specified description and properties. */
  createOrUpdate(
    volumeResourceName: string,
    options: MeshVolumeCreateOrUpdateParameters
  ): Promise<
    | MeshVolumeCreateOrUpdate200Response
    | MeshVolumeCreateOrUpdate201Response
    | MeshVolumeCreateOrUpdate202Response
    | MeshVolumeCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Volume resource with the given name. The information include the description and other properties of the Volume. */
  get(
    volumeResourceName: string,
    options?: MeshVolumeGetParameters
  ): Promise<MeshVolumeGet200Response | MeshVolumeGetdefaultResponse>;
  /** Deletes the Volume resource identified by the name. */
  delete(
    volumeResourceName: string,
    options?: MeshVolumeDeleteParameters
  ): Promise<
    | MeshVolumeDelete200Response
    | MeshVolumeDelete202Response
    | MeshVolumeDelete204Response
    | MeshVolumeDeletedefaultResponse
  >;
  /** Gets the information about all volume resources in a given resource group. The information include the description and other properties of the Volume. */
  list(
    options?: MeshVolumeListParameters
  ): Promise<MeshVolumeList200Response | MeshVolumeListdefaultResponse>;
}

/** Contains operations for MeshNetwork operations */
export interface MeshNetworkOperations {
  /** Creates a Network resource with the specified name, description and properties. If Network resource with the same name exists, then it is updated with the specified description and properties. Network resource provides connectivity between application services. */
  createOrUpdate(
    networkResourceName: string,
    options: MeshNetworkCreateOrUpdateParameters
  ): Promise<
    | MeshNetworkCreateOrUpdate200Response
    | MeshNetworkCreateOrUpdate201Response
    | MeshNetworkCreateOrUpdate202Response
    | MeshNetworkCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Network resource with the given name. The information include the description and other properties of the Network. */
  get(
    networkResourceName: string,
    options?: MeshNetworkGetParameters
  ): Promise<MeshNetworkGet200Response | MeshNetworkGetdefaultResponse>;
  /** Deletes the Network resource identified by the name. */
  delete(
    networkResourceName: string,
    options?: MeshNetworkDeleteParameters
  ): Promise<
    | MeshNetworkDelete200Response
    | MeshNetworkDelete202Response
    | MeshNetworkDelete204Response
    | MeshNetworkDeletedefaultResponse
  >;
  /** Gets the information about all network resources in a given resource group. The information include the description and other properties of the Network. */
  list(
    options?: MeshNetworkListParameters
  ): Promise<MeshNetworkList200Response | MeshNetworkListdefaultResponse>;
}

/** Contains operations for MeshApplication operations */
export interface MeshApplicationOperations {
  /** Creates a Application resource with the specified name, description and properties. If Application resource with the same name exists, then it is updated with the specified description and properties. */
  createOrUpdate(
    applicationResourceName: string,
    options: MeshApplicationCreateOrUpdateParameters
  ): Promise<
    | MeshApplicationCreateOrUpdate200Response
    | MeshApplicationCreateOrUpdate201Response
    | MeshApplicationCreateOrUpdate202Response
    | MeshApplicationCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Application resource with the given name. The information include the description and other properties of the Application. */
  get(
    applicationResourceName: string,
    options?: MeshApplicationGetParameters
  ): Promise<MeshApplicationGet200Response | MeshApplicationGetdefaultResponse>;
  /** Deletes the Application resource identified by the name. */
  delete(
    applicationResourceName: string,
    options?: MeshApplicationDeleteParameters
  ): Promise<
    | MeshApplicationDelete200Response
    | MeshApplicationDelete202Response
    | MeshApplicationDelete204Response
    | MeshApplicationDeletedefaultResponse
  >;
  /** Gets the information about all application resources in a given resource group. The information include the description and other properties of the Application. */
  list(
    options?: MeshApplicationListParameters
  ): Promise<MeshApplicationList200Response | MeshApplicationListdefaultResponse>;
  /** Gets the upgrade progress information about the Application resource with the given name. The information include percentage of completion and other upgrade state information of the Application resource. */
  getUpgradeProgress(
    applicationResourceName: string,
    options?: MeshApplicationGetUpgradeProgressParameters
  ): Promise<
    MeshApplicationGetUpgradeProgress200Response | MeshApplicationGetUpgradeProgressdefaultResponse
  >;
}

/** Contains operations for MeshService operations */
export interface MeshServiceOperations {
  /** Gets the information about the Service resource with the given name. The information include the description and other properties of the Service. */
  get(
    applicationResourceName: string,
    serviceResourceName: string,
    options?: MeshServiceGetParameters
  ): Promise<MeshServiceGet200Response | MeshServiceGetdefaultResponse>;
  /** Gets the information about all services of an application resource. The information include the description and other properties of the Service. */
  list(
    applicationResourceName: string,
    options?: MeshServiceListParameters
  ): Promise<MeshServiceList200Response | MeshServiceListdefaultResponse>;
}

/** Contains operations for MeshCodePackage operations */
export interface MeshCodePackageOperations {
  /** Gets the logs for the container of the specified code package of the service replica. */
  getContainerLogs(
    applicationResourceName: string,
    serviceResourceName: string,
    replicaName: string,
    codePackageName: string,
    options?: MeshCodePackageGetContainerLogsParameters
  ): Promise<
    MeshCodePackageGetContainerLogs200Response | MeshCodePackageGetContainerLogsdefaultResponse
  >;
}

/** Contains operations for MeshServiceReplica operations */
export interface MeshServiceReplicaOperations {
  /** Gets the information about the service replica with the given name. The information include the description and other properties of the service replica. */
  get(
    applicationResourceName: string,
    serviceResourceName: string,
    replicaName: string,
    options?: MeshServiceReplicaGetParameters
  ): Promise<MeshServiceReplicaGet200Response | MeshServiceReplicaGetdefaultResponse>;
  /** Gets the information about all replicas of a service. The information include the description and other properties of the service replica. */
  list(
    applicationResourceName: string,
    serviceResourceName: string,
    options?: MeshServiceReplicaListParameters
  ): Promise<MeshServiceReplicaList200Response | MeshServiceReplicaListdefaultResponse>;
}

/** Contains operations for MeshGateway operations */
export interface MeshGatewayOperations {
  /** Creates a Gateway resource with the specified name, description and properties. If Gateway resource with the same name exists, then it is updated with the specified description and properties. Use Gateway resource to provide public connectivity to application services. */
  createOrUpdate(
    gatewayResourceName: string,
    options: MeshGatewayCreateOrUpdateParameters
  ): Promise<
    | MeshGatewayCreateOrUpdate200Response
    | MeshGatewayCreateOrUpdate201Response
    | MeshGatewayCreateOrUpdate202Response
    | MeshGatewayCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Gateway resource with the given name. The information include the description and other properties of the Gateway. */
  get(
    gatewayResourceName: string,
    options?: MeshGatewayGetParameters
  ): Promise<MeshGatewayGet200Response | MeshGatewayGetdefaultResponse>;
  /** Deletes the Gateway resource identified by the name. */
  delete(
    gatewayResourceName: string,
    options?: MeshGatewayDeleteParameters
  ): Promise<
    | MeshGatewayDelete200Response
    | MeshGatewayDelete202Response
    | MeshGatewayDelete204Response
    | MeshGatewayDeletedefaultResponse
  >;
  /** Gets the information about all gateway resources in a given resource group. The information include the description and other properties of the Gateway. */
  list(
    options?: MeshGatewayListParameters
  ): Promise<MeshGatewayList200Response | MeshGatewayListdefaultResponse>;
}

export interface GetClusterManifest {
  /**
   * Get the Service Fabric cluster manifest. The cluster manifest contains properties of the cluster that include different node types on the cluster,
   * security configurations, fault, and upgrade domain topologies, etc.
   *
   * These properties are specified as part of the ClusterConfig.JSON file while deploying a stand-alone cluster. However, most of the information in the cluster manifest
   * is generated internally by service fabric during cluster deployment in other deployment scenarios (e.g. when using Azure portal).
   *
   * The contents of the cluster manifest are for informational purposes only and users are not expected to take a dependency on the format of the file contents or its interpretation.
   */
  get(
    options?: GetClusterManifestParameters
  ): Promise<GetClusterManifest200Response | GetClusterManifestdefaultResponse>;
}

export interface GetClusterHealth {
  /**
   * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
   * Similarly, use NodesHealthStateFilter and ApplicationsHealthStateFilter to filter the collection of nodes and applications returned based on their aggregated health state.
   */
  get(
    options?: GetClusterHealthParameters
  ): Promise<GetClusterHealth200Response | GetClusterHealthdefaultResponse>;
  /**
   * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
   * Similarly, use NodesHealthStateFilter and ApplicationsHealthStateFilter to filter the collection of nodes and applications returned based on their aggregated health state.
   * Use ClusterHealthPolicies to override the health policies used to evaluate the health.
   */
  post(
    options?: GetClusterHealthUsingPolicyParameters
  ): Promise<GetClusterHealthUsingPolicy200Response | GetClusterHealthUsingPolicydefaultResponse>;
}

export interface GetClusterHealthChunk {
  /**
   * Gets the health of a Service Fabric cluster using health chunks. Includes the aggregated health state of the cluster, but none of the cluster entities.
   * To expand the cluster health and get the health state of all or some of the entities, use the POST URI and specify the cluster health chunk query description.
   */
  get(
    options?: GetClusterHealthChunkParameters
  ): Promise<GetClusterHealthChunk200Response | GetClusterHealthChunkdefaultResponse>;
  /**
   * Gets the health of a Service Fabric cluster using health chunks. The health evaluation is done based on the input cluster health chunk query description.
   * The query description allows users to specify health policies for evaluating the cluster and its children.
   * Users can specify very flexible filters to select which cluster entities to return. The selection can be done based on the entities health state and based on the hierarchy.
   * The query can return multi-level children of the entities based on the specified filters. For example, it can return one application with a specified name, and for this application, return
   * only services that are in Error or Warning, and all partitions and replicas for one of these services.
   */
  post(
    options?: GetClusterHealthChunkUsingPolicyAndAdvancedFiltersParameters
  ): Promise<
    | GetClusterHealthChunkUsingPolicyAndAdvancedFilters200Response
    | GetClusterHealthChunkUsingPolicyAndAdvancedFiltersdefaultResponse
  >;
}

export interface ReportClusterHealth {
  /**
   * Sends a health report on a Service Fabric cluster. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway node, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetClusterHealth and check that the report appears in the HealthEvents section.
   */
  post(
    options: ReportClusterHealthParameters
  ): Promise<ReportClusterHealth200Response | ReportClusterHealthdefaultResponse>;
}

export interface GetProvisionedFabricCodeVersionInfoList {
  /** Gets a list of information about fabric code versions that are provisioned in the cluster. The parameter CodeVersion can be used to optionally filter the output to only that particular version. */
  get(
    options?: GetProvisionedFabricCodeVersionInfoListParameters
  ): Promise<
    | GetProvisionedFabricCodeVersionInfoList200Response
    | GetProvisionedFabricCodeVersionInfoListdefaultResponse
  >;
}

export interface GetProvisionedFabricConfigVersionInfoList {
  /** Gets a list of information about fabric config versions that are provisioned in the cluster. The parameter ConfigVersion can be used to optionally filter the output to only that particular version. */
  get(
    options?: GetProvisionedFabricConfigVersionInfoListParameters
  ): Promise<
    | GetProvisionedFabricConfigVersionInfoList200Response
    | GetProvisionedFabricConfigVersionInfoListdefaultResponse
  >;
}

export interface GetClusterUpgradeProgress {
  /** Gets the current progress of the ongoing cluster upgrade. If no upgrade is currently in progress, get the last state of the previous cluster upgrade. */
  get(
    options?: GetClusterUpgradeProgressParameters
  ): Promise<GetClusterUpgradeProgress200Response | GetClusterUpgradeProgressdefaultResponse>;
}

export interface GetClusterConfiguration {
  /**
   * The cluster configuration contains properties of the cluster that include different node types on the cluster,
   * security configurations, fault, and upgrade domain topologies, etc.
   */
  get(
    options: GetClusterConfigurationParameters
  ): Promise<GetClusterConfiguration200Response | GetClusterConfigurationdefaultResponse>;
}

export interface GetClusterConfigurationUpgradeStatus {
  /** Get the cluster configuration upgrade status details of a Service Fabric standalone cluster. */
  get(
    options?: GetClusterConfigurationUpgradeStatusParameters
  ): Promise<
    | GetClusterConfigurationUpgradeStatus200Response
    | GetClusterConfigurationUpgradeStatusdefaultResponse
  >;
}

export interface GetUpgradeOrchestrationServiceState {
  /** Get the service state of Service Fabric Upgrade Orchestration Service. This API is internally used for support purposes. */
  get(
    options?: GetUpgradeOrchestrationServiceStateParameters
  ): Promise<
    | GetUpgradeOrchestrationServiceState200Response
    | GetUpgradeOrchestrationServiceStatedefaultResponse
  >;
}

export interface SetUpgradeOrchestrationServiceState {
  /** Update the service state of Service Fabric Upgrade Orchestration Service. This API is internally used for support purposes. */
  post(
    options: SetUpgradeOrchestrationServiceStateParameters
  ): Promise<
    | SetUpgradeOrchestrationServiceState200Response
    | SetUpgradeOrchestrationServiceStatedefaultResponse
  >;
}

export interface ProvisionCluster {
  /** Validate and provision the code or configuration packages of a Service Fabric cluster. */
  post(
    options: ProvisionClusterParameters
  ): Promise<ProvisionCluster200Response | ProvisionClusterdefaultResponse>;
}

export interface UnprovisionCluster {
  /** It is supported to unprovision code and configuration separately. */
  post(
    options: UnprovisionClusterParameters
  ): Promise<UnprovisionCluster200Response | UnprovisionClusterdefaultResponse>;
}

export interface RollbackClusterUpgrade {
  /** Roll back the code or configuration upgrade of a Service Fabric cluster. */
  post(
    options?: RollbackClusterUpgradeParameters
  ): Promise<RollbackClusterUpgrade202Response | RollbackClusterUpgradedefaultResponse>;
}

export interface ResumeClusterUpgrade {
  /** Make the cluster code or configuration upgrade move on to the next upgrade domain if appropriate. */
  post(
    options: ResumeClusterUpgradeParameters
  ): Promise<ResumeClusterUpgrade200Response | ResumeClusterUpgradedefaultResponse>;
}

export interface StartClusterUpgrade {
  /** Validate the supplied upgrade parameters and start upgrading the code or configuration version of a Service Fabric cluster if the parameters are valid. */
  post(
    options: StartClusterUpgradeParameters
  ): Promise<StartClusterUpgrade202Response | StartClusterUpgradedefaultResponse>;
}

export interface StartClusterConfigurationUpgrade {
  /** Validate the supplied configuration upgrade parameters and start upgrading the cluster configuration if the parameters are valid. */
  post(
    options: StartClusterConfigurationUpgradeParameters
  ): Promise<
    StartClusterConfigurationUpgrade202Response | StartClusterConfigurationUpgradedefaultResponse
  >;
}

export interface UpdateClusterUpgrade {
  /** Update the upgrade parameters used during a Service Fabric cluster upgrade. */
  post(
    options: UpdateClusterUpgradeParameters
  ): Promise<UpdateClusterUpgrade200Response | UpdateClusterUpgradedefaultResponse>;
}

export interface GetAadMetadata {
  /**
   * Gets the Azure Active Directory metadata used for secured connection to cluster.
   * This API is not supposed to be called separately. It provides information needed to set up an Azure Active Directory secured connection with a Service Fabric cluster.
   */
  get(
    options?: GetAadMetadataParameters
  ): Promise<GetAadMetadata200Response | GetAadMetadatadefaultResponse>;
}

export interface GetClusterVersion {
  /** If a cluster upgrade is happening, then this API will return the lowest (older) version of the current and target cluster runtime versions. */
  get(
    options?: GetClusterVersionParameters
  ): Promise<GetClusterVersion200Response | GetClusterVersiondefaultResponse>;
}

export interface GetClusterLoad {
  /** Retrieves the load information of a Service Fabric cluster for all the metrics that have load or capacity defined. */
  get(
    options?: GetClusterLoadParameters
  ): Promise<GetClusterLoad200Response | GetClusterLoaddefaultResponse>;
}

export interface ToggleVerboseServicePlacementHealthReporting {
  /**
   * If verbosity is set to true, then detailed health reports will be generated when replicas cannot be placed or dropped.
   * If verbosity is set to false, then no health reports will be generated when replicas cannot be placed or dropped.
   */
  post(
    options: ToggleVerboseServicePlacementHealthReportingParameters
  ): Promise<
    | ToggleVerboseServicePlacementHealthReporting200Response
    | ToggleVerboseServicePlacementHealthReportingdefaultResponse
  >;
}

export interface GetNodeInfoList {
  /** The response includes the name, status, ID, health, uptime, and other details about the nodes. */
  get(
    options?: GetNodeInfoListParameters
  ): Promise<GetNodeInfoList200Response | GetNodeInfoListdefaultResponse>;
}

export interface GetNodeInfo {
  /** The response includes the name, status, ID, health, uptime, and other details about the node. */
  get(
    options?: GetNodeInfoParameters
  ): Promise<GetNodeInfo200Response | GetNodeInfo204Response | GetNodeInfodefaultResponse>;
}

export interface GetNodeHealth {
  /** Gets the health of a Service Fabric node. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. If the node that you specify by name does not exist in the health store, this returns an error. */
  get(
    options?: GetNodeHealthParameters
  ): Promise<GetNodeHealth200Response | GetNodeHealthdefaultResponse>;
  /** Gets the health of a Service Fabric node. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. Use ClusterHealthPolicy in the POST body to override the health policies used to evaluate the health. If the node that you specify by name does not exist in the health store, this returns an error. */
  post(
    options?: GetNodeHealthUsingPolicyParameters
  ): Promise<GetNodeHealthUsingPolicy200Response | GetNodeHealthUsingPolicydefaultResponse>;
}

export interface ReportNodeHealth {
  /**
   * Reports health state of the specified Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway node, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetNodeHealth and check that the report appears in the HealthEvents section.
   */
  post(
    options: ReportNodeHealthParameters
  ): Promise<ReportNodeHealth200Response | ReportNodeHealthdefaultResponse>;
}

export interface GetNodeLoadInfo {
  /** Retrieves the load information of a Service Fabric node for all the metrics that have load or capacity defined. */
  get(
    options?: GetNodeLoadInfoParameters
  ): Promise<GetNodeLoadInfo200Response | GetNodeLoadInfodefaultResponse>;
}

export interface DisableNode {
  /** Deactivate a Service Fabric cluster node with the specified deactivation intent. Once the deactivation is in progress, the deactivation intent can be increased, but not decreased (for example, a node that is deactivated with the Pause intent can be deactivated further with Restart, but not the other way around. Nodes may be reactivated using the Activate a node operation any time after they are deactivated. If the deactivation is not complete, this will cancel the deactivation. A node that goes down and comes back up while deactivated will still need to be reactivated before services will be placed on that node. */
  post(
    options: DisableNodeParameters
  ): Promise<DisableNode200Response | DisableNodedefaultResponse>;
}

export interface EnableNode {
  /** Activates a Service Fabric cluster node that is currently deactivated. Once activated, the node will again become a viable target for placing new replicas, and any deactivated replicas remaining on the node will be reactivated. */
  post(options?: EnableNodeParameters): Promise<EnableNode200Response | EnableNodedefaultResponse>;
}

export interface RemoveNodeState {
  /** This implies that it is not possible to recover the persisted state of that node. This generally happens if a hard disk has been wiped clean, or if a hard disk crashes. The node has to be down for this operation to be successful. This operation lets Service Fabric know that the replicas on that node no longer exist, and that Service Fabric should stop waiting for those replicas to come back up. Do not run this cmdlet if the state on the node has not been removed and the node can come back up with its state intact. Starting from Service Fabric 6.5, in order to use this API for seed nodes, please change the seed nodes to regular (non-seed) nodes and then invoke this API to remove the node state. If the cluster is running on Azure, after the seed node goes down, Service Fabric will try to change it to a non-seed node automatically. To make this happen, make sure the number of non-seed nodes in the primary node type is no less than the number of Down seed nodes. If necessary, add more nodes to the primary node type to achieve this. For standalone cluster, if the Down seed node is not expected to come back up with its state intact, please remove the node from the cluster, see https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-windows-server-add-remove-nodes */
  post(
    options?: RemoveNodeStateParameters
  ): Promise<RemoveNodeState200Response | RemoveNodeStatedefaultResponse>;
}

export interface RestartNode {
  /** Restarts a Service Fabric cluster node that is already started. */
  post(
    options: RestartNodeParameters
  ): Promise<RestartNode200Response | RestartNodedefaultResponse>;
}

export interface RemoveConfigurationOverrides {
  /** This api allows removing all existing configuration overrides on specified node. */
  delete(
    options?: RemoveConfigurationOverridesParameters
  ): Promise<RemoveConfigurationOverrides200Response | RemoveConfigurationOverridesdefaultResponse>;
}

export interface GetConfigurationOverrides {
  /** This api allows getting all existing configuration overrides on the specified node. */
  get(
    options?: GetConfigurationOverridesParameters
  ): Promise<GetConfigurationOverrides200Response | GetConfigurationOverridesdefaultResponse>;
}

export interface AddConfigurationParameterOverrides {
  /** This api allows adding all existing configuration overrides on the specified node. */
  post(
    options: AddConfigurationParameterOverridesParameters
  ): Promise<
    | AddConfigurationParameterOverrides200Response
    | AddConfigurationParameterOverridesdefaultResponse
  >;
}

export interface RemoveNodeTags {
  /** This api allows removing set of tags from the specified node. */
  post(
    options: RemoveNodeTagsParameters
  ): Promise<RemoveNodeTags200Response | RemoveNodeTagsdefaultResponse>;
}

export interface AddNodeTags {
  /** This api allows adding tags to the specified node. */
  post(
    options: AddNodeTagsParameters
  ): Promise<AddNodeTags200Response | AddNodeTagsdefaultResponse>;
}

export interface GetApplicationTypeInfoList {
  /** Returns the information about the application types that are provisioned or in the process of being provisioned in the Service Fabric cluster. Each version of an application type is returned as one application type. The response includes the name, version, status, and other details about the application type. This is a paged query, meaning that if not all of the application types fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. For example, if there are 10 application types but a page only fits the first three application types, or if max results is set to 3, then three is returned. To access the rest of the results, retrieve subsequent pages by using the returned continuation token in the next query. An empty continuation token is returned if there are no subsequent pages. */
  get(
    options?: GetApplicationTypeInfoListParameters
  ): Promise<GetApplicationTypeInfoList200Response | GetApplicationTypeInfoListdefaultResponse>;
}

export interface GetApplicationTypeInfoListByName {
  /** Returns the information about the application types that are provisioned or in the process of being provisioned in the Service Fabric cluster. These results are of application types whose name match exactly the one specified as the parameter, and which comply with the given query parameters. All versions of the application type matching the application type name are returned, with each version returned as one application type. The response includes the name, version, status, and other details about the application type. This is a paged query, meaning that if not all of the application types fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. For example, if there are 10 application types but a page only fits the first three application types, or if max results is set to 3, then three is returned. To access the rest of the results, retrieve subsequent pages by using the returned continuation token in the next query. An empty continuation token is returned if there are no subsequent pages. */
  get(
    options?: GetApplicationTypeInfoListByNameParameters
  ): Promise<
    GetApplicationTypeInfoListByName200Response | GetApplicationTypeInfoListByNamedefaultResponse
  >;
}

export interface ProvisionApplicationType {
  /**
   * Provisions a Service Fabric application type with the cluster. The provision is required before any new applications can be instantiated.
   * The provision operation can be performed either on the application package specified by the relativePathInImageStore, or by using the URI of the external '.sfpkg'.
   */
  post(
    options: ProvisionApplicationTypeParameters
  ): Promise<
    | ProvisionApplicationType200Response
    | ProvisionApplicationType202Response
    | ProvisionApplicationTypedefaultResponse
  >;
}

export interface UnprovisionApplicationType {
  /** This operation can only be performed if all application instances of the application type have been deleted. Once the application type is unregistered, no new application instances can be created for this particular application type. */
  post(
    options: UnprovisionApplicationTypeParameters
  ): Promise<
    | UnprovisionApplicationType200Response
    | UnprovisionApplicationType202Response
    | UnprovisionApplicationTypedefaultResponse
  >;
}

export interface GetServiceTypeInfoList {
  /** Gets the list containing the information about service types that are supported by a provisioned application type in a Service Fabric cluster. The provided application type must exist. Otherwise, a 404 status is returned. */
  get(
    options: GetServiceTypeInfoListParameters
  ): Promise<GetServiceTypeInfoList200Response | GetServiceTypeInfoListdefaultResponse>;
}

export interface GetServiceTypeInfoByName {
  /** Gets the information about a specific service type that is supported by a provisioned application type in a Service Fabric cluster. The provided application type must exist. Otherwise, a 404 status is returned. A 204 response is returned if the specified service type is not found in the cluster. */
  get(
    options: GetServiceTypeInfoByNameParameters
  ): Promise<
    | GetServiceTypeInfoByName200Response
    | GetServiceTypeInfoByName204Response
    | GetServiceTypeInfoByNamedefaultResponse
  >;
}

export interface GetServiceManifest {
  /** Gets the manifest describing a service type. The response contains the service manifest XML as a string. */
  get(
    options: GetServiceManifestParameters
  ): Promise<GetServiceManifest200Response | GetServiceManifestdefaultResponse>;
}

export interface GetDeployedServiceTypeInfoList {
  /** Gets the list containing the information about service types from the applications deployed on a node in a Service Fabric cluster. The response includes the name of the service type, its registration status, the code package that registered it and activation ID of the service package. */
  get(
    options?: GetDeployedServiceTypeInfoListParameters
  ): Promise<
    GetDeployedServiceTypeInfoList200Response | GetDeployedServiceTypeInfoListdefaultResponse
  >;
}

export interface GetDeployedServiceTypeInfoByName {
  /** Gets the list containing the information about a specific service type from the applications deployed on a node in a Service Fabric cluster. The response includes the name of the service type, its registration status, the code package that registered it and activation ID of the service package. Each entry represents one activation of a service type, differentiated by the activation ID. */
  get(
    options?: GetDeployedServiceTypeInfoByNameParameters
  ): Promise<
    | GetDeployedServiceTypeInfoByName200Response
    | GetDeployedServiceTypeInfoByName204Response
    | GetDeployedServiceTypeInfoByNamedefaultResponse
  >;
}

export interface CreateApplication {
  /** Creates a Service Fabric application using the specified description. */
  post(
    options: CreateApplicationParameters
  ): Promise<CreateApplication201Response | CreateApplicationdefaultResponse>;
}

export interface DeleteApplication {
  /** An application must be created before it can be deleted. Deleting an application will delete all services that are part of that application. By default, Service Fabric will try to close service replicas in a graceful manner and then delete the service. However, if a service is having issues closing the replica gracefully, the delete operation may take a long time or get stuck. Use the optional ForceRemove flag to skip the graceful close sequence and forcefully delete the application and all of its services. */
  post(
    options?: DeleteApplicationParameters
  ): Promise<DeleteApplication200Response | DeleteApplicationdefaultResponse>;
}

export interface GetApplicationLoadInfo {
  /** Returns the load information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, minimum nodes, maximum nodes, the number of nodes the application is occupying currently, and application load metric information about the application. */
  get(
    options?: GetApplicationLoadInfoParameters
  ): Promise<
    | GetApplicationLoadInfo200Response
    | GetApplicationLoadInfo204Response
    | GetApplicationLoadInfodefaultResponse
  >;
}

export interface GetApplicationInfoList {
  /** Gets the information about the applications that were created or in the process of being created in the Service Fabric cluster and match the specified filters. The response includes the name, type, status, parameters, and other details about the application. If the applications do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. Filters ApplicationTypeName and ApplicationDefinitionKindFilter cannot be specified at the same time. */
  get(
    options?: GetApplicationInfoListParameters
  ): Promise<GetApplicationInfoList200Response | GetApplicationInfoListdefaultResponse>;
}

export interface GetApplicationInfo {
  /** Returns the information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, type, status, parameters, and other details about the application. */
  get(
    options?: GetApplicationInfoParameters
  ): Promise<
    | GetApplicationInfo200Response
    | GetApplicationInfo204Response
    | GetApplicationInfodefaultResponse
  >;
}

export interface GetApplicationHealth {
  /** Returns the heath state of the service fabric application. The response reports either Ok, Error or Warning health state. If the entity is not found in the health store, it will return Error. */
  get(
    options?: GetApplicationHealthParameters
  ): Promise<GetApplicationHealth200Response | GetApplicationHealthdefaultResponse>;
  /** Gets the health of a Service Fabric application. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. Use ClusterHealthPolicies to override the health policies used to evaluate the health. */
  post(
    options?: GetApplicationHealthUsingPolicyParameters
  ): Promise<
    GetApplicationHealthUsingPolicy200Response | GetApplicationHealthUsingPolicydefaultResponse
  >;
}

export interface ReportApplicationHealth {
  /**
   * Reports health state of the specified Service Fabric application. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, get application health and check that the report appears in the HealthEvents section.
   */
  post(
    options: ReportApplicationHealthParameters
  ): Promise<ReportApplicationHealth200Response | ReportApplicationHealthdefaultResponse>;
}

export interface StartApplicationUpgrade {
  /**
   * Validates the supplied application upgrade parameters and starts upgrading the application if the parameters are valid.
   * Note, [ApplicationParameter](https://docs.microsoft.com/dotnet/api/system.fabric.description.applicationdescription.applicationparameters)s are not preserved across an application upgrade.
   * In order to preserve current application parameters, the user should get the parameters using [GetApplicationInfo](./GetApplicationInfo.md) operation first and pass them into the upgrade API call as shown in the example.
   */
  post(
    options: StartApplicationUpgradeParameters
  ): Promise<StartApplicationUpgrade200Response | StartApplicationUpgradedefaultResponse>;
}

export interface GetApplicationUpgrade {
  /** Returns information about the state of the latest application upgrade along with details to aid debugging application health issues. */
  get(
    options?: GetApplicationUpgradeParameters
  ): Promise<GetApplicationUpgrade200Response | GetApplicationUpgradedefaultResponse>;
}

export interface UpdateApplicationUpgrade {
  /** Updates the parameters of an ongoing application upgrade from the ones specified at the time of starting the application upgrade. This may be required to mitigate stuck application upgrades due to incorrect parameters or issues in the application to make progress. */
  post(
    options: UpdateApplicationUpgradeParameters
  ): Promise<UpdateApplicationUpgrade200Response | UpdateApplicationUpgradedefaultResponse>;
}

export interface UpdateApplication {
  /** Updates a Service Fabric application instance. The set of properties that can be updated are a subset of the properties that were specified at the time of creating the application. */
  post(
    options: UpdateApplicationParameters
  ): Promise<UpdateApplication200Response | UpdateApplicationdefaultResponse>;
}

export interface ResumeApplicationUpgrade {
  /** Resumes an unmonitored manual Service Fabric application upgrade. Service Fabric upgrades one upgrade domain at a time. For unmonitored manual upgrades, after Service Fabric finishes an upgrade domain, it waits for you to call this API before proceeding to the next upgrade domain. */
  post(
    options: ResumeApplicationUpgradeParameters
  ): Promise<ResumeApplicationUpgrade200Response | ResumeApplicationUpgradedefaultResponse>;
}

export interface RollbackApplicationUpgrade {
  /** Starts rolling back the current application upgrade to the previous version. This API can only be used to roll back the current in-progress upgrade that is rolling forward to new version. If the application is not currently being upgraded use StartApplicationUpgrade API to upgrade it to desired version, including rolling back to a previous version. */
  post(
    options?: RollbackApplicationUpgradeParameters
  ): Promise<RollbackApplicationUpgrade200Response | RollbackApplicationUpgradedefaultResponse>;
}

export interface GetDeployedApplicationInfoList {
  /** Gets the list of applications deployed on a Service Fabric node. The results do not include information about deployed system applications unless explicitly queried for by ID. Results encompass deployed applications in active, activating, and downloading states. This query requires that the node name corresponds to a node on the cluster. The query fails if the provided node name does not point to any active Service Fabric nodes on the cluster. */
  get(
    options?: GetDeployedApplicationInfoListParameters
  ): Promise<
    GetDeployedApplicationInfoList200Response | GetDeployedApplicationInfoListdefaultResponse
  >;
}

export interface GetDeployedApplicationInfo {
  /** This query returns system application information if the application ID provided is for system application. Results encompass deployed applications in active, activating, and downloading states. This query requires that the node name corresponds to a node on the cluster. The query fails if the provided node name does not point to any active Service Fabric nodes on the cluster. */
  get(
    options?: GetDeployedApplicationInfoParameters
  ): Promise<
    | GetDeployedApplicationInfo200Response
    | GetDeployedApplicationInfo204Response
    | GetDeployedApplicationInfodefaultResponse
  >;
}

export interface GetDeployedApplicationHealth {
  /** Gets the information about health of an application deployed on a Service Fabric node. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed application based on health state. Use DeployedServicePackagesHealthStateFilter to optionally filter for DeployedServicePackageHealth children based on health state. */
  get(
    options?: GetDeployedApplicationHealthParameters
  ): Promise<GetDeployedApplicationHealth200Response | GetDeployedApplicationHealthdefaultResponse>;
  /** Gets the information about health of an application deployed on a Service Fabric node using the specified policy. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed application based on health state. Use DeployedServicePackagesHealthStateFilter to optionally filter for DeployedServicePackageHealth children based on health state. Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the deployed application. */
  post(
    options?: GetDeployedApplicationHealthUsingPolicyParameters
  ): Promise<
    | GetDeployedApplicationHealthUsingPolicy200Response
    | GetDeployedApplicationHealthUsingPolicydefaultResponse
  >;
}

export interface ReportDeployedApplicationHealth {
  /**
   * Reports health state of the application deployed on a Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, get deployed application health and check that the report appears in the HealthEvents section.
   */
  post(
    options: ReportDeployedApplicationHealthParameters
  ): Promise<
    ReportDeployedApplicationHealth200Response | ReportDeployedApplicationHealthdefaultResponse
  >;
}

export interface GetApplicationManifest {
  /** The response contains the application manifest XML as a string. */
  get(
    options: GetApplicationManifestParameters
  ): Promise<GetApplicationManifest200Response | GetApplicationManifestdefaultResponse>;
}

export interface GetServiceInfoList {
  /** Returns the information about all services belonging to the application specified by the application ID. */
  get(
    options?: GetServiceInfoListParameters
  ): Promise<GetServiceInfoList200Response | GetServiceInfoListdefaultResponse>;
}

export interface GetServiceInfo {
  /** Returns the information about the specified service belonging to the specified Service Fabric application. */
  get(
    options?: GetServiceInfoParameters
  ): Promise<GetServiceInfo200Response | GetServiceInfo204Response | GetServiceInfodefaultResponse>;
}

export interface GetApplicationNameInfo {
  /** Gets the name of the application for the specified service. A 404 FABRIC_E_SERVICE_DOES_NOT_EXIST error is returned if a service with the provided service ID does not exist. */
  get(
    options?: GetApplicationNameInfoParameters
  ): Promise<GetApplicationNameInfo200Response | GetApplicationNameInfodefaultResponse>;
}

export interface CreateService {
  /** This api allows creating a new Service Fabric stateless or stateful service under a specified Service Fabric application. The description for creating the service includes partitioning information and optional properties for placement and load balancing. Some of the properties can later be modified using `UpdateService` API. */
  post(
    options: CreateServiceParameters
  ): Promise<CreateService202Response | CreateServicedefaultResponse>;
}

export interface CreateServiceFromTemplate {
  /** Creates a Service Fabric service from the service template defined in the application manifest. A service template contains the properties that will be same for the service instance of the same type. The API allows overriding the properties that are usually different for different services of the same service type. */
  post(
    options: CreateServiceFromTemplateParameters
  ): Promise<CreateServiceFromTemplate202Response | CreateServiceFromTemplatedefaultResponse>;
}

export interface DeleteService {
  /** A service must be created before it can be deleted. By default, Service Fabric will try to close service replicas in a graceful manner and then delete the service. However, if the service is having issues closing the replica gracefully, the delete operation may take a long time or get stuck. Use the optional ForceRemove flag to skip the graceful close sequence and forcefully delete the service. */
  post(
    options?: DeleteServiceParameters
  ): Promise<DeleteService200Response | DeleteServicedefaultResponse>;
}

export interface UpdateService {
  /** This API allows updating properties of a running Service Fabric service. The set of properties that can be updated are a subset of the properties that were specified at the time of creating the service. The current set of properties can be obtained using `GetServiceDescription` API. Note that updating the properties of a running service is different than upgrading your application using `StartApplicationUpgrade` API. The upgrade is a long running background operation that involves moving the application from one version to another, one upgrade domain at a time, whereas update applies the new properties immediately to the service. */
  post(
    options: UpdateServiceParameters
  ): Promise<UpdateService200Response | UpdateServicedefaultResponse>;
}

export interface GetServiceDescription {
  /** Gets the description of an existing Service Fabric service. A service must be created before its description can be obtained. */
  get(
    options?: GetServiceDescriptionParameters
  ): Promise<GetServiceDescription200Response | GetServiceDescriptiondefaultResponse>;
}

export interface GetServiceHealth {
  /**
   * Gets the health information of the specified service.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
   * Use PartitionsHealthStateFilter to filter the collection of partitions returned.
   * If you specify a service that does not exist in the health store, this request returns an error.
   */
  get(
    options?: GetServiceHealthParameters
  ): Promise<GetServiceHealth200Response | GetServiceHealthdefaultResponse>;
  /**
   * Gets the health information of the specified service.
   * If the application health policy is specified, the health evaluation uses it to get the aggregated health state.
   * If the policy is not specified, the health evaluation uses the application health policy defined in the application manifest, or the default health policy, if no policy is defined in the manifest.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
   * Use PartitionsHealthStateFilter to filter the collection of partitions returned.
   * If you specify a service that does not exist in the health store, this request returns an error.
   */
  post(
    options?: GetServiceHealthUsingPolicyParameters
  ): Promise<GetServiceHealthUsingPolicy200Response | GetServiceHealthUsingPolicydefaultResponse>;
}

export interface ReportServiceHealth {
  /**
   * Reports health state of the specified Service Fabric service. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetServiceHealth and check that the report appears in the HealthEvents section.
   */
  post(
    options: ReportServiceHealthParameters
  ): Promise<ReportServiceHealth200Response | ReportServiceHealthdefaultResponse>;
}

export interface ResolveService {
  /** Resolve a Service Fabric service partition to get the endpoints of the service replicas. */
  get(
    options?: ResolveServiceParameters
  ): Promise<ResolveService200Response | ResolveServicedefaultResponse>;
}

export interface GetUnplacedReplicaInformation {
  /**
   * Returns the information about the unplaced replicas of the service.
   * If PartitionId is specified, then result will contain information only about unplaced replicas for that partition.
   * If PartitionId is not specified, then result will contain information about unplaced replicas for all partitions of that service.
   * If OnlyQueryPrimaries is set to true, then result will contain information only about primary replicas, and will ignore unplaced secondary replicas.
   */
  get(
    options?: GetUnplacedReplicaInformationParameters
  ): Promise<
    GetUnplacedReplicaInformation200Response | GetUnplacedReplicaInformationdefaultResponse
  >;
}

export interface GetLoadedPartitionInfoList {
  /** Retrieves partitions which are most/least loaded according to specified metric. */
  get(
    options: GetLoadedPartitionInfoListParameters
  ): Promise<GetLoadedPartitionInfoList200Response | GetLoadedPartitionInfoListdefaultResponse>;
}

export interface GetPartitionInfoList {
  /** The response includes the partition ID, partitioning scheme information, keys supported by the partition, status, health, and other details about the partition. */
  get(
    options?: GetPartitionInfoListParameters
  ): Promise<GetPartitionInfoList200Response | GetPartitionInfoListdefaultResponse>;
}

export interface GetPartitionInfo {
  /** Gets the information about the specified partition. The response includes the partition ID, partitioning scheme information, keys supported by the partition, status, health, and other details about the partition. */
  get(
    options?: GetPartitionInfoParameters
  ): Promise<
    GetPartitionInfo200Response | GetPartitionInfo204Response | GetPartitionInfodefaultResponse
  >;
}

export interface GetServiceNameInfo {
  /** Gets name of the service for the specified partition. A 404 error is returned if the partition ID does not exist in the cluster. */
  get(
    options?: GetServiceNameInfoParameters
  ): Promise<GetServiceNameInfo200Response | GetServiceNameInfodefaultResponse>;
}

export interface GetPartitionHealth {
  /**
   * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
   * Use ReplicasHealthStateFilter to filter the collection of ReplicaHealthState objects on the partition.
   * If you specify a partition that does not exist in the health store, this request returns an error.
   */
  get(
    options?: GetPartitionHealthParameters
  ): Promise<GetPartitionHealth200Response | GetPartitionHealthdefaultResponse>;
  /**
   * Gets the health information of the specified partition.
   * If the application health policy is specified, the health evaluation uses it to get the aggregated health state.
   * If the policy is not specified, the health evaluation uses the application health policy defined in the application manifest, or the default health policy, if no policy is defined in the manifest.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the partition based on the health state.
   * Use ReplicasHealthStateFilter to filter the collection of ReplicaHealthState objects on the partition. Use ApplicationHealthPolicy in the POST body to override the health policies used to evaluate the health.
   * If you specify a partition that does not exist in the health store, this request returns an error.
   */
  post(
    options?: GetPartitionHealthUsingPolicyParameters
  ): Promise<
    GetPartitionHealthUsingPolicy200Response | GetPartitionHealthUsingPolicydefaultResponse
  >;
}

export interface ReportPartitionHealth {
  /**
   * Reports health state of the specified Service Fabric partition. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Partition, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetPartitionHealth and check that the report appears in the HealthEvents section.
   */
  post(
    options: ReportPartitionHealthParameters
  ): Promise<ReportPartitionHealth200Response | ReportPartitionHealthdefaultResponse>;
}

export interface GetPartitionLoadInformation {
  /**
   * Returns information about the load of a specified partition.
   * The response includes a list of load reports for a Service Fabric partition.
   * Each report includes the load metric name, value, and last reported time in UTC.
   */
  get(
    options?: GetPartitionLoadInformationParameters
  ): Promise<GetPartitionLoadInformation200Response | GetPartitionLoadInformationdefaultResponse>;
}

export interface ResetPartitionLoad {
  /** Resets the current load of a Service Fabric partition to the default load for the service. */
  post(
    options?: ResetPartitionLoadParameters
  ): Promise<ResetPartitionLoad200Response | ResetPartitionLoaddefaultResponse>;
}

export interface RecoverPartition {
  /** This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
  post(
    options?: RecoverPartitionParameters
  ): Promise<RecoverPartition200Response | RecoverPartitiondefaultResponse>;
}

export interface RecoverServicePartitions {
  /** Indicates to the Service Fabric cluster that it should attempt to recover the specified service that is currently stuck in quorum loss. This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
  post(
    options?: RecoverServicePartitionsParameters
  ): Promise<RecoverServicePartitions200Response | RecoverServicePartitionsdefaultResponse>;
}

export interface RecoverSystemPartitions {
  /** Indicates to the Service Fabric cluster that it should attempt to recover the system services that are currently stuck in quorum loss. This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
  post(
    options?: RecoverSystemPartitionsParameters
  ): Promise<RecoverSystemPartitions200Response | RecoverSystemPartitionsdefaultResponse>;
}

export interface RecoverAllPartitions {
  /** This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
  post(
    options?: RecoverAllPartitionsParameters
  ): Promise<RecoverAllPartitions200Response | RecoverAllPartitionsdefaultResponse>;
}

export interface MovePrimaryReplica {
  /**
   * This command moves the primary replica of a partition of a stateful service, respecting all constraints.
   * If NodeName parameter is specified, primary will be moved to the specified node (if constraints allow it).
   * If NodeName parameter is not specified, primary replica will be moved to a random node in the cluster.
   * If IgnoreConstraints parameter is specified and set to true, then primary will be moved regardless of the constraints.
   */
  post(
    options?: MovePrimaryReplicaParameters
  ): Promise<MovePrimaryReplica200Response | MovePrimaryReplicadefaultResponse>;
}

export interface MoveSecondaryReplica {
  /**
   * This command moves the secondary replica of a partition of a stateful service, respecting all constraints.
   * CurrentNodeName parameter must be specified to identify the replica that is moved.
   * Source node name must be specified, but new node name can be omitted, and in that case replica is moved to a random node.
   * If IgnoreConstraints parameter is specified and set to true, then secondary will be moved regardless of the constraints.
   */
  post(
    options: MoveSecondaryReplicaParameters
  ): Promise<MoveSecondaryReplica200Response | MoveSecondaryReplicadefaultResponse>;
}

export interface UpdatePartitionLoad {
  /** Updates the load value and predicted load value for all the partitions provided for specified metrics. */
  post(
    options: UpdatePartitionLoadParameters
  ): Promise<UpdatePartitionLoad200Response | UpdatePartitionLoaddefaultResponse>;
}

export interface MoveInstance {
  /**
   * This command moves the instance of a partition of a stateless service, respecting all constraints.
   * Partition id and service name must be specified to be able to move the instance.
   * CurrentNodeName when specified identifies the instance that is moved. If not specified, random instance will be moved
   * New node name can be omitted, and in that case instance is moved to a random node.
   * If IgnoreConstraints parameter is specified and set to true, then instance will be moved regardless of the constraints.
   */
  post(
    options?: MoveInstanceParameters
  ): Promise<MoveInstance200Response | MoveInstancedefaultResponse>;
}

export interface MoveAuxiliaryReplica {
  /**
   * This command moves the auxiliary replica of a partition of a stateful service, respecting all constraints.
   * CurrentNodeName can be omitted, and in that case a random auxiliary replica is chosen.
   * NewNodeName can be omitted, and in that case the auxiliary replica is moved to a random node.
   * If IgnoreConstraints parameter is specified and set to true, then auxiliary will be moved regardless of the constraints.
   */
  post(
    options?: MoveAuxiliaryReplicaParameters
  ): Promise<MoveAuxiliaryReplica200Response | MoveAuxiliaryReplicadefaultResponse>;
}

export interface CreateRepairTask {
  /**
   * For clusters that have the Repair Manager Service configured,
   * this API provides a way to create repair tasks that run automatically or manually.
   * For repair tasks that run automatically, an appropriate repair executor
   * must be running for each repair action to run automatically.
   * These are currently only available in specially-configured Azure Cloud Services.
   *
   * To create a manual repair task, provide the set of impacted node names and the
   * expected impact. When the state of the created repair task changes to approved,
   * you can safely perform repair actions on those nodes.
   *
   * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
   */
  post(
    options: CreateRepairTaskParameters
  ): Promise<CreateRepairTask200Response | CreateRepairTaskdefaultResponse>;
}

export interface CancelRepairTask {
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  post(
    options: CancelRepairTaskParameters
  ): Promise<CancelRepairTask200Response | CancelRepairTaskdefaultResponse>;
}

export interface DeleteRepairTask {
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  post(
    options: DeleteRepairTaskParameters
  ): Promise<DeleteRepairTask200Response | DeleteRepairTaskdefaultResponse>;
}

export interface GetRepairTaskList {
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  get(
    options?: GetRepairTaskListParameters
  ): Promise<GetRepairTaskList200Response | GetRepairTaskListdefaultResponse>;
}

export interface ForceApproveRepairTask {
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  post(
    options: ForceApproveRepairTaskParameters
  ): Promise<ForceApproveRepairTask200Response | ForceApproveRepairTaskdefaultResponse>;
}

export interface UpdateRepairTaskHealthPolicy {
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  post(
    options: UpdateRepairTaskHealthPolicyParameters
  ): Promise<UpdateRepairTaskHealthPolicy200Response | UpdateRepairTaskHealthPolicydefaultResponse>;
}

export interface UpdateRepairExecutionState {
  /** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
  post(
    options: UpdateRepairExecutionStateParameters
  ): Promise<UpdateRepairExecutionState200Response | UpdateRepairExecutionStatedefaultResponse>;
}

export interface GetReplicaInfoList {
  /** The GetReplicas endpoint returns information about the replicas of the specified partition. The response includes the ID, role, status, health, node name, uptime, and other details about the replica. */
  get(
    options?: GetReplicaInfoListParameters
  ): Promise<GetReplicaInfoList200Response | GetReplicaInfoListdefaultResponse>;
}

export interface GetReplicaInfo {
  /** The response includes the ID, role, status, health, node name, uptime, and other details about the replica. */
  get(
    options?: GetReplicaInfoParameters
  ): Promise<GetReplicaInfo200Response | GetReplicaInfo204Response | GetReplicaInfodefaultResponse>;
}

export interface GetReplicaHealth {
  /**
   * Gets the health of a Service Fabric replica.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the replica based on the health state.
   */
  get(
    options?: GetReplicaHealthParameters
  ): Promise<GetReplicaHealth200Response | GetReplicaHealthdefaultResponse>;
  /**
   * Gets the health of a Service Fabric stateful service replica or stateless service instance.
   * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
   * Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the replica.
   */
  post(
    options?: GetReplicaHealthUsingPolicyParameters
  ): Promise<GetReplicaHealthUsingPolicy200Response | GetReplicaHealthUsingPolicydefaultResponse>;
}

export interface ReportReplicaHealth {
  /**
   * Reports health state of the specified Service Fabric replica. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Replica, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, run GetReplicaHealth and check that the report appears in the HealthEvents section.
   */
  post(
    options: ReportReplicaHealthParameters
  ): Promise<ReportReplicaHealth200Response | ReportReplicaHealthdefaultResponse>;
}

export interface GetDeployedServiceReplicaInfoList {
  /** Gets the list containing the information about replicas deployed on a Service Fabric node. The information include partition ID, replica ID, status of the replica, name of the service, name of the service type, and other information. Use PartitionId or ServiceManifestName query parameters to return information about the deployed replicas matching the specified values for those parameters. */
  get(
    options?: GetDeployedServiceReplicaInfoListParameters
  ): Promise<
    | GetDeployedServiceReplicaInfoList200Response
    | GetDeployedServiceReplicaInfoList204Response
    | GetDeployedServiceReplicaInfoListdefaultResponse
  >;
}

export interface GetDeployedServiceReplicaDetailInfo {
  /** Gets the details of the replica deployed on a Service Fabric node. The information includes service kind, service name, current service operation, current service operation start date time, partition ID, replica/instance ID, reported load, and other information. */
  get(
    options?: GetDeployedServiceReplicaDetailInfoParameters
  ): Promise<
    | GetDeployedServiceReplicaDetailInfo200Response
    | GetDeployedServiceReplicaDetailInfodefaultResponse
  >;
}

export interface GetDeployedServiceReplicaDetailInfoByPartitionId {
  /** Gets the details of the replica deployed on a Service Fabric node. The information includes service kind, service name, current service operation, current service operation start date time, partition ID, replica/instance ID, reported load, and other information. */
  get(
    options?: GetDeployedServiceReplicaDetailInfoByPartitionIdParameters
  ): Promise<
    | GetDeployedServiceReplicaDetailInfoByPartitionId200Response
    | GetDeployedServiceReplicaDetailInfoByPartitionIddefaultResponse
  >;
}

export interface RestartReplica {
  /** Restarts a service replica of a persisted service running on a node. Warning - There are no safety checks performed when this API is used. Incorrect use of this API can lead to availability loss for stateful services. */
  post(
    options?: RestartReplicaParameters
  ): Promise<RestartReplica200Response | RestartReplicadefaultResponse>;
}

export interface RemoveReplica {
  /** This API simulates a Service Fabric replica failure by removing a replica from a Service Fabric cluster. The removal closes the replica, transitions the replica to the role None, and then removes all of the state information of the replica from the cluster. This API tests the replica state removal path, and simulates the report fault permanent path through client APIs. Warning - There are no safety checks performed when this API is used. Incorrect use of this API can lead to data loss for stateful services. In addition, the forceRemove flag impacts all other replicas hosted in the same process. */
  post(
    options?: RemoveReplicaParameters
  ): Promise<RemoveReplica200Response | RemoveReplicadefaultResponse>;
}

export interface GetDeployedServicePackageInfoList {
  /** Returns the information about the service packages deployed on a Service Fabric node for the given application. */
  get(
    options?: GetDeployedServicePackageInfoListParameters
  ): Promise<
    GetDeployedServicePackageInfoList200Response | GetDeployedServicePackageInfoListdefaultResponse
  >;
}

export interface GetDeployedServicePackageInfoListByName {
  /** Returns the information about the service packages deployed on a Service Fabric node for the given application. These results are of service packages whose name match exactly the service package name specified as the parameter. */
  get(
    options?: GetDeployedServicePackageInfoListByNameParameters
  ): Promise<
    | GetDeployedServicePackageInfoListByName200Response
    | GetDeployedServicePackageInfoListByName204Response
    | GetDeployedServicePackageInfoListByNamedefaultResponse
  >;
}

export interface GetDeployedServicePackageHealth {
  /** Gets the information about health of a service package for a specific application deployed on a Service Fabric node. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed service package based on health state. */
  get(
    options?: GetDeployedServicePackageHealthParameters
  ): Promise<
    GetDeployedServicePackageHealth200Response | GetDeployedServicePackageHealthdefaultResponse
  >;
  /** Gets the information about health of a service package for a specific application deployed on a Service Fabric node. using the specified policy. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed service package based on health state. Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the deployed service package. */
  post(
    options?: GetDeployedServicePackageHealthUsingPolicyParameters
  ): Promise<
    | GetDeployedServicePackageHealthUsingPolicy200Response
    | GetDeployedServicePackageHealthUsingPolicydefaultResponse
  >;
}

export interface ReportDeployedServicePackageHealth {
  /**
   * Reports health state of the service package of the application deployed on a Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
   * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
   * The report may be accepted by the gateway, but rejected by the health store after extra validation.
   * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
   * To see whether the report was applied in the health store, get deployed service package health and check that the report appears in the HealthEvents section.
   */
  post(
    options: ReportDeployedServicePackageHealthParameters
  ): Promise<
    | ReportDeployedServicePackageHealth200Response
    | ReportDeployedServicePackageHealthdefaultResponse
  >;
}

export interface DeployServicePackageToNode {
  /** This API provides a way to download code packages including the container images on a specific node outside of the normal application deployment and upgrade path. This is useful for the large code packages and container images to be present on the node before the actual application deployment and upgrade, thus significantly reducing the total time required for the deployment or upgrade. */
  post(
    options: DeployServicePackageToNodeParameters
  ): Promise<DeployServicePackageToNode200Response | DeployServicePackageToNodedefaultResponse>;
}

export interface GetDeployedCodePackageInfoList {
  /** Gets the list of code packages deployed on a Service Fabric node for the given application. */
  get(
    options?: GetDeployedCodePackageInfoListParameters
  ): Promise<
    GetDeployedCodePackageInfoList200Response | GetDeployedCodePackageInfoListdefaultResponse
  >;
}

export interface RestartDeployedCodePackage {
  /** Restarts a code package deployed on a Service Fabric node in a cluster. This aborts the code package process, which will restart all the user service replicas hosted in that process. */
  post(
    options: RestartDeployedCodePackageParameters
  ): Promise<RestartDeployedCodePackage200Response | RestartDeployedCodePackagedefaultResponse>;
}

export interface GetContainerLogsDeployedOnNode {
  /** Gets the container logs for container deployed on a Service Fabric node for the given code package. */
  get(
    options: GetContainerLogsDeployedOnNodeParameters
  ): Promise<
    GetContainerLogsDeployedOnNode200Response | GetContainerLogsDeployedOnNodedefaultResponse
  >;
}

export interface InvokeContainerApi {
  /** Invoke container API on a container deployed on a Service Fabric node for the given code package. */
  post(
    options: InvokeContainerApiParameters
  ): Promise<InvokeContainerApi200Response | InvokeContainerApidefaultResponse>;
}

export interface CreateComposeDeployment {
  /** Compose is a file format that describes multi-container applications. This API allows deploying container based applications defined in compose format in a Service Fabric cluster. Once the deployment is created, its status can be tracked via the `GetComposeDeploymentStatus` API. */
  put(
    options: CreateComposeDeploymentParameters
  ): Promise<CreateComposeDeployment202Response | CreateComposeDeploymentdefaultResponse>;
}

export interface GetComposeDeploymentStatus {
  /** Returns the status of the compose deployment that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, status, and other details about the deployment. */
  get(
    options?: GetComposeDeploymentStatusParameters
  ): Promise<GetComposeDeploymentStatus200Response | GetComposeDeploymentStatusdefaultResponse>;
}

export interface GetComposeDeploymentStatusList {
  /** Gets the status about the compose deployments that were created or in the process of being created in the Service Fabric cluster. The response includes the name, status, and other details about the compose deployments. If the list of deployments do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. */
  get(
    options?: GetComposeDeploymentStatusListParameters
  ): Promise<
    GetComposeDeploymentStatusList200Response | GetComposeDeploymentStatusListdefaultResponse
  >;
}

export interface GetComposeDeploymentUpgradeProgress {
  /** Returns the information about the state of the compose deployment upgrade along with details to aid debugging application health issues. */
  get(
    options?: GetComposeDeploymentUpgradeProgressParameters
  ): Promise<
    | GetComposeDeploymentUpgradeProgress200Response
    | GetComposeDeploymentUpgradeProgressdefaultResponse
  >;
}

export interface RemoveComposeDeployment {
  /** Deletes an existing Service Fabric compose deployment. */
  post(
    options?: RemoveComposeDeploymentParameters
  ): Promise<RemoveComposeDeployment202Response | RemoveComposeDeploymentdefaultResponse>;
}

export interface StartComposeDeploymentUpgrade {
  /** Validates the supplied upgrade parameters and starts upgrading the deployment if the parameters are valid. */
  post(
    options: StartComposeDeploymentUpgradeParameters
  ): Promise<
    StartComposeDeploymentUpgrade202Response | StartComposeDeploymentUpgradedefaultResponse
  >;
}

export interface StartRollbackComposeDeploymentUpgrade {
  /** Rollback a service fabric compose deployment upgrade. */
  post(
    options?: StartRollbackComposeDeploymentUpgradeParameters
  ): Promise<
    | StartRollbackComposeDeploymentUpgrade200Response
    | StartRollbackComposeDeploymentUpgradedefaultResponse
  >;
}

export interface GetChaos {
  /** Get the status of Chaos indicating whether or not Chaos is running, the Chaos parameters used for running Chaos and the status of the Chaos Schedule. */
  get(options?: GetChaosParameters): Promise<GetChaos200Response | GetChaosdefaultResponse>;
}

export interface StartChaos {
  /**
   * If Chaos is not already running in the cluster, it starts Chaos with the passed in Chaos parameters.
   * If Chaos is already running when this call is made, the call fails with the error code FABRIC_E_CHAOS_ALREADY_RUNNING.
   * Refer to the article [Induce controlled Chaos in Service Fabric clusters](https://docs.microsoft.com/azure/service-fabric/service-fabric-controlled-chaos) for more details.
   */
  post(options: StartChaosParameters): Promise<StartChaos200Response | StartChaosdefaultResponse>;
}

export interface StopChaos {
  /**
   * Stops Chaos from executing new faults. In-flight faults will continue to execute until they are complete. The current Chaos Schedule is put into a stopped state.
   * Once a schedule is stopped, it will stay in the stopped state and not be used to Chaos Schedule new runs of Chaos. A new Chaos Schedule must be set in order to resume scheduling.
   */
  post(options?: StopChaosParameters): Promise<StopChaos200Response | StopChaosdefaultResponse>;
}

export interface GetChaosEvents {
  /**
   * To get the next segment of the Chaos events, you can specify the ContinuationToken. To get the start of a new segment of Chaos events, you can specify the time range
   * through StartTimeUtc and EndTimeUtc. You cannot specify both the ContinuationToken and the time range in the same call.
   * When there are more than 100 Chaos events, the Chaos events are returned in multiple segments where a segment contains no more than 100 Chaos events and to get the next segment you make a call to this API with the continuation token.
   */
  get(
    options?: GetChaosEventsParameters
  ): Promise<GetChaosEvents200Response | GetChaosEventsdefaultResponse>;
}

export interface GetChaosSchedule {
  /** Gets the version of the Chaos Schedule in use and the Chaos Schedule that defines when and how to run Chaos. */
  get(
    options?: GetChaosScheduleParameters
  ): Promise<GetChaosSchedule200Response | GetChaosScheduledefaultResponse>;
  /**
   * Chaos will automatically schedule runs based on the Chaos Schedule.
   * The Chaos Schedule will be updated if the provided version matches the version on the server.
   * When updating the Chaos Schedule, the version on the server is incremented by 1.
   * The version on the server will wrap back to 0 after reaching a large number.
   * If Chaos is running when this call is made, the call will fail.
   */
  post(
    options: PostChaosScheduleParameters
  ): Promise<PostChaosSchedule200Response | PostChaosScheduledefaultResponse>;
}

export interface UploadFile {
  /** Uploads contents of the file to the image store. Use this API if the file is small enough to upload again if the connection fails. The file's data needs to be added to the request body. The contents will be uploaded to the specified path. Image store service uses a mark file to indicate the availability of the folder. The mark file is an empty file named "_.dir". The mark file is generated by the image store service when all files in a folder are uploaded. When using File-by-File approach to upload application package in REST, the image store service isn't aware of the file hierarchy of the application package; you need to create a mark file per folder and upload it last, to let the image store service know that the folder is complete. */
  put(options?: UploadFileParameters): Promise<UploadFile200Response | UploadFiledefaultResponse>;
  /** Returns the information about the image store content at the specified contentPath. The contentPath is relative to the root of the image store. */
  get(
    options?: GetImageStoreContentParameters
  ): Promise<GetImageStoreContent200Response | GetImageStoreContentdefaultResponse>;
  /** Deletes existing image store content being found within the given image store relative path. This command can be used to delete uploaded application packages once they are provisioned. */
  delete(
    options?: DeleteImageStoreContentParameters
  ): Promise<DeleteImageStoreContent200Response | DeleteImageStoreContentdefaultResponse>;
}

export interface GetImageStoreRootContent {
  /** Returns the information about the image store content at the root of the image store. */
  get(
    options?: GetImageStoreRootContentParameters
  ): Promise<GetImageStoreRootContent200Response | GetImageStoreRootContentdefaultResponse>;
}

export interface CopyImageStoreContent {
  /** Copies the image store content from the source image store relative path to the destination image store relative path. */
  post(
    options: CopyImageStoreContentParameters
  ): Promise<CopyImageStoreContent200Response | CopyImageStoreContentdefaultResponse>;
}

export interface DeleteImageStoreUploadSession {
  /** The DELETE request will cause the existing upload session to expire and remove any previously uploaded file chunks. */
  delete(
    options: DeleteImageStoreUploadSessionParameters
  ): Promise<
    DeleteImageStoreUploadSession200Response | DeleteImageStoreUploadSessiondefaultResponse
  >;
}

export interface CommitImageStoreUploadSession {
  /** When all file chunks have been uploaded, the upload session needs to be committed explicitly to complete the upload. Image store preserves the upload session until the expiration time, which is 30 minutes after the last chunk received. */
  post(
    options: CommitImageStoreUploadSessionParameters
  ): Promise<
    CommitImageStoreUploadSession200Response | CommitImageStoreUploadSessiondefaultResponse
  >;
}

export interface GetImageStoreUploadSessionById {
  /** Gets the image store upload session identified by the given ID. User can query the upload session at any time during uploading. */
  get(
    options: GetImageStoreUploadSessionByIdParameters
  ): Promise<
    GetImageStoreUploadSessionById200Response | GetImageStoreUploadSessionByIddefaultResponse
  >;
}

export interface GetImageStoreUploadSessionByPath {
  /** Gets the image store upload session associated with the given image store relative path. User can query the upload session at any time during uploading. */
  get(
    options?: GetImageStoreUploadSessionByPathParameters
  ): Promise<
    GetImageStoreUploadSessionByPath200Response | GetImageStoreUploadSessionByPathdefaultResponse
  >;
}

export interface UploadFileChunk {
  /**
   * Uploads a file chunk to the image store with the specified upload session ID and image store relative path. This API allows user to resume the file upload operation. user doesn't have to restart the file upload from scratch whenever there is a network interruption. Use this option if the file size is large.
   *
   * To perform a resumable file upload, user need to break the file into multiple chunks and upload these chunks to the image store one-by-one. Chunks don't have to be uploaded in order. If the file represented by the image store relative path already exists, it will be overwritten when the upload session commits.
   */
  put(
    options: UploadFileChunkParameters
  ): Promise<UploadFileChunk200Response | UploadFileChunkdefaultResponse>;
}

export interface GetImageStoreRootFolderSize {
  /** Returns the total size of files at the root and children folders in image store. */
  get(
    options?: GetImageStoreRootFolderSizeParameters
  ): Promise<GetImageStoreRootFolderSize200Response | GetImageStoreRootFolderSizedefaultResponse>;
}

export interface GetImageStoreFolderSize {
  /** Gets the total size of file under a image store folder, specified by contentPath. The contentPath is relative to the root of the image store. */
  get(
    options?: GetImageStoreFolderSizeParameters
  ): Promise<GetImageStoreFolderSize200Response | GetImageStoreFolderSizedefaultResponse>;
}

export interface GetImageStoreInfo {
  /** Returns information about the primary ImageStore replica, such as disk capacity and available disk space at the node it is on, and several categories of the ImageStore's file system usage. */
  get(
    options?: GetImageStoreInfoParameters
  ): Promise<GetImageStoreInfo200Response | GetImageStoreInfodefaultResponse>;
}

export interface InvokeInfrastructureCommand {
  /**
   * For clusters that have one or more instances of the Infrastructure Service configured,
   * this API provides a way to send infrastructure-specific commands to a particular
   * instance of the Infrastructure Service.
   *
   * Available commands and their corresponding response formats vary depending upon
   * the infrastructure on which the cluster is running.
   *
   * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
   */
  post(
    options: InvokeInfrastructureCommandParameters
  ): Promise<InvokeInfrastructureCommand200Response | InvokeInfrastructureCommanddefaultResponse>;
}

export interface InvokeInfrastructureQuery {
  /**
   * For clusters that have one or more instances of the Infrastructure Service configured,
   * this API provides a way to send infrastructure-specific queries to a particular
   * instance of the Infrastructure Service.
   *
   * Available commands and their corresponding response formats vary depending upon
   * the infrastructure on which the cluster is running.
   *
   * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
   */
  get(
    options: InvokeInfrastructureQueryParameters
  ): Promise<InvokeInfrastructureQuery200Response | InvokeInfrastructureQuerydefaultResponse>;
}

export interface StartDataLoss {
  /**
   * This API will induce data loss for the specified partition. It will trigger a call to the OnDataLoss API of the partition.
   * Actual data loss will depend on the specified DataLossMode.
   *
   * - PartialDataLoss - Only a quorum of replicas are removed and OnDataLoss is triggered for the partition but actual data loss depends on the presence of in-flight replication.
   * - FullDataLoss - All replicas are removed hence all data is lost and OnDataLoss is triggered.
   *
   * This API should only be called with a stateful service as the target.
   *
   * Calling this API with a system service as the target is not advised.
   *
   * Note:  Once this API has been called, it cannot be reversed. Calling CancelOperation will only stop execution and clean up internal system state.
   * It will not restore data if the command has progressed far enough to cause data loss.
   *
   * Call the GetDataLossProgress API with the same OperationId to return information on the operation started with this API.
   */
  post(
    options: StartDataLossParameters
  ): Promise<StartDataLoss202Response | StartDataLossdefaultResponse>;
}

export interface GetDataLossProgress {
  /** Gets the progress of a data loss operation started with StartDataLoss, using the OperationId. */
  get(
    options: GetDataLossProgressParameters
  ): Promise<GetDataLossProgress200Response | GetDataLossProgressdefaultResponse>;
}

export interface StartQuorumLoss {
  /**
   * This API is useful for a temporary quorum loss situation on your service.
   *
   * Call the GetQuorumLossProgress API with the same OperationId to return information on the operation started with this API.
   *
   * This can only be called on stateful persisted (HasPersistedState==true) services.  Do not use this API on stateless services or stateful in-memory only services.
   */
  post(
    options: StartQuorumLossParameters
  ): Promise<StartQuorumLoss202Response | StartQuorumLossdefaultResponse>;
}

export interface GetQuorumLossProgress {
  /** Gets the progress of a quorum loss operation started with StartQuorumLoss, using the provided OperationId. */
  get(
    options: GetQuorumLossProgressParameters
  ): Promise<GetQuorumLossProgress200Response | GetQuorumLossProgressdefaultResponse>;
}

export interface StartPartitionRestart {
  /**
   * This API is useful for testing failover.
   *
   * If used to target a stateless service partition, RestartPartitionMode must be AllReplicasOrInstances.
   *
   * Call the GetPartitionRestartProgress API using the same OperationId to get the progress.
   */
  post(
    options: StartPartitionRestartParameters
  ): Promise<StartPartitionRestart202Response | StartPartitionRestartdefaultResponse>;
}

export interface GetPartitionRestartProgress {
  /** Gets the progress of a PartitionRestart started with StartPartitionRestart using the provided OperationId. */
  get(
    options: GetPartitionRestartProgressParameters
  ): Promise<GetPartitionRestartProgress200Response | GetPartitionRestartProgressdefaultResponse>;
}

export interface StartNodeTransition {
  /**
   * Starts or stops a cluster node.  A cluster node is a process, not the OS instance itself.  To start a node, pass in "Start" for the NodeTransitionType parameter.
   * To stop a node, pass in "Stop" for the NodeTransitionType parameter.  This API starts the operation - when the API returns the node may not have finished transitioning yet.
   * Call GetNodeTransitionProgress with the same OperationId to get the progress of the operation.
   */
  post(
    options: StartNodeTransitionParameters
  ): Promise<StartNodeTransition202Response | StartNodeTransitiondefaultResponse>;
}

export interface GetNodeTransitionProgress {
  /** Gets the progress of an operation started with StartNodeTransition using the provided OperationId. */
  get(
    options: GetNodeTransitionProgressParameters
  ): Promise<GetNodeTransitionProgress200Response | GetNodeTransitionProgressdefaultResponse>;
}

export interface GetFaultOperationList {
  /** Gets the list of user-induced fault operations filtered by provided input. */
  get(
    options: GetFaultOperationListParameters
  ): Promise<GetFaultOperationList200Response | GetFaultOperationListdefaultResponse>;
}

export interface CancelOperation {
  /**
   * The following APIs start fault operations that may be cancelled by using CancelOperation: StartDataLoss, StartQuorumLoss, StartPartitionRestart, StartNodeTransition.
   *
   * If force is false, then the specified user-induced operation will be gracefully stopped and cleaned up.  If force is true, the command will be aborted, and some internal state
   * may be left behind.  Specifying force as true should be used with care.  Calling this API with force set to true is not allowed until this API has already
   * been called on the same test command with force set to false first, or unless the test command already has an OperationState of OperationState.RollingBack.
   * Clarification: OperationState.RollingBack means that the system will be/is cleaning up internal system state caused by executing the command.  It will not restore data if the
   * test command was to cause data loss.  For example, if you call StartDataLoss then call this API, the system will only clean up internal state from running the command.
   * It will not restore the target partition's data, if the command progressed far enough to cause data loss.
   *
   * Important note:  if this API is invoked with force==true, internal state may be left behind.
   */
  post(
    options: CancelOperationParameters
  ): Promise<CancelOperation200Response | CancelOperationdefaultResponse>;
}

export interface CreateBackupPolicy {
  /** Creates a backup policy which can be associated later with a Service Fabric application, service or a partition for periodic backup. */
  post(
    options: CreateBackupPolicyParameters
  ): Promise<CreateBackupPolicy201Response | CreateBackupPolicydefaultResponse>;
}

export interface DeleteBackupPolicy {
  /** Deletes an existing backup policy. A backup policy must be created before it can be deleted. A currently active backup policy, associated with any Service Fabric application, service or partition, cannot be deleted without first deleting the mapping. */
  post(
    options?: DeleteBackupPolicyParameters
  ): Promise<DeleteBackupPolicy200Response | DeleteBackupPolicydefaultResponse>;
}

export interface GetBackupPolicyList {
  /** Get a list of all the backup policies configured. */
  get(
    options?: GetBackupPolicyListParameters
  ): Promise<GetBackupPolicyList200Response | GetBackupPolicyListdefaultResponse>;
}

export interface GetBackupPolicyByName {
  /** Gets a particular backup policy identified by {backupPolicyName} */
  get(
    options?: GetBackupPolicyByNameParameters
  ): Promise<GetBackupPolicyByName200Response | GetBackupPolicyByNamedefaultResponse>;
}

export interface GetAllEntitiesBackedUpByPolicy {
  /** Returns a list of Service Fabric application, service or partition which are associated with this backup policy. */
  get(
    options?: GetAllEntitiesBackedUpByPolicyParameters
  ): Promise<
    GetAllEntitiesBackedUpByPolicy200Response | GetAllEntitiesBackedUpByPolicydefaultResponse
  >;
}

export interface UpdateBackupPolicy {
  /** Updates the backup policy identified by {backupPolicyName} */
  post(
    options: UpdateBackupPolicyParameters
  ): Promise<UpdateBackupPolicy200Response | UpdateBackupPolicydefaultResponse>;
}

export interface EnableApplicationBackup {
  /**
   * Enables periodic backup of stateful partitions which are part of this Service Fabric application. Each partition is backed up individually as per the specified backup policy description.
   * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
   */
  post(
    options: EnableApplicationBackupParameters
  ): Promise<EnableApplicationBackup202Response | EnableApplicationBackupdefaultResponse>;
}

export interface DisableApplicationBackup {
  /** Disables periodic backup of Service Fabric application which was previously enabled. */
  post(
    options?: DisableApplicationBackupParameters
  ): Promise<DisableApplicationBackup202Response | DisableApplicationBackupdefaultResponse>;
}

export interface GetApplicationBackupConfigurationInfo {
  /** Gets the Service Fabric backup configuration information for the application and the services and partitions under this application. */
  get(
    options?: GetApplicationBackupConfigurationInfoParameters
  ): Promise<
    | GetApplicationBackupConfigurationInfo200Response
    | GetApplicationBackupConfigurationInfodefaultResponse
  >;
}

export interface GetApplicationBackupList {
  /** Returns a list of backups available for every partition in this Service Fabric application. The server enumerates all the backups available at the backup location configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for every partition. */
  get(
    options?: GetApplicationBackupListParameters
  ): Promise<GetApplicationBackupList200Response | GetApplicationBackupListdefaultResponse>;
}

export interface SuspendApplicationBackup {
  /** The application which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. This operation applies to the entire application's hierarchy. It means all the services and partitions under this application are now suspended for backup. */
  post(
    options?: SuspendApplicationBackupParameters
  ): Promise<SuspendApplicationBackup202Response | SuspendApplicationBackupdefaultResponse>;
}

export interface ResumeApplicationBackup {
  /** The previously suspended Service Fabric application resumes taking periodic backup as per the backup policy currently configured for the same. */
  post(
    options?: ResumeApplicationBackupParameters
  ): Promise<ResumeApplicationBackup202Response | ResumeApplicationBackupdefaultResponse>;
}

export interface EnableServiceBackup {
  /**
   * Enables periodic backup of stateful partitions which are part of this Service Fabric service. Each partition is backed up individually as per the specified backup policy description. In case the application, which the service is part of, is already enabled for backup then this operation would override the policy being used to take the periodic backup for this service and its partitions (unless explicitly overridden at the partition level).
   * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
   */
  post(
    options: EnableServiceBackupParameters
  ): Promise<EnableServiceBackup202Response | EnableServiceBackupdefaultResponse>;
}

export interface DisableServiceBackup {
  /**
   * Disables periodic backup of Service Fabric service which was previously enabled. Backup must be explicitly enabled before it can be disabled.
   * In case the backup is enabled for the Service Fabric application, which this service is part of, this service would continue to be periodically backed up as per the policy mapped at the application level.
   */
  post(
    options?: DisableServiceBackupParameters
  ): Promise<DisableServiceBackup202Response | DisableServiceBackupdefaultResponse>;
}

export interface GetServiceBackupConfigurationInfo {
  /** Gets the Service Fabric backup configuration information for the service and the partitions under this service. */
  get(
    options?: GetServiceBackupConfigurationInfoParameters
  ): Promise<
    GetServiceBackupConfigurationInfo200Response | GetServiceBackupConfigurationInfodefaultResponse
  >;
}

export interface GetServiceBackupList {
  /** Returns a list of backups available for every partition in this Service Fabric service. The server enumerates all the backups available in the backup store configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for every partition. */
  get(
    options?: GetServiceBackupListParameters
  ): Promise<GetServiceBackupList200Response | GetServiceBackupListdefaultResponse>;
}

export interface SuspendServiceBackup {
  /** The service which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. This operation applies to the entire service's hierarchy. It means all the partitions under this service are now suspended for backup. */
  post(
    options?: SuspendServiceBackupParameters
  ): Promise<SuspendServiceBackup202Response | SuspendServiceBackupdefaultResponse>;
}

export interface ResumeServiceBackup {
  /** The previously suspended Service Fabric service resumes taking periodic backup as per the backup policy currently configured for the same. */
  post(
    options?: ResumeServiceBackupParameters
  ): Promise<ResumeServiceBackup202Response | ResumeServiceBackupdefaultResponse>;
}

export interface EnablePartitionBackup {
  /**
   * Enables periodic backup of stateful persisted partition. Each partition is backed up as per the specified backup policy description. In case the application or service, which is partition is part of, is already enabled for backup then this operation would override the policy being used to take the periodic backup of this partition.
   * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
   */
  post(
    options: EnablePartitionBackupParameters
  ): Promise<EnablePartitionBackup202Response | EnablePartitionBackupdefaultResponse>;
}

export interface DisablePartitionBackup {
  /**
   * Disables periodic backup of partition which was previously enabled. Backup must be explicitly enabled before it can be disabled.
   * In case the backup is enabled for the Service Fabric application or service, which this partition is part of, this partition would continue to be periodically backed up as per the policy mapped at the higher level entity.
   */
  post(
    options?: DisablePartitionBackupParameters
  ): Promise<DisablePartitionBackup202Response | DisablePartitionBackupdefaultResponse>;
}

export interface GetPartitionBackupConfigurationInfo {
  /** Gets the Service Fabric Backup configuration information for the specified partition. */
  get(
    options?: GetPartitionBackupConfigurationInfoParameters
  ): Promise<
    | GetPartitionBackupConfigurationInfo200Response
    | GetPartitionBackupConfigurationInfodefaultResponse
  >;
}

export interface GetPartitionBackupList {
  /** Returns a list of backups available for the specified partition. The server enumerates all the backups available in the backup store configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for the partition. */
  get(
    options?: GetPartitionBackupListParameters
  ): Promise<GetPartitionBackupList200Response | GetPartitionBackupListdefaultResponse>;
}

export interface SuspendPartitionBackup {
  /** The partition which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. */
  post(
    options?: SuspendPartitionBackupParameters
  ): Promise<SuspendPartitionBackup202Response | SuspendPartitionBackupdefaultResponse>;
}

export interface ResumePartitionBackup {
  /** The previously suspended partition resumes taking periodic backup as per the backup policy currently configured for the same. */
  post(
    options?: ResumePartitionBackupParameters
  ): Promise<ResumePartitionBackup202Response | ResumePartitionBackupdefaultResponse>;
}

export interface BackupPartition {
  /**
   * Creates a backup of the stateful persisted partition's state. In case the partition is already being periodically backed up, then by default the new backup is created at the same backup storage. One can also override the same by specifying the backup storage details as part of the request body. Once the backup is initiated, its progress can be tracked using the GetBackupProgress operation.
   * In case, the operation times out, specify a greater backup timeout value in the query parameter.
   */
  post(
    options?: BackupPartitionParameters
  ): Promise<BackupPartition202Response | BackupPartitiondefaultResponse>;
}

export interface GetPartitionBackupProgress {
  /** Returns information about the state of the latest backup along with details or failure reason in case of completion. */
  get(
    options?: GetPartitionBackupProgressParameters
  ): Promise<GetPartitionBackupProgress200Response | GetPartitionBackupProgressdefaultResponse>;
}

export interface RestorePartition {
  /**
   * Restores the state of a of the stateful persisted partition using the specified backup point. In case the partition is already being periodically backed up, then by default the backup point is looked for in the storage specified in backup policy. One can also override the same by specifying the backup storage details as part of the restore partition description in body. Once the restore is initiated, its progress can be tracked using the GetRestoreProgress operation.
   * In case, the operation times out, specify a greater restore timeout value in the query parameter.
   */
  post(
    options: RestorePartitionParameters
  ): Promise<RestorePartition202Response | RestorePartitiondefaultResponse>;
}

export interface GetPartitionRestoreProgress {
  /** Returns information about the state of the latest restore operation along with details or failure reason in case of completion. */
  get(
    options?: GetPartitionRestoreProgressParameters
  ): Promise<GetPartitionRestoreProgress200Response | GetPartitionRestoreProgressdefaultResponse>;
}

export interface GetBackupsFromBackupLocation {
  /** Gets the list of backups available for the specified backed up entity (Application, Service or Partition) at the specified backup location (FileShare or Azure Blob Storage). */
  post(
    options: GetBackupsFromBackupLocationParameters
  ): Promise<GetBackupsFromBackupLocation200Response | GetBackupsFromBackupLocationdefaultResponse>;
}

export interface CreateName {
  /** Creates the specified Service Fabric name. */
  post(options: CreateNameParameters): Promise<CreateName201Response | CreateNamedefaultResponse>;
}

export interface GetNameExistsInfo {
  /** Returns whether the specified Service Fabric name exists. */
  get(
    options?: GetNameExistsInfoParameters
  ): Promise<GetNameExistsInfo200Response | GetNameExistsInfodefaultResponse>;
  /** Deletes the specified Service Fabric name. A name must be created before it can be deleted. Deleting a name with child properties will fail. */
  delete(
    options?: DeleteNameParameters
  ): Promise<DeleteName200Response | DeleteNamedefaultResponse>;
}

export interface GetSubNameInfoList {
  /** Enumerates all the Service Fabric names under a given name. If the subnames do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. Querying a name that doesn't exist will fail. */
  get(
    options?: GetSubNameInfoListParameters
  ): Promise<GetSubNameInfoList200Response | GetSubNameInfoListdefaultResponse>;
}

export interface GetPropertyInfoList {
  /** A Service Fabric name can have one or more named properties that store custom information. This operation gets the information about these properties in a paged list. The information includes name, value, and metadata about each of the properties. */
  get(
    options?: GetPropertyInfoListParameters
  ): Promise<GetPropertyInfoList200Response | GetPropertyInfoListdefaultResponse>;
}

export interface PutProperty {
  /** Creates or updates the specified Service Fabric property under a given name. */
  put(options: PutPropertyParameters): Promise<PutProperty200Response | PutPropertydefaultResponse>;
  /** Gets the specified Service Fabric property under a given name. This will always return both value and metadata. */
  get(
    options: GetPropertyInfoParameters
  ): Promise<GetPropertyInfo200Response | GetPropertyInfodefaultResponse>;
  /** Deletes the specified Service Fabric property under a given name. A property must be created before it can be deleted. */
  delete(
    options: DeletePropertyParameters
  ): Promise<DeleteProperty200Response | DeletePropertydefaultResponse>;
}

export interface SubmitPropertyBatch {
  /** Submits a batch of property operations. Either all or none of the operations will be committed. */
  post(
    options: SubmitPropertyBatchParameters
  ): Promise<
    | SubmitPropertyBatch200Response
    | SubmitPropertyBatch409Response
    | SubmitPropertyBatchdefaultResponse
  >;
}

export interface GetClusterEventList {
  /** The response is list of ClusterEvent objects. */
  get(
    options: GetClusterEventListParameters
  ): Promise<GetClusterEventList200Response | GetClusterEventListdefaultResponse>;
}

export interface GetContainersEventList {
  /** The response is list of ContainerInstanceEvent objects. */
  get(
    options: GetContainersEventListParameters
  ): Promise<GetContainersEventList200Response | GetContainersEventListdefaultResponse>;
}

export interface GetNodeEventList {
  /** The response is list of NodeEvent objects. */
  get(
    options: GetNodeEventListParameters
  ): Promise<GetNodeEventList200Response | GetNodeEventListdefaultResponse>;
}

export interface GetNodesEventList {
  /** The response is list of NodeEvent objects. */
  get(
    options: GetNodesEventListParameters
  ): Promise<GetNodesEventList200Response | GetNodesEventListdefaultResponse>;
}

export interface GetApplicationEventList {
  /** The response is list of ApplicationEvent objects. */
  get(
    options: GetApplicationEventListParameters
  ): Promise<GetApplicationEventList200Response | GetApplicationEventListdefaultResponse>;
}

export interface GetApplicationsEventList {
  /** The response is list of ApplicationEvent objects. */
  get(
    options: GetApplicationsEventListParameters
  ): Promise<GetApplicationsEventList200Response | GetApplicationsEventListdefaultResponse>;
}

export interface GetServiceEventList {
  /** The response is list of ServiceEvent objects. */
  get(
    options: GetServiceEventListParameters
  ): Promise<GetServiceEventList200Response | GetServiceEventListdefaultResponse>;
}

export interface GetServicesEventList {
  /** The response is list of ServiceEvent objects. */
  get(
    options: GetServicesEventListParameters
  ): Promise<GetServicesEventList200Response | GetServicesEventListdefaultResponse>;
}

export interface GetPartitionEventList {
  /** The response is list of PartitionEvent objects. */
  get(
    options: GetPartitionEventListParameters
  ): Promise<GetPartitionEventList200Response | GetPartitionEventListdefaultResponse>;
}

export interface GetPartitionsEventList {
  /** The response is list of PartitionEvent objects. */
  get(
    options: GetPartitionsEventListParameters
  ): Promise<GetPartitionsEventList200Response | GetPartitionsEventListdefaultResponse>;
}

export interface GetPartitionReplicaEventList {
  /** The response is list of ReplicaEvent objects. */
  get(
    options: GetPartitionReplicaEventListParameters
  ): Promise<GetPartitionReplicaEventList200Response | GetPartitionReplicaEventListdefaultResponse>;
}

export interface GetPartitionReplicasEventList {
  /** The response is list of ReplicaEvent objects. */
  get(
    options: GetPartitionReplicasEventListParameters
  ): Promise<
    GetPartitionReplicasEventList200Response | GetPartitionReplicasEventListdefaultResponse
  >;
}

export interface GetCorrelatedEventList {
  /** The response is list of FabricEvents. */
  get(
    options?: GetCorrelatedEventListParameters
  ): Promise<GetCorrelatedEventList200Response | GetCorrelatedEventListdefaultResponse>;
}

export interface MeshSecretCreateOrUpdate {
  /** Creates a Secret resource with the specified name, description and properties. If Secret resource with the same name exists, then it is updated with the specified description and properties. Once created, the kind and contentType of a secret resource cannot be updated. */
  put(
    options: MeshSecretCreateOrUpdateParameters
  ): Promise<
    | MeshSecretCreateOrUpdate200Response
    | MeshSecretCreateOrUpdate201Response
    | MeshSecretCreateOrUpdate202Response
    | MeshSecretCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Secret resource with the given name. The information include the description and other properties of the Secret. */
  get(
    options?: MeshSecretGetParameters
  ): Promise<MeshSecretGet200Response | MeshSecretGetdefaultResponse>;
  /** Deletes the specified Secret resource and all of its named values. */
  delete(
    options?: MeshSecretDeleteParameters
  ): Promise<
    | MeshSecretDelete200Response
    | MeshSecretDelete202Response
    | MeshSecretDelete204Response
    | MeshSecretDeletedefaultResponse
  >;
}

export interface MeshSecretList {
  /** Gets the information about all secret resources in a given resource group. The information include the description and other properties of the Secret. */
  get(
    options?: MeshSecretListParameters
  ): Promise<MeshSecretList200Response | MeshSecretListdefaultResponse>;
}

export interface MeshSecretValueAddValue {
  /** Creates a new value of the specified secret resource. The name of the value is typically the version identifier. Once created the value cannot be changed. */
  put(
    options: MeshSecretValueAddValueParameters
  ): Promise<
    | MeshSecretValueAddValue200Response
    | MeshSecretValueAddValue201Response
    | MeshSecretValueAddValue202Response
    | MeshSecretValueAddValuedefaultResponse
  >;
  /** Get the information about the specified named secret value resources. The information does not include the actual value of the secret. */
  get(
    options?: MeshSecretValueGetParameters
  ): Promise<MeshSecretValueGet200Response | MeshSecretValueGetdefaultResponse>;
  /** Deletes the secret value resource identified by the name. The name of the resource is typically the version associated with that value. Deletion will fail if the specified value is in use. */
  delete(
    options?: MeshSecretValueDeleteParameters
  ): Promise<
    | MeshSecretValueDelete200Response
    | MeshSecretValueDelete202Response
    | MeshSecretValueDelete204Response
    | MeshSecretValueDeletedefaultResponse
  >;
}

export interface MeshSecretValueList {
  /** Gets information about all secret value resources of the specified secret resource. The information includes the names of the secret value resources, but not the actual values. */
  get(
    options?: MeshSecretValueListParameters
  ): Promise<MeshSecretValueList200Response | MeshSecretValueListdefaultResponse>;
}

export interface MeshSecretValueShow {
  /** Lists the decrypted value of the specified named value of the secret resource. This is a privileged operation. */
  post(
    options?: MeshSecretValueShowParameters
  ): Promise<MeshSecretValueShow200Response | MeshSecretValueShowdefaultResponse>;
}

export interface MeshVolumeCreateOrUpdate {
  /** Creates a Volume resource with the specified name, description and properties. If Volume resource with the same name exists, then it is updated with the specified description and properties. */
  put(
    options: MeshVolumeCreateOrUpdateParameters
  ): Promise<
    | MeshVolumeCreateOrUpdate200Response
    | MeshVolumeCreateOrUpdate201Response
    | MeshVolumeCreateOrUpdate202Response
    | MeshVolumeCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Volume resource with the given name. The information include the description and other properties of the Volume. */
  get(
    options?: MeshVolumeGetParameters
  ): Promise<MeshVolumeGet200Response | MeshVolumeGetdefaultResponse>;
  /** Deletes the Volume resource identified by the name. */
  delete(
    options?: MeshVolumeDeleteParameters
  ): Promise<
    | MeshVolumeDelete200Response
    | MeshVolumeDelete202Response
    | MeshVolumeDelete204Response
    | MeshVolumeDeletedefaultResponse
  >;
}

export interface MeshVolumeList {
  /** Gets the information about all volume resources in a given resource group. The information include the description and other properties of the Volume. */
  get(
    options?: MeshVolumeListParameters
  ): Promise<MeshVolumeList200Response | MeshVolumeListdefaultResponse>;
}

export interface MeshNetworkCreateOrUpdate {
  /** Creates a Network resource with the specified name, description and properties. If Network resource with the same name exists, then it is updated with the specified description and properties. Network resource provides connectivity between application services. */
  put(
    options: MeshNetworkCreateOrUpdateParameters
  ): Promise<
    | MeshNetworkCreateOrUpdate200Response
    | MeshNetworkCreateOrUpdate201Response
    | MeshNetworkCreateOrUpdate202Response
    | MeshNetworkCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Network resource with the given name. The information include the description and other properties of the Network. */
  get(
    options?: MeshNetworkGetParameters
  ): Promise<MeshNetworkGet200Response | MeshNetworkGetdefaultResponse>;
  /** Deletes the Network resource identified by the name. */
  delete(
    options?: MeshNetworkDeleteParameters
  ): Promise<
    | MeshNetworkDelete200Response
    | MeshNetworkDelete202Response
    | MeshNetworkDelete204Response
    | MeshNetworkDeletedefaultResponse
  >;
}

export interface MeshNetworkList {
  /** Gets the information about all network resources in a given resource group. The information include the description and other properties of the Network. */
  get(
    options?: MeshNetworkListParameters
  ): Promise<MeshNetworkList200Response | MeshNetworkListdefaultResponse>;
}

export interface MeshApplicationCreateOrUpdate {
  /** Creates a Application resource with the specified name, description and properties. If Application resource with the same name exists, then it is updated with the specified description and properties. */
  put(
    options: MeshApplicationCreateOrUpdateParameters
  ): Promise<
    | MeshApplicationCreateOrUpdate200Response
    | MeshApplicationCreateOrUpdate201Response
    | MeshApplicationCreateOrUpdate202Response
    | MeshApplicationCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Application resource with the given name. The information include the description and other properties of the Application. */
  get(
    options?: MeshApplicationGetParameters
  ): Promise<MeshApplicationGet200Response | MeshApplicationGetdefaultResponse>;
  /** Deletes the Application resource identified by the name. */
  delete(
    options?: MeshApplicationDeleteParameters
  ): Promise<
    | MeshApplicationDelete200Response
    | MeshApplicationDelete202Response
    | MeshApplicationDelete204Response
    | MeshApplicationDeletedefaultResponse
  >;
}

export interface MeshApplicationList {
  /** Gets the information about all application resources in a given resource group. The information include the description and other properties of the Application. */
  get(
    options?: MeshApplicationListParameters
  ): Promise<MeshApplicationList200Response | MeshApplicationListdefaultResponse>;
}

export interface MeshApplicationGetUpgradeProgress {
  /** Gets the upgrade progress information about the Application resource with the given name. The information include percentage of completion and other upgrade state information of the Application resource. */
  get(
    options?: MeshApplicationGetUpgradeProgressParameters
  ): Promise<
    MeshApplicationGetUpgradeProgress200Response | MeshApplicationGetUpgradeProgressdefaultResponse
  >;
}

export interface MeshServiceGet {
  /** Gets the information about the Service resource with the given name. The information include the description and other properties of the Service. */
  get(
    options?: MeshServiceGetParameters
  ): Promise<MeshServiceGet200Response | MeshServiceGetdefaultResponse>;
}

export interface MeshServiceList {
  /** Gets the information about all services of an application resource. The information include the description and other properties of the Service. */
  get(
    options?: MeshServiceListParameters
  ): Promise<MeshServiceList200Response | MeshServiceListdefaultResponse>;
}

export interface MeshCodePackageGetContainerLogs {
  /** Gets the logs for the container of the specified code package of the service replica. */
  get(
    options?: MeshCodePackageGetContainerLogsParameters
  ): Promise<
    MeshCodePackageGetContainerLogs200Response | MeshCodePackageGetContainerLogsdefaultResponse
  >;
}

export interface MeshServiceReplicaGet {
  /** Gets the information about the service replica with the given name. The information include the description and other properties of the service replica. */
  get(
    options?: MeshServiceReplicaGetParameters
  ): Promise<MeshServiceReplicaGet200Response | MeshServiceReplicaGetdefaultResponse>;
}

export interface MeshServiceReplicaList {
  /** Gets the information about all replicas of a service. The information include the description and other properties of the service replica. */
  get(
    options?: MeshServiceReplicaListParameters
  ): Promise<MeshServiceReplicaList200Response | MeshServiceReplicaListdefaultResponse>;
}

export interface MeshGatewayCreateOrUpdate {
  /** Creates a Gateway resource with the specified name, description and properties. If Gateway resource with the same name exists, then it is updated with the specified description and properties. Use Gateway resource to provide public connectivity to application services. */
  put(
    options: MeshGatewayCreateOrUpdateParameters
  ): Promise<
    | MeshGatewayCreateOrUpdate200Response
    | MeshGatewayCreateOrUpdate201Response
    | MeshGatewayCreateOrUpdate202Response
    | MeshGatewayCreateOrUpdatedefaultResponse
  >;
  /** Gets the information about the Gateway resource with the given name. The information include the description and other properties of the Gateway. */
  get(
    options?: MeshGatewayGetParameters
  ): Promise<MeshGatewayGet200Response | MeshGatewayGetdefaultResponse>;
  /** Deletes the Gateway resource identified by the name. */
  delete(
    options?: MeshGatewayDeleteParameters
  ): Promise<
    | MeshGatewayDelete200Response
    | MeshGatewayDelete202Response
    | MeshGatewayDelete204Response
    | MeshGatewayDeletedefaultResponse
  >;
}

export interface MeshGatewayList {
  /** Gets the information about all gateway resources in a given resource group. The information include the description and other properties of the Gateway. */
  get(
    options?: MeshGatewayListParameters
  ): Promise<MeshGatewayList200Response | MeshGatewayListdefaultResponse>;
}

export interface Routes {
  /** Resource for '/$/GetClusterManifest' has methods for the following verbs: get */
  (path: "/$/GetClusterManifest"): GetClusterManifest;
  /** Resource for '/$/GetClusterHealth' has methods for the following verbs: get, post */
  (path: "/$/GetClusterHealth"): GetClusterHealth;
  /** Resource for '/$/GetClusterHealthChunk' has methods for the following verbs: get, post */
  (path: "/$/GetClusterHealthChunk"): GetClusterHealthChunk;
  /** Resource for '/$/ReportClusterHealth' has methods for the following verbs: post */
  (path: "/$/ReportClusterHealth"): ReportClusterHealth;
  /** Resource for '/$/GetProvisionedCodeVersions' has methods for the following verbs: get */
  (path: "/$/GetProvisionedCodeVersions"): GetProvisionedFabricCodeVersionInfoList;
  /** Resource for '/$/GetProvisionedConfigVersions' has methods for the following verbs: get */
  (path: "/$/GetProvisionedConfigVersions"): GetProvisionedFabricConfigVersionInfoList;
  /** Resource for '/$/GetUpgradeProgress' has methods for the following verbs: get */
  (path: "/$/GetUpgradeProgress"): GetClusterUpgradeProgress;
  /** Resource for '/$/GetClusterConfiguration' has methods for the following verbs: get */
  (path: "/$/GetClusterConfiguration"): GetClusterConfiguration;
  /** Resource for '/$/GetClusterConfigurationUpgradeStatus' has methods for the following verbs: get */
  (path: "/$/GetClusterConfigurationUpgradeStatus"): GetClusterConfigurationUpgradeStatus;
  /** Resource for '/$/GetUpgradeOrchestrationServiceState' has methods for the following verbs: get */
  (path: "/$/GetUpgradeOrchestrationServiceState"): GetUpgradeOrchestrationServiceState;
  /** Resource for '/$/SetUpgradeOrchestrationServiceState' has methods for the following verbs: post */
  (path: "/$/SetUpgradeOrchestrationServiceState"): SetUpgradeOrchestrationServiceState;
  /** Resource for '/$/Provision' has methods for the following verbs: post */
  (path: "/$/Provision"): ProvisionCluster;
  /** Resource for '/$/Unprovision' has methods for the following verbs: post */
  (path: "/$/Unprovision"): UnprovisionCluster;
  /** Resource for '/$/RollbackUpgrade' has methods for the following verbs: post */
  (path: "/$/RollbackUpgrade"): RollbackClusterUpgrade;
  /** Resource for '/$/MoveToNextUpgradeDomain' has methods for the following verbs: post */
  (path: "/$/MoveToNextUpgradeDomain"): ResumeClusterUpgrade;
  /** Resource for '/$/Upgrade' has methods for the following verbs: post */
  (path: "/$/Upgrade"): StartClusterUpgrade;
  /** Resource for '/$/StartClusterConfigurationUpgrade' has methods for the following verbs: post */
  (path: "/$/StartClusterConfigurationUpgrade"): StartClusterConfigurationUpgrade;
  /** Resource for '/$/UpdateUpgrade' has methods for the following verbs: post */
  (path: "/$/UpdateUpgrade"): UpdateClusterUpgrade;
  /** Resource for '/$/GetAadMetadata' has methods for the following verbs: get */
  (path: "/$/GetAadMetadata"): GetAadMetadata;
  /** Resource for '/$/GetClusterVersion' has methods for the following verbs: get */
  (path: "/$/GetClusterVersion"): GetClusterVersion;
  /** Resource for '/$/GetLoadInformation' has methods for the following verbs: get */
  (path: "/$/GetLoadInformation"): GetClusterLoad;
  /** Resource for '/$/ToggleVerboseServicePlacementHealthReporting' has methods for the following verbs: post */
  (
    path: "/$/ToggleVerboseServicePlacementHealthReporting"
  ): ToggleVerboseServicePlacementHealthReporting;
  /** Resource for '/Nodes' has methods for the following verbs: get */
  (path: "/Nodes"): GetNodeInfoList;
  /** Resource for '/Nodes/\{nodeName\}' has methods for the following verbs: get */
  (path: "/Nodes/{nodeName}", nodeName: string): GetNodeInfo;
  /** Resource for '/Nodes/\{nodeName\}/$/GetHealth' has methods for the following verbs: get, post */
  (path: "/Nodes/{nodeName}/$/GetHealth", nodeName: string): GetNodeHealth;
  /** Resource for '/Nodes/\{nodeName\}/$/ReportHealth' has methods for the following verbs: post */
  (path: "/Nodes/{nodeName}/$/ReportHealth", nodeName: string): ReportNodeHealth;
  /** Resource for '/Nodes/\{nodeName\}/$/GetLoadInformation' has methods for the following verbs: get */
  (path: "/Nodes/{nodeName}/$/GetLoadInformation", nodeName: string): GetNodeLoadInfo;
  /** Resource for '/Nodes/\{nodeName\}/$/Deactivate' has methods for the following verbs: post */
  (path: "/Nodes/{nodeName}/$/Deactivate", nodeName: string): DisableNode;
  /** Resource for '/Nodes/\{nodeName\}/$/Activate' has methods for the following verbs: post */
  (path: "/Nodes/{nodeName}/$/Activate", nodeName: string): EnableNode;
  /** Resource for '/Nodes/\{nodeName\}/$/RemoveNodeState' has methods for the following verbs: post */
  (path: "/Nodes/{nodeName}/$/RemoveNodeState", nodeName: string): RemoveNodeState;
  /** Resource for '/Nodes/\{nodeName\}/$/Restart' has methods for the following verbs: post */
  (path: "/Nodes/{nodeName}/$/Restart", nodeName: string): RestartNode;
  /** Resource for '/Nodes/\{nodeName\}/$/RemoveConfigurationOverrides' has methods for the following verbs: delete */
  (
    path: "/Nodes/{nodeName}/$/RemoveConfigurationOverrides",
    nodeName: string
  ): RemoveConfigurationOverrides;
  /** Resource for '/Nodes/\{nodeName\}/$/GetConfigurationOverrides' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetConfigurationOverrides",
    nodeName: string
  ): GetConfigurationOverrides;
  /** Resource for '/Nodes/\{nodeName\}/$/AddConfigurationParameterOverrides' has methods for the following verbs: post */
  (
    path: "/Nodes/{nodeName}/$/AddConfigurationParameterOverrides",
    nodeName: string
  ): AddConfigurationParameterOverrides;
  /** Resource for '/Nodes/\{nodeName\}/$/RemoveNodeTags' has methods for the following verbs: post */
  (path: "/Nodes/{nodeName}/$/RemoveNodeTags", nodeName: string): RemoveNodeTags;
  /** Resource for '/Nodes/\{nodeName\}/$/AddNodeTags' has methods for the following verbs: post */
  (path: "/Nodes/{nodeName}/$/AddNodeTags", nodeName: string): AddNodeTags;
  /** Resource for '/ApplicationTypes' has methods for the following verbs: get */
  (path: "/ApplicationTypes"): GetApplicationTypeInfoList;
  /** Resource for '/ApplicationTypes/\{applicationTypeName\}' has methods for the following verbs: get */
  (
    path: "/ApplicationTypes/{applicationTypeName}",
    applicationTypeName: string
  ): GetApplicationTypeInfoListByName;
  /** Resource for '/ApplicationTypes/$/Provision' has methods for the following verbs: post */
  (path: "/ApplicationTypes/$/Provision"): ProvisionApplicationType;
  /** Resource for '/ApplicationTypes/\{applicationTypeName\}/$/Unprovision' has methods for the following verbs: post */
  (
    path: "/ApplicationTypes/{applicationTypeName}/$/Unprovision",
    applicationTypeName: string
  ): UnprovisionApplicationType;
  /** Resource for '/ApplicationTypes/\{applicationTypeName\}/$/GetServiceTypes' has methods for the following verbs: get */
  (
    path: "/ApplicationTypes/{applicationTypeName}/$/GetServiceTypes",
    applicationTypeName: string
  ): GetServiceTypeInfoList;
  /** Resource for '/ApplicationTypes/\{applicationTypeName\}/$/GetServiceTypes/\{serviceTypeName\}' has methods for the following verbs: get */
  (
    path: "/ApplicationTypes/{applicationTypeName}/$/GetServiceTypes/{serviceTypeName}",
    applicationTypeName: string,
    serviceTypeName: string
  ): GetServiceTypeInfoByName;
  /** Resource for '/ApplicationTypes/\{applicationTypeName\}/$/GetServiceManifest' has methods for the following verbs: get */
  (
    path: "/ApplicationTypes/{applicationTypeName}/$/GetServiceManifest",
    applicationTypeName: string
  ): GetServiceManifest;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetServiceTypes' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServiceTypes",
    nodeName: string,
    applicationId: string
  ): GetDeployedServiceTypeInfoList;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetServiceTypes/\{serviceTypeName\}' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServiceTypes/{serviceTypeName}",
    nodeName: string,
    applicationId: string,
    serviceTypeName: string
  ): GetDeployedServiceTypeInfoByName;
  /** Resource for '/Applications/$/Create' has methods for the following verbs: post */
  (path: "/Applications/$/Create"): CreateApplication;
  /** Resource for '/Applications/\{applicationId\}/$/Delete' has methods for the following verbs: post */
  (path: "/Applications/{applicationId}/$/Delete", applicationId: string): DeleteApplication;
  /** Resource for '/Applications/\{applicationId\}/$/GetLoadInformation' has methods for the following verbs: get */
  (
    path: "/Applications/{applicationId}/$/GetLoadInformation",
    applicationId: string
  ): GetApplicationLoadInfo;
  /** Resource for '/Applications' has methods for the following verbs: get */
  (path: "/Applications"): GetApplicationInfoList;
  /** Resource for '/Applications/\{applicationId\}' has methods for the following verbs: get */
  (path: "/Applications/{applicationId}", applicationId: string): GetApplicationInfo;
  /** Resource for '/Applications/\{applicationId\}/$/GetHealth' has methods for the following verbs: get, post */
  (path: "/Applications/{applicationId}/$/GetHealth", applicationId: string): GetApplicationHealth;
  /** Resource for '/Applications/\{applicationId\}/$/ReportHealth' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/ReportHealth",
    applicationId: string
  ): ReportApplicationHealth;
  /** Resource for '/Applications/\{applicationId\}/$/Upgrade' has methods for the following verbs: post */
  (path: "/Applications/{applicationId}/$/Upgrade", applicationId: string): StartApplicationUpgrade;
  /** Resource for '/Applications/\{applicationId\}/$/GetUpgradeProgress' has methods for the following verbs: get */
  (
    path: "/Applications/{applicationId}/$/GetUpgradeProgress",
    applicationId: string
  ): GetApplicationUpgrade;
  /** Resource for '/Applications/\{applicationId\}/$/UpdateUpgrade' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/UpdateUpgrade",
    applicationId: string
  ): UpdateApplicationUpgrade;
  /** Resource for '/Applications/\{applicationId\}/$/Update' has methods for the following verbs: post */
  (path: "/Applications/{applicationId}/$/Update", applicationId: string): UpdateApplication;
  /** Resource for '/Applications/\{applicationId\}/$/MoveToNextUpgradeDomain' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/MoveToNextUpgradeDomain",
    applicationId: string
  ): ResumeApplicationUpgrade;
  /** Resource for '/Applications/\{applicationId\}/$/RollbackUpgrade' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/RollbackUpgrade",
    applicationId: string
  ): RollbackApplicationUpgrade;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications' has methods for the following verbs: get */
  (path: "/Nodes/{nodeName}/$/GetApplications", nodeName: string): GetDeployedApplicationInfoList;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}",
    nodeName: string,
    applicationId: string
  ): GetDeployedApplicationInfo;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetHealth' has methods for the following verbs: get, post */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetHealth",
    nodeName: string,
    applicationId: string
  ): GetDeployedApplicationHealth;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/ReportHealth' has methods for the following verbs: post */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/ReportHealth",
    nodeName: string,
    applicationId: string
  ): ReportDeployedApplicationHealth;
  /** Resource for '/ApplicationTypes/\{applicationTypeName\}/$/GetApplicationManifest' has methods for the following verbs: get */
  (
    path: "/ApplicationTypes/{applicationTypeName}/$/GetApplicationManifest",
    applicationTypeName: string
  ): GetApplicationManifest;
  /** Resource for '/Applications/\{applicationId\}/$/GetServices' has methods for the following verbs: get */
  (path: "/Applications/{applicationId}/$/GetServices", applicationId: string): GetServiceInfoList;
  /** Resource for '/Applications/\{applicationId\}/$/GetServices/\{serviceId\}' has methods for the following verbs: get */
  (
    path: "/Applications/{applicationId}/$/GetServices/{serviceId}",
    applicationId: string,
    serviceId: string
  ): GetServiceInfo;
  /** Resource for '/Services/\{serviceId\}/$/GetApplicationName' has methods for the following verbs: get */
  (path: "/Services/{serviceId}/$/GetApplicationName", serviceId: string): GetApplicationNameInfo;
  /** Resource for '/Applications/\{applicationId\}/$/GetServices/$/Create' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/GetServices/$/Create",
    applicationId: string
  ): CreateService;
  /** Resource for '/Applications/\{applicationId\}/$/GetServices/$/CreateFromTemplate' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/GetServices/$/CreateFromTemplate",
    applicationId: string
  ): CreateServiceFromTemplate;
  /** Resource for '/Services/\{serviceId\}/$/Delete' has methods for the following verbs: post */
  (path: "/Services/{serviceId}/$/Delete", serviceId: string): DeleteService;
  /** Resource for '/Services/\{serviceId\}/$/Update' has methods for the following verbs: post */
  (path: "/Services/{serviceId}/$/Update", serviceId: string): UpdateService;
  /** Resource for '/Services/\{serviceId\}/$/GetDescription' has methods for the following verbs: get */
  (path: "/Services/{serviceId}/$/GetDescription", serviceId: string): GetServiceDescription;
  /** Resource for '/Services/\{serviceId\}/$/GetHealth' has methods for the following verbs: get, post */
  (path: "/Services/{serviceId}/$/GetHealth", serviceId: string): GetServiceHealth;
  /** Resource for '/Services/\{serviceId\}/$/ReportHealth' has methods for the following verbs: post */
  (path: "/Services/{serviceId}/$/ReportHealth", serviceId: string): ReportServiceHealth;
  /** Resource for '/Services/\{serviceId\}/$/ResolvePartition' has methods for the following verbs: get */
  (path: "/Services/{serviceId}/$/ResolvePartition", serviceId: string): ResolveService;
  /** Resource for '/Services/\{serviceId\}/$/GetUnplacedReplicaInformation' has methods for the following verbs: get */
  (
    path: "/Services/{serviceId}/$/GetUnplacedReplicaInformation",
    serviceId: string
  ): GetUnplacedReplicaInformation;
  /** Resource for '/$/GetLoadedPartitionInfoList' has methods for the following verbs: get */
  (path: "/$/GetLoadedPartitionInfoList"): GetLoadedPartitionInfoList;
  /** Resource for '/Services/\{serviceId\}/$/GetPartitions' has methods for the following verbs: get */
  (path: "/Services/{serviceId}/$/GetPartitions", serviceId: string): GetPartitionInfoList;
  /** Resource for '/Partitions/\{partitionId\}' has methods for the following verbs: get */
  (path: "/Partitions/{partitionId}", partitionId: string): GetPartitionInfo;
  /** Resource for '/Partitions/\{partitionId\}/$/GetServiceName' has methods for the following verbs: get */
  (path: "/Partitions/{partitionId}/$/GetServiceName", partitionId: string): GetServiceNameInfo;
  /** Resource for '/Partitions/\{partitionId\}/$/GetHealth' has methods for the following verbs: get, post */
  (path: "/Partitions/{partitionId}/$/GetHealth", partitionId: string): GetPartitionHealth;
  /** Resource for '/Partitions/\{partitionId\}/$/ReportHealth' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/ReportHealth", partitionId: string): ReportPartitionHealth;
  /** Resource for '/Partitions/\{partitionId\}/$/GetLoadInformation' has methods for the following verbs: get */
  (
    path: "/Partitions/{partitionId}/$/GetLoadInformation",
    partitionId: string
  ): GetPartitionLoadInformation;
  /** Resource for '/Partitions/\{partitionId\}/$/ResetLoad' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/ResetLoad", partitionId: string): ResetPartitionLoad;
  /** Resource for '/Partitions/\{partitionId\}/$/Recover' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/Recover", partitionId: string): RecoverPartition;
  /** Resource for '/Services/$/\{serviceId\}/$/GetPartitions/$/Recover' has methods for the following verbs: post */
  (
    path: "/Services/$/{serviceId}/$/GetPartitions/$/Recover",
    serviceId: string
  ): RecoverServicePartitions;
  /** Resource for '/$/RecoverSystemPartitions' has methods for the following verbs: post */
  (path: "/$/RecoverSystemPartitions"): RecoverSystemPartitions;
  /** Resource for '/$/RecoverAllPartitions' has methods for the following verbs: post */
  (path: "/$/RecoverAllPartitions"): RecoverAllPartitions;
  /** Resource for '/Partitions/\{partitionId\}/$/MovePrimaryReplica' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/MovePrimaryReplica", partitionId: string): MovePrimaryReplica;
  /** Resource for '/Partitions/\{partitionId\}/$/MoveSecondaryReplica' has methods for the following verbs: post */
  (
    path: "/Partitions/{partitionId}/$/MoveSecondaryReplica",
    partitionId: string
  ): MoveSecondaryReplica;
  /** Resource for '/$/UpdatePartitionLoad' has methods for the following verbs: post */
  (path: "/$/UpdatePartitionLoad"): UpdatePartitionLoad;
  /** Resource for '/Services/\{serviceId\}/$/GetPartitions/\{partitionId\}/$/MoveInstance' has methods for the following verbs: post */
  (
    path: "/Services/{serviceId}/$/GetPartitions/{partitionId}/$/MoveInstance",
    serviceId: string,
    partitionId: string
  ): MoveInstance;
  /** Resource for '/Services/\{serviceId\}/$/GetPartitions/\{partitionId\}/$/MoveAuxiliaryReplica' has methods for the following verbs: post */
  (
    path: "/Services/{serviceId}/$/GetPartitions/{partitionId}/$/MoveAuxiliaryReplica",
    serviceId: string,
    partitionId: string
  ): MoveAuxiliaryReplica;
  /** Resource for '/$/CreateRepairTask' has methods for the following verbs: post */
  (path: "/$/CreateRepairTask"): CreateRepairTask;
  /** Resource for '/$/CancelRepairTask' has methods for the following verbs: post */
  (path: "/$/CancelRepairTask"): CancelRepairTask;
  /** Resource for '/$/DeleteRepairTask' has methods for the following verbs: post */
  (path: "/$/DeleteRepairTask"): DeleteRepairTask;
  /** Resource for '/$/GetRepairTaskList' has methods for the following verbs: get */
  (path: "/$/GetRepairTaskList"): GetRepairTaskList;
  /** Resource for '/$/ForceApproveRepairTask' has methods for the following verbs: post */
  (path: "/$/ForceApproveRepairTask"): ForceApproveRepairTask;
  /** Resource for '/$/UpdateRepairTaskHealthPolicy' has methods for the following verbs: post */
  (path: "/$/UpdateRepairTaskHealthPolicy"): UpdateRepairTaskHealthPolicy;
  /** Resource for '/$/UpdateRepairExecutionState' has methods for the following verbs: post */
  (path: "/$/UpdateRepairExecutionState"): UpdateRepairExecutionState;
  /** Resource for '/Partitions/\{partitionId\}/$/GetReplicas' has methods for the following verbs: get */
  (path: "/Partitions/{partitionId}/$/GetReplicas", partitionId: string): GetReplicaInfoList;
  /** Resource for '/Partitions/\{partitionId\}/$/GetReplicas/\{replicaId\}' has methods for the following verbs: get */
  (
    path: "/Partitions/{partitionId}/$/GetReplicas/{replicaId}",
    partitionId: string,
    replicaId: string
  ): GetReplicaInfo;
  /** Resource for '/Partitions/\{partitionId\}/$/GetReplicas/\{replicaId\}/$/GetHealth' has methods for the following verbs: get, post */
  (
    path: "/Partitions/{partitionId}/$/GetReplicas/{replicaId}/$/GetHealth",
    partitionId: string,
    replicaId: string
  ): GetReplicaHealth;
  /** Resource for '/Partitions/\{partitionId\}/$/GetReplicas/\{replicaId\}/$/ReportHealth' has methods for the following verbs: post */
  (
    path: "/Partitions/{partitionId}/$/GetReplicas/{replicaId}/$/ReportHealth",
    partitionId: string,
    replicaId: string
  ): ReportReplicaHealth;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetReplicas' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetReplicas",
    nodeName: string,
    applicationId: string
  ): GetDeployedServiceReplicaInfoList;
  /** Resource for '/Nodes/\{nodeName\}/$/GetPartitions/\{partitionId\}/$/GetReplicas/\{replicaId\}/$/GetDetail' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas/{replicaId}/$/GetDetail",
    nodeName: string,
    partitionId: string,
    replicaId: string
  ): GetDeployedServiceReplicaDetailInfo;
  /** Resource for '/Nodes/\{nodeName\}/$/GetPartitions/\{partitionId\}/$/GetReplicas' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas",
    nodeName: string,
    partitionId: string
  ): GetDeployedServiceReplicaDetailInfoByPartitionId;
  /** Resource for '/Nodes/\{nodeName\}/$/GetPartitions/\{partitionId\}/$/GetReplicas/\{replicaId\}/$/Restart' has methods for the following verbs: post */
  (
    path: "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas/{replicaId}/$/Restart",
    nodeName: string,
    partitionId: string,
    replicaId: string
  ): RestartReplica;
  /** Resource for '/Nodes/\{nodeName\}/$/GetPartitions/\{partitionId\}/$/GetReplicas/\{replicaId\}/$/Delete' has methods for the following verbs: post */
  (
    path: "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas/{replicaId}/$/Delete",
    nodeName: string,
    partitionId: string,
    replicaId: string
  ): RemoveReplica;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetServicePackages' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages",
    nodeName: string,
    applicationId: string
  ): GetDeployedServicePackageInfoList;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetServicePackages/\{servicePackageName\}' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}",
    nodeName: string,
    applicationId: string,
    servicePackageName: string
  ): GetDeployedServicePackageInfoListByName;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetServicePackages/\{servicePackageName\}/$/GetHealth' has methods for the following verbs: get, post */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}/$/GetHealth",
    nodeName: string,
    applicationId: string,
    servicePackageName: string
  ): GetDeployedServicePackageHealth;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetServicePackages/\{servicePackageName\}/$/ReportHealth' has methods for the following verbs: post */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}/$/ReportHealth",
    nodeName: string,
    applicationId: string,
    servicePackageName: string
  ): ReportDeployedServicePackageHealth;
  /** Resource for '/Nodes/\{nodeName\}/$/DeployServicePackage' has methods for the following verbs: post */
  (path: "/Nodes/{nodeName}/$/DeployServicePackage", nodeName: string): DeployServicePackageToNode;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetCodePackages' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages",
    nodeName: string,
    applicationId: string
  ): GetDeployedCodePackageInfoList;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetCodePackages/$/Restart' has methods for the following verbs: post */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages/$/Restart",
    nodeName: string,
    applicationId: string
  ): RestartDeployedCodePackage;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetCodePackages/$/ContainerLogs' has methods for the following verbs: get */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages/$/ContainerLogs",
    nodeName: string,
    applicationId: string
  ): GetContainerLogsDeployedOnNode;
  /** Resource for '/Nodes/\{nodeName\}/$/GetApplications/\{applicationId\}/$/GetCodePackages/$/ContainerApi' has methods for the following verbs: post */
  (
    path: "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages/$/ContainerApi",
    nodeName: string,
    applicationId: string
  ): InvokeContainerApi;
  /** Resource for '/ComposeDeployments/$/Create' has methods for the following verbs: put */
  (path: "/ComposeDeployments/$/Create"): CreateComposeDeployment;
  /** Resource for '/ComposeDeployments/\{deploymentName\}' has methods for the following verbs: get */
  (
    path: "/ComposeDeployments/{deploymentName}",
    deploymentName: string
  ): GetComposeDeploymentStatus;
  /** Resource for '/ComposeDeployments' has methods for the following verbs: get */
  (path: "/ComposeDeployments"): GetComposeDeploymentStatusList;
  /** Resource for '/ComposeDeployments/\{deploymentName\}/$/GetUpgradeProgress' has methods for the following verbs: get */
  (
    path: "/ComposeDeployments/{deploymentName}/$/GetUpgradeProgress",
    deploymentName: string
  ): GetComposeDeploymentUpgradeProgress;
  /** Resource for '/ComposeDeployments/\{deploymentName\}/$/Delete' has methods for the following verbs: post */
  (
    path: "/ComposeDeployments/{deploymentName}/$/Delete",
    deploymentName: string
  ): RemoveComposeDeployment;
  /** Resource for '/ComposeDeployments/\{deploymentName\}/$/Upgrade' has methods for the following verbs: post */
  (
    path: "/ComposeDeployments/{deploymentName}/$/Upgrade",
    deploymentName: string
  ): StartComposeDeploymentUpgrade;
  /** Resource for '/ComposeDeployments/\{deploymentName\}/$/RollbackUpgrade' has methods for the following verbs: post */
  (
    path: "/ComposeDeployments/{deploymentName}/$/RollbackUpgrade",
    deploymentName: string
  ): StartRollbackComposeDeploymentUpgrade;
  /** Resource for '/Tools/Chaos' has methods for the following verbs: get */
  (path: "/Tools/Chaos"): GetChaos;
  /** Resource for '/Tools/Chaos/$/Start' has methods for the following verbs: post */
  (path: "/Tools/Chaos/$/Start"): StartChaos;
  /** Resource for '/Tools/Chaos/$/Stop' has methods for the following verbs: post */
  (path: "/Tools/Chaos/$/Stop"): StopChaos;
  /** Resource for '/Tools/Chaos/Events' has methods for the following verbs: get */
  (path: "/Tools/Chaos/Events"): GetChaosEvents;
  /** Resource for '/Tools/Chaos/Schedule' has methods for the following verbs: get, post */
  (path: "/Tools/Chaos/Schedule"): GetChaosSchedule;
  /** Resource for '/ImageStore/\{contentPath\}' has methods for the following verbs: put, get, delete */
  (path: "/ImageStore/{contentPath}", contentPath: string): UploadFile;
  /** Resource for '/ImageStore' has methods for the following verbs: get */
  (path: "/ImageStore"): GetImageStoreRootContent;
  /** Resource for '/ImageStore/$/Copy' has methods for the following verbs: post */
  (path: "/ImageStore/$/Copy"): CopyImageStoreContent;
  /** Resource for '/ImageStore/$/DeleteUploadSession' has methods for the following verbs: delete */
  (path: "/ImageStore/$/DeleteUploadSession"): DeleteImageStoreUploadSession;
  /** Resource for '/ImageStore/$/CommitUploadSession' has methods for the following verbs: post */
  (path: "/ImageStore/$/CommitUploadSession"): CommitImageStoreUploadSession;
  /** Resource for '/ImageStore/$/GetUploadSession' has methods for the following verbs: get */
  (path: "/ImageStore/$/GetUploadSession"): GetImageStoreUploadSessionById;
  /** Resource for '/ImageStore/\{contentPath\}/$/GetUploadSession' has methods for the following verbs: get */
  (
    path: "/ImageStore/{contentPath}/$/GetUploadSession",
    contentPath: string
  ): GetImageStoreUploadSessionByPath;
  /** Resource for '/ImageStore/\{contentPath\}/$/UploadChunk' has methods for the following verbs: put */
  (path: "/ImageStore/{contentPath}/$/UploadChunk", contentPath: string): UploadFileChunk;
  /** Resource for '/ImageStore/$/FolderSize' has methods for the following verbs: get */
  (path: "/ImageStore/$/FolderSize"): GetImageStoreRootFolderSize;
  /** Resource for '/ImageStore/\{contentPath\}/$/FolderSize' has methods for the following verbs: get */
  (path: "/ImageStore/{contentPath}/$/FolderSize", contentPath: string): GetImageStoreFolderSize;
  /** Resource for '/ImageStore/$/Info' has methods for the following verbs: get */
  (path: "/ImageStore/$/Info"): GetImageStoreInfo;
  /** Resource for '/$/InvokeInfrastructureCommand' has methods for the following verbs: post */
  (path: "/$/InvokeInfrastructureCommand"): InvokeInfrastructureCommand;
  /** Resource for '/$/InvokeInfrastructureQuery' has methods for the following verbs: get */
  (path: "/$/InvokeInfrastructureQuery"): InvokeInfrastructureQuery;
  /** Resource for '/Faults/Services/\{serviceId\}/$/GetPartitions/\{partitionId\}/$/StartDataLoss' has methods for the following verbs: post */
  (
    path: "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/StartDataLoss",
    serviceId: string,
    partitionId: string
  ): StartDataLoss;
  /** Resource for '/Faults/Services/\{serviceId\}/$/GetPartitions/\{partitionId\}/$/GetDataLossProgress' has methods for the following verbs: get */
  (
    path: "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/GetDataLossProgress",
    serviceId: string,
    partitionId: string
  ): GetDataLossProgress;
  /** Resource for '/Faults/Services/\{serviceId\}/$/GetPartitions/\{partitionId\}/$/StartQuorumLoss' has methods for the following verbs: post */
  (
    path: "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/StartQuorumLoss",
    serviceId: string,
    partitionId: string
  ): StartQuorumLoss;
  /** Resource for '/Faults/Services/\{serviceId\}/$/GetPartitions/\{partitionId\}/$/GetQuorumLossProgress' has methods for the following verbs: get */
  (
    path: "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/GetQuorumLossProgress",
    serviceId: string,
    partitionId: string
  ): GetQuorumLossProgress;
  /** Resource for '/Faults/Services/\{serviceId\}/$/GetPartitions/\{partitionId\}/$/StartRestart' has methods for the following verbs: post */
  (
    path: "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/StartRestart",
    serviceId: string,
    partitionId: string
  ): StartPartitionRestart;
  /** Resource for '/Faults/Services/\{serviceId\}/$/GetPartitions/\{partitionId\}/$/GetRestartProgress' has methods for the following verbs: get */
  (
    path: "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/GetRestartProgress",
    serviceId: string,
    partitionId: string
  ): GetPartitionRestartProgress;
  /** Resource for '/Faults/Nodes/\{nodeName\}/$/StartTransition/' has methods for the following verbs: post */
  (path: "/Faults/Nodes/{nodeName}/$/StartTransition/", nodeName: string): StartNodeTransition;
  /** Resource for '/Faults/Nodes/\{nodeName\}/$/GetTransitionProgress' has methods for the following verbs: get */
  (
    path: "/Faults/Nodes/{nodeName}/$/GetTransitionProgress",
    nodeName: string
  ): GetNodeTransitionProgress;
  /** Resource for '/Faults/' has methods for the following verbs: get */
  (path: "/Faults/"): GetFaultOperationList;
  /** Resource for '/Faults/$/Cancel' has methods for the following verbs: post */
  (path: "/Faults/$/Cancel"): CancelOperation;
  /** Resource for '/BackupRestore/BackupPolicies/$/Create' has methods for the following verbs: post */
  (path: "/BackupRestore/BackupPolicies/$/Create"): CreateBackupPolicy;
  /** Resource for '/BackupRestore/BackupPolicies/\{backupPolicyName\}/$/Delete' has methods for the following verbs: post */
  (
    path: "/BackupRestore/BackupPolicies/{backupPolicyName}/$/Delete",
    backupPolicyName: string
  ): DeleteBackupPolicy;
  /** Resource for '/BackupRestore/BackupPolicies' has methods for the following verbs: get */
  (path: "/BackupRestore/BackupPolicies"): GetBackupPolicyList;
  /** Resource for '/BackupRestore/BackupPolicies/\{backupPolicyName\}' has methods for the following verbs: get */
  (
    path: "/BackupRestore/BackupPolicies/{backupPolicyName}",
    backupPolicyName: string
  ): GetBackupPolicyByName;
  /** Resource for '/BackupRestore/BackupPolicies/\{backupPolicyName\}/$/GetBackupEnabledEntities' has methods for the following verbs: get */
  (
    path: "/BackupRestore/BackupPolicies/{backupPolicyName}/$/GetBackupEnabledEntities",
    backupPolicyName: string
  ): GetAllEntitiesBackedUpByPolicy;
  /** Resource for '/BackupRestore/BackupPolicies/\{backupPolicyName\}/$/Update' has methods for the following verbs: post */
  (
    path: "/BackupRestore/BackupPolicies/{backupPolicyName}/$/Update",
    backupPolicyName: string
  ): UpdateBackupPolicy;
  /** Resource for '/Applications/\{applicationId\}/$/EnableBackup' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/EnableBackup",
    applicationId: string
  ): EnableApplicationBackup;
  /** Resource for '/Applications/\{applicationId\}/$/DisableBackup' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/DisableBackup",
    applicationId: string
  ): DisableApplicationBackup;
  /** Resource for '/Applications/\{applicationId\}/$/GetBackupConfigurationInfo' has methods for the following verbs: get */
  (
    path: "/Applications/{applicationId}/$/GetBackupConfigurationInfo",
    applicationId: string
  ): GetApplicationBackupConfigurationInfo;
  /** Resource for '/Applications/\{applicationId\}/$/GetBackups' has methods for the following verbs: get */
  (
    path: "/Applications/{applicationId}/$/GetBackups",
    applicationId: string
  ): GetApplicationBackupList;
  /** Resource for '/Applications/\{applicationId\}/$/SuspendBackup' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/SuspendBackup",
    applicationId: string
  ): SuspendApplicationBackup;
  /** Resource for '/Applications/\{applicationId\}/$/ResumeBackup' has methods for the following verbs: post */
  (
    path: "/Applications/{applicationId}/$/ResumeBackup",
    applicationId: string
  ): ResumeApplicationBackup;
  /** Resource for '/Services/\{serviceId\}/$/EnableBackup' has methods for the following verbs: post */
  (path: "/Services/{serviceId}/$/EnableBackup", serviceId: string): EnableServiceBackup;
  /** Resource for '/Services/\{serviceId\}/$/DisableBackup' has methods for the following verbs: post */
  (path: "/Services/{serviceId}/$/DisableBackup", serviceId: string): DisableServiceBackup;
  /** Resource for '/Services/\{serviceId\}/$/GetBackupConfigurationInfo' has methods for the following verbs: get */
  (
    path: "/Services/{serviceId}/$/GetBackupConfigurationInfo",
    serviceId: string
  ): GetServiceBackupConfigurationInfo;
  /** Resource for '/Services/\{serviceId\}/$/GetBackups' has methods for the following verbs: get */
  (path: "/Services/{serviceId}/$/GetBackups", serviceId: string): GetServiceBackupList;
  /** Resource for '/Services/\{serviceId\}/$/SuspendBackup' has methods for the following verbs: post */
  (path: "/Services/{serviceId}/$/SuspendBackup", serviceId: string): SuspendServiceBackup;
  /** Resource for '/Services/\{serviceId\}/$/ResumeBackup' has methods for the following verbs: post */
  (path: "/Services/{serviceId}/$/ResumeBackup", serviceId: string): ResumeServiceBackup;
  /** Resource for '/Partitions/\{partitionId\}/$/EnableBackup' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/EnableBackup", partitionId: string): EnablePartitionBackup;
  /** Resource for '/Partitions/\{partitionId\}/$/DisableBackup' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/DisableBackup", partitionId: string): DisablePartitionBackup;
  /** Resource for '/Partitions/\{partitionId\}/$/GetBackupConfigurationInfo' has methods for the following verbs: get */
  (
    path: "/Partitions/{partitionId}/$/GetBackupConfigurationInfo",
    partitionId: string
  ): GetPartitionBackupConfigurationInfo;
  /** Resource for '/Partitions/\{partitionId\}/$/GetBackups' has methods for the following verbs: get */
  (path: "/Partitions/{partitionId}/$/GetBackups", partitionId: string): GetPartitionBackupList;
  /** Resource for '/Partitions/\{partitionId\}/$/SuspendBackup' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/SuspendBackup", partitionId: string): SuspendPartitionBackup;
  /** Resource for '/Partitions/\{partitionId\}/$/ResumeBackup' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/ResumeBackup", partitionId: string): ResumePartitionBackup;
  /** Resource for '/Partitions/\{partitionId\}/$/Backup' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/Backup", partitionId: string): BackupPartition;
  /** Resource for '/Partitions/\{partitionId\}/$/GetBackupProgress' has methods for the following verbs: get */
  (
    path: "/Partitions/{partitionId}/$/GetBackupProgress",
    partitionId: string
  ): GetPartitionBackupProgress;
  /** Resource for '/Partitions/\{partitionId\}/$/Restore' has methods for the following verbs: post */
  (path: "/Partitions/{partitionId}/$/Restore", partitionId: string): RestorePartition;
  /** Resource for '/Partitions/\{partitionId\}/$/GetRestoreProgress' has methods for the following verbs: get */
  (
    path: "/Partitions/{partitionId}/$/GetRestoreProgress",
    partitionId: string
  ): GetPartitionRestoreProgress;
  /** Resource for '/BackupRestore/$/GetBackups' has methods for the following verbs: post */
  (path: "/BackupRestore/$/GetBackups"): GetBackupsFromBackupLocation;
  /** Resource for '/Names/$/Create' has methods for the following verbs: post */
  (path: "/Names/$/Create"): CreateName;
  /** Resource for '/Names/\{nameId\}' has methods for the following verbs: get, delete */
  (path: "/Names/{nameId}", nameId: string): GetNameExistsInfo;
  /** Resource for '/Names/\{nameId\}/$/GetSubNames' has methods for the following verbs: get */
  (path: "/Names/{nameId}/$/GetSubNames", nameId: string): GetSubNameInfoList;
  /** Resource for '/Names/\{nameId\}/$/GetProperties' has methods for the following verbs: get */
  (path: "/Names/{nameId}/$/GetProperties", nameId: string): GetPropertyInfoList;
  /** Resource for '/Names/\{nameId\}/$/GetProperty' has methods for the following verbs: put, get, delete */
  (path: "/Names/{nameId}/$/GetProperty", nameId: string): PutProperty;
  /** Resource for '/Names/\{nameId\}/$/GetProperties/$/SubmitBatch' has methods for the following verbs: post */
  (path: "/Names/{nameId}/$/GetProperties/$/SubmitBatch", nameId: string): SubmitPropertyBatch;
  /** Resource for '/EventsStore/Cluster/Events' has methods for the following verbs: get */
  (path: "/EventsStore/Cluster/Events"): GetClusterEventList;
  /** Resource for '/EventsStore/Containers/Events' has methods for the following verbs: get */
  (path: "/EventsStore/Containers/Events"): GetContainersEventList;
  /** Resource for '/EventsStore/Nodes/\{nodeName\}/$/Events' has methods for the following verbs: get */
  (path: "/EventsStore/Nodes/{nodeName}/$/Events", nodeName: string): GetNodeEventList;
  /** Resource for '/EventsStore/Nodes/Events' has methods for the following verbs: get */
  (path: "/EventsStore/Nodes/Events"): GetNodesEventList;
  /** Resource for '/EventsStore/Applications/\{applicationId\}/$/Events' has methods for the following verbs: get */
  (
    path: "/EventsStore/Applications/{applicationId}/$/Events",
    applicationId: string
  ): GetApplicationEventList;
  /** Resource for '/EventsStore/Applications/Events' has methods for the following verbs: get */
  (path: "/EventsStore/Applications/Events"): GetApplicationsEventList;
  /** Resource for '/EventsStore/Services/\{serviceId\}/$/Events' has methods for the following verbs: get */
  (path: "/EventsStore/Services/{serviceId}/$/Events", serviceId: string): GetServiceEventList;
  /** Resource for '/EventsStore/Services/Events' has methods for the following verbs: get */
  (path: "/EventsStore/Services/Events"): GetServicesEventList;
  /** Resource for '/EventsStore/Partitions/\{partitionId\}/$/Events' has methods for the following verbs: get */
  (
    path: "/EventsStore/Partitions/{partitionId}/$/Events",
    partitionId: string
  ): GetPartitionEventList;
  /** Resource for '/EventsStore/Partitions/Events' has methods for the following verbs: get */
  (path: "/EventsStore/Partitions/Events"): GetPartitionsEventList;
  /** Resource for '/EventsStore/Partitions/\{partitionId\}/$/Replicas/\{replicaId\}/$/Events' has methods for the following verbs: get */
  (
    path: "/EventsStore/Partitions/{partitionId}/$/Replicas/{replicaId}/$/Events",
    partitionId: string,
    replicaId: string
  ): GetPartitionReplicaEventList;
  /** Resource for '/EventsStore/Partitions/\{partitionId\}/$/Replicas/Events' has methods for the following verbs: get */
  (
    path: "/EventsStore/Partitions/{partitionId}/$/Replicas/Events",
    partitionId: string
  ): GetPartitionReplicasEventList;
  /** Resource for '/EventsStore/CorrelatedEvents/\{eventInstanceId\}/$/Events' has methods for the following verbs: get */
  (
    path: "/EventsStore/CorrelatedEvents/{eventInstanceId}/$/Events",
    eventInstanceId: string
  ): GetCorrelatedEventList;
  /** Resource for '/Resources/Secrets/\{secretResourceName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/Resources/Secrets/{secretResourceName}",
    secretResourceName: string
  ): MeshSecretCreateOrUpdate;
  /** Resource for '/Resources/Secrets' has methods for the following verbs: get */
  (path: "/Resources/Secrets"): MeshSecretList;
  /** Resource for '/Resources/Secrets/\{secretResourceName\}/values/\{secretValueResourceName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}",
    secretResourceName: string,
    secretValueResourceName: string
  ): MeshSecretValueAddValue;
  /** Resource for '/Resources/Secrets/\{secretResourceName\}/values' has methods for the following verbs: get */
  (
    path: "/Resources/Secrets/{secretResourceName}/values",
    secretResourceName: string
  ): MeshSecretValueList;
  /** Resource for '/Resources/Secrets/\{secretResourceName\}/values/\{secretValueResourceName\}/list_value' has methods for the following verbs: post */
  (
    path: "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}/list_value",
    secretResourceName: string,
    secretValueResourceName: string
  ): MeshSecretValueShow;
  /** Resource for '/Resources/Volumes/\{volumeResourceName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/Resources/Volumes/{volumeResourceName}",
    volumeResourceName: string
  ): MeshVolumeCreateOrUpdate;
  /** Resource for '/Resources/Volumes' has methods for the following verbs: get */
  (path: "/Resources/Volumes"): MeshVolumeList;
  /** Resource for '/Resources/Networks/\{networkResourceName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/Resources/Networks/{networkResourceName}",
    networkResourceName: string
  ): MeshNetworkCreateOrUpdate;
  /** Resource for '/Resources/Networks' has methods for the following verbs: get */
  (path: "/Resources/Networks"): MeshNetworkList;
  /** Resource for '/Resources/Applications/\{applicationResourceName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/Resources/Applications/{applicationResourceName}",
    applicationResourceName: string
  ): MeshApplicationCreateOrUpdate;
  /** Resource for '/Resources/Applications' has methods for the following verbs: get */
  (path: "/Resources/Applications"): MeshApplicationList;
  /** Resource for '/Resources/Applications/\{applicationResourceName\}/$/GetUpgradeProgress' has methods for the following verbs: get */
  (
    path: "/Resources/Applications/{applicationResourceName}/$/GetUpgradeProgress",
    applicationResourceName: string
  ): MeshApplicationGetUpgradeProgress;
  /** Resource for '/Resources/Applications/\{applicationResourceName\}/Services/\{serviceResourceName\}' has methods for the following verbs: get */
  (
    path: "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}",
    applicationResourceName: string,
    serviceResourceName: string
  ): MeshServiceGet;
  /** Resource for '/Resources/Applications/\{applicationResourceName\}/Services' has methods for the following verbs: get */
  (
    path: "/Resources/Applications/{applicationResourceName}/Services",
    applicationResourceName: string
  ): MeshServiceList;
  /** Resource for '/Resources/Applications/\{applicationResourceName\}/Services/\{serviceResourceName\}/Replicas/\{replicaName\}/CodePackages/\{codePackageName\}/Logs' has methods for the following verbs: get */
  (
    path: "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}/Replicas/{replicaName}/CodePackages/{codePackageName}/Logs",
    applicationResourceName: string,
    serviceResourceName: string,
    replicaName: string,
    codePackageName: string
  ): MeshCodePackageGetContainerLogs;
  /** Resource for '/Resources/Applications/\{applicationResourceName\}/Services/\{serviceResourceName\}/Replicas/\{replicaName\}' has methods for the following verbs: get */
  (
    path: "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}/Replicas/{replicaName}",
    applicationResourceName: string,
    serviceResourceName: string,
    replicaName: string
  ): MeshServiceReplicaGet;
  /** Resource for '/Resources/Applications/\{applicationResourceName\}/Services/\{serviceResourceName\}/Replicas' has methods for the following verbs: get */
  (
    path: "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}/Replicas",
    applicationResourceName: string,
    serviceResourceName: string
  ): MeshServiceReplicaList;
  /** Resource for '/Resources/Gateways/\{gatewayResourceName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/Resources/Gateways/{gatewayResourceName}",
    gatewayResourceName: string
  ): MeshGatewayCreateOrUpdate;
  /** Resource for '/Resources/Gateways' has methods for the following verbs: get */
  (path: "/Resources/Gateways"): MeshGatewayList;
}

export type ServiceFabricLike = Client & {
  path: Routes;
  meshSecret: MeshSecretOperations;
  meshSecretValue: MeshSecretValueOperations;
  meshVolume: MeshVolumeOperations;
  meshNetwork: MeshNetworkOperations;
  meshApplication: MeshApplicationOperations;
  meshService: MeshServiceOperations;
  meshCodePackage: MeshCodePackageOperations;
  meshServiceReplica: MeshServiceReplicaOperations;
  meshGateway: MeshGatewayOperations;
} & ClientOperations;
