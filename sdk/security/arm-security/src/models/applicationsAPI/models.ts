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
export interface _ApplicationsList {
  /** Collection of applications in this page */
  readonly value?: Application[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _applicationsListDeserializer(item: any): _ApplicationsList {
  return {
    value: !item["value"] ? item["value"] : applicationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationArraySerializer(result: Array<Application>): any[] {
  return result.map((item) => {
    return applicationSerializer(item);
  });
}

export function applicationArrayDeserializer(result: Array<Application>): any[] {
  return result.map((item) => {
    return applicationDeserializer(item);
  });
}

/** Security Application over a given scope */
export interface Application extends ProxyResource {
  /** display name of the application */
  displayName?: string;
  /** description of the application */
  description?: string;
  /** The application source, what it affects, e.g. Assessments */
  sourceResourceType?: ApplicationSourceResourceType;
  /** The application conditionSets - see examples */
  conditionSets?: any[];
}

export function applicationSerializer(item: Application): any {
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

export function applicationDeserializer(item: any): Application {
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
export interface ApplicationProperties {
  /** display name of the application */
  displayName?: string;
  /** description of the application */
  description?: string;
  /** The application source, what it affects, e.g. Assessments */
  sourceResourceType: ApplicationSourceResourceType;
  /** The application conditionSets - see examples */
  conditionSets: any[];
}

export function applicationPropertiesSerializer(item: ApplicationProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    sourceResourceType: item["sourceResourceType"],
    conditionSets: item["conditionSets"].map((p: any) => {
      return p;
    }),
  };
}

export function applicationPropertiesDeserializer(item: any): ApplicationProperties {
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
export enum KnownApplicationSourceResourceType {
  /** The source of the application is assessments */
  Assessments = "Assessments",
}

/**
 * The application source, what it affects, e.g. Assessments \
 * {@link KnownApplicationSourceResourceType} can be used interchangeably with ApplicationSourceResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assessments**: The source of the application is assessments
 */
export type ApplicationSourceResourceType = string;

export function _applicationPropertiesSerializer(item: Application): any {
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
