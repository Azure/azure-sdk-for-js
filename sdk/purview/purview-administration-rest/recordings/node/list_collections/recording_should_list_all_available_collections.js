let nock = require('nock');

module.exports.hash = "a47c9da37783992c50b69300fbc277f4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '3bbf0f5f-c50f-432d-a12e-05abb7240600',
  'x-ms-ests-server',
  '2.1.12071.23 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap5X-pE32ltKgODv9RJHp7E; expires=Fri, 29-Oct-2021 19:25:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 19:25:52 GMT',
  'Content-Length',
  '1318'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/collections')
  .query(true)
  .reply(200, {"value":[{"name":"newpurviewllc","friendlyName":"newpurviewllc","description":"The root collection.","systemData":{"createdBy":"35ac9d32-a8ca-4324-9393-d4000746f07c","createdByType":"User","createdAt":"2021-09-29T18:35:18.4761382Z","lastModifiedBy":"35ac9d32-a8ca-4324-9393-d4000746f07c","lastModifiedByType":"User","lastModifiedAt":"2021-09-29T18:35:18.4761382Z"},"collectionProvisioningState":"Succeeded"},{"name":"la7eio","friendlyName":"Foo","description":"Test foo","parentCollection":{"type":"CollectionReference","referenceName":"newpurviewllc"},"systemData":{"createdBy":"35ac9d32-a8ca-4324-9393-d4000746f07c","createdByType":"User","createdAt":"2021-09-29T18:40:02.8364266Z","lastModifiedBy":"35ac9d32-a8ca-4324-9393-d4000746f07c","lastModifiedByType":"User","lastModifiedAt":"2021-09-29T18:40:02.8364266Z"},"collectionProvisioningState":"Succeeded"}],"count":2}, [
  'Date',
  'Wed, 29 Sep 2021 19:25:52 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '681c41a4-33f0-4c7d-8f92-6e43044d4732'
]);
