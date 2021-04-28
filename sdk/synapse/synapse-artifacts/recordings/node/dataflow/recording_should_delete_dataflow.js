let nock = require('nock');

module.exports.hash = "490333286e74fcd776ada6c8bff08130";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdev.azuresynapse.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [ 'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1322',
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
  'a4433f94-db9a-4a15-9895-e4714d926700',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvzULwO9SbVOqJjwdF4-3lHKOuyWBgAAAKt3_dcOAAAA; expires=Wed, 05-May-2021 21:27:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Apr 2021 21:27:34 GMT' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .delete('/dataflows/testdataflow2')
  .query(true)
  .reply(202, {"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/dataflows/testdataflow2","recordId":0,"state":"Deleting","created":"0001-01-01T00:00:00","changed":"0001-01-01T00:00:00","type":"DataFlow","name":"testdataflow2","operationId":"058bdd6f-6c2e-4737-8ebd-b68e0e433c99"}, [ 'Content-Length',
  '351',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/operationResults/058bdd6f-6c2e-4737-8ebd-b68e0e433c99?api-version=2019-06-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Location',
  'x-ms-request-id',
  '8ae95c00-0f0e-49cb-9be4-30c42227c7e6',
  'Date',
  'Mon, 05 Apr 2021 21:27:35 GMT',
  'Connection',
  'close' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/operationResults/058bdd6f-6c2e-4737-8ebd-b68e0e433c99')
  .query(true)
  .reply(202, {"status":"InProgress"}, [ 'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/operationResults/058bdd6f-6c2e-4737-8ebd-b68e0e433c99?api-version=2019-06-01-preview',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Allow-Headers',
  'Retry-After',
  'Access-Control-Expose-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Retry-After',
  'x-ms-request-id',
  'adb92c04-4973-4865-8fa7-814f7398ebe8',
  'Date',
  'Mon, 05 Apr 2021 21:27:34 GMT',
  'Connection',
  'close' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/operationResults/058bdd6f-6c2e-4737-8ebd-b68e0e433c99')
  .query(true)
  .reply(202, {"status":"InProgress"}, [ 'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/operationResults/058bdd6f-6c2e-4737-8ebd-b68e0e433c99?api-version=2019-06-01-preview',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Allow-Headers',
  'Retry-After',
  'Access-Control-Expose-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Retry-After',
  'x-ms-request-id',
  '42c9aa45-77d1-450d-9e6a-6bfa00abd71b',
  'Date',
  'Mon, 05 Apr 2021 21:27:37 GMT',
  'Connection',
  'close' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/operationResults/058bdd6f-6c2e-4737-8ebd-b68e0e433c99')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7b6eca15-ef52-4cbe-a0e0-95a136201b44',
  'Date',
  'Mon, 05 Apr 2021 21:27:39 GMT',
  'Connection',
  'close' ]);
