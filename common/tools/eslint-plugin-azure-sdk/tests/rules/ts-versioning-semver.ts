// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-versioning-semver rule.
 * @author Arpan Laha
 */

import rule from "../../src/rules/ts-versioning-semver";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Example files
//------------------------------------------------------------------------------

const examplePackageGood = `{
  "name": "@azure/service-bus",
  "author": "Microsoft Corporation",
  "version": "1.0.2",
  "license": "MIT",
  "description": "Azure Service Bus SDK for Node.js",
  "homepage": "https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus",
  "repository": "github:Azure/azure-sdk-for-js",
  "keywords": [
    "azure",
    "cloud",
    "service bus",
    "AMQP"
  ],
  "bugs": {
    "url": "https://github.com/azure/azure-sdk-for-js/issues"
  },
  "main": "./dist/index.js",
  "module": "dist-esm/src/index.js",
  "browser": {
    "./dist/index.js": "./browser/service-bus.js",
    "./dist-esm/test/utils/aadUtils.js": "./dist-esm/test/utils/aadUtils.browser.js",
    "buffer": "buffer",
    "stream": "stream-browserify"
  },
  "types": "./typings/service-bus.d.ts",
  "engine": {
    "node": ">=6.0.0"
  },
  "dependencies": {
    "@azure/amqp-common": "^1.0.0-preview.5",
    "@types/is-buffer": "^2.0.0",
    "@azure/ms-rest-nodeauth": "^0.9.2",
    "@types/long": "^4.0.0",
    "debug": "^3.1.0",
    "is-buffer": "^2.0.3",
    "long": "^4.0.0",
    "process": "^0.11.10",
    "rhea": "^1.0.4",
    "rhea-promise": "^0.1.15",
    "tslib": "^1.9.3"
  },
  "devDependencies": {
    "@azure/arm-servicebus": "^0.1.0",
    "@microsoft/api-extractor": "^7.1.5",
    "@types/async-lock": "^1.1.0",
    "@types/chai": "^4.1.6",
    "@types/chai-as-promised": "^7.1.0",
    "@types/debug": "^0.0.31",
    "@types/dotenv": "^6.1.0",
    "@types/mocha": "^5.2.5",
    "@types/node": "^8.0.0",
    "@types/ws": "^6.0.1",
    "@typescript-eslint/eslint-plugin": "~1.9.0",
    "@typescript-eslint/parser": "^1.7.0",
    "assert": "^1.4.1",
    "buffer": "^5.2.1",
    "chai": "^4.2.0",
    "chai-as-promised": "^7.1.1",
    "cross-env": "^5.2.0",
    "delay": "^4.2.0",
    "dotenv": "^7.0.0",
    "eslint": "^5.16.0",
    "eslint-config-prettier": "^4.2.0",
    "eslint-detailed-reporter": "^0.8.0",
    "eslint-plugin-no-null": "^1.0.2",
    "eslint-plugin-no-only-tests": "^2.3.0",
    "eslint-plugin-promise": "^4.1.1",    
    "https-proxy-agent": "^2.2.1",
    "karma": "^4.0.1",
    "karma-chrome-launcher": "^2.2.0",
    "karma-coverage": "^1.1.2",
    "karma-edge-launcher": "^0.4.2",
    "karma-env-preprocessor": "^0.1.1",
    "karma-firefox-launcher": "^1.1.0",
    "karma-ie-launcher": "^1.0.0",
    "karma-junit-reporter": "^1.2.0",
    "karma-mocha": "^1.3.0",
    "karma-mocha-reporter": "^2.2.5",
    "karma-remap-coverage": "^0.1.5",
    "mocha": "^5.2.0",
    "mocha-junit-reporter": "^1.18.0",
    "mocha-multi": "^1.0.1",
    "moment": "^2.24.0",
    "nyc": "^14.0.0",
    "prettier": "^1.16.4",
    "promise": "^8.0.3",
    "puppeteer": "^1.11.0",
    "rimraf": "^2.6.2",
    "rollup": "~1.13.1",
    "rollup-plugin-commonjs": "^9.2.0",
    "rollup-plugin-inject": "^2.2.0",
    "rollup-plugin-json": "^3.1.0",
    "rollup-plugin-multi-entry": "^2.1.0",
    "rollup-plugin-node-resolve": "^4.2.0",
    "rollup-plugin-replace": "^2.1.0",
    "rollup-plugin-shim": "^1.0.0",
    "rollup-plugin-sourcemaps": "^0.4.2",
    "rollup-plugin-terser": "^4.0.4",
    "ts-node": "^7.0.1",
    "typescript": "^3.2.2",
    "ws": "^6.2.1"
  },
  "files": [
    "dist/",
    "dist-esm/src/",
    "src/",
    "typings/service-bus.d.ts",
    "tsconfig.json"
  ],
  "sideEffects": false
}`;

const examplePackageBad = `{
  "name": "@azure/service-bus",
  "author": "Microsoft Corporation",
  "version": "1.2",
  "license": "MIT",
  "description": "Azure Service Bus SDK for Node.js",
  "homepage": "https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus",
  "repository": "github:Azure/azure-sdk-for-js",
  "keywords": [
    "azure",
    "cloud",
    "service bus",
    "AMQP"
  ],
  "bugs": {
    "url": "https://github.com/azure/azure-sdk-for-js/issues"
  },
  "main": "./dist/index.js",
  "module": "dist-esm/src/index.js",
  "browser": {
    "./dist/index.js": "./browser/service-bus.js",
    "./dist-esm/test/utils/aadUtils.js": "./dist-esm/test/utils/aadUtils.browser.js",
    "buffer": "buffer",
    "stream": "stream-browserify"
  },
  "types": "./typings/service-bus.d.ts",
  "engine": {
    "node": ">=6.0.0"
  },
  "dependencies": {
    "@azure/amqp-common": "^1.0.0-preview.5",
    "@types/is-buffer": "^2.0.0",
    "@azure/ms-rest-nodeauth": "^0.9.2",
    "@types/long": "^4.0.0",
    "debug": "^3.1.0",
    "is-buffer": "^2.0.3",
    "long": "^4.0.0",
    "process": "^0.11.10",
    "rhea": "^1.0.4",
    "rhea-promise": "^0.1.15",
    "tslib": "^1.9.3"
  },
  "devDependencies": {
    "@azure/arm-servicebus": "^0.1.0",
    "@microsoft/api-extractor": "^7.1.5",
    "@types/async-lock": "^1.1.0",
    "@types/chai": "^4.1.6",
    "@types/chai-as-promised": "^7.1.0",
    "@types/debug": "^0.0.31",
    "@types/dotenv": "^6.1.0",
    "@types/mocha": "^5.2.5",
    "@types/node": "^8.0.0",
    "@types/ws": "^6.0.1",
    "@typescript-eslint/eslint-plugin": "~1.9.0",
    "@typescript-eslint/parser": "^1.7.0",
    "assert": "^1.4.1",
    "buffer": "^5.2.1",
    "chai": "^4.2.0",
    "chai-as-promised": "^7.1.1",
    "cross-env": "^5.2.0",
    "delay": "^4.2.0",
    "dotenv": "^7.0.0",
    "eslint": "^5.16.0",
    "eslint-config-prettier": "^4.2.0",
    "eslint-detailed-reporter": "^0.8.0",
    "eslint-plugin-no-null": "^1.0.2",
    "eslint-plugin-no-only-tests": "^2.3.0",
    "eslint-plugin-promise": "^4.1.1",    
    "https-proxy-agent": "^2.2.1",
    "karma": "^4.0.1",
    "karma-chrome-launcher": "^2.2.0",
    "karma-coverage": "^1.1.2",
    "karma-edge-launcher": "^0.4.2",
    "karma-env-preprocessor": "^0.1.1",
    "karma-firefox-launcher": "^1.1.0",
    "karma-ie-launcher": "^1.0.0",
    "karma-junit-reporter": "^1.2.0",
    "karma-mocha": "^1.3.0",
    "karma-mocha-reporter": "^2.2.5",
    "karma-remap-coverage": "^0.1.5",
    "mocha": "^5.2.0",
    "mocha-junit-reporter": "^1.18.0",
    "mocha-multi": "^1.0.1",
    "moment": "^2.24.0",
    "nyc": "^14.0.0",
    "prettier": "^1.16.4",
    "promise": "^8.0.3",
    "puppeteer": "^1.11.0",
    "rimraf": "^2.6.2",
    "rollup": "~1.13.1",
    "rollup-plugin-commonjs": "^9.2.0",
    "rollup-plugin-inject": "^2.2.0",
    "rollup-plugin-json": "^3.1.0",
    "rollup-plugin-multi-entry": "^2.1.0",
    "rollup-plugin-node-resolve": "^4.2.0",
    "rollup-plugin-replace": "^2.1.0",
    "rollup-plugin-shim": "^1.0.0",
    "rollup-plugin-sourcemaps": "^0.4.2",
    "rollup-plugin-terser": "^4.0.4",
    "ts-node": "^7.0.1",
    "typescript": "^3.2.2",
    "ws": "^6.2.1"
  },
  "files": [
    "dist/",
    "dist-esm/src/",
    "src/",
    "typings/service-bus.d.ts",
    "tsconfig.json"
  ],
  "sideEffects": false
}`;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json"
  }
});

ruleTester.run("ts-versioning-semver", rule, {
  valid: [
    // various correct formats
    {
      code: '{"version": "1.0.0"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.1.0"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.0.1"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.1.1"}',
      filename: "package.json"
    },
    {
      code: '{"version": "10.0.1"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.10.1"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.1.10"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.1.10-preview.0"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.1.10-preview.1"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.1.10-preview.10"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.1.10-dev.20200728.0"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.1.10-dev.20210128.1"}',
      filename: "package.json"
    },
    {
      code: '{"version": "1.1.10-dev.20200728.10"}',
      filename: "package.json"
    },
    {
      // a full example package.json (taken from https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/package.json with "scripts" removed for testing purposes)
      code: examplePackageGood,
      filename: "package.json"
    },
    {
      // incorrect format but in a file we don't care about
      code: '{"version": "1.0"}',
      filename: "not_package.json"
    }
  ],
  invalid: [
    {
      code: '{"notVersion": "1.0.0"}',
      filename: "package.json",
      errors: [
        {
          message: "version does not exist at the outermost level"
        }
      ]
    },
    {
      // version is in a nested object
      code: '{"outer": {"version": "1.0.0"}}',
      filename: "package.json",
      errors: [
        {
          message: "version does not exist at the outermost level"
        }
      ]
    },
    {
      // incorrect type
      code: '{"version": [1.0]}',
      filename: "package.json",
      errors: [
        {
          message: "version is not set to a string"
        }
      ]
    },
    // semver violations
    {
      code: '{"version": "1"}',
      filename: "package.json",
      errors: [
        {
          message: "version is not in semver"
        }
      ]
    },
    {
      code: '{"version": "1.0"}',
      filename: "package.json",
      errors: [
        {
          message: "version is not in semver"
        }
      ]
    },
    {
      code: '{"version": "1.0.01"}',
      filename: "package.json",
      errors: [
        {
          message: "version is not in semver"
        }
      ]
    },
    {
      code: '{"version": "1.0.0.0"}',
      filename: "package.json",
      errors: [
        {
          message: "version is not in semver"
        }
      ]
    },
    {
      code: '{"version": "1.0.a"}',
      filename: "package.json",
      errors: [
        {
          message: "version is not in semver"
        }
      ]
    },
    {
      code: '{"version": "1-0-0"}',
      filename: "package.json",
      errors: [
        {
          message: "version is not in semver"
        }
      ]
    },
    // preview violations
    {
      code: '{"version": "1.0.0-Preview-1"}',
      filename: "package.json",
      errors: [
        {
          message: "unrecognized version syntax: Preview-1"
        }
      ]
    },
    {
      code: '{"version": "1.0.0-preview-1"}',
      filename: "package.json",
      errors: [
        {
          message: "preview format is not x.y.z-preview.i"
        }
      ]
    },
    {
      code: '{"version": "1.0.0-preview1"}',
      filename: "package.json",
      errors: [
        {
          message: "preview format is not x.y.z-preview.i"
        }
      ]
    },
    {
      code: '{"version": "1.0.0-preview.01"}',
      filename: "package.json",
      errors: [
        {
          message: "preview format is not x.y.z-preview.i"
        }
      ]
    },
    // dev violations
    {
      code: '{"version": "1.0.0-Dev-1"}',
      filename: "package.json",
      errors: [
        {
          message: "unrecognized version syntax: Dev-1"
        }
      ]
    },
    {
      code: '{"version": "1.0.0-dev-1"}',
      filename: "package.json",
      errors: [
        {
          message: "dev format is not x.y.z-dev.<date>.i"
        }
      ]
    },
    {
      code: '{"version": "1.0.0-dev1"}',
      filename: "package.json",
      errors: [
        {
          message: "dev format is not x.y.z-dev.<date>.i"
        }
      ]
    },
    {
      code: '{"version": "1.0.0-dev.01"}',
      filename: "package.json",
      errors: [
        {
          message: "dev format is not x.y.z-dev.<date>.i"
        }
      ]
    },
    {
      code: '{"version": "1.0.0-dev.2.1"}',
      filename: "package.json",
      errors: [
        {
          message: "dev format is not x.y.z-dev.<date>.i"
        }
      ]
    },
    // major version 0 violations
    {
      code: '{"version": "0.1.0"}',
      filename: "package.json",
      errors: [
        {
          message: "major version should not be set to 0"
        }
      ]
    },
    // major version 0 and preview violations
    {
      code: '{"version": "0.1.0-preview1"}',
      filename: "package.json",
      errors: [
        {
          message: "major version should not be set to 0"
        },
        {
          message: "preview format is not x.y.z-preview.i"
        }
      ]
    },
    {
      // example file with version set to "1.2"
      code: examplePackageBad,
      filename: "package.json",
      errors: [
        {
          message: "version is not in semver"
        }
      ]
    }
  ]
});
