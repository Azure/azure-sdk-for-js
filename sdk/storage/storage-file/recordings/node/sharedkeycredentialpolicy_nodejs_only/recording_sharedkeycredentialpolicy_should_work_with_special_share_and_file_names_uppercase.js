let nock = require('nock');

module.exports.testInfo = {"Dir empty":"Dir empty155623279121206688","Upper_another":"Upper_another155623279167904593"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155623278963402641/Dir%20empty155623279121206688')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 22:53:11 GMT',
  'ETag',
  '"0x8D6C9D0CB052038"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b11d01ba-d01a-0037-07b9-fb31f7000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 22:53:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155623278963402641/Dir%20empty155623279121206688/Upper_another155623279167904593')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 22:53:12 GMT',
  'ETag',
  '"0x8D6C9D0CB48C53E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e834840c-d01a-005a-5cb9-fb9bd9000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 22:53:12 GMT',
  'Connection',
  'close' ]);
