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
  if (typeof inputString !== 'string' || inputString.length < minChars) {
    return inputString;
  }
  // only mask if visible chars at start and end are less chars than string length
  if (inputString.length < visibleCharsStart + visibleCharsEnd) {
    return inputString;
  }

  const startChars = inputString.slice(0, visibleCharsStart);
  const endChars = (visibleCharsEnd > 0) ? inputString.slice(-visibleCharsEnd) : '';
  const charsToMask = (visibleCharsEnd > 0) ? inputString.slice(visibleCharsStart, -visibleCharsEnd) : inputString.slice(visibleCharsStart);
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
