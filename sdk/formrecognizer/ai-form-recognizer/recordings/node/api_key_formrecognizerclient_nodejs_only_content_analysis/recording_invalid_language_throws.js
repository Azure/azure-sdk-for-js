let nock = require('nock');

module.exports.hash = "36784ad4c241d8896eeb00f29f33bee8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/layout/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"NotSupportedLanguage","message":"The requested operation is not supported in the language specified."}}, [
  'Content-Length',
  '121',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3',
  'apim-request-id',
  '4a6533a5-69ec-401c-8b80-ea1a9093f25c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:15:28 GMT'
]);
