// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LiteralType } from "./literalType";

export class BooleanLiteralType implements LiteralType {
  canBeNull(_isOptional: boolean): boolean {
    return false;
  }
  getSingularType(_isOptional: boolean): string {
    return "boolean";
  }
  getInitialValue(_isOptional: boolean): string {
    return "false";
  }
}
