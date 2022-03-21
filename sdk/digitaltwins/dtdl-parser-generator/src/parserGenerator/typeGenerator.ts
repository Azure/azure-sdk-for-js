// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsLibrary } from "../codeGenerator/tsLibrary";

export interface TypeGenerator {
  generateType(parserLibrary: TsLibrary): void;
}
