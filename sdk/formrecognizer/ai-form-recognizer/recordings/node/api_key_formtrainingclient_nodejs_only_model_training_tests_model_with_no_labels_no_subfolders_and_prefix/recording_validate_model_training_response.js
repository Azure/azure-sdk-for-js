let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"5":"modelName160409733718806062"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160409733718806062"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/a38f86af-e110-4a09-ac49-c484ef0c5a26',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '5f218e86-d73f-4ac9-aa28-9493ddb1eaa9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a38f86af-e110-4a09-ac49-c484ef0c5a26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a38f86af-e110-4a09-ac49-c484ef0c5a26","modelName":"modelName160409733718806062","status":"creating","createdDateTime":"2020-10-30T22:35:37Z","lastUpdatedDateTime":"2020-10-30T22:35:37Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'a62aa352-f1d7-4e16-8dfb-4a82455b6acc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a38f86af-e110-4a09-ac49-c484ef0c5a26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a38f86af-e110-4a09-ac49-c484ef0c5a26","modelName":"modelName160409733718806062","status":"creating","createdDateTime":"2020-10-30T22:35:37Z","lastUpdatedDateTime":"2020-10-30T22:35:37Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '933289cb-6567-4e78-9145-cecfbeaba4f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a38f86af-e110-4a09-ac49-c484ef0c5a26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a38f86af-e110-4a09-ac49-c484ef0c5a26","modelName":"modelName160409733718806062","status":"creating","createdDateTime":"2020-10-30T22:35:37Z","lastUpdatedDateTime":"2020-10-30T22:35:37Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '3025c743-e105-44b3-9773-c6921173c375',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a38f86af-e110-4a09-ac49-c484ef0c5a26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a38f86af-e110-4a09-ac49-c484ef0c5a26","modelName":"modelName160409733718806062","status":"creating","createdDateTime":"2020-10-30T22:35:37Z","lastUpdatedDateTime":"2020-10-30T22:35:37Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '00eef0e1-420b-4e30-83d3-c2356fc30c69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a38f86af-e110-4a09-ac49-c484ef0c5a26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a38f86af-e110-4a09-ac49-c484ef0c5a26","modelName":"modelName160409733718806062","status":"creating","createdDateTime":"2020-10-30T22:35:37Z","lastUpdatedDateTime":"2020-10-30T22:35:37Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'dea70215-500f-4564-a225-11c73af69449',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a38f86af-e110-4a09-ac49-c484ef0c5a26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a38f86af-e110-4a09-ac49-c484ef0c5a26","status":"ready","createdDateTime":"2020-10-30T22:35:37Z","lastUpdatedDateTime":"2020-10-30T22:35:54Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '35d7c786-61a2-4abc-8939-a781e206525f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:57 GMT'
]);
