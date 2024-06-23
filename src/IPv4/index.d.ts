import { BaseResult } from '../shared';

export type IPv4Formats = {
  decimal?: boolean;
  hex?: boolean;
  octal?: boolean;
  mixed?: boolean;
};

export type IPv4Formatted = {
  decimal?: string;
  hex?: string;
  octal?: string;
};

export interface IPv4Result extends BaseResult {
  format?: keyof IPv4Formatted | 'mixed' | null;
  formatted?: IPv4Formatted;
}

export interface IPv4Options {
  allowLeadingZero?: boolean;
  formats?: IPv4Formats;
}
