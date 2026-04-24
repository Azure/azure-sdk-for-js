// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The kind of the security setting */
export interface SettingsAPISetting extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: Record<string, any>;
  /** the kind of the settings string */
  /** The discriminator possible values: DataExportSettings, AlertSyncSettings */
  kind: SettingsAPISettingKind;
}

export function settingsAPISettingSerializer(item: SettingsAPISetting): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : _settingsAPISettingPropertiesSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function settingsAPISettingDeserializer(item: any): SettingsAPISetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : _settingsAPISettingPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
  };
}

/** Alias for SettingsAPISettingUnion */
export type SettingsAPISettingUnion =
  | SettingsAPIDataExportSettings
  | SettingsAPIAlertSyncSettings
  | SettingsAPISetting;

export function settingsAPISettingUnionSerializer(item: SettingsAPISettingUnion): any {
  switch (item.kind) {
    case "DataExportSettings":
      return settingsAPIDataExportSettingsSerializer(item as SettingsAPIDataExportSettings);

    case "AlertSyncSettings":
      return settingsAPIAlertSyncSettingsSerializer(item as SettingsAPIAlertSyncSettings);

    default:
      return settingsAPISettingSerializer(item);
  }
}

export function settingsAPISettingUnionDeserializer(item: any): SettingsAPISettingUnion {
  switch (item["kind"]) {
    case "DataExportSettings":
      return settingsAPIDataExportSettingsDeserializer(item as SettingsAPIDataExportSettings);

    case "AlertSyncSettings":
      return settingsAPIAlertSyncSettingsDeserializer(item as SettingsAPIAlertSyncSettings);

    default:
      return settingsAPISettingDeserializer(item);
  }
}

/** model interface _SettingsAPISettingProperties */
export interface _SettingsAPISettingProperties {}

export function _settingsAPISettingPropertiesSerializer(_item: _SettingsAPISettingProperties): any {
  return {};
}

export function _settingsAPISettingPropertiesDeserializer(
  item: any,
): _SettingsAPISettingProperties {
  return item;
}

/** the kind of the settings string */
export enum KnownSettingsAPISettingKind {
  /** DataExportSettings */
  DataExportSettings = "DataExportSettings",
  /** AlertSuppressionSetting */
  AlertSuppressionSetting = "AlertSuppressionSetting",
  /** AlertSyncSettings */
  AlertSyncSettings = "AlertSyncSettings",
}

/**
 * the kind of the settings string \
 * {@link KnownSettingsAPISettingKind} can be used interchangeably with SettingsAPISettingKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DataExportSettings**: DataExportSettings \
 * **AlertSuppressionSetting**: AlertSuppressionSetting \
 * **AlertSyncSettings**: AlertSyncSettings
 */
export type SettingsAPISettingKind = string;

/** Represents a data export setting */
export interface SettingsAPIDataExportSettings extends SettingsAPISetting {
  /** the kind of the settings string */
  kind: "DataExportSettings";
  /** Is the data export setting enabled */
  enabled?: boolean;
}

export function settingsAPIDataExportSettingsSerializer(item: SettingsAPIDataExportSettings): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _dataExportSettingsPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function settingsAPIDataExportSettingsDeserializer(
  item: any,
): SettingsAPIDataExportSettings {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _dataExportSettingsPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The data export setting properties */
export interface SettingsAPIDataExportSettingProperties {
  /** Is the data export setting enabled */
  enabled: boolean;
}

export function settingsAPIDataExportSettingPropertiesSerializer(
  item: SettingsAPIDataExportSettingProperties,
): any {
  return { enabled: item["enabled"] };
}

export function settingsAPIDataExportSettingPropertiesDeserializer(
  item: any,
): SettingsAPIDataExportSettingProperties {
  return {
    enabled: item["enabled"],
  };
}

/** Represents an alert sync setting */
export interface SettingsAPIAlertSyncSettings extends SettingsAPISetting {
  /** the kind of the settings string */
  kind: "AlertSyncSettings";
  /** Is the alert sync setting enabled */
  enabled?: boolean;
}

export function settingsAPIAlertSyncSettingsSerializer(item: SettingsAPIAlertSyncSettings): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _alertSyncSettingsPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function settingsAPIAlertSyncSettingsDeserializer(item: any): SettingsAPIAlertSyncSettings {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _alertSyncSettingsPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The alert sync setting properties */
export interface SettingsAPIAlertSyncSettingProperties {
  /** Is the alert sync setting enabled */
  enabled: boolean;
}

export function settingsAPIAlertSyncSettingPropertiesSerializer(
  item: SettingsAPIAlertSyncSettingProperties,
): any {
  return { enabled: item["enabled"] };
}

export function settingsAPIAlertSyncSettingPropertiesDeserializer(
  item: any,
): SettingsAPIAlertSyncSettingProperties {
  return {
    enabled: item["enabled"],
  };
}

/** Subscription settings list. */
export interface _SettingsAPISettingsList {
  /** The settings list. */
  value?: SettingsAPISettingUnion[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _settingsAPISettingsListDeserializer(item: any): _SettingsAPISettingsList {
  return {
    value: !item["value"] ? item["value"] : settingsAPISettingUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function settingsAPISettingUnionArraySerializer(
  result: Array<SettingsAPISettingUnion>,
): any[] {
  return result.map((item) => {
    return settingsAPISettingUnionSerializer(item);
  });
}

export function settingsAPISettingUnionArrayDeserializer(
  result: Array<SettingsAPISettingUnion>,
): any[] {
  return result.map((item) => {
    return settingsAPISettingUnionDeserializer(item);
  });
}

export function _dataExportSettingsPropertiesSerializer(item: SettingsAPIDataExportSettings): any {
  return { enabled: item["enabled"] };
}

export function _dataExportSettingsPropertiesDeserializer(item: any) {
  return {
    enabled: item["enabled"],
  };
}

export function _alertSyncSettingsPropertiesSerializer(item: SettingsAPIAlertSyncSettings): any {
  return { enabled: item["enabled"] };
}

export function _alertSyncSettingsPropertiesDeserializer(item: any) {
  return {
    enabled: item["enabled"],
  };
}
