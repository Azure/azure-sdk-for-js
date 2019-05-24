let nock = require('nock');

module.exports.testInfo = {"now":"2019-05-24T23:03:00.895Z","tmr":"2019-05-24T23:03:00.895Z","container":"container155873898089508352","blob":"blob155873898129400127"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873898089508352')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:03:00 GMT',
  'ETag',
  '"0x8D6E09BF844ECE9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bad72e85-d01e-0096-0884-12ff6c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:03:00 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873898089508352/blob155873898129400127')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:03:01 GMT',
  'ETag',
  '"0x8D6E09BF884D9D1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c276ce2f-501e-002d-2a84-121e98000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:03:00 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873898089508352', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-05-24T22:58:00.8950000Z</Start><Expiry>2019-05-25T23:03:00.8950000Z</Expiry><Permission>racwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query({"restype":"container","comp":"acl"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:03:01 GMT',
  'ETag',
  '"0x8D6E09BF8C19073"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0befc84-b01e-0063-4584-12db7d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:03:01 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container155873898089508352/blob155873898129400127')
  .query({"sv":"2018-03-28","si":"unique-id","sr":"c","sig":"QA0fYhFCd%2BrqRoqzSIXE2YAnXP6PzP4Ne4I73bxdVMU%3D"})
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 May 2019 23:03:01 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09BF884D9D1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c277b50d-801e-0049-3684-12ae38000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 23:03:01 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:03:01 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873898089508352')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'edf34f60-901e-007f-6a84-12036a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:03:01 GMT',
  'Connection',
  'close' ]);

