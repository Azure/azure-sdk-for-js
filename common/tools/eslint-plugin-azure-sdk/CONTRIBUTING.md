# Contributing

## Releases

Additional rules or top-level features (e.g. autofixing) should be implemented in minor releases.

Changes to rule implementation (e.g. redefinition of copyright headers) should be implemented in patch releases.

## Rules

According to ESLint conventions, each rule has three files dedicated to it, one in `docs/rules`, one in `src/rules`, and one in `tests/rules`.

### `docs/rules`

This file contains a verbal description of the rule. Generally, the structure is as follows:

- Description
- Examples (good & bad)
- When to turn it off
- Source

The description is intended to cover a brief overview of the rule, with more specifics behind reasoning left to the guideline website. However, if the rule takes any creative license with interpretations of the guidelines or is only able to enforce a subset of the source guideline, this should be explicitly detailed in the description.

### `src/rules`

This file contains the implementation of of the rule and is the only of the three files to actually be shipped with the NPM package.

Each rule consists of a `meta` object and a `create` function that returns an object containing listeners to process AST nodes.

#### `meta`

This object contains metadata about the rule. As the structure is very similar across rules, you should use the `getRuleMetaData` helper in `src/utils` to construct this object.

In order, you should pass in:

- The name of the rule
- A short description of the rule
- (Optional) `"code"` or `"whitespace"` if the rule is fixable by these methods

#### `create`

This is where the actual implementation lies. `create` only takes in one `context` argument of type `Rule.RuleContext`.

If the rule should operate only on a subset of files (e.g. `package.json` or `src`), you can use `context.getFileName()` to conditionally return what you want. If you want the rule to ignore certain files, return an empty object to show that there are no AST node listeners for this specific situation.

The returned object should be keyed by the [selector](https://eslint.org/docs/developer-guide/selectors) corresponding to the nodes you want to operate on.

The property value should be a function that will be called on all AST nodes returned by the selector. You should try to make the property type as specific as possible; however, if you are using TypeScript-specific AST functionality you may encounter conflicts between `ESTree` and `TSEStree` nodes.

As a rule of thumb, unless the node you are operating on exists exclusively in `TSESTree`, you should use the `ESTree` type instead of the `TSESTree type`. To access the TypeScript-specific properties, cast the node to its `TSESTree` equivalent but always make sure to pass in the `ESTre`e version into any `context.report()` calls.

If your listener function parameters are anything other than `any` or `Node`, you will likely need to cast the returned object to `Rule.RuleListener` due to badly designed types in `@types/eslint`.

### `tests/rules`

Currently, all rules are tested through the [`RuleTester`](https://eslint.org/docs/developer-guide/nodejs-api#ruletester) framework. You'll need to initialize the RuleTester instance as follows to properly process your test cases:

```ts
const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
});
```

The major limitation to `RuleTester` is that it only processes code as text with an optional filename. While this is enough for idiomatic ESLint functionality, usage of the TypeScript compiler API with some rules becomes difficult.

Especially when concerning package-level public exports, it's impossible to simulate inter-file relationships using `RuleTester`. Using [`CLIEngine`](https://eslint.org/docs/developer-guide/nodejs-api#cliengine) instead would allow such situations to be simulated, but would require a complete overhaul of all rule tests.

### Other files

While these are the files dedicated to specific rules, if you add a rule, you'll also need to update the following files:

- `src/configs/index.ts`: Set the `recommended` setting of the rule - this is the only place you'll need to use the `@azure/azure-sdk` prefix
- `src/rules/index.ts`: Import and export the rule for inclusion in the top-level module
- `tests/plugin.ts`: This file tests the structure of the plugin - add the rule name to `ruleList` for that rule's structure to be tested
- `README.md`: Add the rule to the `Supported Rules` table, with a link to it's `docs/rules` file, its default `recommended` setting, whether it supports autofixing, and the version it was released on
