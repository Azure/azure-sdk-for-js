// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-package-json-types rule.
 *
 *
 */

import { createRuleTester } from "../ruleTester";
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
    "publicTrimmedFilePath": "./types/service-bus.d.ts"
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

const ruleTester = createRuleTester();

ruleTester.run("ts-package-json-types", rule, {
  valid: [
    {
      // only the fields we care about
      code: '{"dtsRollup": {"publicTrimmedFilePath": "typings/service-bus.d.ts"}}',
      filename: "service-bus/api-extractor.json",
    },
    {
      // a full example package.json (taken from https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/package.json with "scripts" removed for testing purposes)
      code: exampleConfigGood,
      filename: "service-bus/api-extractor.json",
    },
    {
      // only the fields we care about
      code: '{"dtsRollup": {"publicTrimmedFilePath": "typings/service-bus.d.ts"}}',
      filename: "service-bus/package.json",
    },
  ],
  invalid: [
    {
      code: '{"notDTSRollup": {}}',
      filename: "service-bus/api-extractor.json",
      errors: [
        {
          message: "dtsRollup does not exist at the outermost level",
        },
      ],
    },
    {
      // dtsRollup exists but doesn't specify publicTrimmedFilePath
      code: `{"dtsRollup": {"notPublicTrimmedFilePath": ""}}`,
      filename: "service-bus/api-extractor.json",
      errors: [
        {
          message: "publicTrimmedFilePath is not a member of dtsRollup",
        },
      ],
    },
    {
      // dtsRollup is in a nested object
      code: '{"outer": {"dtsRollup": {"publicTrimmedFilePath" : "./types/package-a.d.ts"}}}',
      filename: "service-bus/api-extractor.json",
      errors: [
        {
          message: "dtsRollup does not exist at the outermost level",
        },
      ],
    },
    {
      // publicTrimmedFilePath is not a direct child of dtsRollup
      code: `{"dtsRollup": {"outer": {"publicTrimmedFilePath": "./types/package-a.d.ts"}}}`,
      filename: "service-bus/api-extractor.json",
      errors: [
        {
          message: "publicTrimmedFilePath is not a member of dtsRollup",
        },
      ],
    },
    {
      // publicTrimmedFilePath set to a non-string literal
      code: `{"dtsRollup": {"publicTrimmedFilePath": {}}}`,
      filename: "service-bus/api-extractor.json",
      errors: [
        {
          message: ".d.ts rollup path is not set to a string",
        },
      ],
    },
    {
      // only the fields we care about
      code: '{"dtsRollup": {"publicTrimmedFilePath": "./typings/package-a.ts"}}',
      filename: "service-bus/api-extractor.json",
      errors: [
        {
          message: "provided .d.ts rollup path is not a TypeScript declaration file",
        },
      ],
    },
    {
      // types output does not match filename
      code: exampleConfigBad,
      filename: "service-bus/api-extractor.json",
      errors: [
        {
          message:
            "provided .d.ts rollup path should be named 'service-bus.d.ts' after the package directory",
        },
      ],
    },
  ],
});
