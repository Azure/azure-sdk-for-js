let nock = require('nock');

module.exports.hash = "bdf18e106e38a1c3c604480205dd6ec5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/53655339-fb54-4566-8ccd-b22054a45c56', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"UpdatedCred","dataSourceCredentialDescription":"updated description","parameters":{"connectionString":"updated-string"}})
  .reply(200, {"dataSourceCredentialId":"53655339-fb54-4566-8ccd-b22054a45c56","dataSourceCredentialName":"UpdatedCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '232',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '46a10f48-51e2-485d-b3fa-257bdc2ab41e',
  'x-envoy-upstream-service-time',
  '671',
  'apim-request-id',
  '46a10f48-51e2-485d-b3fa-257bdc2ab41e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 00:13:32 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/53655339-fb54-4566-8ccd-b22054a45c56')
  .reply(200, {"dataSourceCredentialId":"53655339-fb54-4566-8ccd-b22054a45c56","dataSourceCredentialName":"UpdatedCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '232',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c34ad579-0453-4a96-ae28-3c4b2dfd11c6',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  'c34ad579-0453-4a96-ae28-3c4b2dfd11c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 00:13:32 GMT',
  'Connection',
  'close'
]);
