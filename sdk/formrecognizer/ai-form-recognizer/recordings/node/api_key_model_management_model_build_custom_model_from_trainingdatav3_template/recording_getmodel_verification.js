let nock = require('nock');

module.exports.hash = "2388f39d01a731a937867257861becf1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/modelName164331090870809307')
  .query(true)
  .reply(200, {"docTypes":{"modelName164331090870809307":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"modelName164331090870809307","createdDateTime":"2022-01-27T19:15:11Z","apiVersion":"2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '261546dc-a9be-4603-ba6c-4cf8b06733ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:14 GMT'
]);
