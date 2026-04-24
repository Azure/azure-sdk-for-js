// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommonSeverity, CommonResourceDetailsUnion } from "../common/models.js";
import { commonResourceDetailsUnionDeserializer } from "../common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Security sub-assessment on a resource */
export interface SubAssessmentsAPISecuritySubAssessment extends ExtensionResource {
  /** Vulnerability ID */
  readonly idPropertiesId?: string;
  /** User friendly display name of the sub-assessment */
  readonly displayName?: string;
  /** Status of the sub-assessment */
  status?: SubAssessmentsAPISubAssessmentStatus;
  /** Information on how to remediate this sub-assessment */
  readonly remediation?: string;
  /** Description of the impact of this sub-assessment */
  readonly impact?: string;
  /** Category of the sub-assessment */
  readonly category?: string;
  /** Human readable description of the assessment status */
  readonly description?: string;
  /** The date and time the sub-assessment was generated */
  readonly timeGenerated?: Date;
  /** Details of the resource that was assessed */
  resourceDetails?: CommonResourceDetailsUnion;
  /** Details of the sub-assessment */
  additionalData?: SubAssessmentsAPIAdditionalDataUnion;
}

export function subAssessmentsAPISecuritySubAssessmentDeserializer(
  item: any,
): SubAssessmentsAPISecuritySubAssessment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securitySubAssessmentPropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of an sub-assessment. */
export interface SubAssessmentsAPISecuritySubAssessmentProperties {
  /** Vulnerability ID */
  readonly id?: string;
  /** User friendly display name of the sub-assessment */
  readonly displayName?: string;
  /** Status of the sub-assessment */
  status?: SubAssessmentsAPISubAssessmentStatus;
  /** Information on how to remediate this sub-assessment */
  readonly remediation?: string;
  /** Description of the impact of this sub-assessment */
  readonly impact?: string;
  /** Category of the sub-assessment */
  readonly category?: string;
  /** Human readable description of the assessment status */
  readonly description?: string;
  /** The date and time the sub-assessment was generated */
  readonly timeGenerated?: Date;
  /** Details of the resource that was assessed */
  resourceDetails?: CommonResourceDetailsUnion;
  /** Details of the sub-assessment */
  additionalData?: SubAssessmentsAPIAdditionalDataUnion;
}

export function subAssessmentsAPISecuritySubAssessmentPropertiesDeserializer(
  item: any,
): SubAssessmentsAPISecuritySubAssessmentProperties {
  return {
    id: item["id"],
    displayName: item["displayName"],
    status: !item["status"]
      ? item["status"]
      : subAssessmentsAPISubAssessmentStatusDeserializer(item["status"]),
    remediation: item["remediation"],
    impact: item["impact"],
    category: item["category"],
    description: item["description"],
    timeGenerated: !item["timeGenerated"] ? item["timeGenerated"] : new Date(item["timeGenerated"]),
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : commonResourceDetailsUnionDeserializer(item["resourceDetails"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : subAssessmentsAPIAdditionalDataUnionDeserializer(item["additionalData"]),
  };
}

/** Status of the sub-assessment */
export interface SubAssessmentsAPISubAssessmentStatus {
  /** Programmatic code for the status of the assessment */
  readonly code?: SubAssessmentsAPISubAssessmentStatusCode;
  /** Programmatic code for the cause of the assessment status */
  readonly cause?: string;
  /** Human readable description of the assessment status */
  readonly description?: string;
  /** The sub-assessment severity level */
  readonly severity?: CommonSeverity;
}

export function subAssessmentsAPISubAssessmentStatusDeserializer(
  item: any,
): SubAssessmentsAPISubAssessmentStatus {
  return {
    code: item["code"],
    cause: item["cause"],
    description: item["description"],
    severity: item["severity"],
  };
}

/** Programmatic code for the status of the assessment */
export enum KnownSubAssessmentsAPISubAssessmentStatusCode {
  /** The resource is healthy */
  Healthy = "Healthy",
  /** The resource has a security issue that needs to be addressed */
  Unhealthy = "Unhealthy",
  /** Assessment for this resource did not happen */
  NotApplicable = "NotApplicable",
}

/**
 * Programmatic code for the status of the assessment \
 * {@link KnownSubAssessmentsAPISubAssessmentStatusCode} can be used interchangeably with SubAssessmentsAPISubAssessmentStatusCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: The resource is healthy \
 * **Unhealthy**: The resource has a security issue that needs to be addressed \
 * **NotApplicable**: Assessment for this resource did not happen
 */
export type SubAssessmentsAPISubAssessmentStatusCode = string;

/** Details of the sub-assessment */
export interface SubAssessmentsAPIAdditionalData {
  /** Sub-assessment resource type */
  /** The discriminator possible values: SqlServerVulnerability, ContainerRegistryVulnerability, ServerVulnerabilityAssessment */
  assessedResourceType: SubAssessmentsAPIAssessedResourceType;
}

export function subAssessmentsAPIAdditionalDataDeserializer(
  item: any,
): SubAssessmentsAPIAdditionalData {
  return {
    assessedResourceType: item["assessedResourceType"],
  };
}

/** Alias for SubAssessmentsAPIAdditionalDataUnion */
export type SubAssessmentsAPIAdditionalDataUnion =
  | SubAssessmentsAPISqlServerVulnerabilityProperties
  | SubAssessmentsAPIContainerRegistryVulnerabilityProperties
  | SubAssessmentsAPIServerVulnerabilityProperties
  | SubAssessmentsAPIAdditionalData;

export function subAssessmentsAPIAdditionalDataUnionDeserializer(
  item: any,
): SubAssessmentsAPIAdditionalDataUnion {
  switch (item["assessedResourceType"]) {
    case "SqlServerVulnerability":
      return subAssessmentsAPISqlServerVulnerabilityPropertiesDeserializer(
        item as SubAssessmentsAPISqlServerVulnerabilityProperties,
      );

    case "ContainerRegistryVulnerability":
      return subAssessmentsAPIContainerRegistryVulnerabilityPropertiesDeserializer(
        item as SubAssessmentsAPIContainerRegistryVulnerabilityProperties,
      );

    case "ServerVulnerabilityAssessment":
      return subAssessmentsAPIServerVulnerabilityPropertiesDeserializer(
        item as SubAssessmentsAPIServerVulnerabilityProperties,
      );

    default:
      return subAssessmentsAPIAdditionalDataDeserializer(item);
  }
}

/** Sub-assessment resource type */
export enum KnownSubAssessmentsAPIAssessedResourceType {
  /** SqlServerVulnerability */
  SqlServerVulnerability = "SqlServerVulnerability",
  /** ContainerRegistryVulnerability */
  ContainerRegistryVulnerability = "ContainerRegistryVulnerability",
  /** ServerVulnerability */
  ServerVulnerability = "ServerVulnerability",
}

/**
 * Sub-assessment resource type \
 * {@link KnownSubAssessmentsAPIAssessedResourceType} can be used interchangeably with SubAssessmentsAPIAssessedResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SqlServerVulnerability**: SqlServerVulnerability \
 * **ContainerRegistryVulnerability**: ContainerRegistryVulnerability \
 * **ServerVulnerability**: ServerVulnerability
 */
export type SubAssessmentsAPIAssessedResourceType = string;

/** Details of the resource that was assessed */
export interface SubAssessmentsAPISqlServerVulnerabilityProperties extends SubAssessmentsAPIAdditionalData {
  /** The resource type the sub assessment refers to in its resource details */
  readonly type?: string;
  /** The T-SQL query that runs on your SQL database to perform the particular check */
  readonly query?: string;
  /** Sub-assessment resource type */
  assessedResourceType: "SqlServerVulnerability";
}

export function subAssessmentsAPISqlServerVulnerabilityPropertiesDeserializer(
  item: any,
): SubAssessmentsAPISqlServerVulnerabilityProperties {
  return {
    assessedResourceType: item["assessedResourceType"],
    type: item["type"],
    query: item["query"],
  };
}

/** Additional context fields for container registry Vulnerability assessment */
export interface SubAssessmentsAPIContainerRegistryVulnerabilityProperties extends SubAssessmentsAPIAdditionalData {
  /** Vulnerability Type. e.g: Vulnerability, Potential Vulnerability, Information Gathered, Vulnerability */
  readonly type?: string;
  /** Dictionary from cvss version to cvss details object */
  readonly cvss?: Record<string, SubAssessmentsApicvss>;
  /** Indicates whether a patch is available or not */
  readonly patchable?: boolean;
  /** List of CVEs */
  readonly cve?: SubAssessmentsAPICve[];
  /** Published time */
  readonly publishedTime?: Date;
  readonly vendorReferences?: SubAssessmentsAPIVendorReference[];
  /** Name of the repository which the vulnerable image belongs to */
  readonly repositoryName?: string;
  /** Digest of the vulnerable image */
  readonly imageDigest?: string;
  /** Sub-assessment resource type */
  assessedResourceType: "ContainerRegistryVulnerability";
}

export function subAssessmentsAPIContainerRegistryVulnerabilityPropertiesDeserializer(
  item: any,
): SubAssessmentsAPIContainerRegistryVulnerabilityProperties {
  return {
    assessedResourceType: item["assessedResourceType"],
    type: item["type"],
    cvss: !item["cvss"] ? item["cvss"] : subAssessmentsApicvssRecordDeserializer(item["cvss"]),
    patchable: item["patchable"],
    cve: !item["cve"] ? item["cve"] : subAssessmentsAPICveArrayDeserializer(item["cve"]),
    publishedTime: !item["publishedTime"] ? item["publishedTime"] : new Date(item["publishedTime"]),
    vendorReferences: !item["vendorReferences"]
      ? item["vendorReferences"]
      : subAssessmentsAPIVendorReferenceArrayDeserializer(item["vendorReferences"]),
    repositoryName: item["repositoryName"],
    imageDigest: item["imageDigest"],
  };
}

export function subAssessmentsApicvssRecordDeserializer(
  item: Record<string, any>,
): Record<string, SubAssessmentsApicvss> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : subAssessmentsApicvssDeserializer(item[key]);
  });
  return result;
}

/** CVSS details */
export interface SubAssessmentsApicvss {
  /** CVSS base */
  readonly base?: number;
}

export function subAssessmentsApicvssDeserializer(item: any): SubAssessmentsApicvss {
  return {
    base: item["base"],
  };
}

export function subAssessmentsAPICveArrayDeserializer(result: Array<SubAssessmentsAPICve>): any[] {
  return result.map((item) => {
    return subAssessmentsAPICveDeserializer(item);
  });
}

/** CVE details */
export interface SubAssessmentsAPICve {
  /** CVE title */
  readonly title?: string;
  /** Link url */
  readonly link?: string;
}

export function subAssessmentsAPICveDeserializer(item: any): SubAssessmentsAPICve {
  return {
    title: item["title"],
    link: item["link"],
  };
}

export function subAssessmentsAPIVendorReferenceArrayDeserializer(
  result: Array<SubAssessmentsAPIVendorReference>,
): any[] {
  return result.map((item) => {
    return subAssessmentsAPIVendorReferenceDeserializer(item);
  });
}

/** Vendor reference */
export interface SubAssessmentsAPIVendorReference {
  /** Link title */
  readonly title?: string;
  /** Link url */
  readonly link?: string;
}

export function subAssessmentsAPIVendorReferenceDeserializer(
  item: any,
): SubAssessmentsAPIVendorReference {
  return {
    title: item["title"],
    link: item["link"],
  };
}

/** Additional context fields for server vulnerability assessment */
export interface SubAssessmentsAPIServerVulnerabilityProperties extends SubAssessmentsAPIAdditionalData {
  /** Vulnerability Type. e.g: Vulnerability, Potential Vulnerability, Information Gathered */
  readonly type?: string;
  /** Dictionary from cvss version to cvss details object */
  readonly cvss?: Record<string, SubAssessmentsApicvss>;
  /** Indicates whether a patch is available or not */
  readonly patchable?: boolean;
  /** List of CVEs */
  readonly cve?: SubAssessmentsAPICve[];
  /** Threat name */
  readonly threat?: string;
  /** Published time */
  readonly publishedTime?: Date;
  readonly vendorReferences?: SubAssessmentsAPIVendorReference[];
  /** Sub-assessment resource type */
  assessedResourceType: "ServerVulnerabilityAssessment";
}

export function subAssessmentsAPIServerVulnerabilityPropertiesDeserializer(
  item: any,
): SubAssessmentsAPIServerVulnerabilityProperties {
  return {
    assessedResourceType: item["assessedResourceType"],
    type: item["type"],
    cvss: !item["cvss"] ? item["cvss"] : subAssessmentsApicvssRecordDeserializer(item["cvss"]),
    patchable: item["patchable"],
    cve: !item["cve"] ? item["cve"] : subAssessmentsAPICveArrayDeserializer(item["cve"]),
    threat: item["threat"],
    publishedTime: !item["publishedTime"] ? item["publishedTime"] : new Date(item["publishedTime"]),
    vendorReferences: !item["vendorReferences"]
      ? item["vendorReferences"]
      : subAssessmentsAPIVendorReferenceArrayDeserializer(item["vendorReferences"]),
  };
}

/** List of security sub-assessments */
export interface _SubAssessmentsAPISecuritySubAssessmentList {
  /** List of security sub-assessments */
  readonly value?: SubAssessmentsAPISecuritySubAssessment[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _subAssessmentsAPISecuritySubAssessmentListDeserializer(
  item: any,
): _SubAssessmentsAPISecuritySubAssessmentList {
  return {
    value: !item["value"]
      ? item["value"]
      : subAssessmentsAPISecuritySubAssessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function subAssessmentsAPISecuritySubAssessmentArrayDeserializer(
  result: Array<SubAssessmentsAPISecuritySubAssessment>,
): any[] {
  return result.map((item) => {
    return subAssessmentsAPISecuritySubAssessmentDeserializer(item);
  });
}

export function _securitySubAssessmentPropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    displayName: item["displayName"],
    status: !item["status"]
      ? item["status"]
      : subAssessmentsAPISubAssessmentStatusDeserializer(item["status"]),
    remediation: item["remediation"],
    impact: item["impact"],
    category: item["category"],
    description: item["description"],
    timeGenerated: !item["timeGenerated"] ? item["timeGenerated"] : new Date(item["timeGenerated"]),
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : commonResourceDetailsUnionDeserializer(item["resourceDetails"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : subAssessmentsAPIAdditionalDataUnionDeserializer(item["additionalData"]),
  };
}
