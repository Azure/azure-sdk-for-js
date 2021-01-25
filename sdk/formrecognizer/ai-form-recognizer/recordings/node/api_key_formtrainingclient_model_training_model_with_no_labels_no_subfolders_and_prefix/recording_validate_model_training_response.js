let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"5":"modelName160434068927000634"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160434068927000634"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/3b91c785-a219-4848-bdf7-4bbc3842c364',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '4b1f9ce9-09bd-4704-8b8a-8198d49fc595',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/3b91c785-a219-4848-bdf7-4bbc3842c364')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3b91c785-a219-4848-bdf7-4bbc3842c364","modelName":"modelName160434068927000634","status":"creating","createdDateTime":"2020-11-02T18:11:29Z","lastUpdatedDateTime":"2020-11-02T18:11:29Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '3cf8f419-ad7a-4333-814e-a2d20df34be9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/3b91c785-a219-4848-bdf7-4bbc3842c364')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3b91c785-a219-4848-bdf7-4bbc3842c364","modelName":"modelName160434068927000634","status":"creating","createdDateTime":"2020-11-02T18:11:29Z","lastUpdatedDateTime":"2020-11-02T18:11:29Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'd4dcf07a-cc5c-48dd-8b3c-93a6bb2c7900',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/3b91c785-a219-4848-bdf7-4bbc3842c364')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3b91c785-a219-4848-bdf7-4bbc3842c364","modelName":"modelName160434068927000634","status":"creating","createdDateTime":"2020-11-02T18:11:29Z","lastUpdatedDateTime":"2020-11-02T18:11:29Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'aa928873-610f-4811-9ef9-7e932c81fa87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/3b91c785-a219-4848-bdf7-4bbc3842c364')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3b91c785-a219-4848-bdf7-4bbc3842c364","modelName":"modelName160434068927000634","status":"creating","createdDateTime":"2020-11-02T18:11:29Z","lastUpdatedDateTime":"2020-11-02T18:11:29Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'ee152389-4a08-48b6-89b1-ed17fd3a68c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/3b91c785-a219-4848-bdf7-4bbc3842c364')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3b91c785-a219-4848-bdf7-4bbc3842c364","status":"ready","createdDateTime":"2020-11-02T18:11:29Z","lastUpdatedDateTime":"2020-11-02T18:11:44Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '968913ee-54a8-47f3-9bdb-b4b4d849a134',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:44 GMT'
]);
