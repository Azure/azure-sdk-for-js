# Test Generator AI Tool

This tool runs unit tests for specified packages and captures their output.

## Building the tool

Before running the tool, ensure you have built the TypeScript files:

```bash
npm install
npm run build
```

## Running the tool

Use the following command to run unit tests for a specific package:

```bash
node dist/main.js --package app-configuration
```

This command will execute the tests for the `app-configuration` package and display real-time output in the terminal. The output will also be saved to a log file (`app-configuration-test-output.log`) in the same directory.

## Adding new packages

To add support for additional packages, update the `projectFolders` mapping in `src/main.ts`.

```typescript
const projectFolders: Record<string, string> = {
  "app-configuration": "sdk/appconfiguration/app-configuration",
  // Add new packages here
};
```
## temp analyzer
This tool analyzes the output of the test generator AI tool and generates a summary report.
```bash
ts-node src/tempAnalyzer.ts > out.log
```
