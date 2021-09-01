let nock = require('nock');

module.exports.hash = "4890ffd8acc8dcbe145ca1f8a90c6011";

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
  'd3787234-088b-440c-9c94-9568ea2fac00',
  'x-ms-ests-server',
  '2.1.11829.8 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuprCnhyY41DlXA04J6n6rR4ycTJAwAAAGkJZNgOAAAA; expires=Thu, 22-Jul-2021 16:40:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Jun 2021 16:40:11 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/tst103node/boundaries/jhboundary103node', {"geometry":{"coordinates":[[[-6.6730517,43.5298824],[-6.676265,43.5262614],[-6.6757983,43.5260669],[-6.6760236,43.5254835],[-6.6768819,43.5245228],[-6.6760075,43.5243322],[-6.6753209,43.5252112],[-6.6744518,43.5247095],[-6.6730678,43.525114],[-6.6723222,43.5256702],[-6.6739959,43.5264753],[-6.6726387,43.5274282],[-6.6712493,43.5279261],[-6.6703159,43.5280428],[-6.6693288,43.5277394],[-6.6692644,43.52807],[-6.6694576,43.5282256],[-6.671319,43.5294274],[-6.6717964,43.5296024],[-6.6730303,43.5298824],[-6.6730517,43.5298824]]],"type":"Polygon"},"description":"Created by SDK"})
  .query(true)
  .reply(201, {"farmerId":"tst103node","geometry":{"type":"Polygon","coordinates":[[[-6.6730517,43.5298824],[-6.676265,43.5262614],[-6.6757983,43.5260669],[-6.6760236,43.5254835],[-6.6768819,43.5245228],[-6.6760075,43.5243322],[-6.6753209,43.5252112],[-6.6744518,43.5247095],[-6.6730678,43.525114],[-6.6723222,43.5256702],[-6.6739959,43.5264753],[-6.6726387,43.5274282],[-6.6712493,43.5279261],[-6.6703159,43.5280428],[-6.6693288,43.5277394],[-6.6692644,43.52807],[-6.6694576,43.5282256],[-6.671319,43.5294274],[-6.6717964,43.5296024],[-6.6730303,43.5298824],[-6.6730517,43.5298824]]]},"isPrimary":false,"acreage":34.26834080209858,"id":"jhboundary103node","eTag":"0300d87f-0000-0600-0000-60d2126c0000","createdDateTime":"2021-06-22T16:40:12Z","modifiedDateTime":"2021-06-22T16:40:12Z","description":"Created by SDK"}, [
  'Date',
  'Tue, 22 Jun 2021 16:40:12 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '803',
  'Connection',
  'keep-alive',
  'etag',
  '0300d87f-0000-0600-0000-60d2126c0000',
  'location',
  'http://endpoint/farmers/tst103node/boundaries/jhboundary103node',
  'x-ms-request-id',
  '0HM9KPKHE6B0S:00000001',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
