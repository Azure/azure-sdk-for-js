// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createBytesShape,
  createFlatModelShape,
  createNumberShape,
  createStringShape,
  createUnionShape,
  type FlatModelShape,
  type InputOf,
} from "@azure/provisioning-core/internal";

/**
 * Employee properties
 */
export interface EmployeeProperties {
  /**
   * Age of employee
   */
  age?: number;
  /**
   * City of employee
   */
  city?: string;
  /**
   * Profile of employee
   */
  profile?: Uint8Array;
  /**
   * The status of the last operation.
   */
  provisioningState?: ProvisioningState;
}

/**
 * Input type for Employee properties
 */
export interface EmployeePropertiesInput extends InputOf<EmployeeProperties> {
  /**
   * Age of employee
   */
  age?: ExpressionOrValue<number> | undefined;
  /**
   * City of employee
   */
  city?: ExpressionOrValue<string> | undefined;
  /**
   * Profile of employee
   */
  profile?: ExpressionOrValue<Uint8Array> | undefined;
}

/**
 * View type for Employee properties
 */
export interface EmployeePropertiesView extends InputOf<EmployeeProperties> {
  /**
   * Age of employee
   */
  age?: ExpressionOrValue<number> | undefined;
  /**
   * City of employee
   */
  city?: ExpressionOrValue<string> | undefined;
  /**
   * Profile of employee
   */
  profile?: ExpressionOrValue<Uint8Array> | undefined;
  /**
   * Read-only output: The status of the last operation.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
}

export const employeePropertiesShape: FlatModelShape = createFlatModelShape({
  age: { armPath: ["age"], value: createNumberShape() },
  city: { armPath: ["city"], value: createStringShape() },
  profile: {
    armPath: ["profile"],
    value: createBytesShape({
      kind: "bytes",
      source: "bytes",
      format: "base64url",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * The provisioning state of a resource type.
 *
 * Known values:
 *
 * - `"Succeeded"`: Resource has been created.
 *
 * - `"Failed"`: Resource creation failed.
 *
 * - `"Canceled"`: Resource creation was canceled.
 */
export type ResourceProvisioningState = string;

/**
 * The resource provisioning state.
 */
export type ProvisioningState =
  ResourceProvisioningState | "Provisioning" | "Updating" | "Deleting" | "Accepted" | string;
