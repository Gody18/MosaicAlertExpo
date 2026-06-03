declare global {
  // eslint-disable-next-line no-var
  var Buffer: typeof import('buffer').Buffer;
  interface Global {
    Buffer: typeof import('buffer').Buffer;
  }
}

declare module '*.tflite' {
  const value: number;
  export default value;
}

export {};
