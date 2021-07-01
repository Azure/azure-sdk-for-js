let nock = require('nock');

module.exports.hash = "91f0522d3d19ddaee57781181e541973";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"ExampleSQLCredential","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"connectionString":"sql-server-connection-string"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/31392928-b87b-4975-9be2-cea71a6e814b',
  'x-request-id',
  'b4b7c8ca-ef00-485f-bdc9-5bd4b135806d',
  'x-envoy-upstream-service-time',
  '721',
  'apim-request-id',
  'b4b7c8ca-ef00-485f-bdc9-5bd4b135806d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:00 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/31392928-b87b-4975-9be2-cea71a6e814b')
  .reply(200, {"dataSourceCredentialId":"31392928-b87b-4975-9be2-cea71a6e814b","dataSourceCredentialName":"ExampleSQLCredential","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '252',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'be9cfacc-77c9-4b48-8a55-835304ccf55c',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'be9cfacc-77c9-4b48-8a55-835304ccf55c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:01 GMT',
  'Connection',
  'close'
]);
