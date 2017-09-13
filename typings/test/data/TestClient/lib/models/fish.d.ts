import * as msRest from '../../../../../lib/msRest';
/**
 * @class
 * Initializes a new instance of the Fish class.
 * @constructor
 * @member {string} [species]
 *
 * @member {number} length
 *
 * @member {array} [siblings]
 *
 * @member {string} fishtype Polymorhpic Discriminator
 *
 */
export declare class Fish {
    constructor();
    /**
     * Defines the metadata of Fish
     *
     * @returns {object} metadata of Fish
     *
     */
    mapper(): msRest.CompositeMapper;
}
