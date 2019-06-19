let nock = require('nock');

module.exports.testInfo = {"container":"container156058670242909226","blob":"blob156058670312305396","randomstring你好":"randomstring你好156058670312501617"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058670242909226')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:18:22 GMT',
  'ETag',
  '"0x8D6F16A080A4446"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'acf37935-d01e-000e-7a52-23969a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:18:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058670242909226/blob156058670312305396', "randomstring你好156058670312501617")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '4gg8AX5pa6jT+4rOh/BOmw==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:18:23 GMT',
  'ETag',
  '"0x8D6F16A08D0228E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de8c39b6-c01e-0033-1f52-2323bc000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 15 Jun 2019 08:18:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156058670242909226/blob156058670312305396')
  .reply(200, "randomstring你好156058670312501617", [ 'Content-Length',
  '36',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '4gg8AX5pa6jT+4rOh/BOmw==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:18:23 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F16A08D0228E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd11c5571-201e-001b-1752-235403000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Sat, 15 Jun 2019 08:18:23 GMT',
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
  'Sat, 15 Jun 2019 08:18:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156058670242909226')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '516d3cd3-601e-0017-1552-23baf2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:18:24 GMT',
  'Connection',
  'close' ]);

