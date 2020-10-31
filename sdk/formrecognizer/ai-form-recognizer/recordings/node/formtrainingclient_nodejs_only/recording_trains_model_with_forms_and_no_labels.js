let nock = require('nock');

module.exports.hash = "eaf1a266ec1caaad70202ea93230d56f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/ad3e6214-d225-40db-9740-aafae0578426',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '39a044ee-4553-4825-8ee1-0184b83788e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:07:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ad3e6214-d225-40db-9740-aafae0578426')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ad3e6214-d225-40db-9740-aafae0578426","status":"creating","createdDateTime":"2020-10-21T18:07:46Z","lastUpdatedDateTime":"2020-10-21T18:07:46Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '35c091d6-1ef2-4ec8-bc25-633e7fdd855d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:07:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ad3e6214-d225-40db-9740-aafae0578426')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ad3e6214-d225-40db-9740-aafae0578426","status":"creating","createdDateTime":"2020-10-21T18:07:46Z","lastUpdatedDateTime":"2020-10-21T18:07:46Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '309599cf-78a5-4c75-93e5-21a5882c1619',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:07:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ad3e6214-d225-40db-9740-aafae0578426')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ad3e6214-d225-40db-9740-aafae0578426","status":"creating","createdDateTime":"2020-10-21T18:07:46Z","lastUpdatedDateTime":"2020-10-21T18:07:46Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'aeafe3cf-6950-431e-a3a9-7d192ff10177',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:07:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ad3e6214-d225-40db-9740-aafae0578426')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ad3e6214-d225-40db-9740-aafae0578426","status":"creating","createdDateTime":"2020-10-21T18:07:46Z","lastUpdatedDateTime":"2020-10-21T18:07:46Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'fa493864-f67a-47fb-a453-4e26a03af313',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:07:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ad3e6214-d225-40db-9740-aafae0578426')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ad3e6214-d225-40db-9740-aafae0578426","status":"ready","createdDateTime":"2020-10-21T18:07:46Z","lastUpdatedDateTime":"2020-10-21T18:07:59Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '8f928b4b-dbce-4d43-9a32-5c50e6556cb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:01 GMT'
]);
