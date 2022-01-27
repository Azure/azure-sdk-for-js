let nock = require('nock');

module.exports.hash = "5beb0971d090f588e54b57e4016db9cf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/prebuilt-invoice:analyze', {"urlSource":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"InvalidArgument","message":"Invalid argument.","innererror":{"code":"InvalidParameter","message":"The parameter Locale is invalid: The language code is invalid or not supported."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '5d512557-e4b9-4fa8-a2db-5e7c38847662',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 17:39:31 GMT'
]);
