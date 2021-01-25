let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"6":"modelName160434072185307114"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160434072185307114"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/ccfa295d-de40-44bb-8166-039a37b2d8ab',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  'e4d9ad48-3e1e-4c46-9527-5c060475f6fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ccfa295d-de40-44bb-8166-039a37b2d8ab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ccfa295d-de40-44bb-8166-039a37b2d8ab","modelName":"modelName160434072185307114","status":"creating","createdDateTime":"2020-11-02T18:12:02Z","lastUpdatedDateTime":"2020-11-02T18:12:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '4faf085b-88a1-485a-b5c8-d40b64459dc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ccfa295d-de40-44bb-8166-039a37b2d8ab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ccfa295d-de40-44bb-8166-039a37b2d8ab","modelName":"modelName160434072185307114","status":"creating","createdDateTime":"2020-11-02T18:12:02Z","lastUpdatedDateTime":"2020-11-02T18:12:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'ae5776b0-fb4f-40b7-82a7-89458d69bf6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ccfa295d-de40-44bb-8166-039a37b2d8ab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ccfa295d-de40-44bb-8166-039a37b2d8ab","modelName":"modelName160434072185307114","status":"creating","createdDateTime":"2020-11-02T18:12:02Z","lastUpdatedDateTime":"2020-11-02T18:12:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '38147cc8-0c5d-4b88-8710-9143eac86cc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ccfa295d-de40-44bb-8166-039a37b2d8ab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ccfa295d-de40-44bb-8166-039a37b2d8ab","modelName":"modelName160434072185307114","status":"creating","createdDateTime":"2020-11-02T18:12:02Z","lastUpdatedDateTime":"2020-11-02T18:12:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '2e2904ad-9147-47c7-a991-ffe2ab530582',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ccfa295d-de40-44bb-8166-039a37b2d8ab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ccfa295d-de40-44bb-8166-039a37b2d8ab","status":"ready","createdDateTime":"2020-11-02T18:12:02Z","lastUpdatedDateTime":"2020-11-02T18:12:16Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '95dfae1c-6ebf-45b1-9294-b14d62012aa7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:16 GMT'
]);
