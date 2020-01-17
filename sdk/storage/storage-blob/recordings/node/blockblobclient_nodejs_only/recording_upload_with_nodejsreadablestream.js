let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157929492686605862","blob":"blob157929492711401410","randomstring":"randomstring157929492711606413"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157929492686605862')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 17 Jan 2020 21:02:06 GMT',
  'ETag',
  '"0x8D79B9082E162E0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5902e04-001e-00b5-3879-cd3d89000000',
  'x-ms-client-request-id',
  'd27ee472-2f16-405c-9508-7b96d90aca5d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 17 Jan 2020 21:02:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157929492686605862/blob157929492711401410', "randomstring157929492711606413")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'E6QYM3Ck4a2WTpPAUKiA6Q==',
  'Last-Modified',
  'Fri, 17 Jan 2020 21:02:07 GMT',
  'ETag',
  '"0x8D79B9082F4C56B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74ac324d-501e-0108-2079-cd6d50000000',
  'x-ms-client-request-id',
  '7c93a87e-2914-4960-839f-865148669f6d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'ydLFdntcmC4=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 17 Jan 2020 21:02:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157929492686605862/blob157929492711401410')
  .reply(200, "randomstring157929492711606413", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'E6QYM3Ck4a2WTpPAUKiA6Q==',
  'Last-Modified',
  'Fri, 17 Jan 2020 21:02:07 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D79B9082F4C56B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f826d3b9-201e-0125-4079-cdee90000000',
  'x-ms-client-request-id',
  'e92b8312-0809-450c-a6ce-0eb182cfede9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Fri, 17 Jan 2020 21:02:07 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 17 Jan 2020 21:02:07 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157929492686605862')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5902ead-001e-00b5-5279-cd3d89000000',
  'x-ms-client-request-id',
  'f33b6c4e-bbbb-4a9a-b922-bce94a688d5b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 17 Jan 2020 21:02:07 GMT' ]);
