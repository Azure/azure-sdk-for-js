// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Arguments for retrieving the next page of search results.
 */
export interface ListPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string | null;
}

export enum ChannelType {
  All = "",
  ManagedChannels = "ManagedChannels",
  CustomChannels = "CustomChannels"
}
