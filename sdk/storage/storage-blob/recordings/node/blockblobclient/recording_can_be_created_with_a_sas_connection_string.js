let nock = require('nock');

module.exports.testInfo = {"container":"container156464896992506266","blob":"blob156464897021701999","randomstring":"randomstring156464897022002273"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156464896992506266')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:50 GMT',
  'ETag',
  '"0x8D7165C3C5C567B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3e706b1b-301e-00e1-4145-489de4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156464896992506266/blob156464897021701999', "randomstring156464897022002273")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '+0D15ck60EbGfdGG2BP6iQ==',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:50 GMT',
  'ETag',
  '"0x8D7165C3C8C4D5A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '79f6082c-401e-00c7-2e45-480650000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 01 Aug 2019 08:42:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156464896992506266/blob156464897021701999')
  .query(true)
  .reply(200, "randomstring156464897022002273", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '+0D15ck60EbGfdGG2BP6iQ==',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7165C3C8C4D5A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b16757b0-f01e-005d-4c45-488a95000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Thu, 01 Aug 2019 08:42:50 GMT',
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
  'Thu, 01 Aug 2019 08:42:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156464896992506266')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '098611af-001e-008f-0145-4834cd000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:50 GMT',
  'Connection',
  'close' ]);

