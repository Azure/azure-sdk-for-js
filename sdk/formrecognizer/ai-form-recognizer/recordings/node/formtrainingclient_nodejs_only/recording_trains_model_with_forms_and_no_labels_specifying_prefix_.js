let nock = require('nock');

module.exports.hash = "059836df5122d8879ba53355614de9b6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"prefix":"Form_"},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/5b08cfcc-850f-42c0-97e5-a297ea26a5b3',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'f6a8585b-87e8-4f0b-94ce-1f1cfe919465',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/5b08cfcc-850f-42c0-97e5-a297ea26a5b3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5b08cfcc-850f-42c0-97e5-a297ea26a5b3","status":"creating","createdDateTime":"2020-05-02T20:00:25Z","lastUpdatedDateTime":"2020-05-02T20:00:25Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  'bc4870f5-9479-46e5-9400-9a1c43d5cb77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/5b08cfcc-850f-42c0-97e5-a297ea26a5b3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5b08cfcc-850f-42c0-97e5-a297ea26a5b3","status":"creating","createdDateTime":"2020-05-02T20:00:25Z","lastUpdatedDateTime":"2020-05-02T20:00:25Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '30b136d2-7480-47c8-bde6-8ea1212b9357',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/5b08cfcc-850f-42c0-97e5-a297ea26a5b3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5b08cfcc-850f-42c0-97e5-a297ea26a5b3","status":"ready","createdDateTime":"2020-05-02T20:00:25Z","lastUpdatedDateTime":"2020-05-02T20:00:32Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Address:","Company Name:","Company Phone:","Dated As:","Email:","Hero Limited","Name:","Phone:","Phone:","Purchase Order","Purchase Order","Purchase Order #:","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'f51d423c-e98a-47e0-bc58-a91fd022bd79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:35 GMT'
]);
