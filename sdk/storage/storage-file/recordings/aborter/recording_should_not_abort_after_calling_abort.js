let nock = require('nock');

module.exports.testInfo = {"share":"share155613590908408462"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613590908408462')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 19:58:29 GMT',
  'ETag',
  '"0x8D6C8EF38D825BA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89858348-601a-000c-30d8-fa73a9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 19:58:29 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613590908408462')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0fc2219-501a-004b-05d8-faacc2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 19:58:29 GMT',
  'Connection',
  'close' ]);
