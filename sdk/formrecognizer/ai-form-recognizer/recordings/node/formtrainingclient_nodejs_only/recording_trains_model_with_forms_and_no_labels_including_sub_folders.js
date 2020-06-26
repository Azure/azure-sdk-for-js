let nock = require('nock');

module.exports.hash = "58fbaa91b6fba6809a20a30c720cc589";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/f2e54f61-06a6-4159-a378-5a6ee061dbd6',
  'x-envoy-upstream-service-time',
  '529',
  'apim-request-id',
  '814c032a-79f1-42e6-8674-2153a113a2b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:37 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/f2e54f61-06a6-4159-a378-5a6ee061dbd6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f2e54f61-06a6-4159-a378-5a6ee061dbd6","status":"creating","createdDateTime":"2020-06-26T21:23:38Z","lastUpdatedDateTime":"2020-06-26T21:23:38Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'c59de33f-71f4-46c5-89f6-1660f33d8501',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:43 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/f2e54f61-06a6-4159-a378-5a6ee061dbd6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f2e54f61-06a6-4159-a378-5a6ee061dbd6","status":"ready","createdDateTime":"2020-06-26T21:23:38Z","lastUpdatedDateTime":"2020-06-26T21:23:47Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '46d2c27c-954e-4cdf-b014-2e963e640e63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:48 GMT',
  'Connection',
  'close'
]);
