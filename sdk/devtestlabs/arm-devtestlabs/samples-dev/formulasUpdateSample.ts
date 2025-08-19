// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Allows modifying tags of formulas. All other properties will be ignored.
 *
 * @summary Allows modifying tags of formulas. All other properties will be ignored.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Formulas_Update.json
 */

import type { FormulaFragment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function formulasUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{formulaName}";
  const formula: FormulaFragment = { tags: { tagName1: "tagValue1" } };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.formulas.update(resourceGroupName, labName, name, formula);
  console.log(result);
}

formulasUpdate().catch(console.error);
