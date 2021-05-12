let nock = require('nock');

module.exports.hash = "31a597a6bd805db1de58bb96c6462334";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fpurview.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1318',
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
  '3f6440c3-579d-41ac-b501-7bab53261900',
  'x-ms-ests-server',
  '2.1.11654.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlLlW8l6GSxOvCTrFZhj29X__1r8AQAAAKlGDNgOAAAA; expires=Mon, 17-May-2021 03:02:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 17 Apr 2021 03:02:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/datasources')
  .query(true)
  .reply(200, {"value":[{"properties":{"createdAt":"2021-04-01T19:18:25.6411232Z","lastModifiedAt":"2021-04-01T19:18:25.6411233Z","parentCollection":null},"kind":"Collection","id":"datasources/Collection-vaR","name":"Collection-vaR"},{"properties":{"endpoint":"https://joherediteststorage.blob.core.windows.net/","resourceGroup":"joheredi-test","subscriptionId":"faa080af-c1d8-40ad-9cce-e1a450ca5b57","location":"westus","resourceName":"joherediteststorage","createdAt":"2021-04-01T19:19:37.3396977Z","lastModifiedAt":"2021-04-01T19:19:37.3396984Z","parentCollection":{"type":"DataSourceReference","referenceName":"Collection-vaR"}},"kind":"AzureStorage","id":"datasources/AzureBlob-BzV","name":"AzureBlob-BzV"}],"count":2}, [
  'Date',
  'Sat, 17 Apr 2021 03:02:02 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '709',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '9e4bac9f-885b-43a0-9aeb-5fdd385646f9'
]);
