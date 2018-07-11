import { Constants, UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions, Response } from "../../request";
import { Container, Containers } from "../Container";
import { User, Users } from "../User";
import { DatabaseDefinition } from "./DatabaseDefinition";

export class Database {
    public readonly containers: Containers;
    public readonly users: Users;

    public get url() {
        return UriFactory.createDatabaseUri(this.id);
    }

    constructor(public readonly client: CosmosClient, public readonly id: string) {
        this.containers = new Containers(this);
        this.users = new Users(this);
    }

    public container(id: string): Container {
        return new Container(this, id);
    }

    public user(id: string): User {
        return new User(this, id);
    }

    public read(options?: RequestOptions): Promise<Response<DatabaseDefinition>> {
        return this.client.documentClient.readDatabase(this.url, options);
    }

    public delete(options?: RequestOptions): Promise<Response<DatabaseDefinition>> {
        return this.client.documentClient.deleteDatabase(this.url, options);
    }
}
