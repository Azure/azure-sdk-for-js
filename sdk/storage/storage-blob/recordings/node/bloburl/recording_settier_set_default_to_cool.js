let nock = require('nock');

module.exports.testInfo = {"container":"container156231859017601610","blob":"blob156231859045003480"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859017601610')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:51 GMT',
  'ETag',
  '"0x8D70129EEF6DA33"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc294614-601e-00f0-1712-33eef8000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859017601610/blob156231859045003480', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:51 GMT',
  'ETag',
  '"0x8D70129EF20EB42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd91a1007-201e-0074-3412-33b8d0000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859017601610/blob156231859045003480')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81e89789-a01e-0107-7c12-338e46000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156231859017601610/blob156231859045003480')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129EF20EB42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f70383a-901e-010f-5512-339535000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:19:51 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-change-time',
  'Fri, 05 Jul 2019 09:19:51 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231859017601610')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61713155-101e-0115-0d12-33ba5a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:51 GMT',
  'Connection',
  'close' ]);

