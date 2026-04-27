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
export interface SecurityConnector extends ProxyResource {
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
  environmentName?: CloudName;
  /** A collection of offerings for the security connector. */
  offerings?: CloudOfferingUnion[];
  /** The security connector environment data. */
  environmentData?: EnvironmentDataUnion;
}

export function securityConnectorSerializer(item: SecurityConnector): any {
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

export function securityConnectorDeserializer(item: any): SecurityConnector {
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
export interface SecurityConnectorProperties {
  /** The multi cloud resource identifier (account id in case of AWS connector, project number in case of GCP connector). */
  hierarchyIdentifier?: string;
  /** The date on which the trial period will end, if applicable. Trial period exists for 30 days after upgrading to payed offerings. */
  readonly hierarchyIdentifierTrialEndDate?: Date;
  /** The multi cloud resource's cloud name. */
  environmentName?: CloudName;
  /** A collection of offerings for the security connector. */
  offerings?: CloudOfferingUnion[];
  /** The security connector environment data. */
  environmentData?: EnvironmentDataUnion;
}

export function securityConnectorPropertiesSerializer(item: SecurityConnectorProperties): any {
  return {
    hierarchyIdentifier: item["hierarchyIdentifier"],
    environmentName: item["environmentName"],
    offerings: !item["offerings"]
      ? item["offerings"]
      : cloudOfferingUnionArraySerializer(item["offerings"]),
    environmentData: !item["environmentData"]
      ? item["environmentData"]
      : environmentDataUnionSerializer(item["environmentData"]),
  };
}

export function securityConnectorPropertiesDeserializer(item: any): SecurityConnectorProperties {
  return {
    hierarchyIdentifier: item["hierarchyIdentifier"],
    hierarchyIdentifierTrialEndDate: !item["hierarchyIdentifierTrialEndDate"]
      ? item["hierarchyIdentifierTrialEndDate"]
      : new Date(item["hierarchyIdentifierTrialEndDate"]),
    environmentName: item["environmentName"],
    offerings: !item["offerings"]
      ? item["offerings"]
      : cloudOfferingUnionArrayDeserializer(item["offerings"]),
    environmentData: !item["environmentData"]
      ? item["environmentData"]
      : environmentDataUnionDeserializer(item["environmentData"]),
  };
}

/** The multi cloud resource's cloud name. */
export enum KnownCloudName {
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
 * {@link KnownCloudName} can be used interchangeably with CloudName,
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
export type CloudName = string;

export function cloudOfferingUnionArraySerializer(result: Array<CloudOfferingUnion>): any[] {
  return result.map((item) => {
    return cloudOfferingUnionSerializer(item);
  });
}

export function cloudOfferingUnionArrayDeserializer(result: Array<CloudOfferingUnion>): any[] {
  return result.map((item) => {
    return cloudOfferingUnionDeserializer(item);
  });
}

/** The security offering details */
export interface CloudOffering {
  /** The type of the security offering. */
  /** The discriminator possible values: CspmMonitorAws, DefenderForContainersAws, DefenderForServersAws, DefenderForDatabasesAws, CspmMonitorGcp, DefenderForServersGcp, DefenderForDatabasesGcp, DefenderForContainersGcp, CspmMonitorGithub, CspmMonitorAzureDevOps, DefenderCspmAws, DefenderCspmGcp, CspmMonitorGitLab, CspmMonitorDockerHub, DefenderForContainersDockerHub, DefenderCspmDockerHub, CspmMonitorJFrog, DefenderForContainersJFrog, DefenderCspmJFrog */
  offeringType: OfferingType;
  /** The offering description. */
  readonly description?: string;
}

export function cloudOfferingSerializer(item: CloudOffering): any {
  return { offeringType: item["offeringType"] };
}

export function cloudOfferingDeserializer(item: any): CloudOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** Alias for CloudOfferingUnion */
export type CloudOfferingUnion =
  | CspmMonitorAwsOffering
  | DefenderForContainersAwsOffering
  | DefenderForServersAwsOffering
  | DefenderFoDatabasesAwsOffering
  | CspmMonitorGcpOffering
  | DefenderForServersGcpOffering
  | DefenderForDatabasesGcpOffering
  | DefenderForContainersGcpOffering
  | CspmMonitorGithubOffering
  | CspmMonitorAzureDevOpsOffering
  | DefenderCspmAwsOffering
  | DefenderCspmGcpOffering
  | CspmMonitorGitLabOffering
  | CspmMonitorDockerHubOffering
  | DefenderForContainersDockerHubOffering
  | DefenderCspmDockerHubOffering
  | CspmMonitorJFrogOffering
  | DefenderForContainersJFrogOffering
  | DefenderCspmJFrogOffering
  | CloudOffering;

export function cloudOfferingUnionSerializer(item: CloudOfferingUnion): any {
  switch (item.offeringType) {
    case "CspmMonitorAws":
      return cspmMonitorAwsOfferingSerializer(item as CspmMonitorAwsOffering);

    case "DefenderForContainersAws":
      return defenderForContainersAwsOfferingSerializer(item as DefenderForContainersAwsOffering);

    case "DefenderForServersAws":
      return defenderForServersAwsOfferingSerializer(item as DefenderForServersAwsOffering);

    case "DefenderForDatabasesAws":
      return defenderFoDatabasesAwsOfferingSerializer(item as DefenderFoDatabasesAwsOffering);

    case "CspmMonitorGcp":
      return cspmMonitorGcpOfferingSerializer(item as CspmMonitorGcpOffering);

    case "DefenderForServersGcp":
      return defenderForServersGcpOfferingSerializer(item as DefenderForServersGcpOffering);

    case "DefenderForDatabasesGcp":
      return defenderForDatabasesGcpOfferingSerializer(item as DefenderForDatabasesGcpOffering);

    case "DefenderForContainersGcp":
      return defenderForContainersGcpOfferingSerializer(item as DefenderForContainersGcpOffering);

    case "CspmMonitorGithub":
      return cspmMonitorGithubOfferingSerializer(item as CspmMonitorGithubOffering);

    case "CspmMonitorAzureDevOps":
      return cspmMonitorAzureDevOpsOfferingSerializer(item as CspmMonitorAzureDevOpsOffering);

    case "DefenderCspmAws":
      return defenderCspmAwsOfferingSerializer(item as DefenderCspmAwsOffering);

    case "DefenderCspmGcp":
      return defenderCspmGcpOfferingSerializer(item as DefenderCspmGcpOffering);

    case "CspmMonitorGitLab":
      return cspmMonitorGitLabOfferingSerializer(item as CspmMonitorGitLabOffering);

    case "CspmMonitorDockerHub":
      return cspmMonitorDockerHubOfferingSerializer(item as CspmMonitorDockerHubOffering);

    case "DefenderForContainersDockerHub":
      return defenderForContainersDockerHubOfferingSerializer(
        item as DefenderForContainersDockerHubOffering,
      );

    case "DefenderCspmDockerHub":
      return defenderCspmDockerHubOfferingSerializer(item as DefenderCspmDockerHubOffering);

    case "CspmMonitorJFrog":
      return cspmMonitorJFrogOfferingSerializer(item as CspmMonitorJFrogOffering);

    case "DefenderForContainersJFrog":
      return defenderForContainersJFrogOfferingSerializer(
        item as DefenderForContainersJFrogOffering,
      );

    case "DefenderCspmJFrog":
      return defenderCspmJFrogOfferingSerializer(item as DefenderCspmJFrogOffering);

    default:
      return cloudOfferingSerializer(item);
  }
}

export function cloudOfferingUnionDeserializer(item: any): CloudOfferingUnion {
  switch (item["offeringType"]) {
    case "CspmMonitorAws":
      return cspmMonitorAwsOfferingDeserializer(item as CspmMonitorAwsOffering);

    case "DefenderForContainersAws":
      return defenderForContainersAwsOfferingDeserializer(item as DefenderForContainersAwsOffering);

    case "DefenderForServersAws":
      return defenderForServersAwsOfferingDeserializer(item as DefenderForServersAwsOffering);

    case "DefenderForDatabasesAws":
      return defenderFoDatabasesAwsOfferingDeserializer(item as DefenderFoDatabasesAwsOffering);

    case "CspmMonitorGcp":
      return cspmMonitorGcpOfferingDeserializer(item as CspmMonitorGcpOffering);

    case "DefenderForServersGcp":
      return defenderForServersGcpOfferingDeserializer(item as DefenderForServersGcpOffering);

    case "DefenderForDatabasesGcp":
      return defenderForDatabasesGcpOfferingDeserializer(item as DefenderForDatabasesGcpOffering);

    case "DefenderForContainersGcp":
      return defenderForContainersGcpOfferingDeserializer(item as DefenderForContainersGcpOffering);

    case "CspmMonitorGithub":
      return cspmMonitorGithubOfferingDeserializer(item as CspmMonitorGithubOffering);

    case "CspmMonitorAzureDevOps":
      return cspmMonitorAzureDevOpsOfferingDeserializer(item as CspmMonitorAzureDevOpsOffering);

    case "DefenderCspmAws":
      return defenderCspmAwsOfferingDeserializer(item as DefenderCspmAwsOffering);

    case "DefenderCspmGcp":
      return defenderCspmGcpOfferingDeserializer(item as DefenderCspmGcpOffering);

    case "CspmMonitorGitLab":
      return cspmMonitorGitLabOfferingDeserializer(item as CspmMonitorGitLabOffering);

    case "CspmMonitorDockerHub":
      return cspmMonitorDockerHubOfferingDeserializer(item as CspmMonitorDockerHubOffering);

    case "DefenderForContainersDockerHub":
      return defenderForContainersDockerHubOfferingDeserializer(
        item as DefenderForContainersDockerHubOffering,
      );

    case "DefenderCspmDockerHub":
      return defenderCspmDockerHubOfferingDeserializer(item as DefenderCspmDockerHubOffering);

    case "CspmMonitorJFrog":
      return cspmMonitorJFrogOfferingDeserializer(item as CspmMonitorJFrogOffering);

    case "DefenderForContainersJFrog":
      return defenderForContainersJFrogOfferingDeserializer(
        item as DefenderForContainersJFrogOffering,
      );

    case "DefenderCspmJFrog":
      return defenderCspmJFrogOfferingDeserializer(item as DefenderCspmJFrogOffering);

    default:
      return cloudOfferingDeserializer(item);
  }
}

/** The type of the security offering. */
export enum KnownOfferingType {
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
 * {@link KnownOfferingType} can be used interchangeably with OfferingType,
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
export type OfferingType = string;

/** The CSPM monitoring for AWS offering */
export interface CspmMonitorAwsOffering extends CloudOffering {
  /** The native cloud connection configuration */
  nativeCloudConnection?: CspmMonitorAwsOfferingNativeCloudConnection;
  /** The type of the security offering. */
  offeringType: "CspmMonitorAws";
}

export function cspmMonitorAwsOfferingSerializer(item: CspmMonitorAwsOffering): any {
  return {
    offeringType: item["offeringType"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : cspmMonitorAwsOfferingNativeCloudConnectionSerializer(item["nativeCloudConnection"]),
  };
}

export function cspmMonitorAwsOfferingDeserializer(item: any): CspmMonitorAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : cspmMonitorAwsOfferingNativeCloudConnectionDeserializer(item["nativeCloudConnection"]),
  };
}

/** The native cloud connection configuration */
export interface CspmMonitorAwsOfferingNativeCloudConnection {
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function cspmMonitorAwsOfferingNativeCloudConnectionSerializer(
  item: CspmMonitorAwsOfferingNativeCloudConnection,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function cspmMonitorAwsOfferingNativeCloudConnectionDeserializer(
  item: any,
): CspmMonitorAwsOfferingNativeCloudConnection {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Defender for Containers AWS offering */
export interface DefenderForContainersAwsOffering extends CloudOffering {
  /** The kubernetes service connection configuration */
  kubernetesService?: DefenderForContainersAwsOfferingKubernetesService;
  /** The kubernetes data collection connection configuration */
  kubernetesDataCollection?: DefenderForContainersAwsOfferingKubernetesDataCollection;
  /** The cloudwatch to kinesis connection configuration */
  cloudWatchToKinesis?: DefenderForContainersAwsOfferingCloudWatchToKinesis;
  /** The kinesis to s3 connection configuration */
  kinesisToS3?: DefenderForContainersAwsOfferingKinesisToS3;
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
  mdcContainersImageAssessment?: DefenderForContainersAwsOfferingMdcContainersImageAssessment;
  /** The Microsoft Defender container agentless discovery K8s configuration */
  mdcContainersAgentlessDiscoveryK8S?: DefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S;
  /** The Microsoft Defender for Container K8s VM host scanning configuration */
  vmScanners?: DefenderForContainersAwsOfferingVmScanners;
  /** The type of the security offering. */
  offeringType: "DefenderForContainersAws";
}

export function defenderForContainersAwsOfferingSerializer(
  item: DefenderForContainersAwsOffering,
): any {
  return {
    offeringType: item["offeringType"],
    kubernetesService: !item["kubernetesService"]
      ? item["kubernetesService"]
      : defenderForContainersAwsOfferingKubernetesServiceSerializer(item["kubernetesService"]),
    kubernetesDataCollection: !item["kubernetesDataCollection"]
      ? item["kubernetesDataCollection"]
      : defenderForContainersAwsOfferingKubernetesDataCollectionSerializer(
          item["kubernetesDataCollection"],
        ),
    cloudWatchToKinesis: !item["cloudWatchToKinesis"]
      ? item["cloudWatchToKinesis"]
      : defenderForContainersAwsOfferingCloudWatchToKinesisSerializer(item["cloudWatchToKinesis"]),
    kinesisToS3: !item["kinesisToS3"]
      ? item["kinesisToS3"]
      : defenderForContainersAwsOfferingKinesisToS3Serializer(item["kinesisToS3"]),
    enableAuditLogsAutoProvisioning: item["enableAuditLogsAutoProvisioning"],
    enableDefenderAgentAutoProvisioning: item["enableDefenderAgentAutoProvisioning"],
    enablePolicyAgentAutoProvisioning: item["enablePolicyAgentAutoProvisioning"],
    kubeAuditRetentionTime: item["kubeAuditRetentionTime"],
    dataCollectionExternalId: item["dataCollectionExternalId"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderForContainersAwsOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8s: !item["mdcContainersAgentlessDiscoveryK8S"]
      ? item["mdcContainersAgentlessDiscoveryK8S"]
      : defenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
          item["mdcContainersAgentlessDiscoveryK8S"],
        ),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderForContainersAwsOfferingVmScannersSerializer(item["vmScanners"]),
  };
}

export function defenderForContainersAwsOfferingDeserializer(
  item: any,
): DefenderForContainersAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    kubernetesService: !item["kubernetesService"]
      ? item["kubernetesService"]
      : defenderForContainersAwsOfferingKubernetesServiceDeserializer(item["kubernetesService"]),
    kubernetesDataCollection: !item["kubernetesDataCollection"]
      ? item["kubernetesDataCollection"]
      : defenderForContainersAwsOfferingKubernetesDataCollectionDeserializer(
          item["kubernetesDataCollection"],
        ),
    cloudWatchToKinesis: !item["cloudWatchToKinesis"]
      ? item["cloudWatchToKinesis"]
      : defenderForContainersAwsOfferingCloudWatchToKinesisDeserializer(
          item["cloudWatchToKinesis"],
        ),
    kinesisToS3: !item["kinesisToS3"]
      ? item["kinesisToS3"]
      : defenderForContainersAwsOfferingKinesisToS3Deserializer(item["kinesisToS3"]),
    enableAuditLogsAutoProvisioning: item["enableAuditLogsAutoProvisioning"],
    enableDefenderAgentAutoProvisioning: item["enableDefenderAgentAutoProvisioning"],
    enablePolicyAgentAutoProvisioning: item["enablePolicyAgentAutoProvisioning"],
    kubeAuditRetentionTime: item["kubeAuditRetentionTime"],
    dataCollectionExternalId: item["dataCollectionExternalId"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderForContainersAwsOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8S: !item["mdcContainersAgentlessDiscoveryK8s"]
      ? item["mdcContainersAgentlessDiscoveryK8s"]
      : defenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
          item["mdcContainersAgentlessDiscoveryK8s"],
        ),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderForContainersAwsOfferingVmScannersDeserializer(item["vmScanners"]),
  };
}

/** The kubernetes service connection configuration */
export interface DefenderForContainersAwsOfferingKubernetesService {
  /** The cloud role ARN in AWS for this feature used for provisioning resources */
  cloudRoleArn?: string;
}

export function defenderForContainersAwsOfferingKubernetesServiceSerializer(
  item: DefenderForContainersAwsOfferingKubernetesService,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderForContainersAwsOfferingKubernetesServiceDeserializer(
  item: any,
): DefenderForContainersAwsOfferingKubernetesService {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The kubernetes data collection connection configuration */
export interface DefenderForContainersAwsOfferingKubernetesDataCollection {
  /** The cloud role ARN in AWS for this feature used for reading data */
  cloudRoleArn?: string;
}

export function defenderForContainersAwsOfferingKubernetesDataCollectionSerializer(
  item: DefenderForContainersAwsOfferingKubernetesDataCollection,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderForContainersAwsOfferingKubernetesDataCollectionDeserializer(
  item: any,
): DefenderForContainersAwsOfferingKubernetesDataCollection {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The cloudwatch to kinesis connection configuration */
export interface DefenderForContainersAwsOfferingCloudWatchToKinesis {
  /** The cloud role ARN in AWS used by CloudWatch to transfer data into Kinesis */
  cloudRoleArn?: string;
}

export function defenderForContainersAwsOfferingCloudWatchToKinesisSerializer(
  item: DefenderForContainersAwsOfferingCloudWatchToKinesis,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderForContainersAwsOfferingCloudWatchToKinesisDeserializer(
  item: any,
): DefenderForContainersAwsOfferingCloudWatchToKinesis {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The kinesis to s3 connection configuration */
export interface DefenderForContainersAwsOfferingKinesisToS3 {
  /** The cloud role ARN in AWS used by Kinesis to transfer data into S3 */
  cloudRoleArn?: string;
}

export function defenderForContainersAwsOfferingKinesisToS3Serializer(
  item: DefenderForContainersAwsOfferingKinesisToS3,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderForContainersAwsOfferingKinesisToS3Deserializer(
  item: any,
): DefenderForContainersAwsOfferingKinesisToS3 {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Microsoft Defender container image assessment configuration */
export interface DefenderForContainersAwsOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function defenderForContainersAwsOfferingMdcContainersImageAssessmentSerializer(
  item: DefenderForContainersAwsOfferingMdcContainersImageAssessment,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderForContainersAwsOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): DefenderForContainersAwsOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Microsoft Defender container agentless discovery K8s configuration */
export interface DefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S {
  /** Is Microsoft Defender container agentless discovery K8s enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function defenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
  item: DefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
  item: any,
): DefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Microsoft Defender for Container K8s VM host scanning configuration */
export interface DefenderForContainersAwsOfferingVmScanners extends VmScannersAws {}

export function defenderForContainersAwsOfferingVmScannersSerializer(
  item: DefenderForContainersAwsOfferingVmScanners,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function defenderForContainersAwsOfferingVmScannersDeserializer(
  item: any,
): DefenderForContainersAwsOfferingVmScanners {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Defender for Servers AWS offering */
export interface DefenderForServersAwsOffering extends CloudOffering {
  /** The Defender for servers connection configuration */
  defenderForServers?: DefenderForServersAwsOfferingDefenderForServers;
  /** The ARC autoprovisioning configuration */
  arcAutoProvisioning?: DefenderForServersAwsOfferingArcAutoProvisioning;
  /** The Vulnerability Assessment autoprovisioning configuration */
  vaAutoProvisioning?: DefenderForServersAwsOfferingVaAutoProvisioning;
  /** The Microsoft Defender for Endpoint autoprovisioning configuration */
  mdeAutoProvisioning?: DefenderForServersAwsOfferingMdeAutoProvisioning;
  /** configuration for the servers offering subPlan */
  subPlan?: DefenderForServersAwsOfferingSubPlan;
  /** The Microsoft Defender for Server VM scanning configuration */
  vmScanners?: DefenderForServersAwsOfferingVmScanners;
  /** The type of the security offering. */
  offeringType: "DefenderForServersAws";
}

export function defenderForServersAwsOfferingSerializer(item: DefenderForServersAwsOffering): any {
  return {
    offeringType: item["offeringType"],
    defenderForServers: !item["defenderForServers"]
      ? item["defenderForServers"]
      : defenderForServersAwsOfferingDefenderForServersSerializer(item["defenderForServers"]),
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : defenderForServersAwsOfferingArcAutoProvisioningSerializer(item["arcAutoProvisioning"]),
    vaAutoProvisioning: !item["vaAutoProvisioning"]
      ? item["vaAutoProvisioning"]
      : defenderForServersAwsOfferingVaAutoProvisioningSerializer(item["vaAutoProvisioning"]),
    mdeAutoProvisioning: !item["mdeAutoProvisioning"]
      ? item["mdeAutoProvisioning"]
      : defenderForServersAwsOfferingMdeAutoProvisioningSerializer(item["mdeAutoProvisioning"]),
    subPlan: !item["subPlan"]
      ? item["subPlan"]
      : defenderForServersAwsOfferingSubPlanSerializer(item["subPlan"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderForServersAwsOfferingVmScannersSerializer(item["vmScanners"]),
  };
}

export function defenderForServersAwsOfferingDeserializer(
  item: any,
): DefenderForServersAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    defenderForServers: !item["defenderForServers"]
      ? item["defenderForServers"]
      : defenderForServersAwsOfferingDefenderForServersDeserializer(item["defenderForServers"]),
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : defenderForServersAwsOfferingArcAutoProvisioningDeserializer(item["arcAutoProvisioning"]),
    vaAutoProvisioning: !item["vaAutoProvisioning"]
      ? item["vaAutoProvisioning"]
      : defenderForServersAwsOfferingVaAutoProvisioningDeserializer(item["vaAutoProvisioning"]),
    mdeAutoProvisioning: !item["mdeAutoProvisioning"]
      ? item["mdeAutoProvisioning"]
      : defenderForServersAwsOfferingMdeAutoProvisioningDeserializer(item["mdeAutoProvisioning"]),
    subPlan: !item["subPlan"]
      ? item["subPlan"]
      : defenderForServersAwsOfferingSubPlanDeserializer(item["subPlan"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderForServersAwsOfferingVmScannersDeserializer(item["vmScanners"]),
  };
}

/** The Defender for servers connection configuration */
export interface DefenderForServersAwsOfferingDefenderForServers {
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function defenderForServersAwsOfferingDefenderForServersSerializer(
  item: DefenderForServersAwsOfferingDefenderForServers,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderForServersAwsOfferingDefenderForServersDeserializer(
  item: any,
): DefenderForServersAwsOfferingDefenderForServers {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The ARC autoprovisioning configuration */
export interface DefenderForServersAwsOfferingArcAutoProvisioning extends ArcAutoProvisioningAws {}

export function defenderForServersAwsOfferingArcAutoProvisioningSerializer(
  item: DefenderForServersAwsOfferingArcAutoProvisioning,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function defenderForServersAwsOfferingArcAutoProvisioningDeserializer(
  item: any,
): DefenderForServersAwsOfferingArcAutoProvisioning {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** The Vulnerability Assessment autoprovisioning configuration */
export interface DefenderForServersAwsOfferingVaAutoProvisioning {
  /** Is Vulnerability Assessment auto provisioning enabled */
  enabled?: boolean;
  /** configuration for Vulnerability Assessment autoprovisioning */
  configuration?: DefenderForServersAwsOfferingVaAutoProvisioningConfiguration;
}

export function defenderForServersAwsOfferingVaAutoProvisioningSerializer(
  item: DefenderForServersAwsOfferingVaAutoProvisioning,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : defenderForServersAwsOfferingVaAutoProvisioningConfigurationSerializer(
          item["configuration"],
        ),
  };
}

export function defenderForServersAwsOfferingVaAutoProvisioningDeserializer(
  item: any,
): DefenderForServersAwsOfferingVaAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : defenderForServersAwsOfferingVaAutoProvisioningConfigurationDeserializer(
          item["configuration"],
        ),
  };
}

/** configuration for Vulnerability Assessment autoprovisioning */
export interface DefenderForServersAwsOfferingVaAutoProvisioningConfiguration {
  /** The Vulnerability Assessment solution to be provisioned. Can be either 'TVM' or 'Qualys' */
  type?: Type;
}

export function defenderForServersAwsOfferingVaAutoProvisioningConfigurationSerializer(
  item: DefenderForServersAwsOfferingVaAutoProvisioningConfiguration,
): any {
  return { type: item["type"] };
}

export function defenderForServersAwsOfferingVaAutoProvisioningConfigurationDeserializer(
  item: any,
): DefenderForServersAwsOfferingVaAutoProvisioningConfiguration {
  return {
    type: item["type"],
  };
}

/** The Vulnerability Assessment solution to be provisioned. Can be either 'TVM' or 'Qualys' */
export enum KnownType {
  /** Qualys */
  Qualys = "Qualys",
  /** TVM */
  TVM = "TVM",
}

/**
 * The Vulnerability Assessment solution to be provisioned. Can be either 'TVM' or 'Qualys' \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Qualys**: Qualys \
 * **TVM**: TVM
 */
export type Type = string;

/** The Microsoft Defender for Endpoint autoprovisioning configuration */
export interface DefenderForServersAwsOfferingMdeAutoProvisioning {
  /** Is Microsoft Defender for Endpoint auto provisioning enabled */
  enabled?: boolean;
  /** configuration for Microsoft Defender for Endpoint autoprovisioning */
  configuration?: any;
}

export function defenderForServersAwsOfferingMdeAutoProvisioningSerializer(
  item: DefenderForServersAwsOfferingMdeAutoProvisioning,
): any {
  return { enabled: item["enabled"], configuration: item["configuration"] };
}

export function defenderForServersAwsOfferingMdeAutoProvisioningDeserializer(
  item: any,
): DefenderForServersAwsOfferingMdeAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: item["configuration"],
  };
}

/** configuration for the servers offering subPlan */
export interface DefenderForServersAwsOfferingSubPlan {
  /** The available sub plans */
  type?: SubPlan;
}

export function defenderForServersAwsOfferingSubPlanSerializer(
  item: DefenderForServersAwsOfferingSubPlan,
): any {
  return { type: item["type"] };
}

export function defenderForServersAwsOfferingSubPlanDeserializer(
  item: any,
): DefenderForServersAwsOfferingSubPlan {
  return {
    type: item["type"],
  };
}

/** The available sub plans */
export enum KnownSubPlan {
  /** P1 */
  P1 = "P1",
  /** P2 */
  P2 = "P2",
}

/**
 * The available sub plans \
 * {@link KnownSubPlan} can be used interchangeably with SubPlan,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P1**: P1 \
 * **P2**: P2
 */
export type SubPlan = string;

/** The Microsoft Defender for Server VM scanning configuration */
export interface DefenderForServersAwsOfferingVmScanners extends VmScannersAws {}

export function defenderForServersAwsOfferingVmScannersSerializer(
  item: DefenderForServersAwsOfferingVmScanners,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function defenderForServersAwsOfferingVmScannersDeserializer(
  item: any,
): DefenderForServersAwsOfferingVmScanners {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Defender for Databases AWS offering */
export interface DefenderFoDatabasesAwsOffering extends CloudOffering {
  /** The ARC autoprovisioning configuration */
  arcAutoProvisioning?: DefenderFoDatabasesAwsOfferingArcAutoProvisioning;
  /** The RDS configuration */
  rds?: DefenderFoDatabasesAwsOfferingRds;
  /** The databases data security posture management (DSPM) configuration */
  databasesDspm?: DefenderFoDatabasesAwsOfferingDatabasesDspm;
  /** The type of the security offering. */
  offeringType: "DefenderForDatabasesAws";
}

export function defenderFoDatabasesAwsOfferingSerializer(
  item: DefenderFoDatabasesAwsOffering,
): any {
  return {
    offeringType: item["offeringType"],
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : defenderFoDatabasesAwsOfferingArcAutoProvisioningSerializer(item["arcAutoProvisioning"]),
    rds: !item["rds"] ? item["rds"] : defenderFoDatabasesAwsOfferingRdsSerializer(item["rds"]),
    databasesDspm: !item["databasesDspm"]
      ? item["databasesDspm"]
      : defenderFoDatabasesAwsOfferingDatabasesDspmSerializer(item["databasesDspm"]),
  };
}

export function defenderFoDatabasesAwsOfferingDeserializer(
  item: any,
): DefenderFoDatabasesAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : defenderFoDatabasesAwsOfferingArcAutoProvisioningDeserializer(item["arcAutoProvisioning"]),
    rds: !item["rds"] ? item["rds"] : defenderFoDatabasesAwsOfferingRdsDeserializer(item["rds"]),
    databasesDspm: !item["databasesDspm"]
      ? item["databasesDspm"]
      : defenderFoDatabasesAwsOfferingDatabasesDspmDeserializer(item["databasesDspm"]),
  };
}

/** The ARC autoprovisioning configuration */
export interface DefenderFoDatabasesAwsOfferingArcAutoProvisioning extends ArcAutoProvisioningAws {}

export function defenderFoDatabasesAwsOfferingArcAutoProvisioningSerializer(
  item: DefenderFoDatabasesAwsOfferingArcAutoProvisioning,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function defenderFoDatabasesAwsOfferingArcAutoProvisioningDeserializer(
  item: any,
): DefenderFoDatabasesAwsOfferingArcAutoProvisioning {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** The RDS configuration */
export interface DefenderFoDatabasesAwsOfferingRds {
  /** Is RDS protection enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function defenderFoDatabasesAwsOfferingRdsSerializer(
  item: DefenderFoDatabasesAwsOfferingRds,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderFoDatabasesAwsOfferingRdsDeserializer(
  item: any,
): DefenderFoDatabasesAwsOfferingRds {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The databases data security posture management (DSPM) configuration */
export interface DefenderFoDatabasesAwsOfferingDatabasesDspm {
  /** Is databases data security posture management (DSPM) protection enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function defenderFoDatabasesAwsOfferingDatabasesDspmSerializer(
  item: DefenderFoDatabasesAwsOfferingDatabasesDspm,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderFoDatabasesAwsOfferingDatabasesDspmDeserializer(
  item: any,
): DefenderFoDatabasesAwsOfferingDatabasesDspm {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The CSPM monitoring for GCP offering */
export interface CspmMonitorGcpOffering extends CloudOffering {
  /** The native cloud connection configuration */
  nativeCloudConnection?: CspmMonitorGcpOfferingNativeCloudConnection;
  /** The type of the security offering. */
  offeringType: "CspmMonitorGcp";
}

export function cspmMonitorGcpOfferingSerializer(item: CspmMonitorGcpOffering): any {
  return {
    offeringType: item["offeringType"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : cspmMonitorGcpOfferingNativeCloudConnectionSerializer(item["nativeCloudConnection"]),
  };
}

export function cspmMonitorGcpOfferingDeserializer(item: any): CspmMonitorGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : cspmMonitorGcpOfferingNativeCloudConnectionDeserializer(item["nativeCloudConnection"]),
  };
}

/** The native cloud connection configuration */
export interface CspmMonitorGcpOfferingNativeCloudConnection {
  /** The GCP workload identity provider id for the offering */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this offering */
  serviceAccountEmailAddress?: string;
}

export function cspmMonitorGcpOfferingNativeCloudConnectionSerializer(
  item: CspmMonitorGcpOfferingNativeCloudConnection,
): any {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function cspmMonitorGcpOfferingNativeCloudConnectionDeserializer(
  item: any,
): CspmMonitorGcpOfferingNativeCloudConnection {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Defender for Servers GCP offering configurations */
export interface DefenderForServersGcpOffering extends CloudOffering {
  /** The Defender for servers connection configuration */
  defenderForServers?: DefenderForServersGcpOfferingDefenderForServers;
  /** The ARC autoprovisioning configuration */
  arcAutoProvisioning?: DefenderForServersGcpOfferingArcAutoProvisioning;
  /** The Vulnerability Assessment autoprovisioning configuration */
  vaAutoProvisioning?: DefenderForServersGcpOfferingVaAutoProvisioning;
  /** The Microsoft Defender for Endpoint autoprovisioning configuration */
  mdeAutoProvisioning?: DefenderForServersGcpOfferingMdeAutoProvisioning;
  /** configuration for the servers offering subPlan */
  subPlan?: DefenderForServersGcpOfferingSubPlan;
  /** The Microsoft Defender for Server VM scanning configuration */
  vmScanners?: DefenderForServersGcpOfferingVmScanners;
  /** The type of the security offering. */
  offeringType: "DefenderForServersGcp";
}

export function defenderForServersGcpOfferingSerializer(item: DefenderForServersGcpOffering): any {
  return {
    offeringType: item["offeringType"],
    defenderForServers: !item["defenderForServers"]
      ? item["defenderForServers"]
      : defenderForServersGcpOfferingDefenderForServersSerializer(item["defenderForServers"]),
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : defenderForServersGcpOfferingArcAutoProvisioningSerializer(item["arcAutoProvisioning"]),
    vaAutoProvisioning: !item["vaAutoProvisioning"]
      ? item["vaAutoProvisioning"]
      : defenderForServersGcpOfferingVaAutoProvisioningSerializer(item["vaAutoProvisioning"]),
    mdeAutoProvisioning: !item["mdeAutoProvisioning"]
      ? item["mdeAutoProvisioning"]
      : defenderForServersGcpOfferingMdeAutoProvisioningSerializer(item["mdeAutoProvisioning"]),
    subPlan: !item["subPlan"]
      ? item["subPlan"]
      : defenderForServersGcpOfferingSubPlanSerializer(item["subPlan"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderForServersGcpOfferingVmScannersSerializer(item["vmScanners"]),
  };
}

export function defenderForServersGcpOfferingDeserializer(
  item: any,
): DefenderForServersGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    defenderForServers: !item["defenderForServers"]
      ? item["defenderForServers"]
      : defenderForServersGcpOfferingDefenderForServersDeserializer(item["defenderForServers"]),
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : defenderForServersGcpOfferingArcAutoProvisioningDeserializer(item["arcAutoProvisioning"]),
    vaAutoProvisioning: !item["vaAutoProvisioning"]
      ? item["vaAutoProvisioning"]
      : defenderForServersGcpOfferingVaAutoProvisioningDeserializer(item["vaAutoProvisioning"]),
    mdeAutoProvisioning: !item["mdeAutoProvisioning"]
      ? item["mdeAutoProvisioning"]
      : defenderForServersGcpOfferingMdeAutoProvisioningDeserializer(item["mdeAutoProvisioning"]),
    subPlan: !item["subPlan"]
      ? item["subPlan"]
      : defenderForServersGcpOfferingSubPlanDeserializer(item["subPlan"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderForServersGcpOfferingVmScannersDeserializer(item["vmScanners"]),
  };
}

/** The Defender for servers connection configuration */
export interface DefenderForServersGcpOfferingDefenderForServers {
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function defenderForServersGcpOfferingDefenderForServersSerializer(
  item: DefenderForServersGcpOfferingDefenderForServers,
): any {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function defenderForServersGcpOfferingDefenderForServersDeserializer(
  item: any,
): DefenderForServersGcpOfferingDefenderForServers {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The ARC autoprovisioning configuration */
export interface DefenderForServersGcpOfferingArcAutoProvisioning extends ArcAutoProvisioningGcp {}

export function defenderForServersGcpOfferingArcAutoProvisioningSerializer(
  item: DefenderForServersGcpOfferingArcAutoProvisioning,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function defenderForServersGcpOfferingArcAutoProvisioningDeserializer(
  item: any,
): DefenderForServersGcpOfferingArcAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** The Vulnerability Assessment autoprovisioning configuration */
export interface DefenderForServersGcpOfferingVaAutoProvisioning {
  /** Is Vulnerability Assessment auto provisioning enabled */
  enabled?: boolean;
  /** configuration for Vulnerability Assessment autoprovisioning */
  configuration?: DefenderForServersGcpOfferingVaAutoProvisioningConfiguration;
}

export function defenderForServersGcpOfferingVaAutoProvisioningSerializer(
  item: DefenderForServersGcpOfferingVaAutoProvisioning,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : defenderForServersGcpOfferingVaAutoProvisioningConfigurationSerializer(
          item["configuration"],
        ),
  };
}

export function defenderForServersGcpOfferingVaAutoProvisioningDeserializer(
  item: any,
): DefenderForServersGcpOfferingVaAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : defenderForServersGcpOfferingVaAutoProvisioningConfigurationDeserializer(
          item["configuration"],
        ),
  };
}

/** configuration for Vulnerability Assessment autoprovisioning */
export interface DefenderForServersGcpOfferingVaAutoProvisioningConfiguration {
  /** The Vulnerability Assessment solution to be provisioned. Can be either 'TVM' or 'Qualys' */
  type?: Type;
}

export function defenderForServersGcpOfferingVaAutoProvisioningConfigurationSerializer(
  item: DefenderForServersGcpOfferingVaAutoProvisioningConfiguration,
): any {
  return { type: item["type"] };
}

export function defenderForServersGcpOfferingVaAutoProvisioningConfigurationDeserializer(
  item: any,
): DefenderForServersGcpOfferingVaAutoProvisioningConfiguration {
  return {
    type: item["type"],
  };
}

/** The Microsoft Defender for Endpoint autoprovisioning configuration */
export interface DefenderForServersGcpOfferingMdeAutoProvisioning {
  /** Is Microsoft Defender for Endpoint auto provisioning enabled */
  enabled?: boolean;
  /** configuration for Microsoft Defender for Endpoint autoprovisioning */
  configuration?: any;
}

export function defenderForServersGcpOfferingMdeAutoProvisioningSerializer(
  item: DefenderForServersGcpOfferingMdeAutoProvisioning,
): any {
  return { enabled: item["enabled"], configuration: item["configuration"] };
}

export function defenderForServersGcpOfferingMdeAutoProvisioningDeserializer(
  item: any,
): DefenderForServersGcpOfferingMdeAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: item["configuration"],
  };
}

/** configuration for the servers offering subPlan */
export interface DefenderForServersGcpOfferingSubPlan {
  /** The available sub plans */
  type?: SubPlan;
}

export function defenderForServersGcpOfferingSubPlanSerializer(
  item: DefenderForServersGcpOfferingSubPlan,
): any {
  return { type: item["type"] };
}

export function defenderForServersGcpOfferingSubPlanDeserializer(
  item: any,
): DefenderForServersGcpOfferingSubPlan {
  return {
    type: item["type"],
  };
}

/** The Microsoft Defender for Server VM scanning configuration */
export interface DefenderForServersGcpOfferingVmScanners extends VmScannersGcp {}

export function defenderForServersGcpOfferingVmScannersSerializer(
  item: DefenderForServersGcpOfferingVmScanners,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function defenderForServersGcpOfferingVmScannersDeserializer(
  item: any,
): DefenderForServersGcpOfferingVmScanners {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Defender for Databases GCP offering configurations */
export interface DefenderForDatabasesGcpOffering extends CloudOffering {
  /** The ARC autoprovisioning configuration */
  arcAutoProvisioning?: DefenderForDatabasesGcpOfferingArcAutoProvisioning;
  /** The native cloud connection configuration */
  defenderForDatabasesArcAutoProvisioning?: DefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning;
  /** The type of the security offering. */
  offeringType: "DefenderForDatabasesGcp";
}

export function defenderForDatabasesGcpOfferingSerializer(
  item: DefenderForDatabasesGcpOffering,
): any {
  return {
    offeringType: item["offeringType"],
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : defenderForDatabasesGcpOfferingArcAutoProvisioningSerializer(item["arcAutoProvisioning"]),
    defenderForDatabasesArcAutoProvisioning: !item["defenderForDatabasesArcAutoProvisioning"]
      ? item["defenderForDatabasesArcAutoProvisioning"]
      : defenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioningSerializer(
          item["defenderForDatabasesArcAutoProvisioning"],
        ),
  };
}

export function defenderForDatabasesGcpOfferingDeserializer(
  item: any,
): DefenderForDatabasesGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    arcAutoProvisioning: !item["arcAutoProvisioning"]
      ? item["arcAutoProvisioning"]
      : defenderForDatabasesGcpOfferingArcAutoProvisioningDeserializer(item["arcAutoProvisioning"]),
    defenderForDatabasesArcAutoProvisioning: !item["defenderForDatabasesArcAutoProvisioning"]
      ? item["defenderForDatabasesArcAutoProvisioning"]
      : defenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioningDeserializer(
          item["defenderForDatabasesArcAutoProvisioning"],
        ),
  };
}

/** The ARC autoprovisioning configuration */
export interface DefenderForDatabasesGcpOfferingArcAutoProvisioning extends ArcAutoProvisioningGcp {}

export function defenderForDatabasesGcpOfferingArcAutoProvisioningSerializer(
  item: DefenderForDatabasesGcpOfferingArcAutoProvisioning,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function defenderForDatabasesGcpOfferingArcAutoProvisioningDeserializer(
  item: any,
): DefenderForDatabasesGcpOfferingArcAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** The native cloud connection configuration */
export interface DefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning {
  /** The service account email address in GCP for this offering */
  serviceAccountEmailAddress?: string;
  /** The GCP workload identity provider id for this offering */
  workloadIdentityProviderId?: string;
}

export function defenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioningSerializer(
  item: DefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning,
): any {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

export function defenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioningDeserializer(
  item: any,
): DefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

/** The containers GCP offering */
export interface DefenderForContainersGcpOffering extends CloudOffering {
  /** The native cloud connection configuration */
  nativeCloudConnection?: DefenderForContainersGcpOfferingNativeCloudConnection;
  /** The native cloud connection configuration */
  dataPipelineNativeCloudConnection?: DefenderForContainersGcpOfferingDataPipelineNativeCloudConnection;
  /** Is audit logs data collection enabled */
  enableAuditLogsAutoProvisioning?: boolean;
  /** Is Microsoft Defender for Cloud Kubernetes agent auto provisioning enabled */
  enableDefenderAgentAutoProvisioning?: boolean;
  /** Is Policy Kubernetes agent auto provisioning enabled */
  enablePolicyAgentAutoProvisioning?: boolean;
  /** The Microsoft Defender Container image assessment configuration */
  mdcContainersImageAssessment?: DefenderForContainersGcpOfferingMdcContainersImageAssessment;
  /** The Microsoft Defender Container agentless discovery configuration */
  mdcContainersAgentlessDiscoveryK8S?: DefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S;
  /** The Microsoft Defender for Container K8s VM host scanning configuration */
  vmScanners?: DefenderForContainersGcpOfferingVmScanners;
  /** The type of the security offering. */
  offeringType: "DefenderForContainersGcp";
}

export function defenderForContainersGcpOfferingSerializer(
  item: DefenderForContainersGcpOffering,
): any {
  return {
    offeringType: item["offeringType"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : defenderForContainersGcpOfferingNativeCloudConnectionSerializer(
          item["nativeCloudConnection"],
        ),
    dataPipelineNativeCloudConnection: !item["dataPipelineNativeCloudConnection"]
      ? item["dataPipelineNativeCloudConnection"]
      : defenderForContainersGcpOfferingDataPipelineNativeCloudConnectionSerializer(
          item["dataPipelineNativeCloudConnection"],
        ),
    enableAuditLogsAutoProvisioning: item["enableAuditLogsAutoProvisioning"],
    enableDefenderAgentAutoProvisioning: item["enableDefenderAgentAutoProvisioning"],
    enablePolicyAgentAutoProvisioning: item["enablePolicyAgentAutoProvisioning"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderForContainersGcpOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8s: !item["mdcContainersAgentlessDiscoveryK8S"]
      ? item["mdcContainersAgentlessDiscoveryK8S"]
      : defenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
          item["mdcContainersAgentlessDiscoveryK8S"],
        ),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderForContainersGcpOfferingVmScannersSerializer(item["vmScanners"]),
  };
}

export function defenderForContainersGcpOfferingDeserializer(
  item: any,
): DefenderForContainersGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    nativeCloudConnection: !item["nativeCloudConnection"]
      ? item["nativeCloudConnection"]
      : defenderForContainersGcpOfferingNativeCloudConnectionDeserializer(
          item["nativeCloudConnection"],
        ),
    dataPipelineNativeCloudConnection: !item["dataPipelineNativeCloudConnection"]
      ? item["dataPipelineNativeCloudConnection"]
      : defenderForContainersGcpOfferingDataPipelineNativeCloudConnectionDeserializer(
          item["dataPipelineNativeCloudConnection"],
        ),
    enableAuditLogsAutoProvisioning: item["enableAuditLogsAutoProvisioning"],
    enableDefenderAgentAutoProvisioning: item["enableDefenderAgentAutoProvisioning"],
    enablePolicyAgentAutoProvisioning: item["enablePolicyAgentAutoProvisioning"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderForContainersGcpOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8S: !item["mdcContainersAgentlessDiscoveryK8s"]
      ? item["mdcContainersAgentlessDiscoveryK8s"]
      : defenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
          item["mdcContainersAgentlessDiscoveryK8s"],
        ),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderForContainersGcpOfferingVmScannersDeserializer(item["vmScanners"]),
  };
}

/** The native cloud connection configuration */
export interface DefenderForContainersGcpOfferingNativeCloudConnection {
  /** The service account email address in GCP for this offering */
  serviceAccountEmailAddress?: string;
  /** The GCP workload identity provider id for this offering */
  workloadIdentityProviderId?: string;
}

export function defenderForContainersGcpOfferingNativeCloudConnectionSerializer(
  item: DefenderForContainersGcpOfferingNativeCloudConnection,
): any {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

export function defenderForContainersGcpOfferingNativeCloudConnectionDeserializer(
  item: any,
): DefenderForContainersGcpOfferingNativeCloudConnection {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

/** The native cloud connection configuration */
export interface DefenderForContainersGcpOfferingDataPipelineNativeCloudConnection {
  /** The data collection service account email address in GCP for this offering */
  serviceAccountEmailAddress?: string;
  /** The data collection GCP workload identity provider id for this offering */
  workloadIdentityProviderId?: string;
}

export function defenderForContainersGcpOfferingDataPipelineNativeCloudConnectionSerializer(
  item: DefenderForContainersGcpOfferingDataPipelineNativeCloudConnection,
): any {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

export function defenderForContainersGcpOfferingDataPipelineNativeCloudConnectionDeserializer(
  item: any,
): DefenderForContainersGcpOfferingDataPipelineNativeCloudConnection {
  return {
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

/** The Microsoft Defender Container image assessment configuration */
export interface DefenderForContainersGcpOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function defenderForContainersGcpOfferingMdcContainersImageAssessmentSerializer(
  item: DefenderForContainersGcpOfferingMdcContainersImageAssessment,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function defenderForContainersGcpOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): DefenderForContainersGcpOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Microsoft Defender Container agentless discovery configuration */
export interface DefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S {
  /** Is Microsoft Defender container agentless discovery enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function defenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
  item: DefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function defenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
  item: any,
): DefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Microsoft Defender for Container K8s VM host scanning configuration */
export interface DefenderForContainersGcpOfferingVmScanners extends VmScannersGcp {}

export function defenderForContainersGcpOfferingVmScannersSerializer(
  item: DefenderForContainersGcpOfferingVmScanners,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function defenderForContainersGcpOfferingVmScannersDeserializer(
  item: any,
): DefenderForContainersGcpOfferingVmScanners {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The CSPM monitoring for github offering */
export interface CspmMonitorGithubOffering extends CloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorGithub";
}

export function cspmMonitorGithubOfferingSerializer(item: CspmMonitorGithubOffering): any {
  return { offeringType: item["offeringType"] };
}

export function cspmMonitorGithubOfferingDeserializer(item: any): CspmMonitorGithubOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM monitoring for AzureDevOps offering */
export interface CspmMonitorAzureDevOpsOffering extends CloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorAzureDevOps";
}

export function cspmMonitorAzureDevOpsOfferingSerializer(
  item: CspmMonitorAzureDevOpsOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function cspmMonitorAzureDevOpsOfferingDeserializer(
  item: any,
): CspmMonitorAzureDevOpsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM P1 for AWS offering */
export interface DefenderCspmAwsOffering extends CloudOffering {
  /** The Microsoft Defender for CSPM offering VM scanning configuration */
  vmScanners?: DefenderCspmAwsOfferingVmScanners;
  /** The Microsoft Defender Data Sensitivity discovery configuration */
  dataSensitivityDiscovery?: DefenderCspmAwsOfferingDataSensitivityDiscovery;
  /** The databases DSPM configuration */
  databasesDspm?: DefenderCspmAwsOfferingDatabasesDspm;
  /** Defenders CSPM Permissions Management offering configurations */
  ciem?: DefenderCspmAwsOfferingCiem;
  /** The Microsoft Defender container image assessment configuration */
  mdcContainersImageAssessment?: DefenderCspmAwsOfferingMdcContainersImageAssessment;
  /** The Microsoft Defender container agentless discovery K8s configuration */
  mdcContainersAgentlessDiscoveryK8S?: DefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S;
  /** The type of the security offering. */
  offeringType: "DefenderCspmAws";
}

export function defenderCspmAwsOfferingSerializer(item: DefenderCspmAwsOffering): any {
  return {
    offeringType: item["offeringType"],
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderCspmAwsOfferingVmScannersSerializer(item["vmScanners"]),
    dataSensitivityDiscovery: !item["dataSensitivityDiscovery"]
      ? item["dataSensitivityDiscovery"]
      : defenderCspmAwsOfferingDataSensitivityDiscoverySerializer(item["dataSensitivityDiscovery"]),
    databasesDspm: !item["databasesDspm"]
      ? item["databasesDspm"]
      : defenderCspmAwsOfferingDatabasesDspmSerializer(item["databasesDspm"]),
    ciem: !item["ciem"] ? item["ciem"] : defenderCspmAwsOfferingCiemSerializer(item["ciem"]),
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderCspmAwsOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8s: !item["mdcContainersAgentlessDiscoveryK8S"]
      ? item["mdcContainersAgentlessDiscoveryK8S"]
      : defenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
          item["mdcContainersAgentlessDiscoveryK8S"],
        ),
  };
}

export function defenderCspmAwsOfferingDeserializer(item: any): DefenderCspmAwsOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderCspmAwsOfferingVmScannersDeserializer(item["vmScanners"]),
    dataSensitivityDiscovery: !item["dataSensitivityDiscovery"]
      ? item["dataSensitivityDiscovery"]
      : defenderCspmAwsOfferingDataSensitivityDiscoveryDeserializer(
          item["dataSensitivityDiscovery"],
        ),
    databasesDspm: !item["databasesDspm"]
      ? item["databasesDspm"]
      : defenderCspmAwsOfferingDatabasesDspmDeserializer(item["databasesDspm"]),
    ciem: !item["ciem"] ? item["ciem"] : defenderCspmAwsOfferingCiemDeserializer(item["ciem"]),
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderCspmAwsOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8S: !item["mdcContainersAgentlessDiscoveryK8s"]
      ? item["mdcContainersAgentlessDiscoveryK8s"]
      : defenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
          item["mdcContainersAgentlessDiscoveryK8s"],
        ),
  };
}

/** The Microsoft Defender for CSPM offering VM scanning configuration */
export interface DefenderCspmAwsOfferingVmScanners extends VmScannersAws {}

export function defenderCspmAwsOfferingVmScannersSerializer(
  item: DefenderCspmAwsOfferingVmScanners,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function defenderCspmAwsOfferingVmScannersDeserializer(
  item: any,
): DefenderCspmAwsOfferingVmScanners {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Microsoft Defender Data Sensitivity discovery configuration */
export interface DefenderCspmAwsOfferingDataSensitivityDiscovery {
  /** Is Microsoft Defender Data Sensitivity discovery enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function defenderCspmAwsOfferingDataSensitivityDiscoverySerializer(
  item: DefenderCspmAwsOfferingDataSensitivityDiscovery,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderCspmAwsOfferingDataSensitivityDiscoveryDeserializer(
  item: any,
): DefenderCspmAwsOfferingDataSensitivityDiscovery {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The databases DSPM configuration */
export interface DefenderCspmAwsOfferingDatabasesDspm {
  /** Is databases DSPM protection enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function defenderCspmAwsOfferingDatabasesDspmSerializer(
  item: DefenderCspmAwsOfferingDatabasesDspm,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderCspmAwsOfferingDatabasesDspmDeserializer(
  item: any,
): DefenderCspmAwsOfferingDatabasesDspm {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** Defenders CSPM Permissions Management offering configurations */
export interface DefenderCspmAwsOfferingCiem {
  /** Defender CSPM Permissions Management discovery configuration */
  ciemDiscovery?: DefenderCspmAwsOfferingCiemCiemDiscovery;
  /** AWS Defender CSPM Permissions Management OIDC (open id connect) connection configurations */
  ciemOidc?: DefenderCspmAwsOfferingCiemCiemOidc;
}

export function defenderCspmAwsOfferingCiemSerializer(item: DefenderCspmAwsOfferingCiem): any {
  return {
    ciemDiscovery: !item["ciemDiscovery"]
      ? item["ciemDiscovery"]
      : defenderCspmAwsOfferingCiemCiemDiscoverySerializer(item["ciemDiscovery"]),
    ciemOidc: !item["ciemOidc"]
      ? item["ciemOidc"]
      : defenderCspmAwsOfferingCiemCiemOidcSerializer(item["ciemOidc"]),
  };
}

export function defenderCspmAwsOfferingCiemDeserializer(item: any): DefenderCspmAwsOfferingCiem {
  return {
    ciemDiscovery: !item["ciemDiscovery"]
      ? item["ciemDiscovery"]
      : defenderCspmAwsOfferingCiemCiemDiscoveryDeserializer(item["ciemDiscovery"]),
    ciemOidc: !item["ciemOidc"]
      ? item["ciemOidc"]
      : defenderCspmAwsOfferingCiemCiemOidcDeserializer(item["ciemOidc"]),
  };
}

/** Defender CSPM Permissions Management discovery configuration */
export interface DefenderCspmAwsOfferingCiemCiemDiscovery {
  /** The cloud role ARN in AWS for Permissions Management discovery */
  cloudRoleArn?: string;
}

export function defenderCspmAwsOfferingCiemCiemDiscoverySerializer(
  item: DefenderCspmAwsOfferingCiemCiemDiscovery,
): any {
  return { cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderCspmAwsOfferingCiemCiemDiscoveryDeserializer(
  item: any,
): DefenderCspmAwsOfferingCiemCiemDiscovery {
  return {
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** AWS Defender CSPM Permissions Management OIDC (open id connect) connection configurations */
export interface DefenderCspmAwsOfferingCiemCiemOidc {
  /** The cloud role ARN in AWS for Permissions Management used for oidc connection */
  cloudRoleArn?: string;
  /** the azure active directory app name used of authenticating against AWS */
  azureActiveDirectoryAppName?: string;
}

export function defenderCspmAwsOfferingCiemCiemOidcSerializer(
  item: DefenderCspmAwsOfferingCiemCiemOidc,
): any {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    azureActiveDirectoryAppName: item["azureActiveDirectoryAppName"],
  };
}

export function defenderCspmAwsOfferingCiemCiemOidcDeserializer(
  item: any,
): DefenderCspmAwsOfferingCiemCiemOidc {
  return {
    cloudRoleArn: item["cloudRoleArn"],
    azureActiveDirectoryAppName: item["azureActiveDirectoryAppName"],
  };
}

/** The Microsoft Defender container image assessment configuration */
export interface DefenderCspmAwsOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function defenderCspmAwsOfferingMdcContainersImageAssessmentSerializer(
  item: DefenderCspmAwsOfferingMdcContainersImageAssessment,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderCspmAwsOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): DefenderCspmAwsOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The Microsoft Defender container agentless discovery K8s configuration */
export interface DefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S {
  /** Is Microsoft Defender container agentless discovery K8s enabled */
  enabled?: boolean;
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function defenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
  item: DefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S,
): any {
  return { enabled: item["enabled"], cloudRoleArn: item["cloudRoleArn"] };
}

export function defenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
  item: any,
): DefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S {
  return {
    enabled: item["enabled"],
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The CSPM P1 for GCP offering */
export interface DefenderCspmGcpOffering extends CloudOffering {
  /** GCP Defenders CSPM Permissions Management OIDC (Open ID connect) connection configurations */
  ciemDiscovery?: DefenderCspmGcpOfferingCiemDiscovery;
  /** The Microsoft Defender for CSPM VM scanning configuration */
  vmScanners?: DefenderCspmGcpOfferingVmScanners;
  /** The Microsoft Defender Data Sensitivity discovery configuration */
  dataSensitivityDiscovery?: DefenderCspmGcpOfferingDataSensitivityDiscovery;
  /** The Microsoft Defender Container image assessment configuration */
  mdcContainersImageAssessment?: DefenderCspmGcpOfferingMdcContainersImageAssessment;
  /** The Microsoft Defender Container agentless discovery configuration */
  mdcContainersAgentlessDiscoveryK8S?: DefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S;
  /** The type of the security offering. */
  offeringType: "DefenderCspmGcp";
}

export function defenderCspmGcpOfferingSerializer(item: DefenderCspmGcpOffering): any {
  return {
    offeringType: item["offeringType"],
    ciemDiscovery: !item["ciemDiscovery"]
      ? item["ciemDiscovery"]
      : defenderCspmGcpOfferingCiemDiscoverySerializer(item["ciemDiscovery"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderCspmGcpOfferingVmScannersSerializer(item["vmScanners"]),
    dataSensitivityDiscovery: !item["dataSensitivityDiscovery"]
      ? item["dataSensitivityDiscovery"]
      : defenderCspmGcpOfferingDataSensitivityDiscoverySerializer(item["dataSensitivityDiscovery"]),
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderCspmGcpOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8s: !item["mdcContainersAgentlessDiscoveryK8S"]
      ? item["mdcContainersAgentlessDiscoveryK8S"]
      : defenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
          item["mdcContainersAgentlessDiscoveryK8S"],
        ),
  };
}

export function defenderCspmGcpOfferingDeserializer(item: any): DefenderCspmGcpOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    ciemDiscovery: !item["ciemDiscovery"]
      ? item["ciemDiscovery"]
      : defenderCspmGcpOfferingCiemDiscoveryDeserializer(item["ciemDiscovery"]),
    vmScanners: !item["vmScanners"]
      ? item["vmScanners"]
      : defenderCspmGcpOfferingVmScannersDeserializer(item["vmScanners"]),
    dataSensitivityDiscovery: !item["dataSensitivityDiscovery"]
      ? item["dataSensitivityDiscovery"]
      : defenderCspmGcpOfferingDataSensitivityDiscoveryDeserializer(
          item["dataSensitivityDiscovery"],
        ),
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderCspmGcpOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
    mdcContainersAgentlessDiscoveryK8S: !item["mdcContainersAgentlessDiscoveryK8s"]
      ? item["mdcContainersAgentlessDiscoveryK8s"]
      : defenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
          item["mdcContainersAgentlessDiscoveryK8s"],
        ),
  };
}

/** GCP Defenders CSPM Permissions Management OIDC (Open ID connect) connection configurations */
export interface DefenderCspmGcpOfferingCiemDiscovery {
  /** The GCP workload identity provider id for Permissions Management offering */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for Permissions Management offering */
  serviceAccountEmailAddress?: string;
  /** the azure active directory app name used of authenticating against GCP workload identity federation */
  azureActiveDirectoryAppName?: string;
}

export function defenderCspmGcpOfferingCiemDiscoverySerializer(
  item: DefenderCspmGcpOfferingCiemDiscovery,
): any {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    azureActiveDirectoryAppName: item["azureActiveDirectoryAppName"],
  };
}

export function defenderCspmGcpOfferingCiemDiscoveryDeserializer(
  item: any,
): DefenderCspmGcpOfferingCiemDiscovery {
  return {
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
    azureActiveDirectoryAppName: item["azureActiveDirectoryAppName"],
  };
}

/** The Microsoft Defender for CSPM VM scanning configuration */
export interface DefenderCspmGcpOfferingVmScanners extends VmScannersGcp {}

export function defenderCspmGcpOfferingVmScannersSerializer(
  item: DefenderCspmGcpOfferingVmScanners,
): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function defenderCspmGcpOfferingVmScannersDeserializer(
  item: any,
): DefenderCspmGcpOfferingVmScanners {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** The Microsoft Defender Data Sensitivity discovery configuration */
export interface DefenderCspmGcpOfferingDataSensitivityDiscovery {
  /** Is Microsoft Defender Data Sensitivity discovery enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function defenderCspmGcpOfferingDataSensitivityDiscoverySerializer(
  item: DefenderCspmGcpOfferingDataSensitivityDiscovery,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function defenderCspmGcpOfferingDataSensitivityDiscoveryDeserializer(
  item: any,
): DefenderCspmGcpOfferingDataSensitivityDiscovery {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Microsoft Defender Container image assessment configuration */
export interface DefenderCspmGcpOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function defenderCspmGcpOfferingMdcContainersImageAssessmentSerializer(
  item: DefenderCspmGcpOfferingMdcContainersImageAssessment,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function defenderCspmGcpOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): DefenderCspmGcpOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The Microsoft Defender Container agentless discovery configuration */
export interface DefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S {
  /** Is Microsoft Defender container agentless discovery enabled */
  enabled?: boolean;
  /** The workload identity provider id in GCP for this feature */
  workloadIdentityProviderId?: string;
  /** The service account email address in GCP for this feature */
  serviceAccountEmailAddress?: string;
}

export function defenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8SSerializer(
  item: DefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S,
): any {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

export function defenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8SDeserializer(
  item: any,
): DefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S {
  return {
    enabled: item["enabled"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
    serviceAccountEmailAddress: item["serviceAccountEmailAddress"],
  };
}

/** The CSPM (Cloud security posture management) monitoring for gitlab offering */
export interface CspmMonitorGitLabOffering extends CloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorGitLab";
}

export function cspmMonitorGitLabOfferingSerializer(item: CspmMonitorGitLabOffering): any {
  return { offeringType: item["offeringType"] };
}

export function cspmMonitorGitLabOfferingDeserializer(item: any): CspmMonitorGitLabOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM (Cloud security posture management) monitoring for Docker Hub offering */
export interface CspmMonitorDockerHubOffering extends CloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorDockerHub";
}

export function cspmMonitorDockerHubOfferingSerializer(item: CspmMonitorDockerHubOffering): any {
  return { offeringType: item["offeringType"] };
}

export function cspmMonitorDockerHubOfferingDeserializer(item: any): CspmMonitorDockerHubOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The Defender for containers Docker Hub offering configurations */
export interface DefenderForContainersDockerHubOffering extends CloudOffering {
  /** The type of the security offering. */
  offeringType: "DefenderForContainersDockerHub";
}

export function defenderForContainersDockerHubOfferingSerializer(
  item: DefenderForContainersDockerHubOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function defenderForContainersDockerHubOfferingDeserializer(
  item: any,
): DefenderForContainersDockerHubOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The Defender for CSPM Docker Hub offering configurations */
export interface DefenderCspmDockerHubOffering extends CloudOffering {
  /** The type of the security offering. */
  offeringType: "DefenderCspmDockerHub";
}

export function defenderCspmDockerHubOfferingSerializer(item: DefenderCspmDockerHubOffering): any {
  return { offeringType: item["offeringType"] };
}

export function defenderCspmDockerHubOfferingDeserializer(
  item: any,
): DefenderCspmDockerHubOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM (Cloud security posture management) monitoring for JFrog Artifactory offering */
export interface CspmMonitorJFrogOffering extends CloudOffering {
  /** The type of the security offering. */
  offeringType: "CspmMonitorJFrog";
}

export function cspmMonitorJFrogOfferingSerializer(item: CspmMonitorJFrogOffering): any {
  return { offeringType: item["offeringType"] };
}

export function cspmMonitorJFrogOfferingDeserializer(item: any): CspmMonitorJFrogOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The Defender for Containers for JFrog Artifactory offering */
export interface DefenderForContainersJFrogOffering extends CloudOffering {
  /** The type of the security offering. */
  offeringType: "DefenderForContainersJFrog";
}

export function defenderForContainersJFrogOfferingSerializer(
  item: DefenderForContainersJFrogOffering,
): any {
  return { offeringType: item["offeringType"] };
}

export function defenderForContainersJFrogOfferingDeserializer(
  item: any,
): DefenderForContainersJFrogOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
  };
}

/** The CSPM P1 for JFrog Artifactory offering */
export interface DefenderCspmJFrogOffering extends CloudOffering {
  /** The Microsoft Defender Container image assessment configuration */
  mdcContainersImageAssessment?: DefenderCspmJFrogOfferingMdcContainersImageAssessment;
  /** The type of the security offering. */
  offeringType: "DefenderCspmJFrog";
}

export function defenderCspmJFrogOfferingSerializer(item: DefenderCspmJFrogOffering): any {
  return {
    offeringType: item["offeringType"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderCspmJFrogOfferingMdcContainersImageAssessmentSerializer(
          item["mdcContainersImageAssessment"],
        ),
  };
}

export function defenderCspmJFrogOfferingDeserializer(item: any): DefenderCspmJFrogOffering {
  return {
    offeringType: item["offeringType"],
    description: item["description"],
    mdcContainersImageAssessment: !item["mdcContainersImageAssessment"]
      ? item["mdcContainersImageAssessment"]
      : defenderCspmJFrogOfferingMdcContainersImageAssessmentDeserializer(
          item["mdcContainersImageAssessment"],
        ),
  };
}

/** The Microsoft Defender Container image assessment configuration */
export interface DefenderCspmJFrogOfferingMdcContainersImageAssessment {
  /** Is Microsoft Defender container image assessment enabled */
  enabled?: boolean;
}

export function defenderCspmJFrogOfferingMdcContainersImageAssessmentSerializer(
  item: DefenderCspmJFrogOfferingMdcContainersImageAssessment,
): any {
  return { enabled: item["enabled"] };
}

export function defenderCspmJFrogOfferingMdcContainersImageAssessmentDeserializer(
  item: any,
): DefenderCspmJFrogOfferingMdcContainersImageAssessment {
  return {
    enabled: item["enabled"],
  };
}

/** The security connector environment data. */
export interface EnvironmentData {
  /** The type of the environment data. */
  /** The discriminator possible values: AwsAccount, GcpProject, GithubScope, AzureDevOpsScope, GitlabScope, DockerHubOrganization, JFrogArtifactory */
  environmentType: EnvironmentType;
}

export function environmentDataSerializer(item: EnvironmentData): any {
  return { environmentType: item["environmentType"] };
}

export function environmentDataDeserializer(item: any): EnvironmentData {
  return {
    environmentType: item["environmentType"],
  };
}

/** Alias for EnvironmentDataUnion */
export type EnvironmentDataUnion =
  | AwsEnvironmentData
  | GcpProjectEnvironmentData
  | GithubScopeEnvironmentData
  | AzureDevOpsScopeEnvironmentData
  | GitlabScopeEnvironmentData
  | DockerHubEnvironmentData
  | JFrogEnvironmentData
  | EnvironmentData;

export function environmentDataUnionSerializer(item: EnvironmentDataUnion): any {
  switch (item.environmentType) {
    case "AwsAccount":
      return awsEnvironmentDataSerializer(item as AwsEnvironmentData);

    case "GcpProject":
      return gcpProjectEnvironmentDataSerializer(item as GcpProjectEnvironmentData);

    case "GithubScope":
      return githubScopeEnvironmentDataSerializer(item as GithubScopeEnvironmentData);

    case "AzureDevOpsScope":
      return azureDevOpsScopeEnvironmentDataSerializer(item as AzureDevOpsScopeEnvironmentData);

    case "GitlabScope":
      return gitlabScopeEnvironmentDataSerializer(item as GitlabScopeEnvironmentData);

    case "DockerHubOrganization":
      return dockerHubEnvironmentDataSerializer(item as DockerHubEnvironmentData);

    case "JFrogArtifactory":
      return jFrogEnvironmentDataSerializer(item as JFrogEnvironmentData);

    default:
      return environmentDataSerializer(item);
  }
}

export function environmentDataUnionDeserializer(item: any): EnvironmentDataUnion {
  switch (item["environmentType"]) {
    case "AwsAccount":
      return awsEnvironmentDataDeserializer(item as AwsEnvironmentData);

    case "GcpProject":
      return gcpProjectEnvironmentDataDeserializer(item as GcpProjectEnvironmentData);

    case "GithubScope":
      return githubScopeEnvironmentDataDeserializer(item as GithubScopeEnvironmentData);

    case "AzureDevOpsScope":
      return azureDevOpsScopeEnvironmentDataDeserializer(item as AzureDevOpsScopeEnvironmentData);

    case "GitlabScope":
      return gitlabScopeEnvironmentDataDeserializer(item as GitlabScopeEnvironmentData);

    case "DockerHubOrganization":
      return dockerHubEnvironmentDataDeserializer(item as DockerHubEnvironmentData);

    case "JFrogArtifactory":
      return jFrogEnvironmentDataDeserializer(item as JFrogEnvironmentData);

    default:
      return environmentDataDeserializer(item);
  }
}

/** The type of the environment data. */
export enum KnownEnvironmentType {
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
 * {@link KnownEnvironmentType} can be used interchangeably with EnvironmentType,
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
export type EnvironmentType = string;

/** The AWS connector environment data */
export interface AwsEnvironmentData extends EnvironmentData {
  /** The AWS account's organizational data */
  organizationalData?: AwsOrganizationalDataUnion;
  /** list of regions to scan */
  regions?: string[];
  /** The AWS account name */
  readonly accountName?: string;
  /** Scan interval in hours (value should be between 1-hour to 24-hours) */
  scanInterval?: number;
  /** The type of the environment data. */
  environmentType: "AwsAccount";
}

export function awsEnvironmentDataSerializer(item: AwsEnvironmentData): any {
  return {
    environmentType: item["environmentType"],
    organizationalData: !item["organizationalData"]
      ? item["organizationalData"]
      : awsOrganizationalDataUnionSerializer(item["organizationalData"]),
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
    scanInterval: item["scanInterval"],
  };
}

export function awsEnvironmentDataDeserializer(item: any): AwsEnvironmentData {
  return {
    environmentType: item["environmentType"],
    organizationalData: !item["organizationalData"]
      ? item["organizationalData"]
      : awsOrganizationalDataUnionDeserializer(item["organizationalData"]),
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
export interface AwsOrganizationalData {
  /** The multi cloud account's membership type in the organization */
  /** The discriminator possible values: Organization, Member */
  organizationMembershipType: OrganizationMembershipType;
}

export function awsOrganizationalDataSerializer(item: AwsOrganizationalData): any {
  return { organizationMembershipType: item["organizationMembershipType"] };
}

export function awsOrganizationalDataDeserializer(item: any): AwsOrganizationalData {
  return {
    organizationMembershipType: item["organizationMembershipType"],
  };
}

/** Alias for AwsOrganizationalDataUnion */
export type AwsOrganizationalDataUnion =
  | AwsOrganizationalDataMaster
  | AwsOrganizationalDataMember
  | AwsOrganizationalData;

export function awsOrganizationalDataUnionSerializer(item: AwsOrganizationalDataUnion): any {
  switch (item.organizationMembershipType) {
    case "Organization":
      return awsOrganizationalDataMasterSerializer(item as AwsOrganizationalDataMaster);

    case "Member":
      return awsOrganizationalDataMemberSerializer(item as AwsOrganizationalDataMember);

    default:
      return awsOrganizationalDataSerializer(item);
  }
}

export function awsOrganizationalDataUnionDeserializer(item: any): AwsOrganizationalDataUnion {
  switch (item["organizationMembershipType"]) {
    case "Organization":
      return awsOrganizationalDataMasterDeserializer(item as AwsOrganizationalDataMaster);

    case "Member":
      return awsOrganizationalDataMemberDeserializer(item as AwsOrganizationalDataMember);

    default:
      return awsOrganizationalDataDeserializer(item);
  }
}

/** The multi cloud account's membership type in the organization */
export enum KnownOrganizationMembershipType {
  /** Member */
  Member = "Member",
  /** Organization */
  Organization = "Organization",
}

/**
 * The multi cloud account's membership type in the organization \
 * {@link KnownOrganizationMembershipType} can be used interchangeably with OrganizationMembershipType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Member**: Member \
 * **Organization**: Organization
 */
export type OrganizationMembershipType = string;

/** The AWS organization data for the master account */
export interface AwsOrganizationalDataMaster extends AwsOrganizationalData {
  /** If the multi cloud account is of membership type organization, this will be the name of the onboarding stackset */
  stacksetName?: string;
  /** If the multi cloud account is of membership type organization, list of accounts excluded from offering */
  excludedAccountIds?: string[];
  /** The multi cloud account's membership type in the organization */
  organizationMembershipType: "Organization";
}

export function awsOrganizationalDataMasterSerializer(item: AwsOrganizationalDataMaster): any {
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

export function awsOrganizationalDataMasterDeserializer(item: any): AwsOrganizationalDataMaster {
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
export interface AwsOrganizationalDataMember extends AwsOrganizationalData {
  /** If the multi cloud account is not of membership type organization, this will be the ID of the account's parent */
  parentHierarchyId?: string;
  /** The multi cloud account's membership type in the organization */
  organizationMembershipType: "Member";
}

export function awsOrganizationalDataMemberSerializer(item: AwsOrganizationalDataMember): any {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    parentHierarchyId: item["parentHierarchyId"],
  };
}

export function awsOrganizationalDataMemberDeserializer(item: any): AwsOrganizationalDataMember {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    parentHierarchyId: item["parentHierarchyId"],
  };
}

/** The GCP project connector environment data */
export interface GcpProjectEnvironmentData extends EnvironmentData {
  /** The Gcp project's organizational data */
  organizationalData?: GcpOrganizationalDataUnion;
  /** The Gcp project's details */
  projectDetails?: GcpProjectDetails;
  /** Scan interval in hours (value should be between 1-hour to 24-hours) */
  scanInterval?: number;
  /** The type of the environment data. */
  environmentType: "GcpProject";
}

export function gcpProjectEnvironmentDataSerializer(item: GcpProjectEnvironmentData): any {
  return {
    environmentType: item["environmentType"],
    organizationalData: !item["organizationalData"]
      ? item["organizationalData"]
      : gcpOrganizationalDataUnionSerializer(item["organizationalData"]),
    projectDetails: !item["projectDetails"]
      ? item["projectDetails"]
      : gcpProjectDetailsSerializer(item["projectDetails"]),
    scanInterval: item["scanInterval"],
  };
}

export function gcpProjectEnvironmentDataDeserializer(item: any): GcpProjectEnvironmentData {
  return {
    environmentType: item["environmentType"],
    organizationalData: !item["organizationalData"]
      ? item["organizationalData"]
      : gcpOrganizationalDataUnionDeserializer(item["organizationalData"]),
    projectDetails: !item["projectDetails"]
      ? item["projectDetails"]
      : gcpProjectDetailsDeserializer(item["projectDetails"]),
    scanInterval: item["scanInterval"],
  };
}

/** The gcpOrganization data */
export interface GcpOrganizationalData {
  /** The multi cloud account's membership type in the organization */
  /** The discriminator possible values: Organization, Member */
  organizationMembershipType: OrganizationMembershipType;
}

export function gcpOrganizationalDataSerializer(item: GcpOrganizationalData): any {
  return { organizationMembershipType: item["organizationMembershipType"] };
}

export function gcpOrganizationalDataDeserializer(item: any): GcpOrganizationalData {
  return {
    organizationMembershipType: item["organizationMembershipType"],
  };
}

/** Alias for GcpOrganizationalDataUnion */
export type GcpOrganizationalDataUnion =
  | GcpOrganizationalDataOrganization
  | GcpOrganizationalDataMember
  | GcpOrganizationalData;

export function gcpOrganizationalDataUnionSerializer(item: GcpOrganizationalDataUnion): any {
  switch (item.organizationMembershipType) {
    case "Organization":
      return gcpOrganizationalDataOrganizationSerializer(item as GcpOrganizationalDataOrganization);

    case "Member":
      return gcpOrganizationalDataMemberSerializer(item as GcpOrganizationalDataMember);

    default:
      return gcpOrganizationalDataSerializer(item);
  }
}

export function gcpOrganizationalDataUnionDeserializer(item: any): GcpOrganizationalDataUnion {
  switch (item["organizationMembershipType"]) {
    case "Organization":
      return gcpOrganizationalDataOrganizationDeserializer(
        item as GcpOrganizationalDataOrganization,
      );

    case "Member":
      return gcpOrganizationalDataMemberDeserializer(item as GcpOrganizationalDataMember);

    default:
      return gcpOrganizationalDataDeserializer(item);
  }
}

/** The gcpOrganization data for the parent account */
export interface GcpOrganizationalDataOrganization extends GcpOrganizationalData {
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

export function gcpOrganizationalDataOrganizationSerializer(
  item: GcpOrganizationalDataOrganization,
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

export function gcpOrganizationalDataOrganizationDeserializer(
  item: any,
): GcpOrganizationalDataOrganization {
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
export interface GcpOrganizationalDataMember extends GcpOrganizationalData {
  /** If the multi cloud account is not of membership type organization, this will be the ID of the project's parent */
  parentHierarchyId?: string;
  /** The GCP management project number from organizational onboarding */
  managementProjectNumber?: string;
  /** The multi cloud account's membership type in the organization */
  organizationMembershipType: "Member";
}

export function gcpOrganizationalDataMemberSerializer(item: GcpOrganizationalDataMember): any {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    parentHierarchyId: item["parentHierarchyId"],
    managementProjectNumber: item["managementProjectNumber"],
  };
}

export function gcpOrganizationalDataMemberDeserializer(item: any): GcpOrganizationalDataMember {
  return {
    organizationMembershipType: item["organizationMembershipType"],
    parentHierarchyId: item["parentHierarchyId"],
    managementProjectNumber: item["managementProjectNumber"],
  };
}

/** The details about the project represented by the security connector */
export interface GcpProjectDetails {
  /** The unique GCP Project number */
  projectNumber?: string;
  /** The GCP Project id */
  projectId?: string;
  /** The GCP workload identity federation pool id */
  readonly workloadIdentityPoolId?: string;
  /** GCP project name */
  readonly projectName?: string;
}

export function gcpProjectDetailsSerializer(item: GcpProjectDetails): any {
  return { projectNumber: item["projectNumber"], projectId: item["projectId"] };
}

export function gcpProjectDetailsDeserializer(item: any): GcpProjectDetails {
  return {
    projectNumber: item["projectNumber"],
    projectId: item["projectId"],
    workloadIdentityPoolId: item["workloadIdentityPoolId"],
    projectName: item["projectName"],
  };
}

/** The github scope connector's environment data */
export interface GithubScopeEnvironmentData extends EnvironmentData {
  /** The type of the environment data. */
  environmentType: "GithubScope";
}

export function githubScopeEnvironmentDataSerializer(item: GithubScopeEnvironmentData): any {
  return { environmentType: item["environmentType"] };
}

export function githubScopeEnvironmentDataDeserializer(item: any): GithubScopeEnvironmentData {
  return {
    environmentType: item["environmentType"],
  };
}

/** The AzureDevOps scope connector's environment data */
export interface AzureDevOpsScopeEnvironmentData extends EnvironmentData {
  /** The type of the environment data. */
  environmentType: "AzureDevOpsScope";
}

export function azureDevOpsScopeEnvironmentDataSerializer(
  item: AzureDevOpsScopeEnvironmentData,
): any {
  return { environmentType: item["environmentType"] };
}

export function azureDevOpsScopeEnvironmentDataDeserializer(
  item: any,
): AzureDevOpsScopeEnvironmentData {
  return {
    environmentType: item["environmentType"],
  };
}

/** The GitLab scope connector's environment data */
export interface GitlabScopeEnvironmentData extends EnvironmentData {
  /** The type of the environment data. */
  environmentType: "GitlabScope";
}

export function gitlabScopeEnvironmentDataSerializer(item: GitlabScopeEnvironmentData): any {
  return { environmentType: item["environmentType"] };
}

export function gitlabScopeEnvironmentDataDeserializer(item: any): GitlabScopeEnvironmentData {
  return {
    environmentType: item["environmentType"],
  };
}

/** The Docker Hub connector environment data */
export interface DockerHubEnvironmentData extends EnvironmentData {
  /** The Docker Hub organization authentication details */
  authentication?: AuthenticationUnion;
  /** Scan interval in hours (value should be between 1-hour to 24-hours) */
  scanInterval?: number;
  /** The type of the environment data. */
  environmentType: "DockerHubOrganization";
}

export function dockerHubEnvironmentDataSerializer(item: DockerHubEnvironmentData): any {
  return {
    environmentType: item["environmentType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationUnionSerializer(item["authentication"]),
    scanInterval: item["scanInterval"],
  };
}

export function dockerHubEnvironmentDataDeserializer(item: any): DockerHubEnvironmentData {
  return {
    environmentType: item["environmentType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationUnionDeserializer(item["authentication"]),
    scanInterval: item["scanInterval"],
  };
}

/** The environment authentication details */
export interface Authentication {
  /** The authentication type */
  /** The discriminator possible values: AccessToken */
  authenticationType: AuthenticationType;
}

export function authenticationSerializer(item: Authentication): any {
  return { authenticationType: item["authenticationType"] };
}

export function authenticationDeserializer(item: any): Authentication {
  return {
    authenticationType: item["authenticationType"],
  };
}

/** Alias for AuthenticationUnion */
export type AuthenticationUnion = AccessTokenAuthentication | Authentication;

export function authenticationUnionSerializer(item: AuthenticationUnion): any {
  switch (item.authenticationType) {
    case "AccessToken":
      return accessTokenAuthenticationSerializer(item as AccessTokenAuthentication);

    default:
      return authenticationSerializer(item);
  }
}

export function authenticationUnionDeserializer(item: any): AuthenticationUnion {
  switch (item["authenticationType"]) {
    case "AccessToken":
      return accessTokenAuthenticationDeserializer(item as AccessTokenAuthentication);

    default:
      return authenticationDeserializer(item);
  }
}

/** The authentication type */
export enum KnownAuthenticationType {
  /** AccessToken */
  AccessToken = "AccessToken",
}

/**
 * The authentication type \
 * {@link KnownAuthenticationType} can be used interchangeably with AuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccessToken**: AccessToken
 */
export type AuthenticationType = string;

/** The environment authentication details */
export interface AccessTokenAuthentication extends Authentication {
  /** The user name that will be used while authenticating with the onboarded environment */
  username?: string;
  /** The access token that will be used while authenticating with the onboarded environment */
  accessToken?: string;
  /** The authentication type */
  authenticationType: "AccessToken";
}

export function accessTokenAuthenticationSerializer(item: AccessTokenAuthentication): any {
  return {
    authenticationType: item["authenticationType"],
    username: item["username"],
    accessToken: item["accessToken"],
  };
}

export function accessTokenAuthenticationDeserializer(item: any): AccessTokenAuthentication {
  return {
    authenticationType: item["authenticationType"],
    username: item["username"],
    accessToken: item["accessToken"],
  };
}

/** The JFrog Artifactory connector environment data */
export interface JFrogEnvironmentData extends EnvironmentData {
  /** Scan interval in hours (value should be between 1-hour to 24-hours) */
  scanInterval?: number;
  /** The type of the environment data. */
  environmentType: "JFrogArtifactory";
}

export function jFrogEnvironmentDataSerializer(item: JFrogEnvironmentData): any {
  return { environmentType: item["environmentType"], scanInterval: item["scanInterval"] };
}

export function jFrogEnvironmentDataDeserializer(item: any): JFrogEnvironmentData {
  return {
    environmentType: item["environmentType"],
    scanInterval: item["scanInterval"],
  };
}

/** A VM scanning configuration for a security offering of a Aws environment */
export interface VmScannersAws extends VmScannersBase {
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function vmScannersAwsSerializer(item: VmScannersAws): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationSerializer(item["configuration"]),
    cloudRoleArn: item["cloudRoleArn"],
  };
}

export function vmScannersAwsDeserializer(item: any): VmScannersAws {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationDeserializer(item["configuration"]),
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** A VM scanning configuration for a security offering of a given environment */
export interface VmScannersBase {
  /** Is VM scanning enabled */
  enabled?: boolean;
  /** Configuration for VM scanning */
  configuration?: VmScannersBaseConfiguration;
}

export function vmScannersBaseSerializer(item: VmScannersBase): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function vmScannersBaseDeserializer(item: any): VmScannersBase {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** Configuration for VM scanning */
export interface VmScannersBaseConfiguration {
  /** The scanning mode for the VM scan. */
  scanningMode?: ScanningMode;
  /** Tags that indicates that a resource should not be scanned */
  exclusionTags?: Record<string, string>;
}

export function vmScannersBaseConfigurationSerializer(item: VmScannersBaseConfiguration): any {
  return { scanningMode: item["scanningMode"], exclusionTags: item["exclusionTags"] };
}

export function vmScannersBaseConfigurationDeserializer(item: any): VmScannersBaseConfiguration {
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
export enum KnownScanningMode {
  /** Default */
  Default = "Default",
}

/**
 * The scanning mode for the VM scan. \
 * {@link KnownScanningMode} can be used interchangeably with ScanningMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default
 */
export type ScanningMode = string;

/** The ARC autoprovisioning configuration for an AWS environment */
export interface ArcAutoProvisioningAws extends ArcAutoProvisioning {
  /** The cloud role ARN in AWS for this feature */
  cloudRoleArn?: string;
}

export function arcAutoProvisioningAwsSerializer(item: ArcAutoProvisioningAws): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationSerializer(item["configuration"]),
    cloudRoleArn: item["cloudRoleArn"],
  };
}

export function arcAutoProvisioningAwsDeserializer(item: any): ArcAutoProvisioningAws {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationDeserializer(item["configuration"]),
    cloudRoleArn: item["cloudRoleArn"],
  };
}

/** The ARC autoprovisioning configuration */
export interface ArcAutoProvisioning {
  /** Is arc auto provisioning enabled */
  enabled?: boolean;
  /** Configuration for servers Arc auto provisioning for a given environment */
  configuration?: ArcAutoProvisioningConfiguration;
}

export function arcAutoProvisioningSerializer(item: ArcAutoProvisioning): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function arcAutoProvisioningDeserializer(item: any): ArcAutoProvisioning {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** Configuration for servers Arc auto provisioning for a given environment */
export interface ArcAutoProvisioningConfiguration {
  /** Optional HTTP proxy endpoint to use for the Arc agent */
  proxy?: string;
  /** Optional Arc private link scope resource id to link the Arc agent */
  privateLinkScope?: string;
}

export function arcAutoProvisioningConfigurationSerializer(
  item: ArcAutoProvisioningConfiguration,
): any {
  return { proxy: item["proxy"], privateLinkScope: item["privateLinkScope"] };
}

export function arcAutoProvisioningConfigurationDeserializer(
  item: any,
): ArcAutoProvisioningConfiguration {
  return {
    proxy: item["proxy"],
    privateLinkScope: item["privateLinkScope"],
  };
}

/** The ARC autoprovisioning configuration for an GCP environment */
export interface ArcAutoProvisioningGcp extends ArcAutoProvisioning {}

export function arcAutoProvisioningGcpSerializer(item: ArcAutoProvisioningGcp): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationSerializer(item["configuration"]),
  };
}

export function arcAutoProvisioningGcpDeserializer(item: any): ArcAutoProvisioningGcp {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : arcAutoProvisioningConfigurationDeserializer(item["configuration"]),
  };
}

/** A VM scanning configuration for a security offering of a GCP environment */
export interface VmScannersGcp extends VmScannersBase {}

export function vmScannersGcpSerializer(item: VmScannersGcp): any {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationSerializer(item["configuration"]),
  };
}

export function vmScannersGcpDeserializer(item: any): VmScannersGcp {
  return {
    enabled: item["enabled"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : vmScannersBaseConfigurationDeserializer(item["configuration"]),
  };
}

/** List of security connectors response. */
export interface _SecurityConnectorsList {
  /** The SecurityConnector items on this page */
  value: SecurityConnector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityConnectorsListDeserializer(item: any): _SecurityConnectorsList {
  return {
    value: securityConnectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorArraySerializer(result: Array<SecurityConnector>): any[] {
  return result.map((item) => {
    return securityConnectorSerializer(item);
  });
}

export function securityConnectorArrayDeserializer(result: Array<SecurityConnector>): any[] {
  return result.map((item) => {
    return securityConnectorDeserializer(item);
  });
}

export function _securityConnectorPropertiesSerializer(item: SecurityConnector): any {
  return {
    hierarchyIdentifier: item["hierarchyIdentifier"],
    environmentName: item["environmentName"],
    offerings: !item["offerings"]
      ? item["offerings"]
      : cloudOfferingUnionArraySerializer(item["offerings"]),
    environmentData: !item["environmentData"]
      ? item["environmentData"]
      : environmentDataUnionSerializer(item["environmentData"]),
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
      : cloudOfferingUnionArrayDeserializer(item["offerings"]),
    environmentData: !item["environmentData"]
      ? item["environmentData"]
      : environmentDataUnionDeserializer(item["environmentData"]),
  };
}
