// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CodeWriter, TsMultiLine, TsStatement } from "./internal";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";

export class TsInline implements TsStatement {
  private _inlineBlock: TsMultiLine;

  constructor(filepath: string, identifier: string) {
    let text;
    this._inlineBlock = new TsMultiLine();
    const data = readFileSync(resolvePath(filepath), "utf8");
    if (data.indexOf("\r\n") > -1) {
      text = data.split("\r\n");
    } else if (data.indexOf("\n") > -1) {
      text = data.split("\n");
    } else {
      text = data.split("\r");
    }

    let codeBlock: boolean = false;
    let blockEnded: boolean = false;
    let i = 0;
    while (!blockEnded && i < text.length) {
      const line = text[i].trim();
      i++;
      if (line === undefined) {
        throw new Error("Line is undefined.");
      }
      if (line.startsWith("// codegen-outline-begin") && line.includes(identifier)) {
        codeBlock = true;
      }
      if (line.startsWith("// codegen-outline-end") && codeBlock === true) {
        blockEnded = true;
      }
      if (codeBlock) {
        this._inlineBlock.line(line);
        if (blockEnded) {
          break;
        }
      }
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    this._inlineBlock.generateCode(codeWriter);
  }
}
