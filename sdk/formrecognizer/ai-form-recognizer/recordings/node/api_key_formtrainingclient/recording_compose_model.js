let nock = require('nock');

module.exports.hash = "6c36ec545a3284ecd0d925dc2577cc46";

module.exports.testInfo = {"uniqueName":{"composedModelName":"composedModelName160529465883100798"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input1"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/5130a1da-2048-40fb-934f-65f4bc588a40',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '4cc9fe6e-277e-4d1f-ba5b-643a4d5970d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input2"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/55c00a81-1d62-415a-b4e4-c38a56236ab1',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '9a9b90f8-7092-4341-840f-908fa3b8ff7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/5130a1da-2048-40fb-934f-65f4bc588a40')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5130a1da-2048-40fb-934f-65f4bc588a40","modelName":"input1","status":"creating","createdDateTime":"2020-11-13T19:10:53Z","lastUpdatedDateTime":"2020-11-13T19:10:53Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '78fe3466-f5a6-4620-97c4-133b34e7554b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55c00a81-1d62-415a-b4e4-c38a56236ab1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"55c00a81-1d62-415a-b4e4-c38a56236ab1","modelName":"input2","status":"creating","createdDateTime":"2020-11-13T19:10:53Z","lastUpdatedDateTime":"2020-11-13T19:10:53Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '7e076dd3-9019-48cf-8fe1-a7db3fee2e40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/5130a1da-2048-40fb-934f-65f4bc588a40')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5130a1da-2048-40fb-934f-65f4bc588a40","modelName":"input1","status":"creating","createdDateTime":"2020-11-13T19:10:53Z","lastUpdatedDateTime":"2020-11-13T19:10:53Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '03e8102b-e8c3-4dfa-a2ca-c6a00b49407a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55c00a81-1d62-415a-b4e4-c38a56236ab1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"55c00a81-1d62-415a-b4e4-c38a56236ab1","modelName":"input2","status":"creating","createdDateTime":"2020-11-13T19:10:53Z","lastUpdatedDateTime":"2020-11-13T19:10:53Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  '13684404-d1df-492d-8a78-2f209838786c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/5130a1da-2048-40fb-934f-65f4bc588a40')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5130a1da-2048-40fb-934f-65f4bc588a40","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-13T19:10:53Z","lastUpdatedDateTime":"2020-11-13T19:10:55Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'ec17c019-8448-4e50-aa74-0ab7ccf12da7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55c00a81-1d62-415a-b4e4-c38a56236ab1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"55c00a81-1d62-415a-b4e4-c38a56236ab1","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-13T19:10:53Z","lastUpdatedDateTime":"2020-11-13T19:10:55Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'd854b533-d9ac-4913-b60c-af8ddf5e92a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/compose', {"modelIds":["5130a1da-2048-40fb-934f-65f4bc588a40","55c00a81-1d62-415a-b4e4-c38a56236ab1"],"modelName":"composedModelName160529465883100798"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/01812397-fac9-4286-a585-62f5978ecc26',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'd883d8a2-0ae5-4ef2-910d-40721ed5310a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/01812397-fac9-4286-a585-62f5978ecc26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"01812397-fac9-4286-a585-62f5978ecc26","modelName":"composedModelName160529465883100798","status":"creating","createdDateTime":"2020-11-13T19:10:58Z","lastUpdatedDateTime":"2020-11-13T19:10:58Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'a352256a-4c79-490e-8441-2895eeb42568',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/01812397-fac9-4286-a585-62f5978ecc26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"01812397-fac9-4286-a585-62f5978ecc26","modelName":"composedModelName160529465883100798","status":"creating","createdDateTime":"2020-11-13T19:10:58Z","lastUpdatedDateTime":"2020-11-13T19:10:58Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '762c29a9-d2aa-47b8-952b-3dda1b1e70d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:10:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/01812397-fac9-4286-a585-62f5978ecc26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"01812397-fac9-4286-a585-62f5978ecc26","modelName":"composedModelName160529465883100798","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2020-11-13T19:10:58Z","lastUpdatedDateTime":"2020-11-13T19:10:59Z"},"composedTrainResults":[{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"modelId":"5130a1da-2048-40fb-934f-65f4bc588a40","errors":[]},{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"modelId":"55c00a81-1d62-415a-b4e4-c38a56236ab1","errors":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'eb85818a-dbd8-48c7-b113-562e702c4c47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:11:03 GMT'
]);
