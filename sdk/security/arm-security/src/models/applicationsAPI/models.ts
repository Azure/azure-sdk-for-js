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
/** Page of a security applications list */
export interface _ApplicationsAPIApplicationsList {
  /** Collection of applications in this page */
  readonly value?: ApplicationsAPIApplication[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _applicationsAPIApplicationsListDeserializer(
  item: any,
): _ApplicationsAPIApplicationsList {
  return {
    value: !item["value"]
      ? item["value"]
      : applicationsAPIApplicationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationsAPIApplicationArraySerializer(
  result: Array<ApplicationsAPIApplication>,
): any[] {
  return result.map((item) => {
    return applicationsAPIApplicationSerializer(item);
  });
}

export function applicationsAPIApplicationArrayDeserializer(
  result: Array<ApplicationsAPIApplication>,
): any[] {
  return result.map((item) => {
    return applicationsAPIApplicationDeserializer(item);
  });
}

/** Security Application over a given scope */
export interface ApplicationsAPIApplication extends ProxyResource {
  /** display name of the application */
  displayName?: string;
  /** description of the application */
  description?: string;
  /** The application source, what it affects, e.g. Assessments */
  sourceResourceType?: ApplicationsAPIApplicationSourceResourceType;
  /** The application conditionSets - see examples */
  conditionSets?: any[];
}

export function applicationsAPIApplicationSerializer(item: ApplicationsAPIApplication): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "sourceResourceType",
      "conditionSets",
    ])
      ? undefined
      : _applicationPropertiesSerializer(item),
  };
}

export function applicationsAPIApplicationDeserializer(item: any): ApplicationsAPIApplication {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _applicationPropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of an application */
export interface ApplicationsAPIApplicationProperties {
  /** display name of the application */
  displayName?: string;
  /** description of the application */
  description?: string;
  /** The application source, what it affects, e.g. Assessments */
  sourceResourceType: ApplicationsAPIApplicationSourceResourceType;
  /** The application conditionSets - see examples */
  conditionSets: any[];
}

export function applicationsAPIApplicationPropertiesSerializer(
  item: ApplicationsAPIApplicationProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    sourceResourceType: item["sourceResourceType"],
    conditionSets: item["conditionSets"].map((p: any) => {
      return p;
    }),
  };
}

export function applicationsAPIApplicationPropertiesDeserializer(
  item: any,
): ApplicationsAPIApplicationProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    sourceResourceType: item["sourceResourceType"],
    conditionSets: item["conditionSets"].map((p: any) => {
      return p;
    }),
  };
}

/** The application source, what it affects, e.g. Assessments */
export enum KnownApplicationsAPIApplicationSourceResourceType {
  /** The source of the application is assessments */
  Assessments = "Assessments",
}

/**
 * The application source, what it affects, e.g. Assessments \
 * {@link KnownApplicationsAPIApplicationSourceResourceType} can be used interchangeably with ApplicationsAPIApplicationSourceResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assessments**: The source of the application is assessments
 */
export type ApplicationsAPIApplicationSourceResourceType = string;

export function _applicationPropertiesSerializer(item: ApplicationsAPIApplication): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    sourceResourceType: item["sourceResourceType"],
    conditionSets: !item["conditionSets"]
      ? item["conditionSets"]
      : item["conditionSets"].map((p: any) => {
          return p;
        }),
  };
}

export function _applicationPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    sourceResourceType: item["sourceResourceType"],
    conditionSets: !item["conditionSets"]
      ? item["conditionSets"]
      : item["conditionSets"].map((p: any) => {
          return p;
        }),
  };
}
