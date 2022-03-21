// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CodeWriter, TsMultiLine } from "./internal";

export class TsMultiLineDocString extends TsMultiLine {
  constructor() {
    super("/**");
  }

  line(text: string): this {
    super.line(` * ${text}`);
    return this;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    super.line("**/");
    super.generateCode(codeWriter);
  }
}
