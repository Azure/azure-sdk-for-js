let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"5":"modelName161714595042609854"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName161714595042609854"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/542bd102-93ad-4a08-a51d-aac779db0474',
  'x-envoy-upstream-service-time',
  '252',
  'apim-request-id',
  '3f7e0787-6649-444a-a5df-2348d43f9564',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/542bd102-93ad-4a08-a51d-aac779db0474')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"542bd102-93ad-4a08-a51d-aac779db0474","modelName":"modelName161714595042609854","status":"creating","createdDateTime":"2021-03-30T23:12:30Z","lastUpdatedDateTime":"2021-03-30T23:12:30Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'a105ee52-6ba3-49e7-992e-bb24f7a7d83a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/542bd102-93ad-4a08-a51d-aac779db0474')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"542bd102-93ad-4a08-a51d-aac779db0474","modelName":"modelName161714595042609854","status":"creating","createdDateTime":"2021-03-30T23:12:30Z","lastUpdatedDateTime":"2021-03-30T23:12:30Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'e02def23-e602-4eec-9998-865b9a2962b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/542bd102-93ad-4a08-a51d-aac779db0474')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"542bd102-93ad-4a08-a51d-aac779db0474","modelName":"modelName161714595042609854","status":"creating","createdDateTime":"2021-03-30T23:12:30Z","lastUpdatedDateTime":"2021-03-30T23:12:30Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'b35d3bf1-7e07-4b8b-aeff-f4cdfac601c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/542bd102-93ad-4a08-a51d-aac779db0474')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"542bd102-93ad-4a08-a51d-aac779db0474","modelName":"modelName161714595042609854","status":"creating","createdDateTime":"2021-03-30T23:12:30Z","lastUpdatedDateTime":"2021-03-30T23:12:30Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'f221297c-0904-4066-832a-adc1c3f3942b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/542bd102-93ad-4a08-a51d-aac779db0474')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"542bd102-93ad-4a08-a51d-aac779db0474","modelName":"modelName161714595042609854","status":"ready","createdDateTime":"2021-03-30T23:12:30Z","lastUpdatedDateTime":"2021-03-30T23:12:46Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '5672fee2-e175-4e1e-8d23-6272f48b2db6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:46 GMT'
]);
