import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_url: process.env.CLOUDINARY_URL,
  folder: process.env.CLOUDINARY_FOLDER,
});

export default cloudinary;
