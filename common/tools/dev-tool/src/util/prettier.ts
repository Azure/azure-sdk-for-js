import * as prettier from "prettier";

const prettierOptions: prettier.Options = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ...(require("../../../eslint-plugin-azure-sdk/prettier.json") as prettier.Options),
};

export function formatFile(text: string, useTypeScript: boolean = true): string {
  const options = { ...prettierOptions };

  if (useTypeScript) {
    options.parser = "typescript";
  }

  return prettier.format(text, options);
}
