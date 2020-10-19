declare module 'solc' {
  export interface SolcCompiler {
    compile(sources: string, findImports: Function): any; // eslint-disable-line @typescript-eslint/ban-types
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  export function compile(sources: string, findImports: Function): any
  export function loadRemoteVersion(
    version: string,
    callback: (err?: Error, solc?: SolcCompiler) => void
  ): void;
  export function version(): string;
}
