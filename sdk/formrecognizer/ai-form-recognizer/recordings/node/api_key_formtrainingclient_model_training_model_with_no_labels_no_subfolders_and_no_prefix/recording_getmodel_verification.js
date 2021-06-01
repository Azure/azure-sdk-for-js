let nock = require('nock');

module.exports.hash = "8bb8cd761eb5b67ad00e62a47892af59";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ac414e79-56f7-4153-a6ee-30814fd2f9e9","modelName":"modelName162196602280006971","status":"ready","createdDateTime":"2021-05-25T18:07:02Z","lastUpdatedDateTime":"2021-05-25T18:07:26Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'e2777bad-03b0-487c-afea-dade3a981274',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:28 GMT'
]);
