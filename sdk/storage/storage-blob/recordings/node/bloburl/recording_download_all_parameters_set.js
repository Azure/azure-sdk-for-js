let nock = require('nock');

module.exports.testInfo = {"container":"container156585804878307700","blob":"blob156585804905202735"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585804878307700')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:30:10 GMT',
  'ETag',
  '"0x8D7215AC979D607"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f50db503-801e-001f-5843-53e586000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:30:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585804878307700/blob156585804905202735', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:30:10 GMT',
  'ETag',
  '"0x8D7215AC9A364D2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4f900dc-001e-00a4-5d43-530472000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 15 Aug 2019 08:30:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156585804878307700/blob156585804905202735')
  .reply(206, "H", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'wdn1D4aCWhojAuwkScFxlg==',
  'Content-Range',
  'bytes 0-0/11',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:30:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7215AC9A364D2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '355e45dd-a01e-0125-7c43-53e070000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Thu, 15 Aug 2019 08:30:10 GMT',
  'x-ms-blob-content-md5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-content-md5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:30:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156585804878307700')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a508a08-f01e-013d-3f43-53cde5000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:30:11 GMT',
  'Connection',
  'close'
]);

