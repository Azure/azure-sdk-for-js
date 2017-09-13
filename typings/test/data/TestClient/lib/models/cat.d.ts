import * as msRest from '../../../../../lib/msRest';
import * as models from './index';
/**
 * @class
 * Initializes a new instance of the Cat class.
 * @constructor
 * @member {string} [color]
 *
 * @member {array} [hates]
 *
 */
export declare class Cat extends models.Pet {
    /**
     * Defines the metadata of Cat
     *
     * @returns {object} metadata of Cat
     *
     */
    mapper(): msRest.CompositeMapper;
}
