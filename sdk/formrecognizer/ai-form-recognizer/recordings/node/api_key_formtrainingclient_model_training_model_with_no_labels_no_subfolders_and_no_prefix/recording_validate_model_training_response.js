let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"6":"modelName161714597714302346"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName161714597714302346"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/b51b10a5-d01d-49d1-a7f5-da824c25a59e',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  '561391d2-0ba2-4b46-bb3c-26f910520fb9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b51b10a5-d01d-49d1-a7f5-da824c25a59e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b51b10a5-d01d-49d1-a7f5-da824c25a59e","modelName":"modelName161714597714302346","status":"creating","createdDateTime":"2021-03-30T23:12:57Z","lastUpdatedDateTime":"2021-03-30T23:12:57Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '1933dec8-92a0-42e7-97f6-12adb70245b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b51b10a5-d01d-49d1-a7f5-da824c25a59e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b51b10a5-d01d-49d1-a7f5-da824c25a59e","modelName":"modelName161714597714302346","status":"creating","createdDateTime":"2021-03-30T23:12:57Z","lastUpdatedDateTime":"2021-03-30T23:12:57Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'bbacb024-448a-484d-ae80-f110d4a24c38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:12:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b51b10a5-d01d-49d1-a7f5-da824c25a59e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b51b10a5-d01d-49d1-a7f5-da824c25a59e","modelName":"modelName161714597714302346","status":"creating","createdDateTime":"2021-03-30T23:12:57Z","lastUpdatedDateTime":"2021-03-30T23:12:57Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '6ce47473-5b09-405a-bc9f-940ecf513d81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b51b10a5-d01d-49d1-a7f5-da824c25a59e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b51b10a5-d01d-49d1-a7f5-da824c25a59e","modelName":"modelName161714597714302346","status":"creating","createdDateTime":"2021-03-30T23:12:57Z","lastUpdatedDateTime":"2021-03-30T23:12:57Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '75a3fa29-dbdc-43f5-8ab9-970de54f76b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b51b10a5-d01d-49d1-a7f5-da824c25a59e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b51b10a5-d01d-49d1-a7f5-da824c25a59e","modelName":"modelName161714597714302346","status":"ready","createdDateTime":"2021-03-30T23:12:57Z","lastUpdatedDateTime":"2021-03-30T23:13:12Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'a56ab655-7ad3-40b9-bfbc-416d90602a27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:12 GMT'
]);
