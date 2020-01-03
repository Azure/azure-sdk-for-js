let nock = require('nock');

module.exports.testInfo = {"share":"share156816827526706933"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816827526706933')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:55 GMT',
  'ETag',
  '"0x8D7365E4206C495"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33acea97-e01a-005e-0d47-6895ff000000',
  'x-ms-client-request-id',
  '890f8c1b-26b9-4088-b975-36d3639fe89d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:55 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816827526706933')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c659b938-401a-0053-1747-687af3000000',
  'x-ms-client-request-id',
  'c04bd71e-47ae-40eb-a60c-7cbb0edf53fa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:55 GMT' ]);

