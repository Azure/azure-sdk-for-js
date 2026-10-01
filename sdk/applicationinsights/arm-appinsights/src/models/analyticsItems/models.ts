// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Properties that define an Analytics item that is associated to an Application Insights component. */
export interface ApplicationInsightsComponentAnalyticsItem {
  /** Internally assigned unique id of the item definition. */
  id?: string;
  /** The user-defined name of the item. */
  name?: string;
  /** The content of this item */
  content?: string;
  /** This instance's version of the data model. This can change as new features are added. */
  readonly version?: string;
  /** Enum indicating if this item definition is owned by a specific user or is shared between all users with access to the Application Insights component. */
  scope?: ItemScope;
  /** Enum indicating the type of the Analytics item. */
  type?: ItemType;
  /** Date and time in UTC when this item was created. */
  readonly timeCreated?: string;
  /** Date and time in UTC of the last modification that was made to this item. */
  readonly timeModified?: string;
  /** A set of properties that can be defined in the context of a specific item type. Each type may have its own properties. */
  properties?: ApplicationInsightsComponentAnalyticsItemProperties;
}

export function applicationInsightsComponentAnalyticsItemSerializer(
  item: ApplicationInsightsComponentAnalyticsItem,
): any {
  return {
    Id: item["id"],
    Name: item["name"],
    Content: item["content"],
    Scope: item["scope"],
    Type: item["type"],
    Properties: !item["properties"]
      ? item["properties"]
      : applicationInsightsComponentAnalyticsItemPropertiesSerializer(item["properties"]),
  };
}

export function applicationInsightsComponentAnalyticsItemDeserializer(
  item: any,
): ApplicationInsightsComponentAnalyticsItem {
  return {
    id: item["Id"],
    name: item["Name"],
    content: item["Content"],
    version: item["Version"],
    scope: item["Scope"],
    type: item["Type"],
    timeCreated: item["TimeCreated"],
    timeModified: item["TimeModified"],
    properties: !item["Properties"]
      ? item["Properties"]
      : applicationInsightsComponentAnalyticsItemPropertiesDeserializer(item["Properties"]),
  };
}

/** Enum indicating if this item definition is owned by a specific user or is shared between all users with access to the Application Insights component. */
export enum KnownItemScope {
  /** shared */
  Shared = "shared",
  /** user */
  User = "user",
}

/**
 * Enum indicating if this item definition is owned by a specific user or is shared between all users with access to the Application Insights component. \
 * {@link KnownItemScope} can be used interchangeably with ItemScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **shared**: shared \
 * **user**: user
 */
export type ItemScope = string;

/** Enum indicating the type of the Analytics item. */
export enum KnownItemType {
  /** none */
  None = "none",
  /** query */
  Query = "query",
  /** recent */
  Recent = "recent",
  /** function */
  Function = "function",
}

/**
 * Enum indicating the type of the Analytics item. \
 * {@link KnownItemType} can be used interchangeably with ItemType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **none**: none \
 * **query**: query \
 * **recent**: recent \
 * **function**: function
 */
export type ItemType = string;

/** A set of properties that can be defined in the context of a specific item type. Each type may have its own properties. */
export interface ApplicationInsightsComponentAnalyticsItemProperties {
  /** A function alias, used when the type of the item is Function */
  functionAlias?: string;
}

export function applicationInsightsComponentAnalyticsItemPropertiesSerializer(
  item: ApplicationInsightsComponentAnalyticsItemProperties,
): any {
  return { functionAlias: item["functionAlias"] };
}

export function applicationInsightsComponentAnalyticsItemPropertiesDeserializer(
  item: any,
): ApplicationInsightsComponentAnalyticsItemProperties {
  return {
    functionAlias: item["functionAlias"],
  };
}

/** Known values of {@link ItemScopePath} that the service accepts. */
export enum KnownItemScopePath {
  /** analyticsItems */
  AnalyticsItems = "analyticsItems",
  /** myanalyticsItems */
  MyanalyticsItems = "myanalyticsItems",
}

/** Type of ItemScopePath */
export type ItemScopePath = string;

/** Known values of {@link ItemTypeParameter} that the service accepts. */
export enum KnownItemTypeParameter {
  /** none */
  None = "none",
  /** query */
  Query = "query",
  /** function */
  Function = "function",
  /** folder */
  Folder = "folder",
  /** recent */
  Recent = "recent",
}

/** Type of ItemTypeParameter */
export type ItemTypeParameter = string;

export function applicationInsightsComponentAnalyticsItemArraySerializer(
  result: Array<ApplicationInsightsComponentAnalyticsItem>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentAnalyticsItemSerializer(item);
  });
}

export function applicationInsightsComponentAnalyticsItemArrayDeserializer(
  result: Array<ApplicationInsightsComponentAnalyticsItem>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentAnalyticsItemDeserializer(item);
  });
}
