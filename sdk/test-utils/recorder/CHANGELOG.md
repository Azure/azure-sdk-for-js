## 2020-01-27

- Fixed a bug where the replacements provided aren't being replaced in the query-param parts of recordings, which is an expectation for playback. This caused a few test failures during playback for new recordings. More info [#7108](https://github.com/Azure/azure-sdk-for-js/issues/7108)
