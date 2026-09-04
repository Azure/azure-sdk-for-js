// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, InputOf } from "../expression/expressions.js";
import { wrapExpression } from "../expression/expressions.js";
import { symbolicValueExpressionNode } from "../expression/ast-nodes.js";
import type { Stack } from "./stack.js";

export type ExpressionValue<T> = T extends Expression<infer U> ? U : T;

/**
 * A value accepted as a deployment variable's value: any JSON literal
 * (scalar, `null`, array, object — recursively), an `Expression`, or a
 * resource view (`InputOf<unknown>`). The literal members are required so
 * plain object/array literals are accepted (a bare `InputOf<unknown>` is a
 * weak type and would reject them).
 */
export type VariableValue =
  | string
  | number
  | boolean
  | null
  | readonly VariableValue[]
  | { readonly [key: string]: VariableValue }
  | InputOf<unknown>;

export type VariableOptions = {
  readonly description?: string | undefined;
  readonly export?: boolean | undefined;
};

/**
 * Pure declaration data for a deployment variable. Stored on the stack
 * (paired with the returned expression handle in {@link VariableEntry});
 * read by the serializer at emit time. Not part of the value-level handle.
 */
export interface VariableMetadata extends VariableOptions {
  readonly name: string;
  readonly value: VariableValue;
}

interface VariableEntry {
  readonly metadata: VariableMetadata;
  readonly variable: Expression<unknown>;
}

export type Variable<TValue extends VariableValue = VariableValue> = Expression<
  ExpressionValue<TValue>
>;

/**
 * Authoring-time collection of a stack's deployment variables. Backed by an
 * ordered private array; supports add/get/delete/iteration. Look variables up
 * by name via {@link VariableCollection.get}.
 */
export class VariableCollection {
  #entries: VariableEntry[] = [];

  /** Add a variable; returns its expression handle. Throws on duplicate name. */
  add<TValue extends VariableValue = VariableValue>(
    name: string,
    value: TValue,
    options?: VariableOptions,
  ): Variable<TValue> {
    if (this.has(name)) {
      throw new Error(`Duplicate deployment variable name: ${name}`);
    }
    const variable = wrapExpression<ExpressionValue<TValue>>(
      symbolicValueExpressionNode<ExpressionValue<TValue>, string>(name),
    );
    this.#entries.push({ metadata: { name, value, ...options }, variable });
    return variable;
  }

  /** The expression handle for a variable, or `undefined`. */
  get(name: string): Variable | undefined {
    return this.#find(name)?.variable;
  }

  /** The declaration metadata for a variable, or `undefined`. */
  getMetadata(name: string): VariableMetadata | undefined {
    return this.#find(name)?.metadata;
  }

  /** All variable handles, in insertion order. */
  getAll(): readonly Variable[] {
    return this.#entries.map((e) => e.variable);
  }

  /** All declaration metadata, in insertion order. */
  getAllMetadata(): readonly VariableMetadata[] {
    return this.#entries.map((e) => e.metadata);
  }

  has(name: string): boolean {
    return this.#find(name) !== undefined;
  }

  /** Remove a variable by name. Returns whether one was removed. */
  delete(name: string): boolean {
    const i = this.#entries.findIndex((e) => e.metadata.name === name);
    if (i === -1) return false;
    this.#entries.splice(i, 1);
    return true;
  }

  get size(): number {
    return this.#entries.length;
  }

  [Symbol.iterator](): IterableIterator<Variable> {
    return this.#entries.map((e) => e.variable)[Symbol.iterator]();
  }

  #find(name: string): VariableEntry | undefined {
    return this.#entries.find((e) => e.metadata.name === name);
  }
}

/**
 * A computed value evaluated at deploy time, compiled to a Bicep `var` declaration.
 *
 * @example
 * ```typescript snippet:ignore
 * import { Stack, createVariable } from "@azure/provisioning-core";
 *
 * const stack = new Stack("my-app");
 * const suffix = createVariable(stack, "suffix", "prod");
 * ```
 */
export function createVariable<TValue extends VariableValue = VariableValue>(
  stack: Stack,
  name: string,
  value: TValue,
  options?: VariableOptions,
): Variable<TValue> {
  return stack.variables.add(name, value, options);
}
