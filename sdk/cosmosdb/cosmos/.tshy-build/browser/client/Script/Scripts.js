// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { StoredProcedures, StoredProcedure } from "../StoredProcedure/index.js";
import { Trigger, Triggers } from "../Trigger/index.js";
import { UserDefinedFunction, UserDefinedFunctions } from "../UserDefinedFunction/index.js";
export class Scripts {
    /**
     * @param container - The parent {@link Container}.
     * @hidden
     */
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    /**
     * Used to read, replace, or delete a specific, existing {@link StoredProcedure} by id.
     *
     * Use `.storedProcedures` for creating new stored procedures, or querying/reading all stored procedures.
     * @param id - The id of the {@link StoredProcedure}.
     */
    storedProcedure(id) {
        return new StoredProcedure(this.container, id, this.clientContext);
    }
    /**
     * Used to read, replace, or delete a specific, existing {@link Trigger} by id.
     *
     * Use `.triggers` for creating new triggers, or querying/reading all triggers.
     * @param id - The id of the {@link Trigger}.
     */
    trigger(id) {
        return new Trigger(this.container, id, this.clientContext);
    }
    /**
     * Used to read, replace, or delete a specific, existing {@link UserDefinedFunction} by id.
     *
     * Use `.userDefinedFunctions` for creating new user defined functions, or querying/reading all user defined functions.
     * @param id - The id of the {@link UserDefinedFunction}.
     */
    userDefinedFunction(id) {
        return new UserDefinedFunction(this.container, id, this.clientContext);
    }
    /**
     * Operations for creating new stored procedures, and reading/querying all stored procedures.
     *
     * For reading, replacing, or deleting an existing stored procedure, use `.storedProcedure(id)`.
     */
    get storedProcedures() {
        if (!this.$sprocs) {
            this.$sprocs = new StoredProcedures(this.container, this.clientContext);
        }
        return this.$sprocs;
    }
    /**
     * Operations for creating new triggers, and reading/querying all triggers.
     *
     * For reading, replacing, or deleting an existing trigger, use `.trigger(id)`.
     */
    get triggers() {
        if (!this.$triggers) {
            this.$triggers = new Triggers(this.container, this.clientContext);
        }
        return this.$triggers;
    }
    /**
     * Operations for creating new user defined functions, and reading/querying all user defined functions.
     *
     * For reading, replacing, or deleting an existing user defined function, use `.userDefinedFunction(id)`.
     */
    get userDefinedFunctions() {
        if (!this.$udfs) {
            this.$udfs = new UserDefinedFunctions(this.container, this.clientContext);
        }
        return this.$udfs;
    }
}
//# sourceMappingURL=Scripts.js.map