let nock = require('nock');

module.exports.testInfo = {"now":"2019-08-15T08:37:57.156Z","tmr":"2019-08-15T08:37:57.156Z","container":"container156585827715609253","blob":"blob156585827742101407"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585827715609253')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:59 GMT',
  'ETag',
  '"0x8D7215B5198A1FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'edd99e92-301e-002f-7b44-53bfac000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:33:58 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585827715609253/blob156585827742101407')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:59 GMT',
  'ETag',
  '"0x8D7215B51C10481"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '333177c4-b01e-00db-1f44-539a40000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 15 Aug 2019 08:33:59 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585827715609253/blob156585827742101407')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:59 GMT',
  'ETag',
  '"0x8D7215B51C10481"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d51d855-a01e-00a2-1c44-53f30a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-08-15T08:33:59.6211051Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 15 Aug 2019 08:33:58 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156585827715609253/blob156585827742101407')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
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
  'Thu, 15 Aug 2019 08:33:59 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7215B51C10481"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54aa1fd2-501e-013b-6544-533a9d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-08-15T08:33:59.6211051Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Thu, 15 Aug 2019 08:33:59 GMT',
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
  'Thu, 15 Aug 2019 08:33:59 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156585827715609253')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cbdce0df-601e-0133-0e44-5321ee000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:33:59 GMT',
  'Connection',
  'close'
]);

