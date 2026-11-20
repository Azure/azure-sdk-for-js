Please also read the contributing guidelines from the [Azure Team](https://azure.microsoft.com/blog/simple-contribution-to-azure-documentation-and-sdk/)

# Contributing
## Testing

### Pre-requisites
- Cosmos DB (Azure or Local Emulator). Use following powershell command from Cosmos DB emulator's installation directory to start emulator.
```
Start-Process -FilePath .\Microsoft.Azure.Cosmos.Emulator.exe -ArgumentList "/NoExplorer /NoUI /DisableRateLimiting /PartitionCount =200 /Consistency=Strong /enableRio /EnablePreview /EnableAadAuthentication /EnableSqlComputeEndpoint"
```
### Test config
Extra environment variables you can use:
- `MOCHA_TIMEOUT`: time in milliseconds before timeout (default is different per test, mostly 10-20 seconds). Useful to set to 999999 during debugging.
- `ACCOUNT_HOST`: account endpoint for testing (default is the emulator running on localhost:8081
- `ACCOUNT_KEY`: masterkey for testing (default is the emulators default key)
- `COMPUTE_GATEWAY_HOST`: explicit Compute Gateway endpoint for the opt-in four-embedding-type vector search test below.

### Four-type vector search end-to-end test

The `should fuse all four vector embedding types through Compute Gateway` test in
`test/public/functional/NonStreamingQueryPolicy.spec.ts` requires a deployment supporting
Float16 embeddings, DiskANN, and vector-only RRF queries. Set `ACCOUNT_HOST` and
`ACCOUNT_KEY` for that test account, and `COMPUTE_GATEWAY_HOST` to its verified Compute
Gateway endpoint. A Float16-capable emulator can use `https://localhost:8081` and
`https://localhost:8903`, respectively, with the emulator key.

The test is skipped when `COMPUTE_GATEWAY_HOST` is absent. Once configured, unsupported
features and request failures fail the test rather than being skipped. Do not supply an
ordinary routing endpoint as `COMPUTE_GATEWAY_HOST`: the test disables endpoint discovery
and verifies every outgoing HTTP origin, but cannot identify server-side routing behind
that endpoint. Confirm the deployment's Compute Gateway route using service traces.

The existing database fixture provisions and cleans up one container with four DiskANN
indexes. The test writes 1,032 deterministic documents through Compute Gateway, including
1,024 distant vectors to exceed DiskANN's minimum population, and drains one four-field
RRF query. Its expected top five is `H, A, G, C, B`. Omitting Float32, Float16, Int8, or
UInt8 would instead yield `A,H,G,B,D`, `A,H,G,B,F`, `H,G,C,A,D`, or `H,C,A,G,D`,
respectively. This is not an ANN recall or index-utilization benchmark.

After installing workspace dependencies, build from the repository root:

```powershell
pnpm turbo build --filter=@azure/cosmos... --token 1
```

Run just this test from `sdk/cosmosdb/cosmos`:

```powershell
pnpm test:node:integration test/public/functional/NonStreamingQueryPolicy.spec.ts -t "should fuse all four vector embedding types through Compute Gateway"
```

Use an isolated test account with capacity for the 1,000 RU/s container. The endpoint
and connection-policy overrides are scoped to the test client, which is disposed during
cleanup; no process-wide configuration is changed.

### Running tests
#### Using command line
- Running all tests: `npm run test`
- Running individual test case: `npm run test:node -g "<test case name>"`
#### Using VSCode
- VSCode test configuration is stored in `.vscode/lauch.json`
- Running individual test case: Open the test file and select the test name. Go to `Run and Debug` explorer in VSCode. Select `Test: Selected Test Case` from configuration selector and press run button.
- Running individual test file: Open the test file. Go to `Run and Debug` explorer in VSCode. Select `Test: Current Open File` from configuration selector and press run button.
