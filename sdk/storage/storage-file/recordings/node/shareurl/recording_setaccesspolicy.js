let nock = require('nock');

module.exports.testInfo = {"share":"share155873397719801441","undefined":"2019-05-24T21:39:38.579Z"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873397719801441')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:38 GMT',
  'ETag',
  '"0x8D6E09052690E20"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '326d2129-101a-0021-6479-12f069000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:37 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873397719801441', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2019-05-23T21:39:38.5790000Z</Start><Expiry>2019-05-25T21:39:38.5790000Z</Expiry><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query({"restype":"share","comp":"acl"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:38 GMT',
  'ETag',
  '"0x8D6E09052E2467E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3264a943-301a-0097-3379-12fe91000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:38 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873397719801441')
  .query({"restype":"share","comp":"acl"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2019-05-23T21:39:38.5790000Z</Start><Expiry>2019-05-25T21:39:38.5790000Z</Expiry><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:38 GMT',
  'ETag',
  '"0x8D6E09052E2467E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81aafbd0-d01a-0096-3c79-12ff6c000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:39:38 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873397719801441')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e311012a-001a-0094-1a79-12fd96000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:39 GMT',
  'Connection',
  'close' ]);

