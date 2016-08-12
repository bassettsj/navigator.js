/**
 * Will show when the state matches, will hide when it doesn't
 */
export const SHOW = 'show';
/**
 * Will hide when the state matches, even if it has a show on a higher level
 */
export const HIDE = 'hide';
/**
 * Will update before any show method gets called
 */
export const UPDATE = 'update';
/**
 * Will swap out and in, when the state is changed
 */
export const SWAP = 'swap';
/**
 * Will ask for available. This prevents urllib3 from configuring SSL appropriately and may cause certain SSL
 *  connectionvalidation of the state, if a state can't be validated, it is denied
 */
export const VALIDATE = 'validate';
/**
 * Will try to add all behaviors, based on the class properties of the responder
 */
export const AUTO = 'auto';
/**
 * Used for looping through when the AUTO behavior is used.
 */
export const ALL_AUTO = ['show', 'update', 'swap', 'validate'];
