let nock = require('nock');

module.exports.testInfo = {"share":"share157362321828907557"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157362321828907557')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 13 Nov 2019 05:33:38 GMT',
  'ETag',
  '"0x8D767FB096BC2FE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbda203e-a01a-0052-59e3-997b0e000000',
  'x-ms-client-request-id',
  '6132b7dc-3e1f-4aa7-aead-eff04eed37b4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 13 Nov 2019 05:33:38 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157362321828907557/test0')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 13 Nov 2019 05:33:39 GMT',
  'ETag',
  '"0x8D767FB09A9660B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7501327a-f01a-004a-59e3-99569b000000',
  'x-ms-client-request-id',
  'b5fee73b-1dfe-46b6-bc1e-ee7ebcd8a3a1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-13T05:33:39.2763403Z',
  'x-ms-file-last-write-time',
  '2019-11-13T05:33:39.2763403Z',
  'x-ms-file-creation-time',
  '2019-11-13T05:33:39.2763403Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 13 Nov 2019 05:33:38 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157362321828907557')
  .query(true)
  .reply(200, {"permission":"O:SYG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;SY)(A;OICIIO;GA;;;CO)"}, [ 'Content-Length',
  '149',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbda2041-a01a-0052-5ae3-997b0e000000',
  'x-ms-client-request-id',
  '169f81fd-291b-41ac-a130-2ecd83972617',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 13 Nov 2019 05:33:39 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157362321828907557', {"permission":"O:SYG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;SY)(A;OICIIO;GA;;;CO)"})
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbda2042-a01a-0052-5be3-997b0e000000',
  'x-ms-client-request-id',
  '6ff13dcf-b613-4a51-a0e4-a99463933f92',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-permission-key',
  '8681810064597988261*13609941760923454748',
  'Date',
  'Wed, 13 Nov 2019 05:33:39 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157362321828907557')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbda2043-a01a-0052-5ce3-997b0e000000',
  'x-ms-client-request-id',
  'ea57ae55-87ca-4087-a817-1028bf474871',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 13 Nov 2019 05:33:39 GMT' ]);
