let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534378298106699","dir":"dir157534378413306496"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534378298106699')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:23:45 GMT',
  'ETag',
  '"0x8D777A0348C7E41"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0e60daf-101e-0098-4389-a9cba1000000',
  'x-ms-client-request-id',
  '750c62ea-eb08-482f-9af9-2e73acf8dba9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:23:44 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534378298106699/dir157534378413306496')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:23:46 GMT',
  'ETag',
  '"0x8D777A0353D420A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb29bd64-201f-0057-5a89-a9ac13000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f534e6b8-2d7b-4d03-a7a4-9b62aba7cd89',
  'Date',
  'Tue, 03 Dec 2019 03:23:46 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534378298106699/dir157534378413306496')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:23:46 GMT',
  'ETag',
  '"0x8D777A0353D420A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ac114e9-d01e-0006-3389-a9b2e6000000',
  'x-ms-client-request-id',
  '0be392cb-81ee-4847-a73c-601c947f7a14',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Tue, 03 Dec 2019 03:23:47 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534378298106699/dir157534378413306496')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:23:46 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0353D420A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a200e80-d01e-0042-5289-a96e8a000000',
  'x-ms-client-request-id',
  'e44e0412-7413-4245-b03a-c5f28c482e26',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:23:46 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:23:48 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534378298106699/dir157534378413306496')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:23:46 GMT',
  'ETag',
  '"0x8D777A0353D420A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ac1180b-d01e-0006-0689-a9b2e6000000',
  'x-ms-client-request-id',
  '7e4da289-e70e-4093-94b0-0ff1380b6ceb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:23:48 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534378298106699')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0e61a44-101e-0098-1789-a9cba1000000',
  'x-ms-client-request-id',
  'c30713d9-efcc-4112-bcd0-9eb13d77ebac',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:23:48 GMT' ]);
