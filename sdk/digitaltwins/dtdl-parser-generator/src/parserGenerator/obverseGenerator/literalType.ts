// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface LiteralType {
  // Indicates whether it is possible for the type to be null.
  canBeNull(isOptional: boolean): boolean;
  // Gets the type declaration for a singular value.
  getSingularType(isOptional: boolean): string;
  // Gets an appropriate initial value.
  getInitialValue(isOptional: boolean): string;
}
