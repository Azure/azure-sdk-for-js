let nock = require('nock');

module.exports.hash = "ae4631915436fd435ea3b8da2e5bb4b4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyze', {"source":"https://storageaccount/testingdata/license.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/0310e94f-add2-40ae-8cac-6ea7c900ac6c',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '0310e94f-add2-40ae-8cac-6ea7c900ac6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:19:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/0310e94f-add2-40ae-8cac-6ea7c900ac6c')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:19:02Z","lastUpdatedDateTime":"2021-03-30T23:19:02Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '1f4158c4-0abc-4514-9f2a-1a58ff4d3bc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:19:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/0310e94f-add2-40ae-8cac-6ea7c900ac6c')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:19:02Z","lastUpdatedDateTime":"2021-03-30T23:19:02Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '7ecdde7f-17bf-4c35-8b08-ef91c0b97c69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:19:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/0310e94f-add2-40ae-8cac-6ea7c900ac6c')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:19:02Z","lastUpdatedDateTime":"2021-03-30T23:19:05Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-0.2823,"width":450,"height":294,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:idDocument:driverLicense","docTypeConfidence":0.995,"pageRange":[1,1],"fields":{"Address":{"type":"string","valueString":"123 STREET ADDRESS YOUR CITY WA 99999-1234","text":"123 STREET ADDRESS YOUR CITY WA 99999-1234","boundingBox":[158,151,326,151,326,177,158,177],"page":1,"confidence":0.965},"Country":{"type":"country","valueCountry":"USA","confidence":0.99},"DateOfBirth":{"type":"date","valueDate":"1958-01-06","text":"01/06/1958","boundingBox":[187,133,272,132,272,148,187,149],"page":1,"confidence":0.99},"DateOfExpiration":{"type":"date","valueDate":"2020-08-12","text":"08/12/2020","boundingBox":[332,230,414,228,414,244,332,245],"page":1,"confidence":0.99},"DocumentNumber":{"type":"string","valueString":"LICWDLACD5DG","text":"LIC#WDLABCD456DG","boundingBox":[162,70,307,68,307,84,163,85],"page":1,"confidence":0.99},"FirstName":{"type":"string","valueString":"LIAM R.","text":"LIAM R.","boundingBox":[158,102,216,102,216,116,158,116],"page":1,"confidence":0.985},"LastName":{"type":"string","valueString":"TALBOT","text":"TALBOT","boundingBox":[160,86,213,85,213,99,160,100],"page":1,"confidence":0.987},"Region":{"type":"string","valueString":"Washington","confidence":0.99},"Sex":{"type":"gender","valueGender":"M","text":"M","boundingBox":[226,190,232,190,233,201,226,201],"page":1,"confidence":0.99}}}]}}, [
  'Content-Length',
  '1587',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '82d58fb7-9fde-4b3c-910e-4050f6b32d1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:19:07 GMT'
]);
