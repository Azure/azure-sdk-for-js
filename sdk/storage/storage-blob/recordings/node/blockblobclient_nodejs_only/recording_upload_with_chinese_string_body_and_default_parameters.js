let nock = require('nock');

module.exports.testInfo = {"container":"container156816865392909200","blob":"blob156816865435203783","randomstring你好":"randomstring你好156816865435403858"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865392909200')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:14 GMT',
  'ETag',
  '"0x8D7365F23924C41"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1ba040ac-e01e-0033-7748-683fd1000000',
  'x-ms-client-request-id',
  'b8fbbe41-e061-4800-86f7-f54bf2067ee9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:13 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865392909200/blob156816865435203783', "randomstring你好156816865435403858")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'cixnii0iv9CF9lY3ecgDbQ==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:14 GMT',
  'ETag',
  '"0x8D7365F23D29327"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18380d8d-b01e-004d-2648-68a01e000000',
  'x-ms-client-request-id',
  '4f5999b2-45a9-4580-bf51-c432d87b06c9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'rKfNRqj+GvY=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:24:14 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816865392909200/blob156816865435203783')
  .reply(200, "randomstring你好156816865435403858", [ 'Content-Length',
  '36',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'cixnii0iv9CF9lY3ecgDbQ==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:14 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365F23D29327"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a023ad2-701e-005b-4a48-686180000000',
  'x-ms-client-request-id',
  'e895dabe-34d9-4965-9b5d-1b18c69e1b20',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:24:14 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:24:14 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816865392909200')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd25448ff-501e-0003-4348-6865fb000000',
  'x-ms-client-request-id',
  '2eccb7f2-7de8-47c3-884e-1aa92b0e6574',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:15 GMT' ]);

