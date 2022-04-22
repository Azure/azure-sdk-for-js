# Release History
## 1.0.0-beta.2 (2022-03-31)
### Features Added
- Migrated from using `@azure/core-http` to `@azure/core-rest-pipeline` for the handling of HTTP requests. See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move.

### Breaking Changes
- `ShortCodesClient.submitUSProgramBrief` no longer returns the generic `RestResponse` type, and instead returns the more specific `USProgramBrief`. Because of this, the `_response` property is no longer exposed in the returned object. However, in the operation options, it can take a callback (`onResponse`) to access the HTTP response. See https://github.com/Azure/autorest.typescript/wiki/%60core-http%60-dependency-migration-to-%60core-client%60-%60core-rest-pipeline%60#change-to-the-_response-property

## 1.0.0-beta.1 (2021-11-05)

The first preview of the Azure Communication Short Codes Client has the following features:

- Management of US Program Briefs
  - Create, Update, Get, List & Delete
- US Program Brief submission for review to opt for a Short Code
- List owned Short Codes
