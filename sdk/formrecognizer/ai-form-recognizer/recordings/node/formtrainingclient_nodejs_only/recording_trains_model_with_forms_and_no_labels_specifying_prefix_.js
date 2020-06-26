let nock = require('nock');

module.exports.hash = "4064d861ee46e22e616bc19919f56523";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"prefix":"Form_"},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/11748e70-c006-45f8-8681-772c1cecbafb',
  'x-envoy-upstream-service-time',
  '605',
  'apim-request-id',
  '91821134-2d57-4206-ad08-ee11688f56c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:48 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/11748e70-c006-45f8-8681-772c1cecbafb')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"11748e70-c006-45f8-8681-772c1cecbafb","status":"creating","createdDateTime":"2020-06-26T21:23:49Z","lastUpdatedDateTime":"2020-06-26T21:23:49Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'f4ddc3ee-535b-4c4f-9b53-89ccae917582',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:49 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/11748e70-c006-45f8-8681-772c1cecbafb')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"11748e70-c006-45f8-8681-772c1cecbafb","status":"creating","createdDateTime":"2020-06-26T21:23:49Z","lastUpdatedDateTime":"2020-06-26T21:23:49Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '685da4df-08d7-48e0-bbe3-b60b5f67e040',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:59 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/11748e70-c006-45f8-8681-772c1cecbafb')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"11748e70-c006-45f8-8681-772c1cecbafb","status":"ready","createdDateTime":"2020-06-26T21:23:49Z","lastUpdatedDateTime":"2020-06-26T21:24:00Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5055',
  'apim-request-id',
  '76214559-088b-43b1-a015-5a71f97212d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:24:10 GMT',
  'Connection',
  'close'
]);
