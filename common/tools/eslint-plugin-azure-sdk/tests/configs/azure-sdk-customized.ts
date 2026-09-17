// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Linter } from "eslint";
import { describe, expect, it } from "vitest";
import typescriptEslint from "typescript-eslint";
import azureSdkCustomized from "../../src/configs/azure-sdk-customized.js";

const restrictedSyntaxConfig = azureSdkCustomized(typescriptEslint.parser).find(
  (config) => config.name === "azsdk/restricted-syntax",
);

if (!restrictedSyntaxConfig?.rules) {
  throw new Error("The azsdk/restricted-syntax config was not found.");
}

const linter = new Linter();

function verify(code: string): Linter.LintMessage[] {
  return linter.verify(code, [{ rules: restrictedSyntaxConfig.rules }]);
}

describe("azsdk/restricted-syntax", () => {
  it.each([
    "RestError",
    "AzureKeyCredential",
    "AzureNamedKeyCredential",
    "AzureSASCredential",
    "Pipeline",
  ])("rejects instanceof checks against %s", (className) => {
    const messages = verify(`value instanceof ${className};`);

    expect(messages).toEqual([
      expect.objectContaining({
        ruleId: "no-restricted-syntax",
        message: expect.stringContaining(
          "Do not use `instanceof` with a class from another package",
        ),
      }),
    ]);
  });

  it("rejects instanceof checks through a member expression", () => {
    const messages = verify("value instanceof core.RestError;");

    expect(messages).toEqual([
      expect.objectContaining({
        ruleId: "no-restricted-syntax",
      }),
    ]);
  });

  it.each(["Error", "Date", "RestErrorFactory"])(
    "allows instanceof checks against %s",
    (className) => {
      expect(verify(`value instanceof ${className};`)).toHaveLength(0);
    },
  );
});
