let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"6":"modelName160409686948106567"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160409686948106567"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/058a6549-10d1-4d27-b964-c30016d783d8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  'e6d4f98d-a3b4-4df1-ade8-ebf3a9040586',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/058a6549-10d1-4d27-b964-c30016d783d8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"058a6549-10d1-4d27-b964-c30016d783d8","modelName":"modelName160409686948106567","status":"creating","createdDateTime":"2020-10-30T22:27:49Z","lastUpdatedDateTime":"2020-10-30T22:27:49Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '3c2f795d-eb69-4813-a77b-11ef6b765b95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/058a6549-10d1-4d27-b964-c30016d783d8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"058a6549-10d1-4d27-b964-c30016d783d8","modelName":"modelName160409686948106567","status":"creating","createdDateTime":"2020-10-30T22:27:49Z","lastUpdatedDateTime":"2020-10-30T22:27:49Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'fe2d04e1-9a9a-4d8b-80f5-4c3ec26bc114',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/058a6549-10d1-4d27-b964-c30016d783d8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"058a6549-10d1-4d27-b964-c30016d783d8","modelName":"modelName160409686948106567","status":"creating","createdDateTime":"2020-10-30T22:27:49Z","lastUpdatedDateTime":"2020-10-30T22:27:49Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'd1e6e7a0-c163-4c56-93c7-34dde50c6460',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/058a6549-10d1-4d27-b964-c30016d783d8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"058a6549-10d1-4d27-b964-c30016d783d8","modelName":"modelName160409686948106567","status":"creating","createdDateTime":"2020-10-30T22:27:49Z","lastUpdatedDateTime":"2020-10-30T22:27:49Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'dba05973-db47-45db-bd46-7a66189e98bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:27:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/058a6549-10d1-4d27-b964-c30016d783d8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"058a6549-10d1-4d27-b964-c30016d783d8","modelName":"modelName160409686948106567","status":"creating","createdDateTime":"2020-10-30T22:27:49Z","lastUpdatedDateTime":"2020-10-30T22:27:49Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'da16ecfc-4b45-472d-b49e-678d30c09fdc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/058a6549-10d1-4d27-b964-c30016d783d8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"058a6549-10d1-4d27-b964-c30016d783d8","status":"ready","createdDateTime":"2020-10-30T22:27:49Z","lastUpdatedDateTime":"2020-10-30T22:28:05Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '48cd8406-89ba-4d0a-a096-452fc8127783',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:10 GMT'
]);
