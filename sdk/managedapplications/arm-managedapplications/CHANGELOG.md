## 30.0.0-beta.1 (Unreleased)

This is beta preview version.

This version uses a next-generation code generator that introduces important breaking changes, but also important new features (like unified authentication and async programming).

**General breaking changes**

- Authentication system has been completely revamped:

  - Package `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported, use package `@azure/identity` instead: https://www.npmjs.com/package/@azure/identity

- Operations with prefix `begin` like `beginXXX` that used to return a `Promise<Models.XXX>` now returns a poller that implements the `PollerLike` interface, and if you want to get previous result, please use operation name with prefix `begin` and suffix `AndWait`, such as `beginXXXAndWait`.
- Operation `list` used to return `Promise<Models.XXX>` now returns an iterable result: `PagedAsyncIterableIterator`.
- The sdk is based on ES6.
- Only LTS version of Node.js is supported, and you will get a warning if you are using old Node.js version.
