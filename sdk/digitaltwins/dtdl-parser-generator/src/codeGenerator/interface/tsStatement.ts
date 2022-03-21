// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CodeWriter } from "../internal";

export interface TsStatement {
  generateCode(codeWriter: CodeWriter): void;
}
