// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-unused-vars */

/**
 * @summary Demonstrates the use of a ModelParser to validate a PnP model.
 */

import * as fs from "fs";
import { createParser, ModelParsingOption } from "@azure/dtdl-parser";

async function main() {
  console.log(`accessing DTDL ${__dirname}/InterfaceContentsEmbeddedV2.json`);
  const rawDtdlDigest: string = fs.readFileSync(
    `${__dirname}/InterfaceContentsEmbeddedV2.json`,
    "utf-8"
  );
  const modelParser = createParser(ModelParsingOption.PermitAnyTopLevelElement);
  modelParser.options = ModelParsingOption.PermitAnyTopLevelElement;
  const modelDict = await modelParser.parse([rawDtdlDigest]);
  console.log(modelDict);
  Object.entries(modelDict).forEach(([key, value]) => {
    console.log(key);
    console.log(typeof value);
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
