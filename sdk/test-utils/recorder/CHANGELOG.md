## 2020-01-30

- Fixed a bug where the replacements aren't properly filtered in the JSON recordings. [#7175](https://github.com/Azure/azure-sdk-for-js/issues/7175)

## 2020-01-29

- Fixed a bug where the replacements provided aren't being replaced in the query-param parts of recordings, which is an expectation for playback. This caused a few test failures during playback for new recordings. More info [#7108](https://github.com/Azure/azure-sdk-for-js/issues/7108)

## 2020-01-28

- [BREAKING] `setReplaceableVariables`, `setReplacements`, `skipQueryParams` methods of the recorder are no longer exposed.

  - Equivalent `RecorderEnvironmentSetup` type is being exported instead. An object of this type is expected to be passed in the `record()` call.
  - `record(this)` changes to `record(this, recorderEnvSetup)`, where `recorderEnvSetup` is of type `RecorderEnvironmentSetup`.
  - [PR #7083](https://github.com/Azure/azure-sdk-for-js/pull/7083)
