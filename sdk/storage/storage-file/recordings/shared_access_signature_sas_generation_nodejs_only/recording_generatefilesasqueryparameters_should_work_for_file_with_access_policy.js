let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-04-25T01:10:02.606Z","share":"share155615460260606899","dir":"dir155615460377200945","file":"file155615460418604946"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615460260606899')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 01:10:03 GMT',
  'ETag',
  '"0x8D6C91ABF595FAE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a87bd807-101a-0003-2703-fb9e5f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 01:10:02 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615460260606899/dir155615460377200945')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 01:10:04 GMT',
  'ETag',
  '"0x8D6C91ABFAABD0B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2fdcfaea-a01a-0033-2b03-fbc475000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 01:10:03 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615460260606899/dir155615460377200945/file155615460418604946')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 01:10:04 GMT',
  'ETag',
  '"0x8D6C91ABFEC65C9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb16a29-d01a-0073-5203-fbed9b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 01:10:04 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615460260606899', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-04-25T01:05:02.6060000Z</Start><Expiry>2019-04-26T01:10:02.6060000Z</Expiry><Permission>rcwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query({"restype":"share","comp":"acl"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 01:10:05 GMT',
  'ETag',
  '"0x8D6C91AC04319B9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3335a2c-101a-002a-6803-fbe81d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 01:10:04 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155615460260606899/')
  .query({"sv":"2018-03-28","si":"unique-id","sr":"s","sig":"QXesr2iQXYgjFw4cPiavcGEWy8xDp5qH2EV9VpAJO%2FI%3D","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155615460260606899\" DirectoryPath=\"\"><Entries><Directory><Name>dir155615460377200945</Name><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5999120c-e01a-0016-4703-fb5cc6000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Apr 2019 01:10:05 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155615460260606899')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c043bcf4-901a-0091-3b03-fb09e9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 01:10:05 GMT',
  'Connection',
  'close' ]);
