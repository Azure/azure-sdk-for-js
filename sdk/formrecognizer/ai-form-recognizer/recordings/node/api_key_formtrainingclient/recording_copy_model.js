let nock = require('nock');

module.exports.hash = "d23f88c7464b20b61ac5bfed01b6cacd";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName160409792474701092"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName160409792474701092"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '03743966-ae80-4d78-955e-3206e4928261',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2","modelName":"copyModelName160409792474701092","status":"creating","createdDateTime":"2020-10-30T22:45:25Z","lastUpdatedDateTime":"2020-10-30T22:45:25Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'd63c6c3c-ccf0-45e2-9eef-71a49f25d3d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2","modelName":"copyModelName160409792474701092","status":"creating","createdDateTime":"2020-10-30T22:45:25Z","lastUpdatedDateTime":"2020-10-30T22:45:25Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '20ac23f6-2839-49fa-b929-bdb97cf02e02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2","modelName":"copyModelName160409792474701092","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:45:25Z","lastUpdatedDateTime":"2020-10-30T22:45:26Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '81639650-569b-4372-9afc-431459808389',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744","accessToken":"accessToken","expirationDateTimeTicks":1604184330}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/84d5aec0-9435-4ef0-a096-e7fec70a2744',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '9eda42c3-de23-49da-ae91-a61e55a890ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744","accessToken":"accessToken","expirationDateTimeTicks":1604184330}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2/copyresults/6bbce646-0c3a-4584-bb09-e3f6794f5c0a',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'c1aabb99-1a22-4f2f-8e83-df3ff778dec0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2/copyResults/6bbce646-0c3a-4584-bb09-e3f6794f5c0a')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:30Z","lastUpdatedDateTime":"2020-10-30T22:45:30Z","copyResult":{"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '500997e4-131a-40a4-89d7-20d5a5b50293',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2/copyResults/6bbce646-0c3a-4584-bb09-e3f6794f5c0a')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:30Z","lastUpdatedDateTime":"2020-10-30T22:45:30Z","copyResult":{"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '28935d4c-645f-40c7-acef-a48662e14dc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2/copyResults/6bbce646-0c3a-4584-bb09-e3f6794f5c0a')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:30Z","lastUpdatedDateTime":"2020-10-30T22:45:30Z","copyResult":{"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '751e7c82-d408-4ff0-b849-3285d15cf910',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2/copyResults/6bbce646-0c3a-4584-bb09-e3f6794f5c0a')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:30Z","lastUpdatedDateTime":"2020-10-30T22:45:30Z","copyResult":{"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '075faf09-776e-4cbe-b5eb-11fb2ec8f622',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2/copyResults/6bbce646-0c3a-4584-bb09-e3f6794f5c0a')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:30Z","lastUpdatedDateTime":"2020-10-30T22:45:30Z","copyResult":{"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '99063fae-695e-4b1b-84ac-26b858416313',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2/copyResults/6bbce646-0c3a-4584-bb09-e3f6794f5c0a')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:30Z","lastUpdatedDateTime":"2020-10-30T22:45:30Z","copyResult":{"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'f89ae226-bfb5-4308-8f21-bc3fefb16090',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1aad4cfd-fef9-4f3f-b3fd-7611bc006cc2/copyResults/6bbce646-0c3a-4584-bb09-e3f6794f5c0a')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-10-30T22:45:52.1405459Z","lastUpdatedDateTime":"2020-10-30T22:45:52.1405462Z","copyResult":{"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '59816c45-5f28-4e4f-a1c7-fe7cb9da949b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/84d5aec0-9435-4ef0-a096-e7fec70a2744')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"84d5aec0-9435-4ef0-a096-e7fec70a2744","modelName":"copyModelName160409792474701092","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:45:25Z","lastUpdatedDateTime":"2020-10-30T22:45:26Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '06a5228e-0855-4534-9e8f-c8295dd0d31c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:57 GMT'
]);
