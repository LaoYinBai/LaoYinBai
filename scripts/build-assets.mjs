// 生成 Silvite 主页的自定义 SVG 资产：品牌横幅、精选作品卡片、邮箱按钮。
// 视觉方向：克制的东方美学——宣纸与墨色的底、朱印作为唯一强调色、衬线字体、细线分隔、留白。
// 不使用山水、古建、云纹等具象古代元素；不使用发光、网格、霓虹等科技装饰。
// 用法：node scripts/build-assets.mjs（零依赖，Node 18+）

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'assets');

const SERIF = "'Noto Serif SC','Source Han Serif SC','Songti SC','STSong','SimSun',Georgia,serif";
const SANS = "'Noto Sans SC','PingFang SC','Microsoft YaHei','Segoe UI',Arial,sans-serif";

// 墨色（深色）与宣纸（浅色）两套色板。朱印为唯一强调色。
const THEMES = {
  dark: {
    bg: '#15140F', panel: '#1B1A14', text: '#E9E3D3', muted: '#9E9785', dim: '#625C4D',
    line: '#3A372D', seal: '#C0543F', sealText: '#15140F',
  },
  light: {
    bg: '#F4F0E4', panel: '#FBF8EF', text: '#1F1D18', muted: '#6C6657', dim: '#A59D8B',
    line: '#D6CCB7', seal: '#A8402F', sealText: '#FBF8EF',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (name, svg) => {
  mkdirSync(ASSETS, { recursive: true });
  writeFileSync(join(ASSETS, name), svg.trim() + '\n', 'utf8');
  console.log('wrote assets/' + name);
};

// ---------- 横幅 1200×320 ----------
// 左：朱印 + 衬线标题 + 细线 + 中英副题。右：一轮中秋圆月（NASA 公有领域照片，见 assets/CREDITS.md）。
const MOON_HREF = 'data:image/jpeg;base64,' + readFileSync(join(ASSETS, 'moon-440.jpg')).toString('base64');
function banner(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="320" viewBox="0 0 1200 320" role="img" aria-label="SILVITE — Independent Developer">
<defs><clipPath id="moon"><circle cx="900" cy="160" r="108"/></clipPath></defs>
<rect width="1200" height="320" fill="${t.bg}"/>
<circle cx="900" cy="160" r="132" fill="none" stroke="${t.line}" stroke-width="1"/>
<image x="781" y="41" width="238" height="238" clip-path="url(#moon)" preserveAspectRatio="xMidYMid slice" href="${MOON_HREF}"/>
<rect x="76" y="84" width="34" height="34" fill="${t.seal}"/>
<text x="93" y="109" text-anchor="middle" font-family="${SERIF}" font-size="20" font-weight="700" fill="${t.sealText}">S</text>
<text x="76" y="196" font-family="${SERIF}" font-size="66" font-weight="600" letter-spacing="14" fill="${t.text}">SILVITE</text>
<rect x="76" y="222" width="300" height="1" fill="${t.line}"/>
<text x="76" y="256" font-family="${SANS}" font-size="18" letter-spacing="5" fill="${t.muted}">INDEPENDENT DEVELOPER</text>
<text x="76" y="294" font-family="${SERIF}" font-size="26" fill="${t.text}">个人独立开发者</text>
</svg>`;
}

// ---------- 精选作品卡片 600×260 ----------
// 宣纸底、细边框、编号与朱印。字号按 README 实际缩放（约 0.72 倍）后仍需清晰可读来设定。
function card(p, t) {
  const border = p.highlight ? t.seal : t.line;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="260" viewBox="0 0 600 260" role="img" aria-label="${esc(p.title)}">
<rect x="0.5" y="0.5" width="599" height="259" rx="4" fill="${t.panel}" stroke="${border}"/>
${p.highlight
  ? `<rect x="28" y="28" width="14" height="14" fill="${t.seal}"/>`
  : `<rect x="28.5" y="28.5" width="13" height="13" fill="none" stroke="${t.muted}"/>`}
<text x="572" y="44" text-anchor="end" font-family="${SANS}" font-size="14" letter-spacing="1.5" fill="${t.dim}">${esc(p.kind)}</text>
<text x="28" y="92" font-family="${SERIF}" font-size="32" font-weight="600" fill="${t.text}">${esc(p.title)}</text>
<text x="28" y="124" font-family="${SANS}" font-size="18" fill="${t.muted}">${esc(p.subtitle)}</text>
<rect x="28" y="146" width="544" height="1" fill="${t.line}"/>
<text x="28" y="180" font-family="${SANS}" font-size="17" fill="${t.text}" fill-opacity=".9">${esc(p.desc[0])}</text>
<text x="28" y="210" font-family="${SANS}" font-size="17" fill="${t.text}" fill-opacity=".9">${esc(p.desc[1])}</text>
<text x="28" y="240" font-family="${SANS}" font-size="14" letter-spacing="0.5" fill="${t.dim}">${esc(p.tags.join(' · '))}</text>
</svg>`;
}

// ---------- 联系页脚 1200×120 ----------
// 与横幅同宽的横向页脚：左侧一句招呼，右侧邮箱；上缘一条细线与正文分隔。整张图可点击跳转 mailto。
function footer(t, email) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="120" viewBox="0 0 1200 120" role="img" aria-label="Say hello: ${esc(email)}">
<rect width="1200" height="120" fill="${t.bg}"/>
<rect x="76" y="0" width="1048" height="1" fill="${t.line}"/>
<rect x="76" y="50" width="10" height="10" fill="${t.seal}"/>
<text x="98" y="61" font-family="${SERIF}" font-size="26" fill="${t.text}">有想聊的点子或合作，欢迎来信。</text>
<text x="1124" y="50" text-anchor="end" font-family="${SANS}" font-size="14" letter-spacing="3" fill="${t.dim}">EMAIL</text>
<text x="1124" y="82" text-anchor="end" font-family="${SERIF}" font-size="30" fill="${t.text}">${esc(email)}</text>
</svg>`;
}

function main() {
  const { projects } = JSON.parse(readFileSync(join(ROOT, 'scripts/projects.json'), 'utf8'));
  for (const [mode, t] of Object.entries(THEMES)) {
    write(`banner-${mode}.svg`, banner(t));
    for (const p of projects) write(`card-${p.id}-${mode}.svg`, card(p, t));
    write(`footer-${mode}.svg`, footer(t, 'silvite@modiconnect.cn'));
  }
}

main();
