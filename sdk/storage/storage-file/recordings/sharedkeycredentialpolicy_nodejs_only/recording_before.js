let nock = require('nock');

module.exports.testInfo = {}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155621625926903470')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 18:17:40 GMT',
  'ETag',
  '"0x8D6C9AA4D995C1C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '281c0e54-601a-0061-4b93-fbd987000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 18:17:39 GMT',
  'Connection',
  'close' ]);
