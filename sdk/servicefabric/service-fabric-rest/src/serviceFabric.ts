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
      getClusterManifest: (shortcutOptions) => {
        return client.path("/$/GetClusterManifest").get(shortcutOptions);
      },
      getClusterHealth: (shortcutOptions) => {
        return client.path("/$/GetClusterHealth").get(shortcutOptions);
      },
      getClusterHealthUsingPolicy: (shortcutOptions) => {
        return client.path("/$/GetClusterHealth").post(shortcutOptions);
      },
      getClusterHealthChunk: (shortcutOptions) => {
        return client.path("/$/GetClusterHealthChunk").get(shortcutOptions);
      },
      getClusterHealthChunkUsingPolicyAndAdvancedFilters: (shortcutOptions) => {
        return client.path("/$/GetClusterHealthChunk").post(shortcutOptions);
      },
      reportClusterHealth: (shortcutOptions) => {
        return client.path("/$/ReportClusterHealth").post(shortcutOptions);
      },
      getProvisionedFabricCodeVersionInfoList: (shortcutOptions) => {
        return client.path("/$/GetProvisionedCodeVersions").get(shortcutOptions);
      },
      getProvisionedFabricConfigVersionInfoList: (shortcutOptions) => {
        return client.path("/$/GetProvisionedConfigVersions").get(shortcutOptions);
      },
      getClusterUpgradeProgress: (shortcutOptions) => {
        return client.path("/$/GetUpgradeProgress").get(shortcutOptions);
      },
      getClusterConfiguration: (shortcutOptions) => {
        return client.path("/$/GetClusterConfiguration").get(shortcutOptions);
      },
      getClusterConfigurationUpgradeStatus: (shortcutOptions) => {
        return client.path("/$/GetClusterConfigurationUpgradeStatus").get(shortcutOptions);
      },
      getUpgradeOrchestrationServiceState: (shortcutOptions) => {
        return client.path("/$/GetUpgradeOrchestrationServiceState").get(shortcutOptions);
      },
      setUpgradeOrchestrationServiceState: (shortcutOptions) => {
        return client.path("/$/SetUpgradeOrchestrationServiceState").post(shortcutOptions);
      },
      provisionCluster: (shortcutOptions) => {
        return client.path("/$/Provision").post(shortcutOptions);
      },
      unprovisionCluster: (shortcutOptions) => {
        return client.path("/$/Unprovision").post(shortcutOptions);
      },
      rollbackClusterUpgrade: (shortcutOptions) => {
        return client.path("/$/RollbackUpgrade").post(shortcutOptions);
      },
      resumeClusterUpgrade: (shortcutOptions) => {
        return client.path("/$/MoveToNextUpgradeDomain").post(shortcutOptions);
      },
      startClusterUpgrade: (shortcutOptions) => {
        return client.path("/$/Upgrade").post(shortcutOptions);
      },
      startClusterConfigurationUpgrade: (shortcutOptions) => {
        return client.path("/$/StartClusterConfigurationUpgrade").post(shortcutOptions);
      },
      updateClusterUpgrade: (shortcutOptions) => {
        return client.path("/$/UpdateUpgrade").post(shortcutOptions);
      },
      getAadMetadata: (shortcutOptions) => {
        return client.path("/$/GetAadMetadata").get(shortcutOptions);
      },
      getClusterVersion: (shortcutOptions) => {
        return client.path("/$/GetClusterVersion").get(shortcutOptions);
      },
      getClusterLoad: (shortcutOptions) => {
        return client.path("/$/GetLoadInformation").get(shortcutOptions);
      },
      toggleVerboseServicePlacementHealthReporting: (shortcutOptions) => {
        return client.path("/$/ToggleVerboseServicePlacementHealthReporting").post(shortcutOptions);
      },
      getNodeInfoList: (shortcutOptions) => {
        return client.path("/Nodes").get(shortcutOptions);
      },
      getNodeInfo: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}", nodeName).get(shortcutOptions);
      },
      getNodeHealth: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/GetHealth", nodeName).get(shortcutOptions);
      },
      getNodeHealthUsingPolicy: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/GetHealth", nodeName).post(shortcutOptions);
      },
      reportNodeHealth: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/ReportHealth", nodeName).post(shortcutOptions);
      },
      getNodeLoadInfo: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/GetLoadInformation", nodeName).get(shortcutOptions);
      },
      disableNode: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/Deactivate", nodeName).post(shortcutOptions);
      },
      enableNode: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/Activate", nodeName).post(shortcutOptions);
      },
      removeNodeState: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/RemoveNodeState", nodeName).post(shortcutOptions);
      },
      restartNode: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/Restart", nodeName).post(shortcutOptions);
      },
      removeConfigurationOverrides: (nodeName, shortcutOptions) => {
        return client
          .path("/Nodes/{nodeName}/$/RemoveConfigurationOverrides", nodeName)
          .delete(shortcutOptions);
      },
      getConfigurationOverrides: (nodeName, shortcutOptions) => {
        return client
          .path("/Nodes/{nodeName}/$/GetConfigurationOverrides", nodeName)
          .get(shortcutOptions);
      },
      addConfigurationParameterOverrides: (nodeName, shortcutOptions) => {
        return client
          .path("/Nodes/{nodeName}/$/AddConfigurationParameterOverrides", nodeName)
          .post(shortcutOptions);
      },
      removeNodeTags: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/RemoveNodeTags", nodeName).post(shortcutOptions);
      },
      addNodeTags: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/AddNodeTags", nodeName).post(shortcutOptions);
      },
      getApplicationTypeInfoList: (shortcutOptions) => {
        return client.path("/ApplicationTypes").get(shortcutOptions);
      },
      getApplicationTypeInfoListByName: (applicationTypeName, shortcutOptions) => {
        return client
          .path("/ApplicationTypes/{applicationTypeName}", applicationTypeName)
          .get(shortcutOptions);
      },
      provisionApplicationType: (shortcutOptions) => {
        return client.path("/ApplicationTypes/$/Provision").post(shortcutOptions);
      },
      unprovisionApplicationType: (applicationTypeName, shortcutOptions) => {
        return client
          .path("/ApplicationTypes/{applicationTypeName}/$/Unprovision", applicationTypeName)
          .post(shortcutOptions);
      },
      getServiceTypeInfoList: (applicationTypeName, shortcutOptions) => {
        return client
          .path("/ApplicationTypes/{applicationTypeName}/$/GetServiceTypes", applicationTypeName)
          .get(shortcutOptions);
      },
      getServiceTypeInfoByName: (applicationTypeName, serviceTypeName, shortcutOptions) => {
        return client
          .path(
            "/ApplicationTypes/{applicationTypeName}/$/GetServiceTypes/{serviceTypeName}",
            applicationTypeName,
            serviceTypeName
          )
          .get(shortcutOptions);
      },
      getServiceManifest: (applicationTypeName, shortcutOptions) => {
        return client
          .path("/ApplicationTypes/{applicationTypeName}/$/GetServiceManifest", applicationTypeName)
          .get(shortcutOptions);
      },
      getDeployedServiceTypeInfoList: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServiceTypes",
            nodeName,
            applicationId
          )
          .get(shortcutOptions);
      },
      getDeployedServiceTypeInfoByName: (
        nodeName,
        applicationId,
        serviceTypeName,
        shortcutOptions
      ) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServiceTypes/{serviceTypeName}",
            nodeName,
            applicationId,
            serviceTypeName
          )
          .get(shortcutOptions);
      },
      createApplication: (shortcutOptions) => {
        return client.path("/Applications/$/Create").post(shortcutOptions);
      },
      deleteApplication: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/Delete", applicationId)
          .post(shortcutOptions);
      },
      getApplicationLoadInfo: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetLoadInformation", applicationId)
          .get(shortcutOptions);
      },
      getApplicationInfoList: (shortcutOptions) => {
        return client.path("/Applications").get(shortcutOptions);
      },
      getApplicationInfo: (applicationId, shortcutOptions) => {
        return client.path("/Applications/{applicationId}", applicationId).get(shortcutOptions);
      },
      getApplicationHealth: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetHealth", applicationId)
          .get(shortcutOptions);
      },
      getApplicationHealthUsingPolicy: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetHealth", applicationId)
          .post(shortcutOptions);
      },
      reportApplicationHealth: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/ReportHealth", applicationId)
          .post(shortcutOptions);
      },
      startApplicationUpgrade: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/Upgrade", applicationId)
          .post(shortcutOptions);
      },
      getApplicationUpgrade: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetUpgradeProgress", applicationId)
          .get(shortcutOptions);
      },
      updateApplicationUpgrade: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/UpdateUpgrade", applicationId)
          .post(shortcutOptions);
      },
      updateApplication: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/Update", applicationId)
          .post(shortcutOptions);
      },
      resumeApplicationUpgrade: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/MoveToNextUpgradeDomain", applicationId)
          .post(shortcutOptions);
      },
      rollbackApplicationUpgrade: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/RollbackUpgrade", applicationId)
          .post(shortcutOptions);
      },
      getDeployedApplicationInfoList: (nodeName, shortcutOptions) => {
        return client.path("/Nodes/{nodeName}/$/GetApplications", nodeName).get(shortcutOptions);
      },
      getDeployedApplicationInfo: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path("/Nodes/{nodeName}/$/GetApplications/{applicationId}", nodeName, applicationId)
          .get(shortcutOptions);
      },
      getDeployedApplicationHealth: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetHealth",
            nodeName,
            applicationId
          )
          .get(shortcutOptions);
      },
      getDeployedApplicationHealthUsingPolicy: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetHealth",
            nodeName,
            applicationId
          )
          .post(shortcutOptions);
      },
      reportDeployedApplicationHealth: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/ReportHealth",
            nodeName,
            applicationId
          )
          .post(shortcutOptions);
      },
      getApplicationManifest: (applicationTypeName, shortcutOptions) => {
        return client
          .path(
            "/ApplicationTypes/{applicationTypeName}/$/GetApplicationManifest",
            applicationTypeName
          )
          .get(shortcutOptions);
      },
      getServiceInfoList: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetServices", applicationId)
          .get(shortcutOptions);
      },
      getServiceInfo: (applicationId, serviceId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetServices/{serviceId}", applicationId, serviceId)
          .get(shortcutOptions);
      },
      getApplicationNameInfo: (serviceId, shortcutOptions) => {
        return client
          .path("/Services/{serviceId}/$/GetApplicationName", serviceId)
          .get(shortcutOptions);
      },
      createService: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetServices/$/Create", applicationId)
          .post(shortcutOptions);
      },
      createServiceFromTemplate: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetServices/$/CreateFromTemplate", applicationId)
          .post(shortcutOptions);
      },
      deleteService: (serviceId, shortcutOptions) => {
        return client.path("/Services/{serviceId}/$/Delete", serviceId).post(shortcutOptions);
      },
      updateService: (serviceId, shortcutOptions) => {
        return client.path("/Services/{serviceId}/$/Update", serviceId).post(shortcutOptions);
      },
      getServiceDescription: (serviceId, shortcutOptions) => {
        return client
          .path("/Services/{serviceId}/$/GetDescription", serviceId)
          .get(shortcutOptions);
      },
      getServiceHealth: (serviceId, shortcutOptions) => {
        return client.path("/Services/{serviceId}/$/GetHealth", serviceId).get(shortcutOptions);
      },
      getServiceHealthUsingPolicy: (serviceId, shortcutOptions) => {
        return client.path("/Services/{serviceId}/$/GetHealth", serviceId).post(shortcutOptions);
      },
      reportServiceHealth: (serviceId, shortcutOptions) => {
        return client.path("/Services/{serviceId}/$/ReportHealth", serviceId).post(shortcutOptions);
      },
      resolveService: (serviceId, shortcutOptions) => {
        return client
          .path("/Services/{serviceId}/$/ResolvePartition", serviceId)
          .get(shortcutOptions);
      },
      getUnplacedReplicaInformation: (serviceId, shortcutOptions) => {
        return client
          .path("/Services/{serviceId}/$/GetUnplacedReplicaInformation", serviceId)
          .get(shortcutOptions);
      },
      getLoadedPartitionInfoList: (shortcutOptions) => {
        return client.path("/$/GetLoadedPartitionInfoList").get(shortcutOptions);
      },
      getPartitionInfoList: (serviceId, shortcutOptions) => {
        return client.path("/Services/{serviceId}/$/GetPartitions", serviceId).get(shortcutOptions);
      },
      getPartitionInfo: (partitionId, shortcutOptions) => {
        return client.path("/Partitions/{partitionId}", partitionId).get(shortcutOptions);
      },
      getServiceNameInfo: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetServiceName", partitionId)
          .get(shortcutOptions);
      },
      getPartitionHealth: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetHealth", partitionId)
          .get(shortcutOptions);
      },
      getPartitionHealthUsingPolicy: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetHealth", partitionId)
          .post(shortcutOptions);
      },
      reportPartitionHealth: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/ReportHealth", partitionId)
          .post(shortcutOptions);
      },
      getPartitionLoadInformation: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetLoadInformation", partitionId)
          .get(shortcutOptions);
      },
      resetPartitionLoad: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/ResetLoad", partitionId)
          .post(shortcutOptions);
      },
      recoverPartition: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/Recover", partitionId)
          .post(shortcutOptions);
      },
      recoverServicePartitions: (serviceId, shortcutOptions) => {
        return client
          .path("/Services/$/{serviceId}/$/GetPartitions/$/Recover", serviceId)
          .post(shortcutOptions);
      },
      recoverSystemPartitions: (shortcutOptions) => {
        return client.path("/$/RecoverSystemPartitions").post(shortcutOptions);
      },
      recoverAllPartitions: (shortcutOptions) => {
        return client.path("/$/RecoverAllPartitions").post(shortcutOptions);
      },
      movePrimaryReplica: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/MovePrimaryReplica", partitionId)
          .post(shortcutOptions);
      },
      moveSecondaryReplica: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/MoveSecondaryReplica", partitionId)
          .post(shortcutOptions);
      },
      updatePartitionLoad: (shortcutOptions) => {
        return client.path("/$/UpdatePartitionLoad").post(shortcutOptions);
      },
      moveInstance: (serviceId, partitionId, shortcutOptions) => {
        return client
          .path(
            "/Services/{serviceId}/$/GetPartitions/{partitionId}/$/MoveInstance",
            serviceId,
            partitionId
          )
          .post(shortcutOptions);
      },
      moveAuxiliaryReplica: (serviceId, partitionId, shortcutOptions) => {
        return client
          .path(
            "/Services/{serviceId}/$/GetPartitions/{partitionId}/$/MoveAuxiliaryReplica",
            serviceId,
            partitionId
          )
          .post(shortcutOptions);
      },
      createRepairTask: (shortcutOptions) => {
        return client.path("/$/CreateRepairTask").post(shortcutOptions);
      },
      cancelRepairTask: (shortcutOptions) => {
        return client.path("/$/CancelRepairTask").post(shortcutOptions);
      },
      deleteRepairTask: (shortcutOptions) => {
        return client.path("/$/DeleteRepairTask").post(shortcutOptions);
      },
      getRepairTaskList: (shortcutOptions) => {
        return client.path("/$/GetRepairTaskList").get(shortcutOptions);
      },
      forceApproveRepairTask: (shortcutOptions) => {
        return client.path("/$/ForceApproveRepairTask").post(shortcutOptions);
      },
      updateRepairTaskHealthPolicy: (shortcutOptions) => {
        return client.path("/$/UpdateRepairTaskHealthPolicy").post(shortcutOptions);
      },
      updateRepairExecutionState: (shortcutOptions) => {
        return client.path("/$/UpdateRepairExecutionState").post(shortcutOptions);
      },
      getReplicaInfoList: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetReplicas", partitionId)
          .get(shortcutOptions);
      },
      getReplicaInfo: (partitionId, replicaId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetReplicas/{replicaId}", partitionId, replicaId)
          .get(shortcutOptions);
      },
      getReplicaHealth: (partitionId, replicaId, shortcutOptions) => {
        return client
          .path(
            "/Partitions/{partitionId}/$/GetReplicas/{replicaId}/$/GetHealth",
            partitionId,
            replicaId
          )
          .get(shortcutOptions);
      },
      getReplicaHealthUsingPolicy: (partitionId, replicaId, shortcutOptions) => {
        return client
          .path(
            "/Partitions/{partitionId}/$/GetReplicas/{replicaId}/$/GetHealth",
            partitionId,
            replicaId
          )
          .post(shortcutOptions);
      },
      reportReplicaHealth: (partitionId, replicaId, shortcutOptions) => {
        return client
          .path(
            "/Partitions/{partitionId}/$/GetReplicas/{replicaId}/$/ReportHealth",
            partitionId,
            replicaId
          )
          .post(shortcutOptions);
      },
      getDeployedServiceReplicaInfoList: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetReplicas",
            nodeName,
            applicationId
          )
          .get(shortcutOptions);
      },
      getDeployedServiceReplicaDetailInfo: (nodeName, partitionId, replicaId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas/{replicaId}/$/GetDetail",
            nodeName,
            partitionId,
            replicaId
          )
          .get(shortcutOptions);
      },
      getDeployedServiceReplicaDetailInfoByPartitionId: (
        nodeName,
        partitionId,
        shortcutOptions
      ) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas",
            nodeName,
            partitionId
          )
          .get(shortcutOptions);
      },
      restartReplica: (nodeName, partitionId, replicaId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas/{replicaId}/$/Restart",
            nodeName,
            partitionId,
            replicaId
          )
          .post(shortcutOptions);
      },
      removeReplica: (nodeName, partitionId, replicaId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetPartitions/{partitionId}/$/GetReplicas/{replicaId}/$/Delete",
            nodeName,
            partitionId,
            replicaId
          )
          .post(shortcutOptions);
      },
      getDeployedServicePackageInfoList: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages",
            nodeName,
            applicationId
          )
          .get(shortcutOptions);
      },
      getDeployedServicePackageInfoListByName: (
        nodeName,
        applicationId,
        servicePackageName,
        shortcutOptions
      ) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}",
            nodeName,
            applicationId,
            servicePackageName
          )
          .get(shortcutOptions);
      },
      getDeployedServicePackageHealth: (
        nodeName,
        applicationId,
        servicePackageName,
        shortcutOptions
      ) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}/$/GetHealth",
            nodeName,
            applicationId,
            servicePackageName
          )
          .get(shortcutOptions);
      },
      getDeployedServicePackageHealthUsingPolicy: (
        nodeName,
        applicationId,
        servicePackageName,
        shortcutOptions
      ) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}/$/GetHealth",
            nodeName,
            applicationId,
            servicePackageName
          )
          .post(shortcutOptions);
      },
      reportDeployedServicePackageHealth: (
        nodeName,
        applicationId,
        servicePackageName,
        shortcutOptions
      ) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetServicePackages/{servicePackageName}/$/ReportHealth",
            nodeName,
            applicationId,
            servicePackageName
          )
          .post(shortcutOptions);
      },
      deployServicePackageToNode: (nodeName, shortcutOptions) => {
        return client
          .path("/Nodes/{nodeName}/$/DeployServicePackage", nodeName)
          .post(shortcutOptions);
      },
      getDeployedCodePackageInfoList: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages",
            nodeName,
            applicationId
          )
          .get(shortcutOptions);
      },
      restartDeployedCodePackage: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages/$/Restart",
            nodeName,
            applicationId
          )
          .post(shortcutOptions);
      },
      getContainerLogsDeployedOnNode: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages/$/ContainerLogs",
            nodeName,
            applicationId
          )
          .get(shortcutOptions);
      },
      invokeContainerApi: (nodeName, applicationId, shortcutOptions) => {
        return client
          .path(
            "/Nodes/{nodeName}/$/GetApplications/{applicationId}/$/GetCodePackages/$/ContainerApi",
            nodeName,
            applicationId
          )
          .post(shortcutOptions);
      },
      createComposeDeployment: (shortcutOptions) => {
        return client.path("/ComposeDeployments/$/Create").put(shortcutOptions);
      },
      getComposeDeploymentStatus: (deploymentName, shortcutOptions) => {
        return client
          .path("/ComposeDeployments/{deploymentName}", deploymentName)
          .get(shortcutOptions);
      },
      getComposeDeploymentStatusList: (shortcutOptions) => {
        return client.path("/ComposeDeployments").get(shortcutOptions);
      },
      getComposeDeploymentUpgradeProgress: (deploymentName, shortcutOptions) => {
        return client
          .path("/ComposeDeployments/{deploymentName}/$/GetUpgradeProgress", deploymentName)
          .get(shortcutOptions);
      },
      removeComposeDeployment: (deploymentName, shortcutOptions) => {
        return client
          .path("/ComposeDeployments/{deploymentName}/$/Delete", deploymentName)
          .post(shortcutOptions);
      },
      startComposeDeploymentUpgrade: (deploymentName, shortcutOptions) => {
        return client
          .path("/ComposeDeployments/{deploymentName}/$/Upgrade", deploymentName)
          .post(shortcutOptions);
      },
      startRollbackComposeDeploymentUpgrade: (deploymentName, shortcutOptions) => {
        return client
          .path("/ComposeDeployments/{deploymentName}/$/RollbackUpgrade", deploymentName)
          .post(shortcutOptions);
      },
      getChaos: (shortcutOptions) => {
        return client.path("/Tools/Chaos").get(shortcutOptions);
      },
      startChaos: (shortcutOptions) => {
        return client.path("/Tools/Chaos/$/Start").post(shortcutOptions);
      },
      stopChaos: (shortcutOptions) => {
        return client.path("/Tools/Chaos/$/Stop").post(shortcutOptions);
      },
      getChaosEvents: (shortcutOptions) => {
        return client.path("/Tools/Chaos/Events").get(shortcutOptions);
      },
      getChaosSchedule: (shortcutOptions) => {
        return client.path("/Tools/Chaos/Schedule").get(shortcutOptions);
      },
      postChaosSchedule: (shortcutOptions) => {
        return client.path("/Tools/Chaos/Schedule").post(shortcutOptions);
      },
      uploadFile: (contentPath, shortcutOptions) => {
        return client.path("/ImageStore/{contentPath}", contentPath).put(shortcutOptions);
      },
      getImageStoreContent: (contentPath, shortcutOptions) => {
        return client.path("/ImageStore/{contentPath}", contentPath).get(shortcutOptions);
      },
      deleteImageStoreContent: (contentPath, shortcutOptions) => {
        return client.path("/ImageStore/{contentPath}", contentPath).delete(shortcutOptions);
      },
      getImageStoreRootContent: (shortcutOptions) => {
        return client.path("/ImageStore").get(shortcutOptions);
      },
      copyImageStoreContent: (shortcutOptions) => {
        return client.path("/ImageStore/$/Copy").post(shortcutOptions);
      },
      deleteImageStoreUploadSession: (shortcutOptions) => {
        return client.path("/ImageStore/$/DeleteUploadSession").delete(shortcutOptions);
      },
      commitImageStoreUploadSession: (shortcutOptions) => {
        return client.path("/ImageStore/$/CommitUploadSession").post(shortcutOptions);
      },
      getImageStoreUploadSessionById: (shortcutOptions) => {
        return client.path("/ImageStore/$/GetUploadSession").get(shortcutOptions);
      },
      getImageStoreUploadSessionByPath: (contentPath, shortcutOptions) => {
        return client
          .path("/ImageStore/{contentPath}/$/GetUploadSession", contentPath)
          .get(shortcutOptions);
      },
      uploadFileChunk: (contentPath, shortcutOptions) => {
        return client
          .path("/ImageStore/{contentPath}/$/UploadChunk", contentPath)
          .put(shortcutOptions);
      },
      getImageStoreRootFolderSize: (shortcutOptions) => {
        return client.path("/ImageStore/$/FolderSize").get(shortcutOptions);
      },
      getImageStoreFolderSize: (contentPath, shortcutOptions) => {
        return client
          .path("/ImageStore/{contentPath}/$/FolderSize", contentPath)
          .get(shortcutOptions);
      },
      getImageStoreInfo: (shortcutOptions) => {
        return client.path("/ImageStore/$/Info").get(shortcutOptions);
      },
      invokeInfrastructureCommand: (shortcutOptions) => {
        return client.path("/$/InvokeInfrastructureCommand").post(shortcutOptions);
      },
      invokeInfrastructureQuery: (shortcutOptions) => {
        return client.path("/$/InvokeInfrastructureQuery").get(shortcutOptions);
      },
      startDataLoss: (serviceId, partitionId, shortcutOptions) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/StartDataLoss",
            serviceId,
            partitionId
          )
          .post(shortcutOptions);
      },
      getDataLossProgress: (serviceId, partitionId, shortcutOptions) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/GetDataLossProgress",
            serviceId,
            partitionId
          )
          .get(shortcutOptions);
      },
      startQuorumLoss: (serviceId, partitionId, shortcutOptions) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/StartQuorumLoss",
            serviceId,
            partitionId
          )
          .post(shortcutOptions);
      },
      getQuorumLossProgress: (serviceId, partitionId, shortcutOptions) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/GetQuorumLossProgress",
            serviceId,
            partitionId
          )
          .get(shortcutOptions);
      },
      startPartitionRestart: (serviceId, partitionId, shortcutOptions) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/StartRestart",
            serviceId,
            partitionId
          )
          .post(shortcutOptions);
      },
      getPartitionRestartProgress: (serviceId, partitionId, shortcutOptions) => {
        return client
          .path(
            "/Faults/Services/{serviceId}/$/GetPartitions/{partitionId}/$/GetRestartProgress",
            serviceId,
            partitionId
          )
          .get(shortcutOptions);
      },
      startNodeTransition: (nodeName, shortcutOptions) => {
        return client
          .path("/Faults/Nodes/{nodeName}/$/StartTransition/", nodeName)
          .post(shortcutOptions);
      },
      getNodeTransitionProgress: (nodeName, shortcutOptions) => {
        return client
          .path("/Faults/Nodes/{nodeName}/$/GetTransitionProgress", nodeName)
          .get(shortcutOptions);
      },
      getFaultOperationList: (shortcutOptions) => {
        return client.path("/Faults/").get(shortcutOptions);
      },
      cancelOperation: (shortcutOptions) => {
        return client.path("/Faults/$/Cancel").post(shortcutOptions);
      },
      createBackupPolicy: (shortcutOptions) => {
        return client.path("/BackupRestore/BackupPolicies/$/Create").post(shortcutOptions);
      },
      deleteBackupPolicy: (backupPolicyName, shortcutOptions) => {
        return client
          .path("/BackupRestore/BackupPolicies/{backupPolicyName}/$/Delete", backupPolicyName)
          .post(shortcutOptions);
      },
      getBackupPolicyList: (shortcutOptions) => {
        return client.path("/BackupRestore/BackupPolicies").get(shortcutOptions);
      },
      getBackupPolicyByName: (backupPolicyName, shortcutOptions) => {
        return client
          .path("/BackupRestore/BackupPolicies/{backupPolicyName}", backupPolicyName)
          .get(shortcutOptions);
      },
      getAllEntitiesBackedUpByPolicy: (backupPolicyName, shortcutOptions) => {
        return client
          .path(
            "/BackupRestore/BackupPolicies/{backupPolicyName}/$/GetBackupEnabledEntities",
            backupPolicyName
          )
          .get(shortcutOptions);
      },
      updateBackupPolicy: (backupPolicyName, shortcutOptions) => {
        return client
          .path("/BackupRestore/BackupPolicies/{backupPolicyName}/$/Update", backupPolicyName)
          .post(shortcutOptions);
      },
      enableApplicationBackup: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/EnableBackup", applicationId)
          .post(shortcutOptions);
      },
      disableApplicationBackup: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/DisableBackup", applicationId)
          .post(shortcutOptions);
      },
      getApplicationBackupConfigurationInfo: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetBackupConfigurationInfo", applicationId)
          .get(shortcutOptions);
      },
      getApplicationBackupList: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/GetBackups", applicationId)
          .get(shortcutOptions);
      },
      suspendApplicationBackup: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/SuspendBackup", applicationId)
          .post(shortcutOptions);
      },
      resumeApplicationBackup: (applicationId, shortcutOptions) => {
        return client
          .path("/Applications/{applicationId}/$/ResumeBackup", applicationId)
          .post(shortcutOptions);
      },
      enableServiceBackup: (serviceId, shortcutOptions) => {
        return client.path("/Services/{serviceId}/$/EnableBackup", serviceId).post(shortcutOptions);
      },
      disableServiceBackup: (serviceId, shortcutOptions) => {
        return client
          .path("/Services/{serviceId}/$/DisableBackup", serviceId)
          .post(shortcutOptions);
      },
      getServiceBackupConfigurationInfo: (serviceId, shortcutOptions) => {
        return client
          .path("/Services/{serviceId}/$/GetBackupConfigurationInfo", serviceId)
          .get(shortcutOptions);
      },
      getServiceBackupList: (serviceId, shortcutOptions) => {
        return client.path("/Services/{serviceId}/$/GetBackups", serviceId).get(shortcutOptions);
      },
      suspendServiceBackup: (serviceId, shortcutOptions) => {
        return client
          .path("/Services/{serviceId}/$/SuspendBackup", serviceId)
          .post(shortcutOptions);
      },
      resumeServiceBackup: (serviceId, shortcutOptions) => {
        return client.path("/Services/{serviceId}/$/ResumeBackup", serviceId).post(shortcutOptions);
      },
      enablePartitionBackup: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/EnableBackup", partitionId)
          .post(shortcutOptions);
      },
      disablePartitionBackup: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/DisableBackup", partitionId)
          .post(shortcutOptions);
      },
      getPartitionBackupConfigurationInfo: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetBackupConfigurationInfo", partitionId)
          .get(shortcutOptions);
      },
      getPartitionBackupList: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetBackups", partitionId)
          .get(shortcutOptions);
      },
      suspendPartitionBackup: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/SuspendBackup", partitionId)
          .post(shortcutOptions);
      },
      resumePartitionBackup: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/ResumeBackup", partitionId)
          .post(shortcutOptions);
      },
      backupPartition: (partitionId, shortcutOptions) => {
        return client.path("/Partitions/{partitionId}/$/Backup", partitionId).post(shortcutOptions);
      },
      getPartitionBackupProgress: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetBackupProgress", partitionId)
          .get(shortcutOptions);
      },
      restorePartition: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/Restore", partitionId)
          .post(shortcutOptions);
      },
      getPartitionRestoreProgress: (partitionId, shortcutOptions) => {
        return client
          .path("/Partitions/{partitionId}/$/GetRestoreProgress", partitionId)
          .get(shortcutOptions);
      },
      getBackupsFromBackupLocation: (shortcutOptions) => {
        return client.path("/BackupRestore/$/GetBackups").post(shortcutOptions);
      },
      createName: (shortcutOptions) => {
        return client.path("/Names/$/Create").post(shortcutOptions);
      },
      getNameExistsInfo: (nameId, shortcutOptions) => {
        return client.path("/Names/{nameId}", nameId).get(shortcutOptions);
      },
      deleteName: (nameId, shortcutOptions) => {
        return client.path("/Names/{nameId}", nameId).delete(shortcutOptions);
      },
      getSubNameInfoList: (nameId, shortcutOptions) => {
        return client.path("/Names/{nameId}/$/GetSubNames", nameId).get(shortcutOptions);
      },
      getPropertyInfoList: (nameId, shortcutOptions) => {
        return client.path("/Names/{nameId}/$/GetProperties", nameId).get(shortcutOptions);
      },
      putProperty: (nameId, shortcutOptions) => {
        return client.path("/Names/{nameId}/$/GetProperty", nameId).put(shortcutOptions);
      },
      getPropertyInfo: (nameId, shortcutOptions) => {
        return client.path("/Names/{nameId}/$/GetProperty", nameId).get(shortcutOptions);
      },
      deleteProperty: (nameId, shortcutOptions) => {
        return client.path("/Names/{nameId}/$/GetProperty", nameId).delete(shortcutOptions);
      },
      submitPropertyBatch: (nameId, shortcutOptions) => {
        return client
          .path("/Names/{nameId}/$/GetProperties/$/SubmitBatch", nameId)
          .post(shortcutOptions);
      },
      getClusterEventList: (shortcutOptions) => {
        return client.path("/EventsStore/Cluster/Events").get(shortcutOptions);
      },
      getContainersEventList: (shortcutOptions) => {
        return client.path("/EventsStore/Containers/Events").get(shortcutOptions);
      },
      getNodeEventList: (nodeName, shortcutOptions) => {
        return client.path("/EventsStore/Nodes/{nodeName}/$/Events", nodeName).get(shortcutOptions);
      },
      getNodesEventList: (shortcutOptions) => {
        return client.path("/EventsStore/Nodes/Events").get(shortcutOptions);
      },
      getApplicationEventList: (applicationId, shortcutOptions) => {
        return client
          .path("/EventsStore/Applications/{applicationId}/$/Events", applicationId)
          .get(shortcutOptions);
      },
      getApplicationsEventList: (shortcutOptions) => {
        return client.path("/EventsStore/Applications/Events").get(shortcutOptions);
      },
      getServiceEventList: (serviceId, shortcutOptions) => {
        return client
          .path("/EventsStore/Services/{serviceId}/$/Events", serviceId)
          .get(shortcutOptions);
      },
      getServicesEventList: (shortcutOptions) => {
        return client.path("/EventsStore/Services/Events").get(shortcutOptions);
      },
      getPartitionEventList: (partitionId, shortcutOptions) => {
        return client
          .path("/EventsStore/Partitions/{partitionId}/$/Events", partitionId)
          .get(shortcutOptions);
      },
      getPartitionsEventList: (shortcutOptions) => {
        return client.path("/EventsStore/Partitions/Events").get(shortcutOptions);
      },
      getPartitionReplicaEventList: (partitionId, replicaId, shortcutOptions) => {
        return client
          .path(
            "/EventsStore/Partitions/{partitionId}/$/Replicas/{replicaId}/$/Events",
            partitionId,
            replicaId
          )
          .get(shortcutOptions);
      },
      getPartitionReplicasEventList: (partitionId, shortcutOptions) => {
        return client
          .path("/EventsStore/Partitions/{partitionId}/$/Replicas/Events", partitionId)
          .get(shortcutOptions);
      },
      getCorrelatedEventList: (eventInstanceId, shortcutOptions) => {
        return client
          .path("/EventsStore/CorrelatedEvents/{eventInstanceId}/$/Events", eventInstanceId)
          .get(shortcutOptions);
      },
    },
    meshSecret: {
      createOrUpdate: (secretResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Secrets/{secretResourceName}", secretResourceName)
          .put(shortcutOptions);
      },
      get: (secretResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Secrets/{secretResourceName}", secretResourceName)
          .get(shortcutOptions);
      },
      delete: (secretResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Secrets/{secretResourceName}", secretResourceName)
          .delete(shortcutOptions);
      },
      list: (shortcutOptions) => {
        return client.path("/Resources/Secrets").get(shortcutOptions);
      },
    },
    meshSecretValue: {
      addValue: (secretResourceName, secretValueResourceName, shortcutOptions) => {
        return client
          .path(
            "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}",
            secretResourceName,
            secretValueResourceName
          )
          .put(shortcutOptions);
      },
      get: (secretResourceName, secretValueResourceName, shortcutOptions) => {
        return client
          .path(
            "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}",
            secretResourceName,
            secretValueResourceName
          )
          .get(shortcutOptions);
      },
      delete: (secretResourceName, secretValueResourceName, shortcutOptions) => {
        return client
          .path(
            "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}",
            secretResourceName,
            secretValueResourceName
          )
          .delete(shortcutOptions);
      },
      list: (secretResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Secrets/{secretResourceName}/values", secretResourceName)
          .get(shortcutOptions);
      },
      show: (secretResourceName, secretValueResourceName, shortcutOptions) => {
        return client
          .path(
            "/Resources/Secrets/{secretResourceName}/values/{secretValueResourceName}/list_value",
            secretResourceName,
            secretValueResourceName
          )
          .post(shortcutOptions);
      },
    },
    meshVolume: {
      createOrUpdate: (volumeResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Volumes/{volumeResourceName}", volumeResourceName)
          .put(shortcutOptions);
      },
      get: (volumeResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Volumes/{volumeResourceName}", volumeResourceName)
          .get(shortcutOptions);
      },
      delete: (volumeResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Volumes/{volumeResourceName}", volumeResourceName)
          .delete(shortcutOptions);
      },
      list: (shortcutOptions) => {
        return client.path("/Resources/Volumes").get(shortcutOptions);
      },
    },
    meshNetwork: {
      createOrUpdate: (networkResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Networks/{networkResourceName}", networkResourceName)
          .put(shortcutOptions);
      },
      get: (networkResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Networks/{networkResourceName}", networkResourceName)
          .get(shortcutOptions);
      },
      delete: (networkResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Networks/{networkResourceName}", networkResourceName)
          .delete(shortcutOptions);
      },
      list: (shortcutOptions) => {
        return client.path("/Resources/Networks").get(shortcutOptions);
      },
    },
    meshApplication: {
      createOrUpdate: (applicationResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Applications/{applicationResourceName}", applicationResourceName)
          .put(shortcutOptions);
      },
      get: (applicationResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Applications/{applicationResourceName}", applicationResourceName)
          .get(shortcutOptions);
      },
      delete: (applicationResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Applications/{applicationResourceName}", applicationResourceName)
          .delete(shortcutOptions);
      },
      list: (shortcutOptions) => {
        return client.path("/Resources/Applications").get(shortcutOptions);
      },
      getUpgradeProgress: (applicationResourceName, shortcutOptions) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/$/GetUpgradeProgress",
            applicationResourceName
          )
          .get(shortcutOptions);
      },
    },
    meshService: {
      get: (applicationResourceName, serviceResourceName, shortcutOptions) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}",
            applicationResourceName,
            serviceResourceName
          )
          .get(shortcutOptions);
      },
      list: (applicationResourceName, shortcutOptions) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services",
            applicationResourceName
          )
          .get(shortcutOptions);
      },
    },
    meshCodePackage: {
      getContainerLogs: (
        applicationResourceName,
        serviceResourceName,
        replicaName,
        codePackageName,
        shortcutOptions
      ) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}/Replicas/{replicaName}/CodePackages/{codePackageName}/Logs",
            applicationResourceName,
            serviceResourceName,
            replicaName,
            codePackageName
          )
          .get(shortcutOptions);
      },
    },
    meshServiceReplica: {
      get: (applicationResourceName, serviceResourceName, replicaName, shortcutOptions) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}/Replicas/{replicaName}",
            applicationResourceName,
            serviceResourceName,
            replicaName
          )
          .get(shortcutOptions);
      },
      list: (applicationResourceName, serviceResourceName, shortcutOptions) => {
        return client
          .path(
            "/Resources/Applications/{applicationResourceName}/Services/{serviceResourceName}/Replicas",
            applicationResourceName,
            serviceResourceName
          )
          .get(shortcutOptions);
      },
    },
    meshGateway: {
      createOrUpdate: (gatewayResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Gateways/{gatewayResourceName}", gatewayResourceName)
          .put(shortcutOptions);
      },
      get: (gatewayResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Gateways/{gatewayResourceName}", gatewayResourceName)
          .get(shortcutOptions);
      },
      delete: (gatewayResourceName, shortcutOptions) => {
        return client
          .path("/Resources/Gateways/{gatewayResourceName}", gatewayResourceName)
          .delete(shortcutOptions);
      },
      list: (shortcutOptions) => {
        return client.path("/Resources/Gateways").get(shortcutOptions);
      },
    },
  };
}

export default ServiceFabric;
