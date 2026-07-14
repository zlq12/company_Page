import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function saveImageUpload(file: File, folder: "expenses" | "investments") {
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("请上传支付凭证图片");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("支付凭证必须是图片文件");
  }

  const ext = extensionFromFile(file);
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${crypto.randomUUID()}${ext}`;
  const fullPath = path.join(uploadDir, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(fullPath, bytes);

  return `/uploads/${folder}/${fileName}`;
}

function extensionFromFile(file: File) {
  const fromName = path.extname(file.name || "");
  if (fromName) return fromName.toLowerCase();
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  return ".jpg";
}
