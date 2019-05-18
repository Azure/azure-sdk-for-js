let nock = require('nock');

module.exports.testInfo = {"container":"container155666329760106367","blob":"blob155666329802006470","randomstring你好":"randomstring你好155666329802204001"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155666329760106367')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:28:17 GMT',
  'ETag',
  '"0x8D6CDBB24D131D7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '294488cc-b01e-0041-51a4-ffb54b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:28:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155666329760106367/blob155666329802006470', "randomstring你好155666329802204001")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ssRO/6UnkigVhnA8v28xjw==',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:28:18 GMT',
  'ETag',
  '"0x8D6CDBB25115FE7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '289771a3-001e-0071-11a4-ffef61000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 30 Apr 2019 22:28:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155666329760106367/blob155666329802006470')
  .reply(200, "randomstring你好155666329802204001", [ 'Content-Length',
  '36',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'ssRO/6UnkigVhnA8v28xjw==',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:28:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6CDBB25115FE7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '329362d7-c01e-004e-4ea4-ff58bd000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Tue, 30 Apr 2019 22:28:18 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 22:28:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155666329760106367')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '992e72f1-301e-003d-68a4-ff287e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:28:18 GMT',
  'Connection',
  'close' ]);

