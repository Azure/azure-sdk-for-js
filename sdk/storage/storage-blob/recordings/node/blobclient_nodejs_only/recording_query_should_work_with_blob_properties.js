let nock = require('nock');

module.exports.hash = "8ac5123044481e868581f044adfe15f5";

module.exports.testInfo = {"uniqueName":{"container":"container159210828014702637","blob":"blob159210828016304914"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828014702637')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:00 GMT',
  'ETag',
  '"0x8D81019EC8A0EE7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a90-201e-003e-2002-42dadf000000',
  'x-ms-client-request-id',
  'ed9970f1-43e7-44e3-bd7a-bf71df45a7f1',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828014702637/blob159210828016304914', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:00 GMT',
  'ETag',
  '"0x8D81019EC8D3854"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a96-201e-003e-2402-42dadf000000',
  'x-ms-client-request-id',
  'e8d5650b-c013-4403-bc37-35c82d6db369',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:18:00.1829972Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210828014702637')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309aa0-201e-003e-2d02-42dadf000000',
  'x-ms-client-request-id',
  '479323a8-a899-4bfa-b2ef-11409abe2ae9',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);
