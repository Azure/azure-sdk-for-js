import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["src/bin/gen-model.ts"],
    rules: {
      "n/no-process-exit": "off",
      "n/hashbang": "off",
      // shebang needs to come first
      "@azure/azure-sdk/github-source-headers": "off",
      // Dev-only codegen script (regenerates model code); not a shipped package entry point
      // (no `bin` field, unreachable from `main`). It intentionally uses devDependencies
      // (@azure/identity, prettier) that must not be added as runtime dependencies.
      "import-x/no-extraneous-dependencies": "off",
    },
  },
]);
