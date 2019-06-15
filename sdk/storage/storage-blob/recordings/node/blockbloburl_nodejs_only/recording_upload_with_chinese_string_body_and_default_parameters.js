let nock = require('nock');

module.exports.testInfo = {"container":"container155873894801708234","blob":"blob155873894842606202","randomstring你好":"randomstring你好155873894842701585"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873894801708234')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:28 GMT',
  'ETag',
  '"0x8D6E09BE4ADA5C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '038848b4-301e-0097-6c84-12fe91000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:02:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873894801708234/blob155873894842606202', "randomstring你好155873894842701585")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'K3XYMPmHaww81TPNvfkdJg==',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:28 GMT',
  'ETag',
  '"0x8D6E09BE4ED1519"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'edf31972-901e-007f-6d84-12036a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:02:28 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873894801708234/blob155873894842606202')
  .reply(200, "randomstring你好155873894842701585", [ 'Content-Length',
  '36',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'K3XYMPmHaww81TPNvfkdJg==',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:28 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09BE4ED1519"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd9c9211-a01e-007c-1084-12006d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 23:02:28 GMT',
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
  'Fri, 24 May 2019 23:02:28 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873894801708234')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e8e9e135-d01e-0078-1184-12f5ef000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:02:28 GMT',
  'Connection',
  'close' ]);

