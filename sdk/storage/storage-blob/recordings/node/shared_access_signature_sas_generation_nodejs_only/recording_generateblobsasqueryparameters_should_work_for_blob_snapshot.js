let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-06T09:29:11.633Z","tmr":"2019-09-06T09:29:11.633Z","container":"container156776215163305120","blob":"blob156776215216201023"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776215163305120')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:12 GMT',
  'ETag',
  '"0x8D732ACAD5D602D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b93b7381-f01e-00ca-6d95-64ab0a000000',
  'x-ms-client-request-id',
  '8d10ede5-a6e0-4cda-9fa3-1e07baf1e207',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776215163305120/blob156776215216201023')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:12 GMT',
  'ETag',
  '"0x8D732ACAD9A316D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd15618c9-901e-0081-0a95-645759000000',
  'x-ms-client-request-id',
  'd9dbda40-d257-44b8-8316-f48bfd86f537',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:29:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776215163305120/blob156776215216201023')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:12 GMT',
  'ETag',
  '"0x8D732ACAD9A316D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9648ab08-e01e-0050-3595-6435d3000000',
  'x-ms-client-request-id',
  '8c7ea07d-3133-4dd6-9bd2-de5b9a4c2a48',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-06T09:29:12.8615695Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:29:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156776215163305120/blob156776215216201023')
  .query(true)
  .reply(200, [], [ 'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:12 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732ACAD9A316D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd2f92944-001e-00bc-5f95-642142000000',
  'x-ms-client-request-id',
  '7ccb1a38-13ee-40c0-9886-e09871a7d0d5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-06T09:29:12.8615695Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:29:12 GMT',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:29:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776215163305120')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a8e0c9d2-901e-0155-5295-641905000000',
  'x-ms-client-request-id',
  '921284d4-7a27-4648-b989-e892eea94752',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:13 GMT',
  'Connection',
  'close' ]);

