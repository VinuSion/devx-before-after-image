export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unexpected error occurred";
}

export function isValidCloudinaryUrl(value: string): boolean {
  try {
    const url = new URL(value);

    const isHttp = url.protocol === "http:" || url.protocol === "https:";
    const isCloudinary = url.hostname.includes("res.cloudinary.com");

    return isHttp && isCloudinary;
  } catch {
    return false;
  }
}