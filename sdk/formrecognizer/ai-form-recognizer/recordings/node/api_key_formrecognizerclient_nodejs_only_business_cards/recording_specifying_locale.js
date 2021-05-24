let nock = require('nock');

module.exports.hash = "021cd1ad14cefedb3f9721742269a869";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/businessCard.jpg?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/7473c3ed-2a36-4953-95bd-5ee5ac4ee687',
  'x-envoy-upstream-service-time',
  '557',
  'apim-request-id',
  '7473c3ed-2a36-4953-95bd-5ee5ac4ee687',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:28:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/7473c3ed-2a36-4953-95bd-5ee5ac4ee687')
  .reply(200, {"status":"running","createdDateTime":"2021-05-12T01:28:31Z","lastUpdatedDateTime":"2021-05-12T01:28:31Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '51878d22-5107-4984-bbc3-9a6beef1797c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:28:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/7473c3ed-2a36-4953-95bd-5ee5ac4ee687')
  .reply(200, {"status":"running","createdDateTime":"2021-05-12T01:28:31Z","lastUpdatedDateTime":"2021-05-12T01:28:31Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '25579bc6-9bec-4ea6-babd-762a718faadd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:28:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/7473c3ed-2a36-4953-95bd-5ee5ac4ee687')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-12T01:28:31Z","lastUpdatedDateTime":"2021-05-12T01:28:35Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-16.6836,"width":4032,"height":3024,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"MerchantAddress":{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","text":"2 Kingdom Street Paddington, London, W2 6BD","boundingBox":[1227.3,2138.3,2520.2,1690.5,2597,1912.3,1304.1,2360.1],"page":1,"confidence":0.972},"MerchantName":{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[1146,1926,2224,1587,2285,1756,1202,2099],"page":1,"confidence":0.787},"MerchantPhoneNumber":{"type":"phoneNumber","text":"+44 (0) 7911 123456","boundingBox":[2426.8,1040.1,3065.5,846,3087.2,917.6,2448.5,1111.7],"page":1,"confidence":0.608},"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.777}}}]}}, [
  'Content-Length',
  '961',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'a8c96e05-ee3b-459f-a26c-b0dbc1c67443',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:28:36 GMT'
]);
