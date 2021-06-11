let nock = require('nock');

module.exports.hash = "f728c256d475c8390b8fd8293968133e";

module.exports.testInfo = {"uniqueName":{"composedModelName":"composedModelName162196586582108175"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input1"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/fbaa2186-b1a1-4400-9bd3-6f3c6a2d7626',
  'x-envoy-upstream-service-time',
  '209',
  'apim-request-id',
  'bb9f4a04-b640-4722-8776-12af5b70ddbc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input2"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/1dd9c96e-48df-48f9-9aca-0d30cfa37f41',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  'fc481834-3e1f-46e6-b01b-8880cada13b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/1dd9c96e-48df-48f9-9aca-0d30cfa37f41')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1dd9c96e-48df-48f9-9aca-0d30cfa37f41","modelName":"input2","status":"creating","createdDateTime":"2021-05-25T18:04:20Z","lastUpdatedDateTime":"2021-05-25T18:04:20Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'bf8ac4c8-9d5d-4861-87e9-711c60ca5cf5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/fbaa2186-b1a1-4400-9bd3-6f3c6a2d7626')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"fbaa2186-b1a1-4400-9bd3-6f3c6a2d7626","modelName":"input1","status":"creating","createdDateTime":"2021-05-25T18:04:20Z","lastUpdatedDateTime":"2021-05-25T18:04:20Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '2ab59fca-d2c4-41b5-bda0-b1f90a80922e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/1dd9c96e-48df-48f9-9aca-0d30cfa37f41')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1dd9c96e-48df-48f9-9aca-0d30cfa37f41","modelName":"input2","status":"creating","createdDateTime":"2021-05-25T18:04:20Z","lastUpdatedDateTime":"2021-05-25T18:04:20Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '984a5525-f44e-410f-bd13-df81943ec51d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/fbaa2186-b1a1-4400-9bd3-6f3c6a2d7626')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"fbaa2186-b1a1-4400-9bd3-6f3c6a2d7626","modelName":"input1","status":"creating","createdDateTime":"2021-05-25T18:04:20Z","lastUpdatedDateTime":"2021-05-25T18:04:20Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'a3413e88-f7c7-476f-9024-b6d575b11de0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/1dd9c96e-48df-48f9-9aca-0d30cfa37f41')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1dd9c96e-48df-48f9-9aca-0d30cfa37f41","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-25T18:04:20Z","lastUpdatedDateTime":"2021-05-25T18:04:23Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '8c1ed90f-e5bc-490b-a893-cc19b37b71b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/fbaa2186-b1a1-4400-9bd3-6f3c6a2d7626')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"fbaa2186-b1a1-4400-9bd3-6f3c6a2d7626","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-25T18:04:20Z","lastUpdatedDateTime":"2021-05-25T18:04:22Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'b2180d1c-94dc-440a-bdd4-8011ae950339',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/compose', {"modelIds":["fbaa2186-b1a1-4400-9bd3-6f3c6a2d7626","1dd9c96e-48df-48f9-9aca-0d30cfa37f41"],"modelName":"composedModelName162196586582108175"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/210d44ff-63b6-4975-a092-3fa1d262eae3',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '0a602955-a4ef-4c4d-8362-163b6698cd99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/210d44ff-63b6-4975-a092-3fa1d262eae3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"210d44ff-63b6-4975-a092-3fa1d262eae3","modelName":"composedModelName162196586582108175","status":"creating","createdDateTime":"2021-05-25T18:04:25Z","lastUpdatedDateTime":"2021-05-25T18:04:25Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '726d5a97-0a6b-4832-b25e-7634dedb96ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/210d44ff-63b6-4975-a092-3fa1d262eae3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"210d44ff-63b6-4975-a092-3fa1d262eae3","modelName":"composedModelName162196586582108175","status":"creating","createdDateTime":"2021-05-25T18:04:25Z","lastUpdatedDateTime":"2021-05-25T18:04:25Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'dccdfffe-e1f2-4d1c-b74a-d70aadcd7a0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/210d44ff-63b6-4975-a092-3fa1d262eae3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"210d44ff-63b6-4975-a092-3fa1d262eae3","modelName":"composedModelName162196586582108175","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-05-25T18:04:25Z","lastUpdatedDateTime":"2021-05-25T18:04:26Z"},"composedTrainResults":[{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"modelId":"fbaa2186-b1a1-4400-9bd3-6f3c6a2d7626","errors":[]},{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"modelId":"1dd9c96e-48df-48f9-9aca-0d30cfa37f41","errors":[]}]}, [
  'Content-Length',
  '2427',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'a683be38-9876-4d10-8c94-c0256455e862',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:30 GMT'
]);
