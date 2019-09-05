let nock = require('nock');

module.exports.testInfo = {"container":"container156776194370500829","blob":"blob156776194410902875","randomstring":"randomstring156776194411007938"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776194370500829')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:44 GMT',
  'ETag',
  '"0x8D732AC315B0702"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e8c3af9-201e-003d-3495-648198000000',
  'x-ms-client-request-id',
  '522923e8-3d97-4961-9ecd-ad7466db2dfd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776194370500829/blob156776194410902875', "randomstring156776194411007938")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'TtXomLK7aZYjhUQ1H6nglg==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:44 GMT',
  'ETag',
  '"0x8D732AC3197406E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c82a79-401e-00e0-0495-64741a000000',
  'x-ms-client-request-id',
  '1498b2f3-dabd-41ab-b3c4-836e1208ddf5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'fagBTAdtunA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:25:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776194370500829/blob156776194410902875')
  .reply(200, "randomstring156776194411007938", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'TtXomLK7aZYjhUQ1H6nglg==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732AC3197406E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd4067da9-001e-00ac-0595-64e42a000000',
  'x-ms-client-request-id',
  'a43785bb-c126-4a93-a167-09594a943671',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:25:44 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:25:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776194370500829')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9c1603a0-c01e-00fe-7095-6498c2000000',
  'x-ms-client-request-id',
  'bbab17e0-df3c-4667-9c86-23e9f7d791f4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:44 GMT',
  'Connection',
  'close' ]);

