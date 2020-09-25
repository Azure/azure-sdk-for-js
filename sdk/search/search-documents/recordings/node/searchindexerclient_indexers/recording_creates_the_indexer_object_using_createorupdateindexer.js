let nock = require('nock');

module.exports.hash = "859bed79211475b15899667b42127932";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-3%27)', {"name":"my-azure-indexer-3","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","targetIndexName":"hotel-live-test2","disabled":false})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexers/$entity","@odata.etag":"\"0x8D8612BE82349E5\"","name":"my-azure-indexer-3","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","skillsetName":null,"targetIndexName":"hotel-live-test2","disabled":false,"schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8612BE82349E5"',
  'Location',
  'https://endpoint/indexers(\'my-azure-indexer-3\')?api-version=2020-06-30',
  'request-id',
  'f9353047-7dc7-49e0-9c12-543a7ad9f0d1',
  'elapsed-time',
  '1085',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:20:48 GMT',
  'Content-Length',
  '412' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3834f77f79e9c1eecdddb7f787afff7fd885a2db3454e5f2faeb7b31faceb7c5b016ddfa3ef667933ad8b555b544b6af2d4fd959e5775fa3a5bacca3c3d9317d09cba7b5dadeb69fec202c567db0d7fb8bd4b6d9ab7455936792b2d96ebb21c7dd466f545de321cf9f8a379d5e6e576595ce6dba0c21ebd382b9a6c52e6b38f1e9d670480204de7f96c5d527381b2ca6a7ab9cdebc67c725ee4e5ec8b6cb52a9617f4e1f7be3ffaa85ab7ab75fbacff45be9cd6d73cb6df2bbf1600bfe4ff01e045d1099c010000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8612BE82349E5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '709556ff-d405-4c6f-82c1-e3ac17913443',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:20:48 GMT',
  'Content-Length',
  '397' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/indexers(%27my-azure-indexer-3%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '1b49a0bf-034f-462e-9f27-22e3e1c4f87a',
  'elapsed-time',
  '96',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:20:48 GMT' ]);
