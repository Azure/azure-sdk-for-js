let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"6":"modelName162078264910904039"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName162078264910904039"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  '61287671-e969-4c77-93fc-7519ce0788da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:24:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b","modelName":"modelName162078264910904039","status":"creating","createdDateTime":"2021-05-12T01:24:09Z","lastUpdatedDateTime":"2021-05-12T01:24:09Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'd63a277a-77c1-4764-b84c-35c85d9a5593',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:24:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b","modelName":"modelName162078264910904039","status":"creating","createdDateTime":"2021-05-12T01:24:09Z","lastUpdatedDateTime":"2021-05-12T01:24:09Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '485df43e-51c6-4ef6-b244-a9970af0c8e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:24:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b","modelName":"modelName162078264910904039","status":"creating","createdDateTime":"2021-05-12T01:24:09Z","lastUpdatedDateTime":"2021-05-12T01:24:09Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '4d7f3f32-c982-4951-beb3-6bf067f9c553',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:24:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b","modelName":"modelName162078264910904039","status":"creating","createdDateTime":"2021-05-12T01:24:09Z","lastUpdatedDateTime":"2021-05-12T01:24:09Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '81c7c6a4-1997-439e-bd82-c0e58a2a45a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:24:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b","modelName":"modelName162078264910904039","status":"ready","createdDateTime":"2021-05-12T01:24:09Z","lastUpdatedDateTime":"2021-05-12T01:24:24Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'f7b62984-2aaf-490f-aeff-367698f20b4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:24:24 GMT'
]);
