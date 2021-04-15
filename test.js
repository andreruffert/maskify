import test from 'ava';
import maskify from './';


test('should mask the digits of standard credit cards', t => {
  t.is(maskify('4556364607935616'), '4###########5616');
  t.is(maskify('4556-3646-0793-5616'), '4###-####-####-5616');
});

test('should only mask digits', t => {
  t.is(maskify('ABCD-EFGH-IJKLM-NOPQ'), 'ABCD-EFGH-IJKLM-NOPQ');
  t.is(maskify('A1234567BCDEFG89HI'), 'A#######BCDEFG89HI');
});

test('should not mask the digits of short credit cards', t => {
  t.is(maskify('54321'), '54321');
});

test('should handle empty strings', t => {
  t.is(maskify(''), '');
});

test('should handle to overwrite default options', t => {
  const alphanumericCharacters = /^[a-zA-Z0-9]+$/;
  t.is(maskify('AB616', {
    maskSymbol: '👮',
    matchPattern: alphanumericCharacters,
    visibleCharsStart: 0,
    visibleCharsEnd: 3,
    minChars: 0
  }), '👮👮616');
});

test('should handle optional visibleCharsStart and visibleCharsEnd option', t => {
  t.is(maskify('123456789', {visibleCharsStart: 3, visibleCharsEnd: 2}), '123####89');
  t.is(maskify('123456789', {visibleCharsStart: 0, visibleCharsEnd: 0}), '#########');
});

test('should handle optional maskSymbol option', t => {
  t.is(maskify('123456789', {maskSymbol: '*'}), '1****6789');
});

test('should handle optional minChars option', t => {
  t.is(maskify('123', {minChars: 10}), '123', 'shorter string is not masked');
  t.is(maskify('123', {minChars: 0, visibleCharsStart: 1, visibleCharsEnd: 1}), '1#3', 'string with minChars 0 is correctly masked');
  t.is(maskify('', {minChars: 0, visibleCharsStart: 0, visibleCharsEnd: 0}), '', 'emtpy string with minChars 0 is correctly masked');
  t.is(maskify('123', {minChars: 3}), '123', 'string shorter than visibleCharsStart + visibleCharsEnd is correctly masked');
});
