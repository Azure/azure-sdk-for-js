# Release History

## 1.0.1 (Unreleased)

- getOperationState() now returns TState.
- PollerLike's TState now extends PollOperationState.
- Since getOperationState() can be overwritten,
  it can return a subset of the Poller's TState,
  which can exist as a separate type, to effectively separate between public and private state.

## 1.0.0 (2019-10-29)

This release marks the general availability of the `@azure/core-lro` package.

- Updated PollOperation to be more strictly typed.

## 1.0.0-preview.1 (2019-10-22)

- Initial implementation of an abstraction for Long Running Operations (LROs).
