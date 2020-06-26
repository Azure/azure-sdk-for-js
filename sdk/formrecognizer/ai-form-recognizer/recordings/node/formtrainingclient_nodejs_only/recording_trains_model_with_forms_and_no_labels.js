let nock = require('nock');

module.exports.hash = "c8c4a8dfbb5b81bc885b80a28093ea14";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/97ffff4a-c78c-48e5-8a60-5644bf3f3bf0',
  'x-envoy-upstream-service-time',
  '514',
  'apim-request-id',
  '510d9a9c-b393-4fc8-b84d-ef01a6c3fd2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:09 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/97ffff4a-c78c-48e5-8a60-5644bf3f3bf0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"97ffff4a-c78c-48e5-8a60-5644bf3f3bf0","status":"creating","createdDateTime":"2020-06-26T21:23:09Z","lastUpdatedDateTime":"2020-06-26T21:23:09Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '9bf5ccc6-81fb-4bbf-96b1-c190e8728829',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:15 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/97ffff4a-c78c-48e5-8a60-5644bf3f3bf0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"97ffff4a-c78c-48e5-8a60-5644bf3f3bf0","status":"ready","createdDateTime":"2020-06-26T21:23:09Z","lastUpdatedDateTime":"2020-06-26T21:23:20Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '9366caf5-2149-4259-9a44-a61f5aa01d34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:21 GMT',
  'Connection',
  'close'
]);
