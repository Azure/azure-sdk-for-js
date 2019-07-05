let nock = require('nock');

module.exports.testInfo = {"container":"container156231859344800306","blob":"blob156231859383307169","randomstring":"randomstring156231859383401598"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859344800306')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:54 GMT',
  'ETag',
  '"0x8D70129F0FB6700"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb03e6f8-901e-0088-1b12-33864f000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859344800306/blob156231859383307169', "randomstring156231859383401598")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '5AFSwZ2t8GzsdZzjqoK4zw==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:54 GMT',
  'ETag',
  '"0x8D70129F12494C8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a478fc1-a01e-002a-4e12-334bd3000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231859344800306/blob156231859383307169')
  .reply(200, "randomstring156231859383401598", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '5AFSwZ2t8GzsdZzjqoK4zw==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129F12494C8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95f3de07-101e-005e-5312-33cd95000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:19:54 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231859344800306')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f2ea38d7-201e-0012-7212-330a8a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:55 GMT',
  'Connection',
  'close' ]);

