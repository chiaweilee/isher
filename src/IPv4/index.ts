import { DEFAULT_ALLOW_LEADING_ZERO, DEFAULT_FORMATS } from './constant';
import { formatIPv4, getIPv4Format, isValidIPv4 } from './helper';
import { IPv4Formatted, IPv4Options, IPv4Result } from './index.d';

export default function isIPv4(
  ip: unknown,
  options: IPv4Options = {},
): IPv4Result {
  const { allowLeadingZero = DEFAULT_ALLOW_LEADING_ZERO } = options;
  const formats = { ...DEFAULT_FORMATS, ...(options?.formats || {}) };

  if (typeof ip !== 'string') {
    return {
      target: ip,
      valid: false,
      format: null,
      formatted: {},
    };
  }

  let valid = false;
  let format = null;
  let formatted: IPv4Formatted = {};

  if (isValidIPv4(ip)) {
    format = getIPv4Format(ip);
    valid = true;
  }

  if (valid) {
    formatted = {
      decimal: formatIPv4(ip, 'decimal'),
      hex: formatIPv4(ip, 'hex'),
      octal: formatIPv4(ip, 'octal'),
    };
  }

  return {
    target: ip,
    valid: !!format && !!formats[format],
    format,
    formatted,
  };
}
