let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"4":"modelName160434066100406695"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160434066100406695"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  'd7690fac-53c7-44bf-8189-43d9367d729c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9","modelName":"modelName160434066100406695","status":"creating","createdDateTime":"2020-11-02T18:11:01Z","lastUpdatedDateTime":"2020-11-02T18:11:01Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '27f34e06-77da-4545-89be-3fc5dee27904',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9","modelName":"modelName160434066100406695","status":"creating","createdDateTime":"2020-11-02T18:11:01Z","lastUpdatedDateTime":"2020-11-02T18:11:01Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '36b43fbc-a4cb-4b20-a2f6-d50332c3cf77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9","modelName":"modelName160434066100406695","status":"creating","createdDateTime":"2020-11-02T18:11:01Z","lastUpdatedDateTime":"2020-11-02T18:11:01Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '516bb229-f96a-4d04-b8be-d879a0bb05ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9","modelName":"modelName160434066100406695","status":"creating","createdDateTime":"2020-11-02T18:11:01Z","lastUpdatedDateTime":"2020-11-02T18:11:01Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'b69c9233-e1bc-465b-bcbd-591bede7bdb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9","status":"ready","createdDateTime":"2020-11-02T18:11:01Z","lastUpdatedDateTime":"2020-11-02T18:11:16Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'e8f1885b-7422-4506-99e1-d18243805d9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:11:17 GMT'
]);
