// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsDeclarationType } from "../internal";

export interface TsDeclarationParams {
  name: string;
  type: TsDeclarationType;
  exports?: boolean;
}
