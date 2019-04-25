let nock = require('nock');

module.exports.testInfo = {"Dir empty":"Dir empty155621626139609029","Upper_another":"Upper_another155621626180800273"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155621625926903470/Dir%20empty155621626139609029')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 18:17:41 GMT',
  'ETag',
  '"0x8D6C9AA4E7771EA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '621236c1-701a-0057-5e93-fb74d5000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 18:17:41 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155621625926903470/Dir%20empty155621626139609029/Upper_another155621626180800273')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 18:17:42 GMT',
  'ETag',
  '"0x8D6C9AA4EB5709D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b3d9a06-e01a-007b-4f93-fbf6e8000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 18:17:41 GMT',
  'Connection',
  'close' ]);
