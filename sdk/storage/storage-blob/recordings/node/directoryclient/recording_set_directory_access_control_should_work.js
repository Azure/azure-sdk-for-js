let nock = require('nock');

module.exports.testInfo = {"container":"container156929889098600403","directory":"directory156929889213703972"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929889098600403')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:17:09 GMT',
  'ETag',
  '"0x8D740A6111772D5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dac4b23-001e-0069-338e-721a32000000',
  'x-ms-client-request-id',
  'e2a52ac3-b0d3-4810-9e94-cdd3005c299e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:17:09 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929889098600403/directory156929889213703972')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:10 GMT',
  'ETag',
  '"0x8D740A611C66E80"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '466553eb-401f-0065-0d8e-72f4c3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e6f2c20b-a525-43bc-911d-3be7eb51135f',
  'Date',
  'Tue, 24 Sep 2019 04:17:10 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929889098600403/directory156929889213703972')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:10 GMT',
  'ETag',
  '"0x8D740A611C66E80"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'a562fc0d-901f-000a-178e-725c17000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '07c913b5-c569-41ae-ac1e-286b3f1b5c0a',
  'Date',
  'Tue, 24 Sep 2019 04:17:10 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929889098600403/directory156929889213703972')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:10 GMT',
  'ETag',
  '"0x8D740A611C66E80"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  '1e30a30b-601f-0050-2f8e-725a96000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '822600d6-b74a-4dff-a372-204bc03fd4d7',
  'Date',
  'Tue, 24 Sep 2019 04:17:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929889098600403')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e67ea97-f01e-0055-0b8e-72aee9000000',
  'x-ms-client-request-id',
  'c7264d48-937b-4a1e-8efa-504362018e77',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:17:13 GMT' ]);
