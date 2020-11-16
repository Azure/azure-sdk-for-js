let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName160434036687802468"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
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
  'cd4f7321-4149-4db0-9e34-d20fd3579b00',
  'x-ms-ests-server',
  '2.1.11198.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApAcFEPdzjJEggoWR29BW0L0CyfMAQAAAI5BMtcOAAAA; expires=Wed, 02-Dec-2020 18:06:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 02 Nov 2020 18:06:06 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName160434036687802468"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '83c387cd-6c8b-4deb-a9db-d0cb909e26c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"2a8d180f-85aa-44f7-8682-ccd994a70640","modelName":"copyModelName160434036687802468","status":"creating","createdDateTime":"2020-11-02T18:06:08Z","lastUpdatedDateTime":"2020-11-02T18:06:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '6db8c409-3f2e-4691-9fa3-d1a235a02419',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"2a8d180f-85aa-44f7-8682-ccd994a70640","modelName":"copyModelName160434036687802468","status":"creating","createdDateTime":"2020-11-02T18:06:08Z","lastUpdatedDateTime":"2020-11-02T18:06:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '4a04b52f-31a1-4b27-a1dd-e12fbc64fd69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"2a8d180f-85aa-44f7-8682-ccd994a70640","modelName":"copyModelName160434036687802468","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-02T18:06:08Z","lastUpdatedDateTime":"2020-11-02T18:06:10Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '6c005a35-92bc-46de-bd51-6ee40c9f4c01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"79e8b945-eb3c-4898-9ab8-381f6ac9bcc0","accessToken":"accessToken","expirationDateTimeTicks":1604426774}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/79e8b945-eb3c-4898-9ab8-381f6ac9bcc0',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '52dfb8ed-d58e-46e8-9802-80664cc83df5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"79e8b945-eb3c-4898-9ab8-381f6ac9bcc0","accessToken":"accessToken","expirationDateTimeTicks":1604426774}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640/copyresults/3a0f170e-22fa-4e2a-aaf8-95a2eacff300',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '41b88a15-8f51-438c-ae1d-aa2e27027d90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640/copyResults/3a0f170e-22fa-4e2a-aaf8-95a2eacff300')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-02T18:06:14Z","lastUpdatedDateTime":"2020-11-02T18:06:14Z","copyResult":{"modelId":"79e8b945-eb3c-4898-9ab8-381f6ac9bcc0"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '4e8bf043-3654-4421-bdc6-f4a7fdedea8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640/copyResults/3a0f170e-22fa-4e2a-aaf8-95a2eacff300')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-02T18:06:14Z","lastUpdatedDateTime":"2020-11-02T18:06:14Z","copyResult":{"modelId":"79e8b945-eb3c-4898-9ab8-381f6ac9bcc0"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '7502784e-2154-4508-8100-9275180cc093',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640/copyResults/3a0f170e-22fa-4e2a-aaf8-95a2eacff300')
  .reply(200, {"status":"running","createdDateTime":"2020-11-02T18:06:19.8357769Z","lastUpdatedDateTime":"2020-11-02T18:06:19.8357771Z","copyResult":{"modelId":"79e8b945-eb3c-4898-9ab8-381f6ac9bcc0"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '300b454c-80e2-4197-86b3-44eeb3b7c3dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2a8d180f-85aa-44f7-8682-ccd994a70640/copyResults/3a0f170e-22fa-4e2a-aaf8-95a2eacff300')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-02T18:06:20.1466793Z","lastUpdatedDateTime":"2020-11-02T18:06:20.1466797Z","copyResult":{"modelId":"79e8b945-eb3c-4898-9ab8-381f6ac9bcc0"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '0a65ebad-ed65-4a86-b36a-0bddbd6e7f5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/79e8b945-eb3c-4898-9ab8-381f6ac9bcc0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"79e8b945-eb3c-4898-9ab8-381f6ac9bcc0","modelName":"copyModelName160434036687802468","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-02T18:06:08Z","lastUpdatedDateTime":"2020-11-02T18:06:10Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'a9c41c58-4836-4003-88aa-ad127acc84a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:25 GMT'
]);
