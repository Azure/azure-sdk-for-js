// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** A widget. */
export interface Widget {
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
  createdDate: Date | string;
}
