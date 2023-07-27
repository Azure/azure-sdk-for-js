// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Specifies options for the change feed
 *
 * If none of those options are set, it will start reading changes from the beginning for the entire container.
 */
import { PartitionKeyRange } from "../../client";
import { PartitionKey } from "../../documents";
import { ChangeFeedStartFrom, ChangeFeedResourceType } from "./ChangeFeedEnums";
import { IEpkRange } from "./IEpkRange";

/**
 * Specifies startType and corresponding value for the change feed
 */
type ChangeFeedStartType =
  | { startFrom: ChangeFeedStartFrom.Beginning }
  | { startFrom: ChangeFeedStartFrom.Now }
  | { startFrom: ChangeFeedStartFrom.StartTime; startTime: Date }
  | { startFrom: ChangeFeedStartFrom.ContinuationToken; continuationToken: string };

/**
 * Specifies resource for which change feed is being fetched
 */
type ChangeFeedResource =
  | { resource: ChangeFeedResourceType.Container }
  | { resource: ChangeFeedResourceType.PartitionKey; value: PartitionKey }
  | { resource: ChangeFeedResourceType.EpkRange; value: PartitionKeyRange | IEpkRange };

/**
 * Specifies options for the change feed
 */
export interface ChangeFeedIteratorOptions {
  /**
   * Max amount of items to return per page
   */
  maxItemCount?: number;
  /**
   * The session token to use. If not specified, will use the most recent captured session token to start with.
   */
  sessionToken?: string;
  /**
   * Signals where to start from in the change feed.
   */
  changeFeedStartType?: ChangeFeedStartType;
  /**
   * Signals the resource for which change feed is to be fetched.
   */
  changeFeedResource?: ChangeFeedResource;
}
