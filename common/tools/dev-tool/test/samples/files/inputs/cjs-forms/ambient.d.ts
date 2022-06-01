// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * These modules are declared to help us type-check the examples, which have special cases for @azure packages.
 */

declare module "@azure/test1" {
  declare const x: unknown;
  export default x;
  export { x };
}

declare module "@azure-test2/test2" {
  declare const x: unknown;
  export default x;
  export { x };
}
