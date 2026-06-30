We use recommended rules from `eslint`, `typescript-eslint`, and a set of our custom rules to ensure our code adhere to the Azure SDK design guidelines and have high quality.

In this document, we describe how to address common linting issues for a package.

# Azure SDK eslint plugin

Our custom linting rules and recommended configurations is hosted in the `@azure/eslint-plugin-azure-sdk` package. You MUST build it first before linting any SDK packages.

- `pnpm install`
- `pnpm turbo build --filter=@azure/eslint-plugin-azure-sdk...`

It also gets built as a dependency of any SDK packages.

# Linting a package

This is done by running `pnpm lint` under the package directory.

1. `cd sdk/<service-directory>/<package-directory>` if your current directory is not the package directory yet.
2. `pnpm lint`

# Fixing linting issues

You should NEVER turn off a rule in `@azure/eslint-plugin-azure-sdk` to resolve linting issues.

Some linting rules provide auto fixer. To use them, run `pnpm lint:fix` under the package directory.

For linting issues that `lint:fix` script could not resolve, you will need to examine the code and fix the issues accordingly.

For documentation on `eslint` rules, refer to https://eslint.org/docs/latest/rules/.

For documentation on `typescript-eslint` rules, refer to https://typescript-eslint.io/rules/

For a generated package whose name starts with `@azure/arm-` or `@azure-rest/`, there might be "tsdoc/syntax" warnings because generated code files often contains some characters in reference docs that are not recommended in TSDoc. We should NEVER fix auto-generated files. You can add rules to suppress the "tsdoc/syntax" rules in the package's ESLint configuration file eslint.config.mjs. Create that file by using one from other packages as a template but do not copy rules that don't apply.
