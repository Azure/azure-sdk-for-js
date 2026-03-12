# PR Review History

## PR #5 - MaryGao/azure-sdk-for-js (2026-03-12)
- **Package**: `@azure/arm-commerce`
- **Version**: `4.0.0-beta.4`
- **Type**: Full migration from legacy `@azure/core-client` to new modular `@azure-rest/core-client` generation
- **Outcome**: 3 design concerns flagged (all tool issues)
  1. `UsageAggregation.infoFields?: any` — type regression from `InfoField`
  2. `UsageSample.infoFields?: any` — new model with `any` field
  3. CHANGELOG missing `### Breaking Changes` section
