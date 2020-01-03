let nock = require('nock');

module.exports.testInfo = {"share":"share156816844883901480"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816844883901480')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:49 GMT',
  'ETag',
  '"0x8D7365EA953F3F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34cc92d3-601a-004f-7f47-68a2e4000000',
  'x-ms-client-request-id',
  'bf877642-5153-4297-8217-2b2d1e5fe68e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:48 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816844883901480')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '859541c3-901a-0015-3347-68a465000000',
  'x-ms-client-request-id',
  '1ce96311-4523-4f32-8179-5e71cbe3e006',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:52 GMT' ]);

