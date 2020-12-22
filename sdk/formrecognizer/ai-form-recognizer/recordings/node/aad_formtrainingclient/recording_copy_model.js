let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName160591248131209571"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '1bae591e-46dd-4fb6-a3fe-230a08833000',
  'x-ms-ests-server',
  '2.1.11251.20 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Auvi4vWDWwxNu7cSNT9g_-DGLH8mAQAAAKE-StcOAAAA; expires=Sun, 20-Dec-2020 22:48:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 22:48:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName160591248131209571"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '8c69f653-0f00-41be-9dcc-20d75c161b2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4","modelName":"copyModelName160591248131209571","status":"creating","createdDateTime":"2020-11-20T22:48:01Z","lastUpdatedDateTime":"2020-11-20T22:48:01Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'f83399ea-ec5f-4d06-99c7-8c32854f8783',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4","modelName":"copyModelName160591248131209571","status":"creating","createdDateTime":"2020-11-20T22:48:01Z","lastUpdatedDateTime":"2020-11-20T22:48:01Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'd309a315-ae55-48b8-99a2-dd4d960c38f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4","modelName":"copyModelName160591248131209571","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:48:01Z","lastUpdatedDateTime":"2020-11-20T22:48:04Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '0321dab9-1092-466c-8a66-25d5f3919cc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models/copyAuthorization')
  .reply(201, {"modelId":"cb4372f3-7688-42cc-9af2-9b7f6c1e5b0b","accessToken":"accessToken","expirationDateTimeTicks":1605998887}, [
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/cb4372f3-7688-42cc-9af2-9b7f6c1e5b0b',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  'f2e94ffa-8eee-4987-b4c4-b03817b5c079',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models/bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"cb4372f3-7688-42cc-9af2-9b7f6c1e5b0b","accessToken":"accessToken","expirationDateTimeTicks":1605998887}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4/copyresults/59f603ae-b0da-4ecd-8a6e-542bdf505437',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '688a6618-4402-40c6-917b-ba4d0a358d3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4/copyResults/59f603ae-b0da-4ecd-8a6e-542bdf505437')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-11-20T22:48:08Z","lastUpdatedDateTime":"2020-11-20T22:48:08Z","copyResult":{"modelId":"cb4372f3-7688-42cc-9af2-9b7f6c1e5b0b"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '308b60da-79b0-4ffa-a9e4-c96e0d38808e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4/copyResults/59f603ae-b0da-4ecd-8a6e-542bdf505437')
  .reply(200, {"status":"running","createdDateTime":"2020-11-20T22:48:08.4376109Z","lastUpdatedDateTime":"2020-11-20T22:48:08.4376111Z","copyResult":{"modelId":"cb4372f3-7688-42cc-9af2-9b7f6c1e5b0b"}}, [
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '0f0d134c-f5f3-459f-9527-8dec3bd9f15b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb61c2ce-27e8-42d3-bcdd-510a7d2c7ab4/copyResults/59f603ae-b0da-4ecd-8a6e-542bdf505437')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-11-20T22:48:08.7314346Z","lastUpdatedDateTime":"2020-11-20T22:48:08.7314348Z","copyResult":{"modelId":"cb4372f3-7688-42cc-9af2-9b7f6c1e5b0b"}}, [
  'Content-Length',
  '188',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '8307347e-bc3a-42f3-8475-dc54e638db33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/cb4372f3-7688-42cc-9af2-9b7f6c1e5b0b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"cb4372f3-7688-42cc-9af2-9b7f6c1e5b0b","modelName":"copyModelName160591248131209571","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:48:01Z","lastUpdatedDateTime":"2020-11-20T22:48:04Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '45e156e5-26a0-4232-bfe7-e3b085347995',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:13 GMT'
]);
