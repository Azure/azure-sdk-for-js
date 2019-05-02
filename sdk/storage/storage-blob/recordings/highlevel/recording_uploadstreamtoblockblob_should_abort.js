let nock = require('nock');

module.exports.testInfo = {"container":"container155683095640505223","blob":"blob155683095682404594"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155683095640505223')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 02 May 2019 21:02:36 GMT',
  'ETag',
  '"0x8D6CF41814164D4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3c3ac8f5-e01e-0034-0f2a-0132f0000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 02 May 2019 21:02:36 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155683095640505223')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed193563-201e-0000-582a-019d58000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 02 May 2019 21:02:36 GMT',
  'Connection',
  'close' ]);

