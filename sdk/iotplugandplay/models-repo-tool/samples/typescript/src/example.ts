// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Demonstrates resolving/obtaining a particular model definition from a remote model repository
 */

import * as resolver from '@azure/iot-modelsrepository-resolver'

const repositoryEndpoint = 'devicemodels.azure.com'
const dtmi = process.argv[2] || 'dtmi:azure:DeviceManagement:DeviceInformation;1'

console.log(repositoryEndpoint, dtmi)

async function main () {
  const result = await resolver.resolve(dtmi, repositoryEndpoint)
  console.log(result)
}

main().catch((err) => {
  console.error('The sample encountered an error:', err)
})
