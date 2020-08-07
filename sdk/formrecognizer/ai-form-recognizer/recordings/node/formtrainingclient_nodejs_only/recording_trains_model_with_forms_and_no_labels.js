let nock = require('nock');

module.exports.hash = "3615d7469fc41dac52ec168153c35e89";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'c5013cbd-9b05-4cd6-8053-671da44abfd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0483c505-0117-4a9c-9335-a875c6fc422b","status":"creating","createdDateTime":"2020-08-05T23:29:08Z","lastUpdatedDateTime":"2020-08-05T23:29:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'f1692343-539a-4a5f-898a-79b895294327',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0483c505-0117-4a9c-9335-a875c6fc422b","status":"creating","createdDateTime":"2020-08-05T23:29:08Z","lastUpdatedDateTime":"2020-08-05T23:29:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '40fad733-7148-4e4e-a3c8-315d61c2b54a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0483c505-0117-4a9c-9335-a875c6fc422b","status":"creating","createdDateTime":"2020-08-05T23:29:08Z","lastUpdatedDateTime":"2020-08-05T23:29:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'b9525bf1-9986-4072-ba4a-6733dce1db30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/0483c505-0117-4a9c-9335-a875c6fc422b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0483c505-0117-4a9c-9335-a875c6fc422b","status":"ready","createdDateTime":"2020-08-05T23:29:08Z","lastUpdatedDateTime":"2020-08-05T23:29:17Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '9b588598-e997-4cd6-b1e4-f3cdbf193682',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:18 GMT'
]);
