import { CosmosClient, Container } from "@azure/cosmos";

const endpoint = process.env.BENCHMARK_ENDPOINT || 'https://stfaul-sql.documents.azure.com:443/';
const iterations = Number(process.env.BENCHMARK_ITERATIONS) || 100;

async function benchmarkCreateItems (container: Container) {
    const now = Date.now();
    await createItems(container, 0)
    const later = Date.now();
    return later - now;
}

async function benchmarkReadAll (container: Container) {
    const now = Date.now();
    await readAllItems(container)
    const later = Date.now();
    return later - now;
}

async function readAllItems(container: Container) {
    const now = Date.now();
    const queryIterator = container.items.readAll({ maxItemCount: iterations });
    await queryIterator.fetchNext();
    const later = Date.now();
    return later - now;
}


async function createItems(container: Container, count: number) {
    const random = `id${Math.floor(Math.random() * 10000)}`
    await container.items.upsert({ id: random })
    if (count < iterations) {
        count = count + 1;
        await createItems(container, count)
    }
}


async function benchmark () {
    const client = new CosmosClient({
        endpoint,
        key: process.env.BENCHMARK_KEY,
    });
    const databaseResponse = await client.databases.createIfNotExists({ id: 'benchmarkdb' })
    const containerResponse = await databaseResponse.database.containers.createIfNotExists({ id: 'benchmarkcontainer' })
    const benchmarkCreate = await benchmarkCreateItems(containerResponse.container);
    const benchmarkRead = await benchmarkReadAll(containerResponse.container);
    return {
        create: benchmarkCreate,
        read: benchmarkRead,
    }
}

benchmark().then(console.log)