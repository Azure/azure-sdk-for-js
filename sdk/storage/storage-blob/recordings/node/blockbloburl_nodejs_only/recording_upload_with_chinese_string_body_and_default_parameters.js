let nock = require('nock');

module.exports.testInfo = {"container":"container156776210463507433","blob":"blob156776210503600547","randomstring你好":"randomstring你好156776210503709498"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776210463507433')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:24 GMT',
  'ETag',
  '"0x8D732AC91465C86"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26ff3cec-a01e-001c-2695-64a5e3000000',
  'x-ms-client-request-id',
  'a2459eac-51fd-44f2-a550-d738d22c5f50',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776210463507433/blob156776210503600547', "randomstring你好156776210503709498")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'xi/C+4C+wfyKwq3FaheIsg==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:25 GMT',
  'ETag',
  '"0x8D732AC9182E457"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c397ca39-001e-0048-6495-64eab4000000',
  'x-ms-client-request-id',
  '1666d059-dc40-4af6-98be-b45deefb6237',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '1qJM8B1e84A=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:28:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776210463507433/blob156776210503600547')
  .reply(200, "randomstring你好156776210503709498", [ 'Content-Length',
  '36',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'xi/C+4C+wfyKwq3FaheIsg==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:25 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732AC9182E457"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '879a6144-d01e-005b-6895-64ceb8000000',
  'x-ms-client-request-id',
  '6411f61e-a8b2-4564-9658-dca9dae521d9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:28:25 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:28:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776210463507433')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a900510-d01e-00dd-3b95-640201000000',
  'x-ms-client-request-id',
  'fbd5e165-c955-4446-b484-2f7bb277cf01',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:25 GMT',
  'Connection',
  'close' ]);

