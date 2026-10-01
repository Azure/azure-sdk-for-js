// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Properties that define a favorite that is associated to an Application Insights component. */
export interface ApplicationInsightsComponentFavorite {
  /** The user-defined name of the favorite. */
  name?: string;
  /** Configuration of this particular favorite, which are driven by the Azure portal UX. Configuration data is a string containing valid JSON */
  config?: string;
  /** This instance's version of the data model. This can change as new features are added that can be marked favorite. Current examples include MetricsExplorer (ME) and Search. */
  version?: string;
  /** Internally assigned unique id of the favorite definition. */
  readonly favoriteId?: string;
  /** Enum indicating if this favorite definition is owned by a specific user or is shared between all users with access to the Application Insights component. */
  favoriteType?: FavoriteType;
  /** The source of the favorite definition. */
  sourceType?: string;
  /** Date and time in UTC of the last modification that was made to this favorite definition. */
  readonly timeModified?: string;
  /** A list of 0 or more tags that are associated with this favorite definition */
  tags?: string[];
  /** Favorite category, as defined by the user at creation time. */
  category?: string;
  /** Flag denoting wether or not this favorite was generated from a template. */
  isGeneratedFromTemplate?: boolean;
  /** Unique user id of the specific user that owns this favorite. */
  readonly userId?: string;
}

export function applicationInsightsComponentFavoriteSerializer(
  item: ApplicationInsightsComponentFavorite,
): any {
  return {
    Name: item["name"],
    Config: item["config"],
    Version: item["version"],
    FavoriteType: item["favoriteType"],
    SourceType: item["sourceType"],
    Tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    Category: item["category"],
    IsGeneratedFromTemplate: item["isGeneratedFromTemplate"],
  };
}

export function applicationInsightsComponentFavoriteDeserializer(
  item: any,
): ApplicationInsightsComponentFavorite {
  return {
    name: item["Name"],
    config: item["Config"],
    version: item["Version"],
    favoriteId: item["FavoriteId"],
    favoriteType: item["FavoriteType"],
    sourceType: item["SourceType"],
    timeModified: item["TimeModified"],
    tags: !item["Tags"]
      ? item["Tags"]
      : item["Tags"].map((p: any) => {
          return p;
        }),
    category: item["Category"],
    isGeneratedFromTemplate: item["IsGeneratedFromTemplate"],
    userId: item["UserId"],
  };
}

/** Enum indicating if this favorite definition is owned by a specific user or is shared between all users with access to the Application Insights component. */
export type FavoriteType = "shared" | "user";

/** Known values of {@link FavoriteSourceType} that the service accepts. */
export enum KnownFavoriteSourceType {
  /** retention */
  Retention = "retention",
  /** notebook */
  Notebook = "notebook",
  /** sessions */
  Sessions = "sessions",
  /** events */
  Events = "events",
  /** userflows */
  Userflows = "userflows",
  /** funnel */
  Funnel = "funnel",
  /** impact */
  Impact = "impact",
  /** segmentation */
  Segmentation = "segmentation",
}

/** Type of FavoriteSourceType */
export type FavoriteSourceType = string;

export function applicationInsightsComponentFavoriteArraySerializer(
  result: Array<ApplicationInsightsComponentFavorite>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentFavoriteSerializer(item);
  });
}

export function applicationInsightsComponentFavoriteArrayDeserializer(
  result: Array<ApplicationInsightsComponentFavorite>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentFavoriteDeserializer(item);
  });
}
