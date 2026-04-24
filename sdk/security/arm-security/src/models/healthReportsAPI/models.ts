// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Source } from "../common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The health report resource */
export interface HealthReport extends ExtensionResource {
  /** The resource details of the health report */
  resourceDetails?: ResourceDetails;
  /** The environment details of the resource */
  environmentDetails?: EnvironmentDetails;
  /** The classification of the health report */
  healthDataClassification?: HealthDataClassification;
  /** The status of the health report */
  status?: Status;
  /** The affected defenders plans by unhealthy report */
  affectedDefendersPlans?: string[];
  /** The affected defenders sub plans by unhealthy report */
  affectedDefendersSubPlans?: string[];
  /** Additional data for the given health report, this field can include more details on the resource and the health scenario. */
  readonly reportAdditionalData?: Record<string, string>;
  /** A collection of the issues in the report */
  issues?: Issue[];
}

export function healthReportDeserializer(item: any): HealthReport {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _healthReportPropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of the health report */
export interface HealthReportProperties {
  /** The resource details of the health report */
  resourceDetails?: ResourceDetails;
  /** The environment details of the resource */
  environmentDetails?: EnvironmentDetails;
  /** The classification of the health report */
  healthDataClassification?: HealthDataClassification;
  /** The status of the health report */
  status?: Status;
  /** The affected defenders plans by unhealthy report */
  affectedDefendersPlans?: string[];
  /** The affected defenders sub plans by unhealthy report */
  affectedDefendersSubPlans?: string[];
  /** Additional data for the given health report, this field can include more details on the resource and the health scenario. */
  readonly reportAdditionalData?: Record<string, string>;
  /** A collection of the issues in the report */
  issues?: Issue[];
}

export function healthReportPropertiesDeserializer(item: any): HealthReportProperties {
  return {
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : resourceDetailsDeserializer(item["resourceDetails"]),
    environmentDetails: !item["environmentDetails"]
      ? item["environmentDetails"]
      : environmentDetailsDeserializer(item["environmentDetails"]),
    healthDataClassification: !item["healthDataClassification"]
      ? item["healthDataClassification"]
      : healthDataClassificationDeserializer(item["healthDataClassification"]),
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    affectedDefendersPlans: !item["affectedDefendersPlans"]
      ? item["affectedDefendersPlans"]
      : item["affectedDefendersPlans"].map((p: any) => {
          return p;
        }),
    affectedDefendersSubPlans: !item["affectedDefendersSubPlans"]
      ? item["affectedDefendersSubPlans"]
      : item["affectedDefendersSubPlans"].map((p: any) => {
          return p;
        }),
    reportAdditionalData: !item["reportAdditionalData"]
      ? item["reportAdditionalData"]
      : Object.fromEntries(
          Object.entries(item["reportAdditionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    issues: !item["issues"] ? item["issues"] : issueArrayDeserializer(item["issues"]),
  };
}

/** The resource details of the health report */
export interface ResourceDetails {
  /** The status of the health report */
  source?: Source;
  /** The azure id of the resource */
  readonly id?: string;
  /** The id of the connector */
  readonly connectorId?: string;
}

export function resourceDetailsDeserializer(item: any): ResourceDetails {
  return {
    source: item["source"],
    id: item["id"],
    connectorId: item["connectorId"],
  };
}

/** The environment details of the resource */
export interface EnvironmentDetails {
  /** The native resource id of the resource (in case of Azure - the resource Id, in case of MC - the native resource id) */
  nativeResourceId?: string;
  /** The hierarchy id of the connector (in case of Azure - the subscription Id, in case of MC - the hierarchyId id) */
  environmentHierarchyId?: string;
  /** The organizational hierarchy id of the connector (in case of Azure - the subscription Id, in case of MC - the organizational hierarchyId id) */
  organizationalHierarchyId?: string;
  /** The subscription Id */
  subscriptionId?: string;
  /** The tenant Id */
  tenantId?: string;
}

export function environmentDetailsDeserializer(item: any): EnvironmentDetails {
  return {
    nativeResourceId: item["nativeResourceId"],
    environmentHierarchyId: item["environmentHierarchyId"],
    organizationalHierarchyId: item["organizationalHierarchyId"],
    subscriptionId: item["subscriptionId"],
    tenantId: item["tenantId"],
  };
}

/** The classification of the health report */
export interface HealthDataClassification {
  /** The component describes the name of the agent/service that scans the issue */
  component?: string;
  /** The scenario describes the health scenario issue of the component */
  scenario?: string;
  /** The resource scope of the health report */
  scope?: string;
}

export function healthDataClassificationDeserializer(item: any): HealthDataClassification {
  return {
    component: item["component"],
    scenario: item["scenario"],
    scope: item["scope"],
  };
}

/** The status of the health report */
export interface Status {
  /** The status of the health report */
  code?: StatusName;
  /** The reason of the given status */
  readonly reason?: string;
  /** The date of when the resource was scanned in the last time */
  readonly lastScannedDate?: Date;
  /** The date of when the status of the health report was changed in the last time */
  readonly statusChangeDate?: Date;
  /** The date of when the resource of the health report was scanned in the first time */
  readonly firstEvaluationDate?: Date;
}

export function statusDeserializer(item: any): Status {
  return {
    code: item["code"],
    reason: item["reason"],
    lastScannedDate: !item["lastScannedDate"]
      ? item["lastScannedDate"]
      : new Date(item["lastScannedDate"]),
    statusChangeDate: !item["statusChangeDate"]
      ? item["statusChangeDate"]
      : new Date(item["statusChangeDate"]),
    firstEvaluationDate: !item["firstEvaluationDate"]
      ? item["firstEvaluationDate"]
      : new Date(item["firstEvaluationDate"]),
  };
}

/** The status of the health report */
export enum KnownStatusName {
  /** Healthy */
  Healthy = "Healthy",
  /** NotHealthy */
  NotHealthy = "NotHealthy",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/**
 * The status of the health report \
 * {@link KnownStatusName} can be used interchangeably with StatusName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: Healthy \
 * **NotHealthy**: NotHealthy \
 * **NotApplicable**: NotApplicable
 */
export type StatusName = string;

export function issueArrayDeserializer(result: Array<Issue>): any[] {
  return result.map((item) => {
    return issueDeserializer(item);
  });
}

/** The issue that caused the resource to by unhealthy */
export interface Issue {
  /** The unique issue key */
  issueKey: string;
  /** The issue name */
  issueName?: string;
  /** The affected security values that MDC offers that will be affected by the issue, for example: recommendations, alerts, etc */
  securityValues?: string[];
  /** The issue description */
  issueDescription?: string;
  /** Human readable description of what you should do to mitigate this health issue */
  remediationSteps?: string;
  /** The remediation script to solve this issue */
  remediationScript?: string;
  /** Additional data for the given issue. The additional data depends on the issue type */
  issueAdditionalData?: Record<string, string>;
}

export function issueDeserializer(item: any): Issue {
  return {
    issueKey: item["issueKey"],
    issueName: item["issueName"],
    securityValues: !item["securityValues"]
      ? item["securityValues"]
      : item["securityValues"].map((p: any) => {
          return p;
        }),
    issueDescription: item["issueDescription"],
    remediationSteps: item["remediationSteps"],
    remediationScript: item["remediationScript"],
    issueAdditionalData: !item["issueAdditionalData"]
      ? item["issueAdditionalData"]
      : Object.fromEntries(
          Object.entries(item["issueAdditionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Page of health reports list */
export interface _HealthReportsList {
  /** The HealthReport items on this page. */
  readonly value?: HealthReport[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _healthReportsListDeserializer(item: any): _HealthReportsList {
  return {
    value: !item["value"] ? item["value"] : healthReportArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function healthReportArrayDeserializer(result: Array<HealthReport>): any[] {
  return result.map((item) => {
    return healthReportDeserializer(item);
  });
}

export function _healthReportPropertiesDeserializer(item: any) {
  return {
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : resourceDetailsDeserializer(item["resourceDetails"]),
    environmentDetails: !item["environmentDetails"]
      ? item["environmentDetails"]
      : environmentDetailsDeserializer(item["environmentDetails"]),
    healthDataClassification: !item["healthDataClassification"]
      ? item["healthDataClassification"]
      : healthDataClassificationDeserializer(item["healthDataClassification"]),
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    affectedDefendersPlans: !item["affectedDefendersPlans"]
      ? item["affectedDefendersPlans"]
      : item["affectedDefendersPlans"].map((p: any) => {
          return p;
        }),
    affectedDefendersSubPlans: !item["affectedDefendersSubPlans"]
      ? item["affectedDefendersSubPlans"]
      : item["affectedDefendersSubPlans"].map((p: any) => {
          return p;
        }),
    reportAdditionalData: !item["reportAdditionalData"]
      ? item["reportAdditionalData"]
      : Object.fromEntries(
          Object.entries(item["reportAdditionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    issues: !item["issues"] ? item["issues"] : issueArrayDeserializer(item["issues"]),
  };
}
