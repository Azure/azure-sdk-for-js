let nock = require('nock');

module.exports.testInfo = {"share":"share157325702912607298"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157325702912607298')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 08 Nov 2019 23:50:29 GMT',
  'ETag',
  '"0x8D764A66F803912"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'acaaf6c3-301a-0073-2b8f-9627cc000000',
  'x-ms-client-request-id',
  '8b36b789-d117-4334-99aa-a31327431c0b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 08 Nov 2019 23:50:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157325702912607298')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'acaaf6c6-301a-0073-2c8f-9627cc000000',
  'x-ms-client-request-id',
  'e816dad9-585a-46de-87be-2736cd6f5201',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 08 Nov 2019 23:50:29 GMT'
]);
