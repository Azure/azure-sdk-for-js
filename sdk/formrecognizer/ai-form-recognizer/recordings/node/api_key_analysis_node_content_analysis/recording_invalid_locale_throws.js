let nock = require('nock');

module.exports.hash = "a5136c82f33e28a24a6e1ba07f02b0d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/prebuilt-layout:analyze', {"urlSource":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"InvalidArgument","message":"Invalid argument.","innererror":{"code":"InvalidParameter","message":"The parameter Locale is invalid: The language code is invalid or not supported."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '4350f809-6556-4742-bf34-3d00c71c0787',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:13:15 GMT'
]);
