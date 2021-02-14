let nock = require('nock');

module.exports.hash = "fed99f4aa1017bd41facfd2949aa4eb9";

module.exports.testInfo = {"uniqueName":{"5":"modelName160588248093907972"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160588248093907972"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/bd8ef335-78bf-4871-9869-61aea800efda',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '9a0b39f8-94e9-41a3-aadd-da53a646c17b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bd8ef335-78bf-4871-9869-61aea800efda')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd8ef335-78bf-4871-9869-61aea800efda","modelName":"modelName160588248093907972","status":"creating","createdDateTime":"2020-11-20T14:28:01Z","lastUpdatedDateTime":"2020-11-20T14:28:01Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '7abc0cd7-4d3b-4c53-9478-5f3c4b9a60e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bd8ef335-78bf-4871-9869-61aea800efda')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd8ef335-78bf-4871-9869-61aea800efda","modelName":"modelName160588248093907972","status":"creating","createdDateTime":"2020-11-20T14:28:01Z","lastUpdatedDateTime":"2020-11-20T14:28:01Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '01325fac-2fb3-422e-bb87-1204a06d7b76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bd8ef335-78bf-4871-9869-61aea800efda')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd8ef335-78bf-4871-9869-61aea800efda","modelName":"modelName160588248093907972","status":"creating","createdDateTime":"2020-11-20T14:28:01Z","lastUpdatedDateTime":"2020-11-20T14:28:01Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'cf9be39c-9cbd-48a1-b329-b12d3ac4897a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bd8ef335-78bf-4871-9869-61aea800efda')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd8ef335-78bf-4871-9869-61aea800efda","modelName":"modelName160588248093907972","status":"creating","createdDateTime":"2020-11-20T14:28:01Z","lastUpdatedDateTime":"2020-11-20T14:28:01Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '34dd17cd-ec6c-493e-993a-f7d940f865b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bd8ef335-78bf-4871-9869-61aea800efda')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd8ef335-78bf-4871-9869-61aea800efda","modelName":"modelName160588248093907972","status":"creating","createdDateTime":"2020-11-20T14:28:01Z","lastUpdatedDateTime":"2020-11-20T14:28:01Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '1196dfd4-2b9f-45d1-a833-82399cfa2ddc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bd8ef335-78bf-4871-9869-61aea800efda')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd8ef335-78bf-4871-9869-61aea800efda","modelName":"modelName160588248093907972","status":"ready","createdDateTime":"2020-11-20T14:28:01Z","lastUpdatedDateTime":"2020-11-20T14:28:17Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '981',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '5776990c-db7c-4f4f-b080-0fbbf5f8f697',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:28:22 GMT'
]);
