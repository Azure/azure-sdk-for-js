let nock = require('nock');

module.exports.hash = "bb482db3fb10d0ee44e322df4f19ed76";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/80d87355-5d05-40b3-9dc3-1a7c384ff710',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'bc1f9d21-38e8-4db7-b38c-43615e93ffe2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 19:59:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/80d87355-5d05-40b3-9dc3-1a7c384ff710')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"80d87355-5d05-40b3-9dc3-1a7c384ff710","status":"creating","createdDateTime":"2020-05-02T19:59:54Z","lastUpdatedDateTime":"2020-05-02T19:59:54Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'c20e75f8-57bb-4fd5-8e30-4aa68a56512c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 19:59:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/80d87355-5d05-40b3-9dc3-1a7c384ff710')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"80d87355-5d05-40b3-9dc3-1a7c384ff710","status":"creating","createdDateTime":"2020-05-02T19:59:54Z","lastUpdatedDateTime":"2020-05-02T19:59:54Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  'b9febf6c-4c1f-482c-ad6c-ba416f9b2201',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 19:59:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/80d87355-5d05-40b3-9dc3-1a7c384ff710')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"80d87355-5d05-40b3-9dc3-1a7c384ff710","status":"ready","createdDateTime":"2020-05-02T19:59:54Z","lastUpdatedDateTime":"2020-05-02T20:00:02Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Address:","Company Name:","Company Phone:","Dated As:","Email:","Hero Limited","Name:","Phone:","Phone:","Purchase Order","Purchase Order","Purchase Order #:","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '459fecc5-4dd2-479f-a736-d895d339aff1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:04 GMT'
]);
