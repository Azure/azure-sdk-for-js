let nock = require('nock');

module.exports.hash = "a89a8d1fcb24d1005679d68613f28fab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/prebuilt/idDocument/analyze', {"source":"https://storageaccount/testingdata/license.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/prebuilt/idDocument/analyzeResults/1d057f2b-53c7-46f1-9e41-c8418f3771a7',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '1d057f2b-53c7-46f1-9e41-c8418f3771a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:29:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/idDocument/analyzeResults/1d057f2b-53c7-46f1-9e41-c8418f3771a7')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-12T01:29:00Z","lastUpdatedDateTime":"2021-05-12T01:29:00Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'd7e019ee-6d61-4adb-9088-3c528b5e2607',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:29:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/idDocument/analyzeResults/1d057f2b-53c7-46f1-9e41-c8418f3771a7')
  .reply(200, {"status":"running","createdDateTime":"2021-05-12T01:29:00Z","lastUpdatedDateTime":"2021-05-12T01:29:00Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'daef564f-937c-4db7-91da-06ddc02cf273',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:29:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/idDocument/analyzeResults/1d057f2b-53c7-46f1-9e41-c8418f3771a7')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-12T01:29:00Z","lastUpdatedDateTime":"2021-05-12T01:29:02Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-0.2823,"width":450,"height":294,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:idDocument:driverLicense","docTypeConfidence":0.995,"pageRange":[1,1],"fields":{"Address":{"type":"string","valueString":"123 STREET ADDRESS YOUR CITY WA 99999-1234","text":"123 STREET ADDRESS YOUR CITY WA 99999-1234","boundingBox":[158,151,326,151,326,177,158,177],"page":1,"confidence":0.965},"CountryRegion":{"type":"countryRegion","confidence":0.99,"valueCountryRegion":"USA"},"DateOfBirth":{"type":"date","valueDate":"1958-01-06","text":"01/06/1958","boundingBox":[187,133,272,132,272,148,187,149],"page":1,"confidence":0.99},"DateOfExpiration":{"type":"date","valueDate":"2020-08-12","text":"08/12/2020","boundingBox":[332,230,414,228,414,244,332,245],"page":1,"confidence":0.99},"DocumentNumber":{"type":"string","valueString":"WDLABCD456DG","text":"LIC#WDLABCD456DG","boundingBox":[162,70,307,68,307,84,163,85],"page":1,"confidence":0.987},"FirstName":{"type":"string","valueString":"LIAM R.","text":"LIAM R.","boundingBox":[158,102,216,102,216,116,158,116],"page":1,"confidence":0.985},"LastName":{"type":"string","valueString":"TALBOT","text":"TALBOT","boundingBox":[160,86,213,85,213,99,160,100],"page":1,"confidence":0.987},"Region":{"type":"string","valueString":"Washington","confidence":0.99},"Sex":{"type":"string","valueString":"M","text":"M","boundingBox":[226,190,232,190,233,201,226,201],"page":1,"confidence":0.99}}}]}}, [
  'Content-Length',
  '1606',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '9221a81e-bbe2-4bf1-9d94-0c94afebe396',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:29:05 GMT'
]);
