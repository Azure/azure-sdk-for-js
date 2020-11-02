let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName160434057742501157"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName160434057742501157"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  'fb7e4c3f-8cfb-420e-b437-1a15ff5d9e24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"55230abf-81a1-4a7a-9536-5cd12a47b3d2","modelName":"copyModelName160434057742501157","status":"creating","createdDateTime":"2020-11-02T18:09:37Z","lastUpdatedDateTime":"2020-11-02T18:09:37Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'a437817f-02f4-4593-98b1-bc961f75f3c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"55230abf-81a1-4a7a-9536-5cd12a47b3d2","modelName":"copyModelName160434057742501157","status":"creating","createdDateTime":"2020-11-02T18:09:37Z","lastUpdatedDateTime":"2020-11-02T18:09:37Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '88ce5f77-2a8a-48cd-833d-57ad9ef721ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"55230abf-81a1-4a7a-9536-5cd12a47b3d2","modelName":"copyModelName160434057742501157","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-02T18:09:37Z","lastUpdatedDateTime":"2020-11-02T18:09:39Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '30281624-a73f-43de-9869-6da57559ac94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"7945415e-3992-4e46-8b3e-67ebb6fc6dbe","accessToken":"accessToken","expirationDateTimeTicks":1604426983}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/7945415e-3992-4e46-8b3e-67ebb6fc6dbe',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '937444da-1246-42ce-9695-34ee35806756',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"7945415e-3992-4e46-8b3e-67ebb6fc6dbe","accessToken":"accessToken","expirationDateTimeTicks":1604426983}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2/copyresults/e1240dae-961b-4861-8e0a-ef6228bfa453',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'a4593b11-ad34-4c4d-9b99-4b2603b0c7dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2/copyResults/e1240dae-961b-4861-8e0a-ef6228bfa453')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-02T18:09:43Z","lastUpdatedDateTime":"2020-11-02T18:09:43Z","copyResult":{"modelId":"7945415e-3992-4e46-8b3e-67ebb6fc6dbe"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '5aaf4e38-c016-4dfe-bb51-7523687473d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2/copyResults/e1240dae-961b-4861-8e0a-ef6228bfa453')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-02T18:09:43Z","lastUpdatedDateTime":"2020-11-02T18:09:43Z","copyResult":{"modelId":"7945415e-3992-4e46-8b3e-67ebb6fc6dbe"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '5dc804e3-9158-46a1-a3ab-e9e1579a2b47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2/copyResults/e1240dae-961b-4861-8e0a-ef6228bfa453')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-02T18:09:43Z","lastUpdatedDateTime":"2020-11-02T18:09:43Z","copyResult":{"modelId":"7945415e-3992-4e46-8b3e-67ebb6fc6dbe"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '36e73adc-d97a-4a42-ad10-6e13c8c65f29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/55230abf-81a1-4a7a-9536-5cd12a47b3d2/copyResults/e1240dae-961b-4861-8e0a-ef6228bfa453')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-02T18:09:50.4861721Z","lastUpdatedDateTime":"2020-11-02T18:09:50.4861724Z","copyResult":{"modelId":"7945415e-3992-4e46-8b3e-67ebb6fc6dbe"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'da2f6b1e-14b8-4cb0-9b5e-8ac14f8b88fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/7945415e-3992-4e46-8b3e-67ebb6fc6dbe')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7945415e-3992-4e46-8b3e-67ebb6fc6dbe","modelName":"copyModelName160434057742501157","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-02T18:09:37Z","lastUpdatedDateTime":"2020-11-02T18:09:39Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '3c8aaad8-e964-42dd-ada1-1f2fd7440fde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:53 GMT'
]);
