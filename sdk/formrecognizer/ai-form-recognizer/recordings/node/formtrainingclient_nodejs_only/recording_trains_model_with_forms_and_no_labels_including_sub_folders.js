let nock = require('nock');

module.exports.hash = "60455a0a4014aea1a6797571858e33c5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/9fc504f6-293c-4c40-a581-e41ae22b40e5',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'bdcc413f-5fe6-46e7-a30f-1fcf0aaf9809',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/9fc504f6-293c-4c40-a581-e41ae22b40e5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"9fc504f6-293c-4c40-a581-e41ae22b40e5","status":"creating","createdDateTime":"2020-05-02T20:00:15Z","lastUpdatedDateTime":"2020-05-02T20:00:15Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'f31df9fc-7803-41d5-b16f-6e6f2b47df0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/9fc504f6-293c-4c40-a581-e41ae22b40e5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"9fc504f6-293c-4c40-a581-e41ae22b40e5","status":"creating","createdDateTime":"2020-05-02T20:00:15Z","lastUpdatedDateTime":"2020-05-02T20:00:15Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '26b71488-cd5e-44de-847b-fb3c17f3cce4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/9fc504f6-293c-4c40-a581-e41ae22b40e5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"9fc504f6-293c-4c40-a581-e41ae22b40e5","status":"ready","createdDateTime":"2020-05-02T20:00:15Z","lastUpdatedDateTime":"2020-05-02T20:00:24Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Address:","Company Name:","Company Phone:","Dated As:","Email:","Hero Limited","Name:","Phone:","Phone:","Purchase Order","Purchase Order","Purchase Order #:","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  'd1a50997-ef3a-4a07-8e53-491354d20686',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:25 GMT'
]);
