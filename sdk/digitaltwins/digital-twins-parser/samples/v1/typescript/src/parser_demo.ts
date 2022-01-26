// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-unused-vars
 */


/**
 * @summary Demonstrates the use of a ModelParser to validate a PnP model.
 */

import * as fs from 'fs';
import {ModelParser, ModelParsingOption} from '@azure/digital-twins-parser';

async function main() {
  const rawDtdlDigest:string = fs.readFileSync('samples/typescript/parser/InterfaceContentsEmbeddedV2.json', 'utf-8');
  const modelParser = new ModelParser();
  modelParser.options = ModelParsingOption.PermitAnyTopLevelElement;
  const modelDict = await modelParser.parseAsync([rawDtdlDigest]);
  console.log(modelDict);
  Object.entries(modelDict).forEach(
    ([key, value]) => {
      console.log(key);
      console.log(typeof value);
    },
  );
};

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
