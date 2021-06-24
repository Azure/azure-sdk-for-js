let nock = require('nock');

module.exports.hash = "dd4b7f7e5ffa8c1b83244becc25ec6db";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/31392928-b87b-4975-9be2-cea71a6e814b', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"UpdatedSqlCred","dataSourceCredentialDescription":"updated description","parameters":{"connectionString":"updated-string"}})
  .reply(200, {"dataSourceCredentialId":"31392928-b87b-4975-9be2-cea71a6e814b","dataSourceCredentialName":"UpdatedSqlCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '235',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '77e35cf5-304f-4793-9cfa-7d4a04a375aa',
  'x-envoy-upstream-service-time',
  '4109',
  'apim-request-id',
  '77e35cf5-304f-4793-9cfa-7d4a04a375aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:05 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/31392928-b87b-4975-9be2-cea71a6e814b')
  .reply(200, {"dataSourceCredentialId":"31392928-b87b-4975-9be2-cea71a6e814b","dataSourceCredentialName":"UpdatedSqlCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '235',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '15a6a55f-7589-4abb-8c43-6cb1b156a3c5',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '15a6a55f-7589-4abb-8c43-6cb1b156a3c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:04 GMT',
  'Connection',
  'close'
]);
