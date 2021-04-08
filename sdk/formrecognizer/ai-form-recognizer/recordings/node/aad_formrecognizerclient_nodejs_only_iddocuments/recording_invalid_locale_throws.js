let nock = require('nock');

module.exports.hash = "6a46fa46bb363d22703180d6b83fd8f6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '89c32ff0-2f35-4229-bd74-9a2e7f425602',
  'x-ms-ests-server',
  '2.1.11562.10 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mFAAAACKn9dcOAAAA; expires=Thu, 29-Apr-2021 23:16:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:16:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyze', {"source":"https://storageaccount/testingdata/license.jpg?sastoken"})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/3a25c484-a132-4580-9459-f6fcbb2c35db',
  'x-envoy-upstream-service-time',
  '728',
  'apim-request-id',
  '3a25c484-a132-4580-9459-f6fcbb2c35db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/3a25c484-a132-4580-9459-f6fcbb2c35db')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:16:29Z","lastUpdatedDateTime":"2021-03-30T23:16:29Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '9d5410e6-cf79-4a9a-a366-443daaf23a49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/3a25c484-a132-4580-9459-f6fcbb2c35db')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:16:29Z","lastUpdatedDateTime":"2021-03-30T23:16:29Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'e808e858-64f0-40c5-9a6e-b478bde76dd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/idDocument/analyzeResults/3a25c484-a132-4580-9459-f6fcbb2c35db')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:16:29Z","lastUpdatedDateTime":"2021-03-30T23:16:32Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-0.2823,"width":450,"height":294,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:idDocument:driverLicense","docTypeConfidence":0.995,"pageRange":[1,1],"fields":{"Address":{"type":"string","valueString":"123 STREET ADDRESS YOUR CITY WA 99999-1234","text":"123 STREET ADDRESS YOUR CITY WA 99999-1234","boundingBox":[158,151,326,151,326,177,158,177],"page":1,"confidence":0.965},"Country":{"type":"country","valueCountry":"USA","confidence":0.99},"DateOfBirth":{"type":"date","valueDate":"1958-01-06","text":"01/06/1958","boundingBox":[187,133,272,132,272,148,187,149],"page":1,"confidence":0.99},"DateOfExpiration":{"type":"date","valueDate":"2020-08-12","text":"08/12/2020","boundingBox":[332,230,414,228,414,244,332,245],"page":1,"confidence":0.99},"DocumentNumber":{"type":"string","valueString":"LICWDLACD5DG","text":"LIC#WDLABCD456DG","boundingBox":[162,70,307,68,307,84,163,85],"page":1,"confidence":0.99},"FirstName":{"type":"string","valueString":"LIAM R.","text":"LIAM R.","boundingBox":[158,102,216,102,216,116,158,116],"page":1,"confidence":0.985},"LastName":{"type":"string","valueString":"TALBOT","text":"TALBOT","boundingBox":[160,86,213,85,213,99,160,100],"page":1,"confidence":0.987},"Region":{"type":"string","valueString":"Washington","confidence":0.99},"Sex":{"type":"gender","valueGender":"M","text":"M","boundingBox":[226,190,232,190,233,201,226,201],"page":1,"confidence":0.99}}}]}}, [
  'Content-Length',
  '1587',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '5f04940e-bdad-47ec-a703-8b49be2e6d59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:16:34 GMT'
]);
