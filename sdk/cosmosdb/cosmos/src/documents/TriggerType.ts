// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Enum for trigger type values.
 * Specifies the type of the trigger.
 */
export enum TriggerType {
  /** Trigger should be executed before the associated operation(s). */
  Pre = "pre",
  /** Trigger should be executed after the associated operation(s). */
  Post = "post"
}
