#!/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This file is ignored by the linter because it is impossible to move the copyright header above the shebang line.

import { AzureKeyCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import type { DefaultAzureCredential } from "@azure/identity";

import { writeFile } from "fs";

import { DocumentModelAdministrationClient } from "../src/documentModelAdministrationClient";
import { writeModelCode } from "./writeModelCode";

import { format } from "prettier";

/**
 * @internal
 * Prints a help message for the gen-model command.
 */
function printHelp() {
  console.error(`
Usage:
 gen-model [options] <model-id>
 
Create a strongly-typed DocumentModel for the Azure Document Intelligence SDK for JavaScript.

Options:
 -h, --help  \tshow this help message
 -o, --output\tdetermines where to output the model

 --endpoint <endpoint>\tthe Form Recognizer resource's endpoint
 --api-key <api-key>  \tthe Form Recognizer resource's API key

Default values:

If the \`--endpoint\` or \`--api-key\` options are not provided, then the values
of the \`FORM_RECOGNIZER_ENDPOINT\` and \`FORM_RECOGNIZER_API_KEY\` environment
variables will be used as defaults, respectively.

Authentication:

If an API key is available (via. the \`--api-key\` option or \`FORM_RECOGNIZER_API_KEY\`
environment variable), then it will be used to authenticate requests to the Form
Recognizer service.

Otherwise, if the \`@azure/identity\` package is installed, the \`DefaultAzureCredential\`
from that package will be used.

One of these methods must be available to authenticate with the service.`);
}

async function tryAad(): Promise<DefaultAzureCredential> {
  try {
    return new (await import("@azure/identity")).DefaultAzureCredential();
  } catch {
    throw new Error();
  }
}

/**
 * @internal
 * The main function of the gen-model command.
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  let modelId: string | undefined = undefined;
  let endpoint = process.env.FORM_RECOGNIZER_ENDPOINT;
  let apiKey = process.env.FORM_RECOGNIZER_API_KEY;
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
      case "--api-key":
        apiKey = args[(idx += 1)];
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

  // We try API key-based authentication first, then AAD. If neither works, then we throw an error.
  let credential: KeyCredential | TokenCredential;

  if (apiKey) {
    console.error("Using API key authentication.");
    credential = new AzureKeyCredential(apiKey);
  } else {
    try {
      credential = await tryAad();
      console.error("Using Azure Active Directory authentication (DefaultAzureCredential).");
    } catch {
      throw new Error(
        [
          "no authentication method is available;",
          "provide an API key or install and configure the `@azure/identity` package",
          "(`npm i --save-dev @azure/identity`)",
        ].join(" "),
      );
    }
  }

  const client = new DocumentModelAdministrationClient(endpoint, credential);

  const modelInfo = await client.getDocumentModel(modelId);

  console.error("Generating model code for:", modelInfo.modelId);

  const file = await writeModelCode(modelInfo, test);

  const data = Buffer.from(await format(file, { parser: "typescript" }), "utf-8");

  if (output !== undefined) {
    // output is only refined in this context, so assigning it to "path" preserves that
    const path = output;

    await new Promise<void>((resolve, reject) => {
      writeFile(path, data, null, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  } else {
    process.stdout.write(data);
  }
}

main().catch((e) => {
  console.error(e);
  console.error("see `gen-model --help` for more information");
  process.exit(1);
});
