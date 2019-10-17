// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Container, ContainerDefinition } from "../../../dist-esm/client";
import {
  bulkInsertItems,
  getTestContainer,
  removeAllDatabases,
  generateDocuments
} from "../../common/TestHelpers";

describe("Validate Query", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || "30000");

  const containerDefinition: ContainerDefinition = {
    id: "sample container",
    partitionKey: {
      paths: ["/id"]
    }
  };

  const containerOptions = { offerThroughput: 25100 };

  let container: Container;

  const ids = [...Array(30).keys()];

  const items = ids.map((id) => {
    return {
      id: id.toString(),
      name: ["Jack", "Jill", "Joe"][id % 3],
      number: id % 5
    };
  });

  // - removes all the databases,
  // - creates a new database,
  // - creates a new collecton,
  // - bulk inserts documents to the container
  before(async function() {
    await removeAllDatabases();
    container = await getTestContainer(
      "Validate 中文 Query",
      undefined,
      containerDefinition,
      containerOptions
    );
    await bulkInsertItems(container, items);
  });

  it.only("Simple GROUP BY with no aggregates", async () => {
    // an order by query with explicit ascending ordering
    const querySpec = {
      query: `SELECT r.name, r.number, AVG(r.number) FROM root r GROUP BY r.name, r.number`
    };

    const options = {
      maxItemCount: 100,
      forceQueryPlan: true,
      initialHeaders: {
        "x-ms-documentdb-partitionkeyrangeid": 0
      }
    };

    // const expectedOrderedIds = documentDefinitions.sort(compare("spam")).map(function(r) {
    //   return r["id"];
    // });
    const queryIterator = container.items.query(querySpec, options);

    const result = await queryIterator.fetchAll();
    console.log(JSON.stringify(result.resources, null, 2));

    // validates the results size and order
    // await executeQueryAndValidateResults({
    //   query: querySpec,
    //   options
    // });
  });
});
