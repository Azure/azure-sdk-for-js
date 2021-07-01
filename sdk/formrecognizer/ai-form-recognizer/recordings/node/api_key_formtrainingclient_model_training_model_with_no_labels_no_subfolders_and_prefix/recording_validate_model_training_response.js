let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"5":"modelName162196599586006259"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName162196599586006259"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/f053fea9-e6e3-4758-8213-23a10bfe53c0',
  'x-envoy-upstream-service-time',
  '211',
  'apim-request-id',
  'eec29632-b713-46a8-a6dc-9421bfde7918',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/f053fea9-e6e3-4758-8213-23a10bfe53c0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f053fea9-e6e3-4758-8213-23a10bfe53c0","modelName":"modelName162196599586006259","status":"creating","createdDateTime":"2021-05-25T18:06:36Z","lastUpdatedDateTime":"2021-05-25T18:06:36Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '610dfe66-ffcf-4365-9f64-0a6fa27f61d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/f053fea9-e6e3-4758-8213-23a10bfe53c0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f053fea9-e6e3-4758-8213-23a10bfe53c0","modelName":"modelName162196599586006259","status":"creating","createdDateTime":"2021-05-25T18:06:36Z","lastUpdatedDateTime":"2021-05-25T18:06:36Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'dd81cf1f-6706-4642-960f-eb9e4f48c06b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/f053fea9-e6e3-4758-8213-23a10bfe53c0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f053fea9-e6e3-4758-8213-23a10bfe53c0","modelName":"modelName162196599586006259","status":"creating","createdDateTime":"2021-05-25T18:06:36Z","lastUpdatedDateTime":"2021-05-25T18:06:36Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'fe1921c2-d5eb-498b-a825-e770fc3cf714',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/f053fea9-e6e3-4758-8213-23a10bfe53c0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f053fea9-e6e3-4758-8213-23a10bfe53c0","modelName":"modelName162196599586006259","status":"creating","createdDateTime":"2021-05-25T18:06:36Z","lastUpdatedDateTime":"2021-05-25T18:06:36Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'd18f0d3f-6410-4ae3-9fa2-7b2ec7f02599',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/f053fea9-e6e3-4758-8213-23a10bfe53c0')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"f053fea9-e6e3-4758-8213-23a10bfe53c0","modelName":"modelName162196599586006259","status":"ready","createdDateTime":"2021-05-25T18:06:36Z","lastUpdatedDateTime":"2021-05-25T18:06:49Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '31969c14-7eac-4b3a-a2f9-741131ae7854',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:51 GMT'
]);
