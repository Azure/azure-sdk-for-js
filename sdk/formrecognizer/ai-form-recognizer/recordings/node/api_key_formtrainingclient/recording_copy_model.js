let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName160580069187802996"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName160580069187802996"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'dffd81ca-9635-4eb5-a18d-0efa0275b355',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"852877c4-acb4-40a9-b789-925d22306a7b","modelName":"copyModelName160580069187802996","status":"creating","createdDateTime":"2020-11-19T15:44:52Z","lastUpdatedDateTime":"2020-11-19T15:44:52Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'bf49bf71-caf3-4ad5-a56a-70b709a93a84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"852877c4-acb4-40a9-b789-925d22306a7b","modelName":"copyModelName160580069187802996","status":"creating","createdDateTime":"2020-11-19T15:44:52Z","lastUpdatedDateTime":"2020-11-19T15:44:52Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '82e2e7d7-b494-4982-812f-38a4bdd1c94f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"852877c4-acb4-40a9-b789-925d22306a7b","modelName":"copyModelName160580069187802996","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-19T15:44:52Z","lastUpdatedDateTime":"2020-11-19T15:44:54Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '3054d824-52b5-4125-a598-292816d9bb21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models/copyAuthorization')
  .reply(201, {"modelId":"5dd95e29-f645-4e48-9ea7-0fabd1ebc7e0","accessToken":"accessToken","expirationDateTimeTicks":1605887097}, [
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/5dd95e29-f645-4e48-9ea7-0fabd1ebc7e0',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'c6d07b50-fbc4-401c-bb71-174d3f05e98a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"5dd95e29-f645-4e48-9ea7-0fabd1ebc7e0","accessToken":"accessToken","expirationDateTimeTicks":1605887097}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b/copyresults/619dc59f-eeec-4283-a0e9-23b7b2d2b66f',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  'c510e3e0-7f1f-4719-82ba-8726fc0d37c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b/copyResults/619dc59f-eeec-4283-a0e9-23b7b2d2b66f')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-19T15:44:58Z","lastUpdatedDateTime":"2020-11-19T15:44:58Z","copyResult":{"modelId":"5dd95e29-f645-4e48-9ea7-0fabd1ebc7e0"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '6aa72bfc-a196-499d-86fe-0c50ec44e16b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b/copyResults/619dc59f-eeec-4283-a0e9-23b7b2d2b66f')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-19T15:44:58Z","lastUpdatedDateTime":"2020-11-19T15:44:58Z","copyResult":{"modelId":"5dd95e29-f645-4e48-9ea7-0fabd1ebc7e0"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'fa0c2e11-2d18-4ae2-bf30-e77387a467d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:44:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b/copyResults/619dc59f-eeec-4283-a0e9-23b7b2d2b66f')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-19T15:44:58Z","lastUpdatedDateTime":"2020-11-19T15:44:58Z","copyResult":{"modelId":"5dd95e29-f645-4e48-9ea7-0fabd1ebc7e0"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '4e9c9f5e-6bc7-4eb2-b173-0c0380af8eed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:45:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/852877c4-acb4-40a9-b789-925d22306a7b/copyResults/619dc59f-eeec-4283-a0e9-23b7b2d2b66f')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-19T15:45:07.5071155Z","lastUpdatedDateTime":"2020-11-19T15:45:07.5071159Z","copyResult":{"modelId":"5dd95e29-f645-4e48-9ea7-0fabd1ebc7e0"}}, [
  'Content-Length',
  '188',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'fb30f79a-66a1-4533-9d6a-dad2d4131867',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:45:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/5dd95e29-f645-4e48-9ea7-0fabd1ebc7e0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5dd95e29-f645-4e48-9ea7-0fabd1ebc7e0","modelName":"copyModelName160580069187802996","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-19T15:44:52Z","lastUpdatedDateTime":"2020-11-19T15:44:54Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '3656dd93-b98d-42bc-9209-d8bae044d69d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:45:08 GMT'
]);
