## 1.1.0 - 2019-12-03

- Changed `PollerLike<TState, TResult>` to be `PollerLike<TResult>`.
  Besides producing a cleaner API, the only consequence is that
  the onProgress method now will only receive the basic version of the operation state.

## 1.0.0 - 2019-10-29

This release marks the general availability of the `@azure/core-lro` package.

- Updated PollOperation to be more strictly typed.

## 1.0.0-preview.1 - 2019-10-22

- Initial implementation of an abstraction for Long Running Operations (LROs).
