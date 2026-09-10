// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BicepType, PrimitiveTypeMap } from "../bicep.js";
import type { ExpressionOrValue, InputOf } from "../expression/expressions.js";
import type { Resource } from "./resource/resource.js";
import type { Stack } from "./stack.js";
import { assertValueAssignableToType } from "../util.js";

/**
 * A value accepted as a deployment output's value: any JSON literal (scalar,
 * `null`, array, object — recursively), an `Expression`, a resource view
 * (`InputOf<unknown>`), or a {@link Resource} handle. The literal members are
 * required so plain object/array literals are accepted (a bare
 * `InputOf<unknown>` is a weak type and would reject them).
 */
export type OutputValue =
  | string
  | number
  | boolean
  | null
  | readonly OutputValue[]
  | { readonly [key: string]: OutputValue }
  | InputOf<unknown>
  | Resource;

export type OutputOptions = {
  readonly description?: string | undefined;
  readonly secure?: boolean | undefined;
  readonly minValue?: number | undefined;
  readonly maxValue?: number | undefined;
  readonly minLength?: number | undefined;
  readonly maxLength?: number | undefined;
  readonly metadata?: Record<string, unknown> | undefined;
  readonly discriminator?: string | undefined;
  readonly sealed?: boolean | undefined;
};

/**
 * Pure declaration data for a deployment output. Stored on the stack and read
 * by the serializer at emit time. An output is a terminal sink — it has no
 * expression handle.
 */
export interface OutputMetadata extends OutputOptions {
  readonly name: string;
  readonly type: BicepType;
  readonly value: OutputValue;
}

/**
 * Authoring-time collection of a stack's deployment outputs. Backed by an
 * ordered private array; supports add/get/delete/iteration. Outputs are
 * terminal sinks (no expression handle), so iteration yields metadata.
 */
export class OutputCollection {
  #entries: OutputMetadata[] = [];

  /**
   * Add an output whose type is a scalar Bicep primitive (`string`, `int`,
   * `bool`). The value is checked against the declared type at compile time.
   */
  add<T extends "string" | "int" | "bool">(
    name: string,
    type: T,
    value: ExpressionOrValue<PrimitiveTypeMap[T]> | Resource,
    options?: OutputOptions,
  ): OutputMetadata;
  /** Add an output with any other Bicep type (object, array, structured). */
  add(name: string, type: BicepType, value: OutputValue, options?: OutputOptions): OutputMetadata;
  /** Add an output. Throws on duplicate name. Returns the stored metadata. */
  add(name: string, type: BicepType, value: OutputValue, options?: OutputOptions): OutputMetadata {
    if (this.has(name)) {
      throw new Error(`Duplicate deployment output name: ${name}`);
    }
    if (typeof type === "string") {
      assertValueAssignableToType(value, type, `Deployment output "${name}"`);
    }
    const metadata: OutputMetadata = { name, type, value, ...options };
    this.#entries.push(metadata);
    return metadata;
  }

  /** The declaration metadata for an output, or `undefined`. */
  get(name: string): OutputMetadata | undefined {
    return this.#entries.find((e) => e.name === name);
  }

  /** All output metadata, in insertion order. */
  getAll(): readonly OutputMetadata[] {
    return this.#entries;
  }

  has(name: string): boolean {
    return this.get(name) !== undefined;
  }

  /** Remove an output by name. Returns whether one was removed. */
  delete(name: string): boolean {
    const i = this.#entries.findIndex((e) => e.name === name);
    if (i === -1) return false;
    this.#entries.splice(i, 1);
    return true;
  }

  get size(): number {
    return this.#entries.length;
  }

  [Symbol.iterator](): IterableIterator<OutputMetadata> {
    return this.#entries[Symbol.iterator]();
  }
}

/**
 * A deployment output, compiled to a Bicep `output` declaration.
 *
 * @example
 * ```typescript snippet:ignore
 * import { Stack } from "@azure/provisioning-core";
 * import { KeyVault } from "@azure/provisioning-keyvault";
 *
 * const stack = new Stack("my-app", { targetScope: "resourceGroup" });
 * const vault = new KeyVault(stack, { tenantId: "..." });
 * stack.outputs.add("vaultUri", "string", vault.properties.vaultUri);
 * ```
 */
export function createOutput<T extends "string" | "int" | "bool">(
  stack: Stack,
  name: string,
  type: T,
  value: ExpressionOrValue<PrimitiveTypeMap[T]> | Resource,
  options?: OutputOptions,
): OutputMetadata;
export function createOutput(
  stack: Stack,
  name: string,
  type: BicepType,
  value: OutputValue,
  options?: OutputOptions,
): OutputMetadata;
export function createOutput(
  stack: Stack,
  name: string,
  type: BicepType,
  value: OutputValue,
  options?: OutputOptions,
): OutputMetadata {
  return stack.outputs.add(name, type, value, options);
}
