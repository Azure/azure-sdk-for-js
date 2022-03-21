// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";

export class CodeWriter {
  private _streamWriter: fs.WriteStream;
  private _nextTextNeedsBlank: boolean;
  private _lastLineWasText: boolean;
  private _lastLineWasCloseScope: boolean;

  constructor(filePath: string) {
    this._streamWriter = fs.createWriteStream(filePath);

    this._nextTextNeedsBlank = false;
    this._lastLineWasText = false;
    this._lastLineWasCloseScope = false;
  }

  close(): void {
    if (this._lastLineWasCloseScope) {
      this._streamWriter.write("\r\n");
    }
    this._streamWriter.end();
  }

  break(): void {
    if (this._lastLineWasText) {
      this._nextTextNeedsBlank = true;
      this._lastLineWasText = false;
      this._lastLineWasCloseScope = false;
    }
  }

  openScope(suppressNewLine: boolean = false): void {
    if (suppressNewLine) {
      this._streamWriter.write("{");
    } else {
      this._streamWriter.write("{\r\n");
    }
    this._nextTextNeedsBlank = false;
    this._lastLineWasText = false;
    this._lastLineWasCloseScope = false;
  }

  closeScope(): void {
    if (this._lastLineWasCloseScope) {
      this._streamWriter.write("\r\n}");
    } else {
      this._streamWriter.write("}");
    }
    this._nextTextNeedsBlank = true;
    this._lastLineWasText = false;
    this._lastLineWasCloseScope = true;
  }

  writeLine(text: string, suppressNewLine = false, suppressBreak = false): void {
    if (this._nextTextNeedsBlank) {
      if (!suppressBreak) {
        if (this._lastLineWasCloseScope) {
          this._streamWriter.write("\r\n");
        }
        this._streamWriter.write("\r\n");
      }

      this._nextTextNeedsBlank = false;
    }
    if (suppressNewLine) {
      this._streamWriter.write(`${text}`);
    } else {
      this._streamWriter.write(`${text}\r\n`);
    }
    this._lastLineWasText = true;
    this._lastLineWasCloseScope = false;
  }
}
