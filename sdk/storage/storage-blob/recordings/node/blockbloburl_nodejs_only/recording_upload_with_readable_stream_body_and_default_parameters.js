let nock = require('nock');

module.exports.testInfo = {"container":"container155873894650608335","blob":"blob155873894680607333","randomstring":"randomstring155873894680704736"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873894650608335')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:26 GMT',
  'ETag',
  '"0x8D6E09BE3B66C4C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4d30c0f-801e-0006-0a84-126a20000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:02:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873894650608335/blob155873894680607333', "randomstring155873894680704736")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'IGUOeeEkYF+SOouhIiAEQQ==',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:26 GMT',
  'ETag',
  '"0x8D6E09BE3F233E9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '521559c2-001e-0053-0c84-128157000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:02:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873894650608335/blob155873894680607333')
  .reply(200, "randomstring155873894680704736", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'IGUOeeEkYF+SOouhIiAEQQ==',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:26 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09BE3F233E9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3d2c48f-201e-004f-1f84-125940000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 23:02:26 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:02:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873894650608335')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff72fbcb-d01e-0073-1884-12ed9b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:02:26 GMT',
  'Connection',
  'close' ]);

