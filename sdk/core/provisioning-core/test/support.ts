import { Resource } from "../src/constructs/resource/resource.js";
import type { ProvisioningComponent } from "../src/constructs/provisioning-component.js";
import type { Expression } from "../src/expression/expressions.js";
import type { ResourceProps } from "../src/constructs/resource/resource.js";

/**
 * Surfaces the inline (non-standard) properties of a test resource's props
 * object as `Expression<T>`-typed members on the returned handle, matching the
 * runtime proxy shape. Test helpers only — production resource classes
 * declare their property accessors explicitly.
 */
type InlineProps<TOptions> = {
  readonly [K in keyof Omit<TOptions, keyof ResourceProps<string>>]: Expression<
    Omit<TOptions, keyof ResourceProps<string>>[K]
  >;
};

/**
 * Constructs a bare `Resource` for tests. Naming rules are per-resource-type
 * metadata exposed as a `protected static namingRules` field on real resource
 * classes; tests that need auto-naming declare their own small subclasses with
 * that static (see `naming.test.ts`) rather than routing rules through this
 * generic helper.
 */
export function resource<
  TType extends string,
  const TProps extends ResourceProps<TType> & Record<string, unknown>,
>(context: ProvisioningComponent | Resource, props: TProps): Resource<TType> & InlineProps<TProps> {
  return new Resource(context, props) as Resource<TType> & InlineProps<TProps>;
}

export function childResource<
  TType extends string,
  const TProps extends ResourceProps<TType> & Record<string, unknown>,
>(parent: Resource, props: TProps): Resource<TType> & InlineProps<TProps> {
  return new Resource(parent, props) as Resource<TType> & InlineProps<TProps>;
}
