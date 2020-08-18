let nock = require('nock');

module.exports.hash = "f8da922b296a2254fdc694985a82b25b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/13fbcb8e-6aa2-46bb-936a-33fee97c4d04',
  'x-envoy-upstream-service-time',
  '5240',
  'apim-request-id',
  '5b25e5ac-18ee-4c23-b418-5c7753e4e379',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/13fbcb8e-6aa2-46bb-936a-33fee97c4d04')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13fbcb8e-6aa2-46bb-936a-33fee97c4d04","status":"creating","createdDateTime":"2020-08-05T23:29:24Z","lastUpdatedDateTime":"2020-08-05T23:29:24Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'a5ac1f0c-9d5f-44e3-a388-fc6350f3089b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/13fbcb8e-6aa2-46bb-936a-33fee97c4d04')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13fbcb8e-6aa2-46bb-936a-33fee97c4d04","status":"creating","createdDateTime":"2020-08-05T23:29:24Z","lastUpdatedDateTime":"2020-08-05T23:29:24Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '71ac4690-0352-47e3-9cc2-984770355928',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/13fbcb8e-6aa2-46bb-936a-33fee97c4d04')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13fbcb8e-6aa2-46bb-936a-33fee97c4d04","status":"creating","createdDateTime":"2020-08-05T23:29:24Z","lastUpdatedDateTime":"2020-08-05T23:29:24Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'fd14774d-62ac-4571-b572-89aa70f18767',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/13fbcb8e-6aa2-46bb-936a-33fee97c4d04')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13fbcb8e-6aa2-46bb-936a-33fee97c4d04","status":"ready","createdDateTime":"2020-08-05T23:29:24Z","lastUpdatedDateTime":"2020-08-05T23:29:39Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'e93e61e6-8632-49a0-b964-66d8d07d898f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:39 GMT'
]);
