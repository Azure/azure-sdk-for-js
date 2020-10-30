let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"2":"modelName160409676352304685"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName160409676352304685"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '4f6926ad-8ba8-46b0-9b2a-397878471239',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b","modelName":"modelName160409676352304685","status":"creating","createdDateTime":"2020-10-30T22:26:03Z","lastUpdatedDateTime":"2020-10-30T22:26:03Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '93d56bc9-f050-4550-80ab-13a09f9d1c57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b","modelName":"modelName160409676352304685","status":"creating","createdDateTime":"2020-10-30T22:26:03Z","lastUpdatedDateTime":"2020-10-30T22:26:03Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'f5141731-404b-4f97-b7ee-d69e35bffa93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b","modelName":"modelName160409676352304685","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:26:03Z","lastUpdatedDateTime":"2020-10-30T22:26:05Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'a90c1f30-429f-46d8-80ea-af78ca43990b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:09 GMT'
]);
