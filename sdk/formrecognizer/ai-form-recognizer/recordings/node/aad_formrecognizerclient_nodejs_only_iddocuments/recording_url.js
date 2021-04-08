let nock = require('nock');

module.exports.hash = "ae4631915436fd435ea3b8da2e5bb4b4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'cc19cd17-cd42-4ea8-ac2c-cd0ce6a46200',
  'x-ms-ests-server',
  '2.1.11562.10 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mFAAAACKn9dcOAAAA; expires=Thu, 29-Apr-2021 23:16:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:16:22 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyze', {"source":"https://storageaccount/testingdata/license.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/043ad9b6-f4c1-40e3-9249-c990db35d718',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '043ad9b6-f4c1-40e3-9249-c990db35d718',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/043ad9b6-f4c1-40e3-9249-c990db35d718')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:16:23Z","lastUpdatedDateTime":"2021-03-30T23:16:23Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'f1396f94-6b01-431d-a654-cb681dcb6d8c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/043ad9b6-f4c1-40e3-9249-c990db35d718')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:16:23Z","lastUpdatedDateTime":"2021-03-30T23:16:23Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '6011c462-600d-4d27-a077-383a9dbdad6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/043ad9b6-f4c1-40e3-9249-c990db35d718')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:16:23Z","lastUpdatedDateTime":"2021-03-30T23:16:25Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-0.2823,"width":450,"height":294,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:idDocument:driverLicense","docTypeConfidence":0.995,"pageRange":[1,1],"fields":{"Address":{"type":"string","valueString":"123 STREET ADDRESS YOUR CITY WA 99999-1234","text":"123 STREET ADDRESS YOUR CITY WA 99999-1234","boundingBox":[158,151,326,151,326,177,158,177],"page":1,"confidence":0.965},"Country":{"type":"country","valueCountry":"USA","confidence":0.99},"DateOfBirth":{"type":"date","valueDate":"1958-01-06","text":"01/06/1958","boundingBox":[187,133,272,132,272,148,187,149],"page":1,"confidence":0.99},"DateOfExpiration":{"type":"date","valueDate":"2020-08-12","text":"08/12/2020","boundingBox":[332,230,414,228,414,244,332,245],"page":1,"confidence":0.99},"DocumentNumber":{"type":"string","valueString":"LICWDLACD5DG","text":"LIC#WDLABCD456DG","boundingBox":[162,70,307,68,307,84,163,85],"page":1,"confidence":0.99},"FirstName":{"type":"string","valueString":"LIAM R.","text":"LIAM R.","boundingBox":[158,102,216,102,216,116,158,116],"page":1,"confidence":0.985},"LastName":{"type":"string","valueString":"TALBOT","text":"TALBOT","boundingBox":[160,86,213,85,213,99,160,100],"page":1,"confidence":0.987},"Region":{"type":"string","valueString":"Washington","confidence":0.99},"Sex":{"type":"gender","valueGender":"M","text":"M","boundingBox":[226,190,232,190,233,201,226,201],"page":1,"confidence":0.99}}}]}}, [
  'Content-Length',
  '1587',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'e25cc91b-a3ff-4301-afea-cc28c5d09c05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:28 GMT'
]);
