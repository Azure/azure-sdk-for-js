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
export interface Setting extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: Record<string, any>;
  /** the kind of the settings string */
  /** The discriminator possible values: DataExportSettings, AlertSyncSettings */
  kind: SettingKind;
}

export function settingSerializer(item: Setting): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : _settingPropertiesSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function settingDeserializer(item: any): Setting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : _settingPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
  };
}

/** Alias for SettingUnion */
export type SettingUnion = DataExportSettings | AlertSyncSettings | Setting;

export function settingUnionSerializer(item: SettingUnion): any {
  switch (item.kind) {
    case "DataExportSettings":
      return dataExportSettingsSerializer(item as DataExportSettings);

    case "AlertSyncSettings":
      return alertSyncSettingsSerializer(item as AlertSyncSettings);

    default:
      return settingSerializer(item);
  }
}

export function settingUnionDeserializer(item: any): SettingUnion {
  switch (item["kind"]) {
    case "DataExportSettings":
      return dataExportSettingsDeserializer(item as DataExportSettings);

    case "AlertSyncSettings":
      return alertSyncSettingsDeserializer(item as AlertSyncSettings);

    default:
      return settingDeserializer(item);
  }
}

/** model interface _SettingProperties */
export interface _SettingProperties {}

export function _settingPropertiesSerializer(_item: _SettingProperties): any {
  return {};
}

export function _settingPropertiesDeserializer(item: any): _SettingProperties {
  return item;
}

/** the kind of the settings string */
export enum KnownSettingKind {
  /** DataExportSettings */
  DataExportSettings = "DataExportSettings",
  /** AlertSuppressionSetting */
  AlertSuppressionSetting = "AlertSuppressionSetting",
  /** AlertSyncSettings */
  AlertSyncSettings = "AlertSyncSettings",
}

/**
 * the kind of the settings string \
 * {@link KnownSettingKind} can be used interchangeably with SettingKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DataExportSettings**: DataExportSettings \
 * **AlertSuppressionSetting**: AlertSuppressionSetting \
 * **AlertSyncSettings**: AlertSyncSettings
 */
export type SettingKind = string;

/** Represents a data export setting */
export interface DataExportSettings extends Setting {
  /** the kind of the settings string */
  kind: "DataExportSettings";
  /** Is the data export setting enabled */
  enabled?: boolean;
}

export function dataExportSettingsSerializer(item: DataExportSettings): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _dataExportSettingsPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function dataExportSettingsDeserializer(item: any): DataExportSettings {
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
export interface DataExportSettingProperties {
  /** Is the data export setting enabled */
  enabled: boolean;
}

export function dataExportSettingPropertiesSerializer(item: DataExportSettingProperties): any {
  return { enabled: item["enabled"] };
}

export function dataExportSettingPropertiesDeserializer(item: any): DataExportSettingProperties {
  return {
    enabled: item["enabled"],
  };
}

/** Represents an alert sync setting */
export interface AlertSyncSettings extends Setting {
  /** the kind of the settings string */
  kind: "AlertSyncSettings";
  /** Is the alert sync setting enabled */
  enabled?: boolean;
}

export function alertSyncSettingsSerializer(item: AlertSyncSettings): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _alertSyncSettingsPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function alertSyncSettingsDeserializer(item: any): AlertSyncSettings {
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
export interface AlertSyncSettingProperties {
  /** Is the alert sync setting enabled */
  enabled: boolean;
}

export function alertSyncSettingPropertiesSerializer(item: AlertSyncSettingProperties): any {
  return { enabled: item["enabled"] };
}

export function alertSyncSettingPropertiesDeserializer(item: any): AlertSyncSettingProperties {
  return {
    enabled: item["enabled"],
  };
}

/** Subscription settings list. */
export interface _SettingsList {
  /** The settings list. */
  value?: SettingUnion[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _settingsListDeserializer(item: any): _SettingsList {
  return {
    value: !item["value"] ? item["value"] : settingUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function settingUnionArraySerializer(result: Array<SettingUnion>): any[] {
  return result.map((item) => {
    return settingUnionSerializer(item);
  });
}

export function settingUnionArrayDeserializer(result: Array<SettingUnion>): any[] {
  return result.map((item) => {
    return settingUnionDeserializer(item);
  });
}

export function _dataExportSettingsPropertiesSerializer(item: DataExportSettings): any {
  return { enabled: item["enabled"] };
}

export function _dataExportSettingsPropertiesDeserializer(item: any) {
  return {
    enabled: item["enabled"],
  };
}

export function _alertSyncSettingsPropertiesSerializer(item: AlertSyncSettings): any {
  return { enabled: item["enabled"] };
}

export function _alertSyncSettingsPropertiesDeserializer(item: any) {
  return {
    enabled: item["enabled"],
  };
}
