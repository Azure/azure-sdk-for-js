let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-30T22:41:13.656Z","tmr":"2019-04-30T22:41:13.656Z","container":"container155666407365609487","blob":"blob155666407406309804"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155666407365609487')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:41:14 GMT',
  'ETag',
  '"0x8D6CDBCF3620F24"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd435e4a2-301e-0072-30a5-ffec66000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:41:13 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155666407365609487/blob155666407406309804')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:41:14 GMT',
  'ETag',
  '"0x8D6CDBCF39FDC09"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd267fdbd-e01e-0052-68a5-ff80aa000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 30 Apr 2019 22:41:13 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155666407365609487', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-04-30T22:36:13.6560000Z</Start><Expiry>2019-05-01T22:41:13.6560000Z</Expiry><Permission>racwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query({"restype":"container","comp":"acl"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:41:14 GMT',
  'ETag',
  '"0x8D6CDBCF3DE8FA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a67a2a7-001e-0058-61a5-ff9923000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:41:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container155666407365609487/blob155666407406309804')
  .query({"sv":"2018-03-28","si":"unique-id","sr":"c","sig":"LAd88SvszwFgVX0%2FIwmtBnXQvUZ%2F4ADvbJ0vrmQyMY8%3D"})
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:41:14 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6CDBCF39FDC09"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51eb84ce-f01e-0020-7da5-fff194000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Tue, 30 Apr 2019 22:41:14 GMT',
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
  'Tue, 30 Apr 2019 22:41:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155666407365609487')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4b33872-d01e-0078-2ea5-fff5ef000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:41:15 GMT',
  'Connection',
  'close' ]);

