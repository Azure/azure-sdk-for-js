import { StoredProcedures, StoredProcedure } from "../StoredProcedure/index.js";
import { Trigger, Triggers } from "../Trigger/index.js";
import { UserDefinedFunction, UserDefinedFunctions } from "../UserDefinedFunction/index.js";
import type { ClientContext } from "../../ClientContext.js";
import type { Container } from "../Container/Container.js";
export declare class Scripts {
    readonly container: Container;
    private readonly clientContext;
    /**
     * @param container - The parent {@link Container}.
     * @hidden
     */
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Used to read, replace, or delete a specific, existing {@link StoredProcedure} by id.
     *
     * Use `.storedProcedures` for creating new stored procedures, or querying/reading all stored procedures.
     * @param id - The id of the {@link StoredProcedure}.
     */
    storedProcedure(id: string): StoredProcedure;
    /**
     * Used to read, replace, or delete a specific, existing {@link Trigger} by id.
     *
     * Use `.triggers` for creating new triggers, or querying/reading all triggers.
     * @param id - The id of the {@link Trigger}.
     */
    trigger(id: string): Trigger;
    /**
     * Used to read, replace, or delete a specific, existing {@link UserDefinedFunction} by id.
     *
     * Use `.userDefinedFunctions` for creating new user defined functions, or querying/reading all user defined functions.
     * @param id - The id of the {@link UserDefinedFunction}.
     */
    userDefinedFunction(id: string): UserDefinedFunction;
    private $sprocs;
    /**
     * Operations for creating new stored procedures, and reading/querying all stored procedures.
     *
     * For reading, replacing, or deleting an existing stored procedure, use `.storedProcedure(id)`.
     */
    get storedProcedures(): StoredProcedures;
    private $triggers;
    /**
     * Operations for creating new triggers, and reading/querying all triggers.
     *
     * For reading, replacing, or deleting an existing trigger, use `.trigger(id)`.
     */
    get triggers(): Triggers;
    private $udfs;
    /**
     * Operations for creating new user defined functions, and reading/querying all user defined functions.
     *
     * For reading, replacing, or deleting an existing user defined function, use `.userDefinedFunction(id)`.
     */
    get userDefinedFunctions(): UserDefinedFunctions;
}
//# sourceMappingURL=Scripts.d.ts.map