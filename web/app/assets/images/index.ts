// Static imports so Next.js bundles and serves images with correct URLs
import logo from "./logo.png";
import q01 from "./01.png";
import q03 from "./03.png";
import q04 from "./04.png";
import q06 from "./06.png";
import q07 from "./07.png";
import q08 from "./08.png";
import q09 from "./09.png";
import q10 from "./10.png";

type StaticImage = { src: string; height?: number; width?: number } | string;

function src(img: StaticImage): string {
  return typeof img === "string" ? img : img.src;
}

export const logoImg = src(logo);

export const questionImages: Record<number, string> = {
  1: src(q01),
  3: src(q03),
  4: src(q04),
  6: src(q06),
  7: src(q07),
  8: src(q08),
  9: src(q09),
  10: src(q10),
};

export function getQuestionImage(qNum: number): string | undefined {
  return questionImages[qNum];
}
