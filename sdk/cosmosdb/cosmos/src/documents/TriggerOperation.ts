// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Enum for trigger operation values.
 * specifies the operations on which a trigger should be executed.
 */
export enum TriggerOperation {
  /** All operations. */
  All = "all",
  /** Create operations only. */
  Create = "create",
  /** Update operations only. */
  Update = "update",
  /** Delete operations only. */
  Delete = "delete",
  /** Replace operations only. */
  Replace = "replace"
}
