let nock = require('nock');

module.exports.hash = "0b07a3169231140ac7e2b96b5790014e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3834ff7f61f9c3c393efdf4e9f1eeeffb11b55a668b9cbe5e5c6f673f58d7f9b602dadea5ef667933ad8b555b544b6af2d4fd959e5775fa3a5bacca3c3d9317d09cba7b5dadeb69fec202c567db0d7fc8209bb7455936792b2d96ebb21c7dd466f545de321cf9f8a379d5e6e576595ce6dba0c21ebd382b9a6c52e6b38f1e9d670480204de7f96c5d527381b2ca6a7ab9cdebc67c725ee4e5ec8b6cb52a9617f4e1f7be3ffaa85ab7ab75fbacff45be9cd6d73cb6df2bbf1600bfe4ff013bb0b3a79c010000"], [ 'Cache-Control',
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
  'W/"0x8D86247CBAE6DA1"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'd3b277e8-f078-4b9e-bc10-773223ef9219',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:12:58 GMT',
  'Content-Length',
  '395' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-1%27)', {"name":"my-azure-indexer-1","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","skillsetName":null,"targetIndexName":"hotel-live-test2","schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"disabled":true,"@odata.etag":"\"0x8D86247CBAE6DA1\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3834ff7f61f9c9cdc3f7eba7770fafb7e44ad96d922a7af17d7dbd90fd675bead80b677e9bb59de4ceb62d516d5929a3c757fa5e7559dbece16ab324fcfe40534a7ee5e57eb7a9abfb040f1d976c31f32c8e66d51964dde4a8be5ba2c471fb5597d91b70c473efe685eb579b95d1697f936a8b0472fce8a269b94f9eca3476dbdce09d0749ecfd625b51620abaca677dbbc6ecc27e7455ecebec856ab6279411f7eeffba38faa75bb5ab7cffa5fe4cb697dcd43fbbdf26b01f04bfe1f6b0c6c549b010000"], [ 'Cache-Control',
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
  'W/"0x8D86247CC5AD28E"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '66126285-6c03-4feb-bca6-a15f233e4c7f',
  'elapsed-time',
  '46',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:12:58 GMT',
  'Content-Length',
  '394' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3834ff7f61f9c9cdc3f7eba7770fafb7e44ad96d922a7af17d7dbd90fd675bead80b677e9bb59de4ceb62d516d5929a3c757fa5e7559dbece16ab324fcfe40534a7ee5e57eb7a9abfb040f1d976c31f32c8e66d51964dde4a8be5ba2c471fb5597d91b70c473efe685eb579b95d1697f936a8b0472fce8a269b94f9eca3476dbdce09d0749ecfd625b51620abaca677dbbc6ecc27e7455ecebec856ab6279411f7eeffba38faa75bb5ab7cffa5fe4cb697dcd43fbbdf26b01f04bfe1f6b0c6c549b010000"], [ 'Cache-Control',
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
  'W/"0x8D86247CC5AD28E"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'f1bb0a4f-8310-4c1f-ad59-25ee9f827a66',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:12:58 GMT',
  'Content-Length',
  '394' ]);
