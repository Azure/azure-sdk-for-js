let nock = require('nock');

module.exports.hash = "97bf2734cfbe6d9d016b809733fcc9a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/d4348883-7f69-4f3e-9523-bde85ae79abb', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-164264036985603664","dataSourceCredentialDescription":"updated description","parameters":{"accountKey":"updated account key"}})
  .reply(200, {"dataSourceCredentialId":"d4348883-7f69-4f3e-9523-bde85ae79abb","dataSourceCredentialName":"js-test-datalakeCred-164264036985603664","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '257',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '16592eaa-508e-47ee-be96-29e18e831071',
  'x-envoy-upstream-service-time',
  '318',
  'apim-request-id',
  '16592eaa-508e-47ee-be96-29e18e831071',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:31 GMT'
]);
