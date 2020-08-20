let nock = require('nock');

module.exports.hash = "1faf0ef489c267c925f03a3bec595730";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"prefix":"Form_"},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/70cdf458-ee6c-4d49-a71d-29fd3f270f47',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '6c48d1a7-7a8f-47b6-aac4-0d3d304a01ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/70cdf458-ee6c-4d49-a71d-29fd3f270f47')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"70cdf458-ee6c-4d49-a71d-29fd3f270f47","status":"creating","createdDateTime":"2020-08-18T18:47:32Z","lastUpdatedDateTime":"2020-08-18T18:47:32Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'f7966c5f-3550-447a-840f-3b10b6d033c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/70cdf458-ee6c-4d49-a71d-29fd3f270f47')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"70cdf458-ee6c-4d49-a71d-29fd3f270f47","status":"creating","createdDateTime":"2020-08-18T18:47:32Z","lastUpdatedDateTime":"2020-08-18T18:47:32Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '8e4fa6ad-be7d-41b2-88c4-67aeb4acc085',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/70cdf458-ee6c-4d49-a71d-29fd3f270f47')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"70cdf458-ee6c-4d49-a71d-29fd3f270f47","status":"creating","createdDateTime":"2020-08-18T18:47:32Z","lastUpdatedDateTime":"2020-08-18T18:47:32Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'b716c83a-f237-43d8-aed4-7fcb8ebc6de2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/70cdf458-ee6c-4d49-a71d-29fd3f270f47')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"70cdf458-ee6c-4d49-a71d-29fd3f270f47","status":"ready","createdDateTime":"2020-08-18T18:47:32Z","lastUpdatedDateTime":"2020-08-18T18:47:40Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'fe0f7471-00b1-4dba-b694-1cc98a4d62ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:41 GMT'
]);
