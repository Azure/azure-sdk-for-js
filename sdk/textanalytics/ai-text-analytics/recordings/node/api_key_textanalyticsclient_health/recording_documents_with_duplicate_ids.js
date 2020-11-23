let nock = require('nock');

module.exports.hash = "9b967f880087e954b76975494fad5c8c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"hello world"},{"id":"1","text":"I did not like the hotel we stayed at."}]})
  .query(true)
  .reply(400, {"error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Request contains duplicated Ids. Make sure each document has a unique Id."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '50b47415-af3c-4c5c-a679-df3d2289ca24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:44 GMT'
]);
