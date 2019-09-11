let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816839393100709"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816839393100709')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9a5218d-6003-0022-1e47-6808ca000000',
  'x-ms-client-request-id',
  '542a1bed-5d97-48f5-8c9a-4661fe99924a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:54 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816839393100709')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c9806d1f-6003-0000-4a47-6866fc000000',
  'x-ms-client-request-id',
  'e6d8053b-836e-4b99-8654-5d75499de914',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:54 GMT' ]);

