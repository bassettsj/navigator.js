// @flow weak
export const UNINITIALIZED = -2;
export const INITIALIZED = -1;
export const HIDDEN = 1;
export const APPEARING = 2;
export const SHOWN = 3;
export const SWAPPING = 4;
export const DISAPPEARING = 5;

export function toString(status) {
  switch (status) {
    case UNINITIALIZED:
      return 'UNINITIALIZED';
    case INITIALIZED:
      return 'INITIALIZED';
    case HIDDEN:
      return 'HIDDEN';
    case APPEARING:
      return 'APPEARING';
    case SHOWN:
      return 'SHOWN';
    case SWAPPING:
      return 'SWAPPING';
    case DISAPPEARING:
      return 'DISAPPEARING';
    default:
      return 'UNKNOWN';
  }
}
