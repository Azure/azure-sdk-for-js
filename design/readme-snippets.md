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

The Azure SDK for .NET authors README documentation snippets as unit tests in a samples directory, for example: [Text Analytics](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/textanalytics/Azure.AI.TextAnalytics/tests/samples/SampleSnippets.cs). Each unit test is decorated with a `#region` which is used to extract the snippet text and insert it into a README. The [Snippet Generator Tool](https://github.com/Azure/azure-sdk-tools/tree/main/tools/snippet-generator/Azure.Sdk.Tools.SnippetGenerator) performs the extraction & insertion.

The `README.md` has named snippet fences such as the following, and the names correspond to a given named region inside `SampleSnippets.cs`

````md
```C# Snippet:CreateTextAnalyticsClientTokenCredential
````

The C# snippet unit tests further use a `SNIPPET` preprocessor definition to either include string values or environment variables for commonly-used data, so that the snippet tests can use environment variables in live testing contexts, but will present simple string values in when rendered as snippets in Markdown.

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

The Azure SDK utilizes a similar pattern based on a snippet file that is unit-testable. Within each package, all code snippets are authored as unit-tests using the Mocha test framework in a file named **`snippets.spec.ts`**. The snippet file must have the following form, as an example:

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { ConfigurationClient } from "@azure/template";

describe("snippets", function () {

  it("GetConfigurationSetting", async function () {
    const endpoint = process.env.ENDPOINT ?? "<endpoint>";
    const credential = new DefaultAzureCredential();
    const key = process.env.KEY ?? "<key>";

    const client = new ConfigurationClient(endpoint, credential);

    // @ts-ignore
    const setting = await client.getConfigurationSetting(key);
  });

});
```

The top-level `describe` call defines a suite named `"snippets"`, and any nested `it` calls define unit tests where the name given is the name of the corresponding snippet. The above file defines a single snippet named `"GetConfigurationSetting"`. The snippet initializes the client using environment variables but coalesces those values to string literals if the environment variables are undefined. Because the resulting `setting` variable is unused, the `@ts-ignore` designation must be applied to prevent a compiler error.

To create a code snippet in a README file or documentation comment, the snippet name is applied to the code fence (just as we saw in the Azure SDK for .NET example above):

````md
```js snippet:GetConfigurationSetting
````

Following the migration of a package to utilize this snippet extraction system, it is an error for any snippet to be unnamed. All JavaScript and TypeScript snippets **MUST** declare a name, and that name **MUST** match the name of a snippet in the `snippets.spec.ts` file. 

The snippet extraction tool will then extract the text of the corresponding snippet within the `snippets.spec.ts` file, transpile and validate it, and then update the fence contents with the resulting JavaScript source. It automatically detects the relevant imports and replaces the `process.env` coalescent access expressions we saw above with _only_ the simple string example value from the right-hand side.

 ```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { ConfigurationClient } from "@azure/template";

const endpoint = "<endpoint>";
const credential = new DefaultAzureCredential();
const key = "<key>";

const client = new ConfigurationClient(endpoint, credential);

const setting = await client.getConfigurationSetting(key);
```

This system works for JSDoc code snippets just as well as README code snippets. For example, for the `ConfigurationClient` class constructor, the following snippet is subject to automatic updating/replacement by the snippet extractor:

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

### The snippet extraction tool

The snippet extractor is part of `dev-tool`, and is invoked using the following command:

```bash
$ npx dev-tool run update-snippets
```

The tool detects the current package and runs the above-described process automatically. If any code fences denoting `js`, `ts`, `javascript`, or `typescript` language tags are encountered and do not declare a snippet name (`snippet:<Name>`), an error is thrown.


It MAY be possible to automatically migrate a package from a state where the snippets are not named to a state where the snippets are named. If this functionality is supported for a package, it can be invoked using the `--migrate` flag to the `update-snippets` command:

```bash
$ npx dev-tool run update-snippets --migrate
```

This will attempt a BEST EFFORT migration. It is not expected that this will yield a perfect, or even a compiling result. It is expected that maintainers MUST manually verify the correctness of the resulting migration.

### Files subject to snippet extraction

The following set of files within a package directory is subject to snippet extraction:

- Any Markdown file (ending with `.md`) immediately within the package directory (not any subfolder).
- Any Markdown file (ending with `.md`) within the `samples-dev` folder of the package or any of its children with unlimited depth.
- Any TypeScript file (ending with `.ts`) in the `src`, `test`, or `samples-dev` folders of the package or any of their children with unlimited depth.

A file may opt out of snippet extraction using a comment directive. Any files containing the following text are ignored:

- For Markdown files, `<!-- dev-tool snippets ignore -->`.
- For TypeScript Files: `// dev-tool snippets ignore`.

For readability, these directive comments SHOULD be placed at or near the top of the file, but the file will be ignored if it contains this text anywhere.

### Parsing the TypeScript Tests

Snippets are extracted using the TypeScript compiler API. Strictly, a code snippet is extracted using the following method:

1. The file `test/snippets.spec.ts` is read and parsed in the context of the package local to where `dev-tool` was invoked.
2. Each `CallExpression` where the called expression is the literal identifier `it` and the first argument is a `StringLiteral` and the second argument is a function expression (`ArrowFunction` or `FunctionExpression`) is treated as the definition of a snippet, where the snippet name is the extracted `StringLiteral` text.
3. If the second argument is an `ArrowFunction`, its body must be a `Block` (i.e. it is not allowed for the function's body to be an `Expression` as in `() => "test"`, it must be `() => { return "test"; }` instead).
4. Any `BinaryOperation` where the operator is `BarBarToken` or `QuestionMarkQuestionMarkToken` (i.e. a binary logical or operation or nullish coalescing operator) and where the left-hand-side expression is a `process.env` access expression will be replaced by the right-hand-side expression within the extracted `Block`.
5. The symbols within the `Block` are analyzed to determine whether or not they refer to the definitions within any imports (their type symbols resolve to an import source that is an `ImportSpecifier`), and corresponding `import` declarations are added to the beginning of the extracted `Block`. 
6. The contents of the extracted & modified `Block` are validated to ensure they do not contain any syntax that will not function on our minimum-supported Node.js target.
7. If the target language (as declared in the code fence) is `js` or `javascript`, the extracted & modified `Block` is transpiled to JavaScript using the same method we use for compiling samples.

## Implementation status

- [x] Write the TypeScript AST parser for the snippets using the above rules.
- [x] Write a scanner to scan the README for the appropriate snippets and insert.
- [x] Write a scanner to scan the source files for appropriate snippets and insert.
- [x] Create DevTool Command and insert into the npm scripts for each project.
- [ ] (Stretch) Support automated migration well.
