// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Enum to specify the start type to begin iterating from.
 */
export enum ChangeFeedStartFrom {
  Beginning,
  Now,
  StartTime,
  ContinuationToken,
}

/**
 * Enum to specify the resource for which change feed is being fetched.
 */
export enum ChangeFeedResourceType {
  EpkRange,
  PartitionKey,
  Container,
}
