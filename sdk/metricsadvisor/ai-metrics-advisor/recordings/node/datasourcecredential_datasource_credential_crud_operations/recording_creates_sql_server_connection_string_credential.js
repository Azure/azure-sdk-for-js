let nock = require('nock');

module.exports.hash = "37322005f1bcc8a355d110c2fd85801f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"ExampleCred2","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"connectionString":"sql-server-connection-string"}})
  .reply(409, {"code":"ERROR_DUP_CREDENTIAL_NAME","message":"The credential name 'ExampleCred2' is already used. Try a different name."}, [
  'Content-Length',
  '122',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2d12a04a-6512-444a-be97-ce9a59a04eca',
  'x-envoy-upstream-service-time',
  '1829',
  'apim-request-id',
  '2d12a04a-6512-444a-be97-ce9a59a04eca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 00:07:31 GMT',
  'Connection',
  'close'
]);
