# Release History

## 1.0.0-beta.1 (2021-02-04)

- First release of package, see README.md for details.
- Changes from related functionality in `core-http`:
  - Replace URLBuilder with runtime-supported URL primitive.
  - Rewrite `ServiceClient` on top of `core-https` and remove unused codepaths.
  - Remove `_response` on operation results and replace with `onResponse` callback.
