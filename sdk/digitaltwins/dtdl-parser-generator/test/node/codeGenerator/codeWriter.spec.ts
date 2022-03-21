// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CodeWriter } from "../../../src/codeGenerator/codeWriter";
import { expect } from "chai";
import fs from "fs";
import sinon from "sinon";

describe("Code Writer", function() {
  afterEach(function() {
    sinon.restore();
  });

  it("open brace", function() {
    const fakeWrite = sinon.stub();
    const fakeEnd = sinon.stub();
    const fakeStreamWriter = { write: fakeWrite, end: fakeEnd };
    sinon.stub(fs, "createWriteStream").callsFake((path): any => {
      expect(path).to.equal("fakeFilePath");
      return fakeStreamWriter;
    });
    const codeWriter = new CodeWriter("fakeFilePath");
    codeWriter.openScope();
    expect(fakeWrite.getCall(0).args[0]).to.equal("{\r\n");
  });

  it("close brace", function() {
    const fakeWrite = sinon.stub();
    const fakeEnd = sinon.stub();
    const fakeStreamWriter = { write: fakeWrite, end: fakeEnd };
    sinon.stub(fs, "createWriteStream").callsFake((path): any => {
      expect(path).to.equal("fakeFilePath");
      return fakeStreamWriter;
    });
    const codeWriter = new CodeWriter("fakeFilePath");
    codeWriter.closeScope();
    expect(fakeWrite.getCall(0).args[0]).to.equal("}");
  });

  it("write line", function() {
    const fakeWrite = sinon.stub();
    const fakeEnd = sinon.stub();
    const fakeStreamWriter = { write: fakeWrite, end: fakeEnd };
    sinon.stub(fs, "createWriteStream").callsFake((path): any => {
      expect(path).to.equal("fakeFilePath");
      return fakeStreamWriter;
    });
    const codeWriter = new CodeWriter("fakeFilePath");
    codeWriter.writeLine("test code.");
    expect(fakeWrite.getCall(0).args[0]).to.equal("test code.\r\n");
  });

  it("close stream", function() {
    const fakeWrite = sinon.stub();
    const fakeEnd = sinon.stub();
    const fakeStreamWriter = { write: fakeWrite, end: fakeEnd };
    sinon.stub(fs, "createWriteStream").callsFake((path): any => {
      expect(path).to.equal("fakeFilePath");
      return fakeStreamWriter;
    });
    const codeWriter = new CodeWriter("fakeFilePath");
    codeWriter.close();
    expect(fakeEnd.callCount).to.equal(1);
  });
});
