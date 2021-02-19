// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict'

import * as dtmiConventions from './dtmiConventions'
import * as modelMetadata from './modelMetadata'
import { DTDL } from './DTDL'
import fs from 'fs'
import * as path from 'path'
import { flattenDtdlResponse } from './modelFetcherHelper'

async function recursiveFetcher (dtmi: string, directory: string, tryFromExpanded: boolean): Promise<{[x:string]: DTDL}> {
  let dependencyModels: {[x:string]: DTDL} = {}
  let fetchedModels: {[x: string]: DTDL }
  try {
    console.log(`Fetching: ${dtmi}`)
    fetchedModels = await fetcher(dtmi, directory, tryFromExpanded)
  } catch (error) {
    if (tryFromExpanded && error.code === 'ENOENT') {
      console.log('Fetching from expanded failed. Trying without.')
      fetchedModels = await fetcher(dtmi, directory, false)
    } else {
      throw error
    }
  }
  const dtmis = Object.keys(fetchedModels)
  for (let i = 0; i < dtmis.length; i++) {
    const currentDtdl = fetchedModels[dtmis[i]]
    const metaModelData = modelMetadata.getModelMetadata(currentDtdl)
    const deps = metaModelData.componentSchemas.concat(metaModelData.extends)
    if (deps && deps.length > 0) {
      for (let j = 0; j < deps.length; j++) {
        if (Object.keys(dependencyModels).includes(deps[j]) || Object.keys(fetchedModels).includes(deps[j])) {
          // do nothing
        } else {
          const fetchedDependencies = await recursiveFetcher(deps[j], directory, tryFromExpanded)
          dependencyModels = { ...dependencyModels, ...fetchedDependencies }
        }
      }
    }
  }
  if (Object.keys(dependencyModels).length > 0) {
    fetchedModels = { ...fetchedModels, ...dependencyModels }
  }
  return fetchedModels
}

async function fetcher (dtmi: string, directory: string, tryFromExpanded: boolean): Promise<{ [dtmi: string]: DTDL }> {
  const dtmiPath = dtmiConventions.dtmiToPath(dtmi)
  const dtmiPathFormatted = tryFromExpanded ? dtmiPath.replace('.json', '.expanded.json') : dtmiPath
  const targetPath = path.join(directory, dtmiPathFormatted)
  const dtdlFile = fs.readFileSync(targetPath, 'utf8')
  const parsedDtdl: DTDL | DTDL[] = JSON.parse(dtdlFile)
  if (Array.isArray(parsedDtdl)) {
    const result = flattenDtdlResponse(parsedDtdl as DTDL[])
    return result
  } else {
    const result = { [dtmi]: parsedDtdl as DTDL }
    return result
  }
}

export { fetcher, recursiveFetcher }
