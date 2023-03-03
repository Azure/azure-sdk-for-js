# Verification of README snippets

**STATUS**: Work in Progress (https://github.com/Azure/azure-sdk-for-js/pull/24536)

This document specifies how the Azure SDK for JavaScript team verifies README code snippets from each package.  This document covers various solutions to the problem in detail and describes the solution supported by our standard tooling. 

## Unit Tests as Documentation Prior Art

The Azure SDK for .NET publishes their README documentation snippets as unit tests in a samples directory, for example for [Text Analytics](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/textanalytics/Azure.AI.TextAnalytics/tests/samples/SampleSnippets.cs).  Each unit test is decorated with a `#region` which is then extracted into the README.  The [Snippet Generator Tool](https://github.com/Azure/azure-sdk-tools/tree/main/tools/snippet-generator/Azure.Sdk.Tools.SnippetGenerator) can be run to extract the snippets into the README.

The `README.md` has named snippet gates such as the following which then corresponds to a given named region inside the `SampleSnippets.cs`

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

This will also be used for JSDoc code snippets that shall be inserted into the source files themselves.  For example, for the `ConfigurationClient` class constructor, the following would be inserted.  All source files will be scanned for the matching `ts snippet:<SomeSnippetIdentifier>` and the insertion will be done.

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
