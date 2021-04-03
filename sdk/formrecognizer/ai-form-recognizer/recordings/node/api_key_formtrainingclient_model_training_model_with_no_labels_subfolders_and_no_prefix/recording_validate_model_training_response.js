let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"4":"modelName161714591856001851"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName161714591856001851"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/19289163-d697-4dcb-9ca6-0ee36e398c03',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  '0aa705d0-c771-4a46-a101-86919c277151',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/19289163-d697-4dcb-9ca6-0ee36e398c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"19289163-d697-4dcb-9ca6-0ee36e398c03","modelName":"modelName161714591856001851","status":"creating","createdDateTime":"2021-03-30T23:11:58Z","lastUpdatedDateTime":"2021-03-30T23:11:58Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '665e9042-bfac-40a0-b3d0-6e9e191d415b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/19289163-d697-4dcb-9ca6-0ee36e398c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"19289163-d697-4dcb-9ca6-0ee36e398c03","modelName":"modelName161714591856001851","status":"creating","createdDateTime":"2021-03-30T23:11:58Z","lastUpdatedDateTime":"2021-03-30T23:11:58Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '41cc8d78-7ec5-4802-915e-1480c3c3c89f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/19289163-d697-4dcb-9ca6-0ee36e398c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"19289163-d697-4dcb-9ca6-0ee36e398c03","modelName":"modelName161714591856001851","status":"creating","createdDateTime":"2021-03-30T23:11:58Z","lastUpdatedDateTime":"2021-03-30T23:11:58Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '0b979735-c1a7-456c-8b10-5ebbfb4c2015',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/19289163-d697-4dcb-9ca6-0ee36e398c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"19289163-d697-4dcb-9ca6-0ee36e398c03","modelName":"modelName161714591856001851","status":"creating","createdDateTime":"2021-03-30T23:11:58Z","lastUpdatedDateTime":"2021-03-30T23:11:58Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'f238bb98-8353-48ec-90f6-539fe3ffcdee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/19289163-d697-4dcb-9ca6-0ee36e398c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"19289163-d697-4dcb-9ca6-0ee36e398c03","modelName":"modelName161714591856001851","status":"creating","createdDateTime":"2021-03-30T23:11:58Z","lastUpdatedDateTime":"2021-03-30T23:11:58Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '9f8e43b7-8519-4732-ac33-f5d754b64e91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/19289163-d697-4dcb-9ca6-0ee36e398c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"19289163-d697-4dcb-9ca6-0ee36e398c03","modelName":"modelName161714591856001851","status":"ready","createdDateTime":"2021-03-30T23:11:58Z","lastUpdatedDateTime":"2021-03-30T23:12:17Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1037',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'b1b0bf4c-ea63-439a-bae8-c0a4d42b03f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:19 GMT'
]);
