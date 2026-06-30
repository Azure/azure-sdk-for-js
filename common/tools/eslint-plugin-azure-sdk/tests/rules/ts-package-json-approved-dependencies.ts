// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-package-json-approved-dependencies rule.
 */

"use strict";

import path from "node:path";
import { createRuleTester } from "../ruleTester.js";
import rule from "../../src/rules/ts-package-json-approved-dependencies.js";

const configPath = path.join(__dirname, "..", "fixture", "approved-third-party-dependencies.yml");
const missingConfigPath = path.join(__dirname, "..", "fixture", "does-not-exist.yml");

const sdkPackage = "sdk/test-package/package.json";

function pkg(name: string, dependencies: Record<string, string>, extra = ""): string {
  return `{
  "name": "${name}",
  "version": "1.0.0",
  "sdk-type": "client",
  "dependencies": ${JSON.stringify(dependencies)}${extra}
}`;
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = createRuleTester();

ruleTester.run("ts-package-json-approved-dependencies", rule, {
  valid: [
    {
      // first-party dependencies are always allowed
      code: pkg("@azure/test-package", {
        "@azure/core-rest-pipeline": "^1.0.0",
        "@azure-rest/core-client": "^1.0.0",
        "@azure-tools/test-recorder": "^1.0.0",
        "@microsoft/foo": "^1.0.0",
        "@typespec/ts-http-runtime": "^1.0.0",
      }),
      filename: sdkPackage,
      options: [{ configPath }],
    },
    {
      // globally allowed third-party dependency
      code: pkg("@azure/test-package", { tslib: "^2.0.0", "left-pad": "^1.0.0" }),
      filename: sdkPackage,
      options: [{ configPath }],
    },
    {
      // exception dependency used by an approved package
      code: pkg("@azure/allowed-package", { "special-dep": "^1.0.0" }),
      filename: sdkPackage,
      options: [{ configPath }],
    },
    {
      // scope wildcard in "allowed" approves every package in that scope
      code: pkg("@azure/test-package", {
        "@widgets/button": "^1.0.0",
        "@widgets/dialog": "^2.0.0",
      }),
      filename: sdkPackage,
      options: [{ configPath }],
    },
    {
      // scope wildcard in "exceptions" approves the listed package
      code: pkg("@azure/allowed-package", { "@scoped-exception/thing": "^1.0.0" }),
      filename: sdkPackage,
      options: [{ configPath }],
    },
    {
      // devDependencies are not checked
      code: pkg(
        "@azure/test-package",
        { tslib: "^2.0.0" },
        `,
  "devDependencies": { "lodash": "^4.0.0" }`,
      ),
      filename: sdkPackage,
      options: [{ configPath }],
    },
    {
      // not under sdk/, so the rule does not apply
      code: pkg("@azure/test-package", { lodash: "^4.0.0" }),
      filename: "package.json",
      options: [{ configPath }],
    },
    {
      // not a package.json file
      code: pkg("@azure/test-package", { lodash: "^4.0.0" }),
      filename: "not_package.json",
      options: [{ configPath }],
    },
    {
      // no dependencies field at all
      code: `{ "name": "@azure/test-package", "version": "1.0.0", "sdk-type": "client" }`,
      filename: sdkPackage,
      options: [{ configPath }],
    },
    {
      // utility package with an unapproved dep is out of scope
      code: `{
  "name": "@azure/test-package",
  "version": "1.0.0",
  "sdk-type": "utility",
  "dependencies": { "lodash": "^4.0.0" }
}`,
      filename: sdkPackage,
      options: [{ configPath }],
    },
    {
      // package with no sdk-type is out of scope (e.g. a sample)
      code: `{
  "name": "@azure-samples/test",
  "version": "1.0.0",
  "dependencies": { "lodash": "^4.0.0" }
}`,
      filename: sdkPackage,
      options: [{ configPath }],
    },
  ],
  invalid: [
    {
      // unapproved third-party dependency
      code: pkg("@azure/test-package", { lodash: "^4.0.0" }),
      filename: sdkPackage,
      options: [{ configPath }],
      errors: [{ messageId: "unapproved" }],
    },
    {
      // multiple unapproved dependencies each report
      code: pkg("@azure/test-package", { lodash: "^4.0.0", chalk: "^5.0.0" }),
      filename: sdkPackage,
      options: [{ configPath }],
      errors: [{ messageId: "unapproved" }, { messageId: "unapproved" }],
    },
    {
      // exception dependency used by a package not on the allow-list
      code: pkg("@azure/other-package", { "special-dep": "^1.0.0" }),
      filename: sdkPackage,
      options: [{ configPath }],
      errors: [{ messageId: "exceptionOtherPackages" }],
    },
    {
      // scope-wildcard exception used by a package not on the allow-list
      code: pkg("@azure/other-package", { "@scoped-exception/thing": "^1.0.0" }),
      filename: sdkPackage,
      options: [{ configPath }],
      errors: [{ messageId: "exceptionOtherPackages" }],
    },
    {
      // a scope that is not wildcard-allowed is still rejected
      code: pkg("@azure/test-package", { "@not-allowed/thing": "^1.0.0" }),
      filename: sdkPackage,
      options: [{ configPath }],
      errors: [{ messageId: "unapproved" }],
    },
    {
      // allow-list file does not exist -> single config error
      code: pkg("@azure/test-package", { lodash: "^4.0.0" }),
      filename: sdkPackage,
      options: [{ configPath: missingConfigPath }],
      errors: [{ messageId: "configError" }],
    },
  ],
});
