let nock = require('nock');

module.exports.hash = "923cce575c1a21389e97385aa738e466";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-163636434695302037","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"accountKey":"account-key"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/d404535c-1efb-4feb-b535-83e246f31c0c',
  'x-request-id',
  '9afb5fda-2465-48bb-988c-855eff66c6f2',
  'x-envoy-upstream-service-time',
  '370',
  'apim-request-id',
  '9afb5fda-2465-48bb-988c-855eff66c6f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/d404535c-1efb-4feb-b535-83e246f31c0c')
  .reply(200, {"dataSourceCredentialId":"d404535c-1efb-4feb-b535-83e246f31c0c","dataSourceCredentialName":"js-test-datalakeCred-163636434695302037","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7d8b9631-87ff-4397-9815-0b85a61f7688',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '7d8b9631-87ff-4397-9815-0b85a61f7688',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:08 GMT'
]);
