let nock = require('nock');

module.exports.testInfo = {"share":"share156816854575704550"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816854575704550')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:26 GMT',
  'ETag',
  '"0x8D7365EE3172551"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e1ba799-001a-0010-4447-68501a000000',
  'x-ms-client-request-id',
  'eba3cb7e-e94d-4b3a-be49-be451531bfcb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:25 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816854575704550')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d851187-301a-005c-3e47-689705000000',
  'x-ms-client-request-id',
  'cf453b94-ba74-45f8-a84b-4ba31f679a08',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:25 GMT' ]);

