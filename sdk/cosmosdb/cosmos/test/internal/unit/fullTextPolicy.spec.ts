// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FullTextPolicy, FullTextPath } from "../../../src/documents/FullTextPolicy.js";
import { describe, it, assert } from "vitest";

/**
 * Tests for FullTextPolicy and FullTextPath with all supported languages.
 * This test suite validates that the SDK correctly handles all supported language codes
 * for full text search policy.
 *
 * GA Languages: en-US, fr-FR, de-DE, es-ES
 * Preview Languages: it-IT, pt-BR, pt-PT
 */
describe("FullTextPolicy multi-language support", { timeout: 10000 }, () => {
  // All supported languages for FullTextPolicy
  const supportedLanguages = [
    "en-US", // English (United States) - GA
    "fr-FR", // French (France) - GA
    "de-DE", // German (Germany) - GA
    "es-ES", // Spanish (Spain) - GA
    "it-IT", // Italian (Italy) - Preview
    "pt-BR", // Portuguese (Brazil) - Preview
    "pt-PT", // Portuguese (Portugal) - Preview
  ];

  describe("FullTextPolicy serialization with all supported languages", () => {
    supportedLanguages.forEach((language) => {
      it(`should serialize FullTextPolicy with defaultLanguage: ${language}`, () => {
        const fullTextPolicy: FullTextPolicy = {
          defaultLanguage: language,
          fullTextPaths: [
            { path: "/text1", language: language },
            { path: "/text2", language: language },
          ],
        };

        // Serialize to JSON
        const serialized = JSON.stringify(fullTextPolicy);

        // Verify serialization contains expected values
        assert(serialized.includes(`"defaultLanguage":"${language}"`));
        assert(serialized.includes(`"language":"${language}"`));

        // Deserialize back
        const deserialized: FullTextPolicy = JSON.parse(serialized);

        // Verify deserialization
        assert.strictEqual(deserialized.defaultLanguage, language);
        assert.strictEqual(deserialized.fullTextPaths.length, 2);
        assert.strictEqual(deserialized.fullTextPaths[0].language, language);
        assert.strictEqual(deserialized.fullTextPaths[1].language, language);
      });
    });
  });

  describe("FullTextPath serialization with all supported languages", () => {
    supportedLanguages.forEach((language) => {
      it(`should serialize FullTextPath with language: ${language}`, () => {
        const fullTextPath: FullTextPath = {
          path: "/testPath",
          language: language,
        };

        // Serialize to JSON
        const serialized = JSON.stringify(fullTextPath);

        // Verify serialization contains expected values
        assert(serialized.includes(`"language":"${language}"`));
        assert(serialized.includes(`"path":"/testPath"`));

        // Deserialize back
        const deserialized: FullTextPath = JSON.parse(serialized);

        // Verify deserialization
        assert.strictEqual(deserialized.path, "/testPath");
        assert.strictEqual(deserialized.language, language);
      });
    });
  });

  describe("FullTextPolicy with mixed languages", () => {
    it("should support different languages for defaultLanguage and fullTextPaths", () => {
      const fullTextPolicy: FullTextPolicy = {
        defaultLanguage: "en-US",
        fullTextPaths: [
          { path: "/englishText", language: "en-US" },
          { path: "/frenchText", language: "fr-FR" },
          { path: "/germanText", language: "de-DE" },
          { path: "/spanishText", language: "es-ES" },
          { path: "/italianText", language: "it-IT" },
          { path: "/portugueseBrazilText", language: "pt-BR" },
          { path: "/portuguesePortugalText", language: "pt-PT" },
        ],
      };

      // Serialize to JSON
      const serialized = JSON.stringify(fullTextPolicy);

      // Deserialize back
      const deserialized: FullTextPolicy = JSON.parse(serialized);

      // Verify all paths are correctly serialized/deserialized
      assert.strictEqual(deserialized.defaultLanguage, "en-US");
      assert.strictEqual(deserialized.fullTextPaths.length, 7);
      assert.strictEqual(deserialized.fullTextPaths[0].language, "en-US");
      assert.strictEqual(deserialized.fullTextPaths[1].language, "fr-FR");
      assert.strictEqual(deserialized.fullTextPaths[2].language, "de-DE");
      assert.strictEqual(deserialized.fullTextPaths[3].language, "es-ES");
      assert.strictEqual(deserialized.fullTextPaths[4].language, "it-IT");
      assert.strictEqual(deserialized.fullTextPaths[5].language, "pt-BR");
      assert.strictEqual(deserialized.fullTextPaths[6].language, "pt-PT");
    });
  });

  describe("FullTextPolicy with language codes", () => {
    it("should support numeric language codes (LCID)", () => {
      // Numeric language codes (LCID - Locale ID) are also supported
      const fullTextPolicy: FullTextPolicy = {
        defaultLanguage: "en-US",
        fullTextPaths: [
          { path: "/text1", language: "1033" }, // English LCID
          { path: "/text2", language: "en-US" }, // BCP-47 format
        ],
      };

      // Serialize to JSON
      const serialized = JSON.stringify(fullTextPolicy);

      // Deserialize back
      const deserialized: FullTextPolicy = JSON.parse(serialized);

      // Verify both formats are preserved
      assert.strictEqual(deserialized.fullTextPaths[0].language, "1033");
      assert.strictEqual(deserialized.fullTextPaths[1].language, "en-US");
    });
  });

  describe("FullTextPolicy structure validation", () => {
    it("should correctly structure FullTextPolicy object", () => {
      const fullTextPolicy: FullTextPolicy = {
        defaultLanguage: "fr-FR",
        fullTextPaths: [
          { path: "/title", language: "fr-FR" },
          { path: "/description", language: "fr-FR" },
        ],
      };

      // Verify structure
      assert.isDefined(fullTextPolicy.defaultLanguage);
      assert.isArray(fullTextPolicy.fullTextPaths);
      assert.strictEqual(fullTextPolicy.fullTextPaths.length, 2);

      // Verify each path has required properties
      fullTextPolicy.fullTextPaths.forEach((pathItem) => {
        assert.isDefined(pathItem.path);
        assert.isDefined(pathItem.language);
        assert.isString(pathItem.path);
        assert.isString(pathItem.language);
      });
    });

    it("should handle empty fullTextPaths array", () => {
      const fullTextPolicy: FullTextPolicy = {
        defaultLanguage: "de-DE",
        fullTextPaths: [],
      };

      const serialized = JSON.stringify(fullTextPolicy);
      const deserialized: FullTextPolicy = JSON.parse(serialized);

      assert.strictEqual(deserialized.defaultLanguage, "de-DE");
      assert.isArray(deserialized.fullTextPaths);
      assert.strictEqual(deserialized.fullTextPaths.length, 0);
    });
  });

  describe("FullTextPolicy for container definition", () => {
    supportedLanguages.forEach((language) => {
      it(`should create valid container definition with FullTextPolicy using ${language}`, () => {
        // This simulates what a container definition would look like
        const containerDefinition = {
          id: `test-container-${language}`,
          partitionKey: { paths: ["/pk"] },
          fullTextPolicy: {
            defaultLanguage: language,
            fullTextPaths: [{ path: "/searchableText", language: language }],
          },
          indexingPolicy: {
            includedPaths: [{ path: "/*" }],
            excludedPaths: [{ path: '/"_etag"/?' }],
            fullTextIndexes: [{ path: "/searchableText" }],
          },
        };

        const serialized = JSON.stringify(containerDefinition);
        const deserialized = JSON.parse(serialized);

        assert.strictEqual(deserialized.fullTextPolicy.defaultLanguage, language);
        assert.strictEqual(deserialized.fullTextPolicy.fullTextPaths[0].language, language);
        assert.strictEqual(deserialized.fullTextPolicy.fullTextPaths[0].path, "/searchableText");
      });
    });
  });
});
