// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ValueConstraint } from "../internal";

export interface PropertyConstraint {
  PropertyName: string;
  ValueConstraint: ValueConstraint;
}
