let nock = require('nock');

module.exports.hash = "fed99f4aa1017bd41facfd2949aa4eb9";

module.exports.testInfo = {"uniqueName":{"6":"modelName160588251832005580"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160588251832005580"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/662ce68e-5eb8-4d34-b234-5a3f54c0b4c5',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '3963ed96-f675-42d0-8532-683a5efc9d3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/662ce68e-5eb8-4d34-b234-5a3f54c0b4c5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"662ce68e-5eb8-4d34-b234-5a3f54c0b4c5","modelName":"modelName160588251832005580","status":"creating","createdDateTime":"2020-11-20T14:28:38Z","lastUpdatedDateTime":"2020-11-20T14:28:38Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '900ea4d8-8e99-425e-b751-033aa5185b87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/662ce68e-5eb8-4d34-b234-5a3f54c0b4c5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"662ce68e-5eb8-4d34-b234-5a3f54c0b4c5","modelName":"modelName160588251832005580","status":"creating","createdDateTime":"2020-11-20T14:28:38Z","lastUpdatedDateTime":"2020-11-20T14:28:38Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '9803c161-f09f-456b-b0e4-90d190ccfe43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/662ce68e-5eb8-4d34-b234-5a3f54c0b4c5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"662ce68e-5eb8-4d34-b234-5a3f54c0b4c5","modelName":"modelName160588251832005580","status":"creating","createdDateTime":"2020-11-20T14:28:38Z","lastUpdatedDateTime":"2020-11-20T14:28:38Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '0c4af11e-adbf-4ceb-b9a8-7b422bc66a0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/662ce68e-5eb8-4d34-b234-5a3f54c0b4c5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"662ce68e-5eb8-4d34-b234-5a3f54c0b4c5","modelName":"modelName160588251832005580","status":"creating","createdDateTime":"2020-11-20T14:28:38Z","lastUpdatedDateTime":"2020-11-20T14:28:38Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '4c2b2da9-f0f4-4b07-92e7-efba9bd6d7f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/662ce68e-5eb8-4d34-b234-5a3f54c0b4c5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"662ce68e-5eb8-4d34-b234-5a3f54c0b4c5","modelName":"modelName160588251832005580","status":"creating","createdDateTime":"2020-11-20T14:28:38Z","lastUpdatedDateTime":"2020-11-20T14:28:38Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '2d05b49a-7078-40a3-b6d4-3763befe44a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/662ce68e-5eb8-4d34-b234-5a3f54c0b4c5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"662ce68e-5eb8-4d34-b234-5a3f54c0b4c5","modelName":"modelName160588251832005580","status":"ready","createdDateTime":"2020-11-20T14:28:38Z","lastUpdatedDateTime":"2020-11-20T14:28:54Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '981',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'cd8cf14e-ed73-47a6-90de-7acba997cd22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:59 GMT'
]);
