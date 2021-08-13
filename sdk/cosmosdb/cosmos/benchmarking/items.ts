import { CosmosClient, Container, OperationInput } from "@azure/cosmos";

const endpoint = process.env.BENCHMARK_ENDPOINT || "https://stfaul-sql.documents.azure.com:443/";
const iterations = Number(process.env.BENCHMARK_ITERATIONS) || 100;

async function benchmark(
  benchmarkFunction: (container: Container) => Promise<void>,
  container: Container
) {
  const now = Date.now();
  await benchmarkFunction(container);
  const later = Date.now();
  return later - now;
}

async function readAllItems(container: Container) {
  const queryIterator = container.items.readAll({ maxItemCount: iterations });
  await queryIterator.fetchNext();
}

function readInBatches(batchSize: number) {
  return async function(container: Container) {
    const iterator = container.items.readAll({ maxItemCount: batchSize });
    let { queryIterator, continuationToken } = await readBatch(container, batchSize, iterator);
    while (queryIterator.hasMoreResults()) {
      const response = await readBatch(container, batchSize, queryIterator, continuationToken);
      queryIterator = response.queryIterator;
      continuationToken = response.continuationToken;
    }
  };
}

async function readBatch(
  container: Container,
  batchSize: number,
  queryIterator: any,
  token?: string
) {
  queryIterator = container.items.readAll({ maxItemCount: batchSize, continuationToken: token });
  const response = await queryIterator.fetchNext();
  const continuationToken = response.continuationToken;
  return { queryIterator, continuationToken };
}

async function createItems(container: Container, count: number = 0) {
  const random = `id${Math.floor(Math.random() * 10000)}`;
  await container.items.upsert({ id: random });
  if (count < iterations) {
    count = count + 1;
    await createItems(container, count);
  }
}

async function bulkCreateItems(container: Container) {
  const operations: OperationInput[] = [];
  while (operations.length < iterations) {
    operations.push({
      operationType: "Create",
      partitionKey: "A",
      resourceBody: { id: `id${Math.floor(Math.random() * 10000)}`, key: "A" }
    });
  }
  await container.items.bulk(operations);
}

async function runBenchmarks() {
  const client = new CosmosClient({
    endpoint,
    key: process.env.BENCHMARK_KEY
  });
  const databaseResponse = await client.databases.createIfNotExists({ id: "benchmarkdb" });
  const containerResponse = await databaseResponse.database.containers.createIfNotExists({
    id: `benchmarkcontainer${Math.floor(Math.random() * 10000)}`
  });
  const container = containerResponse.container;
  const benchmarkCreate = await benchmark(createItems, container);
  const benchmarkBulkCreate = await benchmark(bulkCreateItems, container);
  const benchmarkRead = await benchmark(readAllItems, container);
  const benchmarkBatchesOf5 = await benchmark(readInBatches(5), container);
  const benchmarkBatchesOf50 = await benchmark(readInBatches(50), container);
  return {
    create: benchmarkCreate,
    bulkCreate: benchmarkBulkCreate,
    readAll: benchmarkRead,
    readInBatchesOf5: benchmarkBatchesOf5,
    readInBatchesOf50: benchmarkBatchesOf50
  };
}

runBenchmarks().then(console.log);
