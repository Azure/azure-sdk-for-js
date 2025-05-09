// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import prettier from "prettier";
import { readFile } from "node:fs/promises";

export async function checkCode(code: string): Promise<boolean> {
  return prettier.check(code, {
    parser: "typescript",
    arrowParens: "always",
    bracketSpacing: true,
    endOfLine: "lf",
    printWidth: 100,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
  });
}
/**
 * The schema for the `prettier` tool.
 */
export const prettierSchema = z.object({
  filePath: z.string().min(1),
});

export type PrettierSchema = z.infer<typeof prettierSchema>;

export async function prettierTool(args: PrettierSchema): Promise<CallToolResult> {
  const { filePath } = args;
  const code = await readFile(filePath, "utf-8");
  const isFormatted = await checkCode(code);

  return {
    content: [
      {
        type: "text",
        text: isFormatted ? "Code is formatted correctly." : "Code is not formatted correctly.",
      },
    ],
  };
}
