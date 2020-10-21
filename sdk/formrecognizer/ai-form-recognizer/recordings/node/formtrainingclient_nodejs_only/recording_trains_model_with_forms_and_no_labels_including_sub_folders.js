let nock = require('nock');

module.exports.hash = "b37ee9ad7e33d12a93d7594c362fb7cc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/6cbed01d-0235-4a16-9842-aea3706bbd9a',
  'x-envoy-upstream-service-time',
  '1318',
  'apim-request-id',
  '371d5cd2-ccb4-42dd-87bb-db56678168c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6cbed01d-0235-4a16-9842-aea3706bbd9a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6cbed01d-0235-4a16-9842-aea3706bbd9a","status":"creating","createdDateTime":"2020-10-21T18:08:08Z","lastUpdatedDateTime":"2020-10-21T18:08:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'd525a214-45b9-4420-b048-2acf79ca0ee9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6cbed01d-0235-4a16-9842-aea3706bbd9a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6cbed01d-0235-4a16-9842-aea3706bbd9a","status":"creating","createdDateTime":"2020-10-21T18:08:08Z","lastUpdatedDateTime":"2020-10-21T18:08:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '76126f51-4253-440f-9f98-496a59f8399f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6cbed01d-0235-4a16-9842-aea3706bbd9a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6cbed01d-0235-4a16-9842-aea3706bbd9a","status":"creating","createdDateTime":"2020-10-21T18:08:08Z","lastUpdatedDateTime":"2020-10-21T18:08:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'e3e65258-c27d-4762-87b1-fe0a6617d106',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6cbed01d-0235-4a16-9842-aea3706bbd9a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6cbed01d-0235-4a16-9842-aea3706bbd9a","status":"creating","createdDateTime":"2020-10-21T18:08:08Z","lastUpdatedDateTime":"2020-10-21T18:08:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '43f419d0-f102-4c9d-aee7-cbab9ad58842',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6cbed01d-0235-4a16-9842-aea3706bbd9a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6cbed01d-0235-4a16-9842-aea3706bbd9a","status":"creating","createdDateTime":"2020-10-21T18:08:08Z","lastUpdatedDateTime":"2020-10-21T18:08:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '9ade2558-8e1e-4715-baf2-8da877b63189',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6cbed01d-0235-4a16-9842-aea3706bbd9a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6cbed01d-0235-4a16-9842-aea3706bbd9a","status":"ready","createdDateTime":"2020-10-21T18:08:08Z","lastUpdatedDateTime":"2020-10-21T18:08:25Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'cd3af4ac-db24-4b02-a148-d8e24ed579eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:30 GMT'
]);
