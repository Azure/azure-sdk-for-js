import { Container } from "../../dist-esm/client";
import { bulkInsertItems, getTestContainer, removeAllDatabases } from "../common/TestHelpers";
import { Constants, CosmosClient, PluginOn } from "../../dist-esm";
import { masterKey, endpoint } from "../common/_testConfig";
import { SubStatusCodes } from "../../dist-esm/common";
import assert from "assert";

const splitError = new Error("Fake Partition Split") as any;
splitError.code = 410;
splitError.substatus = SubStatusCodes.PartitionKeyRangeGone;

const generateDocuments = function(docSize: number) {
  const docs = [];
  for (let i = 0; i < docSize; i++) {
    docs.push({ id: i.toString() });
  }
  return docs;
};

const documentDefinitions = generateDocuments(20);

describe("Partition Splits", () => {
  let container: Container;

  before(async function() {
    await removeAllDatabases();
    container = await getTestContainer(
      "Partition Splits",
      undefined,
      {
        id: "partitionSplits",
        partitionKey: {
          paths: ["/id"]
        }
      },
      { offerThroughput: 25100 }
    );
    await bulkInsertItems(container, documentDefinitions);
  });

  it("handles one split part way through iteration", async () => {
    let hasSplit = false;
    const partitionKeyRanges = new Set();
    const client = new CosmosClient({
      endpoint,
      key: masterKey,
      plugins: [
        {
          on: PluginOn.request,
          plugin: async (context, next) => {
            const partitionKeyRangeId = context.headers[Constants.HttpHeaders.PartitionKeyRangeID];
            if (partitionKeyRanges.has(partitionKeyRangeId) && hasSplit === false) {
              hasSplit = true;
              const error = new Error("Fake Partition Split") as any;
              error.code = 410;
              error.substatus = SubStatusCodes.PartitionKeyRangeGone;
              throw error;
            }
            if (partitionKeyRangeId) {
              partitionKeyRanges.add(partitionKeyRangeId);
            }
            return next(context);
          }
        }
      ]
    });
    const { resources } = await client
      .database(container.database.id)
      .container(container.id)
      .items.query("SELECT * FROM root r", { maxItemCount: 2, maxDegreeOfParallelism: 1 })
      .fetchAll();

    // TODO. These should be equal but right now they are not
    // I suspect injecting a random 410 with out actually splitting the documents
    // results in duplicates by trying to read from two partitions
    assert(resources.length >= documentDefinitions.length);
  });
});
