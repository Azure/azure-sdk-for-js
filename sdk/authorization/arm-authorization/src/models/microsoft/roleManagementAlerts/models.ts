// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ExtensionResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The alert. */
export interface Alert extends ExtensionResource {
  /** The alert scope. */
  readonly scope?: string;
  /** False by default; true if the alert is active. */
  isActive?: boolean;
  /** The number of generated incidents of the alert. */
  readonly incidentCount?: number;
  /** The date time when the alert configuration was updated or new incidents were generated. */
  readonly lastModifiedDateTime?: Date;
  /** The date time when the alert was last scanned. */
  readonly lastScannedDateTime?: Date;
  /** The alert definition. */
  readonly alertDefinition?: AlertDefinition;
  /** The alert incidents. */
  readonly alertIncidents?: AlertIncident[];
  /** The alert configuration. */
  readonly alertConfiguration?: AlertConfiguration;
}

export function alertSerializer(item: Alert): any {
  return {
    properties: areAllPropsUndefined(item, ["isActive"])
      ? undefined
      : _alertPropertiesSerializer(item),
  };
}

export function alertDeserializer(item: any): Alert {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _alertPropertiesDeserializer(item["properties"])),
  };
}

/** Alert properties. */
export interface AlertProperties {
  /** The alert scope. */
  readonly scope?: string;
  /** False by default; true if the alert is active. */
  isActive?: boolean;
  /** The number of generated incidents of the alert. */
  readonly incidentCount?: number;
  /** The date time when the alert configuration was updated or new incidents were generated. */
  readonly lastModifiedDateTime?: Date;
  /** The date time when the alert was last scanned. */
  readonly lastScannedDateTime?: Date;
  /** The alert definition. */
  readonly alertDefinition?: AlertDefinition;
  /** The alert incidents. */
  readonly alertIncidents?: AlertIncident[];
  /** The alert configuration. */
  readonly alertConfiguration?: AlertConfiguration;
}

export function alertPropertiesSerializer(item: AlertProperties): any {
  return { isActive: item["isActive"] };
}

export function alertPropertiesDeserializer(item: any): AlertProperties {
  return {
    scope: item["scope"],
    isActive: item["isActive"],
    incidentCount: item["incidentCount"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastScannedDateTime: !item["lastScannedDateTime"]
      ? item["lastScannedDateTime"]
      : new Date(item["lastScannedDateTime"]),
    alertDefinition: !item["alertDefinition"]
      ? item["alertDefinition"]
      : alertDefinitionDeserializer(item["alertDefinition"]),
    alertIncidents: !item["alertIncidents"]
      ? item["alertIncidents"]
      : alertIncidentArrayDeserializer(item["alertIncidents"]),
    alertConfiguration: !item["alertConfiguration"]
      ? item["alertConfiguration"]
      : alertConfigurationDeserializer(item["alertConfiguration"]),
  };
}

/** Alert definition */
export interface AlertDefinition extends ExtensionResource {
  /** The alert display name. */
  readonly displayName?: string;
  /** The alert scope. */
  readonly scope?: string;
  /** The alert description. */
  readonly description?: string;
  /** Severity level of the alert. */
  readonly severityLevel?: SeverityLevel;
  /** Security impact of the alert. */
  readonly securityImpact?: string;
  /** The methods to mitigate the alert. */
  readonly mitigationSteps?: string;
  /** The ways to prevent the alert. */
  readonly howToPrevent?: string;
  /** True if the alert can be remediated; false, otherwise. */
  readonly isRemediatable?: boolean;
  /** True if the alert configuration can be configured; false, otherwise. */
  readonly isConfigurable?: boolean;
}

export function alertDefinitionDeserializer(item: any): AlertDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _alertDefinitionPropertiesDeserializer(item["properties"])),
  };
}

/** Alert definition properties. */
export interface AlertDefinitionProperties {
  /** The alert display name. */
  readonly displayName?: string;
  /** The alert scope. */
  readonly scope?: string;
  /** The alert description. */
  readonly description?: string;
  /** Severity level of the alert. */
  readonly severityLevel?: SeverityLevel;
  /** Security impact of the alert. */
  readonly securityImpact?: string;
  /** The methods to mitigate the alert. */
  readonly mitigationSteps?: string;
  /** The ways to prevent the alert. */
  readonly howToPrevent?: string;
  /** True if the alert can be remediated; false, otherwise. */
  readonly isRemediatable?: boolean;
  /** True if the alert configuration can be configured; false, otherwise. */
  readonly isConfigurable?: boolean;
}

export function alertDefinitionPropertiesDeserializer(item: any): AlertDefinitionProperties {
  return {
    displayName: item["displayName"],
    scope: item["scope"],
    description: item["description"],
    severityLevel: item["severityLevel"],
    securityImpact: item["securityImpact"],
    mitigationSteps: item["mitigationSteps"],
    howToPrevent: item["howToPrevent"],
    isRemediatable: item["isRemediatable"],
    isConfigurable: item["isConfigurable"],
  };
}

/** Severity level of the alert. */
export enum KnownSeverityLevel {
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * Severity level of the alert. \
 * {@link KnownSeverityLevel} can be used interchangeably with SeverityLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type SeverityLevel = string;

export function alertIncidentArrayDeserializer(result: Array<AlertIncident>): any[] {
  return result.map((item) => {
    return alertIncidentDeserializer(item);
  });
}

/** Alert incident */
export interface AlertIncident extends ExtensionResource {
  /** Alert incident properties. */
  properties?: AlertIncidentPropertiesUnion;
}

export function alertIncidentDeserializer(item: any): AlertIncident {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : alertIncidentPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Alert incident properties */
export interface AlertIncidentProperties {
  /** The alert incident type. */
  /** The discriminator possible values: AzureRolesAssignedOutsidePimAlertIncident, DuplicateRoleCreatedAlertIncident, TooManyOwnersAssignedToResourceAlertIncident, TooManyPermanentOwnersAssignedToResourceAlertIncident */
  alertIncidentType: string;
}

export function alertIncidentPropertiesDeserializer(item: any): AlertIncidentProperties {
  return {
    alertIncidentType: item["alertIncidentType"],
  };
}

/** Alias for AlertIncidentPropertiesUnion */
export type AlertIncidentPropertiesUnion =
  | AzureRolesAssignedOutsidePimAlertIncidentProperties
  | DuplicateRoleCreatedAlertIncidentProperties
  | TooManyOwnersAssignedToResourceAlertIncidentProperties
  | TooManyPermanentOwnersAssignedToResourceAlertIncidentProperties
  | AlertIncidentProperties;

export function alertIncidentPropertiesUnionDeserializer(item: any): AlertIncidentPropertiesUnion {
  switch (item["alertIncidentType"]) {
    case "AzureRolesAssignedOutsidePimAlertIncident":
      return azureRolesAssignedOutsidePimAlertIncidentPropertiesDeserializer(
        item as AzureRolesAssignedOutsidePimAlertIncidentProperties,
      );

    case "DuplicateRoleCreatedAlertIncident":
      return duplicateRoleCreatedAlertIncidentPropertiesDeserializer(
        item as DuplicateRoleCreatedAlertIncidentProperties,
      );

    case "TooManyOwnersAssignedToResourceAlertIncident":
      return tooManyOwnersAssignedToResourceAlertIncidentPropertiesDeserializer(
        item as TooManyOwnersAssignedToResourceAlertIncidentProperties,
      );

    case "TooManyPermanentOwnersAssignedToResourceAlertIncident":
      return tooManyPermanentOwnersAssignedToResourceAlertIncidentPropertiesDeserializer(
        item as TooManyPermanentOwnersAssignedToResourceAlertIncidentProperties,
      );

    default:
      return alertIncidentPropertiesDeserializer(item);
  }
}

/** Azure roles assigned outside PIM alert incident properties. */
export interface AzureRolesAssignedOutsidePimAlertIncidentProperties extends AlertIncidentProperties {
  /** The assignee display name. */
  readonly assigneeDisplayName?: string;
  /** The assignee user principal name. */
  readonly assigneeUserPrincipalName?: string;
  /** The assignee ID. */
  readonly assigneeId?: string;
  /** The role display name. */
  readonly roleDisplayName?: string;
  /** The role template ID. */
  readonly roleTemplateId?: string;
  /** The role definition ID. */
  readonly roleDefinitionId?: string;
  /** The date the assignment was activated. */
  readonly assignmentActivatedDate?: Date;
  /** The requestor ID. */
  readonly requestorId?: string;
  /** The requestor display name. */
  readonly requestorDisplayName?: string;
  /** The requestor user principal name. */
  readonly requestorUserPrincipalName?: string;
  /** The alert incident type. */
  alertIncidentType: "AzureRolesAssignedOutsidePimAlertIncident";
}

export function azureRolesAssignedOutsidePimAlertIncidentPropertiesDeserializer(
  item: any,
): AzureRolesAssignedOutsidePimAlertIncidentProperties {
  return {
    alertIncidentType: item["alertIncidentType"],
    assigneeDisplayName: item["assigneeDisplayName"],
    assigneeUserPrincipalName: item["assigneeUserPrincipalName"],
    assigneeId: item["assigneeId"],
    roleDisplayName: item["roleDisplayName"],
    roleTemplateId: item["roleTemplateId"],
    roleDefinitionId: item["roleDefinitionId"],
    assignmentActivatedDate: !item["assignmentActivatedDate"]
      ? item["assignmentActivatedDate"]
      : new Date(item["assignmentActivatedDate"]),
    requestorId: item["requestorId"],
    requestorDisplayName: item["requestorDisplayName"],
    requestorUserPrincipalName: item["requestorUserPrincipalName"],
  };
}

/** Duplicate role created alert incident properties. */
export interface DuplicateRoleCreatedAlertIncidentProperties extends AlertIncidentProperties {
  /** The role name. */
  readonly roleName?: string;
  /** The duplicate roles. */
  readonly duplicateRoles?: string;
  /** The reason for the incident. */
  readonly reason?: string;
  /** The alert incident type. */
  alertIncidentType: "DuplicateRoleCreatedAlertIncident";
}

export function duplicateRoleCreatedAlertIncidentPropertiesDeserializer(
  item: any,
): DuplicateRoleCreatedAlertIncidentProperties {
  return {
    alertIncidentType: item["alertIncidentType"],
    roleName: item["roleName"],
    duplicateRoles: item["duplicateRoles"],
    reason: item["reason"],
  };
}

/** Too many owners assigned to resource alert incident properties. */
export interface TooManyOwnersAssignedToResourceAlertIncidentProperties extends AlertIncidentProperties {
  /** The assignee name. */
  readonly assigneeName?: string;
  /** The assignee type. */
  readonly assigneeType?: string;
  /** The alert incident type. */
  alertIncidentType: "TooManyOwnersAssignedToResourceAlertIncident";
}

export function tooManyOwnersAssignedToResourceAlertIncidentPropertiesDeserializer(
  item: any,
): TooManyOwnersAssignedToResourceAlertIncidentProperties {
  return {
    alertIncidentType: item["alertIncidentType"],
    assigneeName: item["assigneeName"],
    assigneeType: item["assigneeType"],
  };
}

/** Too many permanent owners assigned to resource alert incident properties. */
export interface TooManyPermanentOwnersAssignedToResourceAlertIncidentProperties extends AlertIncidentProperties {
  /** The assignee name. */
  readonly assigneeName?: string;
  /** The assignee type. */
  readonly assigneeType?: string;
  /** The alert incident type. */
  alertIncidentType: "TooManyPermanentOwnersAssignedToResourceAlertIncident";
}

export function tooManyPermanentOwnersAssignedToResourceAlertIncidentPropertiesDeserializer(
  item: any,
): TooManyPermanentOwnersAssignedToResourceAlertIncidentProperties {
  return {
    alertIncidentType: item["alertIncidentType"],
    assigneeName: item["assigneeName"],
    assigneeType: item["assigneeType"],
  };
}

/** Alert configuration. */
export interface AlertConfiguration extends ExtensionResource {
  /** Alert configuration properties. */
  properties?: AlertConfigurationPropertiesUnion;
}

export function alertConfigurationSerializer(item: AlertConfiguration): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : alertConfigurationPropertiesUnionSerializer(item["properties"]),
  };
}

export function alertConfigurationDeserializer(item: any): AlertConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : alertConfigurationPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Alert configuration properties. */
export interface AlertConfigurationProperties {
  /** The alert definition ID. */
  readonly alertDefinitionId?: string;
  /** The alert scope. */
  readonly scope?: string;
  /** True if the alert is enabled, false will disable the scanning for the specific alert. */
  isEnabled?: boolean;
  /** The alert configuration type. */
  /** The discriminator possible values: AzureRolesAssignedOutsidePimAlertConfiguration, DuplicateRoleCreatedAlertConfiguration, TooManyOwnersAssignedToResourceAlertConfiguration, TooManyPermanentOwnersAssignedToResourceAlertConfiguration */
  alertConfigurationType: string;
  /** The alert definition. */
  readonly alertDefinition?: AlertDefinition;
}

export function alertConfigurationPropertiesSerializer(item: AlertConfigurationProperties): any {
  return { isEnabled: item["isEnabled"], alertConfigurationType: item["alertConfigurationType"] };
}

export function alertConfigurationPropertiesDeserializer(item: any): AlertConfigurationProperties {
  return {
    alertDefinitionId: item["alertDefinitionId"],
    scope: item["scope"],
    isEnabled: item["isEnabled"],
    alertConfigurationType: item["alertConfigurationType"],
    alertDefinition: !item["alertDefinition"]
      ? item["alertDefinition"]
      : alertDefinitionDeserializer(item["alertDefinition"]),
  };
}

/** Alias for AlertConfigurationPropertiesUnion */
export type AlertConfigurationPropertiesUnion =
  | AzureRolesAssignedOutsidePimAlertConfigurationProperties
  | DuplicateRoleCreatedAlertConfigurationProperties
  | TooManyOwnersAssignedToResourceAlertConfigurationProperties
  | TooManyPermanentOwnersAssignedToResourceAlertConfigurationProperties
  | AlertConfigurationProperties;

export function alertConfigurationPropertiesUnionSerializer(
  item: AlertConfigurationPropertiesUnion,
): any {
  switch (item.alertConfigurationType) {
    case "AzureRolesAssignedOutsidePimAlertConfiguration":
      return azureRolesAssignedOutsidePimAlertConfigurationPropertiesSerializer(
        item as AzureRolesAssignedOutsidePimAlertConfigurationProperties,
      );

    case "DuplicateRoleCreatedAlertConfiguration":
      return duplicateRoleCreatedAlertConfigurationPropertiesSerializer(
        item as DuplicateRoleCreatedAlertConfigurationProperties,
      );

    case "TooManyOwnersAssignedToResourceAlertConfiguration":
      return tooManyOwnersAssignedToResourceAlertConfigurationPropertiesSerializer(
        item as TooManyOwnersAssignedToResourceAlertConfigurationProperties,
      );

    case "TooManyPermanentOwnersAssignedToResourceAlertConfiguration":
      return tooManyPermanentOwnersAssignedToResourceAlertConfigurationPropertiesSerializer(
        item as TooManyPermanentOwnersAssignedToResourceAlertConfigurationProperties,
      );

    default:
      return alertConfigurationPropertiesSerializer(item);
  }
}

export function alertConfigurationPropertiesUnionDeserializer(
  item: any,
): AlertConfigurationPropertiesUnion {
  switch (item["alertConfigurationType"]) {
    case "AzureRolesAssignedOutsidePimAlertConfiguration":
      return azureRolesAssignedOutsidePimAlertConfigurationPropertiesDeserializer(
        item as AzureRolesAssignedOutsidePimAlertConfigurationProperties,
      );

    case "DuplicateRoleCreatedAlertConfiguration":
      return duplicateRoleCreatedAlertConfigurationPropertiesDeserializer(
        item as DuplicateRoleCreatedAlertConfigurationProperties,
      );

    case "TooManyOwnersAssignedToResourceAlertConfiguration":
      return tooManyOwnersAssignedToResourceAlertConfigurationPropertiesDeserializer(
        item as TooManyOwnersAssignedToResourceAlertConfigurationProperties,
      );

    case "TooManyPermanentOwnersAssignedToResourceAlertConfiguration":
      return tooManyPermanentOwnersAssignedToResourceAlertConfigurationPropertiesDeserializer(
        item as TooManyPermanentOwnersAssignedToResourceAlertConfigurationProperties,
      );

    default:
      return alertConfigurationPropertiesDeserializer(item);
  }
}

/** The Azure roles assigned outside PIM alert configuration properties. */
export interface AzureRolesAssignedOutsidePimAlertConfigurationProperties extends AlertConfigurationProperties {
  /** The alert configuration type. */
  alertConfigurationType: "AzureRolesAssignedOutsidePimAlertConfiguration";
}

export function azureRolesAssignedOutsidePimAlertConfigurationPropertiesSerializer(
  item: AzureRolesAssignedOutsidePimAlertConfigurationProperties,
): any {
  return { isEnabled: item["isEnabled"], alertConfigurationType: item["alertConfigurationType"] };
}

export function azureRolesAssignedOutsidePimAlertConfigurationPropertiesDeserializer(
  item: any,
): AzureRolesAssignedOutsidePimAlertConfigurationProperties {
  return {
    alertDefinitionId: item["alertDefinitionId"],
    scope: item["scope"],
    isEnabled: item["isEnabled"],
    alertConfigurationType: item["alertConfigurationType"],
    alertDefinition: !item["alertDefinition"]
      ? item["alertDefinition"]
      : alertDefinitionDeserializer(item["alertDefinition"]),
  };
}

/** The duplicate role created alert configuration. */
export interface DuplicateRoleCreatedAlertConfigurationProperties extends AlertConfigurationProperties {
  /** The alert configuration type. */
  alertConfigurationType: "DuplicateRoleCreatedAlertConfiguration";
}

export function duplicateRoleCreatedAlertConfigurationPropertiesSerializer(
  item: DuplicateRoleCreatedAlertConfigurationProperties,
): any {
  return { isEnabled: item["isEnabled"], alertConfigurationType: item["alertConfigurationType"] };
}

export function duplicateRoleCreatedAlertConfigurationPropertiesDeserializer(
  item: any,
): DuplicateRoleCreatedAlertConfigurationProperties {
  return {
    alertDefinitionId: item["alertDefinitionId"],
    scope: item["scope"],
    isEnabled: item["isEnabled"],
    alertConfigurationType: item["alertConfigurationType"],
    alertDefinition: !item["alertDefinition"]
      ? item["alertDefinition"]
      : alertDefinitionDeserializer(item["alertDefinition"]),
  };
}

/** Too many owners assigned to resource alert configuration properties. */
export interface TooManyOwnersAssignedToResourceAlertConfigurationProperties extends AlertConfigurationProperties {
  /** The threshold number of owners. */
  thresholdNumberOfOwners?: number;
  /** The threshold percentage of owners out of all role members. */
  thresholdPercentageOfOwnersOutOfAllRoleMembers?: number;
  /** The alert configuration type. */
  alertConfigurationType: "TooManyOwnersAssignedToResourceAlertConfiguration";
}

export function tooManyOwnersAssignedToResourceAlertConfigurationPropertiesSerializer(
  item: TooManyOwnersAssignedToResourceAlertConfigurationProperties,
): any {
  return {
    isEnabled: item["isEnabled"],
    alertConfigurationType: item["alertConfigurationType"],
    thresholdNumberOfOwners: item["thresholdNumberOfOwners"],
    thresholdPercentageOfOwnersOutOfAllRoleMembers:
      item["thresholdPercentageOfOwnersOutOfAllRoleMembers"],
  };
}

export function tooManyOwnersAssignedToResourceAlertConfigurationPropertiesDeserializer(
  item: any,
): TooManyOwnersAssignedToResourceAlertConfigurationProperties {
  return {
    alertDefinitionId: item["alertDefinitionId"],
    scope: item["scope"],
    isEnabled: item["isEnabled"],
    alertConfigurationType: item["alertConfigurationType"],
    alertDefinition: !item["alertDefinition"]
      ? item["alertDefinition"]
      : alertDefinitionDeserializer(item["alertDefinition"]),
    thresholdNumberOfOwners: item["thresholdNumberOfOwners"],
    thresholdPercentageOfOwnersOutOfAllRoleMembers:
      item["thresholdPercentageOfOwnersOutOfAllRoleMembers"],
  };
}

/** Too many permanent owners assigned to resource alert configuration properties. */
export interface TooManyPermanentOwnersAssignedToResourceAlertConfigurationProperties extends AlertConfigurationProperties {
  /** The threshold number of permanent owners. */
  thresholdNumberOfPermanentOwners?: number;
  /** The threshold percentage of permanent owners out of all owners. */
  thresholdPercentageOfPermanentOwnersOutOfAllOwners?: number;
  /** The alert configuration type. */
  alertConfigurationType: "TooManyPermanentOwnersAssignedToResourceAlertConfiguration";
}

export function tooManyPermanentOwnersAssignedToResourceAlertConfigurationPropertiesSerializer(
  item: TooManyPermanentOwnersAssignedToResourceAlertConfigurationProperties,
): any {
  return {
    isEnabled: item["isEnabled"],
    alertConfigurationType: item["alertConfigurationType"],
    thresholdNumberOfPermanentOwners: item["thresholdNumberOfPermanentOwners"],
    thresholdPercentageOfPermanentOwnersOutOfAllOwners:
      item["thresholdPercentageOfPermanentOwnersOutOfAllOwners"],
  };
}

export function tooManyPermanentOwnersAssignedToResourceAlertConfigurationPropertiesDeserializer(
  item: any,
): TooManyPermanentOwnersAssignedToResourceAlertConfigurationProperties {
  return {
    alertDefinitionId: item["alertDefinitionId"],
    scope: item["scope"],
    isEnabled: item["isEnabled"],
    alertConfigurationType: item["alertConfigurationType"],
    alertDefinition: !item["alertDefinition"]
      ? item["alertDefinition"]
      : alertDefinitionDeserializer(item["alertDefinition"]),
    thresholdNumberOfPermanentOwners: item["thresholdNumberOfPermanentOwners"],
    thresholdPercentageOfPermanentOwnersOutOfAllOwners:
      item["thresholdPercentageOfPermanentOwnersOutOfAllOwners"],
  };
}

export function alertArraySerializer(result: Array<Alert>): any[] {
  return result.map((item) => {
    return alertSerializer(item);
  });
}

export function alertArrayDeserializer(result: Array<Alert>): any[] {
  return result.map((item) => {
    return alertDeserializer(item);
  });
}

/** Alert operation result */
export interface AlertOperationResult {
  /** The id of the alert operation. */
  readonly id?: string;
  /** The status of the alert operation. */
  readonly status?: string;
  /** The status detail of the alert operation. */
  readonly statusDetail?: string;
  /** The created date of the alert operation. */
  readonly createdDateTime?: Date;
  /** The last action date of the alert operation. */
  readonly lastActionDateTime?: Date;
  /** The location of the alert associated with the operation. */
  readonly resourceLocation?: string;
}

export function alertOperationResultDeserializer(item: any): AlertOperationResult {
  return {
    id: item["id"],
    status: item["status"],
    statusDetail: item["statusDetail"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    lastActionDateTime: !item["lastActionDateTime"]
      ? item["lastActionDateTime"]
      : new Date(item["lastActionDateTime"]),
    resourceLocation: item["resourceLocation"],
  };
}

export function alertConfigurationArraySerializer(result: Array<AlertConfiguration>): any[] {
  return result.map((item) => {
    return alertConfigurationSerializer(item);
  });
}

export function alertConfigurationArrayDeserializer(result: Array<AlertConfiguration>): any[] {
  return result.map((item) => {
    return alertConfigurationDeserializer(item);
  });
}

export function alertDefinitionArrayDeserializer(result: Array<AlertDefinition>): any[] {
  return result.map((item) => {
    return alertDefinitionDeserializer(item);
  });
}

export function _alertDefinitionPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    scope: item["scope"],
    description: item["description"],
    severityLevel: item["severityLevel"],
    securityImpact: item["securityImpact"],
    mitigationSteps: item["mitigationSteps"],
    howToPrevent: item["howToPrevent"],
    isRemediatable: item["isRemediatable"],
    isConfigurable: item["isConfigurable"],
  };
}

export function _alertPropertiesSerializer(item: Alert): any {
  return { isActive: item["isActive"] };
}

export function _alertPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    isActive: item["isActive"],
    incidentCount: item["incidentCount"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastScannedDateTime: !item["lastScannedDateTime"]
      ? item["lastScannedDateTime"]
      : new Date(item["lastScannedDateTime"]),
    alertDefinition: !item["alertDefinition"]
      ? item["alertDefinition"]
      : alertDefinitionDeserializer(item["alertDefinition"]),
    alertIncidents: !item["alertIncidents"]
      ? item["alertIncidents"]
      : alertIncidentArrayDeserializer(item["alertIncidents"]),
    alertConfiguration: !item["alertConfiguration"]
      ? item["alertConfiguration"]
      : alertConfigurationDeserializer(item["alertConfiguration"]),
  };
}
