import { isIPv4 } from '..';

describe('isIPv4', () => {
  it('should return valid decimal IP', () => {
    const result = isIPv4('192.0.2.235');
    expect(result).toEqual({
      target: '192.0.2.235',
      valid: true,
      format: 'decimal',
      formatted: {
        decimal: '192.0.2.235',
        hex: '0xc0.0x00.0x02.0xeb',
        octal: '0300.0000.0002.0353',
      },
    });
  });

  it('should return valid hex IP', () => {
    const result = isIPv4('0xc0.0x00.0x02.0xeb');
    expect(result).toEqual({
      target: '0xc0.0x00.0x02.0xeb',
      valid: true,
      format: 'hex',
      formatted: {
        decimal: '192.0.2.235',
        hex: '0xc0.0x00.0x02.0xeb',
        octal: '0300.0000.0002.0353',
      },
    });
  });

  it('should return valid hex IP when not allowed', () => {
    const result = isIPv4('0xc0.0x00.0x02.0xeb', {
      formats: { hex: false },
    });
    expect(result).toEqual({
      target: '0xc0.0x00.0x02.0xeb',
      valid: false,
      format: 'hex',
      formatted: {
        decimal: '192.0.2.235',
        hex: '0xc0.0x00.0x02.0xeb',
        octal: '0300.0000.0002.0353',
      },
    });
  });

  it('should return valid octal IP', () => {
    const result = isIPv4('0300.0000.0002.0353');
    expect(result).toEqual({
      target: '0300.0000.0002.0353',
      valid: true,
      format: 'octal',
      formatted: {
        decimal: '192.0.2.235',
        hex: '0xc0.0x00.0x02.0xeb',
        octal: '0300.0000.0002.0353',
      },
    });
  });

  it('should return valid octal IP when not allowed', () => {
    const result = isIPv4('0300.0000.0002.0353', {
      formats: { octal: false },
    });
    expect(result).toEqual({
      target: '0300.0000.0002.0353',
      valid: false,
      format: 'octal',
      formatted: {
        decimal: '192.0.2.235',
        hex: '0xc0.0x00.0x02.0xeb',
        octal: '0300.0000.0002.0353',
      },
    });
  });

  // it('should return invalid IP with leading zeros', () => {
  //   const result = isIPv4('00192.168.0002.0235', {
  //     formats: { decimal: true, hex: false, octal: true, mixed: true },
  //   });
  //   expect(result).toEqual({
  //     target: '00192.0168.0002.0235',
  //     valid: false,
  //     format: null,
  //     formatted: {},
  //   });
  // });

  // it('should return valid IP with leading zeros when allowed', () => {
  //   const result = isIPv4('00192.168.0002.0235', {
  //     formats: { decimal: true, hex: false, octal: true, mixed: true },
  //     allowLeadingZero: true,
  //   });
  //   expect(result).toEqual({
  //     target: '00192.168.0002.0235',
  //     valid: true,
  //     format: null,
  //     formatted: {},
  //     formatted: {
  //       decimal: '192.0.2.235',
  //       hex: '0xc0.0x00.0x02.0xeb',
  //       octal: '0300.0000.0002.0353',
  //     },
  //   });
  // });

  it('should return invalid IP with wrong number of parts', () => {
    const result = isIPv4('192.168.1');
    expect(result).toEqual({
      target: '192.168.1',
      valid: false,
      format: null,
      formatted: {},
    });
  });
});
