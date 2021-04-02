let nock = require('nock');

module.exports.hash = "fed99f4aa1017bd41facfd2949aa4eb9";

module.exports.testInfo = {"uniqueName":{"1":"modelName160588237204706422"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName160588237204706422"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  '01769941-db44-468a-b993-931b4f94cd97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"02c173df-4900-4259-a8f9-c049ff2a8d81","modelName":"modelName160588237204706422","status":"creating","createdDateTime":"2020-11-20T14:26:12Z","lastUpdatedDateTime":"2020-11-20T14:26:12Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '9a896549-0fe0-4d10-be81-36bdd76813c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"02c173df-4900-4259-a8f9-c049ff2a8d81","modelName":"modelName160588237204706422","status":"creating","createdDateTime":"2020-11-20T14:26:12Z","lastUpdatedDateTime":"2020-11-20T14:26:12Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '4536e684-d65c-45d0-b955-d2e12f4ffccb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"02c173df-4900-4259-a8f9-c049ff2a8d81","modelName":"modelName160588237204706422","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T14:26:12Z","lastUpdatedDateTime":"2020-11-20T14:26:14Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Content-Length',
  '1260',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '22147a49-f4dc-46b4-895d-b5b363b36cb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:17 GMT'
]);
