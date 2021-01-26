let nock = require('nock');

module.exports.hash = "fac03bc2291695d3a2d13747ec814837";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Aacc5e14e9ced46fbbb8fd0ee8160d9e4%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1aa3-1655-373a0d0032ea","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-2a63-1655-373a0d0032eb","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Q1JZgvdOsk+hJ/V7D7Jusg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '318ms',
  'X-Azure-Ref',
  '042oQYAAAAADFUIapTeIgQLbP4IZFNA3QWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:55 GMT'
]);
