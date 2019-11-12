let nock = require('nock');

module.exports.testInfo = {"share":"share156816845671700888"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816845671700888')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:57 GMT',
  'ETag',
  '"0x8D7365EAE0532F3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcc18c4b-b01a-0064-1a47-68d65c000000',
  'x-ms-client-request-id',
  'ecaa2570-c0b3-47fe-87be-edf5b8e5f79d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816845671700888')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19b157c2-e01a-0038-0947-6827a5000000',
  'x-ms-client-request-id',
  '508fa04a-0bcb-49d5-91b9-25008d9066ec',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:56 GMT' ]);

