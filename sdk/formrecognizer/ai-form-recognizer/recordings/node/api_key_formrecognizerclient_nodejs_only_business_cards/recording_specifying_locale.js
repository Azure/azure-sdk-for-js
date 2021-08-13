let nock = require('nock');

module.exports.hash = "badcb7de21732e8e29459085adc6c79d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/businessCard.jpg?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/ff271fe9-904c-4464-9547-dfadc85ba3c6',
  'x-envoy-upstream-service-time',
  '590',
  'apim-request-id',
  'ff271fe9-904c-4464-9547-dfadc85ba3c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:14:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/ff271fe9-904c-4464-9547-dfadc85ba3c6')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T18:14:07Z","lastUpdatedDateTime":"2021-05-25T18:14:07Z"}, [
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'cc02fb15-2f20-46c8-bf29-fcbf3dfff43d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:14:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/ff271fe9-904c-4464-9547-dfadc85ba3c6')
  .reply(200, {"status":"running","createdDateTime":"2021-05-25T18:14:07Z","lastUpdatedDateTime":"2021-05-25T18:14:07Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '8d13b5bc-2755-4b0b-8cb2-8481b5ed059d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:14:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/ff271fe9-904c-4464-9547-dfadc85ba3c6')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-25T18:14:07Z","lastUpdatedDateTime":"2021-05-25T18:14:10Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.6836,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"MerchantAddress":{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1227.3,2138.3,2520.2,1690.5,2597,1912.3,1304.1,2360.1],"page":1,"confidence":0.972},"MerchantName":{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1146,1926,2224,1587,2285,1756,1202,2099],"page":1,"confidence":0.787},"MerchantPhoneNumber":{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2426.8,1040.1,3065.5,846,3087.2,917.6,2448.5,1111.7],"page":1,"confidence":0.608},"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.777}}}]}}, [
  'Content-Length',
  '961',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'e5fd2d87-bc39-45de-81c2-ac08e929f254',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:14:12 GMT'
]);
