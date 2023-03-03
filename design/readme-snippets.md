# Verification of README snippets

**STATUS**: Work in Progress (https://github.com/Azure/azure-sdk-for-js/pull/24536)

This document specifies how the Azure SDK for JavaScript team verifies README code snippets from each package.  This document covers various solutions to the problem in detail and describes the solution supported by our standard tooling. 

## Background and motivation

At the time of writing, code snippets in the Azure SDK for JS are not subject to any automated testing, and we rely on human analysis (customers or partner teams) to identify and report malformed or erroneous code snippets. In the past, we have discussed using an off-the-shelf snippet extraction tool, but the Azure SDK for JS architecture introduces some challenges:

1. We present code snippets in plain JavaScript, not TypeScript, but our sources and tests are written in TypeScript.
2. Our JavaScript snippets must execute cleanly on our minimum-supported Node.js target without requiring further transpilation (for example, with Babel).
2. We need to support snippets within documentation comments just as well as snippets in README documents.

We therefore require a system that enables us to extract the canonical TypeScript source of a snippet, transpile it to a suitable JavaScript representation, and insert it into target snippet locations in documentation files.

### Prior art: unit-testable snippets in the C# SDK

The Azure SDK for .NET authors README documentation snippets as unit tests in a samples directory, for example: [Text Analytics](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/textanalytics/Azure.AI.TextAnalytics/tests/samples/SampleSnippets.cs).  Each unit test is decorated with a `#region` which is used to extract the snippet text and insert it into a README.  The [Snippet Generator Tool](https://github.com/Azure/azure-sdk-tools/tree/main/tools/snippet-generator/Azure.Sdk.Tools.SnippetGenerator) performs the extraction & insertion.

The `README.md` has named snippet fences such as the following, and the names correspond to a given named region inside `SampleSnippets.cs`

```md
C# Snippet:CreateTextAnalyticsClientTokenCredential
```

The Unit Tests would look like this in C# where it would either have sample text for the README, or pull variables from the environment if generating snippets versus running a unit test.

```csharp
[Test]
public void CreateTextAnalyticsClient()
{
    #region Snippet:CreateTextAnalyticsClient
#if SNIPPET
    string endpoint = "<endpoint>";
    string apiKey = "<apiKey>";
#else
    string endpoint = TestEnvironment.Endpoint;
    string apiKey = TestEnvironment.ApiKey;
#endif
    TextAnalyticsClient client = new(new Uri(endpoint), new AzureKeyCredential(apiKey));
    #endregion
}
```

## The JavaScript solution

The Azure SDK for JavaScript will also utilize this pattern where there will be a `snippets` directory under the `test` directory.  The README snippets will reside in the `readme.spec.ts` and will have the following form where the top level `describe` method text is `readme-snippets`, and the subsequent `it` method text would be the snippet to be inserted such as the following for the `template` project.  We would then initialize the client as normal with fallbacks to a sample value if not defined in the `process.env` such as `"<endpoint>"`.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { ConfigurationClient } from "@azure/template";

describe("readme-snippets", () => {

  it("CreateConfigurationClient", async () => {
    const endpoint = process.env.ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const key = process.env.KEY || "<key>";

    const client = new ConfigurationClient(endpoint, credential);

    // @ts-ignore
    const setting = await client.getConfigurationSetting(key);
  });

});
```

The README shall have gated sections just as the Azure SDK for .NET such as the following:

```md
ts snippet:CreateConfigurationClient
```

The resulting text from the above unit test should be then inserted into the README during compilation time where it will pull in appropriate imports from the top level as necessary, and fall back to the sample text for each configuration value.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { ConfigurationClient } from "@azure/template";

const endpoint = "<endpoint>";
const credential = new DefaultAzureCredential();
const key = "<key>";

const client = new ConfigurationClient(endpoint, credential);

const setting = await client.getConfigurationSetting(key);
```

This system works for JSDoc code snippets just as well as README code snippets.  For example, for the `ConfigurationClient` class constructor, the following snippet is subject to automatic updating/replacement by the snippet extractor:

```typescript
  /**
   * Creates an instance of a ConfigurationClient.
   *
   * Example usage:
   * ```ts snippet:CreateConfigurationClient
   * import { ConfigurationClient} from "@azure/template";
   * import { DefaultAzureCredential} from "@azure/identity";
   *
   * const client = new ConfigurationClient(endpoint, credential);
   * ```
   * @param endpointUrl - the URL to the App Configuration endpoint
   * @param credential - used to authenticate requests to the service
   * @param options - optional configuration used to send requests to the service
   */
```

### Files subject to snippet extraction

The following set of files within a package directory is subject to snippet extraction:

- Any Markdown file (ending with `.md`) immediately within the package directory (not any subfolder).
- Any Markdown file (ending with `.md`) within the `samples-dev` folder of the package or any of its children with unlimited depth.
- Any TypeScript file (ending with `.ts` in the `src`, `test`, or `samples-dev` folders of the package or any of their children with unlimited depth.

A file may opt out of snippet extraction using a comment directive. Any files containing the following text are ignored:

- For Markdown files, `<!-- dev-tool snippets ignore -->`.
- For TypeScript Files: `// dev-tool snippets ignore`.

For readability, these directive comments SHOULD be placed at or near the top of the file, but the file will be ignored if it contains this text anywhere.
### Parsing the TypeScript Tests

These are the rules for parsing the unit tests for the Azure SDK for JavaScript.  Any deviations from this pattern shall be an error.

1. Each `it` method will be extracted as a `CallExpression` with the `StringLiteral` as the name of the snippet name
2. The method body will be a child of the `ArrowFunction` or `FunctionExpression` as a `Block`
3. Any `BinaryOperation` where the operator is `BarBarToken` and the left expression is a `process.env` access expression OR nullish coalescing operator where the left hand side is a `process.env` access will be replaced by the right hand side expression.
4. An import will be added to the generated code snippet for every `Identifier` which has a `Symbol` with a declaration of an `ImportSpecifier`.

### Work required

The work required to make this happen has the following parts:

- Write the TypeScript AST parser for the snippets using the above rules.
- Write a scanner to scan the README for the appropriate snippets and insert.
- Write a scanner to scan the source files for appropriate snippets and insert.
- Create DevTool Command and insert into the npm scripts for each project.
