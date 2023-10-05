// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Faked shared model */
export interface FakedSharedModel {
  /** The tag. */
  tag: string;
  /** The created date. */
  createdAt: Date | string;
}

export interface CreateWidgetRequest {
  /** The widget name. */
  name: string;
  /** The ID of the widget's manufacturer. */
  manufacturerId: string;
  /** The faked shared model. */
  sharedModel?: FakedSharedModel;
}
