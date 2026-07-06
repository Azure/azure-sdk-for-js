# Azure REST Level Breaking Change Rules

## Special Rule Set

Special rule set for Azure REST level client: [rule set](../src/azure/rule-sets/rest-level-client-rule-sets.ts).

### Non-Breaking Changes

- Operation name changes: [rule](../src/azure/common/rules/ignore-operation-interface-name-changes.ts)
- Request parameter model name changes: [rule](../src/azure/common/rules/ignore-request-parameter-model-name-changes.ts)
- Response model name changes:
- 

### Breaking Changes

- Path value changes

### TODO

- Request parameter type changes with content type
