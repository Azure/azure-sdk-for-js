# Release History

## 1.0.0-beta.2 (2022-02-08)
### Features Added
- Updated HTTP client to ``core-rest-pipeline``
### Breaking Changes
- The new core library no longer exposes the _response property on the operation return types. However, in the operation options, it can take a callback (onResponse) to access the HTTP response. See https://github.com/Azure/autorest.typescript/wiki/%60core-http%60-dependency-migration-to-%60core-client%60-%60core-rest-pipeline%60#change-to-the-_response-property

## 1.0.0-beta.1 (2021-11-05)

The first preview of the Azure Communication Short Codes Client has the following features:

- Management of US Program Briefs
  - Create, Update, Get, List & Delete
- US Program Brief submission for review to opt for a Short Code
- List owned Short Codes
