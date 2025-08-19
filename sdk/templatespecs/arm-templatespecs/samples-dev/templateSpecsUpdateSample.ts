// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates Template Spec tags with specified values.
 *
 * @summary Updates Template Spec tags with specified values.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecsPatch.json
 */

import type {
  TemplateSpecUpdateModel,
  TemplateSpecsUpdateOptionalParams,
} from "@azure/arm-templatespecs";
import { TemplateSpecsClient } from "@azure/arm-templatespecs";
import { DefaultAzureCredential } from "@azure/identity";

async function templateSpecsPatch(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "templateSpecRG";
  const templateSpecName = "simpleTemplateSpec";
  const templateSpec: TemplateSpecUpdateModel = { tags: { myTag: "My Value" } };
  const options: TemplateSpecsUpdateOptionalParams = { templateSpec };
  const credential = new DefaultAzureCredential();
  const client = new TemplateSpecsClient(credential, subscriptionId);
  const result = await client.templateSpecs.update(resourceGroupName, templateSpecName, options);
  console.log(result);
}

templateSpecsPatch().catch(console.error);
