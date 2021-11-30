// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The type of a standard text analytics action.
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

/**
 * The type of a custom text analytics action.
 */
export interface CustomTextAnalyticsAction {
  /**
   * The project name for the text analytics model used by this operation on this
   * batch of input documents.
   */
  projectName: string;
  /**
   * The deployment name for the text analytics model used by this operation on this
   * batch of input documents.
   */
  deploymentName: string;
  /**
   * The preferred name for this action.
   */
  actionName?: string;
}
