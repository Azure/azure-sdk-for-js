let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"5":"modelName160409684141907876"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160409684141907876"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/0b287dc6-1c73-4230-965c-83b10e298c57',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '87b14516-0f89-47a0-b571-9f8d24402d79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/0b287dc6-1c73-4230-965c-83b10e298c57')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0b287dc6-1c73-4230-965c-83b10e298c57","modelName":"modelName160409684141907876","status":"creating","createdDateTime":"2020-10-30T22:27:21Z","lastUpdatedDateTime":"2020-10-30T22:27:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '0920ea57-848f-4370-ac3c-51ae91c1cf1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/0b287dc6-1c73-4230-965c-83b10e298c57')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0b287dc6-1c73-4230-965c-83b10e298c57","modelName":"modelName160409684141907876","status":"creating","createdDateTime":"2020-10-30T22:27:21Z","lastUpdatedDateTime":"2020-10-30T22:27:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '8c1cbdcd-7c41-4001-a037-0e0f7da4523d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/0b287dc6-1c73-4230-965c-83b10e298c57')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0b287dc6-1c73-4230-965c-83b10e298c57","modelName":"modelName160409684141907876","status":"creating","createdDateTime":"2020-10-30T22:27:21Z","lastUpdatedDateTime":"2020-10-30T22:27:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'f08f303a-4fe9-46c8-b654-9dd9a7b4b13b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/0b287dc6-1c73-4230-965c-83b10e298c57')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0b287dc6-1c73-4230-965c-83b10e298c57","modelName":"modelName160409684141907876","status":"creating","createdDateTime":"2020-10-30T22:27:21Z","lastUpdatedDateTime":"2020-10-30T22:27:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '89ffca0f-a3bf-41a8-98a5-0b5385c7c9bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/0b287dc6-1c73-4230-965c-83b10e298c57')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0b287dc6-1c73-4230-965c-83b10e298c57","status":"ready","createdDateTime":"2020-10-30T22:27:21Z","lastUpdatedDateTime":"2020-10-30T22:27:37Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '1385d87f-b948-4260-94b1-2ff8fa53177c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:37 GMT'
]);
