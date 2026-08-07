import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-modules-only-named": "warn",
      // The Modular emitter names request-body parameters `options` with a model type
      // that is not suffixed `*Options` (for example `options: TextBlocklist` on
      // BlocklistClient.createOrUpdateTextBlocklist, and the same pattern on
      // ContentProvenanceClient.detect). These are emitted files, so the violation
      // cannot be corrected in this repo and would return on the next regeneration.
      // Fixing it properly requires a change to @azure-tools/typespec-ts.
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
]);
