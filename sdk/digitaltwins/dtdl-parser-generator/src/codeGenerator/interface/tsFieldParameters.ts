// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess } from "../internal";

export interface TsFieldParams {
  name: string;
  type: string;
  access?: TsAccess;
  readonly?: boolean;
  isStatic?: boolean;
  optional?: boolean;
  summary?: string;
  value?: any;
}
