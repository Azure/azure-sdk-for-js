let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"6":"modelName160409736995900703"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160409736995900703"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/efb62dab-214a-4b00-8557-f1b122d6f2a7',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'f62caaec-a670-4278-9899-5d796b3f5ee4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/efb62dab-214a-4b00-8557-f1b122d6f2a7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"efb62dab-214a-4b00-8557-f1b122d6f2a7","modelName":"modelName160409736995900703","status":"creating","createdDateTime":"2020-10-30T22:36:10Z","lastUpdatedDateTime":"2020-10-30T22:36:10Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '1369f388-b284-4e47-b07f-194f57f3505d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/efb62dab-214a-4b00-8557-f1b122d6f2a7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"efb62dab-214a-4b00-8557-f1b122d6f2a7","modelName":"modelName160409736995900703","status":"creating","createdDateTime":"2020-10-30T22:36:10Z","lastUpdatedDateTime":"2020-10-30T22:36:10Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '4371fcad-a763-474d-88a1-362283b6b4b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/efb62dab-214a-4b00-8557-f1b122d6f2a7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"efb62dab-214a-4b00-8557-f1b122d6f2a7","modelName":"modelName160409736995900703","status":"creating","createdDateTime":"2020-10-30T22:36:10Z","lastUpdatedDateTime":"2020-10-30T22:36:10Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '3fab846a-634c-4eee-a8f9-7d7220b697a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/efb62dab-214a-4b00-8557-f1b122d6f2a7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"efb62dab-214a-4b00-8557-f1b122d6f2a7","modelName":"modelName160409736995900703","status":"creating","createdDateTime":"2020-10-30T22:36:10Z","lastUpdatedDateTime":"2020-10-30T22:36:10Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'c62ba8a9-770b-4a78-994b-b8776b798d45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/efb62dab-214a-4b00-8557-f1b122d6f2a7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"efb62dab-214a-4b00-8557-f1b122d6f2a7","status":"ready","createdDateTime":"2020-10-30T22:36:10Z","lastUpdatedDateTime":"2020-10-30T22:36:23Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '4fba7f48-722e-4d30-bbd7-6808175a2a66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:25 GMT'
]);
