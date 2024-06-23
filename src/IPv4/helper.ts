import { IPv4Formatted } from './index.d';

function getPartFormat(part: string): keyof IPv4Formatted {
  if (/^0[xX][\da-fA-F]{2}/.test(part)) return 'hex';
  if (/^0[0-7]{3}$/.test(part) && parseInt(part, 8) <= 255) return 'octal';
  return 'decimal';
}

function parsePart(part: string): number {
  switch (getPartFormat(part)) {
    case 'hex':
      return parseInt(part, 16);
    case 'octal':
      return parseInt(part, 8);
    case 'decimal':
    default:
      return parseInt(part, 10);
  }
}

export function isValidIPv4(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  for (let i = 0; i < 4; i++) {
    const num = parsePart(parts[i]);
    if (isNaN(num) || num < 0 || num > 255) return false;
  }
  return true;
}

export function getIPv4Format(ip: string): keyof IPv4Formatted | 'mixed' {
  const parts = ip.split('.');
  const format = getPartFormat(parts[0]);
  for (let i = 1; i < 4; ++i) {
    if (format !== getPartFormat(parts[i])) return 'mixed';
  }
  return format;
}

export function formatIPv4(ip: string, format: keyof IPv4Formatted): string {
  const parts = ip.split('.');
  return parts
    .map((part) => {
      const int = parsePart(part);
      switch (format) {
        case 'hex':
          return `0x${int.toString(16).padStart(2, '0')}`;
        case 'octal':
          return int.toString(8).padStart(4, '0');
        case 'decimal':
        default:
          return int.toString();
      }
    })
    .join('.');
}
