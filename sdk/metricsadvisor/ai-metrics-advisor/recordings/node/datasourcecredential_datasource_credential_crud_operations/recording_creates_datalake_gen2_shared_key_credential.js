let nock = require('nock');

module.exports.hash = "923cce575c1a21389e97385aa738e466";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-163978895648305805","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"accountKey":"account-key"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint//metricsadvisor/v1.0/credentials/800a0e38-98a1-474e-bf87-c1ae5ad9214e',
  'x-request-id',
  '59f37abf-6166-4fcc-a3b5-cc4106aedf45',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  '59f37abf-6166-4fcc-a3b5-cc4106aedf45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/800a0e38-98a1-474e-bf87-c1ae5ad9214e')
  .reply(200, {"dataSourceCredentialId":"800a0e38-98a1-474e-bf87-c1ae5ad9214e","dataSourceCredentialName":"js-test-datalakeCred-163978895648305805","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e43d79f5-1516-4a5f-83bb-5a301a14695d',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  'e43d79f5-1516-4a5f-83bb-5a301a14695d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:57 GMT'
]);
