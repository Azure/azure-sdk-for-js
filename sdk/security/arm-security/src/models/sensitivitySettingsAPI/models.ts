// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Data sensitivity settings for sensitive data discovery */
export interface SensitivitySettingsAPIGetSensitivitySettingsResponse extends ProxyResource {
  /** The sensitivity settings properties */
  properties?: SensitivitySettingsAPIGetSensitivitySettingsResponseProperties;
}

export function sensitivitySettingsAPIGetSensitivitySettingsResponseDeserializer(
  item: any,
): SensitivitySettingsAPIGetSensitivitySettingsResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sensitivitySettingsAPIGetSensitivitySettingsResponsePropertiesDeserializer(
          item["properties"],
        ),
  };
}

/** The sensitivity settings properties */
export interface SensitivitySettingsAPIGetSensitivitySettingsResponseProperties {
  /** List of selected sensitive info types' IDs. */
  sensitiveInfoTypesIds?: string[];
  /** The order of the sensitivity threshold label. Any label at or above this order will be considered sensitive. If set to -1, sensitivity by labels is turned off */
  sensitivityThresholdLabelOrder?: number;
  /** The id of the sensitivity threshold label. Any label at or above this rank will be considered sensitive. */
  sensitivityThresholdLabelId?: string;
  /** Microsoft information protection built-in and custom information types, labels, and integration status. */
  mipInformation?: SensitivitySettingsAPIGetSensitivitySettingsResponsePropertiesMipInformation;
}

export function sensitivitySettingsAPIGetSensitivitySettingsResponsePropertiesDeserializer(
  item: any,
): SensitivitySettingsAPIGetSensitivitySettingsResponseProperties {
  return {
    sensitiveInfoTypesIds: !item["sensitiveInfoTypesIds"]
      ? item["sensitiveInfoTypesIds"]
      : item["sensitiveInfoTypesIds"].map((p: any) => {
          return p;
        }),
    sensitivityThresholdLabelOrder: item["sensitivityThresholdLabelOrder"],
    sensitivityThresholdLabelId: item["sensitivityThresholdLabelId"],
    mipInformation: !item["mipInformation"]
      ? item["mipInformation"]
      : sensitivitySettingsAPIGetSensitivitySettingsResponsePropertiesMipInformationDeserializer(
          item["mipInformation"],
        ),
  };
}

/** Microsoft information protection built-in and custom information types, labels, and integration status. */
export interface SensitivitySettingsAPIGetSensitivitySettingsResponsePropertiesMipInformation {
  /** Microsoft information protection integration status */
  mipIntegrationStatus?: SensitivitySettingsAPIMipIntegrationStatus;
  /** List of Microsoft information protection sensitivity labels */
  labels?: SensitivitySettingsAPILabel[];
  /** List of custom user-defined information types */
  customInfoTypes?: SensitivitySettingsAPIInfoType[];
  /** List of pre-configured sensitive information types */
  builtInInfoTypes?: SensitivitySettingsAPIBuiltInInfoType[];
}

export function sensitivitySettingsAPIGetSensitivitySettingsResponsePropertiesMipInformationDeserializer(
  item: any,
): SensitivitySettingsAPIGetSensitivitySettingsResponsePropertiesMipInformation {
  return {
    mipIntegrationStatus: item["mipIntegrationStatus"],
    labels: !item["labels"]
      ? item["labels"]
      : sensitivitySettingsAPILabelArrayDeserializer(item["labels"]),
    customInfoTypes: !item["customInfoTypes"]
      ? item["customInfoTypes"]
      : sensitivitySettingsAPIInfoTypeArrayDeserializer(item["customInfoTypes"]),
    builtInInfoTypes: !item["builtInInfoTypes"]
      ? item["builtInInfoTypes"]
      : sensitivitySettingsAPIBuiltInInfoTypeArrayDeserializer(item["builtInInfoTypes"]),
  };
}

/** Microsoft information protection integration status */
export enum KnownSensitivitySettingsAPIMipIntegrationStatus {
  /** Ok */
  Ok = "Ok",
  /** noConsent */
  NoConsent = "noConsent",
  /** noAutoLabelingRules */
  NoAutoLabelingRules = "noAutoLabelingRules",
  /** noMipLabels */
  NoMipLabels = "noMipLabels",
}

/**
 * Microsoft information protection integration status \
 * {@link KnownSensitivitySettingsAPIMipIntegrationStatus} can be used interchangeably with SensitivitySettingsAPIMipIntegrationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ok**: Ok \
 * **noConsent**: noConsent \
 * **noAutoLabelingRules**: noAutoLabelingRules \
 * **noMipLabels**: noMipLabels
 */
export type SensitivitySettingsAPIMipIntegrationStatus = string;

export function sensitivitySettingsAPILabelArrayDeserializer(
  result: Array<SensitivitySettingsAPILabel>,
): any[] {
  return result.map((item) => {
    return sensitivitySettingsAPILabelDeserializer(item);
  });
}

/** Microsoft information protection sensitivity label */
export interface SensitivitySettingsAPILabel {
  /** The display name of the label */
  name?: string;
  /** The ID of the label */
  id?: string;
  /** Labels are ordered by sensitivity level. The higher the order of the label, the more sensitive it is. */
  order?: number;
}

export function sensitivitySettingsAPILabelDeserializer(item: any): SensitivitySettingsAPILabel {
  return {
    name: item["name"],
    id: item["id"],
    order: item["order"],
  };
}

export function sensitivitySettingsAPIInfoTypeArrayDeserializer(
  result: Array<SensitivitySettingsAPIInfoType>,
): any[] {
  return result.map((item) => {
    return sensitivitySettingsAPIInfoTypeDeserializer(item);
  });
}

/** Custom user-defined information type */
export interface SensitivitySettingsAPIInfoType {
  /** Display name of the info type */
  name?: string;
  /** Id of the info type */
  id?: string;
  /** Description of the info type */
  description?: string;
}

export function sensitivitySettingsAPIInfoTypeDeserializer(
  item: any,
): SensitivitySettingsAPIInfoType {
  return {
    name: item["name"],
    id: item["id"],
    description: item["description"],
  };
}

export function sensitivitySettingsAPIBuiltInInfoTypeArrayDeserializer(
  result: Array<SensitivitySettingsAPIBuiltInInfoType>,
): any[] {
  return result.map((item) => {
    return sensitivitySettingsAPIBuiltInInfoTypeDeserializer(item);
  });
}

/** Pre-configured sensitive information type */
export interface SensitivitySettingsAPIBuiltInInfoType {
  /** Display name of the info type */
  name?: string;
  /** Id of the info type */
  id?: string;
  /** Category of the built-in info type */
  type?: string;
}

export function sensitivitySettingsAPIBuiltInInfoTypeDeserializer(
  item: any,
): SensitivitySettingsAPIBuiltInInfoType {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
  };
}

/** Request to update data sensitivity settings for sensitive data discovery */
export interface SensitivitySettingsAPIUpdateSensitivitySettingsRequest {
  /** List of selected sensitive info types' IDs. */
  sensitiveInfoTypesIds: string[];
  /** The order of the sensitivity threshold label. Any label at or above this order will be considered sensitive. If set to -1, sensitivity by labels is turned off */
  sensitivityThresholdLabelOrder?: number;
  /** The id of the sensitivity threshold label. Any label at or above this rank will be considered sensitive. */
  sensitivityThresholdLabelId?: string;
}

export function sensitivitySettingsAPIUpdateSensitivitySettingsRequestSerializer(
  item: SensitivitySettingsAPIUpdateSensitivitySettingsRequest,
): any {
  return {
    sensitiveInfoTypesIds: item["sensitiveInfoTypesIds"].map((p: any) => {
      return p;
    }),
    sensitivityThresholdLabelOrder: item["sensitivityThresholdLabelOrder"],
    sensitivityThresholdLabelId: item["sensitivityThresholdLabelId"],
  };
}

/** A list with a single sensitivity settings resource */
export interface _SensitivitySettingsAPIGetSensitivitySettingsListResponse {
  value?: SensitivitySettingsAPIGetSensitivitySettingsResponse[];
}

export function _sensitivitySettingsAPIGetSensitivitySettingsListResponseDeserializer(
  item: any,
): _SensitivitySettingsAPIGetSensitivitySettingsListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : sensitivitySettingsAPIGetSensitivitySettingsResponseArrayDeserializer(item["value"]),
  };
}

export function sensitivitySettingsAPIGetSensitivitySettingsResponseArrayDeserializer(
  result: Array<SensitivitySettingsAPIGetSensitivitySettingsResponse>,
): any[] {
  return result.map((item) => {
    return sensitivitySettingsAPIGetSensitivitySettingsResponseDeserializer(item);
  });
}
