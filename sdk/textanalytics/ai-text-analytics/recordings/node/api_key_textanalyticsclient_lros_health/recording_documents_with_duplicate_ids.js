let nock = require('nock');

module.exports.hash = "e54d5f4d8fca2689c41edeeb26fc3382";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"1","text":"hello world"},{"id":"1","text":"I did not like the hotel we stayed at."}]})
  .query(true)
  .reply(400, {"error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Request contains duplicated Ids. Make sure each document has a unique Id."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'e582f457-eb5a-4ad1-91d9-2c74bb9f142d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:47 GMT'
]);
