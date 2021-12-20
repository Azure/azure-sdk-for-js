// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import ts from "typescript";

/**
 * A simple helper library for storing node information defined as a pair of a predicate function and a selector.
 */

/**
 * Defines an accumulated property.
 */
type Accumulator<Result> = {
  /**
   * Selects the information that should be stored. This can be any arbitrary computation.
   */
  select: (node: never) => Result[] | Result | undefined;
  /**
   * If defined, determines whether or not to consider a node (default: true).
   */
  predicate?: (node: ts.Node) => boolean;
};

/**
 * The type of any Accumulator spec, which is a map of property names to Accumulator definitions. The result will have
 * the same properties as this object.
 */
type AccumulatorSpecTemplate = { [k: string]: Accumulator<unknown> } & {
  addNode?: undefined;
};

/**
 * A function to add a node to an accumulator.
 */
type AddNode = (node: ts.Node) => void;

/**
 * A working accumulator. The result is a map from fields of the spec to arrays of the `select` results.
 *
 * Example spec:
 *
 * ```typescript
 * const { result, addNode } = createAccumulator({
 *   identifiers: {
 *     predicate: ts.isIdentifier,
 *     select: (identifier) => identifier.text
 *   } as Accumulator<ts.Identifier, string>
 * });
 * ```
 *
 * In the above example, the `result` object will have a single property `identifiers` (same as the spec), and its value
 * will be an array of selected identifier names.
 */
type AccumulatorResult<Result> = Result & {
  addNode: AddNode;
};

/**
 * Convert an Accumulator spec type into a result type.
 */
type SpecToResult<Spec extends AccumulatorSpecTemplate> = {
  [Field in Exclude<keyof Spec, "addNode">]: Exclude<
    ReturnType<Spec[Field]["select"]>,
    unknown[] | undefined
  >[];
};

/**
 *
 * @param spec - the spec for this accumulator, a map of property names to `Accumulator` entries
 * @returns an AccumulatorResult containing a
 */
export function createAccumulator<Spec extends AccumulatorSpecTemplate>(
  spec: Spec
): AccumulatorResult<SpecToResult<Spec>> {
  const result = Object.fromEntries(
    Object.keys(spec).map((name) => [name, []])
  ) as unknown as AccumulatorResult<SpecToResult<Spec>>;

  const addNode: AddNode = (node) => {
    for (const [name, { predicate, select }] of Object.entries(spec)) {
      if (!predicate || predicate(node)) {
        // `as never` is a way to force assignment, just a less powerful version of `as any`
        const thisResult = select(node as never);

        // This is like an inline flatMap. If the selector produced an array, we push all the values, otherwise if it
        // produced undefined, we push nothing, and finally if it only produced one result, we push it alone.
        const values = Array.isArray(thisResult)
          ? thisResult
          : thisResult !== undefined
          ? [thisResult]
          : [];
        result[name].push(...values);
      }
    }
  };

  result.addNode = addNode;

  return result;
}
