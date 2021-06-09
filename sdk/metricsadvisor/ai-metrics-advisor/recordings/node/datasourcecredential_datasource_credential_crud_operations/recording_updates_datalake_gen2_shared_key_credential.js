let nock = require('nock');

module.exports.hash = "2fd7ef2d4e43c00d462c6ec756cb56b5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/dc61651c-d7df-4e46-922d-57bd3bbc116b', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"UpdatedDataLakeCred","dataSourceCredentialDescription":"updated description","parameters":{"accountKey":"updated account key"}})
  .reply(200, {"dataSourceCredentialId":"dc61651c-d7df-4e46-922d-57bd3bbc116b","dataSourceCredentialName":"UpdatedDataLakeCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '237',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c8c14589-0abc-4688-a0a8-bf3b50c66f12',
  'x-envoy-upstream-service-time',
  '919',
  'apim-request-id',
  'c8c14589-0abc-4688-a0a8-bf3b50c66f12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:13 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/dc61651c-d7df-4e46-922d-57bd3bbc116b')
  .reply(200, {"dataSourceCredentialId":"dc61651c-d7df-4e46-922d-57bd3bbc116b","dataSourceCredentialName":"UpdatedDataLakeCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '237',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3164368c-4ed9-4672-8d84-32effeaa0c05',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '3164368c-4ed9-4672-8d84-32effeaa0c05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:13 GMT',
  'Connection',
  'close'
]);
