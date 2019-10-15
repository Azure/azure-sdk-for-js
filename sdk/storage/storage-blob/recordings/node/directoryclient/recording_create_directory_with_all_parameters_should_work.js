let nock = require('nock');

module.exports.testInfo = {"container":"container156929884899107721","directory":"directory156929885015901891"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929884899107721')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:16:27 GMT',
  'ETag',
  '"0x8D740A5F811A77D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '947f33d7-a01e-0009-338e-725f10000000',
  'x-ms-client-request-id',
  'bd449d8e-bcd4-4497-9f29-608b730775e9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:26 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929884899107721/directory156929885015901891')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:28 GMT',
  'ETag',
  '"0x8D740A5F8C161D4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6cb35095-d01f-0060-0f8e-7200bc000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '41e5268c-54dc-4504-ab40-0579fc34b67f',
  'Date',
  'Tue, 24 Sep 2019 04:16:27 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929884899107721/directory156929885015901891')
  .reply(200, [], [ 'Cache-Control',
  'cacheControl',
  'Content-Length',
  '0',
  'Content-Type',
  'contentType',
  'Content-Encoding',
  'contentEncoding',
  'Content-Language',
  'contentLanguage',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:16:28 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D740A5F8C161D4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2676800a-401e-0021-618e-7228af000000',
  'x-ms-client-request-id',
  '1c855ed2-4fe3-47d8-a299-d78c9314dd10',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-meta-prop1',
  'val1',
  'x-ms-meta-prop2',
  'val2',
  'x-ms-creation-time',
  'Tue, 24 Sep 2019 04:16:28 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'contentDisposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:16:28 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929884899107721/directory156929885015901891')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:28 GMT',
  'ETag',
  '"0x8D740A5F8C161D4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwx-w----',
  'x-ms-acl',
  'user::rwx,group::-w-,other::---',
  'x-ms-request-id',
  'fec39f04-701f-004f-078e-728186000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd7f9017f-6493-470b-a1f0-353843258b86',
  'Date',
  'Tue, 24 Sep 2019 04:16:29 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929884899107721')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dcff178b-f01e-0033-4f8e-721cb3000000',
  'x-ms-client-request-id',
  '42e6c5eb-ac5f-452d-b5cf-b37d7d804edd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:31 GMT' ]);
