let nock = require('nock');

module.exports.hash = "9b7519af99da16e2a354b4a17184a010";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/range/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","reachableRange":{"center":{"latitude":50.97452,"longitude":5.86605},"boundary":[{"latitude":52.03715,"longitude":5.73477},{"latitude":52.08415,"longitude":5.59697},{"latitude":52.04443,"longitude":5.52563},{"latitude":51.94774,"longitude":5.37826},{"latitude":52.14076,"longitude":5.15791},{"latitude":52.12627,"longitude":5.01854},{"latitude":52.08066,"longitude":4.95975},{"latitude":51.83382,"longitude":4.73585},{"latitude":51.82313,"longitude":4.62683},{"latitude":51.64283,"longitude":4.39611},{"latitude":51.58383,"longitude":4.28928},{"latitude":51.48177,"longitude":3.87926},{"latitude":51.03359,"longitude":3.64115},{"latitude":50.83463,"longitude":3.99934},{"latitude":50.68658,"longitude":3.98163},{"latitude":50.46702,"longitude":3.9324},{"latitude":50.2967,"longitude":4.48246},{"latitude":50.21565,"longitude":4.6204},{"latitude":50.0975,"longitude":5.01501},{"latitude":50.09283,"longitude":5.02918},{"latitude":49.94517,"longitude":5.23621},{"latitude":49.88822,"longitude":5.36313},{"latitude":49.77322,"longitude":5.54862},{"latitude":49.86207,"longitude":5.72069},{"latitude":49.82696,"longitude":5.74609},{"latitude":50.02215,"longitude":5.88487},{"latitude":49.99854,"longitude":6.08625},{"latitude":50.0297,"longitude":6.10561},{"latitude":50.08942,"longitude":6.2758},{"latitude":49.91384,"longitude":6.53898},{"latitude":50.00492,"longitude":6.6107},{"latitude":49.9755,"longitude":6.82508},{"latitude":50.224,"longitude":6.65718},{"latitude":50.36904,"longitude":6.79277},{"latitude":50.19298,"longitude":7.58632},{"latitude":50.32964,"longitude":7.60718},{"latitude":50.48146,"longitude":7.75576},{"latitude":50.96323,"longitude":7.98195},{"latitude":51.067,"longitude":7.70357},{"latitude":51.38756,"longitude":7.72626},{"latitude":51.52843,"longitude":7.80865},{"latitude":51.64829,"longitude":7.33906},{"latitude":51.80999,"longitude":7.19671},{"latitude":51.92395,"longitude":7.03427},{"latitude":51.82713,"longitude":6.67268},{"latitude":51.81133,"longitude":6.48424},{"latitude":51.88711,"longitude":6.28151},{"latitude":51.91122,"longitude":6.15532},{"latitude":52.01699,"longitude":6.07666},{"latitude":52.13868,"longitude":5.98767}]}}, [
  'Cache-Control',
  'no-transform, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '2196',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 2754AFC968704DB98519AF1EB96DF50C Ref B: TPE30EDGE0618 Ref C: 2022-05-01T07:30:55Z',
  'Date',
  'Sun, 01 May 2022 07:30:55 GMT'
]);
