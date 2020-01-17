let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157929492738706388","blob":"blob157929492749006544","randomstring":"randomstring157929492749203180"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157929492738706388')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 17 Jan 2020 21:02:07 GMT',
  'ETag',
  '"0x8D79B90831C27BC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff126126-501e-0061-2479-cd74a9000000',
  'x-ms-client-request-id',
  '3d9209c2-7c09-4456-9d90-03e0f2953981',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 17 Jan 2020 21:02:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157929492738706388')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff126134-501e-0061-2e79-cd74a9000000',
  'x-ms-client-request-id',
  '1d0e1aaa-7de0-400a-a63a-364d68ef2e4d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 17 Jan 2020 21:02:06 GMT' ]);
