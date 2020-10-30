let nock = require('nock');

module.exports.hash = "16b575256f43f9e89d8134b1f3158d05";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"prefix":"Form_"},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/213d6ccc-27f5-4991-b2a9-287e8e4ab812',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '9b41ac88-66e4-4cdb-8d50-9055e0a412ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/213d6ccc-27f5-4991-b2a9-287e8e4ab812')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"213d6ccc-27f5-4991-b2a9-287e8e4ab812","status":"creating","createdDateTime":"2020-10-21T18:08:31Z","lastUpdatedDateTime":"2020-10-21T18:08:31Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'e4cdf3bc-7a74-4ed7-948f-261cc6293e0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/213d6ccc-27f5-4991-b2a9-287e8e4ab812')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"213d6ccc-27f5-4991-b2a9-287e8e4ab812","status":"creating","createdDateTime":"2020-10-21T18:08:31Z","lastUpdatedDateTime":"2020-10-21T18:08:31Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '6ad043af-33cd-4e44-867d-60e2260d237b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/213d6ccc-27f5-4991-b2a9-287e8e4ab812')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"213d6ccc-27f5-4991-b2a9-287e8e4ab812","status":"creating","createdDateTime":"2020-10-21T18:08:31Z","lastUpdatedDateTime":"2020-10-21T18:08:31Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '06f4caa1-bc36-482e-bc0c-e3d521ec2206',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/213d6ccc-27f5-4991-b2a9-287e8e4ab812')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"213d6ccc-27f5-4991-b2a9-287e8e4ab812","status":"creating","createdDateTime":"2020-10-21T18:08:31Z","lastUpdatedDateTime":"2020-10-21T18:08:31Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '1f09e318-8b57-4140-9398-6f30ea7908af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/213d6ccc-27f5-4991-b2a9-287e8e4ab812')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"213d6ccc-27f5-4991-b2a9-287e8e4ab812","status":"ready","createdDateTime":"2020-10-21T18:08:31Z","lastUpdatedDateTime":"2020-10-21T18:08:44Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '7b604999-5d91-440c-a8ce-d91f3d99f299',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:46 GMT'
]);
