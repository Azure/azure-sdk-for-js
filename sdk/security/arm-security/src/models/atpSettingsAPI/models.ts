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
      : _advancedThreatProtectionSettingPropertiesSerializer(item),
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
      : _advancedThreatProtectionSettingPropertiesDeserializer(item["properties"])),
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

export function _advancedThreatProtectionSettingPropertiesSerializer(
  item: AdvancedThreatProtectionSetting,
): any {
  return { isEnabled: item["isEnabled"] };
}

export function _advancedThreatProtectionSettingPropertiesDeserializer(item: any) {
  return {
    isEnabled: item["isEnabled"],
  };
}
