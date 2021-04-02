let nock = require('nock');

module.exports.hash = "fed99f4aa1017bd41facfd2949aa4eb9";

module.exports.testInfo = {"uniqueName":{"3":"modelName160588240669007916"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160588240669007916"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '09fad8f9-698b-4122-a037-6c34e979f28a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d68509d8-68a3-4d32-9b8d-5a12df5eb8ec","modelName":"modelName160588240669007916","status":"creating","createdDateTime":"2020-11-20T14:26:46Z","lastUpdatedDateTime":"2020-11-20T14:26:46Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  'beafd547-e3d0-4549-af8c-41cd9817b366',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d68509d8-68a3-4d32-9b8d-5a12df5eb8ec","modelName":"modelName160588240669007916","status":"creating","createdDateTime":"2020-11-20T14:26:46Z","lastUpdatedDateTime":"2020-11-20T14:26:46Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  'd08139c8-200a-4200-b3d4-ee4f5630f54a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d68509d8-68a3-4d32-9b8d-5a12df5eb8ec","modelName":"modelName160588240669007916","status":"creating","createdDateTime":"2020-11-20T14:26:46Z","lastUpdatedDateTime":"2020-11-20T14:26:46Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'a9d33492-2f90-40bf-aeed-9a85a55384fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d68509d8-68a3-4d32-9b8d-5a12df5eb8ec","modelName":"modelName160588240669007916","status":"creating","createdDateTime":"2020-11-20T14:26:46Z","lastUpdatedDateTime":"2020-11-20T14:26:46Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  '8adeff16-5792-4e65-b710-61e6e6b24a90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:26:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d68509d8-68a3-4d32-9b8d-5a12df5eb8ec","modelName":"modelName160588240669007916","status":"creating","createdDateTime":"2020-11-20T14:26:46Z","lastUpdatedDateTime":"2020-11-20T14:26:46Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'f4d75372-2786-45b5-b097-66ce182c57ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d68509d8-68a3-4d32-9b8d-5a12df5eb8ec","modelName":"modelName160588240669007916","status":"ready","createdDateTime":"2020-11-20T14:26:46Z","lastUpdatedDateTime":"2020-11-20T14:27:04Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1064',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '9f7e8b67-4d14-4ffd-9f06-f4ab505ac7b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:27:07 GMT'
]);
