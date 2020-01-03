let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534996746708444","file":"file157534996867305141"},"newDate":{"now":"2019-12-03T05:12:47.467Z","tmr":"2019-12-03T05:12:47.467Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534996746708444')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:06:50 GMT',
  'ETag',
  '"0x8D777AE9AD95145"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a873325-f01e-0038-7597-a904c7000000',
  'x-ms-client-request-id',
  '8dc8d84a-54df-4d1b-8562-8051ff050f18',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:50 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534996746708444/file157534996867305141')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 05:06:51 GMT',
  'ETag',
  '"0x8D777AE9B8955CB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28175951-701f-0083-6597-a9e533000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f16156f8-7182-4d73-aefc-a01e2efe7968',
  'Date',
  'Tue, 03 Dec 2019 05:06:50 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534996746708444/file157534996867305141')
  .query(true)
  .reply(200, [], [ 'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '0',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:06:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777AE9B8955CB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0840c09d-501e-003e-5497-a9f3bf000000',
  'x-ms-client-request-id',
  'b41a79ff-86a9-4b70-8513-2e2972b9b3b9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 05:06:51 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 05:06:52 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534996746708444')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a8739da-f01e-0038-1d97-a904c7000000',
  'x-ms-client-request-id',
  'e4c37db6-cce8-4a98-848a-bcd1344d7b42',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:52 GMT' ]);
