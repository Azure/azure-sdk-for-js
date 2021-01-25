let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"1":"modelName160434059444501956"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName160434059444501956"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/29f8f2c1-3491-401c-a1ff-817823b2c29f',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '46dc984b-9592-457a-85d3-415344c09960',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/29f8f2c1-3491-401c-a1ff-817823b2c29f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"29f8f2c1-3491-401c-a1ff-817823b2c29f","modelName":"modelName160434059444501956","status":"creating","createdDateTime":"2020-11-02T18:09:54Z","lastUpdatedDateTime":"2020-11-02T18:09:54Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '3585e81a-4610-459d-9843-7b121fe0bf47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/29f8f2c1-3491-401c-a1ff-817823b2c29f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"29f8f2c1-3491-401c-a1ff-817823b2c29f","modelName":"modelName160434059444501956","status":"creating","createdDateTime":"2020-11-02T18:09:54Z","lastUpdatedDateTime":"2020-11-02T18:09:54Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '922f5b04-1469-434d-bca7-a9a76dc48d54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/29f8f2c1-3491-401c-a1ff-817823b2c29f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"29f8f2c1-3491-401c-a1ff-817823b2c29f","modelName":"modelName160434059444501956","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-02T18:09:54Z","lastUpdatedDateTime":"2020-11-02T18:09:57Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '7d077b18-20a4-4584-a435-624bead22643',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:59 GMT'
]);
