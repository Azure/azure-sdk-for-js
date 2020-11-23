let nock = require('nock');

module.exports.hash = "fed99f4aa1017bd41facfd2949aa4eb9";

module.exports.testInfo = {"uniqueName":{"4":"modelName160588244402009695"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160588244402009695"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/bb1db6bb-ac45-4b83-bb09-93af97238e69',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '6a7aee66-49f6-46f6-925a-b20f4c6bf98a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb1db6bb-ac45-4b83-bb09-93af97238e69')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bb1db6bb-ac45-4b83-bb09-93af97238e69","modelName":"modelName160588244402009695","status":"creating","createdDateTime":"2020-11-20T14:27:24Z","lastUpdatedDateTime":"2020-11-20T14:27:24Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '14e6baff-bef5-4c24-9ba3-c344551376c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb1db6bb-ac45-4b83-bb09-93af97238e69')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bb1db6bb-ac45-4b83-bb09-93af97238e69","modelName":"modelName160588244402009695","status":"creating","createdDateTime":"2020-11-20T14:27:24Z","lastUpdatedDateTime":"2020-11-20T14:27:24Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '0faf8a18-1967-4911-b1d4-c627a538a00c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb1db6bb-ac45-4b83-bb09-93af97238e69')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bb1db6bb-ac45-4b83-bb09-93af97238e69","modelName":"modelName160588244402009695","status":"creating","createdDateTime":"2020-11-20T14:27:24Z","lastUpdatedDateTime":"2020-11-20T14:27:24Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '213dd043-a3ec-4814-91d2-0df46a6fab07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb1db6bb-ac45-4b83-bb09-93af97238e69')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bb1db6bb-ac45-4b83-bb09-93af97238e69","modelName":"modelName160588244402009695","status":"creating","createdDateTime":"2020-11-20T14:27:24Z","lastUpdatedDateTime":"2020-11-20T14:27:24Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'e345a55b-2d3d-4166-b983-5b483e554c64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb1db6bb-ac45-4b83-bb09-93af97238e69')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bb1db6bb-ac45-4b83-bb09-93af97238e69","modelName":"modelName160588244402009695","status":"creating","createdDateTime":"2020-11-20T14:27:24Z","lastUpdatedDateTime":"2020-11-20T14:27:24Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'ea613320-cf8d-423c-9596-ebff5be5d17e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb1db6bb-ac45-4b83-bb09-93af97238e69')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bb1db6bb-ac45-4b83-bb09-93af97238e69","modelName":"modelName160588244402009695","status":"ready","createdDateTime":"2020-11-20T14:27:24Z","lastUpdatedDateTime":"2020-11-20T14:27:42Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1064',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '2366e0d1-e8f4-4c06-8936-628c9bd37269',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:44 GMT'
]);
