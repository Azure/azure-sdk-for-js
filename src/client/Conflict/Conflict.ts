import { Constants } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions, Response } from "../../request";
import { Container } from "../Container";
import { ConflictDefinition } from "./ConflictDefinition";

export class Conflict {
    public get url() {
        return `/${this.container.url}/${Constants.Path.ConflictsPathSegment}/${this.id}`;
    }
    private client: CosmosClient;
    constructor(public readonly container: Container, public readonly id: string) {
        this.client = this.container.database.client;
    }

    public read(options?: RequestOptions): Promise<Response<ConflictDefinition>> {
        return this.client.documentClient.readConflict(this.url, options);
    }

    public delete(options?: RequestOptions): Promise<Response<ConflictDefinition>> {
        return this.client.documentClient.deleteConflict(this.url, options);
    }
}
