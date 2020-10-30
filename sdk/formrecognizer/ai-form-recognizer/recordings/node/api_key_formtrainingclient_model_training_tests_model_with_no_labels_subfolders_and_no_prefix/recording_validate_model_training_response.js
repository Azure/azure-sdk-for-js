let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"4":"modelName160409681376504051"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160409681376504051"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/80c13f16-6a24-4da5-bb0a-af2974dba817',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '57acb4d0-c90e-44c8-baf4-bc9db82f2416',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/80c13f16-6a24-4da5-bb0a-af2974dba817')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"80c13f16-6a24-4da5-bb0a-af2974dba817","modelName":"modelName160409681376504051","status":"creating","createdDateTime":"2020-10-30T22:26:54Z","lastUpdatedDateTime":"2020-10-30T22:26:54Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '001a4cc1-6750-466d-8bb2-690a10be0d3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/80c13f16-6a24-4da5-bb0a-af2974dba817')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"80c13f16-6a24-4da5-bb0a-af2974dba817","modelName":"modelName160409681376504051","status":"creating","createdDateTime":"2020-10-30T22:26:54Z","lastUpdatedDateTime":"2020-10-30T22:26:54Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '830e3a0b-651d-4ca3-a5fe-2cd5b2e98e9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/80c13f16-6a24-4da5-bb0a-af2974dba817')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"80c13f16-6a24-4da5-bb0a-af2974dba817","modelName":"modelName160409681376504051","status":"creating","createdDateTime":"2020-10-30T22:26:54Z","lastUpdatedDateTime":"2020-10-30T22:26:54Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '2e103630-2c93-4f3e-8bed-f3f94cff7043',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/80c13f16-6a24-4da5-bb0a-af2974dba817')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"80c13f16-6a24-4da5-bb0a-af2974dba817","modelName":"modelName160409681376504051","status":"creating","createdDateTime":"2020-10-30T22:26:54Z","lastUpdatedDateTime":"2020-10-30T22:26:54Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '65ec1f08-5cc1-4014-b2c1-58a870d45161',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/80c13f16-6a24-4da5-bb0a-af2974dba817')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"80c13f16-6a24-4da5-bb0a-af2974dba817","status":"ready","createdDateTime":"2020-10-30T22:26:54Z","lastUpdatedDateTime":"2020-10-30T22:27:09Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '3f919d59-8b8e-4e0c-ae40-fe4fcb653a34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:09 GMT'
]);
