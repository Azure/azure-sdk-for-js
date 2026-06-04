// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import { toLlmInput } from "../../../src/index.js";
import {
  _buildFrontMatter,
  _compressPageNumbers,
  _resolveFields,
  _yamlScalar,
} from "../../../src/static-helpers/llmInputHelper.js";
import type {
  AnalysisContentUnion,
  AnalysisResult,
  ArrayField,
  AudioVisualContent,
  ContentFieldUnion,
  DocumentContent,
  DocumentContentSegment,
  DocumentPage,
  JsonField,
  NumberField,
  ObjectField,
  StringField,
} from "../../../src/index.js";

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

function stringField(value: string): StringField {
  return { type: "string", fieldType: "string", value };
}

function numberField(value: number): NumberField {
  return { type: "number", fieldType: "number", value };
}

function objectField(value: Record<string, ContentFieldUnion>): ObjectField {
  return { type: "object", fieldType: "object", value };
}

function arrayField(value: ContentFieldUnion[]): ArrayField {
  return { type: "array", fieldType: "array", value };
}

function jsonField(value: unknown): JsonField {
  return { type: "json", fieldType: "json", value };
}

function makeResult(
  contents: AnalysisContentUnion[],
  warnings?: AnalysisResult["warnings"],
): AnalysisResult {
  return {
    analyzerId: "test-analyzer",
    apiVersion: "2025-11-01",
    contents,
    warnings,
  };
}

function makeDocument(overrides: Partial<DocumentContent> = {}): DocumentContent {
  return {
    kind: "document",
    mimeType: "application/pdf",
    startPageNumber: 1,
    endPageNumber: 1,
    ...overrides,
  };
}

function makeAv(overrides: Partial<AudioVisualContent> = {}): AudioVisualContent {
  return {
    kind: "audioVisual",
    mimeType: "video/mp4",
    startTimeMs: 0,
    endTimeMs: 0,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Public API basics
// ---------------------------------------------------------------------------

describe("toLlmInput - public API", () => {
  it("returns empty string when contents is empty", () => {
    assert.equal(toLlmInput(makeResult([])), "");
  });

  it("throws on null/undefined input", () => {
    expect(() => toLlmInput(undefined as unknown as AnalysisResult)).toThrow(TypeError);
    expect(() => toLlmInput(null as unknown as AnalysisResult)).toThrow(TypeError);
  });

  it("emits a contentType-only front matter when no fields/markdown present", () => {
    const text = toLlmInput(makeResult([makeDocument({ startPageNumber: 0, endPageNumber: 0 })]));
    assert.equal(text, "---\ncontentType: document\n---");
  });

  it("includes user metadata between contentType and auto-detected keys", () => {
    const text = toLlmInput(makeResult([makeDocument({ markdown: "Hello" })]), {
      metadata: { source: "invoice.pdf", department: "finance" },
    });
    assert.match(text, /^---\ncontentType: document\nsource: invoice\.pdf\ndepartment: finance\n/);
  });
});

// ---------------------------------------------------------------------------
// Reserved metadata key validation
// ---------------------------------------------------------------------------

describe("toLlmInput - reserved metadata keys", () => {
  const reservedKeys = ["contentType", "timeRange", "category", "pages", "fields", "rai_warnings"];
  for (const key of reservedKeys) {
    it(`rejects reserved key '${key}'`, () => {
      expect(() =>
        toLlmInput(makeResult([makeDocument()]), {
          metadata: { [key]: "x" },
        }),
      ).toThrow(/reserved front matter key/);
    });
  }

  it("lists multiple reserved keys sorted", () => {
    expect(() =>
      toLlmInput(makeResult([makeDocument()]), {
        metadata: { pages: "1", contentType: "doc" },
      }),
    ).toThrow(/contentType, pages/);
  });

  it("accepts custom metadata keys", () => {
    const text = toLlmInput(makeResult([makeDocument()]), {
      metadata: { source: "x", documentId: "abc" },
    });
    assert.include(text, "source: x");
    assert.include(text, "documentId: abc");
  });
});

// ---------------------------------------------------------------------------
// Field resolution
// ---------------------------------------------------------------------------

describe("_resolveFields", () => {
  it("flattens leaf, object, and array fields recursively", () => {
    const fields: Record<string, ContentFieldUnion> = {
      VendorName: stringField("CONTOSO"),
      Total: objectField({
        Amount: numberField(165),
        CurrencyCode: stringField("USD"),
      }),
      LineItems: arrayField([
        objectField({
          Description: stringField("Consulting"),
          Quantity: numberField(2),
        }),
      ]),
    };
    assert.deepEqual(_resolveFields(fields), {
      VendorName: "CONTOSO",
      Total: { Amount: 165, CurrencyCode: "USD" },
      LineItems: [{ Description: "Consulting", Quantity: 2 }],
    });
  });

  it("returns Date fields as ISO YYYY-MM-DD strings", () => {
    const fields: Record<string, ContentFieldUnion> = {
      InvoiceDate: { type: "date", fieldType: "date", value: new Date("2019-11-15T00:00:00Z") },
    };
    assert.deepEqual(_resolveFields(fields), { InvoiceDate: "2019-11-15" });
  });

  it("drops null/undefined leaf values", () => {
    const fields: Record<string, ContentFieldUnion> = {
      Empty: { type: "string", fieldType: "string", value: undefined } as ContentFieldUnion,
      Present: stringField("ok"),
    };
    assert.deepEqual(_resolveFields(fields), { Present: "ok" });
  });
});

// ---------------------------------------------------------------------------
// Structured YAML for JSON fields (alignment with Python/.NET)
// ---------------------------------------------------------------------------

describe("toLlmInput - JsonField rendering", () => {
  it("renders nested JSON as structured YAML (not a quoted string)", () => {
    const fields: Record<string, ContentFieldUnion> = {
      Address: jsonField({ street: "1 Main", city: "Redmond" }),
    };
    const text = toLlmInput(makeResult([makeDocument({ fields })]));
    assert.include(text, "fields:");
    assert.include(text, "  Address:");
    assert.include(text, "    street: 1 Main");
    assert.include(text, "    city: Redmond");
    assert.notInclude(text, '\'{"street"');
  });
});

// ---------------------------------------------------------------------------
// Pages / page markers
// ---------------------------------------------------------------------------

describe("toLlmInput - pages", () => {
  it("compresses non-contiguous page numbers", () => {
    assert.equal(_compressPageNumbers([2, 3, 5]), "2-3, 5");
    assert.equal(_compressPageNumbers([1, 2, 3]), "1-3");
    assert.equal(_compressPageNumbers([1]), 1);
  });

  it("renders <!-- page N --> markers from pages[].spans", () => {
    const markdown = "Page1Content\nPage2Content";
    const pages: DocumentPage[] = [
      { pageNumber: 1, spans: [{ offset: 0, length: 13 }] },
      { pageNumber: 2, spans: [{ offset: 13, length: 12 }] },
    ];
    const text = toLlmInput(
      makeResult([makeDocument({ markdown, pages, startPageNumber: 1, endPageNumber: 2 })]),
    );
    assert.include(text, "<!-- page 1 -->");
    assert.include(text, "<!-- page 2 -->");
    assert.include(text, "pages: 1-2");
  });

  it("falls back to PageBreak splitting using startPageNumber", () => {
    const markdown = "First page text\n<!-- PageBreak -->\nSecond page text";
    const text = toLlmInput(
      makeResult([makeDocument({ markdown, startPageNumber: 3, endPageNumber: 4 })]),
    );
    assert.include(text, "<!-- page 3 -->");
    assert.include(text, "<!-- page 4 -->");
    assert.include(text, "First page text");
    assert.include(text, "Second page text");
  });
});

// ---------------------------------------------------------------------------
// Audio / video segments
// ---------------------------------------------------------------------------

describe("toLlmInput - audio/visual", () => {
  it("omits timeRange for single AV content", () => {
    const text = toLlmInput(
      makeResult([makeAv({ startTimeMs: 0, endTimeMs: 23000, markdown: "Speaker 1: ..." })]),
    );
    assert.include(text, "contentType: audioVisual");
    assert.notInclude(text, "timeRange:");
  });

  it("emits per-segment front matter with timeRange and ***** separator", () => {
    const text = toLlmInput(
      makeResult([
        makeAv({ startTimeMs: 0, endTimeMs: 23000, markdown: "Seg 1" }),
        makeAv({ startTimeMs: 24000, endTimeMs: 43000, markdown: "Seg 2" }),
      ]),
    );
    assert.include(text, "timeRange: 00:00 \u2013 00:23");
    assert.include(text, "timeRange: 00:24 \u2013 00:43");
    assert.include(text, "*****");
  });

  it("preserves service order across multiple AV segments", () => {
    const text = toLlmInput(
      makeResult([
        makeAv({ startTimeMs: 0, endTimeMs: 1000, markdown: "First" }),
        makeAv({ startTimeMs: 1000, endTimeMs: 2000, markdown: "Second" }),
        makeAv({ startTimeMs: 2000, endTimeMs: 3000, markdown: "Third" }),
      ]),
    );
    const firstIdx = text.indexOf("First");
    const secondIdx = text.indexOf("Second");
    const thirdIdx = text.indexOf("Third");
    assert.isTrue(firstIdx < secondIdx && secondIdx < thirdIdx);
  });
});

// ---------------------------------------------------------------------------
// Document classification expansion
// ---------------------------------------------------------------------------

describe("toLlmInput - classification expansion", () => {
  function makeSeg(
    overrides: Partial<DocumentContentSegment> & {
      offset: number;
      length: number;
    },
  ): DocumentContentSegment {
    const { offset, length, ...rest } = overrides;
    return {
      segmentId: "s1",
      category: "Invoice",
      span: { offset, length },
      startPageNumber: 1,
      endPageNumber: 1,
      ...rest,
    };
  }

  it("expands a parent into per-segment blocks separated by *****", () => {
    const parent = makeDocument({
      markdown: "INVOICE A\n\nBANK STATEMENT B",
      startPageNumber: 1,
      endPageNumber: 2,
      path: "input1",
      segments: [
        makeSeg({
          segmentId: "s1",
          category: "Invoice",
          startPageNumber: 1,
          endPageNumber: 1,
          offset: 0,
          length: 9,
        }),
        makeSeg({
          segmentId: "s2",
          category: "BankStatement",
          startPageNumber: 2,
          endPageNumber: 2,
          offset: 11,
          length: 16,
        }),
      ],
    });
    const text = toLlmInput(makeResult([parent]));
    assert.include(text, "category: Invoice");
    assert.include(text, "category: BankStatement");
    assert.include(text, "*****");
    assert.include(text, "INVOICE A");
    assert.include(text, "BANK STATEMENT B");
  });

  it("uses routed top-level content (with fields) instead of synthetic expansion", () => {
    const parent = makeDocument({
      markdown: "INVOICE A\n\nBANK STATEMENT B",
      startPageNumber: 1,
      endPageNumber: 2,
      path: "input1",
      segments: [
        makeSeg({
          segmentId: "s1",
          category: "Invoice",
          startPageNumber: 1,
          endPageNumber: 1,
          offset: 0,
          length: 9,
        }),
        makeSeg({
          segmentId: "s2",
          category: "BankStatement",
          startPageNumber: 2,
          endPageNumber: 2,
          offset: 11,
          length: 16,
        }),
      ],
    });
    const routed = makeDocument({
      path: "input1/s1",
      category: "Invoice",
      markdown: "ROUTED INVOICE",
      startPageNumber: 1,
      endPageNumber: 1,
      fields: { VendorName: stringField("CONTOSO") },
    });
    const text = toLlmInput(makeResult([parent, routed]));
    assert.include(text, "VendorName: CONTOSO");
    assert.include(text, "ROUTED INVOICE");
    assert.notInclude(text, "INVOICE A"); // synthetic Invoice segment was skipped
    assert.include(text, "BANK STATEMENT B");
  });

  it("sorts classification blocks by start page number", () => {
    const parent = makeDocument({
      markdown: "P3\n\nP1",
      startPageNumber: 1,
      endPageNumber: 3,
      segments: [
        makeSeg({
          segmentId: "later",
          category: "B",
          startPageNumber: 3,
          endPageNumber: 3,
          offset: 0,
          length: 2,
        }),
        makeSeg({
          segmentId: "earlier",
          category: "A",
          startPageNumber: 1,
          endPageNumber: 1,
          offset: 4,
          length: 2,
        }),
      ],
    });
    const text = toLlmInput(makeResult([parent]));
    assert.isTrue(text.indexOf("category: A") < text.indexOf("category: B"));
  });
});

// ---------------------------------------------------------------------------
// includeFields / includeMarkdown / RAI warnings
// ---------------------------------------------------------------------------

describe("toLlmInput - include flags and warnings", () => {
  it("omits fields block when includeFields=false", () => {
    const text = toLlmInput(
      makeResult([
        makeDocument({
          markdown: "body",
          fields: { VendorName: stringField("CONTOSO") },
        }),
      ]),
      { includeFields: false },
    );
    assert.notInclude(text, "fields:");
    assert.include(text, "body");
  });

  it("omits markdown body when includeMarkdown=false", () => {
    const text = toLlmInput(
      makeResult([
        makeDocument({
          markdown: "body",
          fields: { VendorName: stringField("CONTOSO") },
        }),
      ]),
      { includeMarkdown: false },
    );
    assert.include(text, "VendorName: CONTOSO");
    assert.notInclude(text, "body");
  });

  it("always includes rai_warnings even when both include flags are false", () => {
    const text = toLlmInput(
      makeResult(
        [makeDocument({ markdown: "body", fields: { Foo: stringField("bar") } })],
        [{ code: "hate", message: "Flagged content." }],
      ),
      { includeFields: false, includeMarkdown: false },
    );
    assert.include(text, "rai_warnings:");
    assert.include(text, "code: hate");
    assert.include(text, "message: Flagged content.");
  });
});

// ---------------------------------------------------------------------------
// YAML scalar quoting
// ---------------------------------------------------------------------------

describe("_yamlScalar quoting", () => {
  it("quotes booleans/dates/numbers/special characters", () => {
    assert.equal(_yamlScalar("true"), "'true'");
    assert.equal(_yamlScalar("2019-11-15"), "'2019-11-15'");
    assert.equal(_yamlScalar("123"), "'123'");
    assert.equal(_yamlScalar(""), "''");
    assert.equal(_yamlScalar("a: b"), "'a: b'");
    assert.equal(_yamlScalar("hello"), "hello");
    assert.equal(_yamlScalar(true), "true");
    assert.equal(_yamlScalar(0), "0");
    assert.equal(_yamlScalar(null), "null");
  });

  it("escapes single quotes by doubling when quoting is required", () => {
    // Leading apostrophe forces quoting; the inner apostrophe is then doubled.
    assert.equal(_yamlScalar("'quoted's"), "'''quoted''s'");
  });
});

// ---------------------------------------------------------------------------
// Front matter layout
// ---------------------------------------------------------------------------

describe("_buildFrontMatter", () => {
  it("emits ordered keys with stable indentation", () => {
    const text = _buildFrontMatter([
      ["contentType", "document"],
      ["source", "invoice.pdf"],
      ["fields", { VendorName: "CONTOSO" }],
    ]);
    assert.equal(
      text,
      "---\ncontentType: document\nsource: invoice.pdf\nfields:\n  VendorName: CONTOSO\n---",
    );
  });
});
