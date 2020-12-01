let nock = require('nock');

module.exports.hash = "8240fc77396f323221b3ea2b9fa93643";

module.exports.testInfo = {"uniqueName":{"composedModelName":"composedModelName160580068637409649"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input1"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/7ff2c6c6-afa5-49c7-af49-e879def91de0',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'c77c1c1f-d990-43ca-8b38-2b8869c4212b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input2"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/c13a66a1-5f5b-46ab-acb9-0e6855e7e937',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'e241985f-0fbd-4d1c-9d45-82a5c771c81b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/7ff2c6c6-afa5-49c7-af49-e879def91de0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7ff2c6c6-afa5-49c7-af49-e879def91de0","modelName":"input1","status":"creating","createdDateTime":"2020-11-19T15:44:40Z","lastUpdatedDateTime":"2020-11-19T15:44:40Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'd6d0411e-fe69-4721-a28c-1d23a22dd846',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/c13a66a1-5f5b-46ab-acb9-0e6855e7e937')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c13a66a1-5f5b-46ab-acb9-0e6855e7e937","modelName":"input2","status":"creating","createdDateTime":"2020-11-19T15:44:40Z","lastUpdatedDateTime":"2020-11-19T15:44:40Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '975451b3-773f-4c43-a09b-a635e84694de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/7ff2c6c6-afa5-49c7-af49-e879def91de0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7ff2c6c6-afa5-49c7-af49-e879def91de0","modelName":"input1","status":"creating","createdDateTime":"2020-11-19T15:44:40Z","lastUpdatedDateTime":"2020-11-19T15:44:40Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '8cd624bc-8767-4531-96ef-6382659240c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/c13a66a1-5f5b-46ab-acb9-0e6855e7e937')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c13a66a1-5f5b-46ab-acb9-0e6855e7e937","modelName":"input2","status":"creating","createdDateTime":"2020-11-19T15:44:40Z","lastUpdatedDateTime":"2020-11-19T15:44:40Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '8ec83381-4aa2-42f5-9a4c-08f29eb5e240',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/7ff2c6c6-afa5-49c7-af49-e879def91de0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7ff2c6c6-afa5-49c7-af49-e879def91de0","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-19T15:44:40Z","lastUpdatedDateTime":"2020-11-19T15:44:43Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Content-Length',
  '1239',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '2b6565df-5970-4ec8-9a92-df784712f3ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/c13a66a1-5f5b-46ab-acb9-0e6855e7e937')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c13a66a1-5f5b-46ab-acb9-0e6855e7e937","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-19T15:44:40Z","lastUpdatedDateTime":"2020-11-19T15:44:43Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Content-Length',
  '1239',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '8a9a0132-159c-4913-af46-f8884bafef36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models/compose', {"modelIds":["7ff2c6c6-afa5-49c7-af49-e879def91de0","c13a66a1-5f5b-46ab-acb9-0e6855e7e937"],"modelName":"composedModelName160580068637409649"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/3b5ac5d1-0053-4f83-87c2-19e2aa3053c4',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'b39d1fbb-bcf9-48ad-a289-0b93992f7072',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/3b5ac5d1-0053-4f83-87c2-19e2aa3053c4')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3b5ac5d1-0053-4f83-87c2-19e2aa3053c4","modelName":"composedModelName160580068637409649","status":"creating","createdDateTime":"2020-11-19T15:44:46Z","lastUpdatedDateTime":"2020-11-19T15:44:46Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'b2947b10-b5dc-433a-aa86-0900e96def49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/3b5ac5d1-0053-4f83-87c2-19e2aa3053c4')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3b5ac5d1-0053-4f83-87c2-19e2aa3053c4","modelName":"composedModelName160580068637409649","status":"creating","createdDateTime":"2020-11-19T15:44:46Z","lastUpdatedDateTime":"2020-11-19T15:44:46Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '6e3681c3-5da5-4859-8606-464a25f5fcd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/3b5ac5d1-0053-4f83-87c2-19e2aa3053c4')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3b5ac5d1-0053-4f83-87c2-19e2aa3053c4","modelName":"composedModelName160580068637409649","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2020-11-19T15:44:46Z","lastUpdatedDateTime":"2020-11-19T15:44:46Z"},"composedTrainResults":[{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"modelId":"7ff2c6c6-afa5-49c7-af49-e879def91de0","errors":[]},{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"modelId":"c13a66a1-5f5b-46ab-acb9-0e6855e7e937","errors":[]}]}, [
  'Content-Length',
  '2379',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'e94c6f08-e8e2-419f-814b-f57b14a1007c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:51 GMT'
]);
