let nock = require('nock');

module.exports.testInfo = {"now":"2019-07-05T09:25:32.909Z","tmr":"2019-07-05T09:25:32.909Z","container":"container156231873290908991","blob":"blob156231873318106654"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231873290908991')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:13 GMT',
  'ETag',
  '"0x8D7012A440A600A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93f40837-401e-0106-6413-338fbb000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:22:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231873290908991/blob156231873318106654')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:14 GMT',
  'ETag',
  '"0x8D7012A44346A96"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b90e8e8-e01e-002d-1d13-33bd56000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:22:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231873290908991/blob156231873318106654')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:14 GMT',
  'ETag',
  '"0x8D7012A44346A96"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03b91173-001e-00a4-3f13-330472000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-07-05T09:22:14.3656656Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:22:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156231873290908991/blob156231873318106654')
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
  'Fri, 05 Jul 2019 09:22:14 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7012A44346A96"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9a55094-501e-0112-3713-334cdf000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-07-05T09:22:14.3656656Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:22:14 GMT',
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
  'x-ms-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:22:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231873290908991')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14ac3cd4-e01e-00ea-5e13-33c197000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:22:14 GMT',
  'Connection',
  'close' ]);

