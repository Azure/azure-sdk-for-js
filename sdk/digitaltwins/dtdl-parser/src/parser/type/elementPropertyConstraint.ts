// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ValueConstraint } from "../internal";

export interface ElementPropertyConstraint {
  parentId: string;
  propertyName?: string;
  elementId: string;
  valueConstraint: ValueConstraint;
}
