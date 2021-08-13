let nock = require('nock');

module.exports.hash = "37875148b252ee726c88bc2a83eb77da";

module.exports.testInfo = {"uniqueName":{"container":"container161070755896106476","newcontainer":"newcontainer161070755954806607"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container161070755896106476')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 15 Jan 2021 10:45:59 GMT',
  'ETag',
  '"0x8D8B942BEA89BE0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '752f960d-e01e-0006-122b-eb1631000000',
  'x-ms-client-request-id',
  '5b30954c-efb0-4903-b2e9-eb075781bd20',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 10:45:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container161070755896106476')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 15 Jan 2021 10:45:59 GMT',
  'ETag',
  '"0x8D8B942BEA89BE0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '752f960f-e01e-0006-132b-eb1631000000',
  'x-ms-client-request-id',
  'aaa30355-74a1-4971-acb5-5a4d4b0afba9',
  'x-ms-version',
  '2020-04-08',
  'x-ms-lease-id',
  '7fd19989-c589-4692-9987-89c1d9810707',
  'Date',
  'Fri, 15 Jan 2021 10:45:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/newcontainer161070755954806607')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '752f9611-e01e-0006-152b-eb1631000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '39f888a2-ec87-4447-9477-7f00b6c28b7a',
  'Date',
  'Fri, 15 Jan 2021 10:45:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/newcontainer161070755954806607')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 15 Jan 2021 10:45:59 GMT',
  'ETag',
  '"0x8D8B942BF02A13A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '752f961a-e01e-0006-1a2b-eb1631000000',
  'x-ms-client-request-id',
  'cee68dac-bce4-44b1-a5b4-a11320d50211',
  'x-ms-version',
  '2020-04-08',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Jan 2021 10:45:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/newcontainer161070755954806607')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '752f9623-e01e-0006-1f2b-eb1631000000',
  'x-ms-client-request-id',
  '7acf59d3-107e-4308-a3c6-91994216d2cb',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 10:45:59 GMT'
]);
