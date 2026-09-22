// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a data flow.
 *
 * @summary creates or updates a data flow.
 * x-ms-original-file: 2018-06-01/DataFlows_Create.json
 */
async function dataFlowsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.dataFlows.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleDataFlow",
    {
      properties: {
        type: "MappingDataFlow",
        description:
          "Sample demo data flow to convert currencies showing usage of union, derive and conditional split transformation.",
        scriptLines: [
          "source(output(",
          "PreviousConversionRate as double,",
          "Country as string,",
          "DateTime1 as string,",
          "CurrentConversionRate as double",
          "),",
          "allowSchemaDrift: false,",
          "validateSchema: false) ~> USDCurrency",
          "source(output(",
          "PreviousConversionRate as double,",
          "Country as string,",
          "DateTime1 as string,",
          "CurrentConversionRate as double",
          "),",
          "allowSchemaDrift: true,",
          "validateSchema: false) ~> CADSource",
          "USDCurrency, CADSource union(byName: true)~> Union",
          "Union derive(NewCurrencyRate = round(CurrentConversionRate*1.25)) ~> NewCurrencyColumn",
          "NewCurrencyColumn split(Country == 'USD',",
          "Country == 'CAD',disjoint: false) ~> ConditionalSplit1@(USD, CAD)",
          "ConditionalSplit1@USD sink(saveMode:'overwrite' ) ~> USDSink",
          "ConditionalSplit1@CAD sink(saveMode:'overwrite' ) ~> CADSink",
        ],
        sinks: [
          { name: "USDSink", dataset: { type: "DatasetReference", referenceName: "USDOutput" } },
          { name: "CADSink", dataset: { type: "DatasetReference", referenceName: "CADOutput" } },
        ],
        sources: [
          {
            name: "USDCurrency",
            dataset: { type: "DatasetReference", referenceName: "CurrencyDatasetUSD" },
          },
          {
            name: "CADSource",
            dataset: { type: "DatasetReference", referenceName: "CurrencyDatasetCAD" },
          },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a data flow.
 *
 * @summary creates or updates a data flow.
 * x-ms-original-file: 2018-06-01/DataFlows_Update.json
 */
async function dataFlowsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.dataFlows.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleDataFlow",
    {
      properties: {
        type: "MappingDataFlow",
        description:
          "Sample demo data flow to convert currencies showing usage of union, derive and conditional split transformation.",
        scriptLines: [
          "source(output(",
          "PreviousConversionRate as double,",
          "Country as string,",
          "DateTime1 as string,",
          "CurrentConversionRate as double",
          "),",
          "allowSchemaDrift: false,",
          "validateSchema: false) ~> USDCurrency",
          "source(output(",
          "PreviousConversionRate as double,",
          "Country as string,",
          "DateTime1 as string,",
          "CurrentConversionRate as double",
          "),",
          "allowSchemaDrift: true,",
          "validateSchema: false) ~> CADSource",
          "USDCurrency, CADSource union(byName: true)~> Union",
          "Union derive(NewCurrencyRate = round(CurrentConversionRate*1.25)) ~> NewCurrencyColumn",
          "NewCurrencyColumn split(Country == 'USD',",
          "Country == 'CAD',disjoint: false) ~> ConditionalSplit1@(USD, CAD)",
          "ConditionalSplit1@USD sink(saveMode:'overwrite' ) ~> USDSink",
          "ConditionalSplit1@CAD sink(saveMode:'overwrite' ) ~> CADSink",
        ],
        sinks: [
          { name: "USDSink", dataset: { type: "DatasetReference", referenceName: "USDOutput" } },
          { name: "CADSink", dataset: { type: "DatasetReference", referenceName: "CADOutput" } },
        ],
        sources: [
          {
            name: "USDCurrency",
            dataset: { type: "DatasetReference", referenceName: "CurrencyDatasetUSD" },
          },
          {
            name: "CADSource",
            dataset: { type: "DatasetReference", referenceName: "CurrencyDatasetCAD" },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dataFlowsCreate();
  await dataFlowsUpdate();
}

main().catch(console.error);
