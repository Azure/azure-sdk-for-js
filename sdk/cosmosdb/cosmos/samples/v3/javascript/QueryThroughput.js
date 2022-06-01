// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates query throughput scenarios.
 */

require("dotenv").config();

const { CosmosClient } = require("@azure/cosmos");
const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";

async function run() {
  const client = new CosmosClient({
    endpoint,
    key,
  });

  const query1 = "Select * from c order by c._ts";
  const query2 = "Select * from c";
  const query3 = "Select value count(c.id) from c";

  const container = client.database(databaseId).container(containerId);
  const options = {
    maxItemCount: 10000,
    maxDegreeOfParallelism: 1000,
    bufferItems: true,
  };

  const scenarios = [];
  scenarios.push({ container, query: query1, options });
  scenarios.push({ container, query: query2, options });
  scenarios.push({ container, query: query3, options });

  for (const scenario of scenarios) {
    try {
      console.log("Scenario starting: " + scenario.query);
      const start = Date.now();
      await runScenario(scenario.container, scenario.query, scenario.options);
      console.log(
        'Scenario complete: "' + scenario.query + '" - took ' + (Date.now() - start) / 1000 + "s"
      );
    } catch (e) {
      console.log("Scenario failed: " + scenario.query + " - " + JSON.stringify(scenario.options));
    }
  }
}

async function runScenario(container, query, options) {
  const queryIterator = container.items.query(query, options);
  let count = 0;
  while (queryIterator.hasMoreResults() && count <= 100000) {
    const { resources: results } = await queryIterator.fetchNext();
    if (results !== undefined) {
      count = count + results.length;
    }
  }
}

run().catch(console.error);
