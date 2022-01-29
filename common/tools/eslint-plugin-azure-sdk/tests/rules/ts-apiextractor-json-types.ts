// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-package-json-types rule.
 * @author Arpan Laha
 * @author Will Temple
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-apiextractor-json-types";

//------------------------------------------------------------------------------
// Example files
//------------------------------------------------------------------------------

const exampleConfigGood = `{
  "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
  "mainEntryPointFilePath": "types/src/index.d.ts",
  "docModel": {
    "enabled": false
  },
  "apiReport": {
    "enabled": true,
    "reportFolder": "./review"
  },
  "dtsRollup": {
    "enabled": true,
    "untrimmedFilePath": "",
    "publicTrimmedFilePath": "./types/template.d.ts"
  },
  "messages": {
    "tsdocMessageReporting": {
      "default": {
        "logLevel": "none"
      }
    },
    "extractorMessageReporting": {
      "ae-missing-release-tag": {
        "logLevel": "none"
      },
      "ae-unresolved-link": {
        "logLevel": "none"
      }
    }
  }
}`;

const exampleConfigBad = `{
  "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
  "mainEntryPointFilePath": "types/src/index.d.ts",
  "docModel": {
    "enabled": false
  },
  "apiReport": {
    "enabled": true,
    "reportFolder": "./review"
  },
  "dtsRollup": {
    "enabled": true,
    "untrimmedFilePath": "",
    "publicTrimmedFilePath": "./types/azure-template.d.ts"
  },
  "messages": {
    "tsdocMessageReporting": {
      "default": {
        "logLevel": "none"
      }
    },
    "extractorMessageReporting": {
      "ae-missing-release-tag": {
        "logLevel": "none"
      },
      "ae-unresolved-link": {
        "logLevel": "none"
      }
    }
  }
}`;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json",
  },
});

ruleTester.run("ts-package-json-types", rule, {
  valid: [
    {
      // only the fields we care about
      code: '{"dtsRollup": {"publicTrimmedFilePath": "typings/package-a.d.ts"}}',
      filename: "sdk/package/package-a/api-extractor.json",
    },
    {
      // a full example package.json (taken from https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/package.json with "scripts" removed for testing purposes)
      code: exampleConfigGood,
      filename: "sdk/template/template/api-extractor.json",
    },
    {
      // only the fields we care about
      code: '{"dtsRollup": {"publicTrimmedFilePath": "typings/package-a.d.ts"}}',
      filename: "sdk/package/package-a/not_api-extractor.json",
    },
  ],
  invalid: [
    {
      code: '{"notDTSRollup": {}}',
      filename: "sdk/package/package-a/api-extractor.json",
      errors: [
        {
          message: "dtsRollup does not exist at the outermost level",
        },
      ],
    },
    {
      // dtsRollup exists but doesn't specify publicTrimmedFilePath
      code: `{"dtsRollup": {"notPublicTrimmedFilePath": ""}}`,
      filename: "sdk/package/package-a/api-extractor.json",
      errors: [
        {
          message: "publicTrimmedFilePath is not a member of dtsRollup",
        },
      ],
    },
    {
      // dtsRollup is in a nested object
      code: '{"outer": {"dtsRollup": {"publicTrimmedFilePath" : "./types/package-a.d.ts"}}}',
      filename: "sdk/package/package-a/api-extractor.json",
      errors: [
        {
          message: "dtsRollup does not exist at the outermost level",
        },
      ],
    },
    {
      // publicTrimmedFilePath is not a direct child of dtsRollup
      code: `{"dtsRollup": {"outer": {"publicTrimmedFilePath": "./types/package-a.d.ts"}}}`,
      filename: "sdk/package/package-a/api-extractor.json",
      errors: [
        {
          message: "publicTrimmedFilePath is not a member of dtsRollup",
        },
      ],
    },
    {
      // publicTrimmedFilePath set to a non-string literal
      code: `{"dtsRollup": {"publicTrimmedFilePath": {}}}`,
      filename: "sdk/package/package-a/api-extractor.json",
      errors: [
        {
          message: ".d.ts rollup path is not set to a string",
        },
      ],
    },
    {
      // only the fields we care about
      code: '{"dtsRollup": {"publicTrimmedFilePath": "./typings/package-a.ts"}}',
      filename: "sdk/package/package-a/api-extractor.json",
      errors: [
        {
          message: "provided .d.ts rollup path is not a TypeScript declaration file",
        },
      ],
    },
    {
      // types output does not match filename
      code: exampleConfigBad,
      filename: "sdk/template/template/api-extractor.json",
      errors: [
        {
          message:
            "provided .d.ts rollup path should be named 'template.d.ts' after the package directory",
        },
      ],
    },
  ],
});
