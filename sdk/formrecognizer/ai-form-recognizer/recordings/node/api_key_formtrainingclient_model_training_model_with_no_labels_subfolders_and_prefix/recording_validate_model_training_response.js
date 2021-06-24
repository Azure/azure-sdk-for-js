let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"3":"modelName162196592647001257"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName162196592647001257"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  '33f7ece4-f81b-4745-90d8-2ad4afe2d04d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3877e0d-44cc-425f-8273-6cec3180018f","modelName":"modelName162196592647001257","status":"creating","createdDateTime":"2021-05-25T18:05:26Z","lastUpdatedDateTime":"2021-05-25T18:05:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '52249cf5-1f26-46df-a849-d7caa26abdcd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3877e0d-44cc-425f-8273-6cec3180018f","modelName":"modelName162196592647001257","status":"creating","createdDateTime":"2021-05-25T18:05:26Z","lastUpdatedDateTime":"2021-05-25T18:05:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '53d37439-8889-4172-b443-1ffb560e62e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3877e0d-44cc-425f-8273-6cec3180018f","modelName":"modelName162196592647001257","status":"creating","createdDateTime":"2021-05-25T18:05:26Z","lastUpdatedDateTime":"2021-05-25T18:05:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'b537d39f-9c55-4b15-ae18-83b8c950786e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3877e0d-44cc-425f-8273-6cec3180018f","modelName":"modelName162196592647001257","status":"creating","createdDateTime":"2021-05-25T18:05:26Z","lastUpdatedDateTime":"2021-05-25T18:05:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '0f114a04-699f-413b-9b49-8bed3c737ad9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3877e0d-44cc-425f-8273-6cec3180018f","modelName":"modelName162196592647001257","status":"creating","createdDateTime":"2021-05-25T18:05:26Z","lastUpdatedDateTime":"2021-05-25T18:05:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'fc41049f-1007-4eda-8d24-594e1b75f0f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3877e0d-44cc-425f-8273-6cec3180018f","modelName":"modelName162196592647001257","status":"creating","createdDateTime":"2021-05-25T18:05:26Z","lastUpdatedDateTime":"2021-05-25T18:05:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'e8ae5c0e-f123-48be-a554-cc0d5d187959',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3877e0d-44cc-425f-8273-6cec3180018f","modelName":"modelName162196592647001257","status":"ready","createdDateTime":"2021-05-25T18:05:26Z","lastUpdatedDateTime":"2021-05-25T18:05:47Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1037',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '5d087df4-56fa-4eac-9990-558e2153743d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:51 GMT'
]);
