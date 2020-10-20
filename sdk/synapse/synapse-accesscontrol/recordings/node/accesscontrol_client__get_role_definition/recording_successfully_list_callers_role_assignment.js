let nock = require('nock');

module.exports.hash = "fe59379ea19e8e98ba186cf472061ea4";

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
  'ed8b58c4-5625-47a8-858a-f8c106410600',
  'x-ms-ests-server',
  '2.1.11239.6 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnB5IvK3H1tCv1FvsOaSRjVJ0eYvAQAAAIIgQNcOAAAA; expires=Sun, 13-Dec-2020 06:36:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Nov 2020 06:36:50 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .post('/rbac/getMyAssignedRoles')
  .query(true)
  .reply(200, ["6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","roll_id","c3a6d2f1-a26f-4810-9b0f-591308d5cbf1"], [
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7342f5cd-7908-4c95-aaeb-5623353e9f5d',
  'Date',
  'Fri, 13 Nov 2020 06:36:52 GMT'
]);
