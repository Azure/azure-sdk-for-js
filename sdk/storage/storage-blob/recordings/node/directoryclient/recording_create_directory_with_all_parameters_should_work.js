let nock = require('nock');

module.exports.testInfo = {"container":"container157113268138102875","directory":"directory157113268254609350"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113268138102875')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:39:47 GMT',
  'ETag',
  '"0x8D751539E6338F2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26726a26-501e-00b6-4d3c-834b66000000',
  'x-ms-client-request-id',
  '375c233d-67ab-4911-b93f-4494bac38703',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:39:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113268138102875/directory157113268254609350')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:39:48 GMT',
  'ETag',
  '"0x8D751539F15F313"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '370ea339-f01f-0038-463c-8304c7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e673bdaf-85e1-4fd0-8365-a76244b714e2',
  'Date',
  'Tue, 15 Oct 2019 09:39:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113268138102875/directory157113268254609350')
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
  'Tue, 15 Oct 2019 09:39:48 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D751539F15F313"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d7b2d9a-901e-0001-3c3c-834463000000',
  'x-ms-client-request-id',
  '58c89a56-b4d1-4692-b98e-7836789d965f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-meta-prop1',
  'val1',
  'x-ms-meta-prop2',
  'val2',
  'x-ms-creation-time',
  'Tue, 15 Oct 2019 09:39:48 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-hdi_isfolder,x-ms-meta-prop1,x-ms-meta-prop2,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 15 Oct 2019 09:39:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113268138102875/directory157113268254609350')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:39:48 GMT',
  'ETag',
  '"0x8D751539F15F313"',
  'Vary',
  'Origin',
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
  '8f18b203-a01f-004d-083c-83837c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '09e9b89f-49ae-453e-8ad5-e2a5e750d1d3',
  'Date',
  'Tue, 15 Oct 2019 09:39:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113268138102875')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62fd4349-301e-0061-4f3c-830141000000',
  'x-ms-client-request-id',
  'b2699dcc-6581-45c3-af24-25a344b7ce0b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:39:51 GMT',
  'Connection',
  'close' ]);

