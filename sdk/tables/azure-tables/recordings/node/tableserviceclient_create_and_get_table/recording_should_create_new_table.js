let nock = require('nock');

module.exports.hash = "d6b7fc64e253cada2c9c4dcb1176555e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"testTablenode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#Tables/@Element","TableName":"testTablenode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://joherediteststorage.table.core.windows.net/Tables('testTablenode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b7cd2d2-4002-011d-482b-77cb6b000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-content',
  'Date',
  'Thu, 20 Aug 2020 19:55:56 GMT',
  'Connection',
  'close'
]);

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#Tables","value":[{"TableName":"integration"},{"TableName":"test1"},{"TableName":"TestTable"},{"TableName":"testTablenode"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c2db5975-f002-0104-2f2b-77e703000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 20 Aug 2020 19:55:56 GMT',
  'Connection',
  'close'
]);
