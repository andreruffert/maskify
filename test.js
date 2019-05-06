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
