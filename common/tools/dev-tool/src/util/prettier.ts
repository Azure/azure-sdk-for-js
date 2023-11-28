import * as prettier from "prettier";

import prettierOptions from "../../../eslint-plugin-azure-sdk/prettier.json";

export async function format(
  contents: string,
  parser?: prettier.BuiltInParserName
): Promise<string> {
  return await prettier.format(contents, {
    ...(prettierOptions as prettier.Options),
    parser: parser,
  });
}
