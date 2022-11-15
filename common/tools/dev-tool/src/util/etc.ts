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
