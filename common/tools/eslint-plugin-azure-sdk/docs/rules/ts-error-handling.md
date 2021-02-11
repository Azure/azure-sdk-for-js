# ts-error-handling

Limits thrown errors to ECMAScript built-in error types (`TypeError`, `RangeError`, `Error`).

Allows exceptions for `catch` blocks where the type of the caught error is unknown.

## Examples

### Good

```ts
throw new Error("error");
```

```ts
const err = new TypeError("invalid type");
throw err;
```

```ts
try {
  /* code here */
} catch (err) {
  throw err;
}
```

### Bad

```ts
throw 1;
```

```ts
throw "error";
```

```ts
throw new OtherError("error");
```

```ts
try {
  /* code here */
} catch (err) {
  throw err;
}
```

## When to turn off

If you have good reason to include other error types.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-error-handling)
