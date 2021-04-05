let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"2":"modelName161714587002008995"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName161714587002008995"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/4c98fec3-1a50-4643-ada6-c0abf3a2f2d1',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  'db30b223-b0d7-425b-baf5-e63bbe79ff20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4c98fec3-1a50-4643-ada6-c0abf3a2f2d1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4c98fec3-1a50-4643-ada6-c0abf3a2f2d1","modelName":"modelName161714587002008995","status":"creating","createdDateTime":"2021-03-30T23:11:10Z","lastUpdatedDateTime":"2021-03-30T23:11:10Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '7fc3d482-27f9-44c9-9bb7-69bc0541bdc4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4c98fec3-1a50-4643-ada6-c0abf3a2f2d1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4c98fec3-1a50-4643-ada6-c0abf3a2f2d1","modelName":"modelName161714587002008995","status":"creating","createdDateTime":"2021-03-30T23:11:10Z","lastUpdatedDateTime":"2021-03-30T23:11:10Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'f7f0f245-b949-44f8-84d8-687bf66b9da5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4c98fec3-1a50-4643-ada6-c0abf3a2f2d1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4c98fec3-1a50-4643-ada6-c0abf3a2f2d1","modelName":"modelName161714587002008995","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-30T23:11:10Z","lastUpdatedDateTime":"2021-03-30T23:11:13Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1284',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'e0c53367-b30e-450f-b7e2-5649faf7ae84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:15 GMT'
]);
