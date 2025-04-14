#!/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This file is ignored by the linter because it is impossible to move the copyright header above the shebang line.

import { DefaultAzureCredential } from "@azure/identity";
import { writeFile } from "node:fs/promises";
import { DocumentModelAdministrationClient } from "../documentModelAdministrationClient.js";
import { writeModelCode } from "./writeModelCode.js";
import { format } from "prettier";

/**
 * @internal
 * Prints a help message for the gen-model command.
 */
function printHelp(): void {
  console.error(`
Usage:
 gen-model [options] <model-id>
 
Create a strongly-typed DocumentModel for the Azure Document Intelligence SDK for JavaScript.

Options:
 -h, --help  \tshow this help message
 -o, --output\tdetermines where to output the model

 --endpoint <endpoint>\tthe Form Recognizer resource's endpoint

Default values:

If the \`--endpoint\` option is not provided, then the value
of the \`FORM_RECOGNIZER_ENDPOINT\` environment
variable will be used as default.

Authentication:

If the \`@azure/identity\` package is installed, the \`DefaultAzureCredential\`
from that package will be used.
`);
}

/**
 * @internal
 * The main function of the gen-model command.
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  let modelId: string | undefined = undefined;
  let endpoint = process.env.FORM_RECOGNIZER_ENDPOINT;
  let output: string | undefined = undefined;
  let test: boolean = false;

  console.error("gen-model - create strong TypeScript types for models");

  if (args.some((arg) => arg === "--help" || arg === "-h")) {
    printHelp();
    return;
  }

  let idx = 0;
  while (idx < args.length) {
    switch (args[idx]) {
      case "--endpoint":
        endpoint = args[(idx += 1)];
        break;
      case "-o":
      case "--output":
        output = args[(idx += 1)];
        break;
      case "--test":
        test = true;
        break;
      default:
        modelId = args[idx];
        break;
    }
    idx += 1;
  }

  if (idx + 1 <= args.length) {
    console.error("warning: unused arguments:", args.slice(idx + 1).join(" "));
  }

  if (!modelId) {
    throw new Error("no model ID provided");
  }

  if (!endpoint) {
    throw new Error("no endpoint provided");
  }

  const client = new DocumentModelAdministrationClient(endpoint, new DefaultAzureCredential());

  const modelInfo = await client.getDocumentModel(modelId);

  console.error("Generating model code for:", modelInfo.modelId);

  const file = await writeModelCode(modelInfo, test);

  const data = Buffer.from(await format(file, { parser: "typescript" }), "utf-8");

  if (output !== undefined) {
    // output is only refined in this context, so assigning it to "path" preserves that
    const path = output;

    await writeFile(path, data);
  } else {
    process.stdout.write(data);
  }
}

main().catch((e) => {
  console.error(e);
  console.error("see `gen-model --help` for more information");
  process.exit(1);
});
