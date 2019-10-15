# Release History

## 4.0.0-preview.9 (2019-10-31)

- createCertificate is now out of the public API. Use beginCreateCertificate instead. beginCreateCertificate and getCertificateOperation return a Long Running Operation Poller (from our package @azure/core-lro).

## 4.0.0-preview.8 (2019-10-09)

- Updated to use the latest version of `@azure/core-tracing`, `@azure/core-http` and `@azure/core-arm` packages

## 4.0.0-preview.7 (2019-10-08)

- API Changes:
  - Nested classes are now flattened into a "properties" property.
  - createCertificate now receives any of the flattened properties as the third parameter.
  - The Certificate type now can have an optional policy property, which replaces the CertificateWithPolicy type.

## 4.0.0-preview.6 (2019-09-17)

- Fixed the path of the main TypeScript types. Issue: https://github.com/Azure/azure-sdk-for-js/issues/5166

## 4.0.0-preview.5 (2019-09-11)

- Released keyvault-certificates.
