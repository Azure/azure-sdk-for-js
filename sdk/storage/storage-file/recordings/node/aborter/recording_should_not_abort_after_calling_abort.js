let nock = require('nock');

module.exports.testInfo = {"share":"share156758470390004227"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758470390004227')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:44 GMT',
  'ETag',
  '"0x8D7310F8656C602"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '096d15ec-601a-00aa-66f8-62d795000000',
  'x-ms-client-request-id',
  'f92ec27e-f5be-43d3-ad3e-9877fa341787',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758470390004227')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0caa47a-701a-014d-64f8-62c662000000',
  'x-ms-client-request-id',
  '713a62ae-e3c1-44c1-9504-97af9e2c49cb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:44 GMT',
  'Connection',
  'close' ]);

