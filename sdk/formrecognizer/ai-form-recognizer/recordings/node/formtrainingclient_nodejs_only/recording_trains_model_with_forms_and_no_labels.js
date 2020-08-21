let nock = require('nock');

module.exports.hash = "818012857dc5ae4f5e9c6d481ac01703";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '1fef94b4-4972-4ad4-a2d6-535b7c3d5790',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:46:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"10a011c6-f496-448b-b7b1-d470daeeacd7","status":"creating","createdDateTime":"2020-08-18T18:46:55Z","lastUpdatedDateTime":"2020-08-18T18:46:55Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'c67440e6-13df-4e81-bfa3-ac9f5a70dc3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:46:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"10a011c6-f496-448b-b7b1-d470daeeacd7","status":"creating","createdDateTime":"2020-08-18T18:46:55Z","lastUpdatedDateTime":"2020-08-18T18:46:55Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '5abfb29c-c3e6-4c2e-8c26-e4def244c51b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:46:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"10a011c6-f496-448b-b7b1-d470daeeacd7","status":"creating","createdDateTime":"2020-08-18T18:46:55Z","lastUpdatedDateTime":"2020-08-18T18:46:55Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'e376b1f7-ef68-4f80-b8c8-5fc8073e339e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/10a011c6-f496-448b-b7b1-d470daeeacd7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"10a011c6-f496-448b-b7b1-d470daeeacd7","status":"ready","createdDateTime":"2020-08-18T18:46:55Z","lastUpdatedDateTime":"2020-08-18T18:47:04Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '7c71db4b-4d2a-4f12-8a83-679c1bcb54bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:05 GMT'
]);
