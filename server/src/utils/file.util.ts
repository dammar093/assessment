import fs from "fs";
import path from "path";
import { Request } from "express";

const uploadDir = path.join(process.cwd(), "public/uploads");

export const generateFileUrl = (req: Request, filename: string): string => {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

export const extractFilename = (fileUrl: string): string | null => {
  if (!fileUrl) return null;
  const parts = fileUrl.split("/uploads/");
  return parts[1] || null;
};

export const deleteFile = (fileUrl?: string | null): void => {
  try {
    if (!fileUrl) return;

    const filename = extractFilename(fileUrl);
    if (!filename) return;

    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("File delete error:", error);
  }
};
