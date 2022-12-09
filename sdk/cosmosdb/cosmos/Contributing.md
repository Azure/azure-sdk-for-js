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
### Running tests
#### Using command line
- Running all tests: `rushx test`
- Running individual test case: `rushx integration-test:node -g "<test case name>"`
#### Using VSCode
- VSCode test configuration is stored in `.vscode/lauch.json`
- Running individual test case: Open the test file and select the test name. Go to `Run and Debug` explorer in VSCode. Select `Test: Selected Test Case` from configuration selector and press run button.
- Running individual test file: Open the test file. Go to `Run and Debug` explorer in VSCode. Select `Test: Current Open File` from configuration selector and press run button.
