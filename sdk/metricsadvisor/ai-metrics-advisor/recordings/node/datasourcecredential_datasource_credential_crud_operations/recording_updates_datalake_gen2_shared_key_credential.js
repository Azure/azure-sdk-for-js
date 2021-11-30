let nock = require('nock');

module.exports.hash = "7f61a3ca73f444984086d5c92c386135";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/54cb9964-58fa-496f-b408-479ef69a8965', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-163702281643103059","dataSourceCredentialDescription":"updated description","parameters":{"accountKey":"updated account key"}})
  .reply(200, {"dataSourceCredentialId":"54cb9964-58fa-496f-b408-479ef69a8965","dataSourceCredentialName":"js-test-datalakeCred-163702281643103059","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '257',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '81545619-ed73-487a-873f-11fb70a16a81',
  'x-envoy-upstream-service-time',
  '434',
  'apim-request-id',
  '81545619-ed73-487a-873f-11fb70a16a81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:37 GMT'
]);
