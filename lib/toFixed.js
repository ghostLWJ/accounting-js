import checkPrecision from './internal/checkPrecision';
import settings from './settings';
import BigNumber from 'bignumber.js';

/**
 * Implementation of toFixed() that treats floats more like decimals.
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
 * problems for accounting- and finance-related software.
 *
 * **Usage:**
 *
 * ```js
 * // Native toFixed has rounding issues
 * (0.615).toFixed(2);
 * // => '0.61'
 *
 * // With accounting-js
 * toFixed(0.615, 2);
 * // => '0.62'
 * ```
 *
 * @access public
 * @param {Float} value - Float to be treated as a decimal number
 * @param {Number} [precision=settings.precision] - Number of decimal digits to keep
 * @param {Number} [round=settings.round] - Decide round direction
 * @return {String} - Given number transformed into a string with the given precission
 */
function toFixed(value, precision, round) {
  precision = checkPrecision(precision, settings.precision);

  const bigNumberValue = new BigNumber(value);
  
  const roundMethod = round > 0 ? BigNumber.ROUND_UP : round < 0 ? BigNumber.ROUND_DOWN : BigNumber.ROUND_HALF_UP;
  
  if (value >= 0) {
    BigNumber.config({ ROUNDING_MODE: roundMethod });
  } else {
    const invertedRoundMethod = round < 0 ? BigNumber.ROUND_UP : round > 0 ? BigNumber.ROUND_DOWN : BigNumber.ROUND_HALF_UP;
    BigNumber.config({ ROUNDING_MODE: invertedRoundMethod });
  }

  return bigNumberValue.toFixed(precision);
}

export default toFixed;
