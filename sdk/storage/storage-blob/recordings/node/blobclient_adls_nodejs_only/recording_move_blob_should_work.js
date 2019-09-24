let nock = require('nock');

module.exports.testInfo = {"container":"container156929857562902788","blob":"blob156929857678209774","blob_move":"blob_move156929857792204865"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929857562902788')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:53 GMT',
  'ETag',
  '"0x8D740A55520F2F4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23f1148c-d01e-0024-5a8e-72dcd0000000',
  'x-ms-client-request-id',
  'bfb6109d-7949-4259-8306-f1c752f849af',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:53 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929857562902788/blob156929857678209774', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:54 GMT',
  'ETag',
  '"0x8D740A555D09FC7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56355af1-601e-0014-368e-7286fa000000',
  'x-ms-client-request-id',
  'bc57e45b-86be-4fc5-9821-d6b62d27e115',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:11:54 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929857562902788/blob_move156929857792204865')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ebd022d5-b01f-0034-438e-72ea36000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'adbaf27e-294a-4132-82dc-c131e0c9aefe',
  'Date',
  'Tue, 24 Sep 2019 04:11:55 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929857562902788/blob_move156929857792204865')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D740A555D09FC7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '209d320e-501e-0071-408e-7237a7000000',
  'x-ms-client-request-id',
  'a0e18d58-d212-403a-b05f-5a81bf7fb5ec',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Tue, 24 Sep 2019 04:11:54 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:11:57 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929857562902788')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dd2cc2f-a01e-004d-568e-72837c000000',
  'x-ms-client-request-id',
  '05aa7eba-00b0-4654-b828-5dc5238cfdc0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:58 GMT' ]);
