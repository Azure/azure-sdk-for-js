let nock = require('nock');

module.exports.hash = "ca757867b5710c561fc0ebafd8de3a12";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdev.azuresynapse.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '99a8e9bf-f13c-45b0-988e-65f91bf23100',
  'x-ms-ests-server',
  '2.1.11198.13 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmfsnS-S96FDt_JYIfmWmGpJ0eYvAQAAAPj5OtcOAAAA; expires=Wed, 09-Dec-2020 08:51:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 09 Nov 2020 08:51:05 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/dataflows/shangweitest')
  .query(true)
  .reply(200, {"id":"/subscriptions/051ddeca-1ed6-4d8b-ba6f-1ff561e5f3b3/resourceGroups/shangwei-synapse/providers/Microsoft.Synapse/workspaces/workspace_name/dataflows/shangweitest","name":"shangweitest","type":"Microsoft.Synapse/workspaces/dataflows","properties":{"type":"MappingDataFlow"},"etag":"0d00e40b-0000-0100-0000-5fa54bf70000"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '331',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0 Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'x-ms-correlation-request-id',
  '529d41b4-508a-4a89-afd2-309d1a52b2cd',
  'X-Content-Type-Options',
  'nosniff',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-request-id',
  'f90f138c-f57e-4324-aa6d-0eafd6afd860',
  'Date',
  'Mon, 09 Nov 2020 08:51:06 GMT'
]);
