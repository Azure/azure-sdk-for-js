/**
 * Wraps a function with a method that has a given name.
 *
 * This can be useful when systems use/display a function's `name`.
 *
 * @param name - the name to apply to the newly-created function
 * @param impl - the underlying implementation
 * @returns a function whose `name` property is the same as the given name, and whose implementation is the same as the
 *          given impl
 */
export function wrapRenamed<F extends (...args: never[]) => unknown>(name: string, impl: F): F {
  // The only way to create a function with an arbitrary string as a name without using the Function constructor or eval
  // is to use object literal method syntax, which works perfectly for this purpose.
  return {
    [name](...args: never[]) {
      return impl(...args);
    },
  }[name] as F;
}

/**
 * A helper function for throwing an error while checking exhaustiveness at the type level.
 */
export function unreachable(...values: never[]): never {
  throw new Error("reached unreachable code: " + values.toString());
}

/**
 * A helper function for filtering values from an array into two different results based on a predicate.
 */
export function bifilter<T>(values: Iterable<T>, predicate: (v: T) => boolean): [T[], T[]] {
  const result: [T[], T[]] = [[], []];

  for (const value of values) {
    if (predicate(value)) {
      result[0].push(value);
    } else {
      result[1].push(value);
    }
  }

  return result;
}
