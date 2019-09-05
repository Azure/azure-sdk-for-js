let nock = require('nock');

module.exports.testInfo = {"share":"share156775317234708608","dir":"dir156775317279703108"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775317234708608')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:32 GMT',
  'ETag',
  '"0x8D73297C538C480"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd78bc0cf-401a-0059-3580-647000000000',
  'x-ms-client-request-id',
  '1d067a62-433a-478f-936b-b0e4ed1b4537',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775317234708608/dir156775317279703108')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:33 GMT',
  'ETag',
  '"0x8D73297C57939FB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f874f32-701a-00b6-5180-6485f5000000',
  'x-ms-client-request-id',
  '1568a1b2-d15a-4360-9b5c-b325f3a45ab1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:33.0721275Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:33.0721275Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:33.0721275Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 06:59:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775317234708608/dir156775317279703108')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58b16019-e01a-0050-2180-6435d3000000',
  'x-ms-client-request-id',
  '9abfa4d3-5667-4034-ac14-121c0cbc7a15',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Fri, 06 Sep 2019 06:59:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775317234708608')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b92df799-501a-006a-2880-642fab000000',
  'x-ms-client-request-id',
  '536d2807-c19e-4f02-b94d-83f9e9793278',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:33 GMT',
  'Connection',
  'close' ]);

