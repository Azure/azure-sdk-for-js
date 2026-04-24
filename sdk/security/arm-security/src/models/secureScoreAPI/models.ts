// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxyResource, Resource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Secure score item data model */
export interface SecureScoreAPISecureScoreItem extends ProxyResource {
  /** The initiative's name */
  readonly displayName?: string;
  /** score object */
  readonly score?: SecureScoreAPIScoreDetails;
  /** The relative weight for each subscription. Used when calculating an aggregated secure score for multiple subscriptions. */
  readonly weight?: number;
}

export function secureScoreAPISecureScoreItemDeserializer(
  item: any,
): SecureScoreAPISecureScoreItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _secureScoreItemPropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of a calculated secure score. */
export interface SecureScoreAPISecureScoreItemProperties {
  /** The initiative's name */
  readonly displayName?: string;
  /** The relative weight for each subscription. Used when calculating an aggregated secure score for multiple subscriptions. */
  readonly weight?: number;
  /** Maximum score available */
  readonly max?: number;
  /** Current score */
  readonly current?: number;
  /** Ratio of the current score divided by the maximum. Rounded to 4 digits after the decimal point */
  readonly percentage?: number;
}

export function secureScoreAPISecureScoreItemPropertiesDeserializer(
  item: any,
): SecureScoreAPISecureScoreItemProperties {
  return {
    displayName: item["displayName"],
    ...(!item["score"]
      ? item["score"]
      : _secureScoreItemPropertiesScoreDeserializer(item["score"])),
    weight: item["weight"],
  };
}

/** Calculation result data */
export interface SecureScoreAPIScoreDetails {
  /** Maximum score available */
  readonly max?: number;
  /** Current score */
  readonly current?: number;
  /** Ratio of the current score divided by the maximum. Rounded to 4 digits after the decimal point */
  readonly percentage?: number;
}

export function secureScoreAPIScoreDetailsDeserializer(item: any): SecureScoreAPIScoreDetails {
  return {
    max: item["max"],
    current: item["current"],
    percentage: item["percentage"],
  };
}

/** List of secure scores */
export interface _SecureScoreAPISecureScoresList {
  /** Collection of secure scores in this page */
  readonly value?: SecureScoreAPISecureScoreItem[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _secureScoreAPISecureScoresListDeserializer(
  item: any,
): _SecureScoreAPISecureScoresList {
  return {
    value: !item["value"]
      ? item["value"]
      : secureScoreAPISecureScoreItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function secureScoreAPISecureScoreItemArrayDeserializer(
  result: Array<SecureScoreAPISecureScoreItem>,
): any[] {
  return result.map((item) => {
    return secureScoreAPISecureScoreItemDeserializer(item);
  });
}

/** List of security controls */
export interface _SecureScoreAPISecureScoreControlList {
  /** Collection of security controls in this page */
  readonly value?: SecureScoreAPISecureScoreControlDetails[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _secureScoreAPISecureScoreControlListDeserializer(
  item: any,
): _SecureScoreAPISecureScoreControlList {
  return {
    value: !item["value"]
      ? item["value"]
      : secureScoreAPISecureScoreControlDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function secureScoreAPISecureScoreControlDetailsArrayDeserializer(
  result: Array<SecureScoreAPISecureScoreControlDetails>,
): any[] {
  return result.map((item) => {
    return secureScoreAPISecureScoreControlDetailsDeserializer(item);
  });
}

/** Details of the security control, its score, and the health status of the relevant resources. */
export interface SecureScoreAPISecureScoreControlDetails extends Resource {
  /** User friendly display name of the control */
  readonly displayName?: string;
  /** Actual score object for the control */
  score?: SecureScoreAPIScoreDetails;
  /** Number of healthy resources in the control */
  readonly healthyResourceCount?: number;
  /** Number of unhealthy resources in the control */
  readonly unhealthyResourceCount?: number;
  /** Number of not applicable resources in the control */
  readonly notApplicableResourceCount?: number;
  /** The relative weight for this specific control in each of your subscriptions. Used when calculating an aggregated score for this control across all of your subscriptions. */
  readonly weight?: number;
  /** Information about the security control. */
  definition?: SecureScoreAPISecureScoreControlDefinitionItem;
}

export function secureScoreAPISecureScoreControlDetailsDeserializer(
  item: any,
): SecureScoreAPISecureScoreControlDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _secureScoreControlDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** Calculation result data in control level */
export interface SecureScoreAPISecureScoreControlScoreDetails {
  /** User friendly display name of the control */
  readonly displayName?: string;
  /** Number of healthy resources in the control */
  readonly healthyResourceCount?: number;
  /** Number of unhealthy resources in the control */
  readonly unhealthyResourceCount?: number;
  /** Number of not applicable resources in the control */
  readonly notApplicableResourceCount?: number;
  /** The relative weight for this specific control in each of your subscriptions. Used when calculating an aggregated score for this control across all of your subscriptions. */
  readonly weight?: number;
  /** Information about the security control. */
  definition?: SecureScoreAPISecureScoreControlDefinitionItem;
  /** Maximum score available */
  readonly max?: number;
  /** Current score */
  readonly current?: number;
  /** Ratio of the current score divided by the maximum. Rounded to 4 digits after the decimal point */
  readonly percentage?: number;
}

export function secureScoreAPISecureScoreControlScoreDetailsDeserializer(
  item: any,
): SecureScoreAPISecureScoreControlScoreDetails {
  return {
    displayName: item["displayName"],
    ...(!item["score"]
      ? item["score"]
      : _secureScoreControlScoreDetailsScoreDeserializer(item["score"])),
    healthyResourceCount: item["healthyResourceCount"],
    unhealthyResourceCount: item["unhealthyResourceCount"],
    notApplicableResourceCount: item["notApplicableResourceCount"],
    weight: item["weight"],
    definition: !item["definition"]
      ? item["definition"]
      : secureScoreAPISecureScoreControlDefinitionItemDeserializer(item["definition"]),
  };
}

/** Information about the security control. */
export interface SecureScoreAPISecureScoreControlDefinitionItem extends Resource {
  /** User friendly display name of the control */
  readonly displayName?: string;
  /** User friendly description of the control */
  readonly description?: string;
  /** Maximum control score (0..10) */
  readonly maxScore?: number;
  /** Source object from which the control was created */
  readonly source?: SecureScoreAPISecureScoreControlDefinitionSource;
  /** Array of assessments metadata IDs that are included in this security control */
  readonly assessmentDefinitions?: SecureScoreAPIAzureResourceLink[];
}

export function secureScoreAPISecureScoreControlDefinitionItemDeserializer(
  item: any,
): SecureScoreAPISecureScoreControlDefinitionItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _secureScoreControlDefinitionItemPropertiesDeserializer(item["properties"])),
  };
}

/** Security Control Definition Properties. */
export interface SecureScoreAPISecureScoreControlDefinitionItemProperties {
  /** User friendly display name of the control */
  readonly displayName?: string;
  /** User friendly description of the control */
  readonly description?: string;
  /** Maximum control score (0..10) */
  readonly maxScore?: number;
  /** Source object from which the control was created */
  readonly source?: SecureScoreAPISecureScoreControlDefinitionSource;
  /** Array of assessments metadata IDs that are included in this security control */
  readonly assessmentDefinitions?: SecureScoreAPIAzureResourceLink[];
}

export function secureScoreAPISecureScoreControlDefinitionItemPropertiesDeserializer(
  item: any,
): SecureScoreAPISecureScoreControlDefinitionItemProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    maxScore: item["maxScore"],
    source: !item["source"]
      ? item["source"]
      : secureScoreAPISecureScoreControlDefinitionSourceDeserializer(item["source"]),
    assessmentDefinitions: !item["assessmentDefinitions"]
      ? item["assessmentDefinitions"]
      : secureScoreAPIAzureResourceLinkArrayDeserializer(item["assessmentDefinitions"]),
  };
}

/** The type of the security control (For example, BuiltIn) */
export interface SecureScoreAPISecureScoreControlDefinitionSource {
  /** The type of security control (for example, BuiltIn) */
  sourceType?: SecureScoreAPIControlType;
}

export function secureScoreAPISecureScoreControlDefinitionSourceDeserializer(
  item: any,
): SecureScoreAPISecureScoreControlDefinitionSource {
  return {
    sourceType: item["sourceType"],
  };
}

/** The type of security control (for example, BuiltIn) */
export enum KnownSecureScoreAPIControlType {
  /** Microsoft Defender for Cloud managed assessments */
  BuiltIn = "BuiltIn",
  /** Non Microsoft Defender for Cloud managed assessments */
  Custom = "Custom",
}

/**
 * The type of security control (for example, BuiltIn) \
 * {@link KnownSecureScoreAPIControlType} can be used interchangeably with SecureScoreAPIControlType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BuiltIn**: Microsoft Defender for Cloud managed assessments \
 * **Custom**: Non Microsoft Defender for Cloud managed assessments
 */
export type SecureScoreAPIControlType = string;

export function secureScoreAPIAzureResourceLinkArrayDeserializer(
  result: Array<SecureScoreAPIAzureResourceLink>,
): any[] {
  return result.map((item) => {
    return secureScoreAPIAzureResourceLinkDeserializer(item);
  });
}

/** Describes an Azure resource with kind */
export interface SecureScoreAPIAzureResourceLink {
  /** Azure resource Id */
  readonly id?: string;
}

export function secureScoreAPIAzureResourceLinkDeserializer(
  item: any,
): SecureScoreAPIAzureResourceLink {
  return {
    id: item["id"],
  };
}

/** List of security controls definition */
export interface _SecureScoreAPIsecureScoreControlDefinitionList {
  /** Collection of security control definitions. */
  readonly value?: SecureScoreAPISecureScoreControlDefinitionItem[];
  /** The URL to get the next page of results. */
  nextLink?: string;
}

export function _secureScoreAPIsecureScoreControlDefinitionListDeserializer(
  item: any,
): _SecureScoreAPIsecureScoreControlDefinitionList {
  return {
    value: !item["value"]
      ? item["value"]
      : secureScoreAPISecureScoreControlDefinitionItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function secureScoreAPISecureScoreControlDefinitionItemArrayDeserializer(
  result: Array<SecureScoreAPISecureScoreControlDefinitionItem>,
): any[] {
  return result.map((item) => {
    return secureScoreAPISecureScoreControlDefinitionItemDeserializer(item);
  });
}

/** Known values of {@link ExpandControlsEnum} that the service accepts. */
export enum KnownSecureScoreAPIExpandControlsEnum {
  /** Add definition object for each control */
  Definition = "definition",
}

/** Type of SecureScoreAPIExpandControlsEnum */
export type SecureScoreAPIExpandControlsEnum = string;

export function _secureScoreItemPropertiesScoreDeserializer(item: any) {
  return {
    max: item["max"],
    current: item["current"],
    percentage: item["percentage"],
  };
}

export function _secureScoreItemPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    score: !item["score"] ? item["score"] : secureScoreAPIScoreDetailsDeserializer(item["score"]),
    weight: item["weight"],
  };
}

export function _secureScoreControlScoreDetailsScoreDeserializer(item: any) {
  return {
    max: item["max"],
    current: item["current"],
    percentage: item["percentage"],
  };
}

export function _secureScoreControlDefinitionItemPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    maxScore: item["maxScore"],
    source: !item["source"]
      ? item["source"]
      : secureScoreAPISecureScoreControlDefinitionSourceDeserializer(item["source"]),
    assessmentDefinitions: !item["assessmentDefinitions"]
      ? item["assessmentDefinitions"]
      : secureScoreAPIAzureResourceLinkArrayDeserializer(item["assessmentDefinitions"]),
  };
}

export function _secureScoreControlDetailsPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    score: !item["score"] ? item["score"] : secureScoreAPIScoreDetailsDeserializer(item["score"]),
    healthyResourceCount: item["healthyResourceCount"],
    unhealthyResourceCount: item["unhealthyResourceCount"],
    notApplicableResourceCount: item["notApplicableResourceCount"],
    weight: item["weight"],
    definition: !item["definition"]
      ? item["definition"]
      : secureScoreAPISecureScoreControlDefinitionItemDeserializer(item["definition"]),
  };
}
