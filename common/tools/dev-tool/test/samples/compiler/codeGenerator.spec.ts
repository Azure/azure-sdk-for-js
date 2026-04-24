// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { descriptionToFunctionName } from "../../../src/util/samples/compiler/codeGenerator.js";

// ── descriptionToFunctionName ────────────────────────────────────────

describe("descriptionToFunctionName", () => {
  it('"say hello" → "sayHello"', () => {
    expect(descriptionToFunctionName("say hello")).toBe("sayHello");
  });

  it('"create a widget" → "createAWidget"', () => {
    expect(descriptionToFunctionName("create a widget")).toBe("createAWidget");
  });

  it('"list items" → "listItems"', () => {
    expect(descriptionToFunctionName("list items")).toBe("listItems");
  });

  it('"DELETE /items" → "deleteItems"', () => {
    expect(descriptionToFunctionName("DELETE /items")).toBe("deleteItems");
  });

  it('"test 123" → "test123"', () => {
    expect(descriptionToFunctionName("test 123")).toBe("test123");
  });

  it('empty string → "sample"', () => {
    expect(descriptionToFunctionName("")).toBe("sample");
  });

  it('"already camelCase" → "alreadyCamelCase"', () => {
    expect(descriptionToFunctionName("already camelCase")).toBe("alreadyCamelCase");
  });

  it('single word "hello" → "hello"', () => {
    expect(descriptionToFunctionName("hello")).toBe("hello");
  });

  it('"GET /items/:id" → "getItemsId"', () => {
    expect(descriptionToFunctionName("GET /items/:id")).toBe("getItemsId");
  });

  it("starts with digit gets sample prefix", () => {
    expect(descriptionToFunctionName("123 test")).toBe("sample123Test");
  });

  it("splits PascalCase into words", () => {
    expect(descriptionToFunctionName("ReadmeSampleCreateClient")).toBe("readmeSampleCreateClient");
  });

  it("splits PascalCase with acronyms", () => {
    expect(descriptionToFunctionName("GetHTTPSConnection")).toBe("getHttpsConnection");
  });

  it('"import" → "sampleImport"', () => {
    expect(descriptionToFunctionName("import")).toBe("sampleImport");
  });

  it('"delete keys" → "deleteKeys" (not reserved with suffix)', () => {
    expect(descriptionToFunctionName("delete keys")).toBe("deleteKeys");
  });

  it('"delete" → "sampleDelete"', () => {
    expect(descriptionToFunctionName("delete")).toBe("sampleDelete");
  });

  it('"class" → "sampleClass"', () => {
    expect(descriptionToFunctionName("class")).toBe("sampleClass");
  });
});
