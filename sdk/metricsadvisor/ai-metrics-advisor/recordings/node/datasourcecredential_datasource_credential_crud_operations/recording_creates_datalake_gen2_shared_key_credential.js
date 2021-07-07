let nock = require('nock');

module.exports.hash = "923cce575c1a21389e97385aa738e466";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-162527918841000766","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"accountKey":"account-key"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/9baffa37-510f-4926-b6a4-06b90fac549c',
  'x-request-id',
  'bc8ccaaa-a401-41f4-a62c-1501744e1b54',
  'x-envoy-upstream-service-time',
  '690',
  'apim-request-id',
  'bc8ccaaa-a401-41f4-a62c-1501744e1b54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/9baffa37-510f-4926-b6a4-06b90fac549c')
  .reply(200, {"dataSourceCredentialId":"9baffa37-510f-4926-b6a4-06b90fac549c","dataSourceCredentialName":"js-test-datalakeCred-162527918841000766","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd0426f8b-9038-48a2-8e3f-8e243e3bb897',
  'x-envoy-upstream-service-time',
  '5315',
  'apim-request-id',
  'd0426f8b-9038-48a2-8e3f-8e243e3bb897',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:37 GMT'
]);
