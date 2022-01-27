let nock = require('nock');

module.exports.hash = "2388f39d01a731a937867257861becf1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/modelName164330883139304044')
  .query(true)
  .reply(200, {"docTypes":{"modelName164330883139304044":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"neural"}},"modelId":"modelName164330883139304044","createdDateTime":"2022-01-27T18:52:00Z","apiVersion":"2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '6ed5252a-0734-4e75-a1ca-f9d937e478c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:52:03 GMT'
]);
