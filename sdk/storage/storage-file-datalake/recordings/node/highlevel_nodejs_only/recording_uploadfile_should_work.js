let nock = require('nock');

module.exports.hash = "788349dcb635b12f1781cda7b96584f4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350566823005123","file":"file158350566856704484"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350566823005123')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:41:08 GMT',
  'ETag',
  '"0x8D7C1DC6857D9FC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd185ec-001e-0026-0cc5-f3de2a000000',
  'x-ms-client-request-id',
  '28d24a61-3075-4d1c-9704-32c8b649ef8e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:41:08 GMT'
]);
