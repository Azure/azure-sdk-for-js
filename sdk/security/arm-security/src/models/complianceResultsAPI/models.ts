// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** a compliance result */
export interface ComplianceResultsAPIComplianceResult extends ExtensionResource {
  /** The status of the resource regarding a single assessment */
  readonly resourceStatus?: ComplianceResultsAPIResourceStatus;
}

export function complianceResultsAPIComplianceResultDeserializer(
  item: any,
): ComplianceResultsAPIComplianceResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _complianceResultPropertiesDeserializer(item["properties"])),
  };
}

/** Compliance result data */
export interface ComplianceResultsAPIComplianceResultProperties {
  /** The status of the resource regarding a single assessment */
  readonly resourceStatus?: ComplianceResultsAPIResourceStatus;
}

export function complianceResultsAPIComplianceResultPropertiesDeserializer(
  item: any,
): ComplianceResultsAPIComplianceResultProperties {
  return {
    resourceStatus: item["resourceStatus"],
  };
}

/** The status of the resource regarding a single assessment */
export enum KnownComplianceResultsAPIResourceStatus {
  /** This assessment on the resource is healthy */
  Healthy = "Healthy",
  /** This assessment is not applicable to this resource */
  NotApplicable = "NotApplicable",
  /** This assessment is turned off by policy on this subscription */
  OffByPolicy = "OffByPolicy",
  /** This assessment on the resource is not healthy */
  NotHealthy = "NotHealthy",
}

/**
 * The status of the resource regarding a single assessment \
 * {@link KnownComplianceResultsAPIResourceStatus} can be used interchangeably with ComplianceResultsAPIResourceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: This assessment on the resource is healthy \
 * **NotApplicable**: This assessment is not applicable to this resource \
 * **OffByPolicy**: This assessment is turned off by policy on this subscription \
 * **NotHealthy**: This assessment on the resource is not healthy
 */
export type ComplianceResultsAPIResourceStatus = string;

/** List of compliance results response */
export interface _ComplianceResultsAPIComplianceResultList {
  /** The ComplianceResult items on this page */
  value: ComplianceResultsAPIComplianceResult[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _complianceResultsAPIComplianceResultListDeserializer(
  item: any,
): _ComplianceResultsAPIComplianceResultList {
  return {
    value: complianceResultsAPIComplianceResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function complianceResultsAPIComplianceResultArrayDeserializer(
  result: Array<ComplianceResultsAPIComplianceResult>,
): any[] {
  return result.map((item) => {
    return complianceResultsAPIComplianceResultDeserializer(item);
  });
}

export function _complianceResultPropertiesDeserializer(item: any) {
  return {
    resourceStatus: item["resourceStatus"],
  };
}
