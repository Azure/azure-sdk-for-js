// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LiteralType } from "./literalType";

export class IntegerLiteralType implements LiteralType {
  canBeNull(isOptional: boolean): boolean {
    return isOptional;
  }
  getSingularType(isOptional: boolean): string {
    return isOptional ? "number|undefined" : "number";
  }
  getInitialValue(isOptional: boolean): string {
    return isOptional ? "undefined" : "0";
  }
}
