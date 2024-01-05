import { Client } from "@azure-rest/core-client";
import { GetSchemaOptions, GetSchemaPropertiesOptions, RegisterSchemaOptions, Schema, SchemaDescription, SchemaProperties } from "../models";
import { isUnexpected } from "../../generated/src";
import { buildContentType, convertSchemaIdResponse, convertSchemaResponse } from "../conversions";


export async function registerSchema(
    context: Client,
    schema: SchemaDescription,
    options: RegisterSchemaOptions = {}
): Promise<SchemaProperties>{
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    const response = await context.path("/$schemaGroups/{groupName}/schemas/{name}", groupName, schemaName).put({
        contentType: buildContentType(format),
        body: schemaContent,
        ...options
      })

    if (isUnexpected(response)){
        throw response.body.error;
    }

    return convertSchemaIdResponse(response.headers, format);
}

export async function getSchemaProperties(
    context: Client,
    schema: SchemaDescription,
    options: GetSchemaPropertiesOptions = {}
): Promise<SchemaProperties> {
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    const response = await context.path("/$schemaGroups/{groupName}/schemas/{name}:get-id", groupName, schemaName).post({
        contentType: buildContentType(format),
        body: schemaContent,
        ...options
    })

    if (isUnexpected(response)){
        throw response.body.error;
    }

    return convertSchemaIdResponse(response, format)
}

export async function getSchemaById(
    context: Client, 
    schemaId: string, 
    options?: GetSchemaOptions
): Promise<Schema>{
    const response = await context.path( "/$schemaGroups/$schemas/{id}", schemaId).get({...options})

    if (isUnexpected(response)){
        throw response.body.error
    }

    return convertSchemaResponse(response)
}

export async function getSchemaByVersion(
    context: Client,
    groupName: string,
    name:string,
    version: number,
    options?: GetSchemaOptions    
): Promise<Schema>{
    const response = await context.path("/$schemaGroups/{groupName}/schemas/{name}/versions/{schemaVersion}", groupName, name, version).get({...options})

    if (isUnexpected(response)){
        throw response.body.error
    }

    return convertSchemaResponse(response)
}