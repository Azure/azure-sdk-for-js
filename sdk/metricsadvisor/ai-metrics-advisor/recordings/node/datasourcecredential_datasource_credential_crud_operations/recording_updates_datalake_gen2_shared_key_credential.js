let nock = require('nock');

module.exports.hash = "97bf2734cfbe6d9d016b809733fcc9a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/7da36fdb-0164-4165-8d7b-bec00021dc12', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-164160823668202890","dataSourceCredentialDescription":"updated description","parameters":{"accountKey":"updated account key"}})
  .reply(200, {"dataSourceCredentialId":"7da36fdb-0164-4165-8d7b-bec00021dc12","dataSourceCredentialName":"js-test-datalakeCred-164160823668202890","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '257',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'db8de5e3-cdd5-4896-9a15-d22368fa8cea',
  'x-envoy-upstream-service-time',
  '322',
  'apim-request-id',
  'db8de5e3-cdd5-4896-9a15-d22368fa8cea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:18 GMT'
]);
