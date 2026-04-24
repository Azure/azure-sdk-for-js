// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The Advanced Threat Protection resource. */
export interface ATPSettingsAPIAdvancedThreatProtectionSetting extends ExtensionResource {
  /** Indicates whether Advanced Threat Protection is enabled. */
  isEnabled?: boolean;
}

export function atpSettingsAPIAdvancedThreatProtectionSettingSerializer(
  item: ATPSettingsAPIAdvancedThreatProtectionSetting,
): any {
  return {
    properties: areAllPropsUndefined(item, ["isEnabled"])
      ? undefined
      : _advancedThreatProtectionSettingPropertiesSerializer(item),
  };
}

export function atpSettingsAPIAdvancedThreatProtectionSettingDeserializer(
  item: any,
): ATPSettingsAPIAdvancedThreatProtectionSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _advancedThreatProtectionSettingPropertiesDeserializer(item["properties"])),
  };
}

/** The Advanced Threat Protection settings. */
export interface ATPSettingsAPIAdvancedThreatProtectionProperties {
  /** Indicates whether Advanced Threat Protection is enabled. */
  isEnabled?: boolean;
}

export function atpSettingsAPIAdvancedThreatProtectionPropertiesSerializer(
  item: ATPSettingsAPIAdvancedThreatProtectionProperties,
): any {
  return { isEnabled: item["isEnabled"] };
}

export function atpSettingsAPIAdvancedThreatProtectionPropertiesDeserializer(
  item: any,
): ATPSettingsAPIAdvancedThreatProtectionProperties {
  return {
    isEnabled: item["isEnabled"],
  };
}

export function _advancedThreatProtectionSettingPropertiesSerializer(
  item: ATPSettingsAPIAdvancedThreatProtectionSetting,
): any {
  return { isEnabled: item["isEnabled"] };
}

export function _advancedThreatProtectionSettingPropertiesDeserializer(item: any) {
  return {
    isEnabled: item["isEnabled"],
  };
}
