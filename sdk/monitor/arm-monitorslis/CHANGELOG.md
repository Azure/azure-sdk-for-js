# Release History

## 1.0.0-beta.3 (2026-06-25)
Compared with version 1.0.0-beta.1

### Features Added
  - Enum KnownSamplingType has a new value Average
  - Enum KnownSamplingType has a new value Count

### Breaking Changes
  - Enum KnownSamplingType no longer has value Avg

## 1.0.0-beta.2 (2026-05-23)
Compared with version 1.0.0-beta.1

### Features Added

- Added `Average` and `Count` values to `KnownSamplingType`.
- Added public exports for `RestError` and `isRestError`.

### Breaking Changes

- Removed `Avg` from `KnownSamplingType`.
- Changed `KnownSamplingType` wire values for `Max`, `Min`, and `Sum` from `max`, `min`, and `sum` to `Max`, `Min`, and `Sum`.
- Changed `KnownConditionOperator` wire values: `==` to `eq`, `!=` to `ne`, `>` to `gt`, `>=` to `gte`, `<` to `lt`, `<=` to `lte`, `@in` to `in`, `!in` to `notin`, `!contains` to `notcontains`, and `!startswith` to `notstartswith`.
- Changed `KnownWindowUptimeCriteriaComparator` wire values: `>` to `gt`, `>=` to `gte`, `<` to `lt`, and `<=` to `lte`.

## 1.0.0-beta.1 (2026-04-22)

### Features Added

- Initial preview release of `@azure/arm-monitorslis` for managing Service Level Indicator (SLI) resources under the `Microsoft.Monitor` namespace.
- Support for SLI resource CRUD operations: create or update, get, delete, and list.
- SLI evaluation with Availability and Latency categories, supporting both window-based and request-based evaluation types with configurable signal sources, aggregation, and SLO baselines.
- Integration with Azure Monitor Workspace (AMW) accounts for metric emission, with managed identity and alert support.
