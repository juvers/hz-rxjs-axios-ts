export type TStringBool = Record<string, boolean>;
export type TStringNumber = Record<string, number>;
export type TStringString = Record<string, string>;
export type TZeroToThree = 0 | 1 | 2 | 3;
export type TMouseButtonEvent = React.MouseEvent<HTMLButtonElement>;
export type TChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TSyntheticEvent = React.SyntheticEvent<HTMLInputElement>;

/* eslint-disable @typescript-eslint/no-explicit-any*/
export type TUniversalType = Record<
  string,
  | string
  | number
  | boolean
  | number[]
  | string[]
  | boolean[]
  | Promise<any>
  | Promise<Response>
  | Response
>;
