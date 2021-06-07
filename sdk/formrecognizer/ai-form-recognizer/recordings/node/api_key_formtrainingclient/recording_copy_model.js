let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName162196587130604103"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName162196587130604103"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  '65ad0634-9de5-4e6f-90f3-8b4b114ea27d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6c8621ff-26ae-423d-8c03-c48190d0e003","modelName":"copyModelName162196587130604103","status":"creating","createdDateTime":"2021-05-25T18:04:31Z","lastUpdatedDateTime":"2021-05-25T18:04:31Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'f68d5bda-d51e-4dea-84b7-814118c830ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6c8621ff-26ae-423d-8c03-c48190d0e003","modelName":"copyModelName162196587130604103","status":"creating","createdDateTime":"2021-05-25T18:04:31Z","lastUpdatedDateTime":"2021-05-25T18:04:31Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '1ea56d64-4e6c-40dc-b4ae-8aa5daade425',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6c8621ff-26ae-423d-8c03-c48190d0e003","modelName":"copyModelName162196587130604103","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-25T18:04:31Z","lastUpdatedDateTime":"2021-05-25T18:04:33Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '46c534ec-d976-4084-afb5-72cfb0e1982a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde","accessToken":"accessToken","expirationDateTimeTicks":1622052276}, [
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/525872b4-00be-45f4-af1d-0d7eede5dfde',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'b1ba5508-1ae4-49e9-a0bc-bc244f48cc7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde","accessToken":"accessToken","expirationDateTimeTicks":1622052276}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003/copyresults/59c10fa4-fe80-481b-876a-e9024eac72ac',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'ec02bc56-2097-4d1e-afda-0cd54ed44687',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003/copyResults/59c10fa4-fe80-481b-876a-e9024eac72ac')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T18:04:37Z","lastUpdatedDateTime":"2021-05-25T18:04:37Z","copyResult":{"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'af350073-3e6a-47c8-b9b2-f88fe5f2d20b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003/copyResults/59c10fa4-fe80-481b-876a-e9024eac72ac')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T18:04:37Z","lastUpdatedDateTime":"2021-05-25T18:04:37Z","copyResult":{"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '21512f14-b8bc-40b2-b19e-c5ccfe144cfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003/copyResults/59c10fa4-fe80-481b-876a-e9024eac72ac')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T18:04:37Z","lastUpdatedDateTime":"2021-05-25T18:04:37Z","copyResult":{"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'f488f622-5e02-453b-85c8-b806087e15ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003/copyResults/59c10fa4-fe80-481b-876a-e9024eac72ac')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T18:04:37Z","lastUpdatedDateTime":"2021-05-25T18:04:37Z","copyResult":{"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '58792c43-db3d-40c0-a453-b04187b78af6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003/copyResults/59c10fa4-fe80-481b-876a-e9024eac72ac')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T18:04:37Z","lastUpdatedDateTime":"2021-05-25T18:04:37Z","copyResult":{"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'f7aa9273-b1de-4d1c-ad49-756a408c0067',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003/copyResults/59c10fa4-fe80-481b-876a-e9024eac72ac')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T18:04:37Z","lastUpdatedDateTime":"2021-05-25T18:04:37Z","copyResult":{"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'b6913f30-bdf3-40ca-a986-a99ceb4224b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/6c8621ff-26ae-423d-8c03-c48190d0e003/copyResults/59c10fa4-fe80-481b-876a-e9024eac72ac')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-25T18:05:02.4222802Z","lastUpdatedDateTime":"2021-05-25T18:05:02.4222806Z","copyResult":{"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde"}}, [
  'Content-Length',
  '188',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '859ec63a-b770-4387-bc1b-02392307cf69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/525872b4-00be-45f4-af1d-0d7eede5dfde')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"525872b4-00be-45f4-af1d-0d7eede5dfde","modelName":"copyModelName162196587130604103","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-25T18:04:31Z","lastUpdatedDateTime":"2021-05-25T18:04:33Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '84c6841f-6aad-46bb-87d8-cee2a6e6a33b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:02 GMT'
]);
