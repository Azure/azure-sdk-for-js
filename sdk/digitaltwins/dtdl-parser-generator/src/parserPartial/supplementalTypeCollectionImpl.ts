// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */

import { SupplementalTypeInfoImpl } from "../parser/internal";

export class SupplementalTypeCollectionImpl {
  supplementalTypes: Map<string, SupplementalTypeInfoImpl> = new Map();

  // codegen-outline-begin methods
  connectPropertySetters(): void {
    this.supplementalTypes.forEach((value) => {
      if (value.parentType !== undefined && this.supplementalTypes.get(value.parentType)) {
        value.parentSupplementalType = this.supplementalTypes.get(value.parentType);
      }
    });
  }
  // codegen-outline-end
}
