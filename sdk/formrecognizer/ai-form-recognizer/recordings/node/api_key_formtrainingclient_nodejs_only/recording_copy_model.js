let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName160409719940507319"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName160409719940507319"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'b9a539b0-3b07-46ab-948d-f6a610070bb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"cfa25cc4-99be-4641-ab9b-80cb9f8fc675","modelName":"copyModelName160409719940507319","status":"creating","createdDateTime":"2020-10-30T22:33:19Z","lastUpdatedDateTime":"2020-10-30T22:33:19Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'd9084f48-fb12-47e1-8fca-8f00555efda4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"cfa25cc4-99be-4641-ab9b-80cb9f8fc675","modelName":"copyModelName160409719940507319","status":"creating","createdDateTime":"2020-10-30T22:33:19Z","lastUpdatedDateTime":"2020-10-30T22:33:19Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '7ea5d545-e76b-4b4a-bb60-2f175c0c64ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"cfa25cc4-99be-4641-ab9b-80cb9f8fc675","modelName":"copyModelName160409719940507319","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:33:19Z","lastUpdatedDateTime":"2020-10-30T22:33:21Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '4784e5ee-8210-458c-be0e-83a7fe9887ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3","accessToken":"accessToken","expirationDateTimeTicks":1604183605}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/732a43dd-26c7-4094-8034-5456bf6fa0e3',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  'ffe6e12c-be04-47fa-a226-9c2c853fe0c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3","accessToken":"accessToken","expirationDateTimeTicks":1604183605}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copyresults/b897f950-013c-4bbf-bad3-97d2db75f612',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '45ad33bf-53fa-4788-96b8-c81c582377ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copyResults/b897f950-013c-4bbf-bad3-97d2db75f612')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:33:25Z","lastUpdatedDateTime":"2020-10-30T22:33:25Z","copyResult":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '2fc1b243-3ea9-437e-b70a-ae5d37bc75fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copyResults/b897f950-013c-4bbf-bad3-97d2db75f612')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:33:25Z","lastUpdatedDateTime":"2020-10-30T22:33:25Z","copyResult":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'e334b368-0015-4892-9a2f-6bc3c8507eb6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copyResults/b897f950-013c-4bbf-bad3-97d2db75f612')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:33:25Z","lastUpdatedDateTime":"2020-10-30T22:33:25Z","copyResult":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '0dd2185c-34eb-4813-9b05-8d332347e632',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copyResults/b897f950-013c-4bbf-bad3-97d2db75f612')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:33:25Z","lastUpdatedDateTime":"2020-10-30T22:33:25Z","copyResult":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '14d725a9-a69e-458e-9fbf-050ea728c0d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copyResults/b897f950-013c-4bbf-bad3-97d2db75f612')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:33:25Z","lastUpdatedDateTime":"2020-10-30T22:33:25Z","copyResult":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '8306d814-49f3-4316-ae07-a5040c0533b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copyResults/b897f950-013c-4bbf-bad3-97d2db75f612')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:33:25Z","lastUpdatedDateTime":"2020-10-30T22:33:25Z","copyResult":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '3b1b5081-6609-401c-9ecb-237ddf610b67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copyResults/b897f950-013c-4bbf-bad3-97d2db75f612')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:33:25Z","lastUpdatedDateTime":"2020-10-30T22:33:25Z","copyResult":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '0826d02f-d651-4c5e-b213-4af8ba8b4466',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/cfa25cc4-99be-4641-ab9b-80cb9f8fc675/copyResults/b897f950-013c-4bbf-bad3-97d2db75f612')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-10-30T22:33:51.5287531Z","lastUpdatedDateTime":"2020-10-30T22:33:51.5287535Z","copyResult":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '0e589294-7cb1-4ce8-8df8-7150905a7ba0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/732a43dd-26c7-4094-8034-5456bf6fa0e3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"732a43dd-26c7-4094-8034-5456bf6fa0e3","modelName":"copyModelName160409719940507319","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:33:19Z","lastUpdatedDateTime":"2020-10-30T22:33:21Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '5c9d91e7-4d44-4ebe-9fe8-ffa467280513',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:56 GMT'
]);
