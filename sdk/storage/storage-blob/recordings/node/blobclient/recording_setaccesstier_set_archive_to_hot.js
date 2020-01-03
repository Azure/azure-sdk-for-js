let nock = require('nock');

module.exports.testInfo = {"container":"container156988644357109465","blob":"blob156988644378109182"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988644357109465')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:03 GMT',
  'ETag',
  '"0x8D745FEADE076B0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff64cbd2-c01e-00de-06e7-772332000000',
  'x-ms-client-request-id',
  '033e6aac-3660-4e06-9ec8-2a4c7667fa10',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:03 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988644357109465/blob156988644378109182', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:03 GMT',
  'ETag',
  '"0x8D745FEAE014BC7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f11971c-201e-0013-71e7-77467a000000',
  'x-ms-client-request-id',
  'a8c009cf-1a35-4c43-b706-73c69ab1671c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 30 Sep 2019 23:34:03 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988644357109465/blob156988644378109182')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '78b1172f-001e-00c3-0fe7-77fad8000000',
  'x-ms-client-request-id',
  'aff68166-5794-4eb8-9398-4635eaa60f41',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:04 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156988644357109465/blob156988644378109182')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D745FEAE014BC7"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '88c1ec45-801e-00d9-3be7-77d5b7000000',
  'x-ms-client-request-id',
  'aa3585b0-8ade-491a-9c2e-364e09a05316',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Mon, 30 Sep 2019 23:34:03 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Mon, 30 Sep 2019 23:34:04 GMT',
  'Date',
  'Mon, 30 Sep 2019 23:34:03 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988644357109465/blob156988644378109182')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59e5f7ac-a01e-006f-3ee7-77db4f000000',
  'x-ms-client-request-id',
  'b22fc2c2-d5af-40b5-b6d9-3a26d7c10fee',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:03 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156988644357109465/blob156988644378109182')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D745FEAE014BC7"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19107411-d01e-002f-4fe7-77f2a1000000',
  'x-ms-client-request-id',
  'f35ebfd6-4b81-482d-9f64-3cbc5b5b4267',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 30 Sep 2019 23:34:03 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Mon, 30 Sep 2019 23:34:04 GMT',
  'x-ms-archive-status',
  'rehydrate-pending-to-hot',
  'Date',
  'Mon, 30 Sep 2019 23:34:04 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156988644357109465')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0c311eb6-d01e-0109-71e7-772f40000000',
  'x-ms-client-request-id',
  '27b7617e-b736-40b2-b3d3-d6d4d79b6d20',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:04 GMT' ]);

