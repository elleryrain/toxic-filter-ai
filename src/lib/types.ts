export type TLabel = 0 | 1;

export type TSample = {
  text: string;
  label: TLabel;
};
export type BinaryMetrics = {
  tp: number;
  tn: number;
  fp: number;
  fn: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
};
