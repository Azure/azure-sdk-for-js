// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

if (typeof Symbol === undefined || !(Symbol as any).asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}
