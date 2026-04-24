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
export interface GetSensitivitySettingsResponse extends ProxyResource {
  /** The sensitivity settings properties */
  properties?: GetSensitivitySettingsResponseProperties;
}

export function getSensitivitySettingsResponseDeserializer(
  item: any,
): GetSensitivitySettingsResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : getSensitivitySettingsResponsePropertiesDeserializer(item["properties"]),
  };
}

/** The sensitivity settings properties */
export interface GetSensitivitySettingsResponseProperties {
  /** List of selected sensitive info types' IDs. */
  sensitiveInfoTypesIds?: string[];
  /** The order of the sensitivity threshold label. Any label at or above this order will be considered sensitive. If set to -1, sensitivity by labels is turned off */
  sensitivityThresholdLabelOrder?: number;
  /** The id of the sensitivity threshold label. Any label at or above this rank will be considered sensitive. */
  sensitivityThresholdLabelId?: string;
  /** Microsoft information protection built-in and custom information types, labels, and integration status. */
  mipInformation?: GetSensitivitySettingsResponsePropertiesMipInformation;
}

export function getSensitivitySettingsResponsePropertiesDeserializer(
  item: any,
): GetSensitivitySettingsResponseProperties {
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
      : getSensitivitySettingsResponsePropertiesMipInformationDeserializer(item["mipInformation"]),
  };
}

/** Microsoft information protection built-in and custom information types, labels, and integration status. */
export interface GetSensitivitySettingsResponsePropertiesMipInformation {
  /** Microsoft information protection integration status */
  mipIntegrationStatus?: MipIntegrationStatus;
  /** List of Microsoft information protection sensitivity labels */
  labels?: Label[];
  /** List of custom user-defined information types */
  customInfoTypes?: InfoType[];
  /** List of pre-configured sensitive information types */
  builtInInfoTypes?: BuiltInInfoType[];
}

export function getSensitivitySettingsResponsePropertiesMipInformationDeserializer(
  item: any,
): GetSensitivitySettingsResponsePropertiesMipInformation {
  return {
    mipIntegrationStatus: item["mipIntegrationStatus"],
    labels: !item["labels"] ? item["labels"] : labelArrayDeserializer(item["labels"]),
    customInfoTypes: !item["customInfoTypes"]
      ? item["customInfoTypes"]
      : infoTypeArrayDeserializer(item["customInfoTypes"]),
    builtInInfoTypes: !item["builtInInfoTypes"]
      ? item["builtInInfoTypes"]
      : builtInInfoTypeArrayDeserializer(item["builtInInfoTypes"]),
  };
}

/** Microsoft information protection integration status */
export enum KnownMipIntegrationStatus {
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
 * {@link KnownMipIntegrationStatus} can be used interchangeably with MipIntegrationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ok**: Ok \
 * **noConsent**: noConsent \
 * **noAutoLabelingRules**: noAutoLabelingRules \
 * **noMipLabels**: noMipLabels
 */
export type MipIntegrationStatus = string;

export function labelArrayDeserializer(result: Array<Label>): any[] {
  return result.map((item) => {
    return labelDeserializer(item);
  });
}

/** Microsoft information protection sensitivity label */
export interface Label {
  /** The display name of the label */
  name?: string;
  /** The ID of the label */
  id?: string;
  /** Labels are ordered by sensitivity level. The higher the order of the label, the more sensitive it is. */
  order?: number;
}

export function labelDeserializer(item: any): Label {
  return {
    name: item["name"],
    id: item["id"],
    order: item["order"],
  };
}

export function infoTypeArrayDeserializer(result: Array<InfoType>): any[] {
  return result.map((item) => {
    return infoTypeDeserializer(item);
  });
}

/** Custom user-defined information type */
export interface InfoType {
  /** Display name of the info type */
  name?: string;
  /** Id of the info type */
  id?: string;
  /** Description of the info type */
  description?: string;
}

export function infoTypeDeserializer(item: any): InfoType {
  return {
    name: item["name"],
    id: item["id"],
    description: item["description"],
  };
}

export function builtInInfoTypeArrayDeserializer(result: Array<BuiltInInfoType>): any[] {
  return result.map((item) => {
    return builtInInfoTypeDeserializer(item);
  });
}

/** Pre-configured sensitive information type */
export interface BuiltInInfoType {
  /** Display name of the info type */
  name?: string;
  /** Id of the info type */
  id?: string;
  /** Category of the built-in info type */
  type?: string;
}

export function builtInInfoTypeDeserializer(item: any): BuiltInInfoType {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
  };
}

/** Request to update data sensitivity settings for sensitive data discovery */
export interface UpdateSensitivitySettingsRequest {
  /** List of selected sensitive info types' IDs. */
  sensitiveInfoTypesIds: string[];
  /** The order of the sensitivity threshold label. Any label at or above this order will be considered sensitive. If set to -1, sensitivity by labels is turned off */
  sensitivityThresholdLabelOrder?: number;
  /** The id of the sensitivity threshold label. Any label at or above this rank will be considered sensitive. */
  sensitivityThresholdLabelId?: string;
}

export function updateSensitivitySettingsRequestSerializer(
  item: UpdateSensitivitySettingsRequest,
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
export interface _GetSensitivitySettingsListResponse {
  value?: GetSensitivitySettingsResponse[];
}

export function _getSensitivitySettingsListResponseDeserializer(
  item: any,
): _GetSensitivitySettingsListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : getSensitivitySettingsResponseArrayDeserializer(item["value"]),
  };
}

export function getSensitivitySettingsResponseArrayDeserializer(
  result: Array<GetSensitivitySettingsResponse>,
): any[] {
  return result.map((item) => {
    return getSensitivitySettingsResponseDeserializer(item);
  });
}
