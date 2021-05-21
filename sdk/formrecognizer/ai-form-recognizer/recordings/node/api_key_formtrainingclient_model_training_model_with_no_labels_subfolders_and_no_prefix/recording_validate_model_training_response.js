let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"4":"modelName162078258976308369"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName162078258976308369"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/b842da93-4b59-4068-ad24-549a333bc351',
  'x-envoy-upstream-service-time',
  '584',
  'apim-request-id',
  '9458e58f-ec03-4074-9ed8-a8e2d226e6a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b842da93-4b59-4068-ad24-549a333bc351')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b842da93-4b59-4068-ad24-549a333bc351","modelName":"modelName162078258976308369","status":"creating","createdDateTime":"2021-05-12T01:23:10Z","lastUpdatedDateTime":"2021-05-12T01:23:10Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '5d0a1ad5-d9c2-4d49-9d44-cfdc312943c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b842da93-4b59-4068-ad24-549a333bc351')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b842da93-4b59-4068-ad24-549a333bc351","modelName":"modelName162078258976308369","status":"creating","createdDateTime":"2021-05-12T01:23:10Z","lastUpdatedDateTime":"2021-05-12T01:23:10Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '1dee70ad-1d0e-4a59-9464-e222c36dc211',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b842da93-4b59-4068-ad24-549a333bc351')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b842da93-4b59-4068-ad24-549a333bc351","modelName":"modelName162078258976308369","status":"creating","createdDateTime":"2021-05-12T01:23:10Z","lastUpdatedDateTime":"2021-05-12T01:23:10Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '08256834-c69c-4355-aba7-6cbdc91ac267',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b842da93-4b59-4068-ad24-549a333bc351')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b842da93-4b59-4068-ad24-549a333bc351","modelName":"modelName162078258976308369","status":"creating","createdDateTime":"2021-05-12T01:23:10Z","lastUpdatedDateTime":"2021-05-12T01:23:10Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '2c4456ed-0b80-4e91-b952-f4624050962f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b842da93-4b59-4068-ad24-549a333bc351')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b842da93-4b59-4068-ad24-549a333bc351","modelName":"modelName162078258976308369","status":"creating","createdDateTime":"2021-05-12T01:23:10Z","lastUpdatedDateTime":"2021-05-12T01:23:10Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'efe609b7-7029-4506-ac09-ca53dc7321b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b842da93-4b59-4068-ad24-549a333bc351')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b842da93-4b59-4068-ad24-549a333bc351","modelName":"modelName162078258976308369","status":"ready","createdDateTime":"2021-05-12T01:23:10Z","lastUpdatedDateTime":"2021-05-12T01:23:27Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1037',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '934ef4bb-0a83-44ca-a1a5-4b3fe834406f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:30 GMT'
]);
