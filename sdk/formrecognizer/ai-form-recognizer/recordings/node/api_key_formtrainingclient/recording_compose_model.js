let nock = require('nock');

module.exports.hash = "f728c256d475c8390b8fd8293968133e";

module.exports.testInfo = {"uniqueName":{"composedModelName":"composedModelName161714582582900756"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input1"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/c7dd419f-c0ec-49ac-8936-501c4420da95',
  'x-envoy-upstream-service-time',
  '260',
  'apim-request-id',
  '94006830-e52d-4808-af04-d5a1f64f232a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input2"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/b9fb3022-af16-4482-be81-cf546089b35f',
  'x-envoy-upstream-service-time',
  '260',
  'apim-request-id',
  'db199878-eb41-4740-8848-32dbcf217fa6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/c7dd419f-c0ec-49ac-8936-501c4420da95')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c7dd419f-c0ec-49ac-8936-501c4420da95","modelName":"input1","status":"creating","createdDateTime":"2021-03-30T23:10:20Z","lastUpdatedDateTime":"2021-03-30T23:10:20Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '834f75f5-a145-49ca-bc0b-ae62eca57880',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b9fb3022-af16-4482-be81-cf546089b35f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b9fb3022-af16-4482-be81-cf546089b35f","modelName":"input2","status":"creating","createdDateTime":"2021-03-30T23:10:20Z","lastUpdatedDateTime":"2021-03-30T23:10:20Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '7806a402-5d1f-4429-932c-415270d6f167',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/c7dd419f-c0ec-49ac-8936-501c4420da95')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c7dd419f-c0ec-49ac-8936-501c4420da95","modelName":"input1","status":"creating","createdDateTime":"2021-03-30T23:10:20Z","lastUpdatedDateTime":"2021-03-30T23:10:20Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '72a2413a-a89b-4bcc-a3e0-016ee06a755d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b9fb3022-af16-4482-be81-cf546089b35f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b9fb3022-af16-4482-be81-cf546089b35f","modelName":"input2","status":"creating","createdDateTime":"2021-03-30T23:10:20Z","lastUpdatedDateTime":"2021-03-30T23:10:20Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'c8e4a7fd-113f-4f1e-87ba-7a6b2c734035',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/c7dd419f-c0ec-49ac-8936-501c4420da95')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c7dd419f-c0ec-49ac-8936-501c4420da95","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-30T23:10:20Z","lastUpdatedDateTime":"2021-03-30T23:10:24Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  'd724114f-5d3b-4206-8d38-0bf1c8a5f320',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b9fb3022-af16-4482-be81-cf546089b35f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b9fb3022-af16-4482-be81-cf546089b35f","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-30T23:10:20Z","lastUpdatedDateTime":"2021-03-30T23:10:25Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '21d582f9-9863-46d2-90d0-95142bc2e11e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models/compose', {"modelIds":["c7dd419f-c0ec-49ac-8936-501c4420da95","b9fb3022-af16-4482-be81-cf546089b35f"],"modelName":"composedModelName161714582582900756"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/695626ba-0d3f-477c-b932-4b379262c260',
  'x-envoy-upstream-service-time',
  '274',
  'apim-request-id',
  '179be186-f874-406a-ba45-af224b333430',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/695626ba-0d3f-477c-b932-4b379262c260')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"695626ba-0d3f-477c-b932-4b379262c260","modelName":"composedModelName161714582582900756","status":"creating","createdDateTime":"2021-03-30T23:10:25Z","lastUpdatedDateTime":"2021-03-30T23:10:25Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '1d44b33b-0b3a-427e-afa3-0726539d0ed9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/695626ba-0d3f-477c-b932-4b379262c260')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"695626ba-0d3f-477c-b932-4b379262c260","modelName":"composedModelName161714582582900756","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-03-30T23:10:25Z","lastUpdatedDateTime":"2021-03-30T23:10:26Z"},"composedTrainResults":[{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"modelId":"c7dd419f-c0ec-49ac-8936-501c4420da95","errors":[]},{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"modelId":"b9fb3022-af16-4482-be81-cf546089b35f","errors":[]}]}, [
  'Content-Length',
  '2427',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'f0d7a12a-c7d9-47f8-b4a8-572bc00e10b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:26 GMT'
]);
