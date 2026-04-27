// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { State } from "../common/models.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Regulatory compliance standard details and state */
export interface RegulatoryComplianceStandard extends ProxyResource {
  /** Aggregative state based on the standard's supported controls states */
  state?: State;
  /** The number of supported regulatory compliance controls of the given standard with a passed state */
  readonly passedControls?: number;
  /** The number of supported regulatory compliance controls of the given standard with a failed state */
  readonly failedControls?: number;
  /** The number of supported regulatory compliance controls of the given standard with a skipped state */
  readonly skippedControls?: number;
  /** The number of regulatory compliance controls of the given standard which are unsupported by automated assessments */
  readonly unsupportedControls?: number;
}

export function regulatoryComplianceStandardDeserializer(item: any): RegulatoryComplianceStandard {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _regulatoryComplianceStandardPropertiesDeserializer(item["properties"])),
  };
}

/** Regulatory compliance standard data */
export interface RegulatoryComplianceStandardProperties {
  /** Aggregative state based on the standard's supported controls states */
  state?: State;
  /** The number of supported regulatory compliance controls of the given standard with a passed state */
  readonly passedControls?: number;
  /** The number of supported regulatory compliance controls of the given standard with a failed state */
  readonly failedControls?: number;
  /** The number of supported regulatory compliance controls of the given standard with a skipped state */
  readonly skippedControls?: number;
  /** The number of regulatory compliance controls of the given standard which are unsupported by automated assessments */
  readonly unsupportedControls?: number;
}

export function regulatoryComplianceStandardPropertiesDeserializer(
  item: any,
): RegulatoryComplianceStandardProperties {
  return {
    state: item["state"],
    passedControls: item["passedControls"],
    failedControls: item["failedControls"],
    skippedControls: item["skippedControls"],
    unsupportedControls: item["unsupportedControls"],
  };
}

/** List of regulatory compliance standards response */
export interface _RegulatoryComplianceStandardList {
  /** The RegulatoryComplianceStandard items on this page */
  value: RegulatoryComplianceStandard[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _regulatoryComplianceStandardListDeserializer(
  item: any,
): _RegulatoryComplianceStandardList {
  return {
    value: regulatoryComplianceStandardArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function regulatoryComplianceStandardArrayDeserializer(
  result: Array<RegulatoryComplianceStandard>,
): any[] {
  return result.map((item) => {
    return regulatoryComplianceStandardDeserializer(item);
  });
}

/** Regulatory compliance control details and state */
export interface RegulatoryComplianceControl extends ProxyResource {
  /** The description of the regulatory compliance control */
  readonly description?: string;
  /** Aggregative state based on the control's supported assessments states */
  state?: State;
  /** The number of supported regulatory compliance assessments of the given control with a passed state */
  readonly passedAssessments?: number;
  /** The number of supported regulatory compliance assessments of the given control with a failed state */
  readonly failedAssessments?: number;
  /** The number of supported regulatory compliance assessments of the given control with a skipped state */
  readonly skippedAssessments?: number;
}

export function regulatoryComplianceControlDeserializer(item: any): RegulatoryComplianceControl {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _regulatoryComplianceControlPropertiesDeserializer(item["properties"])),
  };
}

/** Regulatory compliance control data */
export interface RegulatoryComplianceControlProperties {
  /** The description of the regulatory compliance control */
  readonly description?: string;
  /** Aggregative state based on the control's supported assessments states */
  state?: State;
  /** The number of supported regulatory compliance assessments of the given control with a passed state */
  readonly passedAssessments?: number;
  /** The number of supported regulatory compliance assessments of the given control with a failed state */
  readonly failedAssessments?: number;
  /** The number of supported regulatory compliance assessments of the given control with a skipped state */
  readonly skippedAssessments?: number;
}

export function regulatoryComplianceControlPropertiesDeserializer(
  item: any,
): RegulatoryComplianceControlProperties {
  return {
    description: item["description"],
    state: item["state"],
    passedAssessments: item["passedAssessments"],
    failedAssessments: item["failedAssessments"],
    skippedAssessments: item["skippedAssessments"],
  };
}

/** List of regulatory compliance controls response */
export interface _RegulatoryComplianceControlList {
  /** The RegulatoryComplianceControl items on this page */
  value: RegulatoryComplianceControl[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _regulatoryComplianceControlListDeserializer(
  item: any,
): _RegulatoryComplianceControlList {
  return {
    value: regulatoryComplianceControlArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function regulatoryComplianceControlArrayDeserializer(
  result: Array<RegulatoryComplianceControl>,
): any[] {
  return result.map((item) => {
    return regulatoryComplianceControlDeserializer(item);
  });
}

/** Regulatory compliance assessment details and state */
export interface RegulatoryComplianceAssessment extends ProxyResource {
  /** The description of the regulatory compliance assessment */
  readonly description?: string;
  /** The expected type of assessment contained in the AssessmentDetailsLink */
  readonly assessmentType?: string;
  /** Link to more detailed assessment results data. The response type will be according to the assessmentType field */
  readonly assessmentDetailsLink?: string;
  /** Aggregative state based on the assessment's scanned resources states */
  state?: State;
  /** The given assessment's related resources count with passed state. */
  readonly passedResources?: number;
  /** The given assessment's related resources count with failed state. */
  readonly failedResources?: number;
  /** The given assessment's related resources count with skipped state. */
  readonly skippedResources?: number;
  /** The given assessment's related resources count with unsupported state. */
  readonly unsupportedResources?: number;
}

export function regulatoryComplianceAssessmentDeserializer(
  item: any,
): RegulatoryComplianceAssessment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _regulatoryComplianceAssessmentPropertiesDeserializer(item["properties"])),
  };
}

/** Regulatory compliance assessment data */
export interface RegulatoryComplianceAssessmentProperties {
  /** The description of the regulatory compliance assessment */
  readonly description?: string;
  /** The expected type of assessment contained in the AssessmentDetailsLink */
  readonly assessmentType?: string;
  /** Link to more detailed assessment results data. The response type will be according to the assessmentType field */
  readonly assessmentDetailsLink?: string;
  /** Aggregative state based on the assessment's scanned resources states */
  state?: State;
  /** The given assessment's related resources count with passed state. */
  readonly passedResources?: number;
  /** The given assessment's related resources count with failed state. */
  readonly failedResources?: number;
  /** The given assessment's related resources count with skipped state. */
  readonly skippedResources?: number;
  /** The given assessment's related resources count with unsupported state. */
  readonly unsupportedResources?: number;
}

export function regulatoryComplianceAssessmentPropertiesDeserializer(
  item: any,
): RegulatoryComplianceAssessmentProperties {
  return {
    description: item["description"],
    assessmentType: item["assessmentType"],
    assessmentDetailsLink: item["assessmentDetailsLink"],
    state: item["state"],
    passedResources: item["passedResources"],
    failedResources: item["failedResources"],
    skippedResources: item["skippedResources"],
    unsupportedResources: item["unsupportedResources"],
  };
}

/** List of regulatory compliance assessment response */
export interface _RegulatoryComplianceAssessmentList {
  /** The RegulatoryComplianceAssessment items on this page */
  value: RegulatoryComplianceAssessment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _regulatoryComplianceAssessmentListDeserializer(
  item: any,
): _RegulatoryComplianceAssessmentList {
  return {
    value: regulatoryComplianceAssessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function regulatoryComplianceAssessmentArrayDeserializer(
  result: Array<RegulatoryComplianceAssessment>,
): any[] {
  return result.map((item) => {
    return regulatoryComplianceAssessmentDeserializer(item);
  });
}

export function _regulatoryComplianceStandardPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    passedControls: item["passedControls"],
    failedControls: item["failedControls"],
    skippedControls: item["skippedControls"],
    unsupportedControls: item["unsupportedControls"],
  };
}

export function _regulatoryComplianceControlPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    state: item["state"],
    passedAssessments: item["passedAssessments"],
    failedAssessments: item["failedAssessments"],
    skippedAssessments: item["skippedAssessments"],
  };
}

export function _regulatoryComplianceAssessmentPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    assessmentType: item["assessmentType"],
    assessmentDetailsLink: item["assessmentDetailsLink"],
    state: item["state"],
    passedResources: item["passedResources"],
    failedResources: item["failedResources"],
    skippedResources: item["skippedResources"],
    unsupportedResources: item["unsupportedResources"],
  };
}
