let nock = require('nock');

module.exports.testInfo = {"container":"container156058647485701885","blob":"blob156058647563707310","randomstring":"randomstring156058647564105167"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058647485701885')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:14:34 GMT',
  'ETag',
  '"0x8D6F1698050FF14"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d5578b4-501e-009c-7d52-23012c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:14:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058647485701885/blob156058647563707310', "randomstring156058647564105167")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '6tw80IznSq7In36epfCOGw==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:14:36 GMT',
  'ETag',
  '"0x8D6F16981322564"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0310f442-001e-000c-0e52-239460000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 15 Jun 2019 08:14:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156058647485701885/blob156058647563707310')
  .reply(200, ["72616e646f6d737472696e67313536303538363437353634313035313637"], [ 'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '30',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Content-MD5',
  '6tw80IznSq7In36epfCOGw==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:14:36 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F16981322564"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4e1c80f-401e-006d-1f52-23d0bf000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-creation-time',
  'Sat, 15 Jun 2019 08:14:36 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-meta-keya,x-ms-meta-keyb,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 15 Jun 2019 08:14:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156058647485701885')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '917639fd-601e-0094-6852-231a5f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:14:38 GMT',
  'Connection',
  'close' ]);

