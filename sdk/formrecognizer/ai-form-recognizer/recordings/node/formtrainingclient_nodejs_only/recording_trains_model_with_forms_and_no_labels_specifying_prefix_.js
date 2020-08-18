let nock = require('nock');

module.exports.hash = "d413c42d033d850bd5e76d85235428b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"prefix":"Form_"},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/1fec2197-3f6f-4570-8e3a-d6470a36b314',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'd1d89a28-43d4-4100-9c15-38b58ad11fb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/1fec2197-3f6f-4570-8e3a-d6470a36b314')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1fec2197-3f6f-4570-8e3a-d6470a36b314","status":"creating","createdDateTime":"2020-08-05T23:29:40Z","lastUpdatedDateTime":"2020-08-05T23:29:40Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '37173a87-2510-4d38-80b1-13f9c7cd52a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/1fec2197-3f6f-4570-8e3a-d6470a36b314')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1fec2197-3f6f-4570-8e3a-d6470a36b314","status":"creating","createdDateTime":"2020-08-05T23:29:40Z","lastUpdatedDateTime":"2020-08-05T23:29:40Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'c42037a1-0b8a-4b9e-8b94-294d6973cff0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/1fec2197-3f6f-4570-8e3a-d6470a36b314')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1fec2197-3f6f-4570-8e3a-d6470a36b314","status":"creating","createdDateTime":"2020-08-05T23:29:40Z","lastUpdatedDateTime":"2020-08-05T23:29:40Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '6e7e3211-cddd-4343-9e09-f12989ae4479',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/1fec2197-3f6f-4570-8e3a-d6470a36b314')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1fec2197-3f6f-4570-8e3a-d6470a36b314","status":"ready","createdDateTime":"2020-08-05T23:29:40Z","lastUpdatedDateTime":"2020-08-05T23:29:50Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '9424531f-402b-4968-98f0-72d4c6703a56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:49 GMT'
]);
