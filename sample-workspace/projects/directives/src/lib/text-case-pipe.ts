import { Pipe, PipeTransform } from '@angular/core';

export type TextCaseMode = 'title' | 'upper' | 'lower' | 'sentence' | 'camel' | 'kebab';

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
      case 'kebab':
        return clean.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      case 'title':
      default:
        return clean
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
    }
  }

  private toCamel(value: string): string {
    const words = value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 0) return '';

    return words[0] + words.slice(1).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  }
}
