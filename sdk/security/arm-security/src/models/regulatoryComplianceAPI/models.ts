// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommonState } from "../common/models.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Regulatory compliance standard details and state */
export interface RegulatoryComplianceAPIRegulatoryComplianceStandard extends ProxyResource {
  /** Aggregative state based on the standard's supported controls states */
  state?: CommonState;
  /** The number of supported regulatory compliance controls of the given standard with a passed state */
  readonly passedControls?: number;
  /** The number of supported regulatory compliance controls of the given standard with a failed state */
  readonly failedControls?: number;
  /** The number of supported regulatory compliance controls of the given standard with a skipped state */
  readonly skippedControls?: number;
  /** The number of regulatory compliance controls of the given standard which are unsupported by automated assessments */
  readonly unsupportedControls?: number;
}

export function regulatoryComplianceAPIRegulatoryComplianceStandardDeserializer(
  item: any,
): RegulatoryComplianceAPIRegulatoryComplianceStandard {
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
export interface RegulatoryComplianceAPIRegulatoryComplianceStandardProperties {
  /** Aggregative state based on the standard's supported controls states */
  state?: CommonState;
  /** The number of supported regulatory compliance controls of the given standard with a passed state */
  readonly passedControls?: number;
  /** The number of supported regulatory compliance controls of the given standard with a failed state */
  readonly failedControls?: number;
  /** The number of supported regulatory compliance controls of the given standard with a skipped state */
  readonly skippedControls?: number;
  /** The number of regulatory compliance controls of the given standard which are unsupported by automated assessments */
  readonly unsupportedControls?: number;
}

export function regulatoryComplianceAPIRegulatoryComplianceStandardPropertiesDeserializer(
  item: any,
): RegulatoryComplianceAPIRegulatoryComplianceStandardProperties {
  return {
    state: item["state"],
    passedControls: item["passedControls"],
    failedControls: item["failedControls"],
    skippedControls: item["skippedControls"],
    unsupportedControls: item["unsupportedControls"],
  };
}

/** List of regulatory compliance standards response */
export interface _RegulatoryComplianceAPIRegulatoryComplianceStandardList {
  /** The RegulatoryComplianceStandard items on this page */
  value: RegulatoryComplianceAPIRegulatoryComplianceStandard[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _regulatoryComplianceAPIRegulatoryComplianceStandardListDeserializer(
  item: any,
): _RegulatoryComplianceAPIRegulatoryComplianceStandardList {
  return {
    value: regulatoryComplianceAPIRegulatoryComplianceStandardArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function regulatoryComplianceAPIRegulatoryComplianceStandardArrayDeserializer(
  result: Array<RegulatoryComplianceAPIRegulatoryComplianceStandard>,
): any[] {
  return result.map((item) => {
    return regulatoryComplianceAPIRegulatoryComplianceStandardDeserializer(item);
  });
}

/** Regulatory compliance control details and state */
export interface RegulatoryComplianceAPIRegulatoryComplianceControl extends ProxyResource {
  /** The description of the regulatory compliance control */
  readonly description?: string;
  /** Aggregative state based on the control's supported assessments states */
  state?: CommonState;
  /** The number of supported regulatory compliance assessments of the given control with a passed state */
  readonly passedAssessments?: number;
  /** The number of supported regulatory compliance assessments of the given control with a failed state */
  readonly failedAssessments?: number;
  /** The number of supported regulatory compliance assessments of the given control with a skipped state */
  readonly skippedAssessments?: number;
}

export function regulatoryComplianceAPIRegulatoryComplianceControlDeserializer(
  item: any,
): RegulatoryComplianceAPIRegulatoryComplianceControl {
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
export interface RegulatoryComplianceAPIRegulatoryComplianceControlProperties {
  /** The description of the regulatory compliance control */
  readonly description?: string;
  /** Aggregative state based on the control's supported assessments states */
  state?: CommonState;
  /** The number of supported regulatory compliance assessments of the given control with a passed state */
  readonly passedAssessments?: number;
  /** The number of supported regulatory compliance assessments of the given control with a failed state */
  readonly failedAssessments?: number;
  /** The number of supported regulatory compliance assessments of the given control with a skipped state */
  readonly skippedAssessments?: number;
}

export function regulatoryComplianceAPIRegulatoryComplianceControlPropertiesDeserializer(
  item: any,
): RegulatoryComplianceAPIRegulatoryComplianceControlProperties {
  return {
    description: item["description"],
    state: item["state"],
    passedAssessments: item["passedAssessments"],
    failedAssessments: item["failedAssessments"],
    skippedAssessments: item["skippedAssessments"],
  };
}

/** List of regulatory compliance controls response */
export interface _RegulatoryComplianceAPIRegulatoryComplianceControlList {
  /** The RegulatoryComplianceControl items on this page */
  value: RegulatoryComplianceAPIRegulatoryComplianceControl[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _regulatoryComplianceAPIRegulatoryComplianceControlListDeserializer(
  item: any,
): _RegulatoryComplianceAPIRegulatoryComplianceControlList {
  return {
    value: regulatoryComplianceAPIRegulatoryComplianceControlArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function regulatoryComplianceAPIRegulatoryComplianceControlArrayDeserializer(
  result: Array<RegulatoryComplianceAPIRegulatoryComplianceControl>,
): any[] {
  return result.map((item) => {
    return regulatoryComplianceAPIRegulatoryComplianceControlDeserializer(item);
  });
}

/** Regulatory compliance assessment details and state */
export interface RegulatoryComplianceAPIRegulatoryComplianceAssessment extends ProxyResource {
  /** The description of the regulatory compliance assessment */
  readonly description?: string;
  /** The expected type of assessment contained in the AssessmentDetailsLink */
  readonly assessmentType?: string;
  /** Link to more detailed assessment results data. The response type will be according to the assessmentType field */
  readonly assessmentDetailsLink?: string;
  /** Aggregative state based on the assessment's scanned resources states */
  state?: CommonState;
  /** The given assessment's related resources count with passed state. */
  readonly passedResources?: number;
  /** The given assessment's related resources count with failed state. */
  readonly failedResources?: number;
  /** The given assessment's related resources count with skipped state. */
  readonly skippedResources?: number;
  /** The given assessment's related resources count with unsupported state. */
  readonly unsupportedResources?: number;
}

export function regulatoryComplianceAPIRegulatoryComplianceAssessmentDeserializer(
  item: any,
): RegulatoryComplianceAPIRegulatoryComplianceAssessment {
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
export interface RegulatoryComplianceAPIRegulatoryComplianceAssessmentProperties {
  /** The description of the regulatory compliance assessment */
  readonly description?: string;
  /** The expected type of assessment contained in the AssessmentDetailsLink */
  readonly assessmentType?: string;
  /** Link to more detailed assessment results data. The response type will be according to the assessmentType field */
  readonly assessmentDetailsLink?: string;
  /** Aggregative state based on the assessment's scanned resources states */
  state?: CommonState;
  /** The given assessment's related resources count with passed state. */
  readonly passedResources?: number;
  /** The given assessment's related resources count with failed state. */
  readonly failedResources?: number;
  /** The given assessment's related resources count with skipped state. */
  readonly skippedResources?: number;
  /** The given assessment's related resources count with unsupported state. */
  readonly unsupportedResources?: number;
}

export function regulatoryComplianceAPIRegulatoryComplianceAssessmentPropertiesDeserializer(
  item: any,
): RegulatoryComplianceAPIRegulatoryComplianceAssessmentProperties {
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
export interface _RegulatoryComplianceAPIRegulatoryComplianceAssessmentList {
  /** The RegulatoryComplianceAssessment items on this page */
  value: RegulatoryComplianceAPIRegulatoryComplianceAssessment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _regulatoryComplianceAPIRegulatoryComplianceAssessmentListDeserializer(
  item: any,
): _RegulatoryComplianceAPIRegulatoryComplianceAssessmentList {
  return {
    value: regulatoryComplianceAPIRegulatoryComplianceAssessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function regulatoryComplianceAPIRegulatoryComplianceAssessmentArrayDeserializer(
  result: Array<RegulatoryComplianceAPIRegulatoryComplianceAssessment>,
): any[] {
  return result.map((item) => {
    return regulatoryComplianceAPIRegulatoryComplianceAssessmentDeserializer(item);
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
