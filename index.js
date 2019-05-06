function maskify(inputString = '', options = {}) {
  // Default options
  const {
    maskSymbol = '#',
    matchPattern = /^\d+$/,
    visibleCharsStart = 1,
    visibleCharsEnd = 4,
    minChars = 6
  } = options;

  // Skip e.g. short credit card numbers or empty strings
  if (inputString.length < minChars) {
    return inputString;
  }

  const startChars = inputString.charAt(visibleCharsStart - 1);
  const endChars = inputString.slice(-visibleCharsEnd);
  const charsToMask = inputString.slice(visibleCharsStart, -visibleCharsEnd);
  const maskedChars = charsToMask.split('').map(char => {
    const output = matchPattern.test(char) ? maskSymbol : char;
    return output;
  });

  const maskedString = [
    startChars,
    ...maskedChars,
    endChars
  ].join('');

  return maskedString;
}

module.exports = maskify;

// Utility
const isDigit = input => /^\d+$/.test(input);
