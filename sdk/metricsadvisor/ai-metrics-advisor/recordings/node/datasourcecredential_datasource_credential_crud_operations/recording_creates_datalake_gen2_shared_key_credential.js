let nock = require('nock');

module.exports.hash = "923cce575c1a21389e97385aa738e466";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-164160823668202890","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"accountKey":"account-key"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/7da36fdb-0164-4165-8d7b-bec00021dc12',
  'x-request-id',
  'bc392ad9-3af9-4803-9f8c-fab5f0ec04df',
  'x-envoy-upstream-service-time',
  '339',
  'apim-request-id',
  'bc392ad9-3af9-4803-9f8c-fab5f0ec04df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/7da36fdb-0164-4165-8d7b-bec00021dc12')
  .reply(200, {"dataSourceCredentialId":"7da36fdb-0164-4165-8d7b-bec00021dc12","dataSourceCredentialName":"js-test-datalakeCred-164160823668202890","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fb15f2e1-e4d7-4f1c-a44f-74be54b9fbe6',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  'fb15f2e1-e4d7-4f1c-a44f-74be54b9fbe6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:17 GMT'
]);
