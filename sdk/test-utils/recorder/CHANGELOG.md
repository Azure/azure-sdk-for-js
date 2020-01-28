## 2020-01-28

- [BREAKING] `setReplaceableVariables`, `setReplacements`, `skipQueryParams` methods of the recorder are no longer exposed.
  - Equivalent `RecorderEnvironmentSetup` type is being exported instead. An object of this type is expected to be passed in the `record()` call.
  - `record(this)` changes to `record(this, recorderEnvSetup)`, where `recorderEnvSetup` is of type `RecorderEnvironmentSetup`.
  - [PR #7083](https://github.com/Azure/azure-sdk-for-js/pull/7083)
