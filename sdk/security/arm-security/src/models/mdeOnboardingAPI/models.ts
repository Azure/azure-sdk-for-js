// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";
import { stringToUint8Array } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The resource of the configuration or data needed to onboard the machine to MDE */
export interface MdeOnboardingData extends ProxyResource {
  /** The onboarding package used to onboard Windows machines to MDE, coded in base64. This can also be used for onboarding using the dedicated VM Extension */
  onboardingPackageWindows?: Uint8Array;
  /** The onboarding package used to onboard Linux machines to MDE, coded in base64. This can also be used for onboarding using the dedicated VM Extension */
  onboardingPackageLinux?: Uint8Array;
}

export function mdeOnboardingDataDeserializer(item: any): MdeOnboardingData {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mdeOnboardingDataPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the MDE configuration or data parameter needed to onboard the machine to MDE */
export interface MdeOnboardingDataProperties {
  /** The onboarding package used to onboard Windows machines to MDE, coded in base64. This can also be used for onboarding using the dedicated VM Extension */
  onboardingPackageWindows?: Uint8Array;
  /** The onboarding package used to onboard Linux machines to MDE, coded in base64. This can also be used for onboarding using the dedicated VM Extension */
  onboardingPackageLinux?: Uint8Array;
}

export function mdeOnboardingDataPropertiesDeserializer(item: any): MdeOnboardingDataProperties {
  return {
    onboardingPackageWindows: !item["onboardingPackageWindows"]
      ? item["onboardingPackageWindows"]
      : typeof item["onboardingPackageWindows"] === "string"
        ? stringToUint8Array(item["onboardingPackageWindows"], "base64")
        : item["onboardingPackageWindows"],
    onboardingPackageLinux: !item["onboardingPackageLinux"]
      ? item["onboardingPackageLinux"]
      : typeof item["onboardingPackageLinux"] === "string"
        ? stringToUint8Array(item["onboardingPackageLinux"], "base64")
        : item["onboardingPackageLinux"],
  };
}

/** List of all MDE onboarding data resources */
export interface _MdeOnboardingDataList {
  /** List of the resources of the configuration or data needed to onboard the machine to MDE */
  value?: MdeOnboardingData[];
}

export function _mdeOnboardingDataListDeserializer(item: any): _MdeOnboardingDataList {
  return {
    value: !item["value"] ? item["value"] : mdeOnboardingDataArrayDeserializer(item["value"]),
  };
}

export function mdeOnboardingDataArrayDeserializer(result: Array<MdeOnboardingData>): any[] {
  return result.map((item) => {
    return mdeOnboardingDataDeserializer(item);
  });
}

export function _mdeOnboardingDataPropertiesDeserializer(item: any) {
  return {
    onboardingPackageWindows: !item["onboardingPackageWindows"]
      ? item["onboardingPackageWindows"]
      : typeof item["onboardingPackageWindows"] === "string"
        ? stringToUint8Array(item["onboardingPackageWindows"], "base64")
        : item["onboardingPackageWindows"],
    onboardingPackageLinux: !item["onboardingPackageLinux"]
      ? item["onboardingPackageLinux"]
      : typeof item["onboardingPackageLinux"] === "string"
        ? stringToUint8Array(item["onboardingPackageLinux"], "base64")
        : item["onboardingPackageLinux"],
  };
}
