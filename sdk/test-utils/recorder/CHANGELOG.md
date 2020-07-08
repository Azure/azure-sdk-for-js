# Release History

## 1.0.0 (Unreleased)

## 2020-04-30

- Since Mocha 7.0.0, Mocha behaves as follows: "When conditionally skipping in the `it` test, related afterEach hooks are now executed"
  ([Source](https://github.com/mochajs/mocha/blob/master/CHANGELOG.md#700--2020-01-05)), now the `recorder.stop()` calls in the `afterEach()` will always be executed. Calling `recorder.skip` should not call `recorder.stop()` anymore.

## 2020-02-06

- If any URLs are meant to be replaced in the recordings with `replaceableVariables`, hostname from the URLs will be independently matched and replaced. [#7204](https://github.com/Azure/azure-sdk-for-js/issues/7204)
  - Example - ENV_VAR `ACCOUNT_URL=https://azureaccount.com/` is supposed to be replaced with `https://endpoint/`, `azureaccount.com` will be independently matched and replaced with `endpoint` too.
- Added the "soft-record" mode, which allows users to only record the tests that have changed. [#7213](https://github.com/Azure/azure-sdk-for-js/issues/7213)
- Added TestContext, TestContextInterface, TestContextTest in exchange of Mocha.Context. They're compatible types, but ours are easier to test.
- Added windowLens, a lens to modify and retrieve properties from the Window object. Useful for future refactorings.

- [BUG FIX] Tests leveraging `coreHttp.requestOptions.timeout` with empty recordings(no nock scopes with request-responses defined in the recording) fail during the playback mode when executed along with other tests. Fixed the issue by resetting nock's global state. More info - [#7264](https://github.com/Azure/azure-sdk-for-js/issues/7264)

## 2020-01-30

- [BUG FIX] Fixed a bug where the replacements aren't properly filtered in the JSON recordings. [#7175](https://github.com/Azure/azure-sdk-for-js/issues/7175)

## 2020-01-29

- [BREAKING] `replaceInRecordings` attribute of `RecorderEnvironmentSetup` interface has been renamed to `customizationsOnRecordings`.

## 2020-01-28

- [BUG FIX] Fixed a bug where the replacements provided aren't being replaced in the query-param parts of recordings, which is an expectation for playback. This caused a few test failures during playback for new recordings. More info [#7108](https://github.com/Azure/azure-sdk-for-js/issues/7108)

- [BREAKING] `setReplaceableVariables`, `setReplacements`, `skipQueryParams` methods of the recorder are no longer exposed.

  - Equivalent `RecorderEnvironmentSetup` type is being exported instead. An object of this type is expected to be passed in the `record()` call.
  - `record(this)` changes to `record(this, recorderEnvSetup)`, where `recorderEnvSetup` is of type `RecorderEnvironmentSetup`.
  - [PR #7083](https://github.com/Azure/azure-sdk-for-js/pull/7083)
