let nock = require('nock');

module.exports.testInfo = {"Dir empty":"Dir empty155873397597404922","Upper_another":"Upper_another155873397637203150"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155873397482109857/Dir%20empty155873397597404922')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:36 GMT',
  'ETag',
  '"0x8D6E0905118FC14"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1349aa83-a01a-0038-7679-12dc01000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:39:35 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155873397482109857/Dir%20empty155873397597404922/Upper_another155873397637203150')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:36 GMT',
  'ETag',
  '"0x8D6E090514D350C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3afd0f14-501a-004b-7d79-12acc2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:39:35 GMT',
  'Connection',
  'close' ]);

