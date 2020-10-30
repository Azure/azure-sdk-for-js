let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"4":"modelName160409730895605476"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160409730895605476"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/8bfe3706-55fd-48d4-b3cb-b63621e19e38',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '56abf174-a536-42fe-9636-6d417d2e823f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/8bfe3706-55fd-48d4-b3cb-b63621e19e38')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"8bfe3706-55fd-48d4-b3cb-b63621e19e38","modelName":"modelName160409730895605476","status":"creating","createdDateTime":"2020-10-30T22:35:09Z","lastUpdatedDateTime":"2020-10-30T22:35:09Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'ca54d846-4367-49f2-831f-41fdee491e9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/8bfe3706-55fd-48d4-b3cb-b63621e19e38')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"8bfe3706-55fd-48d4-b3cb-b63621e19e38","modelName":"modelName160409730895605476","status":"creating","createdDateTime":"2020-10-30T22:35:09Z","lastUpdatedDateTime":"2020-10-30T22:35:09Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '6c3bf97d-9dc2-4d7f-bd0d-facd095265a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/8bfe3706-55fd-48d4-b3cb-b63621e19e38')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"8bfe3706-55fd-48d4-b3cb-b63621e19e38","modelName":"modelName160409730895605476","status":"creating","createdDateTime":"2020-10-30T22:35:09Z","lastUpdatedDateTime":"2020-10-30T22:35:09Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'acc353f9-8aa1-4497-b5be-888d4060ac64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/8bfe3706-55fd-48d4-b3cb-b63621e19e38')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"8bfe3706-55fd-48d4-b3cb-b63621e19e38","modelName":"modelName160409730895605476","status":"creating","createdDateTime":"2020-10-30T22:35:09Z","lastUpdatedDateTime":"2020-10-30T22:35:09Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'e3b9e1d8-765f-4e79-861a-ef7aa6d6ad62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/8bfe3706-55fd-48d4-b3cb-b63621e19e38')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"8bfe3706-55fd-48d4-b3cb-b63621e19e38","status":"ready","createdDateTime":"2020-10-30T22:35:09Z","lastUpdatedDateTime":"2020-10-30T22:35:24Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '46241ede-5b5e-4f3f-8738-f2f6c5061c16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:35:24 GMT'
]);
