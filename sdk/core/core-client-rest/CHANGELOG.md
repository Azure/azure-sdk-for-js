# Release History

## 1.0.0-beta.10 (2022-06-07)

### Fixes

- Fix to avoid skip `JSON.stringify` when the body is already a string. [20753](https://github.com/Azure/azure-sdk-for-js/pull/20753)

### Other Changes

- Create new pipeline using @azure/core-rest-pipeline's `createPipelineFromOptions`, instead of a custom pipeline. [#21949](https://github.com/Azure/azure-sdk-for-js/pull/21949)
- Fix URL encoding for query parameters. [#20972](https://github.com/Azure/azure-sdk-for-js/pull/20972)

## 1.0.0-beta.9 (2022-04-07)

### Features Added

- Handle Binary and FormData content. [#18753](https://github.com/Azure/azure-sdk-for-js/pull/18753)
- Support custom base url with path parameters. [#19463](https://github.com/Azure/azure-sdk-for-js/pull/19463)
- Added new `ClientOptions` member `additionalPolicies` to allow passing custom pipeline policies to client constructors. [#20175](https://github.com/Azure/azure-sdk-for-js/pull/20175)

## 1.0.0-beta.8 (2021-11-04)

### Other Changes

- Add options skipUrlEncoding to support skip path parameter encoding. [#18381](https://github.com/Azure/azure-sdk-for-js/pull/18381)
- Adding more robust handling of request and response body. [#18478](https://github.com/Azure/azure-sdk-for-js/pull/18478)

## 1.0.0-beta.7 (2021-09-02)

### Other Changes

- Create pipeline from scratch excluding tracingPolicy to decrease bundle size. [#17015](https://github.com/Azure/azure-sdk-for-js/pull/17015)
- Allow number and boolean as input headers. [#17358](https://github.com/Azure/azure-sdk-for-js/pull/17358)

## 1.0.0-beta.6 (2021-08-05)

### Fixes

- Fixed exported types [#15898](https://github.com/Azure/azure-sdk-for-js/pull/15898)

## 1.0.0-beta.5 (2021-06-24)

### Features Added

- Expose client option to set `allowInsecureConnection` to support http. [#15831](https://github.com/Azure/azure-sdk-for-js/pull/15831)
- Add new createRestError which takes a response to create a RestError. [#15831](https://github.com/Azure/azure-sdk-for-js/pull/15831)

## 1.0.0-beta.4 (2021-05-27)

- Update @azure/core-rest-pipeline dependency to GA. [#15435](https://github.com/Azure/azure-sdk-for-js/pull/15435)

## 1.0.0-beta.3 (2021-05-26)

- Set Date in query string parameters as ISO string. [#15209](https://github.com/Azure/azure-sdk-for-js/pull/15209)

## 1.0.0-beta.2 (2021-05-12)

- Add CertificateCredential to support client certificate authentication. [#15172](https://github.com/Azure/azure-sdk-for-js/pull/15172)

## 1.0.0-beta.1 (2021-04-22)

- First release of package, see README.md for details.
