// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class InternalClass {
  returnsTrue(): boolean {
    return true;
  }
}

export class InternalInheritedClass extends InternalClass {
  returnsFalse(): boolean {
    return false;
  }
}
