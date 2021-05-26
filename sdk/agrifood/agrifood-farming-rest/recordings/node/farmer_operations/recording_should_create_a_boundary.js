let nock = require('nock');

module.exports.hash = "4d4dbfc9dad07935562196a249f975f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Ffarmbeats.azure.net%2F.default")
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
  '1a7caf2e-c4f6-42e2-bc2d-895b12300300',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkU1v9mgOnFBjjaZ6V7PJkx4ycTJAwAAAF-WQNgOAAAA; expires=Fri, 25-Jun-2021 19:20:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 19:20:02 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/test-farmer-id-1622056799927/boundaries/test-boundary-id-1622056799927', {"geometry":{"coordinates":[[[73.70457172393799,20.545385304358106],[73.70457172393799,20.545385304358106],[73.70448589324951,20.542411534243367],[73.70877742767334,20.541688176010233],[73.71023654937744,20.545083911372505],[73.70663166046143,20.546992723579137],[73.70457172393799,20.545385304358106]]],"type":"Polygon"},"description":"Created by SDK"})
  .query(true)
  .reply(201, {"farmerId":"test-farmer-id-1622056799927","geometry":{"type":"Polygon","coordinates":[[[73.70457172393799,20.545385304358106],[73.70457172393799,20.545385304358106],[73.70448589324951,20.542411534243367],[73.70877742767334,20.541688176010233],[73.71023654937744,20.545083911372505],[73.70663166046143,20.546992723579137],[73.70457172393799,20.545385304358106]]]},"isPrimary":false,"acreage":60.40491151079627,"id":"test-boundary-id-1622056799927","eTag":"00008c0c-0000-0600-0000-60ae9f620000","createdDateTime":"2021-05-26T19:20:02Z","modifiedDateTime":"2021-05-26T19:20:02Z","description":"Created by SDK"}, [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:02 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '608',
  'Connection',
  'keep-alive',
  'etag',
  '00008c0c-0000-0600-0000-60ae9f620000',
  'location',
  'http://endpoint/farmers/test-farmer-id-1622056799927/boundaries/test-boundary-id-1622056799927',
  'x-ms-request-id',
  '0HM903J1GUND3:00000001',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
