### Running benchmarks

```
npm install @azure/cosmos (or have it globally installed)
```

Edit process.env for BENCHMARK_ENDPOINT, BENCHMARK_KEY and optionally BENCHMARK_ITERATIONS (default 100)

then run

```
npx ts-node items.ts
```

and you'll see output like:

```
{
  create: 2162,
  bulkCreate: 81,
  readAll: 163,
  readInBatchesOf5: 553,
  readInBatchesOf50: 76
}

Times in milliseconds for a default of 100 items
```
