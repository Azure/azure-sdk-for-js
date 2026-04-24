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
export interface SecureScoreItem extends ProxyResource {
  /** The initiative's name */
  readonly displayName?: string;
  /** score object */
  readonly score?: ScoreDetails;
  /** The relative weight for each subscription. Used when calculating an aggregated secure score for multiple subscriptions. */
  readonly weight?: number;
}

export function secureScoreItemDeserializer(item: any): SecureScoreItem {
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
export interface SecureScoreItemProperties {
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

export function secureScoreItemPropertiesDeserializer(item: any): SecureScoreItemProperties {
  return {
    displayName: item["displayName"],
    ...(!item["score"]
      ? item["score"]
      : _secureScoreItemPropertiesScoreDeserializer(item["score"])),
    weight: item["weight"],
  };
}

/** Calculation result data */
export interface ScoreDetails {
  /** Maximum score available */
  readonly max?: number;
  /** Current score */
  readonly current?: number;
  /** Ratio of the current score divided by the maximum. Rounded to 4 digits after the decimal point */
  readonly percentage?: number;
}

export function scoreDetailsDeserializer(item: any): ScoreDetails {
  return {
    max: item["max"],
    current: item["current"],
    percentage: item["percentage"],
  };
}

/** List of secure scores */
export interface _SecureScoresList {
  /** Collection of secure scores in this page */
  readonly value?: SecureScoreItem[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _secureScoresListDeserializer(item: any): _SecureScoresList {
  return {
    value: !item["value"] ? item["value"] : secureScoreItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function secureScoreItemArrayDeserializer(result: Array<SecureScoreItem>): any[] {
  return result.map((item) => {
    return secureScoreItemDeserializer(item);
  });
}

/** List of security controls */
export interface _SecureScoreControlList {
  /** Collection of security controls in this page */
  readonly value?: SecureScoreControlDetails[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _secureScoreControlListDeserializer(item: any): _SecureScoreControlList {
  return {
    value: !item["value"]
      ? item["value"]
      : secureScoreControlDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function secureScoreControlDetailsArrayDeserializer(
  result: Array<SecureScoreControlDetails>,
): any[] {
  return result.map((item) => {
    return secureScoreControlDetailsDeserializer(item);
  });
}

/** Details of the security control, its score, and the health status of the relevant resources. */
export interface SecureScoreControlDetails extends Resource {
  /** User friendly display name of the control */
  readonly displayName?: string;
  /** Actual score object for the control */
  score?: ScoreDetails;
  /** Number of healthy resources in the control */
  readonly healthyResourceCount?: number;
  /** Number of unhealthy resources in the control */
  readonly unhealthyResourceCount?: number;
  /** Number of not applicable resources in the control */
  readonly notApplicableResourceCount?: number;
  /** The relative weight for this specific control in each of your subscriptions. Used when calculating an aggregated score for this control across all of your subscriptions. */
  readonly weight?: number;
  /** Information about the security control. */
  definition?: SecureScoreControlDefinitionItem;
}

export function secureScoreControlDetailsDeserializer(item: any): SecureScoreControlDetails {
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
export interface SecureScoreControlScoreDetails {
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
  definition?: SecureScoreControlDefinitionItem;
  /** Maximum score available */
  readonly max?: number;
  /** Current score */
  readonly current?: number;
  /** Ratio of the current score divided by the maximum. Rounded to 4 digits after the decimal point */
  readonly percentage?: number;
}

export function secureScoreControlScoreDetailsDeserializer(
  item: any,
): SecureScoreControlScoreDetails {
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
      : secureScoreControlDefinitionItemDeserializer(item["definition"]),
  };
}

/** Information about the security control. */
export interface SecureScoreControlDefinitionItem extends Resource {
  /** User friendly display name of the control */
  readonly displayName?: string;
  /** User friendly description of the control */
  readonly description?: string;
  /** Maximum control score (0..10) */
  readonly maxScore?: number;
  /** Source object from which the control was created */
  readonly source?: SecureScoreControlDefinitionSource;
  /** Array of assessments metadata IDs that are included in this security control */
  readonly assessmentDefinitions?: AzureResourceLink[];
}

export function secureScoreControlDefinitionItemDeserializer(
  item: any,
): SecureScoreControlDefinitionItem {
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
export interface SecureScoreControlDefinitionItemProperties {
  /** User friendly display name of the control */
  readonly displayName?: string;
  /** User friendly description of the control */
  readonly description?: string;
  /** Maximum control score (0..10) */
  readonly maxScore?: number;
  /** Source object from which the control was created */
  readonly source?: SecureScoreControlDefinitionSource;
  /** Array of assessments metadata IDs that are included in this security control */
  readonly assessmentDefinitions?: AzureResourceLink[];
}

export function secureScoreControlDefinitionItemPropertiesDeserializer(
  item: any,
): SecureScoreControlDefinitionItemProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    maxScore: item["maxScore"],
    source: !item["source"]
      ? item["source"]
      : secureScoreControlDefinitionSourceDeserializer(item["source"]),
    assessmentDefinitions: !item["assessmentDefinitions"]
      ? item["assessmentDefinitions"]
      : azureResourceLinkArrayDeserializer(item["assessmentDefinitions"]),
  };
}

/** The type of the security control (For example, BuiltIn) */
export interface SecureScoreControlDefinitionSource {
  /** The type of security control (for example, BuiltIn) */
  sourceType?: ControlType;
}

export function secureScoreControlDefinitionSourceDeserializer(
  item: any,
): SecureScoreControlDefinitionSource {
  return {
    sourceType: item["sourceType"],
  };
}

/** The type of security control (for example, BuiltIn) */
export enum KnownControlType {
  /** Microsoft Defender for Cloud managed assessments */
  BuiltIn = "BuiltIn",
  /** Non Microsoft Defender for Cloud managed assessments */
  Custom = "Custom",
}

/**
 * The type of security control (for example, BuiltIn) \
 * {@link KnownControlType} can be used interchangeably with ControlType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BuiltIn**: Microsoft Defender for Cloud managed assessments \
 * **Custom**: Non Microsoft Defender for Cloud managed assessments
 */
export type ControlType = string;

export function azureResourceLinkArrayDeserializer(result: Array<AzureResourceLink>): any[] {
  return result.map((item) => {
    return azureResourceLinkDeserializer(item);
  });
}

/** Describes an Azure resource with kind */
export interface AzureResourceLink {
  /** Azure resource Id */
  readonly id?: string;
}

export function azureResourceLinkDeserializer(item: any): AzureResourceLink {
  return {
    id: item["id"],
  };
}

/** List of security controls definition */
export interface _SecureScoreControlDefinitionList {
  /** Collection of security control definitions. */
  readonly value?: SecureScoreControlDefinitionItem[];
  /** The URL to get the next page of results. */
  nextLink?: string;
}

export function _secureScoreControlDefinitionListDeserializer(
  item: any,
): _SecureScoreControlDefinitionList {
  return {
    value: !item["value"]
      ? item["value"]
      : secureScoreControlDefinitionItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function secureScoreControlDefinitionItemArrayDeserializer(
  result: Array<SecureScoreControlDefinitionItem>,
): any[] {
  return result.map((item) => {
    return secureScoreControlDefinitionItemDeserializer(item);
  });
}

/** Known values of {@link ExpandControlsEnum} that the service accepts. */
export enum KnownExpandControlsEnum {
  /** Add definition object for each control */
  Definition = "definition",
}

/** Type of ExpandControlsEnum */
export type ExpandControlsEnum = string;

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
    score: !item["score"] ? item["score"] : scoreDetailsDeserializer(item["score"]),
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
      : secureScoreControlDefinitionSourceDeserializer(item["source"]),
    assessmentDefinitions: !item["assessmentDefinitions"]
      ? item["assessmentDefinitions"]
      : azureResourceLinkArrayDeserializer(item["assessmentDefinitions"]),
  };
}

export function _secureScoreControlDetailsPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    score: !item["score"] ? item["score"] : scoreDetailsDeserializer(item["score"]),
    healthyResourceCount: item["healthyResourceCount"],
    unhealthyResourceCount: item["unhealthyResourceCount"],
    notApplicableResourceCount: item["notApplicableResourceCount"],
    weight: item["weight"],
    definition: !item["definition"]
      ? item["definition"]
      : secureScoreControlDefinitionItemDeserializer(item["definition"]),
  };
}
