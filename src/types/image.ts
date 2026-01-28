export type GenerateImageResponse = {
  url: string;
};

export type ErrorImageResponse = {
  error: string;
};

export type ShareOptions = {
  imageUrl: string;
  title?: string;
  text?: string;
};