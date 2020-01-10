let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534997142001375","file":"file157534997259909453"},"newDate":{"now":"2019-12-03T05:12:51.420Z","tmr":"2019-12-03T05:12:51.420Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534997142001375')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:06:54 GMT',
  'ETag',
  '"0x8D777AE9D2ADE47"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24f26c6c-301e-00a6-5097-a97d80000000',
  'x-ms-client-request-id',
  '9cf29eca-3f85-4910-9198-bdcce0174319',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:53 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534997142001375/file157534997259909453')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 05:06:55 GMT',
  'ETag',
  '"0x8D777AE9DFC7BDF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '20123d48-c01f-007f-7697-a9dbac000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b4482de2-0aa7-404a-99ce-9b64a188c891',
  'Date',
  'Tue, 03 Dec 2019 05:06:54 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534997142001375/file157534997259909453')
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
  'Tue, 03 Dec 2019 05:06:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777AE9DFC7BDF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dedd24a5-701e-004f-1497-a98186000000',
  'x-ms-client-request-id',
  '66bfaec0-b6a7-4980-aa48-1968e620e45b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 05:06:55 GMT',
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
  'Tue, 03 Dec 2019 05:06:55 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534997142001375')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24f272fa-301e-00a6-6197-a97d80000000',
  'x-ms-client-request-id',
  '4a553fbf-680e-4c7c-abd2-48dab059958d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:56 GMT' ]);
