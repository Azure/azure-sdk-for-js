let nock = require('nock');

module.exports.hash = "960b1954f045eab828b6f040466a7b15";

module.exports.testInfo = {"uniqueName":{"share":"share166564473140200569","dir":"dir166564473192802753","dir1":"dir1166564473206404477","dir2":"dir2166564473206402249"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166564473140200569')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:31 GMT',
  'ETag',
  '"0x8DAACE9515EA452"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d886c-001a-0086-1cd2-ded999000000',
  'x-ms-client-request-id',
  '266f1af6-15b0-4b68-8614-08be8ec47028',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 13 Oct 2022 07:05:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166564473140200569/dir166564473192802753')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE95175A4B1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d887e-001a-0086-1dd2-ded999000000',
  'x-ms-client-request-id',
  'bd2b918e-2463-470c-bfbc-4c9e926e3ae2',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-13T07:05:32.0368305Z',
  'x-ms-file-last-write-time',
  '2022-10-13T07:05:32.0368305Z',
  'x-ms-file-creation-time',
  '2022-10-13T07:05:32.0368305Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 07:05:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166564473140200569/dir166564473192802753/dir1166564473206404477')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE951870771"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d8882-001a-0086-1fd2-ded999000000',
  'x-ms-client-request-id',
  '63dd9cbc-34ad-4364-87fc-639111441ea9',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-13T07:05:32.1507697Z',
  'x-ms-file-last-write-time',
  '2022-10-13T07:05:32.1507697Z',
  'x-ms-file-creation-time',
  '2022-10-13T07:05:32.1507697Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 07:05:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166564473140200569/dir166564473192802753/dir1166564473206404477/dir2166564473206402249')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE95197F51A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d8884-001a-0086-20d2-ded999000000',
  'x-ms-client-request-id',
  '42f345d1-836e-4eca-ab0c-550b77040289',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-13T07:05:32.2617114Z',
  'x-ms-file-last-write-time',
  '2022-10-13T07:05:32.2617114Z',
  'x-ms-file-creation-time',
  '2022-10-13T07:05:32.2617114Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 07:05:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share166564473140200569/dir166564473192802753/dir1166564473206404477/dir2166564473206402249')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE95197F51A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d8885-001a-0086-21d2-ded999000000',
  'x-ms-client-request-id',
  '3783729b-085b-4dcb-ba21-a7e7cb232449',
  'x-ms-version',
  '2021-08-06',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2022-10-13T07:05:32.2617114Z',
  'x-ms-file-last-write-time',
  '2022-10-13T07:05:32.2617114Z',
  'x-ms-file-creation-time',
  '2022-10-13T07:05:32.2617114Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Oct 2022 07:05:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166564473140200569')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d8886-001a-0086-22d2-ded999000000',
  'x-ms-client-request-id',
  'cfaf2e90-00ca-4400-9c33-ec47156d107d',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 13 Oct 2022 07:05:31 GMT'
]);
