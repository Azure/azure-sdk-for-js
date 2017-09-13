import * as msRest from '../../../../../lib/msRest';
/**
 * @class
 * Initializes a new instance of the Pet class.
 * @constructor
 * @member {number} [id]
 *
 * @member {string} [name]
 *
 */
export declare class Pet {
    constructor();
    /**
     * Defines the metadata of Pet
     *
     * @returns {object} metadata of Pet
     *
     */
    mapper(): msRest.CompositeMapper;
}
