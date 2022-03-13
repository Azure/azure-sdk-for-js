let nock = require('nock');

module.exports.hash = "da5eb214b0580680213acff8809f86ad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/directions/batch/sync/json', {"batchItems":[]})
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"Number of queries must be between 1 and 100 inclusive."}}, [
  'Content-Length',
  '102',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 47F2485795B84AEB88484BBF2D404CA9 Ref B: TPE30EDGE0606 Ref C: 2022-03-12T02:53:31Z',
  'Date',
  'Sat, 12 Mar 2022 02:53:31 GMT'
]);
