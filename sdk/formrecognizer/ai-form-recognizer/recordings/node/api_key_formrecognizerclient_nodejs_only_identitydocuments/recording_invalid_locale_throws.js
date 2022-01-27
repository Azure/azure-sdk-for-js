let nock = require('nock');

module.exports.hash = "3ddb433971e37a745b11c463a86f33fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/prebuilt-idDocument:analyze', {"urlSource":"https://storageaccount/testingdata/license.jpg?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"InvalidArgument","message":"Invalid argument.","innererror":{"code":"InvalidParameter","message":"The parameter Locale is invalid: The language code is invalid or not supported."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '692ef21e-ea3a-46cc-81b5-f861e5f34837',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 17:39:42 GMT'
]);
