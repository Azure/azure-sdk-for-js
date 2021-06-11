let nock = require('nock');

module.exports.hash = "5ad5e62e2602884452e3db1d066087d5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"ExampleDLCredential","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"accountKey":"account-key"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/dc61651c-d7df-4e46-922d-57bd3bbc116b',
  'x-request-id',
  'e4c98a4d-a9f6-4c54-a7e1-619b9e90a1fd',
  'x-envoy-upstream-service-time',
  '6597',
  'apim-request-id',
  'e4c98a4d-a9f6-4c54-a7e1-619b9e90a1fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:12 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/dc61651c-d7df-4e46-922d-57bd3bbc116b')
  .reply(200, {"dataSourceCredentialId":"dc61651c-d7df-4e46-922d-57bd3bbc116b","dataSourceCredentialName":"ExampleDLCredential","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c7ee72b1-97d5-4e3e-8578-6e1d8452194f',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  'c7ee72b1-97d5-4e3e-8578-6e1d8452194f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:12 GMT',
  'Connection',
  'close'
]);
