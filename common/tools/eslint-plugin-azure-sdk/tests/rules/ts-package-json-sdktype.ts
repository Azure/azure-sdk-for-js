// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-package-json-sdktype rule.
 * @author Ben Zhang
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-package-json-sdktype";

//------------------------------------------------------------------------------
// Example files
//------------------------------------------------------------------------------

const examplePackageGood = `{
  "name": "@azure/event-hubs",
  "sdk-type": "client",
  "version": "5.7.0-beta.1",
  "description": "Azure Event Hubs SDK for JS.",
  "author": "Microsoft Corporation",
  "license": "MIT",
  "homepage": "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/",
  "repository": "github:Azure/azure-sdk-for-js",
  "sideEffects": false,
  "keywords": [
    "azure",
    "cloud",
    "event hubs",
    "events",
    "Azure"
  ],
  "bugs": {
    "url": "https://github.com/Azure/azure-sdk-for-js/issues"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "main": "./dist/index.js",
  "module": "dist-esm/src/index.js",
  "types": "./types/latest/event-hubs.d.ts",
  "typesVersions": {
    "<3.6": {
      "types/latest/*": [
        "types/3.1/*"
      ]
    }
  },
  "browser": {
    "./dist-esm/src/util/runtimeInfo.js": "./dist-esm/src/util/runtimeInfo.browser.js",
    "./dist-esm/test/public/utils/mockService.js": "./dist-esm/test/public/utils/mockService.browser.js"
  },
  "files": [
    "dist/",
    "dist-esm/src/",
    "types/latest/",
    "types/3.1/",
    "README.md",
    "LICENSE"
  ],
  "//metadata": {
    "constantPaths": [
      {
        "path": "src/util/constants.ts",
        "prefix": "version"
      }
    ]
  },
  "//sampleConfiguration": {
    "extraFiles": {
      "./samples-browser": [
        "browser"
      ],
      "./samples-express": [
        "express"
      ]
    },
    "skip": [
      "iothubConnectionString.js",
      "iothubConnectionStringWebsockets.js",
      "useWithIotHub.js",
      "usingAadAuth.js"
    ],
    "productName": "Azure Event Hubs",
    "productSlugs": [
      "azure",
      "azure-event-hubs"
    ],
    "requiredResources": {
      "Azure Event Hub": "https://docs.microsoft.com/azure/event-hubs/event-hubs-create"
    }
  },
  "dependencies": {
    "@azure/abort-controller": "^1.0.0",
    "@azure/core-amqp": "^3.0.0",
    "@azure/core-auth": "^1.3.0",
    "@azure/core-tracing": "1.0.0-preview.13",
    "@azure/logger": "^1.0.0",
    "buffer": "^6.0.0",
    "is-buffer": "^2.0.3",
    "jssha": "^3.1.0",
    "process": "^0.11.10",
    "rhea-promise": "^2.1.0",
    "tslib": "^2.2.0",
    "uuid": "^8.3.0"
  },
  "devDependencies": {
    "@azure/dev-tool": "^1.0.0",
    "@azure/eslint-plugin-azure-sdk": "^3.0.0",
    "@azure/identity": "^2.0.1",
    "@azure/mock-hub": "^1.0.0",
    "@azure/test-utils": "^1.0.0",
    "@azure/test-utils-perf": "^1.0.0",
    "@microsoft/api-extractor": "^7.31.1",
    "@rollup/plugin-commonjs": "11.0.2",
    "@rollup/plugin-inject": "^4.0.0",
    "@rollup/plugin-json": "^4.0.0",
    "@rollup/plugin-multi-entry": "^3.0.0",
    "@rollup/plugin-node-resolve": "^8.0.0",
    "@rollup/plugin-replace": "^2.2.0",
    "@types/async-lock": "^1.1.0",
    "@types/chai": "^4.1.6",
    "@types/chai-as-promised": "^7.1.0",
    "@types/chai-string": "^1.4.1",
    "@types/debug": "^4.1.4",
    "@types/long": "^4.0.0",
    "@types/mocha": "^7.0.2",
    "@types/node": "^14.0.0",
    "@types/sinon": "^9.0.4",
    "@types/uuid": "^8.0.0",
    "@types/ws": "^7.2.4",
    "assert": "^1.4.1",
    "chai": "^4.2.0",
    "chai-as-promised": "^7.1.1",
    "chai-exclude": "^2.0.2",
    "chai-string": "^1.5.0",
    "cross-env": "^7.0.2",
    "debug": "^4.1.1",
    "dotenv": "^16.0.0",
    "downlevel-dts": "~0.4.0",
    "eslint": "^7.15.0",
    "esm": "^3.2.18",
    "https-proxy-agent": "^5.0.0",
    "karma": "^6.2.0",
    "karma-chrome-launcher": "^3.0.0",
    "karma-coverage": "^2.0.0",
    "karma-edge-launcher": "^0.4.2",
    "karma-env-preprocessor": "^0.1.1",
    "karma-firefox-launcher": "^1.1.0",
    "karma-ie-launcher": "^1.0.0",
    "karma-junit-reporter": "^2.0.1",
    "karma-mocha": "^2.0.1",
    "karma-mocha-reporter": "^2.2.5",
    "karma-sourcemap-loader": "^0.3.8",
    "mocha": "^7.1.1",
    "mocha-junit-reporter": "^1.18.0",
    "moment": "^2.24.0",
    "nyc": "^14.0.0",
    "prettier": "^1.16.4",
    "puppeteer": "^10.2.0",
    "rimraf": "^3.0.0",
    "rollup": "^1.16.3",
    "rollup-plugin-shim": "^1.0.0",
    "rollup-plugin-sourcemaps": "^0.4.2",
    "rollup-plugin-terser": "^5.1.1",
    "sinon": "^9.0.2",
    "ts-node": "^10.0.0",
    "typescript": "~4.8.0",
    "ws": "^7.1.1",
    "typedoc": "0.15.2"
  }
}`;

const examplePackageBad = `{
  "name": "@azure/event-hubs",
  "version": "5.7.0-beta.1",
  "description": "Azure Event Hubs SDK for JS.",
  "author": "Microsoft Corporation",
  "license": "MIT",
  "homepage": "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/",
  "repository": "github:Azure/azure-sdk-for-js",
  "sideEffects": false,
  "keywords": [
    "azure",
    "cloud",
    "event hubs",
    "events",
    "Azure"
  ],
  "bugs": {
    "url": "https://github.com/Azure/azure-sdk-for-js/issues"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "main": "./dist/index.js",
  "module": "dist-esm/src/index.js",
  "types": "./types/latest/event-hubs.d.ts",
  "typesVersions": {
    "<3.6": {
      "types/latest/*": [
        "types/3.1/*"
      ]
    }
  },
  "browser": {
    "./dist-esm/src/util/runtimeInfo.js": "./dist-esm/src/util/runtimeInfo.browser.js",
    "./dist-esm/test/public/utils/mockService.js": "./dist-esm/test/public/utils/mockService.browser.js"
  },
  "files": [
    "dist/",
    "dist-esm/src/",
    "types/latest/",
    "types/3.1/",
    "README.md",
    "LICENSE"
  ],
  "//metadata": {
    "constantPaths": [
      {
        "path": "src/util/constants.ts",
        "prefix": "version"
      }
    ]
  },
  "//sampleConfiguration": {
    "extraFiles": {
      "./samples-browser": [
        "browser"
      ],
      "./samples-express": [
        "express"
      ]
    },
    "skip": [
      "iothubConnectionString.js",
      "iothubConnectionStringWebsockets.js",
      "useWithIotHub.js",
      "usingAadAuth.js"
    ],
    "productName": "Azure Event Hubs",
    "productSlugs": [
      "azure",
      "azure-event-hubs"
    ],
    "requiredResources": {
      "Azure Event Hub": "https://docs.microsoft.com/azure/event-hubs/event-hubs-create"
    }
  },
  "dependencies": {
    "@azure/abort-controller": "^1.0.0",
    "@azure/core-amqp": "^3.0.0",
    "@azure/core-auth": "^1.3.0",
    "@azure/core-tracing": "1.0.0-preview.13",
    "@azure/logger": "^1.0.0",
    "buffer": "^6.0.0",
    "is-buffer": "^2.0.3",
    "jssha": "^3.1.0",
    "process": "^0.11.10",
    "rhea-promise": "^2.1.0",
    "tslib": "^2.2.0",
    "uuid": "^8.3.0"
  },
  "devDependencies": {
    "@azure/dev-tool": "^1.0.0",
    "@azure/eslint-plugin-azure-sdk": "^3.0.0",
    "@azure/identity": "^2.0.1",
    "@azure/mock-hub": "^1.0.0",
    "@azure/test-utils": "^1.0.0",
    "@azure/test-utils-perf": "^1.0.0",
    "@microsoft/api-extractor": "^7.31.1",
    "@rollup/plugin-commonjs": "11.0.2",
    "@rollup/plugin-inject": "^4.0.0",
    "@rollup/plugin-json": "^4.0.0",
    "@rollup/plugin-multi-entry": "^3.0.0",
    "@rollup/plugin-node-resolve": "^8.0.0",
    "@rollup/plugin-replace": "^2.2.0",
    "@types/async-lock": "^1.1.0",
    "@types/chai": "^4.1.6",
    "@types/chai-as-promised": "^7.1.0",
    "@types/chai-string": "^1.4.1",
    "@types/debug": "^4.1.4",
    "@types/long": "^4.0.0",
    "@types/mocha": "^7.0.2",
    "@types/node": "^14.0.0",
    "@types/sinon": "^9.0.4",
    "@types/uuid": "^8.0.0",
    "@types/ws": "^7.2.4",
    "assert": "^1.4.1",
    "chai": "^4.2.0",
    "chai-as-promised": "^7.1.1",
    "chai-exclude": "^2.0.2",
    "chai-string": "^1.5.0",
    "cross-env": "^7.0.2",
    "debug": "^4.1.1",
    "dotenv": "^16.0.0",
    "downlevel-dts": "~0.4.0",
    "eslint": "^7.15.0",
    "esm": "^3.2.18",
    "https-proxy-agent": "^5.0.0",
    "karma": "^6.2.0",
    "karma-chrome-launcher": "^3.0.0",
    "karma-coverage": "^2.0.0",
    "karma-edge-launcher": "^0.4.2",
    "karma-env-preprocessor": "^0.1.1",
    "karma-firefox-launcher": "^1.1.0",
    "karma-ie-launcher": "^1.0.0",
    "karma-junit-reporter": "^2.0.1",
    "karma-mocha": "^2.0.1",
    "karma-mocha-reporter": "^2.2.5",
    "karma-sourcemap-loader": "^0.3.8",
    "mocha": "^7.1.1",
    "mocha-junit-reporter": "^1.18.0",
    "moment": "^2.24.0",
    "nyc": "^14.0.0",
    "prettier": "^1.16.4",
    "puppeteer": "^10.2.0",
    "rimraf": "^3.0.0",
    "rollup": "^1.16.3",
    "rollup-plugin-shim": "^1.0.0",
    "rollup-plugin-sourcemaps": "^0.4.2",
    "rollup-plugin-terser": "^5.1.1",
    "sinon": "^9.0.2",
    "ts-node": "^10.0.0",
    "typescript": "~4.8.0",
    "ws": "^7.1.1",
    "typedoc": "0.15.2"
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

ruleTester.run("ts-package-json-sdktype", rule, {
  valid: [
    {
      // only the fields we care about
      code: '{"sdk-type": "client"}',
      filename: "package.json",
    },
    {
      // only the fields we care about
      code: '{"sdk-type": "mgmt"}',
      filename: "package.json",
    },
    {
      // only the fields we care about
      code: '{"sdk-type": "utility"}',
      filename: "package.json",
    },
    {
      // a full example package.json (taken from https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/package.json with "scripts" removed for testing purposes)
      code: examplePackageGood,
      filename: "package.json",
    },
    {
      // incorrect format but in a file we don't care about
      code: '{"types": "typings/index.d.ts"}',
      filename: "not_package.json",
    },
  ],
  invalid: [
    {
      // sdk-type has incorrect value
      code: '{"sdk-type": "clien"}',
      filename: "package.json",
      errors: [
        {
          message:
            'unrecognized sdk-type value: clien. Expected either "client", "mgmt", or "utility."',
        },
      ],
    },
    {
      // sdk-type has incorrect value
      code: '{"sdk-type": "mgm"}',
      filename: "package.json",
      errors: [
        {
          message:
            'unrecognized sdk-type value: mgm. Expected either "client", "mgmt", or "utility."',
        },
      ],
    },
    {
      // sdk-type has incorrect value
      code: '{"sdk-type": "util"}',
      filename: "package.json",
      errors: [
        {
          message:
            'unrecognized sdk-type value: util. Expected either "client", "mgmt", or "utility."',
        },
      ],
    },
    {
      // sdk-type has incorrect value
      code: '{"sdk-type": 1}',
      filename: "package.json",
      errors: [
        {
          message: "sdk-type is not set to a string",
        },
      ],
    },
    {
      // sdk-type has incorrect value
      code: '{"sdk-type": true}',
      filename: "package.json",
      errors: [
        {
          message: "sdk-type is not set to a string",
        },
      ],
    },
    {
      // sdk-type does not exist
      code: '{"not-sdk-type": "client"}',
      filename: "package.json",
      errors: [
        {
          message: "sdk-type does not exist at the outermost level",
        },
      ],
    },
    {
      // sdk-type is in a nested object
      code: '{"outer": {"sdk-type": "client"}}',
      filename: "package.json",
      errors: [
        {
          message: "sdk-type does not exist at the outermost level",
        },
      ],
    },
    {
      // sdk-type does not exist
      code: examplePackageBad,
      filename: "package.json",
      errors: [
        {
          message: "sdk-type does not exist at the outermost level",
        },
      ],
    },
  ],
});
