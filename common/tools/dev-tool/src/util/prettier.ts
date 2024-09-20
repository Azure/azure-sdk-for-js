// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as prettier from "prettier";

import prettierOptions from "../../../eslint-plugin-azure-sdk/prettier.json";

export function format(contents: string, parser?: prettier.BuiltInParserName): Promise<string> {
  return prettier.format(contents, {
    ...(prettierOptions as prettier.Options),
    parser: parser,
  });
}
