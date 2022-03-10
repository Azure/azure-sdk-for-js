// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getClient,
  ClientOptions,
  CertificateCredential,
  isCertificateCredential,
  getClientCertificatePolicy,
} from "@azure-rest/core-client";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { ServiceFabricLike } from "./clientDefinitions";

function ServiceFabric(enpoint: string, options?: ClientOptions): ServiceFabricLike;
function ServiceFabric(
  enpoint: string,
  credentials: TokenCredential | CertificateCredential,
  options?: ClientOptions
): ServiceFabricLike;
function ServiceFabric(
  endpoint: string,
  secondParameter?: TokenCredential | CertificateCredential | ClientOptions,
  thirdParameter: ClientOptions = {}
): ServiceFabricLike {
  let options: ClientOptions = thirdParameter;
  let credentials: TokenCredential | CertificateCredential | undefined;

  if (isTokenCredential(secondParameter) || isCertificateCredential(secondParameter)) {
    credentials = secondParameter;
  } else if (secondParameter !== undefined) {
    options = secondParameter;
  }

  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "8.1";
  options = {
    ...options,
    credentials: {
      scopes: ["https://servicefabric.azure.net/.default"],
    },
  };

  const credential = isTokenCredential(credentials) ? credentials : undefined;

  const client = getClient(baseUrl, credential, options) as ServiceFabricLike;

  if (isCertificateCredential(credentials)) {
    client.pipeline.addPolicy(getClientCertificatePolicy(credentials));
  }

  return {
    ...client,
    ...{
      getClusterManifest: (options) => {
        return client.path("/$/GetClusterManifest").get(options);
      },
      getClusterHealth: (options) => {
        return client.path("/$/GetClusterHealth").get(options);
      },
      getClusterHealthUsingPolicy: (options) => {
        return client.path("/$/GetClusterHealth").post(options);
      },
      getClusterHealthChunk: (options) => {
        return client.path("/$/GetClusterHealthChunk").get(options);
      },
      getClusterHealthChunkUsingPolicyAndAdvancedFilters: (options) => {
        return client.path("/$/GetClusterHealthChunk").post(options);
      },
      reportClusterHealth: (options) => {
        return client.path("/$/ReportClusterHealth").post(options);
      },
      getProvisionedFabricCodeVersionInfoList: (options) => {
        return client.path("/$/GetProvisionedCodeVersions").get(options);
      },
      getProvisionedFabricConfigVersionInfoList: (options) => {
        return client.path("/$/GetProvisionedConfigVersions").get(options);
      },
      getClusterUpgradeProgress: (options) => {
        return client.path("/$/GetUpgradeProgress").get(options);
      },
      getClusterConfiguration: (options) => {
        return client.path("/$/GetClusterConfiguration").get(options);
      },
      getClusterConfigurationUpgradeStatus: (options) => {
        return client.path("/$/GetClusterConfigurationUpgradeStatus").get(options);
      },
      getUpgradeOrchestrationServiceState: (options) => {
        return client.path("/$/GetUpgradeOrchestrationServiceState").get(options);
      },
      setUpgradeOrchestrationServiceState: (options) => {
        return client.path("/$/SetUpgradeOrchestrationServiceState").post(options);
      },
      provisionCluster: (options) => {
        return client.path("/$/Provision").post(options);
      },
      unprovisionCluster: (options) => {
        return client.path("/$/Unprovision").post(options);
      },
      rollbackClusterUpgrade: (options) => {
        return client.path("/$/RollbackUpgrade").post(options);
      },
      resumeClusterUpgrade: (options) => {
        return client.path("/$/MoveToNextUpgradeDomain").post(options);
      },
      startClusterUpgrade: (options) => {
        return client.path("/$/Upgrade").post(options);
      },
      startClusterConfigurationUpgrade: (options) => {
        return client.path("/$/StartClusterConfigurationUpgrade").post(options);
      },
      updateClusterUpgrade: (options) => {
        return client.path("/$/UpdateUpgrade").post(options);
      },
      getAadMetadata: (options) => {
        return client.path("/$/GetAadMetadata").get(options);
      },
      getClusterVersion: (options) => {
        return client.path("/$/GetClusterVersion").get(options);
      },
      getClusterLoad: (options) => {
        return client.path("/$/GetLoadInformation").get(options);
      },
      toggleVerboseServicePlacementHealthReporting: (options) => {
        return client.path("/$/ToggleVerboseServicePlacementHealthReporting").post(options);
      },
      getNodeInfoList: (options) => {
        return client.path("/Nodes").get(options);
      },
      getNodeInfo: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}", nodeName).get(options);
      },
      getNodeHealth: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/GetHealth", nodeName).get(options);
      },
      getNodeHealthUsingPolicy: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/GetHealth", nodeName).post(options);
      },
      reportNodeHealth: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/ReportHealth", nodeName).post(options);
      },
      getNodeLoadInfo: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/GetLoadInformation", nodeName).get(options);
      },
      disableNode: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/Deactivate", nodeName).post(options);
      },
      enableNode: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/Activate", nodeName).post(options);
      },
      removeNodeState: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/RemoveNodeState", nodeName).post(options);
      },
      restartNode: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/Restart", nodeName).post(options);
      },
      removeConfigurationOverrides: (nodeName, options) => {
        return client
          .path("/Nodes/{nodeName}/$/RemoveConfigurationOverrides", nodeName)
          .delete(options);
      },
      getConfigurationOverrides: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/GetConfigurationOverrides", nodeName).get(options);
      },
      addConfigurationParameterOverrides: (nodeName, options) => {
        return client
          .path("/Nodes/{nodeName}/$/AddConfigurationParameterOverrides", nodeName)
          .post(options);
      },
      removeNodeTags: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/RemoveNodeTags", nodeName).post(options);
      },
      addNodeTags: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/AddNodeTags", nodeName).post(options);
      },
      getApplicationTypeInfoList: (options) => {
        return client.path("/ApplicationTypes").get(options);
      },
      getApplicationTypeInfoListByName: (applicationTypeName, options) => {
        return client
          .path("/ApplicationTypes/{applicationTypeName}", applicationTypeName)
          .get(options);
      },
      provisionApplicationType: (options) => {
        return client.path("/ApplicationTypes/$/Provision").post(options);
      },
      unprovisionApplicationType: (applicationTypeName, options) => {
        return client
          .path("/ApplicationTypes/{applicationTypeName}/$/Unprovision", applicationTypeName)
          .post(options);
      },
      getServiceTypeInfoList: (applicationTypeName, options) => {
        return client
          .path("/ApplicationTypes/{applicationTypeName}/$/GetServiceTypes", applicationTypeName)
          .get(options);
      },
      getServiceTypeInfoByName: (applicationTypeName, serviceTypeName, options) => {
        return client
          .path(
            "/ApplicationTypes/{applicationTypeName}/$/GetServiceTypes/{serviceTypeName}",
            applicationTypeName,
            serviceTypeName
          )
          .get(options);
      },
      getServiceManifest: (applicationTypeName, options) => {
        return client
          .path("/ApplicationTypes/{applicationTypeName}/$/GetServiceManifest", applicationTypeName)
          .get(options);
      },
      getDeployedServiceTypeInfoList: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServiceTypes",
            nodeName,
            applicationId
          )
          .get(options);
      },
      getDeployedServiceTypeInfoByName: (nodeName, applicationId, serviceTypeName, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServiceTypes/{serviceTypeName}",
            nodeName,
            applicationId,
            serviceTypeName
          )
          .get(options);
      },
      createApplication: (options) => {
        return client.path("/Applications/$/Create").post(options);
      },
      deleteApplication: (applicationId, options) => {
        return client.path("/Applications/{applicationId}/$/Delete", applicationId).post(options);
      },
      getApplicationLoadInfo: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/GetLoadInformation", applicationId)
          .get(options);
      },
      getApplicationInfoList: (options) => {
        return client.path("/Applications").get(options);
      },
      getApplicationInfo: (applicationId, options) => {
        return client.path("/Applications/{applicationId}", applicationId).get(options);
      },
      getApplicationHealth: (applicationId, options) => {
        return client.path("/Applications/{applicationId}/$/GetHealth", applicationId).get(options);
      },
      getApplicationHealthUsingPolicy: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/GetHealth", applicationId)
          .post(options);
      },
      reportApplicationHealth: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/ReportHealth", applicationId)
          .post(options);
      },
      startApplicationUpgrade: (applicationId, options) => {
        return client.path("/Applications/{applicationId}/$/Upgrade", applicationId).post(options);
      },
      getApplicationUpgrade: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/GetUpgradeProgress", applicationId)
          .get(options);
      },
      updateApplicationUpgrade: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/UpdateUpgrade", applicationId)
          .post(options);
      },
      updateApplication: (applicationId, options) => {
        return client.path("/Applications/{applicationId}/$/Update", applicationId).post(options);
      },
      resumeApplicationUpgrade: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/MoveToNextUpgradeDomain", applicationId)
          .post(options);
      },
      rollbackApplicationUpgrade: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/RollbackUpgrade", applicationId)
          .post(options);
      },
      getDeployedApplicationInfoList: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/GetApplications", nodeName).get(options);
      },
      getDeployedApplicationInfo: (nodeName, applicationId, options) => {
        return client
          .path("/Nodes/{nodeName}/$/GetApplications/{applicationId}", nodeName, applicationId)
          .get(options);
      },
      getDeployedApplicationHealth: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetHealth",
            nodeName,
            applicationId
          )
          .get(options);
      },
      getDeployedApplicationHealthUsingPolicy: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetHealth",
            nodeName,
            applicationId
          )
          .post(options);
      },
      reportDeployedApplicationHealth: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/ReportHealth",
            nodeName,
            applicationId
          )
          .post(options);
      },
      getApplicationManifest: (applicationTypeName, options) => {
        return client
          .path(
            "/ApplicationTypes/{applicationTypeName}/$/GetApplicationManifest",
            applicationTypeName
          )
          .get(options);
      },
      getServiceInfoList: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/GetServices", applicationId)
          .get(options);
      },
      getServiceInfo: (applicationId, serviceId, options) => {
        return client
          .path("/Applications/{applicationId}/$/GetServices/{serviceId}", applicationId, serviceId)
          .get(options);
      },
      getApplicationNameInfo: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/GetApplicationName", serviceId).get(options);
      },
      createService: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/GetServices/$/Create", applicationId)
          .post(options);
      },
      createServiceFromTemplate: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/GetServices/$/CreateFromTemplate", applicationId)
          .post(options);
      },
      deleteService: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/Delete", serviceId).post(options);
      },
      updateService: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/Update", serviceId).post(options);
      },
      getServiceDescription: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/GetDescription", serviceId).get(options);
      },
      getServiceHealth: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/GetHealth", serviceId).get(options);
      },
      getServiceHealthUsingPolicy: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/GetHealth", serviceId).post(options);
      },
      reportServiceHealth: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/ReportHealth", serviceId).post(options);
      },
      resolveService: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/ResolvePartition", serviceId).get(options);
      },
      getUnplacedReplicaInformation: (serviceId, options) => {
        return client
          .path("/Services/{serviceId}/$/GetUnplacedReplicaInformation", serviceId)
          .get(options);
      },
      getLoadedPartitionInfoList: (options) => {
        return client.path("/$/GetLoadedPartitionInfoList").get(options);
      },
      getPartitionInfoList: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/GetPartitions", serviceId).get(options);
      },
      getPartitionInfo: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}", partitionId).get(options);
      },
      getServiceNameInfo: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/GetServiceName", partitionId).get(options);
      },
      getPartitionHealth: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/GetHealth", partitionId).get(options);
      },
      getPartitionHealthUsingPolicy: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/GetHealth", partitionId).post(options);
      },
      reportPartitionHealth: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/ReportHealth", partitionId).post(options);
      },
      getPartitionLoadInformation: (partitionId, options) => {
        return client
          .path("/Partitions/{partitionId}/$/GetLoadInformation", partitionId)
          .get(options);
      },
      resetPartitionLoad: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/ResetLoad", partitionId).post(options);
      },
      recoverPartition: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/Recover", partitionId).post(options);
      },
      recoverServicePartitions: (serviceId, options) => {
        return client
          .path("/Services/$/{serviceId}/$/GetPartitions/$/Recover", serviceId)
          .post(options);
      },
      recoverSystemPartitions: (options) => {
        return client.path("/$/RecoverSystemPartitions").post(options);
      },
      recoverAllPartitions: (options) => {
        return client.path("/$/RecoverAllPartitions").post(options);
      },
      movePrimaryReplica: (partitionId, options) => {
        return client
          .path("/Partitions/{partitionId}/$/MovePrimaryReplica", partitionId)
          .post(options);
      },
      moveSecondaryReplica: (partitionId, options) => {
        return client
          .path("/Partitions/{partitionId}/$/MoveSecondaryReplica", partitionId)
          .post(options);
      },
      updatePartitionLoad: (options) => {
        return client.path("/$/UpdatePartitionLoad").post(options);
      },
      moveInstance: (serviceId, partitionId, options) => {
        return client
          .path(
            "/Services/{serviceId}/$/GetPartitions/{partitionId}/$/MoveInstance",
            serviceId,
            partitionId
          )
          .post(options);
      },
      moveAuxiliaryReplica: (serviceId, partitionId, options) => {
        return client
          .path(
            "/Services/{serviceId}/$/GetPartitions/{partitionId}/$/MoveAuxiliaryReplica",
            serviceId,
            partitionId
          )
          .post(options);
      },
      createRepairTask: (options) => {
        return client.path("/$/CreateRepairTask").post(options);
      },
      cancelRepairTask: (options) => {
        return client.path("/$/CancelRepairTask").post(options);
      },
      deleteRepairTask: (options) => {
        return client.path("/$/DeleteRepairTask").post(options);
      },
      getRepairTaskList: (options) => {
        return client.path("/$/GetRepairTaskList").get(options);
      },
      forceApproveRepairTask: (options) => {
        return client.path("/$/ForceApproveRepairTask").post(options);
      },
      updateRepairTaskHealthPolicy: (options) => {
        return client.path("/$/UpdateRepairTaskHealthPolicy").post(options);
      },
      updateRepairExecutionState: (options) => {
        return client.path("/$/UpdateRepairExecutionState").post(options);
      },
      getReplicaInfoList: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/GetReplicas", partitionId).get(options);
      },
      getReplicaInfo: (partitionId, replicaId, options) => {
        return client
          .path("/Partitions/{partitionId}/$/GetReplicas/{replicaId}", partitionId, replicaId)
          .get(options);
      },
      getReplicaHealth: (partitionId, replicaId, options) => {
        return client
          .path(
            "/Partitions/{partitionId}/$/GetReplicas/{replicaId}/$/GetHealth",
            partitionId,
            replicaId
          )
          .get(options);
      },
      getReplicaHealthUsingPolicy: (partitionId, replicaId, options) => {
        return client
          .path(
            "/Partitions/{partitionId}/$/GetReplicas/{replicaId}/$/GetHealth",
            partitionId,
            replicaId
          )
          .post(options);
      },
      reportReplicaHealth: (partitionId, replicaId, options) => {
        return client
          .path(
            "/Partitions/{partitionId}/$/GetReplicas/{replicaId}/$/ReportHealth",
            partitionId,
            replicaId
          )
          .post(options);
      },
      getDeployedServiceReplicaInfoList: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetReplicas",
            nodeName,
            applicationId
          )
          .get(options);
      },
      getDeployedServiceReplicaDetailInfo: (nodeName, partitionId, replicaId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas/{replicaId}/$/GetDetail",
            nodeName,
            partitionId,
            replicaId
          )
          .get(options);
      },
      getDeployedServiceReplicaDetailInfoByPartitionId: (nodeName, partitionId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas",
            nodeName,
            partitionId
          )
          .get(options);
      },
      restartReplica: (nodeName, partitionId, replicaId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas/{replicaId}/$/Restart",
            nodeName,
            partitionId,
            replicaId
          )
          .post(options);
      },
      removeReplica: (nodeName, partitionId, replicaId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas/{replicaId}/$/Delete",
            nodeName,
            partitionId,
            replicaId
          )
          .post(options);
      },
      getDeployedServicePackageInfoList: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages",
            nodeName,
            applicationId
          )
          .get(options);
      },
      getDeployedServicePackageInfoListByName: (
        nodeName,
        applicationId,
        servicePackageName,
        options
      ) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}",
            nodeName,
            applicationId,
            servicePackageName
          )
          .get(options);
      },
      getDeployedServicePackageHealth: (nodeName, applicationId, servicePackageName, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}/$/GetHealth",
            nodeName,
            applicationId,
            servicePackageName
          )
          .get(options);
      },
      getDeployedServicePackageHealthUsingPolicy: (
        nodeName,
        applicationId,
        servicePackageName,
        options
      ) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}/$/GetHealth",
            nodeName,
            applicationId,
            servicePackageName
          )
          .post(options);
      },
      reportDeployedServicePackageHealth: (
        nodeName,
        applicationId,
        servicePackageName,
        options
      ) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}/$/ReportHealth",
            nodeName,
            applicationId,
            servicePackageName
          )
          .post(options);
      },
      deployServicePackageToNode: (nodeName, options) => {
        return client.path("/Nodes/{nodeName}/$/DeployServicePackage", nodeName).post(options);
      },
      getDeployedCodePackageInfoList: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages",
            nodeName,
            applicationId
          )
          .get(options);
      },
      restartDeployedCodePackage: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages/$/Restart",
            nodeName,
            applicationId
          )
          .post(options);
      },
      getContainerLogsDeployedOnNode: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages/$/ContainerLogs",
            nodeName,
            applicationId
          )
          .get(options);
      },
      invokeContainerApi: (nodeName, applicationId, options) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages/$/ContainerApi",
            nodeName,
            applicationId
          )
          .post(options);
      },
      createComposeDeployment: (options) => {
        return client.path("/ComposeDeployments/$/Create").put(options);
      },
      getComposeDeploymentStatus: (deploymentName, options) => {
        return client.path("/ComposeDeployments/{deploymentName}", deploymentName).get(options);
      },
      getComposeDeploymentStatusList: (options) => {
        return client.path("/ComposeDeployments").get(options);
      },
      getComposeDeploymentUpgradeProgress: (deploymentName, options) => {
        return client
          .path("/ComposeDeployments/{deploymentName}/$/GetUpgradeProgress", deploymentName)
          .get(options);
      },
      removeComposeDeployment: (deploymentName, options) => {
        return client
          .path("/ComposeDeployments/{deploymentName}/$/Delete", deploymentName)
          .post(options);
      },
      startComposeDeploymentUpgrade: (deploymentName, options) => {
        return client
          .path("/ComposeDeployments/{deploymentName}/$/Upgrade", deploymentName)
          .post(options);
      },
      startRollbackComposeDeploymentUpgrade: (deploymentName, options) => {
        return client
          .path("/ComposeDeployments/{deploymentName}/$/RollbackUpgrade", deploymentName)
          .post(options);
      },
      getChaos: (options) => {
        return client.path("/Tools/Chaos").get(options);
      },
      startChaos: (options) => {
        return client.path("/Tools/Chaos/$/Start").post(options);
      },
      stopChaos: (options) => {
        return client.path("/Tools/Chaos/$/Stop").post(options);
      },
      getChaosEvents: (options) => {
        return client.path("/Tools/Chaos/Events").get(options);
      },
      getChaosSchedule: (options) => {
        return client.path("/Tools/Chaos/Schedule").get(options);
      },
      postChaosSchedule: (options) => {
        return client.path("/Tools/Chaos/Schedule").post(options);
      },
      uploadFile: (contentPath, options) => {
        return client.path("/ImageStore/{contentPath}", contentPath).put(options);
      },
      getImageStoreContent: (contentPath, options) => {
        return client.path("/ImageStore/{contentPath}", contentPath).get(options);
      },
      deleteImageStoreContent: (contentPath, options) => {
        return client.path("/ImageStore/{contentPath}", contentPath).delete(options);
      },
      getImageStoreRootContent: (options) => {
        return client.path("/ImageStore").get(options);
      },
      copyImageStoreContent: (options) => {
        return client.path("/ImageStore/$/Copy").post(options);
      },
      deleteImageStoreUploadSession: (options) => {
        return client.path("/ImageStore/$/DeleteUploadSession").delete(options);
      },
      commitImageStoreUploadSession: (options) => {
        return client.path("/ImageStore/$/CommitUploadSession").post(options);
      },
      getImageStoreUploadSessionById: (options) => {
        return client.path("/ImageStore/$/GetUploadSession").get(options);
      },
      getImageStoreUploadSessionByPath: (contentPath, options) => {
        return client
          .path("/ImageStore/{contentPath}/$/GetUploadSession", contentPath)
          .get(options);
      },
      uploadFileChunk: (contentPath, options) => {
        return client.path("/ImageStore/{contentPath}/$/UploadChunk", contentPath).put(options);
      },
      getImageStoreRootFolderSize: (options) => {
        return client.path("/ImageStore/$/FolderSize").get(options);
      },
      getImageStoreFolderSize: (contentPath, options) => {
        return client.path("/ImageStore/{contentPath}/$/FolderSize", contentPath).get(options);
      },
      getImageStoreInfo: (options) => {
        return client.path("/ImageStore/$/Info").get(options);
      },
      invokeInfrastructureCommand: (options) => {
        return client.path("/$/InvokeInfrastructureCommand").post(options);
      },
      invokeInfrastructureQuery: (options) => {
        return client.path("/$/InvokeInfrastructureQuery").get(options);
      },
      startDataLoss: (serviceId, partitionId, options) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/StartDataLoss",
            serviceId,
            partitionId
          )
          .post(options);
      },
      getDataLossProgress: (serviceId, partitionId, options) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/GetDataLossProgress",
            serviceId,
            partitionId
          )
          .get(options);
      },
      startQuorumLoss: (serviceId, partitionId, options) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/StartQuorumLoss",
            serviceId,
            partitionId
          )
          .post(options);
      },
      getQuorumLossProgress: (serviceId, partitionId, options) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/GetQuorumLossProgress",
            serviceId,
            partitionId
          )
          .get(options);
      },
      startPartitionRestart: (serviceId, partitionId, options) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/StartRestart",
            serviceId,
            partitionId
          )
          .post(options);
      },
      getPartitionRestartProgress: (serviceId, partitionId, options) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/GetRestartProgress",
            serviceId,
            partitionId
          )
          .get(options);
      },
      startNodeTransition: (nodeName, options) => {
        return client.path("/Faults/Nodes/{nodeName}/$/StartTransition/", nodeName).post(options);
      },
      getNodeTransitionProgress: (nodeName, options) => {
        return client
          .path("/Faults/Nodes/{nodeName}/$/GetTransitionProgress", nodeName)
          .get(options);
      },
      getFaultOperationList: (options) => {
        return client.path("/Faults/").get(options);
      },
      cancelOperation: (options) => {
        return client.path("/Faults/$/Cancel").post(options);
      },
      createBackupPolicy: (options) => {
        return client.path("/BackupRestore/BackupPolicies/$/Create").post(options);
      },
      deleteBackupPolicy: (backupPolicyName, options) => {
        return client
          .path("/BackupRestore/BackupPolicies/{backupPolicyName}/$/Delete", backupPolicyName)
          .post(options);
      },
      getBackupPolicyList: (options) => {
        return client.path("/BackupRestore/BackupPolicies").get(options);
      },
      getBackupPolicyByName: (backupPolicyName, options) => {
        return client
          .path("/BackupRestore/BackupPolicies/{backupPolicyName}", backupPolicyName)
          .get(options);
      },
      getAllEntitiesBackedUpByPolicy: (backupPolicyName, options) => {
        return client
          .path(
            "/BackupRestore/BackupPolicies/{backupPolicyName}/$/GetBackupEnabledEntities",
            backupPolicyName
          )
          .get(options);
      },
      updateBackupPolicy: (backupPolicyName, options) => {
        return client
          .path("/BackupRestore/BackupPolicies/{backupPolicyName}/$/Update", backupPolicyName)
          .post(options);
      },
      enableApplicationBackup: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/EnableBackup", applicationId)
          .post(options);
      },
      disableApplicationBackup: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/DisableBackup", applicationId)
          .post(options);
      },
      getApplicationBackupConfigurationInfo: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/GetBackupConfigurationInfo", applicationId)
          .get(options);
      },
      getApplicationBackupList: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/GetBackups", applicationId)
          .get(options);
      },
      suspendApplicationBackup: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/SuspendBackup", applicationId)
          .post(options);
      },
      resumeApplicationBackup: (applicationId, options) => {
        return client
          .path("/Applications/{applicationId}/$/ResumeBackup", applicationId)
          .post(options);
      },
      enableServiceBackup: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/EnableBackup", serviceId).post(options);
      },
      disableServiceBackup: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/DisableBackup", serviceId).post(options);
      },
      getServiceBackupConfigurationInfo: (serviceId, options) => {
        return client
          .path("/Services/{serviceId}/$/GetBackupConfigurationInfo", serviceId)
          .get(options);
      },
      getServiceBackupList: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/GetBackups", serviceId).get(options);
      },
      suspendServiceBackup: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/SuspendBackup", serviceId).post(options);
      },
      resumeServiceBackup: (serviceId, options) => {
        return client.path("/Services/{serviceId}/$/ResumeBackup", serviceId).post(options);
      },
      enablePartitionBackup: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/EnableBackup", partitionId).post(options);
      },
      disablePartitionBackup: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/DisableBackup", partitionId).post(options);
      },
      getPartitionBackupConfigurationInfo: (partitionId, options) => {
        return client
          .path("/Partitions/{partitionId}/$/GetBackupConfigurationInfo", partitionId)
          .get(options);
      },
      getPartitionBackupList: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/GetBackups", partitionId).get(options);
      },
      suspendPartitionBackup: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/SuspendBackup", partitionId).post(options);
      },
      resumePartitionBackup: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/ResumeBackup", partitionId).post(options);
      },
      backupPartition: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/Backup", partitionId).post(options);
      },
      getPartitionBackupProgress: (partitionId, options) => {
        return client
          .path("/Partitions/{partitionId}/$/GetBackupProgress", partitionId)
          .get(options);
      },
      restorePartition: (partitionId, options) => {
        return client.path("/Partitions/{partitionId}/$/Restore", partitionId).post(options);
      },
      getPartitionRestoreProgress: (partitionId, options) => {
        return client
          .path("/Partitions/{partitionId}/$/GetRestoreProgress", partitionId)
          .get(options);
      },
      getBackupsFromBackupLocation: (options) => {
        return client.path("/BackupRestore/$/GetBackups").post(options);
      },
      createName: (options) => {
        return client.path("/Names/$/Create").post(options);
      },
      getNameExistsInfo: (nameId, options) => {
        return client.path("/Names/{nameId}", nameId).get(options);
      },
      deleteName: (nameId, options) => {
        return client.path("/Names/{nameId}", nameId).delete(options);
      },
      getSubNameInfoList: (nameId, options) => {
        return client.path("/Names/{nameId}/$/GetSubNames", nameId).get(options);
      },
      getPropertyInfoList: (nameId, options) => {
        return client.path("/Names/{nameId}/$/GetProperties", nameId).get(options);
      },
      putProperty: (nameId, options) => {
        return client.path("/Names/{nameId}/$/GetProperty", nameId).put(options);
      },
      getPropertyInfo: (nameId, options) => {
        return client.path("/Names/{nameId}/$/GetProperty", nameId).get(options);
      },
      deleteProperty: (nameId, options) => {
        return client.path("/Names/{nameId}/$/GetProperty", nameId).delete(options);
      },
      submitPropertyBatch: (nameId, options) => {
        return client.path("/Names/{nameId}/$/GetProperties/$/SubmitBatch", nameId).post(options);
      },
      getClusterEventList: (options) => {
        return client.path("/EventsStore/Cluster/Events").get(options);
      },
      getContainersEventList: (options) => {
        return client.path("/EventsStore/Containers/Events").get(options);
      },
      getNodeEventList: (nodeName, options) => {
        return client.path("/EventsStore/Nodes/{nodeName}/$/Events", nodeName).get(options);
      },
      getNodesEventList: (options) => {
        return client.path("/EventsStore/Nodes/Events").get(options);
      },
      getApplicationEventList: (applicationId, options) => {
        return client
          .path("/EventsStore/Applications/{applicationId}/$/Events", applicationId)
          .get(options);
      },
      getApplicationsEventList: (options) => {
        return client.path("/EventsStore/Applications/Events").get(options);
      },
      getServiceEventList: (serviceId, options) => {
        return client.path("/EventsStore/Services/{serviceId}/$/Events", serviceId).get(options);
      },
      getServicesEventList: (options) => {
        return client.path("/EventsStore/Services/Events").get(options);
      },
      getPartitionEventList: (partitionId, options) => {
        return client
          .path("/EventsStore/Partitions/{partitionId}/$/Events", partitionId)
          .get(options);
      },
      getPartitionsEventList: (options) => {
        return client.path("/EventsStore/Partitions/Events").get(options);
      },
      getPartitionReplicaEventList: (partitionId, replicaId, options) => {
        return client
          .path(
            "/EventsStore/Partitions/{partitionId}/$/Replicas/{replicaId}/$/Events",
            partitionId,
            replicaId
          )
          .get(options);
      },
      getPartitionReplicasEventList: (partitionId, options) => {
        return client
          .path("/EventsStore/Partitions/{partitionId}/$/Replicas/Events", partitionId)
          .get(options);
      },
      getCorrelatedEventList: (eventInstanceId, options) => {
        return client
          .path("/EventsStore/CorrelatedEvents/{eventInstanceId}/$/Events", eventInstanceId)
          .get(options);
      },
    },
    meshSecret: {
      createOrUpdate: (secretResourceName, options) => {
        return client
          .path("/Resources/Secrets/{secretResourceName}", secretResourceName)
          .put(options);
      },
      get: (secretResourceName, options) => {
        return client
          .path("/Resources/Secrets/{secretResourceName}", secretResourceName)
          .get(options);
      },
      delete: (secretResourceName, options) => {
        return client
          .path("/Resources/Secrets/{secretResourceName}", secretResourceName)
          .delete(options);
      },
      list: (options) => {
        return client.path("/Resources/Secrets").get(options);
      },
    },
    meshSecretValue: {
      addValue: (secretResourceName, secretValueResourceName, options) => {
        return client
          .path(
            "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}",
            secretResourceName,
            secretValueResourceName
          )
          .put(options);
      },
      get: (secretResourceName, secretValueResourceName, options) => {
        return client
          .path(
            "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}",
            secretResourceName,
            secretValueResourceName
          )
          .get(options);
      },
      delete: (secretResourceName, secretValueResourceName, options) => {
        return client
          .path(
            "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}",
            secretResourceName,
            secretValueResourceName
          )
          .delete(options);
      },
      list: (secretResourceName, options) => {
        return client
          .path("/Resources/Secrets/{secretResourceName}/values", secretResourceName)
          .get(options);
      },
      show: (secretResourceName, secretValueResourceName, options) => {
        return client
          .path(
            "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}/list_value",
            secretResourceName,
            secretValueResourceName
          )
          .post(options);
      },
    },
    meshVolume: {
      createOrUpdate: (volumeResourceName, options) => {
        return client
          .path("/Resources/Volumes/{volumeResourceName}", volumeResourceName)
          .put(options);
      },
      get: (volumeResourceName, options) => {
        return client
          .path("/Resources/Volumes/{volumeResourceName}", volumeResourceName)
          .get(options);
      },
      delete: (volumeResourceName, options) => {
        return client
          .path("/Resources/Volumes/{volumeResourceName}", volumeResourceName)
          .delete(options);
      },
      list: (options) => {
        return client.path("/Resources/Volumes").get(options);
      },
    },
    meshNetwork: {
      createOrUpdate: (networkResourceName, options) => {
        return client
          .path("/Resources/Networks/{networkResourceName}", networkResourceName)
          .put(options);
      },
      get: (networkResourceName, options) => {
        return client
          .path("/Resources/Networks/{networkResourceName}", networkResourceName)
          .get(options);
      },
      delete: (networkResourceName, options) => {
        return client
          .path("/Resources/Networks/{networkResourceName}", networkResourceName)
          .delete(options);
      },
      list: (options) => {
        return client.path("/Resources/Networks").get(options);
      },
    },
    meshApplication: {
      createOrUpdate: (applicationResourceName, options) => {
        return client
          .path("/Resources/Applications/{applicationResourceName}", applicationResourceName)
          .put(options);
      },
      get: (applicationResourceName, options) => {
        return client
          .path("/Resources/Applications/{applicationResourceName}", applicationResourceName)
          .get(options);
      },
      delete: (applicationResourceName, options) => {
        return client
          .path("/Resources/Applications/{applicationResourceName}", applicationResourceName)
          .delete(options);
      },
      list: (options) => {
        return client.path("/Resources/Applications").get(options);
      },
      getUpgradeProgress: (applicationResourceName, options) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/$/GetUpgradeProgress",
            applicationResourceName
          )
          .get(options);
      },
    },
    meshService: {
      get: (applicationResourceName, serviceResourceName, options) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}",
            applicationResourceName,
            serviceResourceName
          )
          .get(options);
      },
      list: (applicationResourceName, options) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services",
            applicationResourceName
          )
          .get(options);
      },
    },
    meshCodePackage: {
      getContainerLogs: (
        applicationResourceName,
        serviceResourceName,
        replicaName,
        codePackageName,
        options
      ) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}/Replicas/{replicaName}/CodePackages/{codePackageName}/Logs",
            applicationResourceName,
            serviceResourceName,
            replicaName,
            codePackageName
          )
          .get(options);
      },
    },
    meshServiceReplica: {
      get: (applicationResourceName, serviceResourceName, replicaName, options) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}/Replicas/{replicaName}",
            applicationResourceName,
            serviceResourceName,
            replicaName
          )
          .get(options);
      },
      list: (applicationResourceName, serviceResourceName, options) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}/Replicas",
            applicationResourceName,
            serviceResourceName
          )
          .get(options);
      },
    },
    meshGateway: {
      createOrUpdate: (gatewayResourceName, options) => {
        return client
          .path("/Resources/Gateways/{gatewayResourceName}", gatewayResourceName)
          .put(options);
      },
      get: (gatewayResourceName, options) => {
        return client
          .path("/Resources/Gateways/{gatewayResourceName}", gatewayResourceName)
          .get(options);
      },
      delete: (gatewayResourceName, options) => {
        return client
          .path("/Resources/Gateways/{gatewayResourceName}", gatewayResourceName)
          .delete(options);
      },
      list: (options) => {
        return client.path("/Resources/Gateways").get(options);
      },
    },
  };
}

export default ServiceFabric;
