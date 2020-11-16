let nock = require('nock');

module.exports.hash = "8240fc77396f323221b3ea2b9fa93643";

module.exports.testInfo = {"uniqueName":{"composedModelName":"composedModelName160555543188509133"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input2"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/f6a047df-cde1-4bb4-9171-8fddf229bc6f',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  '013fe04f-0d48-48ae-a48b-1acfc47bc28f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input1"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/0d72bcd5-5414-405b-b159-4052288a5f1e',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  '98b1de2f-45b3-4267-8938-173f80837800',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/f6a047df-cde1-4bb4-9171-8fddf229bc6f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f6a047df-cde1-4bb4-9171-8fddf229bc6f","modelName":"input2","status":"creating","createdDateTime":"2020-11-16T19:37:05Z","lastUpdatedDateTime":"2020-11-16T19:37:05Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'cdb25dae-3a2c-4e53-92ca-f9a1164b0025',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/0d72bcd5-5414-405b-b159-4052288a5f1e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0d72bcd5-5414-405b-b159-4052288a5f1e","modelName":"input1","status":"creating","createdDateTime":"2020-11-16T19:37:05Z","lastUpdatedDateTime":"2020-11-16T19:37:05Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '0c68551e-9f31-4c55-82f8-5524a3d19e91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/0d72bcd5-5414-405b-b159-4052288a5f1e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0d72bcd5-5414-405b-b159-4052288a5f1e","modelName":"input1","status":"creating","createdDateTime":"2020-11-16T19:37:05Z","lastUpdatedDateTime":"2020-11-16T19:37:05Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'ff8f6a98-1789-4579-b5d6-ee75b757fde3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/f6a047df-cde1-4bb4-9171-8fddf229bc6f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f6a047df-cde1-4bb4-9171-8fddf229bc6f","modelName":"input2","status":"creating","createdDateTime":"2020-11-16T19:37:05Z","lastUpdatedDateTime":"2020-11-16T19:37:05Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '1c758af3-8bbe-4aa2-8131-2ace5883425e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/0d72bcd5-5414-405b-b159-4052288a5f1e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0d72bcd5-5414-405b-b159-4052288a5f1e","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-16T19:37:05Z","lastUpdatedDateTime":"2020-11-16T19:37:08Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'de4da4bc-e787-4462-9da7-0015de4ab069',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/f6a047df-cde1-4bb4-9171-8fddf229bc6f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f6a047df-cde1-4bb4-9171-8fddf229bc6f","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-16T19:37:05Z","lastUpdatedDateTime":"2020-11-16T19:37:08Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'a5e4c5e8-eef2-4bb8-902a-9580b96cd6c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/compose', {"modelIds":["0d72bcd5-5414-405b-b159-4052288a5f1e","f6a047df-cde1-4bb4-9171-8fddf229bc6f"],"modelName":"composedModelName160555543188509133"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/e58098a8-77b4-4f38-9c26-1b941ee2d852',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'a972189c-0971-4780-886e-f2bf84aea89d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e58098a8-77b4-4f38-9c26-1b941ee2d852')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e58098a8-77b4-4f38-9c26-1b941ee2d852","modelName":"composedModelName160555543188509133","status":"creating","createdDateTime":"2020-11-16T19:37:11Z","lastUpdatedDateTime":"2020-11-16T19:37:11Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '13f0c264-d729-470a-8cd8-aed615d3c13f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e58098a8-77b4-4f38-9c26-1b941ee2d852')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e58098a8-77b4-4f38-9c26-1b941ee2d852","modelName":"composedModelName160555543188509133","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2020-11-16T19:37:11Z","lastUpdatedDateTime":"2020-11-16T19:37:12Z"},"composedTrainResults":[{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"modelId":"0d72bcd5-5414-405b-b159-4052288a5f1e","errors":[]},{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"modelId":"f6a047df-cde1-4bb4-9171-8fddf229bc6f","errors":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '55417d66-489f-4029-b241-09ba1a5972d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 19:37:11 GMT'
]);
