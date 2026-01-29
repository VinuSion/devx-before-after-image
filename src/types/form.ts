import { UseFormRegisterReturn } from "react-hook-form";

export type ImageUploaderFormValues = {
  before: FileList;
  after: FileList;
};

export type FileInputProps = {
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
  file?: File;
};