// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A widget. */
export interface WidgetSuite {
  /** The ID of the widget's manufacturer. */
  manufacturerId: string;
  /** The faked shared model. */
  sharedModel?: FakedSharedModel;
}

/** Faked shared model */
export interface FakedSharedModel {
  /** The tag. */
  tag: string;
  /** The created date. */
  createdAt: Date | string;
}
