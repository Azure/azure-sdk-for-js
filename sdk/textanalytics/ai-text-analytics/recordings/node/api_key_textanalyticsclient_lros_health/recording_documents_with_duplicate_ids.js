let nock = require('nock');

module.exports.hash = "e54d5f4d8fca2689c41edeeb26fc3382";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"hello world"},{"id":"1","text":"I did not like the hotel we stayed at."}]})
  .query(true)
  .reply(400, {"error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Request contains duplicated Ids. Make sure each document has a unique Id."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f47c68c0-d55d-4362-b258-ba5040821ebf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:43 GMT'
]);
