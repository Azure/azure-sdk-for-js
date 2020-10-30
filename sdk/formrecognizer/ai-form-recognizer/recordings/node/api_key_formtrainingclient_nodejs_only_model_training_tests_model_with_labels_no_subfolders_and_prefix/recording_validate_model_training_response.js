let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"1":"modelName160409723634704736"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName160409723634704736"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/1421a7b8-5a9a-4abf-933b-ce1116368b6c',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'b38cd954-0715-48e6-ac35-7d55594d9f36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1421a7b8-5a9a-4abf-933b-ce1116368b6c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1421a7b8-5a9a-4abf-933b-ce1116368b6c","modelName":"modelName160409723634704736","status":"creating","createdDateTime":"2020-10-30T22:33:56Z","lastUpdatedDateTime":"2020-10-30T22:33:56Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '9edd7128-42a1-46e7-90e5-e076fa1a175e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1421a7b8-5a9a-4abf-933b-ce1116368b6c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1421a7b8-5a9a-4abf-933b-ce1116368b6c","modelName":"modelName160409723634704736","status":"creating","createdDateTime":"2020-10-30T22:33:56Z","lastUpdatedDateTime":"2020-10-30T22:33:56Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'd18a8c88-ba0d-488f-ac7b-a630573100b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1421a7b8-5a9a-4abf-933b-ce1116368b6c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1421a7b8-5a9a-4abf-933b-ce1116368b6c","modelName":"modelName160409723634704736","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:33:56Z","lastUpdatedDateTime":"2020-10-30T22:33:58Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '3f533a21-3098-49f1-bb66-3ceade26b4d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:34:01 GMT'
]);
