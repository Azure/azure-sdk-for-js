// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsFunctionType } from "../internal";

export interface TsFunctionParams {
  name: string;
  returnType?: string;
  functionType?: TsFunctionType;
  abstract?: boolean;
  access?: TsAccess;
  exports?: boolean;
  isStatic?: boolean;
}
