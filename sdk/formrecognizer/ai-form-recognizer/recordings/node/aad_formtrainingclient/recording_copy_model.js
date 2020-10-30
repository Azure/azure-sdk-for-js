let nock = require('nock');

module.exports.hash = "d23f88c7464b20b61ac5bfed01b6cacd";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName160409790133601428"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1500',
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
  '26195591-fe45-4b96-9556-0e8b6d920f00',
  'x-ms-ests-server',
  '2.1.11198.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiRKJPa_ngtNuP6mZhmzdnn0CyfMAQAAAGyOLtcOAAAA; expires=Sun, 29-Nov-2020 22:45:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:45:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName160409790133601428"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '9140d74c-e880-40e5-855b-83f7ddbfd253',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3","modelName":"copyModelName160409790133601428","status":"creating","createdDateTime":"2020-10-30T22:45:02Z","lastUpdatedDateTime":"2020-10-30T22:45:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'cd2a1b89-638e-49c5-8552-c8b0c714b365',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3","modelName":"copyModelName160409790133601428","status":"creating","createdDateTime":"2020-10-30T22:45:02Z","lastUpdatedDateTime":"2020-10-30T22:45:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '5ce8dd4f-41a9-47e5-94e5-7b85cf1132a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3","modelName":"copyModelName160409790133601428","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:45:02Z","lastUpdatedDateTime":"2020-10-30T22:45:05Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '4607854e-91f4-4e3c-90e8-f2f04517b23c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"22a3f5f9-827b-428c-9195-5b277a1855ad","accessToken":"accessToken","expirationDateTimeTicks":1604184308}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/22a3f5f9-827b-428c-9195-5b277a1855ad',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '14d18113-20a8-40d2-a310-2f3a289af08d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"22a3f5f9-827b-428c-9195-5b277a1855ad","accessToken":"accessToken","expirationDateTimeTicks":1604184308}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3/copyresults/4fa84a47-033b-4ded-a162-de60c5ea63fd',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '9e4f7b6a-20e5-42d9-b2ea-45312883978d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3/copyResults/4fa84a47-033b-4ded-a162-de60c5ea63fd')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:08Z","lastUpdatedDateTime":"2020-10-30T22:45:08Z","copyResult":{"modelId":"22a3f5f9-827b-428c-9195-5b277a1855ad"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'e9ab6fec-7683-4c77-b301-23839a78d5fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3/copyResults/4fa84a47-033b-4ded-a162-de60c5ea63fd')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:08Z","lastUpdatedDateTime":"2020-10-30T22:45:08Z","copyResult":{"modelId":"22a3f5f9-827b-428c-9195-5b277a1855ad"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '23dd4bf9-84a3-4471-be65-8433c411e460',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3/copyResults/4fa84a47-033b-4ded-a162-de60c5ea63fd')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:08Z","lastUpdatedDateTime":"2020-10-30T22:45:08Z","copyResult":{"modelId":"22a3f5f9-827b-428c-9195-5b277a1855ad"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '881b6b8d-efba-4b8c-bb64-5aeab07bcea6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3/copyResults/4fa84a47-033b-4ded-a162-de60c5ea63fd')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:45:08Z","lastUpdatedDateTime":"2020-10-30T22:45:08Z","copyResult":{"modelId":"22a3f5f9-827b-428c-9195-5b277a1855ad"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '303fb77b-8ebe-4eb7-9481-cf489487d04e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/4a22bd9e-d17c-49a9-a3e1-48a0a386f6a3/copyResults/4fa84a47-033b-4ded-a162-de60c5ea63fd')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-10-30T22:45:21.9934066Z","lastUpdatedDateTime":"2020-10-30T22:45:21.9934069Z","copyResult":{"modelId":"22a3f5f9-827b-428c-9195-5b277a1855ad"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '66d64cf4-280c-4ae4-b598-e4739b923018',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/22a3f5f9-827b-428c-9195-5b277a1855ad')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"22a3f5f9-827b-428c-9195-5b277a1855ad","modelName":"copyModelName160409790133601428","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:45:02Z","lastUpdatedDateTime":"2020-10-30T22:45:05Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '9d107fed-44c7-4f37-98b0-9d188c3ccba6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:45:24 GMT'
]);
