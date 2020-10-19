let nock = require('nock');

module.exports.hash = "4038737563cbb5fb3335adf53fbfa413";

module.exports.testInfo = {"uniqueName":{"share":"share160121914876904135"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914876904135')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:48 GMT',
  'ETag',
  '"0x8D862F6D17F787B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19dc-701a-006b-1edf-94e952000000',
  'x-ms-client-request-id',
  'ae80488d-3b36-4e8b-9e6d-1c28a0f047ce',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914876904135')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:48 GMT',
  'ETag',
  '"0x8D862F6D17F787B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293414-d01a-0000-0fdf-946ea6000000',
  'x-ms-client-request-id',
  '1ff85c8e-bf37-4dd6-bddc-036fece28e97',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  '738a5822-ff90-4d03-aab4-136fb410dacc',
  'Date',
  'Sun, 27 Sep 2020 15:05:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914876904135')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:48 GMT',
  'ETag',
  '"0x8D862F6D17F787B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19e0-701a-006b-20df-94e952000000',
  'x-ms-client-request-id',
  '68bf8427-ad12-472c-81ac-fddd984d9bd9',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sun, 27 Sep 2020 15:05:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914876904135')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:48 GMT',
  'ETag',
  '"0x8D862F6D17F787B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293418-d01a-0000-11df-946ea6000000',
  'x-ms-client-request-id',
  '2903d1bc-f799-46b4-a7d2-535149d3f19d',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121914876904135')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19e3-701a-006b-22df-94e952000000',
  'x-ms-client-request-id',
  '5362f1cd-c428-4409-951a-2620988fc3cd',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:49 GMT'
]);
