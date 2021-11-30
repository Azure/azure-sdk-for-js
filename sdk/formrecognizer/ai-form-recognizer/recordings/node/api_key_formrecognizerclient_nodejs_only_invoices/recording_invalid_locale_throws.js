let nock = require('nock');

module.exports.hash = "5beb0971d090f588e54b57e4016db9cf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/prebuilt-invoice:analyze', {"urlSource":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"InvalidArgument","message":"Invalid argument.","innererror":{"code":"InvalidParameter","message":"The parameter Locale is invalid: The language code is invalid or not supported."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '296',
  'apim-request-id',
  '97104ba3-7b24-4a78-a320-6c3741c4e1ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:38 GMT'
]);
