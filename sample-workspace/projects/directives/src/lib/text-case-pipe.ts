import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

// ─── Shared Helper ────────────────────────────────────────────────────────────

function safeFormatDate(
  value: Date | string | number | null | undefined,
  format: string,
  locale: string,
  timezone?: string,
): string {
  if (value === null || value === undefined || value === '') return '';
  try {
    return formatDate(value, format, locale, timezone);
  } catch {
    return '';
  }
}

// ─── Text Case ────────────────────────────────────────────────────────────────

export type TextCaseMode =
  | 'title'
  | 'upper'
  | 'lower'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'kebab'
  | 'snake'
  | 'constant'
  | 'dot'
  | 'path';

@Pipe({
  name: 'textCase',
  standalone: true,
})
export class TextCasePipe implements PipeTransform {
  transform(value: string | null | undefined, mode: TextCaseMode = 'title'): string {
    if (!value) return '';

    const clean = value.trim().replace(/\s+/g, ' ');

    switch (mode) {
      case 'upper':
        return clean.toUpperCase();
      case 'lower':
        return clean.toLowerCase();
      case 'sentence':
        return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
      case 'camel':
        return this.toCamel(clean);
      case 'pascal':
        return this.toPascal(clean);
      case 'kebab':
        return this.toSeparated(clean, '-');
      case 'snake':
        return this.toSeparated(clean, '_');
      case 'constant':
        return this.toSeparated(clean, '_').toUpperCase();
      case 'dot':
        return this.toSeparated(clean, '.');
      case 'path':
        return this.toSeparated(clean, '/');
      case 'title':
      default:
        return clean
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
    }
  }

  private toWords(value: string): string[] {
    return value
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.toLowerCase());
  }

  private toCamel(value: string): string {
    const words = this.toWords(value);

    if (words.length === 0) return '';

    return words[0] + words.slice(1).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  }

  private toPascal(value: string): string {
    const words = this.toWords(value);

    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  }

  private toSeparated(value: string, separator: '-' | '_' | '.' | '/'): string {
    return this.toWords(value).join(separator);
  }
}

// ─── Date Format ──────────────────────────────────────────────────────────────

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    format = 'mediumDate',
    locale = 'en-US',
    timezone?: string,
  ): string {
    return safeFormatDate(value, format, locale, timezone);
  }
}

// ─── Time Format ──────────────────────────────────────────────────────────────

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    format = 'shortTime',
    locale = 'en-US',
    timezone?: string,
  ): string {
    return safeFormatDate(value, format, locale, timezone);
  }
}

// ─── Relative Time ────────────────────────────────────────────────────────────

@Pipe({
  name: 'relativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const abs = Math.abs(seconds);

    const intervals: [number, string][] = [
      [31536000, 'year'],
      [2592000, 'month'],
      [86400, 'day'],
      [3600, 'hour'],
      [60, 'minute'],
      [1, 'second'],
    ];

    for (const [secs, label] of intervals) {
      const count = Math.floor(abs / secs);
      if (count >= 1) {
        const unit = count === 1 ? label : `${label}s`;
        return seconds >= 0 ? `${count} ${unit} ago` : `in ${count} ${unit}`;
      }
    }

    return 'just now';
  }
}

// ─── JSON Pretty ──────────────────────────────────────────────────────────────

@Pipe({
  name: 'jsonPretty',
  standalone: true,
})
export class JsonPrettyPipe implements PipeTransform {
  transform(value: unknown, spaces = 2): string {
    if (value === null || value === undefined) return '';
    try {
      return JSON.stringify(value, null, Math.max(0, spaces));
    } catch {
      return '';
    }
  }
}

// ─── Truncate ─────────────────────────────────────────────────────────────────

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 50, suffix = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.slice(0, limit).trimEnd() + suffix;
  }
}

// ─── Default Value ────────────────────────────────────────────────────────────

@Pipe({
  name: 'defaultValue',
  standalone: true,
})
export class DefaultValuePipe implements PipeTransform {
  transform<T>(value: T | null | undefined, fallback: T): T {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'string' && value.trim() === '') return fallback;
    return value;
  }
}

// ─── Barrel Export ────────────────────────────────────────────────────────────
// Import everything at once: import { ALL_PIPES } from 'directives';
// Usage in component: imports: [ALL_PIPES]

export const ALL_PIPES = [
  TextCasePipe,
  DateFormatPipe,
  TimeFormatPipe,
  RelativeTimePipe,
  JsonPrettyPipe,
  TruncatePipe,
  DefaultValuePipe,
] as const;
