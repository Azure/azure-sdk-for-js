# Design Document: Extensible Enums in Azure SDK for JavaScript

## Overview

This document proposes a new approach for dealing with extensible enums in TypeScript. By introducing a `NonExhaustive` type in our `core-util` library, we hope to improve the flexibility and developer experience of our APIs.

## Background

Traditionally, Enums are fixed and cannot be extended with arbitrary values. This can lead to limitations when we need to deal with dynamic data or APIs that could evolve over time. For this reason, many Azure Services use a more flexible approach called "extensible enums".

Certainly, here's the updated section of the design document that covers the current approach and the proposed changes:

---

## Current Approach

Currently, the Azure SDK libraries handle enums with a combination of a string type and a traditional enum. This allows for flexibility in accepting any string, while also providing a set of known values. For example:

```typescript
/**
 * Known values: "foo", "bar", "baz"
 */
type MyValue = string;
enum KnownMyValueValues {
  foo = "foo",
  bar = "bar",
  baz = "baz",
}
```

In this approach, the string alias `MyValue` is used for documenting the suggested values with TSDoc and the `KnownMyValueValues` enum is provided as a helper for users that want to use strongly typed options.

## Proposed Changes

The proposed `NonExhaustive` type seeks to simplify this approach by combining these two separate entities into one. This not only reduces complexity but also enhances the user experience. Instead of defining a string type and an enum separately, we can define an extensible enum like this:

```typescript
type MyValue = NonExhaustive<"foo" | "bar" | "baz">;
```

This single `MyValue` type would accept any string, while also suggesting "foo", "bar", and "baz" as autocomplete options in the IDE. This approach would both simplify our codebase and provide a more intuitive and flexible API for our users.

## Impact

The proposed approach will greatly improve our user experience:

1. **Discoverability**: Developers will have the recommended values suggested to them directly in their IDE, which aids in understanding what values they might use.

2. **Flexibility**: Developers will not be limited to the recommended values and can provide any string value as needed. This makes our API more adaptable to various use-cases.

3. **Reduced Errors**: By providing recommended values, we guide developers towards the correct usage, potentially reducing errors from incorrect string values.

4. **Simplicity**: This approach reduces the need for managing multiple string aliases, simplifying our codebase.

## Concerns

The main concern with this approach is that it relies on an advanced TypeScript feature that is not officially supported. There's a risk that future changes to TypeScript could potentially break our implementation.

However, we've considered this risk and feel that it's minimal given TypeScript's strong commitment to backward compatibility. We also plan to mitigate this risk by implementing a robust testing strategy.

## Conclusion

While this approach comes with some trade-offs, we believe the benefits in terms of user experience and API flexibility make it a worthwhile endeavor. We invite feedback and suggestions from the team to refine this proposal.
