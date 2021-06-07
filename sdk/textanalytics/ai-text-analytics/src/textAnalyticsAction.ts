// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The type of a text analytics action.
 */
export interface TextAnalyticsAction {
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion?: string;
  /**
   * The preferred name for this action.
   */
  actionName?: string;
}
