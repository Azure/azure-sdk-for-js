let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"3":"modelName160409678106206444"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160409678106206444"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/49f3c146-8bae-417b-8474-97a56b6313f7',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'bca7b029-dc90-4594-b4e0-e47efe0f24df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/49f3c146-8bae-417b-8474-97a56b6313f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"49f3c146-8bae-417b-8474-97a56b6313f7","modelName":"modelName160409678106206444","status":"creating","createdDateTime":"2020-10-30T22:26:21Z","lastUpdatedDateTime":"2020-10-30T22:26:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '1e0d782e-3047-4d03-af1e-d178c9b32407',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/49f3c146-8bae-417b-8474-97a56b6313f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"49f3c146-8bae-417b-8474-97a56b6313f7","modelName":"modelName160409678106206444","status":"creating","createdDateTime":"2020-10-30T22:26:21Z","lastUpdatedDateTime":"2020-10-30T22:26:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '74b899bb-59d3-47de-9cf4-28d2a167a200',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/49f3c146-8bae-417b-8474-97a56b6313f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"49f3c146-8bae-417b-8474-97a56b6313f7","modelName":"modelName160409678106206444","status":"creating","createdDateTime":"2020-10-30T22:26:21Z","lastUpdatedDateTime":"2020-10-30T22:26:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '34e854bf-de04-40b1-83cc-b34350edde64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/49f3c146-8bae-417b-8474-97a56b6313f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"49f3c146-8bae-417b-8474-97a56b6313f7","modelName":"modelName160409678106206444","status":"creating","createdDateTime":"2020-10-30T22:26:21Z","lastUpdatedDateTime":"2020-10-30T22:26:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'b04a4ae0-9aa9-4e1c-918c-cc6793263c66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/49f3c146-8bae-417b-8474-97a56b6313f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"49f3c146-8bae-417b-8474-97a56b6313f7","modelName":"modelName160409678106206444","status":"creating","createdDateTime":"2020-10-30T22:26:21Z","lastUpdatedDateTime":"2020-10-30T22:26:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'cede1e6b-9a0d-4ed2-a664-32c955ece270',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/49f3c146-8bae-417b-8474-97a56b6313f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"49f3c146-8bae-417b-8474-97a56b6313f7","status":"ready","createdDateTime":"2020-10-30T22:26:21Z","lastUpdatedDateTime":"2020-10-30T22:26:38Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'da3f1b54-a8da-48ec-a419-3d71b0f290c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:26:42 GMT'
]);
