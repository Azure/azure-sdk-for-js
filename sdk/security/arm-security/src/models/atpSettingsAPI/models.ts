// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import { systemDataDeserializer, ExtensionResource } from "../models.js";

/** The Advanced Threat Protection resource. */
export interface AdvancedThreatProtectionSetting extends ExtensionResource {
  /** Indicates whether Advanced Threat Protection is enabled. */
  isEnabled?: boolean;
}

export function advancedThreatProtectionSettingSerializer(
  item: AdvancedThreatProtectionSetting,
): any {
  return {
    properties: areAllPropsUndefined(item, ["isEnabled"])
      ? undefined
      : _advancedThreatProtectionSettingCreateOrUpdatePropertiesSerializer(item),
  };
}

export function advancedThreatProtectionSettingDeserializer(
  item: any,
): AdvancedThreatProtectionSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _advancedThreatProtectionSettingCreateOrUpdatePropertiesDeserializer(item["properties"])),
  };
}

/** The Advanced Threat Protection settings. */
export interface AdvancedThreatProtectionProperties {
  /** Indicates whether Advanced Threat Protection is enabled. */
  isEnabled?: boolean;
}

export function advancedThreatProtectionPropertiesSerializer(
  item: AdvancedThreatProtectionProperties,
): any {
  return { isEnabled: item["isEnabled"] };
}

export function advancedThreatProtectionPropertiesDeserializer(
  item: any,
): AdvancedThreatProtectionProperties {
  return {
    isEnabled: item["isEnabled"],
  };
}

/** The Advanced Threat Protection resource. */
export interface AdvancedThreatProtectionSettingCreateOrUpdate extends ExtensionResource {
  /** Indicates whether Advanced Threat Protection is enabled. */
  isEnabled?: boolean;
}

export function advancedThreatProtectionSettingCreateOrUpdateSerializer(
  item: AdvancedThreatProtectionSettingCreateOrUpdate,
): any {
  return {
    properties: areAllPropsUndefined(item, ["isEnabled"])
      ? undefined
      : _advancedThreatProtectionSettingCreateOrUpdatePropertiesSerializer(item),
  };
}

export function advancedThreatProtectionSettingCreateOrUpdateDeserializer(
  item: any,
): AdvancedThreatProtectionSettingCreateOrUpdate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _advancedThreatProtectionSettingCreateOrUpdatePropertiesDeserializer(item["properties"])),
  };
}

export function _advancedThreatProtectionSettingCreateOrUpdatePropertiesSerializer(
  item: AdvancedThreatProtectionSettingCreateOrUpdate,
): any {
  return { isEnabled: item["isEnabled"] };
}

export function _advancedThreatProtectionSettingCreateOrUpdatePropertiesDeserializer(item: any) {
  return {
    isEnabled: item["isEnabled"],
  };
}
