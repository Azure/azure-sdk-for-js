let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"3":"modelName160409727091600454"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160409727091600454"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/a3e4b77b-d241-4435-9517-5d2e2dd24970',
  'x-envoy-upstream-service-time',
  '258',
  'apim-request-id',
  '76422040-2057-4686-9510-f3c0e323e630',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:34:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a3e4b77b-d241-4435-9517-5d2e2dd24970')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3e4b77b-d241-4435-9517-5d2e2dd24970","modelName":"modelName160409727091600454","status":"creating","createdDateTime":"2020-10-30T22:34:31Z","lastUpdatedDateTime":"2020-10-30T22:34:31Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'ed9045ca-9cc3-4ced-903c-2df570342ce6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:34:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a3e4b77b-d241-4435-9517-5d2e2dd24970')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3e4b77b-d241-4435-9517-5d2e2dd24970","modelName":"modelName160409727091600454","status":"creating","createdDateTime":"2020-10-30T22:34:31Z","lastUpdatedDateTime":"2020-10-30T22:34:31Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '1bbb814a-1472-48ff-a22f-5c6cb4a64667',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:34:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a3e4b77b-d241-4435-9517-5d2e2dd24970')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3e4b77b-d241-4435-9517-5d2e2dd24970","modelName":"modelName160409727091600454","status":"creating","createdDateTime":"2020-10-30T22:34:31Z","lastUpdatedDateTime":"2020-10-30T22:34:31Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '18f3248a-67c7-431f-8eaf-0c2af43514d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:34:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a3e4b77b-d241-4435-9517-5d2e2dd24970')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3e4b77b-d241-4435-9517-5d2e2dd24970","modelName":"modelName160409727091600454","status":"creating","createdDateTime":"2020-10-30T22:34:31Z","lastUpdatedDateTime":"2020-10-30T22:34:31Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'c9ab0e80-bf7e-4e1c-80ba-856a13e910c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:34:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a3e4b77b-d241-4435-9517-5d2e2dd24970')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3e4b77b-d241-4435-9517-5d2e2dd24970","modelName":"modelName160409727091600454","status":"creating","createdDateTime":"2020-10-30T22:34:31Z","lastUpdatedDateTime":"2020-10-30T22:34:31Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '44ded20f-57db-44ae-bf16-e540a48c6722',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:34:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a3e4b77b-d241-4435-9517-5d2e2dd24970')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a3e4b77b-d241-4435-9517-5d2e2dd24970","status":"ready","createdDateTime":"2020-10-30T22:34:31Z","lastUpdatedDateTime":"2020-10-30T22:34:50Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'f3b41ca8-f4f1-4cc5-82b8-6d24bb5500fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:34:51 GMT'
]);
