let nock = require('nock');

module.exports.hash = "fac03bc2291695d3a2d13747ec814837";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e6b0-ceb1-a43a0d00e5c6","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-f599-ceb1-a43a0d00e5c7","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'q+idUz1cLUuBqmVFI8LeWQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '116ms',
  'X-Azure-Ref',
  '0NGU5YAAAAABv4wgAF4QmS6H2joLM5F3mWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:35 GMT'
]);
