let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName162078251633502536"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName162078251633502536"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/0c3590f7-7a92-434f-8ac1-390922815520',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  '4a54be48-c6c9-4c23-a490-79dec8588435',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/0c3590f7-7a92-434f-8ac1-390922815520')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0c3590f7-7a92-434f-8ac1-390922815520","modelName":"copyModelName162078251633502536","status":"creating","createdDateTime":"2021-05-12T01:21:56Z","lastUpdatedDateTime":"2021-05-12T01:21:56Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  'd05824d4-1f8a-4124-967c-6e10c1b55619',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/0c3590f7-7a92-434f-8ac1-390922815520')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0c3590f7-7a92-434f-8ac1-390922815520","modelName":"copyModelName162078251633502536","status":"creating","createdDateTime":"2021-05-12T01:21:56Z","lastUpdatedDateTime":"2021-05-12T01:21:56Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'a334e642-380d-4859-8a67-65190064f901',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/0c3590f7-7a92-434f-8ac1-390922815520')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0c3590f7-7a92-434f-8ac1-390922815520","modelName":"copyModelName162078251633502536","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-12T01:21:56Z","lastUpdatedDateTime":"2021-05-12T01:21:59Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'ee84ca76-99f5-4b6e-b731-8c00e70c845a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"eda7c7f7-4884-4cea-9042-4ba8409c3dfc","accessToken":"accessToken","expirationDateTimeTicks":1620868922}, [
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/eda7c7f7-4884-4cea-9042-4ba8409c3dfc',
  'x-envoy-upstream-service-time',
  '209',
  'apim-request-id',
  '0b91ff83-3141-49b0-896d-83f2cf354acb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/0c3590f7-7a92-434f-8ac1-390922815520/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"eda7c7f7-4884-4cea-9042-4ba8409c3dfc","accessToken":"accessToken","expirationDateTimeTicks":1620868922}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/0c3590f7-7a92-434f-8ac1-390922815520/copyresults/c38ee69c-56a2-4849-b42f-c095f0084374',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'b4d36525-4001-4669-9934-b6bcf511ba66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/0c3590f7-7a92-434f-8ac1-390922815520/copyResults/c38ee69c-56a2-4849-b42f-c095f0084374')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-12T01:22:02Z","lastUpdatedDateTime":"2021-05-12T01:22:02Z","copyResult":{"modelId":"eda7c7f7-4884-4cea-9042-4ba8409c3dfc"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  'e539382c-02dd-4080-9e66-25b2037532fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/0c3590f7-7a92-434f-8ac1-390922815520/copyResults/c38ee69c-56a2-4849-b42f-c095f0084374')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-12T01:22:02Z","lastUpdatedDateTime":"2021-05-12T01:22:02Z","copyResult":{"modelId":"eda7c7f7-4884-4cea-9042-4ba8409c3dfc"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '8f6f6dfd-9eb7-42c0-9168-8584b34137a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/0c3590f7-7a92-434f-8ac1-390922815520/copyResults/c38ee69c-56a2-4849-b42f-c095f0084374')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-12T01:22:05.829054Z","lastUpdatedDateTime":"2021-05-12T01:22:05.8290542Z","copyResult":{"modelId":"eda7c7f7-4884-4cea-9042-4ba8409c3dfc"}}, [
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  'e16c4c06-7fcf-45d1-8376-ddee1b5511b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/eda7c7f7-4884-4cea-9042-4ba8409c3dfc')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"eda7c7f7-4884-4cea-9042-4ba8409c3dfc","modelName":"copyModelName162078251633502536","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-12T01:21:56Z","lastUpdatedDateTime":"2021-05-12T01:21:59Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'deaa9136-3915-44df-9476-3f954c472f68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:07 GMT'
]);
