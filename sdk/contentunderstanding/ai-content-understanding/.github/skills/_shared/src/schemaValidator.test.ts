// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Unit tests for schemaValidator.ts. Mirrors Python's
 * tests/test_skills_shared_schema_validator.py, the .NET
 * SkillSchemaValidatorTests.cs, and the Java SchemaValidatorTest.java.
 * Pure native — no @azure/* deps, enforced by a purity guard test below.
 */

import { strict as assert } from "node:assert";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  KNOWN_BASE_ANALYZER_IDS,
  validate,
  validateFile,
  validateString,
} from "./schemaValidator.js";

describe("SchemaValidator — valid schemas", () => {
  it("accepts a valid single-type schema", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      fieldSchema: {
        fields: {
          invoiceNumber: {
            type: "string",
            method: "extract",
            description: "Invoice number printed at the top right.",
          },
        },
      },
    });
    assert.equal(r.ok, true, `Errors: ${r.errors.join("; ")}`);
    assert.deepEqual(r.errors, []);
  });

  it("accepts a valid classify-and-route schema", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      config: {
        enableSegment: true,
        contentCategories: {
          invoice: {
            description: "Pages whose top heading is 'Invoice'.",
            analyzerId: "invoice_extractor_v1",
          },
          bank_statement: {
            description: "Pages whose top heading is 'Bank Statement'.",
            analyzerId: "bank_statement_extractor_v1",
          },
        },
      },
    });
    assert.equal(r.ok, true, `Errors: ${r.errors.join("; ")}`);
  });

  it("allows classify-route category without analyzerId (catch-all 'other' bucket)", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      config: {
        enableSegment: true,
        contentCategories: {
          invoice: { description: "Invoices.", analyzerId: "inv" },
          other: { description: "Anything else." },
        },
      },
    });
    assert.equal(r.ok, true, `Errors: ${r.errors.join("; ")}`);
  });
});

describe("SchemaValidator — single-type rejections", () => {
  it("rejects unknown baseAnalyzerId (catches prebuilt-documentAnalyzer typo)", () => {
    // The service returns InvalidBaseAnalyzerId without a useful message,
    // so we catch it locally with the actual allow-list.
    const r = validate({
      baseAnalyzerId: "prebuilt-documentAnalyzer",
      fieldSchema: { fields: { x: { type: "string" } } },
    });
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("baseAnalyzerId")));
    assert.ok(r.errors.some((e) => e.includes("prebuilt-documentAnalyzer")));
  });

  it("rejects missing fieldSchema on non-classifier", () => {
    const r = validate({ baseAnalyzerId: "prebuilt-document" });
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("fieldSchema")));
  });

  it("rejects empty fields object", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      fieldSchema: { fields: {} },
    });
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("at least one field")));
  });

  it("rejects unknown field type", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      fieldSchema: { fields: { x: { type: "float" } } },
    });
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("'float'")));
  });

  it("rejects unknown field method", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      fieldSchema: { fields: { x: { type: "string", method: "infer" } } },
    });
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("'infer'")));
  });

  it("recurses into object.properties", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      fieldSchema: {
        fields: {
          billTo: {
            type: "object",
            properties: {
              name: { type: "bogus" },
            },
          },
        },
      },
    });
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("billTo")));
    assert.ok(r.errors.some((e) => e.includes("'bogus'")));
  });

  it("recurses into array.items", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      fieldSchema: {
        fields: {
          lineItems: {
            type: "array",
            items: { type: "nope" },
          },
        },
      },
    });
    assert.equal(r.ok, false);
    // Path uses bracketed notation: fieldSchema.fields['lineItems'].items.type
    assert.ok(r.errors.some((e) => e.includes("'lineItems'")));
    assert.ok(r.errors.some((e) => e.includes(".items.type")));
    assert.ok(r.errors.some((e) => e.includes("'nope'")));
  });
});

describe("SchemaValidator — classify-and-route rejections", () => {
  it("rejects classify-route with top-level fieldSchema", () => {
    // Field extraction belongs in inner analyzers, not the outer classifier.
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      fieldSchema: { fields: { x: { type: "string" } } },
      config: {
        enableSegment: true,
        contentCategories: {
          invoice: { description: "d", analyzerId: "a" },
        },
      },
    });
    assert.equal(r.ok, false);
    assert.ok(
      r.errors.some((e) => e.includes("fieldSchema") && e.includes("inner")),
    );
  });

  it("rejects classify-route without enableSegment", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      config: {
        contentCategories: {
          invoice: { description: "d", analyzerId: "a" },
        },
      },
    });
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("enableSegment")));
  });

  it("rejects empty category description", () => {
    const r = validate({
      baseAnalyzerId: "prebuilt-document",
      config: {
        enableSegment: true,
        contentCategories: {
          invoice: { description: "  ", analyzerId: "a" },
        },
      },
    });
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("description")));
  });
});

describe("SchemaValidator — file loading", () => {
  it("reports missing file", () => {
    const missing = join(tmpdir(), `definitely-not-there-${Date.now()}.json`);
    const r = validateFile(missing);
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("not found")));
  });

  it("reports invalid JSON", () => {
    const tmp = mkdtempSync(join(tmpdir(), "skill-validator-"));
    try {
      const p = join(tmp, "broken.json");
      writeFileSync(p, "{ this is not json");
      const r = validateFile(p);
      assert.equal(r.ok, false);
      assert.ok(r.errors.some((e) => e.includes("not valid JSON")));
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  it("validates a valid schema on disk", () => {
    const tmp = mkdtempSync(join(tmpdir(), "skill-validator-"));
    try {
      const p = join(tmp, "valid.json");
      writeFileSync(
        p,
        JSON.stringify({
          baseAnalyzerId: "prebuilt-document",
          fieldSchema: { fields: { x: { type: "string" } } },
        }),
      );
      const r = validateFile(p);
      assert.equal(r.ok, true, `Errors: ${r.errors.join("; ")}`);
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  it("validateString rejects invalid JSON", () => {
    const r = validateString("not json");
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("not valid JSON")));
  });
});

describe("SchemaValidator — allow-list surface", () => {
  it("KNOWN_BASE_ANALYZER_IDS contains only modality prebuilts", () => {
    // Sanity check: the allow-list must NOT include `*Search` variants,
    // `prebuilt-invoice`, or `prebuilt-receipt` — these return
    // `InvalidBaseAnalyzerId` if used as `baseAnalyzerId` for a custom
    // analyzer. Only modality-level prebuilts are valid.
    const expected = new Set([
      "prebuilt-document",
      "prebuilt-audio",
      "prebuilt-video",
      "prebuilt-image",
    ]);
    assert.equal(KNOWN_BASE_ANALYZER_IDS.size, expected.size);
    for (const id of expected) {
      assert.ok(KNOWN_BASE_ANALYZER_IDS.has(id), `missing: ${id}`);
    }
  });
});

describe("SchemaValidator — purity guard", () => {
  it("schemaValidator.ts source does not import @azure/* or http modules", () => {
    // The validator is intentionally pure-TypeScript so it can be unit-tested
    // without spinning up the Azure SDK, and so it can be reused from any
    // context (CI, scripts, samples). Drift would creep in if a future
    // change accidentally pulls in @azure/* or an HTTP client.
    const src = locateSchemaValidatorSource();
    const text = readFileSync(src, "utf-8");
    const forbidden = [
      "from \"@azure/",
      "from '@azure/",
      "import \"@azure/",
      "import '@azure/",
      "node:http",
      "node:https",
      "node:net",
    ];
    for (const pattern of forbidden) {
      assert.ok(
        !text.includes(pattern),
        `schemaValidator.ts must not contain \`${pattern}\` — see _shared/README.md`,
      );
    }
  });
});

function locateSchemaValidatorSource(): string {
  // The test runs from the package root (cwd) — the file is next to this one.
  return join(import.meta.dirname ?? "src", "schemaValidator.ts");
}
