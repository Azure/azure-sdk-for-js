// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsScope } from "../../codeGenerator";
import { MaterialProperty } from "./materialProperty";

export interface PropertyRestriction {
  // Add code to the CheckRestrictions method in the material class that has this restriction.
  addRestriction(
    checkRestrictionsMethodBody: TsScope,
    typeName: string,
    materialProperty: MaterialProperty
  ): void;
}
