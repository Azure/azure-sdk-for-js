let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName161714560855007037"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'b7733fb2-966e-4609-817d-8a7ed7253202',
  'x-ms-ests-server',
  '2.1.11562.10 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mAgAAAPal9dcOAAAA; expires=Thu, 29-Apr-2021 23:06:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:06:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName161714560855007037"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf',
  'x-envoy-upstream-service-time',
  '255',
  'apim-request-id',
  '405a46a8-7611-4e82-9b49-5ec1551ab6c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"72b5011f-5401-434b-af6d-320c53891ddf","modelName":"copyModelName161714560855007037","status":"creating","createdDateTime":"2021-03-30T23:06:48Z","lastUpdatedDateTime":"2021-03-30T23:06:48Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'c38ff877-f2e6-465e-a66d-dc1954b0cab9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"72b5011f-5401-434b-af6d-320c53891ddf","modelName":"copyModelName161714560855007037","status":"creating","createdDateTime":"2021-03-30T23:06:48Z","lastUpdatedDateTime":"2021-03-30T23:06:48Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '510513ee-0aec-41a4-9d9f-61c79ffe86d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"72b5011f-5401-434b-af6d-320c53891ddf","modelName":"copyModelName161714560855007037","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-30T23:06:48Z","lastUpdatedDateTime":"2021-03-30T23:06:52Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '90dd3943-012a-423a-8aad-2bd22227c035',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models/copyAuthorization')
  .reply(201, {"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26","accessToken":"accessToken","expirationDateTimeTicks":1617232014}, [
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/9272314a-d0bb-4d15-adbc-35d8dacd0e26',
  'x-envoy-upstream-service-time',
  '232',
  'apim-request-id',
  '1a574a67-938a-4232-99db-b5a407d68a40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26","accessToken":"accessToken","expirationDateTimeTicks":1617232014}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf/copyresults/8a994ebf-013a-4783-a7ae-009d82738d74',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '5d390285-98db-4d84-88f4-a118d3048a78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf/copyResults/8a994ebf-013a-4783-a7ae-009d82738d74')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:06:55Z","lastUpdatedDateTime":"2021-03-30T23:06:55Z","copyResult":{"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '5822b75b-f362-4188-8fc1-2e6294ce41ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf/copyResults/8a994ebf-013a-4783-a7ae-009d82738d74')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:06:55Z","lastUpdatedDateTime":"2021-03-30T23:06:55Z","copyResult":{"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '07a3dbb5-1b5e-4120-baaa-f4f4f5078207',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf/copyResults/8a994ebf-013a-4783-a7ae-009d82738d74')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:06:55Z","lastUpdatedDateTime":"2021-03-30T23:06:55Z","copyResult":{"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'f6e38e00-26b8-40f1-86ac-a24558b870ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf/copyResults/8a994ebf-013a-4783-a7ae-009d82738d74')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:06:55Z","lastUpdatedDateTime":"2021-03-30T23:06:55Z","copyResult":{"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '80095511-aac2-4001-a8f0-a63429cf4a80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf/copyResults/8a994ebf-013a-4783-a7ae-009d82738d74')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:06:55Z","lastUpdatedDateTime":"2021-03-30T23:06:55Z","copyResult":{"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'f669390d-ba59-4083-b39e-d645107d0335',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf/copyResults/8a994ebf-013a-4783-a7ae-009d82738d74')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:06:55Z","lastUpdatedDateTime":"2021-03-30T23:06:55Z","copyResult":{"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '47df7069-9591-44a6-8b55-7bda32c132cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/72b5011f-5401-434b-af6d-320c53891ddf/copyResults/8a994ebf-013a-4783-a7ae-009d82738d74')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:07:19.7619925Z","lastUpdatedDateTime":"2021-03-30T23:07:19.7619929Z","copyResult":{"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26"}}, [
  'Content-Length',
  '188',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '63060f95-3ccb-479d-a91c-4b88af34a2c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:20 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '87391168-6b0c-4a6d-a4b8-2c3b9dd62f01',
  'x-ms-ests-server',
  '2.1.11562.10 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mAwAAAPal9dcOAAAA; expires=Thu, 29-Apr-2021 23:07:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:07:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/9272314a-d0bb-4d15-adbc-35d8dacd0e26')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"9272314a-d0bb-4d15-adbc-35d8dacd0e26","modelName":"copyModelName161714560855007037","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-30T23:06:48Z","lastUpdatedDateTime":"2021-03-30T23:06:52Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '7bb0cee8-ea2d-443d-a2c9-19536f542276',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:20 GMT'
]);
