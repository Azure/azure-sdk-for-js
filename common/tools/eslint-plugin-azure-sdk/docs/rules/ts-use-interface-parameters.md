# ts-use-interface-parameters

Recommends the usage of interfaces instead of classes as function parameters in source files.

This includes arrays and member properties of parameter types.

However, exceptions are made for private class methods, overloads where at least one function signature does not contain and violating parameters, optional parameters, and class types which originate from another library.

Source files are defined as files in the `src` directory.

## Examples

The following interfaces and classes are to be used as example types:

```ts
import ExternalClass from "example-library";

class BasicClass {}

interface BasicInterface {}

interface NestedInterface {
  interface: BasicInterface;
}

interface ClassInInterface {
  class: BasicClass;
}
```

### Good

```ts
function example(param: BasicInterface) {
  /* code here */
}
```

```ts
function example(param: NestedInterface) {
  /* code here */
}
```

```ts
function example(param?: BasicClass) {
  /* code here */
}
```

```ts
class Example {
  constructor(param: BasicClass);
  constructor(param: BasicInterface);
}
```

```ts
class Example {
  private _example(param: BasicClass);
}
```

### Bad

```ts
function example(param: BasicClass) {
  /* code here */
}
```

```ts
function example(param1: BasicInterface, param2: BasicClass) {
  /* code here */
}
```

```ts
function example(param: BasicClass[]) {
  /* code here */
}
```

```ts
function example(param: ClassInInterface) {
  /* code here */
}
```

```ts
class Example {
  constructor(param: BasicClass);
  constructor(param1: BasicInterface, param2: BasicClass);
}
```

## When to turn off

Only if the rule breaks (more likely for this rule).

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-use-interface-parameters)
