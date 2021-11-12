let nock = require('nock');

module.exports.hash = "7f61a3ca73f444984086d5c92c386135";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/d404535c-1efb-4feb-b535-83e246f31c0c', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-163636434695302037","dataSourceCredentialDescription":"updated description","parameters":{"accountKey":"updated account key"}})
  .reply(200, {"dataSourceCredentialId":"d404535c-1efb-4feb-b535-83e246f31c0c","dataSourceCredentialName":"js-test-datalakeCred-163636434695302037","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '257',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '28881fdc-2266-40bf-9bf4-8ebaece0f37e',
  'x-envoy-upstream-service-time',
  '368',
  'apim-request-id',
  '28881fdc-2266-40bf-9bf4-8ebaece0f37e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:08 GMT'
]);
