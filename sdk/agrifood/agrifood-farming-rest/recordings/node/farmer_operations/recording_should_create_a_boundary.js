let nock = require('nock');

module.exports.hash = "4d4dbfc9dad07935562196a249f975f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [ 'Cache-Control',
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
  '425c4443-000f-4a97-90d1-0af4020a0500',
  'x-ms-ests-server',
  '2.1.11722.21 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvdLD2y-oatMiFpwSkE7LmV4ycTJAwAAAAelQNgOAAAA; expires=Fri, 25-Jun-2021 20:22:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 20:22:34 GMT',
  'Content-Length',
  '1321' ]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/test-farmer-id-1622056799928/boundaries/test-boundary-id-1622056799928', {"geometry":{"coordinates":[[[73.70457172393799,20.545385304358106],[73.70457172393799,20.545385304358106],[73.70448589324951,20.542411534243367],[73.70877742767334,20.541688176010233],[73.71023654937744,20.545083911372505],[73.70663166046143,20.546992723579137],[73.70457172393799,20.545385304358106]]],"type":"Polygon"},"description":"Created by SDK"})
  .query(true)
  .reply(201, {"farmerId":"test-farmer-id-1622056799928","geometry":{"type":"Polygon","coordinates":[[[73.70457172393799,20.545385304358106],[73.70457172393799,20.545385304358106],[73.70448589324951,20.542411534243367],[73.70877742767334,20.541688176010233],[73.71023654937744,20.545083911372505],[73.70663166046143,20.546992723579137],[73.70457172393799,20.545385304358106]]]},"isPrimary":false,"acreage":60.40491151079627,"id":"test-boundary-id-1622056799928","eTag":"0000cde0-0000-0600-0000-60aeae0b0000","createdDateTime":"2021-05-26T20:22:35Z","modifiedDateTime":"2021-05-26T20:22:35Z","description":"Created by SDK"}, [ 'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 20:22:35 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '608',
  'Connection',
  'keep-alive',
  'etag',
  '0000cde0-0000-0600-0000-60aeae0b0000',
  'location',
  'http://endpoint/farmers/test-farmer-id-1622056799928/boundaries/test-boundary-id-1622056799928',
  'x-ms-request-id',
  '0HM903J1GUND6:00000001',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains' ]);
