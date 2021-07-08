let nock = require('nock');

module.exports.hash = "7f61a3ca73f444984086d5c92c386135";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/9baffa37-510f-4926-b6a4-06b90fac549c', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-162527918841000766","dataSourceCredentialDescription":"updated description","parameters":{"accountKey":"updated account key"}})
  .reply(200, {"dataSourceCredentialId":"9baffa37-510f-4926-b6a4-06b90fac549c","dataSourceCredentialName":"js-test-datalakeCred-162527918841000766","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '257',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ff47b3e3-51b6-4162-bdac-043205c30671',
  'x-envoy-upstream-service-time',
  '814',
  'apim-request-id',
  'ff47b3e3-51b6-4162-bdac-043205c30671',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:37 GMT'
]);
