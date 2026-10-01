// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import { systemDataDeserializer, ProxyResource } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An Application Insights component linked storage accounts */
export interface ComponentLinkedStorageAccounts extends ProxyResource {
  /** Linked storage account resource ID */
  linkedStorageAccount?: string;
}

export function componentLinkedStorageAccountsSerializer(
  item: ComponentLinkedStorageAccounts,
): any {
  return {
    properties: areAllPropsUndefined(item, ["linkedStorageAccount"])
      ? undefined
      : _componentLinkedStorageAccountsPropertiesSerializer(item),
  };
}

export function componentLinkedStorageAccountsDeserializer(
  item: any,
): ComponentLinkedStorageAccounts {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _componentLinkedStorageAccountsPropertiesDeserializer(item["properties"])),
  };
}

/** An Application Insights component linked storage account */
export interface LinkedStorageAccountsProperties {
  /** Linked storage account resource ID */
  linkedStorageAccount?: string;
}

export function linkedStorageAccountsPropertiesSerializer(
  item: LinkedStorageAccountsProperties,
): any {
  return { linkedStorageAccount: item["linkedStorageAccount"] };
}

export function linkedStorageAccountsPropertiesDeserializer(
  item: any,
): LinkedStorageAccountsProperties {
  return {
    linkedStorageAccount: item["linkedStorageAccount"],
  };
}

/** Known values of {@link StorageType} that the service accepts. */
export enum KnownStorageType {
  /** ServiceProfiler */
  ServiceProfiler = "ServiceProfiler",
}

/** Type of StorageType */
export type StorageType = string;

/** An Application Insights component linked storage accounts patch */
export interface ComponentLinkedStorageAccountsPatch {
  /** Linked storage account resource ID */
  linkedStorageAccount?: string;
}

export function componentLinkedStorageAccountsPatchSerializer(
  item: ComponentLinkedStorageAccountsPatch,
): any {
  return {
    properties: areAllPropsUndefined(item, ["linkedStorageAccount"])
      ? undefined
      : _componentLinkedStorageAccountsPatchPropertiesSerializer(item),
  };
}

export function _componentLinkedStorageAccountsPropertiesSerializer(
  item: ComponentLinkedStorageAccounts,
): any {
  return { linkedStorageAccount: item["linkedStorageAccount"] };
}

export function _componentLinkedStorageAccountsPropertiesDeserializer(item: any) {
  return {
    linkedStorageAccount: item["linkedStorageAccount"],
  };
}

export function _componentLinkedStorageAccountsPatchPropertiesSerializer(
  item: ComponentLinkedStorageAccountsPatch,
): any {
  return { linkedStorageAccount: item["linkedStorageAccount"] };
}

export function _componentLinkedStorageAccountsPatchPropertiesDeserializer(item: any) {
  return {
    linkedStorageAccount: item["linkedStorageAccount"],
  };
}
