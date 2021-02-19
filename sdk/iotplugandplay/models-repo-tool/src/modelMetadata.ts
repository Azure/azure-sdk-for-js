// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict'

import { DTDL } from './DTDL'

function getId (input: DTDL): string {
  const idElement = input['@id']
  return idElement
}

function getExtends (input: DTDL): string {
  const extendElement = input.extends
  return extendElement
}

function getComponentSchemas (input: DTDL): string[] {
  const componentSchemas: string[] = []
  if (input.contents) {
    const contents = input.contents
    contents.forEach((element) => {
      if (element['@type'] &&
            (typeof element['@type'] === 'string') &&
            (element['@type'] === 'Component')) {
        if (element.schema && typeof element.schema === 'string') {
          componentSchemas.push(element.schema)
        }
      }
    })
  }
  return componentSchemas
}

export function getModelMetadata (input: DTDL) {
  const idElement: string = getId(input)
  const extendsElement: string = getExtends(input)
  const componentSchemas: string[] = getComponentSchemas(input)
  return {
    id: idElement,
    extends: extendsElement,
    componentSchemas: componentSchemas
  }
}
