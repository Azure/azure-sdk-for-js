// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license../ChangeFeedIteratorResponse
import { Resource } from "../Resource";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";

export abstract class ChangeFeedIteratorV2<T> {
  abstract get hasMoreResults(): boolean;

  abstract ReadNextAsync(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>>;

  async fetchAllFeedRanges(): Promise<void> {}

  abstract fetchOverLappingFeedRanges(epkRange: any): Promise<void>;

  abstract fetchContinuationTokenFeedRanges(continuationToken: string): Promise<boolean>;
}
