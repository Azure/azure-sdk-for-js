// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The security connector resource. */
export interface SecurityConnectorsAPISecurityConnector extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Kind of the resource */
  kind?: string;
  /** Entity tag is used for comparing two or more entities from the same requested resource. */
  etag?: string;
  /** The multi cloud resource identifier (account id in case of AWS connector, project number in case of GCP connector). */
  hierarchyIdentifier?: string;
  /** The date on which the trial period will end, if applicable. Trial period exists for 30 days after upgrading to payed offerings. */
  readonly hierarchyIdentifierTrialEndDate?: Date;
  /** The multi cloud resource's cloud name. */
  environmentName?: SecurityConnectorsAPICloudName;
  /** A collection of offerings for the security connector. */
  offerings?: SecurityConnectorsAPIcloudOfferingUnion[];
  /** The security connector environment data. */
  environmentData?: SecurityConnectorsAPIEnvironmentDataUnion;
}

export function securityConnectorsAPISecurityConnectorSerializer(
  item: SecurityConnectorsAPISecurityConnector,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "hierarchyIdentifier",
      "environmentName",
      "offerings",
      "environmentData",
    ])
      ? undefined
      : _securityConnectorPropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

export function securityConnectorsAPISecurityConnectorDeserializer(
  item: any,
): SecurityConnectorsAPISecurityConnector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securityConnectorPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** A set of properties that defines the security connector configuration. */
export interface SecurityConnectorsAPISecurityConnectorProperties {
  /** The multi cloud resource identifier (account id in case of AWS connector, project number in case of GCP connector). */
  hierarchyIdentifier?: string;
  /** The date on which the trial period will end, if applicable. Trial period exists for 30 days after upgrading to payed offerings. */
  readonly hierarchyIdentifierTrialEndDate?: Date;
  /** The multi cloud resource's cloud name. */
  environmentName?: SecurityConnectorsAPICloudName;
  /** A collection of offerings for the security connector. */
  offerings?: SecurityConnectorsAPIcloudOfferingUnion[];
  /** The security connector environment data. */
  environmentData?: SecurityConnectorsAPIEnvironmentDataUnion;
}

export function securityConnectorsAPISecurityConnectorPropertiesSerializer(
  item: SecurityConnectorsAPISecurityConnectorProperties,
): any {
  return {
    hierarchyIdentifier: item["hierarchyIdentifier"],
    environmentName: item["environmentName"],
    offerings: !item["offerings"]
      ? item["offerings"]
      : securityConnectorsAPIcloudOfferingUnionArraySerializer(item["offerings"]),
    environmentData: !item["environmentData"]
      ? item["environmentData"]
      : securityConnectorsAPIEnvironmentDataUnionSerializer(item["environmentData"]),
  };
}

export function securityConnectorsAPISecurityConnectorPropertiesDeserializer(
  item: any,
): SecurityConnectorsAPISecurityConnectorProperties {
  return {
    hierarchyIdentifier: item["hierarchyIdentifier"],
    hierarchyIdentifierTrialEndDate: !item["hierarchyIdentifierTrialEndDate"]
      ? item["hierarchyIdentifierTrialEndDate"]
      : new Date(item["hierarchyIdentifierTrialEndDate"]),
    environmentName: item["environmentName"],
    offerings: !item["offerings"]
      ? item["offerings"]
      : securityConnectorsAPIcloudOfferingUnionArrayDeserializer(item["offerings"]),
    environmentData: !item["environmentData"]
      ? item["environmentData"]
      : securityConnectorsAPIEnvironmentDataUnionDeserializer(item["environmentData"]),
  };
}

/** The multi cloud resource's cloud name. */
export enum KnownSecurityConnectorsAPICloudName {
  /** Azure */
  Azure = "Azure",
  /** AWS */
  AWS = "AWS",
  /** GCP */
  GCP = "GCP",
  /** Github */
  Github = "Github",
  /** AzureDevOps */
  AzureDevOps = "AzureDevOps",
  /** GitLab */
  GitLab = "GitLab",
  /** DockerHub */
  DockerHub = "DockerHub",
  /** JFrog */
  JFrog = "JFrog",
}

/**
 * The multi cloud resource's cloud name. \
 * {@link KnownSecurityConnectorsAPICloudName} can be used interchangeably with SecurityConnectorsAPICloudName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure**: Azure \
 * **AWS**: AWS \
 * **GCP**: GCP \
 * **Github**: Github \
 * **AzureDevOps**: AzureDevOps \
 * **GitLab**: GitLab \
 * **DockerHub**: DockerHub \
 * **JFrog**: JFrog
 */
export type SecurityConnectorsAPICloudName = string;

export function securityConnectorsAPIcloudOfferingUnionArraySerializer(
  result: Array<SecurityConnectorsAPIcloudOfferingUnion>,
): any[] {
  return result.map((item) => {
    return securityConnectorsAPIcloudOfferingUnionSerializer(item);
  });
}

export function securityConnectorsAPIcloudOfferingUnionArrayDeserializer(
  result: Array<SecurityConnectorsAPIcloudOfferingUnion>,
): any[] {
  return result.map((item) => {
    return securityConnectorsAPIcloudOfferingUnionDeserializer(item);
  });
}

/** The security offering details */
export interface SecurityConnectorsAPIcloudOffering {
  /** The type of the security offering. */
  /** The discriminator possible values: CspmMonitorAws, DefenderForContainersAws, DefenderForServersAws, DefenderForDatabasesAws, CspmMonitorGcp, DefenderForServersGcp, DefenderForDatabasesGcp, DefenderForContainersGcp, CspmMonitorGithub, CspmMonitorAzureDevOps, DefenderCspmAws, DefenderCspmGcp, CspmMonitorGitLab, CspmMonitorDockerHub, DefenderForContainersDockerHub, DefenderCspmDockerHub, CspmMonitorJFrog, DefenderForContainersJFrog, DefenderCspmJFrog */
  offeringType: SecurityConnectorsAPIOfferingType;
  /** The offering description. */
  readonly description?: string;
}

export function securityConnectorsAPIcloudOfferingSerializer(
  item: SecurityConnectorsAPIcloudOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function securityConnectorsAPIcloudOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIcloudOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** Alias for SecurityConnectorsAPIcloudOfferingUnion */
export type SecurityConnectorsAPIcloudOfferingUnion =
  | SecurityConnectorsAPIcspmMonitorAwsOffering
  | SecurityConnectorsAPIdefenderForContainersAwsOffering
  | SecurityConnectorsAPIdefenderForServersAwsOffering
  | SecurityConnectorsAPIdefenderFoDatabasesAwsOffering
  | SecurityConnectorsAPIcspmMonitorGcpOffering
  | SecurityConnectorsAPIdefenderForServersGcpOffering
  | SecurityConnectorsAPIdefenderForDatabasesGcpOffering
  | SecurityConnectorsAPIdefenderForContainersGcpOffering
  | SecurityConnectorsAPIcspmMonitorGithubOffering
  | SecurityConnectorsAPIcspmMonitorAzureDevOpsOffering
  | SecurityConnectorsAPIdefenderCspmAwsOffering
  | SecurityConnectorsAPIdefenderCspmGcpOffering
  | SecurityConnectorsAPIcspmMonitorGitLabOffering
  | SecurityConnectorsAPIcspmMonitorDockerHubOffering
  | SecurityConnectorsAPIdefenderForContainersDockerHubOffering
  | SecurityConnectorsAPIdefenderCspmDockerHubOffering
  | SecurityConnectorsAPIcspmMonitorJFrogOffering
  | SecurityConnectorsAPIdefenderForContainersJFrogOffering
  | SecurityConnectorsAPIdefenderCspmJFrogOffering
  | SecurityConnectorsAPIcloudOffering;

export function securityConnectorsAPIcloudOfferingUnionSerializer(
  item: SecurityConnectorsAPIcloudOfferingUnion,
): any {
  switch (item.offeringType) {
    case "CspmMonitorAws":
      return securityConnectorsAPIcspmMonitorAwsOfferingSerializer(
        item as SecurityConnectorsAPIcspmMonitorAwsOffering,
      );

    case "DefenderForContainersAws":
      return securityConnectorsAPIdefenderForContainersAwsOfferingSerializer(
        item as SecurityConnectorsAPIdefenderForContainersAwsOffering,
      );

    case "DefenderForServersAws":
      return securityConnectorsAPIdefenderForServersAwsOfferingSerializer(
        item as SecurityConnectorsAPIdefenderForServersAwsOffering,
      );

    case "DefenderForDatabasesAws":
      return securityConnectorsAPIdefenderFoDatabasesAwsOfferingSerializer(
        item as SecurityConnectorsAPIdefenderFoDatabasesAwsOffering,
      );

    case "CspmMonitorGcp":
      return securityConnectorsAPIcspmMonitorGcpOfferingSerializer(
        item as SecurityConnectorsAPIcspmMonitorGcpOffering,
      );

    case "DefenderForServersGcp":
      return securityConnectorsAPIdefenderForServersGcpOfferingSerializer(
        item as SecurityConnectorsAPIdefenderForServersGcpOffering,
      );

    case "DefenderForDatabasesGcp":
      return securityConnectorsAPIdefenderForDatabasesGcpOfferingSerializer(
        item as SecurityConnectorsAPIdefenderForDatabasesGcpOffering,
      );

    case "DefenderForContainersGcp":
      return securityConnectorsAPIdefenderForContainersGcpOfferingSerializer(
        item as SecurityConnectorsAPIdefenderForContainersGcpOffering,
      );

    case "CspmMonitorGithub":
      return securityConnectorsAPIcspmMonitorGithubOfferingSerializer(
        item as SecurityConnectorsAPIcspmMonitorGithubOffering,
      );

    case "CspmMonitorAzureDevOps":
      return securityConnectorsAPIcspmMonitorAzureDevOpsOfferingSerializer(
        item as SecurityConnectorsAPIcspmMonitorAzureDevOpsOffering,
      );

    case "DefenderCspmAws":
      return securityConnectorsAPIdefenderCspmAwsOfferingSerializer(
        item as SecurityConnectorsAPIdefenderCspmAwsOffering,
      );

    case "DefenderCspmGcp":
      return securityConnectorsAPIdefenderCspmGcpOfferingSerializer(
        item as SecurityConnectorsAPIdefenderCspmGcpOffering,
      );

    case "CspmMonitorGitLab":
      return securityConnectorsAPIcspmMonitorGitLabOfferingSerializer(
        item as SecurityConnectorsAPIcspmMonitorGitLabOffering,
      );

    case "CspmMonitorDockerHub":
      return securityConnectorsAPIcspmMonitorDockerHubOfferingSerializer(
        item as SecurityConnectorsAPIcspmMonitorDockerHubOffering,
      );

    case "DefenderForContainersDockerHub":
      return securityConnectorsAPIdefenderForContainersDockerHubOfferingSerializer(
        item as SecurityConnectorsAPIdefenderForContainersDockerHubOffering,
      );

    case "DefenderCspmDockerHub":
      return securityConnectorsAPIdefenderCspmDockerHubOfferingSerializer(
        item as SecurityConnectorsAPIdefenderCspmDockerHubOffering,
      );

    case "CspmMonitorJFrog":
      return securityConnectorsAPIcspmMonitorJFrogOfferingSerializer(
        item as SecurityConnectorsAPIcspmMonitorJFrogOffering,
      );

    case "DefenderForContainersJFrog":
      return securityConnectorsAPIdefenderForContainersJFrogOfferingSerializer(
        item as SecurityConnectorsAPIdefenderForContainersJFrogOffering,
      );

    case "DefenderCspmJFrog":
      return securityConnectorsAPIdefenderCspmJFrogOfferingSerializer(
        item as SecurityConnectorsAPIdefenderCspmJFrogOffering,
      );

    default:
      return securityConnectorsAPIcloudOfferingSerializer(item);
  }
}

export function securityConnectorsAPIcloudOfferingUnionDeserializer(
  item: any,
): SecurityConnectorsAPIcloudOfferingUnion {
  switch (item["offeringType"]) {
    case "CspmMonitorAws":
      return securityConnectorsAPIcspmMonitorAwsOfferingDeserializer(
        item as SecurityConnectorsAPIcspmMonitorAwsOffering,
      );

    case "DefenderForContainersAws":
      return securityConnectorsAPIdefenderForContainersAwsOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderForContainersAwsOffering,
      );

    case "DefenderForServersAws":
      return securityConnectorsAPIdefenderForServersAwsOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderForServersAwsOffering,
      );

    case "DefenderForDatabasesAws":
      return securityConnectorsAPIdefenderFoDatabasesAwsOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderFoDatabasesAwsOffering,
      );

    case "CspmMonitorGcp":
      return securityConnectorsAPIcspmMonitorGcpOfferingDeserializer(
        item as SecurityConnectorsAPIcspmMonitorGcpOffering,
      );

    case "DefenderForServersGcp":
      return securityConnectorsAPIdefenderForServersGcpOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderForServersGcpOffering,
      );

    case "DefenderForDatabasesGcp":
      return securityConnectorsAPIdefenderForDatabasesGcpOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderForDatabasesGcpOffering,
      );

    case "DefenderForContainersGcp":
      return securityConnectorsAPIdefenderForContainersGcpOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderForContainersGcpOffering,
      );

    case "CspmMonitorGithub":
      return securityConnectorsAPIcspmMonitorGithubOfferingDeserializer(
        item as SecurityConnectorsAPIcspmMonitorGithubOffering,
      );

    case "CspmMonitorAzureDevOps":
      return securityConnectorsAPIcspmMonitorAzureDevOpsOfferingDeserializer(
        item as SecurityConnectorsAPIcspmMonitorAzureDevOpsOffering,
      );

    case "DefenderCspmAws":
      return securityConnectorsAPIdefenderCspmAwsOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderCspmAwsOffering,
      );

    case "DefenderCspmGcp":
      return securityConnectorsAPIdefenderCspmGcpOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderCspmGcpOffering,
      );

    case "CspmMonitorGitLab":
      return securityConnectorsAPIcspmMonitorGitLabOfferingDeserializer(
        item as SecurityConnectorsAPIcspmMonitorGitLabOffering,
      );

    case "CspmMonitorDockerHub":
      return securityConnectorsAPIcspmMonitorDockerHubOfferingDeserializer(
        item as SecurityConnectorsAPIcspmMonitorDockerHubOffering,
      );

    case "DefenderForContainersDockerHub":
      return securityConnectorsAPIdefenderForContainersDockerHubOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderForContainersDockerHubOffering,
      );

    case "DefenderCspmDockerHub":
      return securityConnectorsAPIdefenderCspmDockerHubOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderCspmDockerHubOffering,
      );

    case "CspmMonitorJFrog":
      return securityConnectorsAPIcspmMonitorJFrogOfferingDeserializer(
        item as SecurityConnectorsAPIcspmMonitorJFrogOffering,
      );

    case "DefenderForContainersJFrog":
      return securityConnectorsAPIdefenderForContainersJFrogOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderForContainersJFrogOffering,
      );

    case "DefenderCspmJFrog":
      return securityConnectorsAPIdefenderCspmJFrogOfferingDeserializer(
        item as SecurityConnectorsAPIdefenderCspmJFrogOffering,
      );

    default:
      return securityConnectorsAPIcloudOfferingDeserializer(item);
  }
}

/** The type of the security offering. */
export enum KnownSecurityConnectorsAPIOfferingType {
  /** CspmMonitorAws */
  CspmMonitorAws = "CspmMonitorAws",
  /** DefenderForContainersAws */
  DefenderForContainersAws = "DefenderForContainersAws",
  /** DefenderForServersAws */
  DefenderForServersAws = "DefenderForServersAws",
  /** DefenderForDatabasesAws */
  DefenderForDatabasesAws = "DefenderForDatabasesAws",
  /** CspmMonitorGcp */
  CspmMonitorGcp = "CspmMonitorGcp",
  /** CspmMonitorGithub */
  CspmMonitorGithub = "CspmMonitorGithub",
  /** CspmMonitorAzureDevOps */
  CspmMonitorAzureDevOps = "CspmMonitorAzureDevOps",
  /** DefenderForServersGcp */
  DefenderForServersGcp = "DefenderForServersGcp",
  /** DefenderForContainersGcp */
  DefenderForContainersGcp = "DefenderForContainersGcp",
  /** DefenderForDatabasesGcp */
  DefenderForDatabasesGcp = "DefenderForDatabasesGcp",
  /** DefenderCspmAws */
  DefenderCspmAws = "DefenderCspmAws",
  /** DefenderCspmGcp */
  DefenderCspmGcp = "DefenderCspmGcp",
  /** CspmMonitorGitLab */
  CspmMonitorGitLab = "CspmMonitorGitLab",
  /** CspmMonitorDockerHub */
  CspmMonitorDockerHub = "CspmMonitorDockerHub",
  /** DefenderForContainersDockerHub */
  DefenderForContainersDockerHub = "DefenderForContainersDockerHub",
  /** DefenderCspmDockerHub */
  DefenderCspmDockerHub = "DefenderCspmDockerHub",
  /** CspmMonitorJFrog */
  CspmMonitorJFrog = "CspmMonitorJFrog",
  /** DefenderForContainersJFrog */
  DefenderForContainersJFrog = "DefenderForContainersJFrog",
  /** DefenderCspmJFrog */
  DefenderCspmJFrog = "DefenderCspmJFrog",
}

/**
 * The type of the security offering. \
 * {@link KnownSecurityConnectorsAPIOfferingType} can be used interchangeably with SecurityConnectorsAPIOfferingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CspmMonitorAws**: CspmMonitorAws \
 * **DefenderForContainersAws**: DefenderForContainersAws \
 * **DefenderForServersAws**: DefenderForServersAws \
 * **DefenderForDatabasesAws**: DefenderForDatabasesAws \
 * **CspmMonitorGcp**: CspmMonitorGcp \
 * **CspmMonitorGithub**: CspmMonitorGithub \
 * **CspmMonitorAzureDevOps**: CspmMonitorAzureDevOps \
 * **DefenderForServersGcp**: DefenderForServersGcp \
 * **DefenderForContainersGcp**: DefenderForContainersGcp \
 * **DefenderForDatabasesGcp**: DefenderForDatabasesGcp \
 * **DefenderCspmAws**: DefenderCspmAws \
 * **DefenderCspmGcp**: DefenderCspmGcp \
 * **CspmMonitorGitLab**: CspmMonitorGitLab \
 * **CspmMonitorDockerHub**: CspmMonitorDockerHub \
 * **DefenderForContainersDockerHub**: DefenderForContainersDockerHub \
 * **DefenderCspmDockerHub**: DefenderCspmDockerHub \
 * **CspmMonitorJFrog**: CspmMonitorJFrog \
 * **DefenderForContainersJFrog**: DefenderForContainersJFrog \
 * **DefenderCspmJFrog**: DefenderCspmJFrog
 */
export type SecurityConnectorsAPIOfferingType = string;

/** The CSPM monitoring for AWS offering */
export interface SecurityConnectorsAPIcspmMonitorAwsOffering extends SecurityConnectorsAPIcloudOffering {
  /** The native cloud connection configuration */
  nativeCloudConnection?: SecurityConnectorsAPICspmMonitorAwsOfferingNativeCloudConnection;
  /** The type of the security offering. */
  offeringType: "CspmMonitorAws";
}

export function securityConnectorsAPIcspmMonitorAwsOfferingSerializer(
  item: SecurityConnectorsAPIcspmMonitorAwsOffering,
): any {
  return {
    offeringType: item["offeringType"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : securityConnectorsAPICspmMonitorAwsOfferingNativeCloudConnectionSerializer(
          item["nativeCloudConnection"],
        ),
  };
}

export function securityConnectorsAPIcspmMonitorAwsOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIcspmMonitorAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : securityConnectorsAPICspmMonitorAwsOfferingNativeCloudConnectionDeserializer(
          item["nativeCloudConnection"],
        ),
  };
}

/** The native cloud connection configuration */
export interface SecurityConnectorsAPICspmMonitorAwsOfferingNativeCloudConnection {
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPICspmMonitorAwsOfferingNativeCloudConnectionSerializer(
  item: SecurityConnectorsAPICspmMonitorAwsOfferingNativeCloudConnection,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPICspmMonitorAwsOfferingNativeCloudConnectionDeserializer(
  item: any,
): SecurityConnectorsAPICspmMonitorAwsOfferingNativeCloudConnection {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Defender for Containers AWS offering */
export interface SecurityConnectorsAPIdefenderForContainersAwsOffering extends SecurityConnectorsAPIcloudOffering {
  /** The kubernetes service connection configuration */
  kubernetesService?: SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesService;
  /** The kubernetes data collection connection configuration */
  kubernetesDataCollection?: SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesDataCollection;
  /** The cloudwatch to kinesis connection configuration */
  cloudWatchToKinesis?: SecurityConnectorsAPIDefenderForContainersAwsOfferingCloudWatchToKinesis;
  /** The kinesis to s3 connection configuration */
  kinesisToS3?: SecurityConnectorsAPIDefenderForContainersAwsOfferingKinesisToS3;
  /** Is audit logs data collection enabled */
  enableAuditLogsAutoProvisioning?: boolean;
  /** Is Microsoft Defender for Cloud Kubernetes agent auto provisioning enabled */
  enableDefenderAgentAutoProvisioning?: boolean;
  /** Is Policy Kubernetes agent auto provisioning enabled */
  enablePolicyAgentAutoProvisioning?: boolean;
  /** The retention time in days of kube audit logs set on the CloudWatch log group */
  kubeAuditRetentionTime?: number;
  /** The externalId used by the data reader to prevent the confused deputy attack */
  dataCollectionExternalId?: string;
  /** The Microsoft Defender container image assessment configuration */
  mdcContainersImageAssessment?: SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersImageAssessment;
  /** The Microsoft Defender container agentless discovery K8s configuration */
  mdcContainersAgentlessDiscoveryK8S?: SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S;
  /** The Microsoft Defender for Container K8s VM host scanning configuration */
  vmScanners?: SecurityConnectorsAPIdefenderForContainersAwsOfferingVmScanners;
  /** The type of the security offering. */
  offeringType: "DefenderForContainersAws";
}

export function securityConnectorsAPIdefenderForContainersAwsOfferingSerializer(
  item: SecurityConnectorsAPIdefenderForContainersAwsOffering,
): any {
  return {
    offeringType: item["offeringType"],
    kubernetesService: !item["kubernetesService"]
      ? item["kubernetesService"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingKubernetesServiceSerializer(
          item["kubernetesService"],
        ),
    kubernetesDataCollection: !item["kubernetesDataCollection"]
      ? item["kubernetesDataCollection"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingKubernetesDataCollectionSerializer(
          item["kubernetesDataCollection"],
        ),
    cloudWatchToKinesis: !item["cloudWatchToKinesis"]
      ? item["cloudWatchToKinesis"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingCloudWatchToKinesisSerializer(
          item["cloudWatchToKinesis"],
        ),
    kinesisToS3: !item["kinesisToS3"]
      ? item["kinesisToS3"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingKinesisToS3Serializer(
          item["kinesisToS3"],
        ),
    enableAuditLogsAutoProvisioning: item["enableAuditLogsAutoProvisioning"],
    enableDefenderAgentAutoProvisioning: item["enableDefenderAgentAutoProvisioning"],
    enablePolicyAgentAutoProvisioning: item["enablePolicyAgentAutoProvisioning"],
    kubeAuditRetentionTime: item["kubeAuditRetentionTime"],
    dataCollectionExternalId: item["dataCollectionExternalId"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8s: !item["mdcContainersAgentlessDiscoveryK8S"]
      ? item["mdcContainersAgentlessDiscoveryK8S"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
          item["mdcContainersAgentlessDiscoveryK8S"],
        ),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderForContainersAwsOfferingVmScannersSerializer(
          item["vmScanners"],
        ),
  };
}

export function securityConnectorsAPIdefenderForContainersAwsOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForContainersAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    kubernetesService: !item["kubernetesService"]
      ? item["kubernetesService"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingKubernetesServiceDeserializer(
          item["kubernetesService"],
        ),
    kubernetesDataCollection: !item["kubernetesDataCollection"]
      ? item["kubernetesDataCollection"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingKubernetesDataCollectionDeserializer(
          item["kubernetesDataCollection"],
        ),
    cloudWatchToKinesis: !item["cloudWatchToKinesis"]
      ? item["cloudWatchToKinesis"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingCloudWatchToKinesisDeserializer(
          item["cloudWatchToKinesis"],
        ),
    kinesisToS3: !item["kinesisToS3"]
      ? item["kinesisToS3"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingKinesisToS3Deserializer(
          item["kinesisToS3"],
        ),
    enableAuditLogsAutoProvisioning: item["enableAuditLogsAutoProvisioning"],
    enableDefenderAgentAutoProvisioning: item["enableDefenderAgentAutoProvisioning"],
    enablePolicyAgentAutoProvisioning: item["enablePolicyAgentAutoProvisioning"],
    kubeAuditRetentionTime: item["kubeAuditRetentionTime"],
    dataCollectionExternalId: item["dataCollectionExternalId"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8S: !item["mdcContainersAgentlessDiscoveryK8s"]
      ? item["mdcContainersAgentlessDiscoveryK8s"]
      : securityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
          item["mdcContainersAgentlessDiscoveryK8s"],
        ),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderForContainersAwsOfferingVmScannersDeserializer(
          item["vmScanners"],
        ),
  };
}

/** The kubernetes service connection configuration */
export interface SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesService {
  /** The cloud role ARN in AWS for this feature used for provisioning resources */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingKubernetesServiceSerializer(
  item: SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesService,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingKubernetesServiceDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesService {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The kubernetes data collection connection configuration */
export interface SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesDataCollection {
  /** The cloud role ARN in AWS for this feature used for reading data */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingKubernetesDataCollectionSerializer(
  item: SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesDataCollection,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingKubernetesDataCollectionDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesDataCollection {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The cloudwatch to kinesis connection configuration */
export interface SecurityConnectorsAPIDefenderForContainersAwsOfferingCloudWatchToKinesis {
  /** The cloud role ARN in AWS used by CloudWatch to transfer data into Kinesis */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingCloudWatchToKinesisSerializer(
  item: SecurityConnectorsAPIDefenderForContainersAwsOfferingCloudWatchToKinesis,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingCloudWatchToKinesisDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersAwsOfferingCloudWatchToKinesis {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The kinesis to s3 connection configuration */
export interface SecurityConnectorsAPIDefenderForContainersAwsOfferingKinesisToS3 {
  /** The cloud role ARN in AWS used by Kinesis to transfer data into S3 */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingKinesisToS3Serializer(
  item: SecurityConnectorsAPIDefenderForContainersAwsOfferingKinesisToS3,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingKinesisToS3Deserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersAwsOfferingKinesisToS3 {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Microsoft Defender container image assessment configuration */
export interface SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersImageAssessmentSerializer(
  item: SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersImageAssessment,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Microsoft Defender container agentless discovery K8s configuration */
export interface SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S {
  /** Is Microsoft Defender container agentless discovery K8s enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
  item: SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Microsoft Defender for Container K8s VM host scanning configuration */
export interface SecurityConnectorsAPIdefenderForContainersAwsOfferingVmScanners extends SecurityConnectorsAPIvmScannersAws {}

export function securityConnectorsAPIdefenderForContainersAwsOfferingVmScannersSerializer(
  item: SecurityConnectorsAPIdefenderForContainersAwsOfferingVmScanners,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIdefenderForContainersAwsOfferingVmScannersDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForContainersAwsOfferingVmScanners {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Defender for Servers AWS offering */
export interface SecurityConnectorsAPIdefenderForServersAwsOffering extends SecurityConnectorsAPIcloudOffering {
  /** The Defender for servers connection configuration */
  defenderForServers?: SecurityConnectorsAPIDefenderForServersAwsOfferingDefenderForServers;
  /** The ARC autoprovisioning configuration */
  arcAutoProvisioning?: SecurityConnectorsAPIDefenderForServersAwsOfferingArcAutoProvisioning;
  /** The Vulnerability Assessment autoprovisioning configuration */
  vaAutoProvisioning?: SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioning;
  /** The Microsoft Defender for Endpoint autoprovisioning configuration */
  mdeAutoProvisioning?: SecurityConnectorsAPIDefenderForServersAwsOfferingMdeAutoProvisioning;
  /** configuration for the servers offering subPlan */
  subPlan?: SecurityConnectorsAPIDefenderForServersAwsOfferingSubPlan;
  /** The Microsoft Defender for Server VM scanning configuration */
  vmScanners?: SecurityConnectorsAPIdefenderForServersAwsOfferingVmScanners;
  /** The type of the security offering. */
  offeringType: "DefenderForServersAws";
}

export function securityConnectorsAPIdefenderForServersAwsOfferingSerializer(
  item: SecurityConnectorsAPIdefenderForServersAwsOffering,
): any {
  return {
    offeringType: item["offeringType"],
    defenderForServers: !item["defenderForServers"]
      ? item["defenderForServers"]
      : securityConnectorsAPIDefenderForServersAwsOfferingDefenderForServersSerializer(
          item["defenderForServers"],
        ),
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersAwsOfferingArcAutoProvisioningSerializer(
          item["arcAutoProvisioning"],
        ),
    vaAutoProvisioning: !item["vaAutoProvisioning"]
      ? item["vaAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningSerializer(
          item["vaAutoProvisioning"],
        ),
    mdeAutoProvisioning: !item["mdeAutoProvisioning"]
      ? item["mdeAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersAwsOfferingMdeAutoProvisioningSerializer(
          item["mdeAutoProvisioning"],
        ),
    subPlan: !item["subPlan"]
      ? item["subPlan"]
      : securityConnectorsAPIDefenderForServersAwsOfferingSubPlanSerializer(item["subPlan"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderForServersAwsOfferingVmScannersSerializer(item["vmScanners"]),
  };
}

export function securityConnectorsAPIdefenderForServersAwsOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForServersAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    defenderForServers: !item["defenderForServers"]
      ? item["defenderForServers"]
      : securityConnectorsAPIDefenderForServersAwsOfferingDefenderForServersDeserializer(
          item["defenderForServers"],
        ),
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersAwsOfferingArcAutoProvisioningDeserializer(
          item["arcAutoProvisioning"],
        ),
    vaAutoProvisioning: !item["vaAutoProvisioning"]
      ? item["vaAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningDeserializer(
          item["vaAutoProvisioning"],
        ),
    mdeAutoProvisioning: !item["mdeAutoProvisioning"]
      ? item["mdeAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersAwsOfferingMdeAutoProvisioningDeserializer(
          item["mdeAutoProvisioning"],
        ),
    subPlan: !item["subPlan"]
      ? item["subPlan"]
      : securityConnectorsAPIDefenderForServersAwsOfferingSubPlanDeserializer(item["subPlan"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderForServersAwsOfferingVmScannersDeserializer(
          item["vmScanners"],
        ),
  };
}

/** The Defender for servers connection configuration */
export interface SecurityConnectorsAPIDefenderForServersAwsOfferingDefenderForServers {
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderForServersAwsOfferingDefenderForServersSerializer(
  item: SecurityConnectorsAPIDefenderForServersAwsOfferingDefenderForServers,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderForServersAwsOfferingDefenderForServersDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersAwsOfferingDefenderForServers {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The ARC autoprovisioning configuration */
export interface SecurityConnectorsAPIDefenderForServersAwsOfferingArcAutoProvisioning extends SecurityConnectorsAPIarcAutoProvisioningAws {}

export function securityConnectorsAPIDefenderForServersAwsOfferingArcAutoProvisioningSerializer(
  item: SecurityConnectorsAPIDefenderForServersAwsOfferingArcAutoProvisioning,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIDefenderForServersAwsOfferingArcAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersAwsOfferingArcAutoProvisioning {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** The Vulnerability Assessment autoprovisioning configuration */
export interface SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioning {
  /** Is Vulnerability Assessment auto provisioning enabled */
  enabled?: boolean;
  /** configuration for Vulnerability Assessment autoprovisioning */
  configuration?: SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningConfiguration;
}

export function securityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningSerializer(
  item: SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioning,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningConfigurationSerializer(
          item["configuration"],
        ),
  };
}

export function securityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningConfigurationDeserializer(
          item["configuration"],
        ),
  };
}

/** configuration for Vulnerability Assessment autoprovisioning */
export interface SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningConfiguration {
  /** The Vulnerability Assessment solution to be provisioned. Can be either 'TVM' or 'Qualys' */
  type?: SecurityConnectorsAPIType;
}

export function securityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningConfigurationSerializer(
  item: SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningConfiguration,
): any {
  return { type: item["type"] };
}

export function securityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningConfigurationDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningConfiguration {
  return {
    type: item["type"],
  };
}

/** The Vulnerability Assessment solution to be provisioned. Can be either 'TVM' or 'Qualys' */
export enum KnownSecurityConnectorsAPIType {
  /** Qualys */
  Qualys = "Qualys",
  /** TVM */
  TVM = "TVM",
}

/**
 * The Vulnerability Assessment solution to be provisioned. Can be either 'TVM' or 'Qualys' \
 * {@link KnownSecurityConnectorsAPIType} can be used interchangeably with SecurityConnectorsAPIType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Qualys**: Qualys \
 * **TVM**: TVM
 */
export type SecurityConnectorsAPIType = string;

/** The Microsoft Defender for Endpoint autoprovisioning configuration */
export interface SecurityConnectorsAPIDefenderForServersAwsOfferingMdeAutoProvisioning {
  /** Is Microsoft Defender for Endpoint auto provisioning enabled */
  enabled?: boolean;
  /** configuration for Microsoft Defender for Endpoint autoprovisioning */
  configuration?: any;
}

export function securityConnectorsAPIDefenderForServersAwsOfferingMdeAutoProvisioningSerializer(
  item: SecurityConnectorsAPIDefenderForServersAwsOfferingMdeAutoProvisioning,
): any {
  return { enabled: item["enabled"], configuration: item["configuration"] };
}

export function securityConnectorsAPIDefenderForServersAwsOfferingMdeAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersAwsOfferingMdeAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: item["configuration"],
  };
}

/** configuration for the servers offering subPlan */
export interface SecurityConnectorsAPIDefenderForServersAwsOfferingSubPlan {
  /** The available sub plans */
  type?: SecurityConnectorsAPISubPlan;
}

export function securityConnectorsAPIDefenderForServersAwsOfferingSubPlanSerializer(
  item: SecurityConnectorsAPIDefenderForServersAwsOfferingSubPlan,
): any {
  return { type: item["type"] };
}

export function securityConnectorsAPIDefenderForServersAwsOfferingSubPlanDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersAwsOfferingSubPlan {
  return {
    type: item["type"],
  };
}

/** The available sub plans */
export enum KnownSecurityConnectorsAPISubPlan {
  /** P1 */
  P1 = "P1",
  /** P2 */
  P2 = "P2",
}

/**
 * The available sub plans \
 * {@link KnownSecurityConnectorsAPISubPlan} can be used interchangeably with SecurityConnectorsAPISubPlan,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P1**: P1 \
 * **P2**: P2
 */
export type SecurityConnectorsAPISubPlan = string;

/** The Microsoft Defender for Server VM scanning configuration */
export interface SecurityConnectorsAPIdefenderForServersAwsOfferingVmScanners extends SecurityConnectorsAPIvmScannersAws {}

export function securityConnectorsAPIdefenderForServersAwsOfferingVmScannersSerializer(
  item: SecurityConnectorsAPIdefenderForServersAwsOfferingVmScanners,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIdefenderForServersAwsOfferingVmScannersDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForServersAwsOfferingVmScanners {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Defender for Databases AWS offering */
export interface SecurityConnectorsAPIdefenderFoDatabasesAwsOffering extends SecurityConnectorsAPIcloudOffering {
  /** The ARC autoprovisioning configuration */
  arcAutoProvisioning?: SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingArcAutoProvisioning;
  /** The RDS configuration */
  rds?: SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingRds;
  /** The databases data security posture management (DSPM) configuration */
  databasesDspm?: SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingDatabasesDspm;
  /** The type of the security offering. */
  offeringType: "DefenderForDatabasesAws";
}

export function securityConnectorsAPIdefenderFoDatabasesAwsOfferingSerializer(
  item: SecurityConnectorsAPIdefenderFoDatabasesAwsOffering,
): any {
  return {
    offeringType: item["offeringType"],
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : securityConnectorsAPIDefenderFoDatabasesAwsOfferingArcAutoProvisioningSerializer(
          item["arcAutoProvisioning"],
        ),
    rds: !item["rds"]
      ? item["rds"]
      : securityConnectorsAPIDefenderFoDatabasesAwsOfferingRdsSerializer(item["rds"]),
    databasesDspm: !item["databasesDspm"]
      ? item["databasesDspm"]
      : securityConnectorsAPIDefenderFoDatabasesAwsOfferingDatabasesDspmSerializer(
          item["databasesDspm"],
        ),
  };
}

export function securityConnectorsAPIdefenderFoDatabasesAwsOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderFoDatabasesAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : securityConnectorsAPIDefenderFoDatabasesAwsOfferingArcAutoProvisioningDeserializer(
          item["arcAutoProvisioning"],
        ),
    rds: !item["rds"]
      ? item["rds"]
      : securityConnectorsAPIDefenderFoDatabasesAwsOfferingRdsDeserializer(item["rds"]),
    databasesDspm: !item["databasesDspm"]
      ? item["databasesDspm"]
      : securityConnectorsAPIDefenderFoDatabasesAwsOfferingDatabasesDspmDeserializer(
          item["databasesDspm"],
        ),
  };
}

/** The ARC autoprovisioning configuration */
export interface SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingArcAutoProvisioning extends SecurityConnectorsAPIarcAutoProvisioningAws {}

export function securityConnectorsAPIDefenderFoDatabasesAwsOfferingArcAutoProvisioningSerializer(
  item: SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingArcAutoProvisioning,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIDefenderFoDatabasesAwsOfferingArcAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingArcAutoProvisioning {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** The RDS configuration */
export interface SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingRds {
  /** Is RDS protection enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderFoDatabasesAwsOfferingRdsSerializer(
  item: SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingRds,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderFoDatabasesAwsOfferingRdsDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingRds {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The databases data security posture management (DSPM) configuration */
export interface SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingDatabasesDspm {
  /** Is databases data security posture management (DSPM) protection enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderFoDatabasesAwsOfferingDatabasesDspmSerializer(
  item: SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingDatabasesDspm,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderFoDatabasesAwsOfferingDatabasesDspmDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingDatabasesDspm {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The CSPM monitoring for GCP offering */
export interface SecurityConnectorsAPIcspmMonitorGcpOffering extends SecurityConnectorsAPIcloudOffering {
  /** The native cloud connection configuration */
  nativeCloudConnection?: SecurityConnectorsAPICspmMonitorGcpOfferingNativeCloudConnection;
  /** The type of the security offering. */
  offeringType: "CspmMonitorGcp";
}

export function securityConnectorsAPIcspmMonitorGcpOfferingSerializer(
  item: SecurityConnectorsAPIcspmMonitorGcpOffering,
): any {
  return {
    offeringType: item["offeringType"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : securityConnectorsAPICspmMonitorGcpOfferingNativeCloudConnectionSerializer(
          item["nativeCloudConnection"],
        ),
  };
}

export function securityConnectorsAPIcspmMonitorGcpOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIcspmMonitorGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : securityConnectorsAPICspmMonitorGcpOfferingNativeCloudConnectionDeserializer(
          item["nativeCloudConnection"],
        ),
  };
}

/** The native cloud connection configuration */
export interface SecurityConnectorsAPICspmMonitorGcpOfferingNativeCloudConnection {
  /** The GCP workload identity provider id for the offering */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this offering */
  serviceAccountEmailAddress?: string;
}

export function securityConnectorsAPICspmMonitorGcpOfferingNativeCloudConnectionSerializer(
  item: SecurityConnectorsAPICspmMonitorGcpOfferingNativeCloudConnection,
): any {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function securityConnectorsAPICspmMonitorGcpOfferingNativeCloudConnectionDeserializer(
  item: any,
): SecurityConnectorsAPICspmMonitorGcpOfferingNativeCloudConnection {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Defender for Servers GCP offering configurations */
export interface SecurityConnectorsAPIdefenderForServersGcpOffering extends SecurityConnectorsAPIcloudOffering {
  /** The Defender for servers connection configuration */
  defenderForServers?: SecurityConnectorsAPIDefenderForServersGcpOfferingDefenderForServers;
  /** The ARC autoprovisioning configuration */
  arcAutoProvisioning?: SecurityConnectorsAPIDefenderForServersGcpOfferingArcAutoProvisioning;
  /** The Vulnerability Assessment autoprovisioning configuration */
  vaAutoProvisioning?: SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioning;
  /** The Microsoft Defender for Endpoint autoprovisioning configuration */
  mdeAutoProvisioning?: SecurityConnectorsAPIDefenderForServersGcpOfferingMdeAutoProvisioning;
  /** configuration for the servers offering subPlan */
  subPlan?: SecurityConnectorsAPIDefenderForServersGcpOfferingSubPlan;
  /** The Microsoft Defender for Server VM scanning configuration */
  vmScanners?: SecurityConnectorsAPIdefenderForServersGcpOfferingVmScanners;
  /** The type of the security offering. */
  offeringType: "DefenderForServersGcp";
}

export function securityConnectorsAPIdefenderForServersGcpOfferingSerializer(
  item: SecurityConnectorsAPIdefenderForServersGcpOffering,
): any {
  return {
    offeringType: item["offeringType"],
    defenderForServers: !item["defenderForServers"]
      ? item["defenderForServers"]
      : securityConnectorsAPIDefenderForServersGcpOfferingDefenderForServersSerializer(
          item["defenderForServers"],
        ),
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersGcpOfferingArcAutoProvisioningSerializer(
          item["arcAutoProvisioning"],
        ),
    vaAutoProvisioning: !item["vaAutoProvisioning"]
      ? item["vaAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningSerializer(
          item["vaAutoProvisioning"],
        ),
    mdeAutoProvisioning: !item["mdeAutoProvisioning"]
      ? item["mdeAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersGcpOfferingMdeAutoProvisioningSerializer(
          item["mdeAutoProvisioning"],
        ),
    subPlan: !item["subPlan"]
      ? item["subPlan"]
      : securityConnectorsAPIDefenderForServersGcpOfferingSubPlanSerializer(item["subPlan"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderForServersGcpOfferingVmScannersSerializer(item["vmScanners"]),
  };
}

export function securityConnectorsAPIdefenderForServersGcpOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForServersGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    defenderForServers: !item["defenderForServers"]
      ? item["defenderForServers"]
      : securityConnectorsAPIDefenderForServersGcpOfferingDefenderForServersDeserializer(
          item["defenderForServers"],
        ),
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersGcpOfferingArcAutoProvisioningDeserializer(
          item["arcAutoProvisioning"],
        ),
    vaAutoProvisioning: !item["vaAutoProvisioning"]
      ? item["vaAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningDeserializer(
          item["vaAutoProvisioning"],
        ),
    mdeAutoProvisioning: !item["mdeAutoProvisioning"]
      ? item["mdeAutoProvisioning"]
      : securityConnectorsAPIDefenderForServersGcpOfferingMdeAutoProvisioningDeserializer(
          item["mdeAutoProvisioning"],
        ),
    subPlan: !item["subPlan"]
      ? item["subPlan"]
      : securityConnectorsAPIDefenderForServersGcpOfferingSubPlanDeserializer(item["subPlan"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderForServersGcpOfferingVmScannersDeserializer(
          item["vmScanners"],
        ),
  };
}

/** The Defender for servers connection configuration */
export interface SecurityConnectorsAPIDefenderForServersGcpOfferingDefenderForServers {
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function securityConnectorsAPIDefenderForServersGcpOfferingDefenderForServersSerializer(
  item: SecurityConnectorsAPIDefenderForServersGcpOfferingDefenderForServers,
): any {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function securityConnectorsAPIDefenderForServersGcpOfferingDefenderForServersDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersGcpOfferingDefenderForServers {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The ARC autoprovisioning configuration */
export interface SecurityConnectorsAPIDefenderForServersGcpOfferingArcAutoProvisioning extends SecurityConnectorsAPIarcAutoProvisioningGcp {}

export function securityConnectorsAPIDefenderForServersGcpOfferingArcAutoProvisioningSerializer(
  item: SecurityConnectorsAPIDefenderForServersGcpOfferingArcAutoProvisioning,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIDefenderForServersGcpOfferingArcAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersGcpOfferingArcAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** The Vulnerability Assessment autoprovisioning configuration */
export interface SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioning {
  /** Is Vulnerability Assessment auto provisioning enabled */
  enabled?: boolean;
  /** configuration for Vulnerability Assessment autoprovisioning */
  configuration?: SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningConfiguration;
}

export function securityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningSerializer(
  item: SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioning,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningConfigurationSerializer(
          item["configuration"],
        ),
  };
}

export function securityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningConfigurationDeserializer(
          item["configuration"],
        ),
  };
}

/** configuration for Vulnerability Assessment autoprovisioning */
export interface SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningConfiguration {
  /** The Vulnerability Assessment solution to be provisioned. Can be either 'TVM' or 'Qualys' */
  type?: SecurityConnectorsAPIType;
}

export function securityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningConfigurationSerializer(
  item: SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningConfiguration,
): any {
  return { type: item["type"] };
}

export function securityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningConfigurationDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningConfiguration {
  return {
    type: item["type"],
  };
}

/** The Microsoft Defender for Endpoint autoprovisioning configuration */
export interface SecurityConnectorsAPIDefenderForServersGcpOfferingMdeAutoProvisioning {
  /** Is Microsoft Defender for Endpoint auto provisioning enabled */
  enabled?: boolean;
  /** configuration for Microsoft Defender for Endpoint autoprovisioning */
  configuration?: any;
}

export function securityConnectorsAPIDefenderForServersGcpOfferingMdeAutoProvisioningSerializer(
  item: SecurityConnectorsAPIDefenderForServersGcpOfferingMdeAutoProvisioning,
): any {
  return { enabled: item["enabled"], configuration: item["configuration"] };
}

export function securityConnectorsAPIDefenderForServersGcpOfferingMdeAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersGcpOfferingMdeAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: item["configuration"],
  };
}

/** configuration for the servers offering subPlan */
export interface SecurityConnectorsAPIDefenderForServersGcpOfferingSubPlan {
  /** The available sub plans */
  type?: SecurityConnectorsAPISubPlan;
}

export function securityConnectorsAPIDefenderForServersGcpOfferingSubPlanSerializer(
  item: SecurityConnectorsAPIDefenderForServersGcpOfferingSubPlan,
): any {
  return { type: item["type"] };
}

export function securityConnectorsAPIDefenderForServersGcpOfferingSubPlanDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForServersGcpOfferingSubPlan {
  return {
    type: item["type"],
  };
}

/** The Microsoft Defender for Server VM scanning configuration */
export interface SecurityConnectorsAPIdefenderForServersGcpOfferingVmScanners extends SecurityConnectorsAPIvmScannersGcp {}

export function securityConnectorsAPIdefenderForServersGcpOfferingVmScannersSerializer(
  item: SecurityConnectorsAPIdefenderForServersGcpOfferingVmScanners,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIdefenderForServersGcpOfferingVmScannersDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForServersGcpOfferingVmScanners {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Defender for Databases GCP offering configurations */
export interface SecurityConnectorsAPIdefenderForDatabasesGcpOffering extends SecurityConnectorsAPIcloudOffering {
  /** The ARC autoprovisioning configuration */
  arcAutoProvisioning?: SecurityConnectorsAPIDefenderForDatabasesGcpOfferingArcAutoProvisioning;
  /** The native cloud connection configuration */
  defenderForDatabasesArcAutoProvisioning?: SecurityConnectorsAPIDefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning;
  /** The type of the security offering. */
  offeringType: "DefenderForDatabasesGcp";
}

export function securityConnectorsAPIdefenderForDatabasesGcpOfferingSerializer(
  item: SecurityConnectorsAPIdefenderForDatabasesGcpOffering,
): any {
  return {
    offeringType: item["offeringType"],
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : securityConnectorsAPIDefenderForDatabasesGcpOfferingArcAutoProvisioningSerializer(
          item["arcAutoProvisioning"],
        ),
    defenderForDatabasesArcAutoProvisioning: !item["defenderForDatabasesArcAutoProvisioning"]
      ? item["defenderForDatabasesArcAutoProvisioning"]
      : securityConnectorsAPIDefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioningSerializer(
          item["defenderForDatabasesArcAutoProvisioning"],
        ),
  };
}

export function securityConnectorsAPIdefenderForDatabasesGcpOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForDatabasesGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : securityConnectorsAPIDefenderForDatabasesGcpOfferingArcAutoProvisioningDeserializer(
          item["arcAutoProvisioning"],
        ),
    defenderForDatabasesArcAutoProvisioning: !item["defenderForDatabasesArcAutoProvisioning"]
      ? item["defenderForDatabasesArcAutoProvisioning"]
      : securityConnectorsAPIDefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioningDeserializer(
          item["defenderForDatabasesArcAutoProvisioning"],
        ),
  };
}

/** The ARC autoprovisioning configuration */
export interface SecurityConnectorsAPIDefenderForDatabasesGcpOfferingArcAutoProvisioning extends SecurityConnectorsAPIarcAutoProvisioningGcp {}

export function securityConnectorsAPIDefenderForDatabasesGcpOfferingArcAutoProvisioningSerializer(
  item: SecurityConnectorsAPIDefenderForDatabasesGcpOfferingArcAutoProvisioning,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIDefenderForDatabasesGcpOfferingArcAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForDatabasesGcpOfferingArcAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** The native cloud connection configuration */
export interface SecurityConnectorsAPIDefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning {
  /** The service account email address in GCP for this offering */
  serviceAccountEmailAddress?: string;
  /** The GCP workload identity provider id for this offering */
  workloadIdentityProviderId?: string;
}

export function securityConnectorsAPIDefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioningSerializer(
  item: SecurityConnectorsAPIDefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning,
): any {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

export function securityConnectorsAPIDefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

/** The containers GCP offering */
export interface SecurityConnectorsAPIdefenderForContainersGcpOffering extends SecurityConnectorsAPIcloudOffering {
  /** The native cloud connection configuration */
  nativeCloudConnection?: SecurityConnectorsAPIDefenderForContainersGcpOfferingNativeCloudConnection;
  /** The native cloud connection configuration */
  dataPipelineNativeCloudConnection?: SecurityConnectorsAPIDefenderForContainersGcpOfferingDataPipelineNativeCloudConnection;
  /** Is audit logs data collection enabled */
  enableAuditLogsAutoProvisioning?: boolean;
  /** Is Microsoft Defender for Cloud Kubernetes agent auto provisioning enabled */
  enableDefenderAgentAutoProvisioning?: boolean;
  /** Is Policy Kubernetes agent auto provisioning enabled */
  enablePolicyAgentAutoProvisioning?: boolean;
  /** The Microsoft Defender Container image assessment configuration */
  mdcContainersImageAssessment?: SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersImageAssessment;
  /** The Microsoft Defender Container agentless discovery configuration */
  mdcContainersAgentlessDiscoveryK8S?: SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S;
  /** The Microsoft Defender for Container K8s VM host scanning configuration */
  vmScanners?: SecurityConnectorsAPIdefenderForContainersGcpOfferingVmScanners;
  /** The type of the security offering. */
  offeringType: "DefenderForContainersGcp";
}

export function securityConnectorsAPIdefenderForContainersGcpOfferingSerializer(
  item: SecurityConnectorsAPIdefenderForContainersGcpOffering,
): any {
  return {
    offeringType: item["offeringType"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : securityConnectorsAPIDefenderForContainersGcpOfferingNativeCloudConnectionSerializer(
          item["nativeCloudConnection"],
        ),
    dataPipelineNativeCloudConnection: !item["dataPipelineNativeCloudConnection"]
      ? item["dataPipelineNativeCloudConnection"]
      : securityConnectorsAPIDefenderForContainersGcpOfferingDataPipelineNativeCloudConnectionSerializer(
          item["dataPipelineNativeCloudConnection"],
        ),
    enableAuditLogsAutoProvisioning: item["enableAuditLogsAutoProvisioning"],
    enableDefenderAgentAutoProvisioning: item["enableDefenderAgentAutoProvisioning"],
    enablePolicyAgentAutoProvisioning: item["enablePolicyAgentAutoProvisioning"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8s: !item["mdcContainersAgentlessDiscoveryK8S"]
      ? item["mdcContainersAgentlessDiscoveryK8S"]
      : securityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
          item["mdcContainersAgentlessDiscoveryK8S"],
        ),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderForContainersGcpOfferingVmScannersSerializer(
          item["vmScanners"],
        ),
  };
}

export function securityConnectorsAPIdefenderForContainersGcpOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForContainersGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : securityConnectorsAPIDefenderForContainersGcpOfferingNativeCloudConnectionDeserializer(
          item["nativeCloudConnection"],
        ),
    dataPipelineNativeCloudConnection: !item["dataPipelineNativeCloudConnection"]
      ? item["dataPipelineNativeCloudConnection"]
      : securityConnectorsAPIDefenderForContainersGcpOfferingDataPipelineNativeCloudConnectionDeserializer(
          item["dataPipelineNativeCloudConnection"],
        ),
    enableAuditLogsAutoProvisioning: item["enableAuditLogsAutoProvisioning"],
    enableDefenderAgentAutoProvisioning: item["enableDefenderAgentAutoProvisioning"],
    enablePolicyAgentAutoProvisioning: item["enablePolicyAgentAutoProvisioning"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8S: !item["mdcContainersAgentlessDiscoveryK8s"]
      ? item["mdcContainersAgentlessDiscoveryK8s"]
      : securityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
          item["mdcContainersAgentlessDiscoveryK8s"],
        ),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderForContainersGcpOfferingVmScannersDeserializer(
          item["vmScanners"],
        ),
  };
}

/** The native cloud connection configuration */
export interface SecurityConnectorsAPIDefenderForContainersGcpOfferingNativeCloudConnection {
  /** The service account email address in GCP for this offering */
  serviceAccountEmailAddress?: string;
  /** The GCP workload identity provider id for this offering */
  workloadIdentityProviderId?: string;
}

export function securityConnectorsAPIDefenderForContainersGcpOfferingNativeCloudConnectionSerializer(
  item: SecurityConnectorsAPIDefenderForContainersGcpOfferingNativeCloudConnection,
): any {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

export function securityConnectorsAPIDefenderForContainersGcpOfferingNativeCloudConnectionDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersGcpOfferingNativeCloudConnection {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

/** The native cloud connection configuration */
export interface SecurityConnectorsAPIDefenderForContainersGcpOfferingDataPipelineNativeCloudConnection {
  /** The data collection service account email address in GCP for this offering */
  serviceAccountEmailAddress?: string;
  /** The data collection GCP workload identity provider id for this offering */
  workloadIdentityProviderId?: string;
}

export function securityConnectorsAPIDefenderForContainersGcpOfferingDataPipelineNativeCloudConnectionSerializer(
  item: SecurityConnectorsAPIDefenderForContainersGcpOfferingDataPipelineNativeCloudConnection,
): any {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

export function securityConnectorsAPIDefenderForContainersGcpOfferingDataPipelineNativeCloudConnectionDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersGcpOfferingDataPipelineNativeCloudConnection {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

/** The Microsoft Defender Container image assessment configuration */
export interface SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function securityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersImageAssessmentSerializer(
  item: SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersImageAssessment,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function securityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Microsoft Defender Container agentless discovery configuration */
export interface SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S {
  /** Is Microsoft Defender container agentless discovery enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function securityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
  item: SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function securityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Microsoft Defender for Container K8s VM host scanning configuration */
export interface SecurityConnectorsAPIdefenderForContainersGcpOfferingVmScanners extends SecurityConnectorsAPIvmScannersGcp {}

export function securityConnectorsAPIdefenderForContainersGcpOfferingVmScannersSerializer(
  item: SecurityConnectorsAPIdefenderForContainersGcpOfferingVmScanners,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIdefenderForContainersGcpOfferingVmScannersDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForContainersGcpOfferingVmScanners {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The CSPM monitoring for github offering */
export interface SecurityConnectorsAPIcspmMonitorGithubOffering extends SecurityConnectorsAPIcloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorGithub";
}

export function securityConnectorsAPIcspmMonitorGithubOfferingSerializer(
  item: SecurityConnectorsAPIcspmMonitorGithubOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function securityConnectorsAPIcspmMonitorGithubOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIcspmMonitorGithubOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM monitoring for AzureDevOps offering */
export interface SecurityConnectorsAPIcspmMonitorAzureDevOpsOffering extends SecurityConnectorsAPIcloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorAzureDevOps";
}

export function securityConnectorsAPIcspmMonitorAzureDevOpsOfferingSerializer(
  item: SecurityConnectorsAPIcspmMonitorAzureDevOpsOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function securityConnectorsAPIcspmMonitorAzureDevOpsOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIcspmMonitorAzureDevOpsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM P1 for AWS offering */
export interface SecurityConnectorsAPIdefenderCspmAwsOffering extends SecurityConnectorsAPIcloudOffering {
  /** The Microsoft Defender for CSPM offering VM scanning configuration */
  vmScanners?: SecurityConnectorsAPIdefenderCspmAwsOfferingVmScanners;
  /** The Microsoft Defender Data Sensitivity discovery configuration */
  dataSensitivityDiscovery?: SecurityConnectorsAPIDefenderCspmAwsOfferingDataSensitivityDiscovery;
  /** The databases DSPM configuration */
  databasesDspm?: SecurityConnectorsAPIDefenderCspmAwsOfferingDatabasesDspm;
  /** Defenders CSPM Permissions Management offering configurations */
  ciem?: SecurityConnectorsAPIDefenderCspmAwsOfferingCiem;
  /** The Microsoft Defender container image assessment configuration */
  mdcContainersImageAssessment?: SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersImageAssessment;
  /** The Microsoft Defender container agentless discovery K8s configuration */
  mdcContainersAgentlessDiscoveryK8S?: SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S;
  /** The type of the security offering. */
  offeringType: "DefenderCspmAws";
}

export function securityConnectorsAPIdefenderCspmAwsOfferingSerializer(
  item: SecurityConnectorsAPIdefenderCspmAwsOffering,
): any {
  return {
    offeringType: item["offeringType"],
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderCspmAwsOfferingVmScannersSerializer(item["vmScanners"]),
    dataSensitivityDiscovery: !item["dataSensitivityDiscovery"]
      ? item["dataSensitivityDiscovery"]
      : securityConnectorsAPIDefenderCspmAwsOfferingDataSensitivityDiscoverySerializer(
          item["dataSensitivityDiscovery"],
        ),
    databasesDspm: !item["databasesDspm"]
      ? item["databasesDspm"]
      : securityConnectorsAPIDefenderCspmAwsOfferingDatabasesDspmSerializer(item["databasesDspm"]),
    ciem: !item["ciem"]
      ? item["ciem"]
      : securityConnectorsAPIDefenderCspmAwsOfferingCiemSerializer(item["ciem"]),
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderCspmAwsOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8s: !item["mdcContainersAgentlessDiscoveryK8S"]
      ? item["mdcContainersAgentlessDiscoveryK8S"]
      : securityConnectorsAPIDefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
          item["mdcContainersAgentlessDiscoveryK8S"],
        ),
  };
}

export function securityConnectorsAPIdefenderCspmAwsOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderCspmAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderCspmAwsOfferingVmScannersDeserializer(item["vmScanners"]),
    dataSensitivityDiscovery: !item["dataSensitivityDiscovery"]
      ? item["dataSensitivityDiscovery"]
      : securityConnectorsAPIDefenderCspmAwsOfferingDataSensitivityDiscoveryDeserializer(
          item["dataSensitivityDiscovery"],
        ),
    databasesDspm: !item["databasesDspm"]
      ? item["databasesDspm"]
      : securityConnectorsAPIDefenderCspmAwsOfferingDatabasesDspmDeserializer(
          item["databasesDspm"],
        ),
    ciem: !item["ciem"]
      ? item["ciem"]
      : securityConnectorsAPIDefenderCspmAwsOfferingCiemDeserializer(item["ciem"]),
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderCspmAwsOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8S: !item["mdcContainersAgentlessDiscoveryK8s"]
      ? item["mdcContainersAgentlessDiscoveryK8s"]
      : securityConnectorsAPIDefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
          item["mdcContainersAgentlessDiscoveryK8s"],
        ),
  };
}

/** The Microsoft Defender for CSPM offering VM scanning configuration */
export interface SecurityConnectorsAPIdefenderCspmAwsOfferingVmScanners extends SecurityConnectorsAPIvmScannersAws {}

export function securityConnectorsAPIdefenderCspmAwsOfferingVmScannersSerializer(
  item: SecurityConnectorsAPIdefenderCspmAwsOfferingVmScanners,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIdefenderCspmAwsOfferingVmScannersDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderCspmAwsOfferingVmScanners {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Microsoft Defender Data Sensitivity discovery configuration */
export interface SecurityConnectorsAPIDefenderCspmAwsOfferingDataSensitivityDiscovery {
  /** Is Microsoft Defender Data Sensitivity discovery enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderCspmAwsOfferingDataSensitivityDiscoverySerializer(
  item: SecurityConnectorsAPIDefenderCspmAwsOfferingDataSensitivityDiscovery,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderCspmAwsOfferingDataSensitivityDiscoveryDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmAwsOfferingDataSensitivityDiscovery {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The databases DSPM configuration */
export interface SecurityConnectorsAPIDefenderCspmAwsOfferingDatabasesDspm {
  /** Is databases DSPM protection enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderCspmAwsOfferingDatabasesDspmSerializer(
  item: SecurityConnectorsAPIDefenderCspmAwsOfferingDatabasesDspm,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderCspmAwsOfferingDatabasesDspmDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmAwsOfferingDatabasesDspm {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** Defenders CSPM Permissions Management offering configurations */
export interface SecurityConnectorsAPIDefenderCspmAwsOfferingCiem {
  /** Defender CSPM Permissions Management discovery configuration */
  ciemDiscovery?: SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemDiscovery;
  /** AWS Defender CSPM Permissions Management OIDC (open id connect) connection configurations */
  ciemOidc?: SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemOidc;
}

export function securityConnectorsAPIDefenderCspmAwsOfferingCiemSerializer(
  item: SecurityConnectorsAPIDefenderCspmAwsOfferingCiem,
): any {
  return {
    ciemDiscovery: !item["ciemDiscovery"]
      ? item["ciemDiscovery"]
      : securityConnectorsAPIDefenderCspmAwsOfferingCiemCiemDiscoverySerializer(
          item["ciemDiscovery"],
        ),
    ciemOidc: !item["ciemOidc"]
      ? item["ciemOidc"]
      : securityConnectorsAPIDefenderCspmAwsOfferingCiemCiemOidcSerializer(item["ciemOidc"]),
  };
}

export function securityConnectorsAPIDefenderCspmAwsOfferingCiemDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmAwsOfferingCiem {
  return {
    ciemDiscovery: !item["ciemDiscovery"]
      ? item["ciemDiscovery"]
      : securityConnectorsAPIDefenderCspmAwsOfferingCiemCiemDiscoveryDeserializer(
          item["ciemDiscovery"],
        ),
    ciemOidc: !item["ciemOidc"]
      ? item["ciemOidc"]
      : securityConnectorsAPIDefenderCspmAwsOfferingCiemCiemOidcDeserializer(item["ciemOidc"]),
  };
}

/** Defender CSPM Permissions Management discovery configuration */
export interface SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemDiscovery {
  /** The cloud role ARN in AWS for Permissions Management discovery */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderCspmAwsOfferingCiemCiemDiscoverySerializer(
  item: SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemDiscovery,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderCspmAwsOfferingCiemCiemDiscoveryDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemDiscovery {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** AWS Defender CSPM Permissions Management OIDC (open id connect) connection configurations */
export interface SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemOidc {
  /** The cloud role ARN in AWS for Permissions Management used for oidc connection */
  cloudRoleArn?: string;
  /** the azure active directory app name used of authenticating against AWS */
  azureActiveDirectoryAppName?: string;
}

export function securityConnectorsAPIDefenderCspmAwsOfferingCiemCiemOidcSerializer(
  item: SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemOidc,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    azureActiveDirectoryAppName: item["azureActiveDirectoryAppName"],
  };
}

export function securityConnectorsAPIDefenderCspmAwsOfferingCiemCiemOidcDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemOidc {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    azureActiveDirectoryAppName: item["azureActiveDirectoryAppName"],
  };
}

/** The Microsoft Defender container image assessment configuration */
export interface SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderCspmAwsOfferingMdcContainersImageAssessmentSerializer(
  item: SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersImageAssessment,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderCspmAwsOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Microsoft Defender container agentless discovery K8s configuration */
export interface SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S {
  /** Is Microsoft Defender container agentless discovery K8s enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIDefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
  item: SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function securityConnectorsAPIDefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The CSPM P1 for GCP offering */
export interface SecurityConnectorsAPIdefenderCspmGcpOffering extends SecurityConnectorsAPIcloudOffering {
  /** GCP Defenders CSPM Permissions Management OIDC (Open ID connect) connection configurations */
  ciemDiscovery?: SecurityConnectorsAPIDefenderCspmGcpOfferingCiemDiscovery;
  /** The Microsoft Defender for CSPM VM scanning configuration */
  vmScanners?: SecurityConnectorsAPIdefenderCspmGcpOfferingVmScanners;
  /** The Microsoft Defender Data Sensitivity discovery configuration */
  dataSensitivityDiscovery?: SecurityConnectorsAPIDefenderCspmGcpOfferingDataSensitivityDiscovery;
  /** The Microsoft Defender Container image assessment configuration */
  mdcContainersImageAssessment?: SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersImageAssessment;
  /** The Microsoft Defender Container agentless discovery configuration */
  mdcContainersAgentlessDiscoveryK8S?: SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S;
  /** The type of the security offering. */
  offeringType: "DefenderCspmGcp";
}

export function securityConnectorsAPIdefenderCspmGcpOfferingSerializer(
  item: SecurityConnectorsAPIdefenderCspmGcpOffering,
): any {
  return {
    offeringType: item["offeringType"],
    ciemDiscovery: !item["ciemDiscovery"]
      ? item["ciemDiscovery"]
      : securityConnectorsAPIDefenderCspmGcpOfferingCiemDiscoverySerializer(item["ciemDiscovery"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderCspmGcpOfferingVmScannersSerializer(item["vmScanners"]),
    dataSensitivityDiscovery: !item["dataSensitivityDiscovery"]
      ? item["dataSensitivityDiscovery"]
      : securityConnectorsAPIDefenderCspmGcpOfferingDataSensitivityDiscoverySerializer(
          item["dataSensitivityDiscovery"],
        ),
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderCspmGcpOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8s: !item["mdcContainersAgentlessDiscoveryK8S"]
      ? item["mdcContainersAgentlessDiscoveryK8S"]
      : securityConnectorsAPIDefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
          item["mdcContainersAgentlessDiscoveryK8S"],
        ),
  };
}

export function securityConnectorsAPIdefenderCspmGcpOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderCspmGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    ciemDiscovery: !item["ciemDiscovery"]
      ? item["ciemDiscovery"]
      : securityConnectorsAPIDefenderCspmGcpOfferingCiemDiscoveryDeserializer(
          item["ciemDiscovery"],
        ),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : securityConnectorsAPIdefenderCspmGcpOfferingVmScannersDeserializer(item["vmScanners"]),
    dataSensitivityDiscovery: !item["dataSensitivityDiscovery"]
      ? item["dataSensitivityDiscovery"]
      : securityConnectorsAPIDefenderCspmGcpOfferingDataSensitivityDiscoveryDeserializer(
          item["dataSensitivityDiscovery"],
        ),
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderCspmGcpOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8S: !item["mdcContainersAgentlessDiscoveryK8s"]
      ? item["mdcContainersAgentlessDiscoveryK8s"]
      : securityConnectorsAPIDefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
          item["mdcContainersAgentlessDiscoveryK8s"],
        ),
  };
}

/** GCP Defenders CSPM Permissions Management OIDC (Open ID connect) connection configurations */
export interface SecurityConnectorsAPIDefenderCspmGcpOfferingCiemDiscovery {
  /** The GCP workload identity provider id for Permissions Management offering */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for Permissions Management offering */
  serviceAccountEmailAddress?: string;
  /** the azure active directory app name used of authenticating against GCP workload identity federation */
  azureActiveDirectoryAppName?: string;
}

export function securityConnectorsAPIDefenderCspmGcpOfferingCiemDiscoverySerializer(
  item: SecurityConnectorsAPIDefenderCspmGcpOfferingCiemDiscovery,
): any {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    azureActiveDirectoryAppName: item["azureActiveDirectoryAppName"],
  };
}

export function securityConnectorsAPIDefenderCspmGcpOfferingCiemDiscoveryDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmGcpOfferingCiemDiscovery {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    azureActiveDirectoryAppName: item["azureActiveDirectoryAppName"],
  };
}

/** The Microsoft Defender for CSPM VM scanning configuration */
export interface SecurityConnectorsAPIdefenderCspmGcpOfferingVmScanners extends SecurityConnectorsAPIvmScannersGcp {}

export function securityConnectorsAPIdefenderCspmGcpOfferingVmScannersSerializer(
  item: SecurityConnectorsAPIdefenderCspmGcpOfferingVmScanners,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIdefenderCspmGcpOfferingVmScannersDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderCspmGcpOfferingVmScanners {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Microsoft Defender Data Sensitivity discovery configuration */
export interface SecurityConnectorsAPIDefenderCspmGcpOfferingDataSensitivityDiscovery {
  /** Is Microsoft Defender Data Sensitivity discovery enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function securityConnectorsAPIDefenderCspmGcpOfferingDataSensitivityDiscoverySerializer(
  item: SecurityConnectorsAPIDefenderCspmGcpOfferingDataSensitivityDiscovery,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function securityConnectorsAPIDefenderCspmGcpOfferingDataSensitivityDiscoveryDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmGcpOfferingDataSensitivityDiscovery {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Microsoft Defender Container image assessment configuration */
export interface SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function securityConnectorsAPIDefenderCspmGcpOfferingMdcContainersImageAssessmentSerializer(
  item: SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersImageAssessment,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function securityConnectorsAPIDefenderCspmGcpOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Microsoft Defender Container agentless discovery configuration */
export interface SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S {
  /** Is Microsoft Defender container agentless discovery enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function securityConnectorsAPIDefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
  item: SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function securityConnectorsAPIDefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The CSPM (Cloud security posture management) monitoring for gitlab offering */
export interface SecurityConnectorsAPIcspmMonitorGitLabOffering extends SecurityConnectorsAPIcloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorGitLab";
}

export function securityConnectorsAPIcspmMonitorGitLabOfferingSerializer(
  item: SecurityConnectorsAPIcspmMonitorGitLabOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function securityConnectorsAPIcspmMonitorGitLabOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIcspmMonitorGitLabOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM (Cloud security posture management) monitoring for Docker Hub offering */
export interface SecurityConnectorsAPIcspmMonitorDockerHubOffering extends SecurityConnectorsAPIcloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorDockerHub";
}

export function securityConnectorsAPIcspmMonitorDockerHubOfferingSerializer(
  item: SecurityConnectorsAPIcspmMonitorDockerHubOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function securityConnectorsAPIcspmMonitorDockerHubOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIcspmMonitorDockerHubOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The Defender for containers Docker Hub offering configurations */
export interface SecurityConnectorsAPIdefenderForContainersDockerHubOffering extends SecurityConnectorsAPIcloudOffering {
  /** The type of the security offering. */
  offeringType: "DefenderForContainersDockerHub";
}

export function securityConnectorsAPIdefenderForContainersDockerHubOfferingSerializer(
  item: SecurityConnectorsAPIdefenderForContainersDockerHubOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function securityConnectorsAPIdefenderForContainersDockerHubOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForContainersDockerHubOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The Defender for CSPM Docker Hub offering configurations */
export interface SecurityConnectorsAPIdefenderCspmDockerHubOffering extends SecurityConnectorsAPIcloudOffering {
  /** The type of the security offering. */
  offeringType: "DefenderCspmDockerHub";
}

export function securityConnectorsAPIdefenderCspmDockerHubOfferingSerializer(
  item: SecurityConnectorsAPIdefenderCspmDockerHubOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function securityConnectorsAPIdefenderCspmDockerHubOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderCspmDockerHubOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM (Cloud security posture management) monitoring for JFrog Artifactory offering */
export interface SecurityConnectorsAPIcspmMonitorJFrogOffering extends SecurityConnectorsAPIcloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorJFrog";
}

export function securityConnectorsAPIcspmMonitorJFrogOfferingSerializer(
  item: SecurityConnectorsAPIcspmMonitorJFrogOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function securityConnectorsAPIcspmMonitorJFrogOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIcspmMonitorJFrogOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The Defender for Containers for JFrog Artifactory offering */
export interface SecurityConnectorsAPIdefenderForContainersJFrogOffering extends SecurityConnectorsAPIcloudOffering {
  /** The type of the security offering. */
  offeringType: "DefenderForContainersJFrog";
}

export function securityConnectorsAPIdefenderForContainersJFrogOfferingSerializer(
  item: SecurityConnectorsAPIdefenderForContainersJFrogOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function securityConnectorsAPIdefenderForContainersJFrogOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderForContainersJFrogOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM P1 for JFrog Artifactory offering */
export interface SecurityConnectorsAPIdefenderCspmJFrogOffering extends SecurityConnectorsAPIcloudOffering {
  /** The Microsoft Defender Container image assessment configuration */
  mdcContainersImageAssessment?: SecurityConnectorsAPIDefenderCspmJFrogOfferingMdcContainersImageAssessment;
  /** The type of the security offering. */
  offeringType: "DefenderCspmJFrog";
}

export function securityConnectorsAPIdefenderCspmJFrogOfferingSerializer(
  item: SecurityConnectorsAPIdefenderCspmJFrogOffering,
): any {
  return {
    offeringType: item["offeringType"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderCspmJFrogOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
  };
}

export function securityConnectorsAPIdefenderCspmJFrogOfferingDeserializer(
  item: any,
): SecurityConnectorsAPIdefenderCspmJFrogOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : securityConnectorsAPIDefenderCspmJFrogOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
  };
}

/** The Microsoft Defender Container image assessment configuration */
export interface SecurityConnectorsAPIDefenderCspmJFrogOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
}

export function securityConnectorsAPIDefenderCspmJFrogOfferingMdcContainersImageAssessmentSerializer(
  item: SecurityConnectorsAPIDefenderCspmJFrogOfferingMdcContainersImageAssessment,
): any {
  return { enabled: item["enabled"] };
}

export function securityConnectorsAPIDefenderCspmJFrogOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): SecurityConnectorsAPIDefenderCspmJFrogOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
  };
}

/** The security connector environment data. */
export interface SecurityConnectorsAPIEnvironmentData {
  /** The type of the environment data. */
  /** The discriminator possible values: AwsAccount, GcpProject, GithubScope, AzureDevOpsScope, GitlabScope, DockerHubOrganization, JFrogArtifactory */
  environmentType: SecurityConnectorsAPIEnvironmentType;
}

export function securityConnectorsAPIEnvironmentDataSerializer(
  item: SecurityConnectorsAPIEnvironmentData,
): any {
  return { environmentType: item["environmentType"] };
}

export function securityConnectorsAPIEnvironmentDataDeserializer(
  item: any,
): SecurityConnectorsAPIEnvironmentData {
  return {
    environmentType: item["environmentType"],
  };
}

/** Alias for SecurityConnectorsAPIEnvironmentDataUnion */
export type SecurityConnectorsAPIEnvironmentDataUnion =
  | SecurityConnectorsAPIAwsEnvironmentData
  | SecurityConnectorsAPIGcpProjectEnvironmentData
  | SecurityConnectorsAPIGithubScopeEnvironmentData
  | SecurityConnectorsAPIAzureDevOpsScopeEnvironmentData
  | SecurityConnectorsAPIGitlabScopeEnvironmentData
  | SecurityConnectorsAPIDockerHubEnvironmentData
  | SecurityConnectorsApijFrogEnvironmentData
  | SecurityConnectorsAPIEnvironmentData;

export function securityConnectorsAPIEnvironmentDataUnionSerializer(
  item: SecurityConnectorsAPIEnvironmentDataUnion,
): any {
  switch (item.environmentType) {
    case "AwsAccount":
      return securityConnectorsAPIAwsEnvironmentDataSerializer(
        item as SecurityConnectorsAPIAwsEnvironmentData,
      );

    case "GcpProject":
      return securityConnectorsAPIGcpProjectEnvironmentDataSerializer(
        item as SecurityConnectorsAPIGcpProjectEnvironmentData,
      );

    case "GithubScope":
      return securityConnectorsAPIGithubScopeEnvironmentDataSerializer(
        item as SecurityConnectorsAPIGithubScopeEnvironmentData,
      );

    case "AzureDevOpsScope":
      return securityConnectorsAPIAzureDevOpsScopeEnvironmentDataSerializer(
        item as SecurityConnectorsAPIAzureDevOpsScopeEnvironmentData,
      );

    case "GitlabScope":
      return securityConnectorsAPIGitlabScopeEnvironmentDataSerializer(
        item as SecurityConnectorsAPIGitlabScopeEnvironmentData,
      );

    case "DockerHubOrganization":
      return securityConnectorsAPIDockerHubEnvironmentDataSerializer(
        item as SecurityConnectorsAPIDockerHubEnvironmentData,
      );

    case "JFrogArtifactory":
      return securityConnectorsApijFrogEnvironmentDataSerializer(
        item as SecurityConnectorsApijFrogEnvironmentData,
      );

    default:
      return securityConnectorsAPIEnvironmentDataSerializer(item);
  }
}

export function securityConnectorsAPIEnvironmentDataUnionDeserializer(
  item: any,
): SecurityConnectorsAPIEnvironmentDataUnion {
  switch (item["environmentType"]) {
    case "AwsAccount":
      return securityConnectorsAPIAwsEnvironmentDataDeserializer(
        item as SecurityConnectorsAPIAwsEnvironmentData,
      );

    case "GcpProject":
      return securityConnectorsAPIGcpProjectEnvironmentDataDeserializer(
        item as SecurityConnectorsAPIGcpProjectEnvironmentData,
      );

    case "GithubScope":
      return securityConnectorsAPIGithubScopeEnvironmentDataDeserializer(
        item as SecurityConnectorsAPIGithubScopeEnvironmentData,
      );

    case "AzureDevOpsScope":
      return securityConnectorsAPIAzureDevOpsScopeEnvironmentDataDeserializer(
        item as SecurityConnectorsAPIAzureDevOpsScopeEnvironmentData,
      );

    case "GitlabScope":
      return securityConnectorsAPIGitlabScopeEnvironmentDataDeserializer(
        item as SecurityConnectorsAPIGitlabScopeEnvironmentData,
      );

    case "DockerHubOrganization":
      return securityConnectorsAPIDockerHubEnvironmentDataDeserializer(
        item as SecurityConnectorsAPIDockerHubEnvironmentData,
      );

    case "JFrogArtifactory":
      return securityConnectorsApijFrogEnvironmentDataDeserializer(
        item as SecurityConnectorsApijFrogEnvironmentData,
      );

    default:
      return securityConnectorsAPIEnvironmentDataDeserializer(item);
  }
}

/** The type of the environment data. */
export enum KnownSecurityConnectorsAPIEnvironmentType {
  /** AwsAccount */
  AwsAccount = "AwsAccount",
  /** GcpProject */
  GcpProject = "GcpProject",
  /** GithubScope */
  GithubScope = "GithubScope",
  /** AzureDevOpsScope */
  AzureDevOpsScope = "AzureDevOpsScope",
  /** GitlabScope */
  GitlabScope = "GitlabScope",
  /** DockerHubOrganization */
  DockerHubOrganization = "DockerHubOrganization",
  /** JFrogArtifactory */
  JFrogArtifactory = "JFrogArtifactory",
}

/**
 * The type of the environment data. \
 * {@link KnownSecurityConnectorsAPIEnvironmentType} can be used interchangeably with SecurityConnectorsAPIEnvironmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AwsAccount**: AwsAccount \
 * **GcpProject**: GcpProject \
 * **GithubScope**: GithubScope \
 * **AzureDevOpsScope**: AzureDevOpsScope \
 * **GitlabScope**: GitlabScope \
 * **DockerHubOrganization**: DockerHubOrganization \
 * **JFrogArtifactory**: JFrogArtifactory
 */
export type SecurityConnectorsAPIEnvironmentType = string;

/** The AWS connector environment data */
export interface SecurityConnectorsAPIAwsEnvironmentData extends SecurityConnectorsAPIEnvironmentData {
  /** The AWS account's organizational data */
  organizationalData?: SecurityConnectorsAPIAwsOrganizationalDataUnion;
  /** list of regions to scan */
  regions?: string[];
  /** The AWS account name */
  readonly accountName?: string;
  /** Scan interval in hours (value should be between 1-hour to 24-hours) */
  scanInterval?: number;
  /** The type of the environment data. */
  environmentType: "AwsAccount";
}

export function securityConnectorsAPIAwsEnvironmentDataSerializer(
  item: SecurityConnectorsAPIAwsEnvironmentData,
): any {
  return {
    environmentType: item["environmentType"],
    organizationalData: !item["organizationalData"]
      ? item["organizationalData"]
      : securityConnectorsAPIAwsOrganizationalDataUnionSerializer(item["organizationalData"]),
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
    scanInterval: item["scanInterval"],
  };
}

export function securityConnectorsAPIAwsEnvironmentDataDeserializer(
  item: any,
): SecurityConnectorsAPIAwsEnvironmentData {
  return {
    environmentType: item["environmentType"],
    organizationalData: !item["organizationalData"]
      ? item["organizationalData"]
      : securityConnectorsAPIAwsOrganizationalDataUnionDeserializer(item["organizationalData"]),
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
    accountName: item["accountName"],
    scanInterval: item["scanInterval"],
  };
}

/** The AWS organization data */
export interface SecurityConnectorsAPIAwsOrganizationalData {
  /** The multi cloud account's membership type in the organization */
  /** The discriminator possible values: Organization, Member */
  organizationMembershipType: SecurityConnectorsAPIOrganizationMembershipType;
}

export function securityConnectorsAPIAwsOrganizationalDataSerializer(
  item: SecurityConnectorsAPIAwsOrganizationalData,
): any {
  return { organizationMembershipType: item["organizationMembershipType"] };
}

export function securityConnectorsAPIAwsOrganizationalDataDeserializer(
  item: any,
): SecurityConnectorsAPIAwsOrganizationalData {
  return {
    organizationMembershipType: item["organizationMembershipType"],
  };
}

/** Alias for SecurityConnectorsAPIAwsOrganizationalDataUnion */
export type SecurityConnectorsAPIAwsOrganizationalDataUnion =
  | SecurityConnectorsAPIAwsOrganizationalDataMaster
  | SecurityConnectorsAPIAwsOrganizationalDataMember
  | SecurityConnectorsAPIAwsOrganizationalData;

export function securityConnectorsAPIAwsOrganizationalDataUnionSerializer(
  item: SecurityConnectorsAPIAwsOrganizationalDataUnion,
): any {
  switch (item.organizationMembershipType) {
    case "Organization":
      return securityConnectorsAPIAwsOrganizationalDataMasterSerializer(
        item as SecurityConnectorsAPIAwsOrganizationalDataMaster,
      );

    case "Member":
      return securityConnectorsAPIAwsOrganizationalDataMemberSerializer(
        item as SecurityConnectorsAPIAwsOrganizationalDataMember,
      );

    default:
      return securityConnectorsAPIAwsOrganizationalDataSerializer(item);
  }
}

export function securityConnectorsAPIAwsOrganizationalDataUnionDeserializer(
  item: any,
): SecurityConnectorsAPIAwsOrganizationalDataUnion {
  switch (item["organizationMembershipType"]) {
    case "Organization":
      return securityConnectorsAPIAwsOrganizationalDataMasterDeserializer(
        item as SecurityConnectorsAPIAwsOrganizationalDataMaster,
      );

    case "Member":
      return securityConnectorsAPIAwsOrganizationalDataMemberDeserializer(
        item as SecurityConnectorsAPIAwsOrganizationalDataMember,
      );

    default:
      return securityConnectorsAPIAwsOrganizationalDataDeserializer(item);
  }
}

/** The multi cloud account's membership type in the organization */
export enum KnownSecurityConnectorsAPIOrganizationMembershipType {
  /** Member */
  Member = "Member",
  /** Organization */
  Organization = "Organization",
}

/**
 * The multi cloud account's membership type in the organization \
 * {@link KnownSecurityConnectorsAPIOrganizationMembershipType} can be used interchangeably with SecurityConnectorsAPIOrganizationMembershipType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Member**: Member \
 * **Organization**: Organization
 */
export type SecurityConnectorsAPIOrganizationMembershipType = string;

/** The AWS organization data for the master account */
export interface SecurityConnectorsAPIAwsOrganizationalDataMaster extends SecurityConnectorsAPIAwsOrganizationalData {
  /** If the multi cloud account is of membership type organization, this will be the name of the onboarding stackset */
  stacksetName?: string;
  /** If the multi cloud account is of membership type organization, list of accounts excluded from offering */
  excludedAccountIds?: string[];
  /** The multi cloud account's membership type in the organization */
  organizationMembershipType: "Organization";
}

export function securityConnectorsAPIAwsOrganizationalDataMasterSerializer(
  item: SecurityConnectorsAPIAwsOrganizationalDataMaster,
): any {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    stacksetName: item["stacksetName"],
    excludedAccountIds: !item["excludedAccountIds"]
      ? item["excludedAccountIds"]
      : item["excludedAccountIds"].map((p: any) => {
          return p;
        }),
  };
}

export function securityConnectorsAPIAwsOrganizationalDataMasterDeserializer(
  item: any,
): SecurityConnectorsAPIAwsOrganizationalDataMaster {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    stacksetName: item["stacksetName"],
    excludedAccountIds: !item["excludedAccountIds"]
      ? item["excludedAccountIds"]
      : item["excludedAccountIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The AWS organization data for the member account */
export interface SecurityConnectorsAPIAwsOrganizationalDataMember extends SecurityConnectorsAPIAwsOrganizationalData {
  /** If the multi cloud account is not of membership type organization, this will be the ID of the account's parent */
  parentHierarchyId?: string;
  /** The multi cloud account's membership type in the organization */
  organizationMembershipType: "Member";
}

export function securityConnectorsAPIAwsOrganizationalDataMemberSerializer(
  item: SecurityConnectorsAPIAwsOrganizationalDataMember,
): any {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    parentHierarchyId: item["parentHierarchyId"],
  };
}

export function securityConnectorsAPIAwsOrganizationalDataMemberDeserializer(
  item: any,
): SecurityConnectorsAPIAwsOrganizationalDataMember {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    parentHierarchyId: item["parentHierarchyId"],
  };
}

/** The GCP project connector environment data */
export interface SecurityConnectorsAPIGcpProjectEnvironmentData extends SecurityConnectorsAPIEnvironmentData {
  /** The Gcp project's organizational data */
  organizationalData?: SecurityConnectorsAPIGcpOrganizationalDataUnion;
  /** The Gcp project's details */
  projectDetails?: SecurityConnectorsAPIGcpProjectDetails;
  /** Scan interval in hours (value should be between 1-hour to 24-hours) */
  scanInterval?: number;
  /** The type of the environment data. */
  environmentType: "GcpProject";
}

export function securityConnectorsAPIGcpProjectEnvironmentDataSerializer(
  item: SecurityConnectorsAPIGcpProjectEnvironmentData,
): any {
  return {
    environmentType: item["environmentType"],
    organizationalData: !item["organizationalData"]
      ? item["organizationalData"]
      : securityConnectorsAPIGcpOrganizationalDataUnionSerializer(item["organizationalData"]),
    projectDetails: !item["projectDetails"]
      ? item["projectDetails"]
      : securityConnectorsAPIGcpProjectDetailsSerializer(item["projectDetails"]),
    scanInterval: item["scanInterval"],
  };
}

export function securityConnectorsAPIGcpProjectEnvironmentDataDeserializer(
  item: any,
): SecurityConnectorsAPIGcpProjectEnvironmentData {
  return {
    environmentType: item["environmentType"],
    organizationalData: !item["organizationalData"]
      ? item["organizationalData"]
      : securityConnectorsAPIGcpOrganizationalDataUnionDeserializer(item["organizationalData"]),
    projectDetails: !item["projectDetails"]
      ? item["projectDetails"]
      : securityConnectorsAPIGcpProjectDetailsDeserializer(item["projectDetails"]),
    scanInterval: item["scanInterval"],
  };
}

/** The gcpOrganization data */
export interface SecurityConnectorsAPIGcpOrganizationalData {
  /** The multi cloud account's membership type in the organization */
  /** The discriminator possible values: Organization, Member */
  organizationMembershipType: SecurityConnectorsAPIOrganizationMembershipType;
}

export function securityConnectorsAPIGcpOrganizationalDataSerializer(
  item: SecurityConnectorsAPIGcpOrganizationalData,
): any {
  return { organizationMembershipType: item["organizationMembershipType"] };
}

export function securityConnectorsAPIGcpOrganizationalDataDeserializer(
  item: any,
): SecurityConnectorsAPIGcpOrganizationalData {
  return {
    organizationMembershipType: item["organizationMembershipType"],
  };
}

/** Alias for SecurityConnectorsAPIGcpOrganizationalDataUnion */
export type SecurityConnectorsAPIGcpOrganizationalDataUnion =
  | SecurityConnectorsAPIGcpOrganizationalDataOrganization
  | SecurityConnectorsAPIGcpOrganizationalDataMember
  | SecurityConnectorsAPIGcpOrganizationalData;

export function securityConnectorsAPIGcpOrganizationalDataUnionSerializer(
  item: SecurityConnectorsAPIGcpOrganizationalDataUnion,
): any {
  switch (item.organizationMembershipType) {
    case "Organization":
      return securityConnectorsAPIGcpOrganizationalDataOrganizationSerializer(
        item as SecurityConnectorsAPIGcpOrganizationalDataOrganization,
      );

    case "Member":
      return securityConnectorsAPIGcpOrganizationalDataMemberSerializer(
        item as SecurityConnectorsAPIGcpOrganizationalDataMember,
      );

    default:
      return securityConnectorsAPIGcpOrganizationalDataSerializer(item);
  }
}

export function securityConnectorsAPIGcpOrganizationalDataUnionDeserializer(
  item: any,
): SecurityConnectorsAPIGcpOrganizationalDataUnion {
  switch (item["organizationMembershipType"]) {
    case "Organization":
      return securityConnectorsAPIGcpOrganizationalDataOrganizationDeserializer(
        item as SecurityConnectorsAPIGcpOrganizationalDataOrganization,
      );

    case "Member":
      return securityConnectorsAPIGcpOrganizationalDataMemberDeserializer(
        item as SecurityConnectorsAPIGcpOrganizationalDataMember,
      );

    default:
      return securityConnectorsAPIGcpOrganizationalDataDeserializer(item);
  }
}

/** The gcpOrganization data for the parent account */
export interface SecurityConnectorsAPIGcpOrganizationalDataOrganization extends SecurityConnectorsAPIGcpOrganizationalData {
  /** If the multi cloud account is of membership type organization, list of accounts excluded from offering */
  excludedProjectNumbers?: string[];
  /** The service account email address which represents the organization level permissions container. */
  serviceAccountEmailAddress?: string;
  /** The GCP workload identity provider id which represents the permissions required to auto provision security connectors */
  workloadIdentityProviderId?: string;
  /** GCP organization name */
  readonly organizationName?: string;
  /** The multi cloud account's membership type in the organization */
  organizationMembershipType: "Organization";
}

export function securityConnectorsAPIGcpOrganizationalDataOrganizationSerializer(
  item: SecurityConnectorsAPIGcpOrganizationalDataOrganization,
): any {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    excludedProjectNumbers: !item["excludedProjectNumbers"]
      ? item["excludedProjectNumbers"]
      : item["excludedProjectNumbers"].map((p: any) => {
          return p;
        }),
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

export function securityConnectorsAPIGcpOrganizationalDataOrganizationDeserializer(
  item: any,
): SecurityConnectorsAPIGcpOrganizationalDataOrganization {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    excludedProjectNumbers: !item["excludedProjectNumbers"]
      ? item["excludedProjectNumbers"]
      : item["excludedProjectNumbers"].map((p: any) => {
          return p;
        }),
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    organizationName: item["organizationName"],
  };
}

/** The gcpOrganization data for the member account */
export interface SecurityConnectorsAPIGcpOrganizationalDataMember extends SecurityConnectorsAPIGcpOrganizationalData {
  /** If the multi cloud account is not of membership type organization, this will be the ID of the project's parent */
  parentHierarchyId?: string;
  /** The GCP management project number from organizational onboarding */
  managementProjectNumber?: string;
  /** The multi cloud account's membership type in the organization */
  organizationMembershipType: "Member";
}

export function securityConnectorsAPIGcpOrganizationalDataMemberSerializer(
  item: SecurityConnectorsAPIGcpOrganizationalDataMember,
): any {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    parentHierarchyId: item["parentHierarchyId"],
    managementProjectNumber: item["managementProjectNumber"],
  };
}

export function securityConnectorsAPIGcpOrganizationalDataMemberDeserializer(
  item: any,
): SecurityConnectorsAPIGcpOrganizationalDataMember {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    parentHierarchyId: item["parentHierarchyId"],
    managementProjectNumber: item["managementProjectNumber"],
  };
}

/** The details about the project represented by the security connector */
export interface SecurityConnectorsAPIGcpProjectDetails {
  /** The unique GCP Project number */
  projectNumber?: string;
  /** The GCP Project id */
  projectId?: string;
  /** The GCP workload identity federation pool id */
  readonly workloadIdentityPoolId?: string;
  /** GCP project name */
  readonly projectName?: string;
}

export function securityConnectorsAPIGcpProjectDetailsSerializer(
  item: SecurityConnectorsAPIGcpProjectDetails,
): any {
  return { projectNumber: item["projectNumber"], projectId: item["projectId"] };
}

export function securityConnectorsAPIGcpProjectDetailsDeserializer(
  item: any,
): SecurityConnectorsAPIGcpProjectDetails {
  return {
    projectNumber: item["projectNumber"],
    projectId: item["projectId"],
    workloadIdentityPoolId: item["workloadIdentityPoolId"],
    projectName: item["projectName"],
  };
}

/** The github scope connector's environment data */
export interface SecurityConnectorsAPIGithubScopeEnvironmentData extends SecurityConnectorsAPIEnvironmentData {
  /** The type of the environment data. */
  environmentType: "GithubScope";
}

export function securityConnectorsAPIGithubScopeEnvironmentDataSerializer(
  item: SecurityConnectorsAPIGithubScopeEnvironmentData,
): any {
  return { environmentType: item["environmentType"] };
}

export function securityConnectorsAPIGithubScopeEnvironmentDataDeserializer(
  item: any,
): SecurityConnectorsAPIGithubScopeEnvironmentData {
  return {
    environmentType: item["environmentType"],
  };
}

/** The AzureDevOps scope connector's environment data */
export interface SecurityConnectorsAPIAzureDevOpsScopeEnvironmentData extends SecurityConnectorsAPIEnvironmentData {
  /** The type of the environment data. */
  environmentType: "AzureDevOpsScope";
}

export function securityConnectorsAPIAzureDevOpsScopeEnvironmentDataSerializer(
  item: SecurityConnectorsAPIAzureDevOpsScopeEnvironmentData,
): any {
  return { environmentType: item["environmentType"] };
}

export function securityConnectorsAPIAzureDevOpsScopeEnvironmentDataDeserializer(
  item: any,
): SecurityConnectorsAPIAzureDevOpsScopeEnvironmentData {
  return {
    environmentType: item["environmentType"],
  };
}

/** The GitLab scope connector's environment data */
export interface SecurityConnectorsAPIGitlabScopeEnvironmentData extends SecurityConnectorsAPIEnvironmentData {
  /** The type of the environment data. */
  environmentType: "GitlabScope";
}

export function securityConnectorsAPIGitlabScopeEnvironmentDataSerializer(
  item: SecurityConnectorsAPIGitlabScopeEnvironmentData,
): any {
  return { environmentType: item["environmentType"] };
}

export function securityConnectorsAPIGitlabScopeEnvironmentDataDeserializer(
  item: any,
): SecurityConnectorsAPIGitlabScopeEnvironmentData {
  return {
    environmentType: item["environmentType"],
  };
}

/** The Docker Hub connector environment data */
export interface SecurityConnectorsAPIDockerHubEnvironmentData extends SecurityConnectorsAPIEnvironmentData {
  /** The Docker Hub organization authentication details */
  authentication?: SecurityConnectorsAPIAuthenticationUnion;
  /** Scan interval in hours (value should be between 1-hour to 24-hours) */
  scanInterval?: number;
  /** The type of the environment data. */
  environmentType: "DockerHubOrganization";
}

export function securityConnectorsAPIDockerHubEnvironmentDataSerializer(
  item: SecurityConnectorsAPIDockerHubEnvironmentData,
): any {
  return {
    environmentType: item["environmentType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : securityConnectorsAPIAuthenticationUnionSerializer(item["authentication"]),
    scanInterval: item["scanInterval"],
  };
}

export function securityConnectorsAPIDockerHubEnvironmentDataDeserializer(
  item: any,
): SecurityConnectorsAPIDockerHubEnvironmentData {
  return {
    environmentType: item["environmentType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : securityConnectorsAPIAuthenticationUnionDeserializer(item["authentication"]),
    scanInterval: item["scanInterval"],
  };
}

/** The environment authentication details */
export interface SecurityConnectorsAPIAuthentication {
  /** The authentication type */
  /** The discriminator possible values: AccessToken */
  authenticationType: SecurityConnectorsAPIAuthenticationType;
}

export function securityConnectorsAPIAuthenticationSerializer(
  item: SecurityConnectorsAPIAuthentication,
): any {
  return { authenticationType: item["authenticationType"] };
}

export function securityConnectorsAPIAuthenticationDeserializer(
  item: any,
): SecurityConnectorsAPIAuthentication {
  return {
    authenticationType: item["authenticationType"],
  };
}

/** Alias for SecurityConnectorsAPIAuthenticationUnion */
export type SecurityConnectorsAPIAuthenticationUnion =
  | SecurityConnectorsAPIAccessTokenAuthentication
  | SecurityConnectorsAPIAuthentication;

export function securityConnectorsAPIAuthenticationUnionSerializer(
  item: SecurityConnectorsAPIAuthenticationUnion,
): any {
  switch (item.authenticationType) {
    case "AccessToken":
      return securityConnectorsAPIAccessTokenAuthenticationSerializer(
        item as SecurityConnectorsAPIAccessTokenAuthentication,
      );

    default:
      return securityConnectorsAPIAuthenticationSerializer(item);
  }
}

export function securityConnectorsAPIAuthenticationUnionDeserializer(
  item: any,
): SecurityConnectorsAPIAuthenticationUnion {
  switch (item["authenticationType"]) {
    case "AccessToken":
      return securityConnectorsAPIAccessTokenAuthenticationDeserializer(
        item as SecurityConnectorsAPIAccessTokenAuthentication,
      );

    default:
      return securityConnectorsAPIAuthenticationDeserializer(item);
  }
}

/** The authentication type */
export enum KnownSecurityConnectorsAPIAuthenticationType {
  /** AccessToken */
  AccessToken = "AccessToken",
}

/**
 * The authentication type \
 * {@link KnownSecurityConnectorsAPIAuthenticationType} can be used interchangeably with SecurityConnectorsAPIAuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccessToken**: AccessToken
 */
export type SecurityConnectorsAPIAuthenticationType = string;

/** The environment authentication details */
export interface SecurityConnectorsAPIAccessTokenAuthentication extends SecurityConnectorsAPIAuthentication {
  /** The user name that will be used while authenticating with the onboarded environment */
  username?: string;
  /** The access token that will be used while authenticating with the onboarded environment */
  accessToken?: string;
  /** The authentication type */
  authenticationType: "AccessToken";
}

export function securityConnectorsAPIAccessTokenAuthenticationSerializer(
  item: SecurityConnectorsAPIAccessTokenAuthentication,
): any {
  return {
    authenticationType: item["authenticationType"],
    username: item["username"],
    accessToken: item["accessToken"],
  };
}

export function securityConnectorsAPIAccessTokenAuthenticationDeserializer(
  item: any,
): SecurityConnectorsAPIAccessTokenAuthentication {
  return {
    authenticationType: item["authenticationType"],
    username: item["username"],
    accessToken: item["accessToken"],
  };
}

/** The JFrog Artifactory connector environment data */
export interface SecurityConnectorsApijFrogEnvironmentData extends SecurityConnectorsAPIEnvironmentData {
  /** Scan interval in hours (value should be between 1-hour to 24-hours) */
  scanInterval?: number;
  /** The type of the environment data. */
  environmentType: "JFrogArtifactory";
}

export function securityConnectorsApijFrogEnvironmentDataSerializer(
  item: SecurityConnectorsApijFrogEnvironmentData,
): any {
  return { environmentType: item["environmentType"], scanInterval: item["scanInterval"] };
}

export function securityConnectorsApijFrogEnvironmentDataDeserializer(
  item: any,
): SecurityConnectorsApijFrogEnvironmentData {
  return {
    environmentType: item["environmentType"],
    scanInterval: item["scanInterval"],
  };
}

/** A VM scanning configuration for a security offering of a Aws environment */
export interface SecurityConnectorsAPIvmScannersAws extends SecurityConnectorsAPIvmScannersBase {
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIvmScannersAwsSerializer(
  item: SecurityConnectorsAPIvmScannersAws,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationSerializer(item["configuration"]),
    cloudRoleArn: item["cloudRoleArn"],
  };
}

export function securityConnectorsAPIvmScannersAwsDeserializer(
  item: any,
): SecurityConnectorsAPIvmScannersAws {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationDeserializer(item["configuration"]),
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** A VM scanning configuration for a security offering of a given environment */
export interface SecurityConnectorsAPIvmScannersBase {
  /** Is VM scanning enabled */
  enabled?: boolean;
  /** Configuration for VM scanning */
  configuration?: SecurityConnectorsAPIVmScannersBaseConfiguration;
}

export function securityConnectorsAPIvmScannersBaseSerializer(
  item: SecurityConnectorsAPIvmScannersBase,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIvmScannersBaseDeserializer(
  item: any,
): SecurityConnectorsAPIvmScannersBase {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** Configuration for VM scanning */
export interface SecurityConnectorsAPIVmScannersBaseConfiguration {
  /** The scanning mode for the VM scan. */
  scanningMode?: SecurityConnectorsAPIScanningMode;
  /** Tags that indicates that a resource should not be scanned */
  exclusionTags?: Record<string, string>;
}

export function securityConnectorsAPIVmScannersBaseConfigurationSerializer(
  item: SecurityConnectorsAPIVmScannersBaseConfiguration,
): any {
  return { scanningMode: item["scanningMode"], exclusionTags: item["exclusionTags"] };
}

export function securityConnectorsAPIVmScannersBaseConfigurationDeserializer(
  item: any,
): SecurityConnectorsAPIVmScannersBaseConfiguration {
  return {
    scanningMode: item["scanningMode"],
    exclusionTags: !item["exclusionTags"]
      ? item["exclusionTags"]
      : Object.fromEntries(
          Object.entries(item["exclusionTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The scanning mode for the VM scan. */
export enum KnownSecurityConnectorsAPIScanningMode {
  /** Default */
  Default = "Default",
}

/**
 * The scanning mode for the VM scan. \
 * {@link KnownSecurityConnectorsAPIScanningMode} can be used interchangeably with SecurityConnectorsAPIScanningMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default
 */
export type SecurityConnectorsAPIScanningMode = string;

/** The ARC autoprovisioning configuration for an AWS environment */
export interface SecurityConnectorsAPIarcAutoProvisioningAws extends SecurityConnectorsAPIarcAutoProvisioning {
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function securityConnectorsAPIarcAutoProvisioningAwsSerializer(
  item: SecurityConnectorsAPIarcAutoProvisioningAws,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationSerializer(item["configuration"]),
    cloudRoleArn: item["cloudRoleArn"],
  };
}

export function securityConnectorsAPIarcAutoProvisioningAwsDeserializer(
  item: any,
): SecurityConnectorsAPIarcAutoProvisioningAws {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationDeserializer(item["configuration"]),
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The ARC autoprovisioning configuration */
export interface SecurityConnectorsAPIarcAutoProvisioning {
  /** Is arc auto provisioning enabled */
  enabled?: boolean;
  /** Configuration for servers Arc auto provisioning for a given environment */
  configuration?: SecurityConnectorsAPIArcAutoProvisioningConfiguration;
}

export function securityConnectorsAPIarcAutoProvisioningSerializer(
  item: SecurityConnectorsAPIarcAutoProvisioning,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIarcAutoProvisioningDeserializer(
  item: any,
): SecurityConnectorsAPIarcAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** Configuration for servers Arc auto provisioning for a given environment */
export interface SecurityConnectorsAPIArcAutoProvisioningConfiguration {
  /** Optional HTTP proxy endpoint to use for the Arc agent */
  proxy?: string;
  /** Optional Arc private link scope resource id to link the Arc agent */
  privateLinkScope?: string;
}

export function securityConnectorsAPIArcAutoProvisioningConfigurationSerializer(
  item: SecurityConnectorsAPIArcAutoProvisioningConfiguration,
): any {
  return { proxy: item["proxy"], privateLinkScope: item["privateLinkScope"] };
}

export function securityConnectorsAPIArcAutoProvisioningConfigurationDeserializer(
  item: any,
): SecurityConnectorsAPIArcAutoProvisioningConfiguration {
  return {
    proxy: item["proxy"],
    privateLinkScope: item["privateLinkScope"],
  };
}

/** The ARC autoprovisioning configuration for an GCP environment */
export interface SecurityConnectorsAPIarcAutoProvisioningGcp extends SecurityConnectorsAPIarcAutoProvisioning {}

export function securityConnectorsAPIarcAutoProvisioningGcpSerializer(
  item: SecurityConnectorsAPIarcAutoProvisioningGcp,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIarcAutoProvisioningGcpDeserializer(
  item: any,
): SecurityConnectorsAPIarcAutoProvisioningGcp {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIArcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** A VM scanning configuration for a security offering of a GCP environment */
export interface SecurityConnectorsAPIvmScannersGcp extends SecurityConnectorsAPIvmScannersBase {}

export function securityConnectorsAPIvmScannersGcpSerializer(
  item: SecurityConnectorsAPIvmScannersGcp,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function securityConnectorsAPIvmScannersGcpDeserializer(
  item: any,
): SecurityConnectorsAPIvmScannersGcp {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : securityConnectorsAPIVmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** List of security connectors response. */
export interface _SecurityConnectorsAPISecurityConnectorsList {
  /** The SecurityConnector items on this page */
  value: SecurityConnectorsAPISecurityConnector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityConnectorsAPISecurityConnectorsListDeserializer(
  item: any,
): _SecurityConnectorsAPISecurityConnectorsList {
  return {
    value: securityConnectorsAPISecurityConnectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorsAPISecurityConnectorArraySerializer(
  result: Array<SecurityConnectorsAPISecurityConnector>,
): any[] {
  return result.map((item) => {
    return securityConnectorsAPISecurityConnectorSerializer(item);
  });
}

export function securityConnectorsAPISecurityConnectorArrayDeserializer(
  result: Array<SecurityConnectorsAPISecurityConnector>,
): any[] {
  return result.map((item) => {
    return securityConnectorsAPISecurityConnectorDeserializer(item);
  });
}

export function _securityConnectorPropertiesSerializer(
  item: SecurityConnectorsAPISecurityConnector,
): any {
  return {
    hierarchyIdentifier: item["hierarchyIdentifier"],
    environmentName: item["environmentName"],
    offerings: !item["offerings"]
      ? item["offerings"]
      : securityConnectorsAPIcloudOfferingUnionArraySerializer(item["offerings"]),
    environmentData: !item["environmentData"]
      ? item["environmentData"]
      : securityConnectorsAPIEnvironmentDataUnionSerializer(item["environmentData"]),
  };
}

export function _securityConnectorPropertiesDeserializer(item: any) {
  return {
    hierarchyIdentifier: item["hierarchyIdentifier"],
    hierarchyIdentifierTrialEndDate: !item["hierarchyIdentifierTrialEndDate"]
      ? item["hierarchyIdentifierTrialEndDate"]
      : new Date(item["hierarchyIdentifierTrialEndDate"]),
    environmentName: item["environmentName"],
    offerings: !item["offerings"]
      ? item["offerings"]
      : securityConnectorsAPIcloudOfferingUnionArrayDeserializer(item["offerings"]),
    environmentData: !item["environmentData"]
      ? item["environmentData"]
      : securityConnectorsAPIEnvironmentDataUnionDeserializer(item["environmentData"]),
  };
}
