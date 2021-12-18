let nock = require('nock');

module.exports.hash = "7f61a3ca73f444984086d5c92c386135";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/800a0e38-98a1-474e-bf87-c1ae5ad9214e', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-163978895648305805","dataSourceCredentialDescription":"updated description","parameters":{"accountKey":"updated account key"}})
  .reply(200, {"dataSourceCredentialId":"800a0e38-98a1-474e-bf87-c1ae5ad9214e","dataSourceCredentialName":"js-test-datalakeCred-163978895648305805","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '257',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cba28ef7-7748-48b4-a0ec-51968b988a40',
  'x-envoy-upstream-service-time',
  '331',
  'apim-request-id',
  'cba28ef7-7748-48b4-a0ec-51968b988a40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:58 GMT'
]);
