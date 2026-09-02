// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrimitiveTypeMap } from "../bicep.js";
import type { Expression, ExpressionOrValue } from "../expression/expressions.js";
import { wrapExpression } from "../expression/expressions.js";
import { symbolicValueExpressionNode } from "../expression/ast-nodes.js";
import type { Stack } from "./stack.js";
import { assertValueAssignableToType } from "../util.js";

export type InferParamType<T extends keyof PrimitiveTypeMap, A> = A extends readonly (infer E)[]
  ? E
  : PrimitiveTypeMap[T];

/**
 * A value accepted as a parameter's `defaultValue`: a literal of the declared
 * type or an `Expression` of it. Resource views are intentionally excluded —
 * a Bicep `param` default cannot reference resources.
 */
export type ParameterValue<T extends keyof PrimitiveTypeMap = keyof PrimitiveTypeMap> =
  ExpressionOrValue<PrimitiveTypeMap[T]>;

export type ParameterOptions<
  T extends keyof PrimitiveTypeMap = keyof PrimitiveTypeMap,
  A extends readonly PrimitiveTypeMap[T][] | undefined = undefined,
> = {
  readonly defaultValue?: ParameterValue<T> | undefined;
  readonly description?: string | undefined;
  readonly secure?: boolean | undefined;
  readonly minValue?: number | undefined;
  readonly maxValue?: number | undefined;
  readonly minLength?: number | undefined;
  readonly maxLength?: number | undefined;
  readonly metadata?: Record<string, unknown> | undefined;
  readonly allowed?: A;
  readonly discriminator?: string | undefined;
  readonly sealed?: boolean | undefined;
};

/**
 * Pure declaration data for a deployment parameter. Stored on the stack
 * (paired with the returned expression handle in {@link ParameterEntry});
 * read by the serializer at emit time. Not part of the value-level handle.
 */
export interface ParameterMetadata extends ParameterOptions<
  keyof PrimitiveTypeMap,
  readonly PrimitiveTypeMap[keyof PrimitiveTypeMap][] | undefined
> {
  readonly name: string;
  readonly type: keyof PrimitiveTypeMap;
}

/**
 * A stack entry pairing a parameter's declaration metadata with the
 * expression handle returned to the user. Internal; metadata is exposed via
 * {@link ParameterCollection.getMetadata} / {@link ParameterCollection.getAllMetadata}.
 */
interface ParameterEntry {
  readonly metadata: ParameterMetadata;
  readonly parameter: Expression<unknown>;
}

export type Parameter<
  T extends keyof PrimitiveTypeMap = keyof PrimitiveTypeMap,
  A extends readonly PrimitiveTypeMap[T][] | undefined = undefined,
> = Expression<InferParamType<T, A>>;

/**
 * Authoring-time collection of a stack's deployment parameters. Backed by an
 * ordered private array; supports add/get/delete/iteration. Look parameters up
 * by name via {@link ParameterCollection.get}.
 */
export class ParameterCollection {
  #entries: ParameterEntry[] = [];

  /** Add a parameter; returns its expression handle. Throws on duplicate name. */
  add<
    T extends keyof PrimitiveTypeMap = keyof PrimitiveTypeMap,
    const A extends readonly PrimitiveTypeMap[T][] | undefined = undefined,
  >(name: string, type: T, options?: ParameterOptions<T, A>): Parameter<T, A> {
    if (this.has(name)) {
      throw new Error(`Duplicate deployment parameter name: ${name}`);
    }
    assertValueAssignableToType(options?.defaultValue, type, `Deployment parameter "${name}"`);
    const param = wrapExpression<InferParamType<T, A>>(
      symbolicValueExpressionNode<InferParamType<T, A>, string>(name),
    );
    this.#entries.push({
      metadata: { name, type, ...options },
      parameter: param,
    });
    return param;
  }

  /** The expression handle for a parameter, or `undefined`. */
  get(name: string): Parameter | undefined {
    return this.#find(name)?.parameter;
  }

  /** The declaration metadata for a parameter, or `undefined`. */
  getMetadata(name: string): ParameterMetadata | undefined {
    return this.#find(name)?.metadata;
  }

  /** All parameter handles, in insertion order. */
  getAll(): readonly Parameter[] {
    return this.#entries.map((e) => e.parameter);
  }

  /** All declaration metadata, in insertion order. */
  getAllMetadata(): readonly ParameterMetadata[] {
    return this.#entries.map((e) => e.metadata);
  }

  has(name: string): boolean {
    return this.#find(name) !== undefined;
  }

  /** Remove a parameter by name. Returns whether one was removed. */
  delete(name: string): boolean {
    const i = this.#entries.findIndex((e) => e.metadata.name === name);
    if (i === -1) return false;
    this.#entries.splice(i, 1);
    return true;
  }

  get size(): number {
    return this.#entries.length;
  }

  [Symbol.iterator](): IterableIterator<Parameter> {
    return this.#entries.map((e) => e.parameter)[Symbol.iterator]();
  }

  #find(name: string): ParameterEntry | undefined {
    return this.#entries.find((e) => e.metadata.name === name);
  }
}

/**
 * A deploy-time input to a stack, compiled to a Bicep `param` declaration.
 *
 * @remarks
 * The returned value is an `Expression` that can be passed to resource
 * properties. At deploy time, the user supplies the actual value. The
 * declaration metadata is stored separately on the stack, keyed by name.
 *
 * @example
 * ```typescript
 * import { Stack, createParameter } from "@azure/provisioning-core";
 *
 * const stack = new Stack("my-app", { targetScope: "resourceGroup" });
 * const env = createParameter(stack, "env", "string", {
 *   allowed: ["dev", "staging", "prod"] as const,
 *   defaultValue: "dev",
 * });
 * ```
 */
export function createParameter<
  T extends keyof PrimitiveTypeMap = keyof PrimitiveTypeMap,
  const A extends readonly PrimitiveTypeMap[T][] | undefined = undefined,
>(stack: Stack, name: string, type: T, options?: ParameterOptions<T, A>): Parameter<T, A> {
  return stack.parameters.add(name, type, options);
}
