Please read the contributing guidelines from the [Azure Team](https://azure.microsoft.com/blog/simple-contribution-to-azure-documentation-and-sdk/)

# Contributing
### Testing

Most of the tests assume emulator running while running tests. From emulator installation directory run following in the terminal to run emulator.
```
Start-Process -FilePath .\Microsoft.Azure.Cosmos.Emulator.exe -ArgumentList "/NoExplorer /NoUI /DisableRateLimiting /PartitionCount =200 /Consistency=Strong /enableRio /EnablePreview /EnableAadAuthentication /EnableSqlComputeEndpoint"
```

- Running all tests: `rushx test`
- Running individual test case: Open the test file and select the test name. Go to `Run and Debug` explorer in VSCode. Select `Test: Selected Test Case` from configuration selector and press run button.
- Running individual test file: Open the test file. Go to `Run and Debug` explorer in VSCode. Select `Test: Current Open File` from configuration selector and press run button.