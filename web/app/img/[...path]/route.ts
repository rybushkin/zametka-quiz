import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function getPublicDirs(): string[] {
  const cwd = process.cwd();
  const dirs = [path.join(cwd, "public")];
  dirs.push(path.join(cwd, "web", "public"));
  return dirs;
}

const PUBLIC_DIRS = getPublicDirs();

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await context.params;
  if (!pathSegments?.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const fileName = pathSegments[pathSegments.length - 1];
  const ext = path.extname(fileName).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  for (const publicDir of PUBLIC_DIRS) {
    const filePath = path.join(publicDir, ...pathSegments);
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(path.resolve(publicDir))) continue;
    try {
      const buffer = await readFile(resolved);
      const contentType =
        ext === ".svg"
          ? "image/svg+xml"
          : ext === ".png"
            ? "image/png"
            : ext === ".jpg" || ext === ".jpeg"
              ? "image/jpeg"
              : ext === ".webp"
                ? "image/webp"
                : "image/gif";
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
      continue;
    }
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
