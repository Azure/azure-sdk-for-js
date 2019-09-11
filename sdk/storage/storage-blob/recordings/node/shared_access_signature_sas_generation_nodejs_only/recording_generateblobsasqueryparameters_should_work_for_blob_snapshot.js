let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-11T02:25:42.646Z","tmr":"2019-09-11T02:25:42.646Z","container":"container156816874264607343","blob":"blob156816874306308978"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816874264607343')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:25:42 GMT',
  'ETag',
  '"0x8D7365F5872B714"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '478f6f58-701e-0014-0c48-68a598000000',
  'x-ms-client-request-id',
  '97d9ef7a-8151-4ba2-b44a-325396065be0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:25:42 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816874264607343/blob156816874306308978')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:25:43 GMT',
  'ETag',
  '"0x8D7365F58B2BA69"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9adb819-a01e-0016-4a48-68a762000000',
  'x-ms-client-request-id',
  '8ba9c0c3-851f-4c6a-954d-6531eca87982',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:25:42 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816874264607343/blob156816874306308978')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:25:43 GMT',
  'ETag',
  '"0x8D7365F58B2BA69"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '63d294bd-601e-0000-5448-6866fc000000',
  'x-ms-client-request-id',
  '18376899-ce1c-48ac-a939-f31e559c0cdf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-11T02:25:43.8278624Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:25:42 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156816874264607343/blob156816874306308978')
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
  'Wed, 11 Sep 2019 02:25:43 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365F58B2BA69"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ec4b67e-601e-004f-7748-68a2e4000000',
  'x-ms-client-request-id',
  '6bdcdc67-0bff-40d3-b799-bbc7a963bcba',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-11T02:25:43.8278624Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:25:43 GMT',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:25:43 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816874264607343')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df1a6102-401e-0058-2448-686287000000',
  'x-ms-client-request-id',
  'a943e090-326c-4827-8a35-acd19bbc6c76',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:25:44 GMT' ]);

