# ts-no-window

Recommends against the usage of `window` in favor of `self`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```ts
const navigator = self.navigator as NavigatorEx;
```

### Bad

```ts
const navigator = window.navigator as NavigatorEx;
```

## When to turn off

Only if the rule breaks.
