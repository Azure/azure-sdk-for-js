// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Severity, ResourceDetailsUnion } from "../common/models.js";
import { resourceDetailsUnionDeserializer } from "../common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Security sub-assessment on a resource */
export interface SecuritySubAssessment extends ExtensionResource {
  /** Vulnerability ID */
  readonly idPropertiesId?: string;
  /** User friendly display name of the sub-assessment */
  readonly displayName?: string;
  /** Status of the sub-assessment */
  status?: SubAssessmentStatus;
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
  resourceDetails?: ResourceDetailsUnion;
  /** Details of the sub-assessment */
  additionalData?: AdditionalDataUnion;
}

export function securitySubAssessmentDeserializer(item: any): SecuritySubAssessment {
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
export interface SecuritySubAssessmentProperties {
  /** Vulnerability ID */
  readonly id?: string;
  /** User friendly display name of the sub-assessment */
  readonly displayName?: string;
  /** Status of the sub-assessment */
  status?: SubAssessmentStatus;
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
  resourceDetails?: ResourceDetailsUnion;
  /** Details of the sub-assessment */
  additionalData?: AdditionalDataUnion;
}

export function securitySubAssessmentPropertiesDeserializer(
  item: any,
): SecuritySubAssessmentProperties {
  return {
    id: item["id"],
    displayName: item["displayName"],
    status: !item["status"] ? item["status"] : subAssessmentStatusDeserializer(item["status"]),
    remediation: item["remediation"],
    impact: item["impact"],
    category: item["category"],
    description: item["description"],
    timeGenerated: !item["timeGenerated"] ? item["timeGenerated"] : new Date(item["timeGenerated"]),
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : resourceDetailsUnionDeserializer(item["resourceDetails"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : additionalDataUnionDeserializer(item["additionalData"]),
  };
}

/** Status of the sub-assessment */
export interface SubAssessmentStatus {
  /** Programmatic code for the status of the assessment */
  readonly code?: SubAssessmentStatusCode;
  /** Programmatic code for the cause of the assessment status */
  readonly cause?: string;
  /** Human readable description of the assessment status */
  readonly description?: string;
  /** The sub-assessment severity level */
  readonly severity?: Severity;
}

export function subAssessmentStatusDeserializer(item: any): SubAssessmentStatus {
  return {
    code: item["code"],
    cause: item["cause"],
    description: item["description"],
    severity: item["severity"],
  };
}

/** Programmatic code for the status of the assessment */
export enum KnownSubAssessmentStatusCode {
  /** The resource is healthy */
  Healthy = "Healthy",
  /** The resource has a security issue that needs to be addressed */
  Unhealthy = "Unhealthy",
  /** Assessment for this resource did not happen */
  NotApplicable = "NotApplicable",
}

/**
 * Programmatic code for the status of the assessment \
 * {@link KnownSubAssessmentStatusCode} can be used interchangeably with SubAssessmentStatusCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: The resource is healthy \
 * **Unhealthy**: The resource has a security issue that needs to be addressed \
 * **NotApplicable**: Assessment for this resource did not happen
 */
export type SubAssessmentStatusCode = string;

/** Details of the sub-assessment */
export interface AdditionalData {
  /** Sub-assessment resource type */
  /** The discriminator possible values: SqlServerVulnerability, ContainerRegistryVulnerability, ServerVulnerabilityAssessment */
  assessedResourceType: AssessedResourceType;
}

export function additionalDataDeserializer(item: any): AdditionalData {
  return {
    assessedResourceType: item["assessedResourceType"],
  };
}

/** Alias for AdditionalDataUnion */
export type AdditionalDataUnion =
  | SqlServerVulnerabilityProperties
  | ContainerRegistryVulnerabilityProperties
  | ServerVulnerabilityProperties
  | AdditionalData;

export function additionalDataUnionDeserializer(item: any): AdditionalDataUnion {
  switch (item["assessedResourceType"]) {
    case "SqlServerVulnerability":
      return sqlServerVulnerabilityPropertiesDeserializer(item as SqlServerVulnerabilityProperties);

    case "ContainerRegistryVulnerability":
      return containerRegistryVulnerabilityPropertiesDeserializer(
        item as ContainerRegistryVulnerabilityProperties,
      );

    case "ServerVulnerabilityAssessment":
      return serverVulnerabilityPropertiesDeserializer(item as ServerVulnerabilityProperties);

    default:
      return additionalDataDeserializer(item);
  }
}

/** Sub-assessment resource type */
export enum KnownAssessedResourceType {
  /** SqlServerVulnerability */
  SqlServerVulnerability = "SqlServerVulnerability",
  /** ContainerRegistryVulnerability */
  ContainerRegistryVulnerability = "ContainerRegistryVulnerability",
  /** ServerVulnerability */
  ServerVulnerability = "ServerVulnerability",
}

/**
 * Sub-assessment resource type \
 * {@link KnownAssessedResourceType} can be used interchangeably with AssessedResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SqlServerVulnerability**: SqlServerVulnerability \
 * **ContainerRegistryVulnerability**: ContainerRegistryVulnerability \
 * **ServerVulnerability**: ServerVulnerability
 */
export type AssessedResourceType = string;

/** Details of the resource that was assessed */
export interface SqlServerVulnerabilityProperties extends AdditionalData {
  /** The resource type the sub assessment refers to in its resource details */
  readonly type?: string;
  /** The T-SQL query that runs on your SQL database to perform the particular check */
  readonly query?: string;
  /** Sub-assessment resource type */
  assessedResourceType: "SqlServerVulnerability";
}

export function sqlServerVulnerabilityPropertiesDeserializer(
  item: any,
): SqlServerVulnerabilityProperties {
  return {
    assessedResourceType: item["assessedResourceType"],
    type: item["type"],
    query: item["query"],
  };
}

/** Additional context fields for container registry Vulnerability assessment */
export interface ContainerRegistryVulnerabilityProperties extends AdditionalData {
  /** Vulnerability Type. e.g: Vulnerability, Potential Vulnerability, Information Gathered, Vulnerability */
  readonly type?: string;
  /** Dictionary from cvss version to cvss details object */
  readonly cvss?: Record<string, Cvss>;
  /** Indicates whether a patch is available or not */
  readonly patchable?: boolean;
  /** List of CVEs */
  readonly cve?: Cve[];
  /** Published time */
  readonly publishedTime?: Date;
  readonly vendorReferences?: VendorReference[];
  /** Name of the repository which the vulnerable image belongs to */
  readonly repositoryName?: string;
  /** Digest of the vulnerable image */
  readonly imageDigest?: string;
  /** Sub-assessment resource type */
  assessedResourceType: "ContainerRegistryVulnerability";
}

export function containerRegistryVulnerabilityPropertiesDeserializer(
  item: any,
): ContainerRegistryVulnerabilityProperties {
  return {
    assessedResourceType: item["assessedResourceType"],
    type: item["type"],
    cvss: !item["cvss"] ? item["cvss"] : cvssRecordDeserializer(item["cvss"]),
    patchable: item["patchable"],
    cve: !item["cve"] ? item["cve"] : cveArrayDeserializer(item["cve"]),
    publishedTime: !item["publishedTime"] ? item["publishedTime"] : new Date(item["publishedTime"]),
    vendorReferences: !item["vendorReferences"]
      ? item["vendorReferences"]
      : vendorReferenceArrayDeserializer(item["vendorReferences"]),
    repositoryName: item["repositoryName"],
    imageDigest: item["imageDigest"],
  };
}

export function cvssRecordDeserializer(item: Record<string, any>): Record<string, Cvss> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : cvssDeserializer(item[key]);
  });
  return result;
}

/** CVSS details */
export interface Cvss {
  /** CVSS base */
  readonly base?: number;
}

export function cvssDeserializer(item: any): Cvss {
  return {
    base: item["base"],
  };
}

export function cveArrayDeserializer(result: Array<Cve>): any[] {
  return result.map((item) => {
    return cveDeserializer(item);
  });
}

/** CVE details */
export interface Cve {
  /** CVE title */
  readonly title?: string;
  /** Link url */
  readonly link?: string;
}

export function cveDeserializer(item: any): Cve {
  return {
    title: item["title"],
    link: item["link"],
  };
}

export function vendorReferenceArrayDeserializer(result: Array<VendorReference>): any[] {
  return result.map((item) => {
    return vendorReferenceDeserializer(item);
  });
}

/** Vendor reference */
export interface VendorReference {
  /** Link title */
  readonly title?: string;
  /** Link url */
  readonly link?: string;
}

export function vendorReferenceDeserializer(item: any): VendorReference {
  return {
    title: item["title"],
    link: item["link"],
  };
}

/** Additional context fields for server vulnerability assessment */
export interface ServerVulnerabilityProperties extends AdditionalData {
  /** Vulnerability Type. e.g: Vulnerability, Potential Vulnerability, Information Gathered */
  readonly type?: string;
  /** Dictionary from cvss version to cvss details object */
  readonly cvss?: Record<string, Cvss>;
  /** Indicates whether a patch is available or not */
  readonly patchable?: boolean;
  /** List of CVEs */
  readonly cve?: Cve[];
  /** Threat name */
  readonly threat?: string;
  /** Published time */
  readonly publishedTime?: Date;
  readonly vendorReferences?: VendorReference[];
  /** Sub-assessment resource type */
  assessedResourceType: "ServerVulnerabilityAssessment";
}

export function serverVulnerabilityPropertiesDeserializer(
  item: any,
): ServerVulnerabilityProperties {
  return {
    assessedResourceType: item["assessedResourceType"],
    type: item["type"],
    cvss: !item["cvss"] ? item["cvss"] : cvssRecordDeserializer(item["cvss"]),
    patchable: item["patchable"],
    cve: !item["cve"] ? item["cve"] : cveArrayDeserializer(item["cve"]),
    threat: item["threat"],
    publishedTime: !item["publishedTime"] ? item["publishedTime"] : new Date(item["publishedTime"]),
    vendorReferences: !item["vendorReferences"]
      ? item["vendorReferences"]
      : vendorReferenceArrayDeserializer(item["vendorReferences"]),
  };
}

/** List of security sub-assessments */
export interface _SecuritySubAssessmentList {
  /** List of security sub-assessments */
  readonly value?: SecuritySubAssessment[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _securitySubAssessmentListDeserializer(item: any): _SecuritySubAssessmentList {
  return {
    value: !item["value"] ? item["value"] : securitySubAssessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securitySubAssessmentArrayDeserializer(
  result: Array<SecuritySubAssessment>,
): any[] {
  return result.map((item) => {
    return securitySubAssessmentDeserializer(item);
  });
}

export function _securitySubAssessmentPropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    displayName: item["displayName"],
    status: !item["status"] ? item["status"] : subAssessmentStatusDeserializer(item["status"]),
    remediation: item["remediation"],
    impact: item["impact"],
    category: item["category"],
    description: item["description"],
    timeGenerated: !item["timeGenerated"] ? item["timeGenerated"] : new Date(item["timeGenerated"]),
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : resourceDetailsUnionDeserializer(item["resourceDetails"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : additionalDataUnionDeserializer(item["additionalData"]),
  };
}
