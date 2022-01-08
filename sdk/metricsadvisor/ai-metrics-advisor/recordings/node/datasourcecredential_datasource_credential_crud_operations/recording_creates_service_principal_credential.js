let nock = require('nock');

module.exports.hash = "2e4fa53335bfc4a276c6308e83b59eb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-164160823668205408","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"clientId":"client-id","clientSecret":"client-secret","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/ad883651-15cb-4f24-96c1-f8d201f06e27',
  'x-request-id',
  'd473eb00-7771-4735-a613-b391280dddad',
  'x-envoy-upstream-service-time',
  '267',
  'apim-request-id',
  'd473eb00-7771-4735-a613-b391280dddad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/ad883651-15cb-4f24-96c1-f8d201f06e27')
  .reply(200, {"dataSourceCredentialId":"ad883651-15cb-4f24-96c1-f8d201f06e27","dataSourceCredentialName":"js-test-servicePrincipalCred-164160823668205408","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"client-id","tenantId":"tenant-id"}}, [
  'Content-Length',
  '316',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '35ed774d-c1cb-4656-af6d-44fc58a008a7',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '35ed774d-c1cb-4656-af6d-44fc58a008a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:18 GMT'
]);
