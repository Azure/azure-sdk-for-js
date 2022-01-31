// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */

// Indicates the status of traversing a descendant hierarchy.
export enum TraversalStatus {
  // No traversal at this point in the hierarchy has begun.
  NotStarted,

  // A traversal at this point in the hierarchy is in progress.
  InProgress,

  // The hierarchy hereunder has been fully traversed.
  Complete
}
