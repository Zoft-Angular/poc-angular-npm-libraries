import { TextCasePipe } from './text-case-pipe';

describe('TextCasePipe', () => {
  const pipe = new TextCasePipe();

  it('should convert to title case by default', () => {
    expect(pipe.transform('hello angular library')).toBe('Hello Angular Library');
  });

  it('should convert to upper case', () => {
    expect(pipe.transform('hello angular library', 'upper')).toBe('HELLO ANGULAR LIBRARY');
  });

  it('should convert to lower case', () => {
    expect(pipe.transform('Hello Angular Library', 'lower')).toBe('hello angular library');
  });

  it('should convert to sentence case', () => {
    expect(pipe.transform('hELLO aNGULAR lIBRARY', 'sentence')).toBe('Hello angular library');
  });

  it('should convert to camel case', () => {
    expect(pipe.transform('hello angular library', 'camel')).toBe('helloAngularLibrary');
  });

  it('should convert to pascal case', () => {
    expect(pipe.transform('hello angular library', 'pascal')).toBe('HelloAngularLibrary');
  });

  it('should convert to kebab case', () => {
    expect(pipe.transform('Hello Angular Library', 'kebab')).toBe('hello-angular-library');
  });

  it('should convert to snake case', () => {
    expect(pipe.transform('Hello Angular Library', 'snake')).toBe('hello_angular_library');
  });
});
