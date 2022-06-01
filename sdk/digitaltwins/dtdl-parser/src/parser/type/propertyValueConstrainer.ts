// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ValueConstraint } from "./valueConstraint";

export interface PropertyValueConstrainer {
  addConstraint(propertyName: string, ValueConstraint: ValueConstraint): void;
}
