let nock = require('nock');

module.exports.hash = "8474700a548e1a5cdba75fba89caa13c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '6660c322-61ee-4331-94a2-4c8e10781600',
  'x-ms-ests-server',
  '2.1.11961.8 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AtDw3-AOXglAm0wYV8Q9qh6qGAkBAQAAAPRirdgOAAAA; expires=Thu, 16-Sep-2021 07:57:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 17 Aug 2021 07:57:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/collections')
  .query(true)
  .reply(200, {"value":[{"name":"qiaozhatest","friendlyName":"qiaozhatest","description":"The root collection.","systemData":{"createdBy":"e0f63e9f-e67d-46b9-a50d-c5846cc99ed2","createdByType":"User","createdAt":"2021-08-11T09:24:28.626038Z","lastModifiedBy":"e0f63e9f-e67d-46b9-a50d-c5846cc99ed2","lastModifiedByType":"User","lastModifiedAt":"2021-08-11T09:24:28.626038Z"},"collectionProvisioningState":"Succeeded"}],"count":1}, [
  'Date',
  'Tue, 17 Aug 2021 07:57:41 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '320523ad-ce0b-4d1d-9b90-6e9c29d26585'
]);
