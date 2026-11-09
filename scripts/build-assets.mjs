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
// 左：朱印 + 衬线标题 + 细线 + 中英副题。右：一笔未闭合的圆，极慢地转动。
function banner(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="320" viewBox="0 0 1200 320" role="img" aria-label="SILVITE — Independent Developer">
<style>
  .enso{transform-origin:900px 160px;animation:turn 90s linear infinite}
  @keyframes turn{to{transform:rotate(360deg)}}
  @media (prefers-reduced-motion: reduce){*{animation:none!important}}
</style>
<rect width="1200" height="320" fill="${t.bg}"/>
<g class="enso">
  <path d="M900 40 A120 120 0 1 1 806 84" fill="none" stroke="${t.text}" stroke-opacity=".72" stroke-width="2.2" stroke-linecap="round"/>
  <rect x="996" y="38" width="14" height="14" fill="${t.seal}"/>
</g>
<rect x="76" y="84" width="34" height="34" fill="${t.seal}"/>
<text x="93" y="109" text-anchor="middle" font-family="${SERIF}" font-size="20" font-weight="700" fill="${t.sealText}">S</text>
<text x="76" y="196" font-family="${SERIF}" font-size="66" font-weight="600" letter-spacing="14" fill="${t.text}">SILVITE</text>
<rect x="76" y="222" width="300" height="1" fill="${t.line}"/>
<text x="76" y="250" font-family="${SANS}" font-size="13" letter-spacing="5" fill="${t.muted}">INDEPENDENT DEVELOPER</text>
<text x="76" y="282" font-family="${SERIF}" font-size="20" fill="${t.text}">个人独立开发者</text>
</svg>`;
}

// ---------- 精选作品卡片 600×200 ----------
// 宣纸底、细边框、编号与朱印；标签以“·”分隔的墨色小字呈现，不用彩色色块。
function card(p, t) {
  const border = p.highlight ? t.seal : t.line;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200" viewBox="0 0 600 200" role="img" aria-label="${esc(p.title)}">
<rect x="0.5" y="0.5" width="599" height="199" rx="4" fill="${t.panel}" stroke="${border}"/>
${p.highlight
  ? `<rect x="28" y="26" width="12" height="12" fill="${t.seal}"/>`
  : `<rect x="28.5" y="26.5" width="11" height="11" fill="none" stroke="${t.muted}"/>`}
<text x="572" y="38" text-anchor="end" font-family="${SANS}" font-size="11" letter-spacing="2" fill="${t.dim}">${esc(p.kind)}</text>
<text x="28" y="82" font-family="${SERIF}" font-size="24" font-weight="600" fill="${t.text}">${esc(p.title)}</text>
<text x="28" y="106" font-family="${SANS}" font-size="13.5" fill="${t.muted}">${esc(p.subtitle)}</text>
<rect x="28" y="124" width="544" height="1" fill="${t.line}"/>
<text x="28" y="150" font-family="${SANS}" font-size="13" fill="${t.text}" fill-opacity=".85">${esc(p.desc[0])}</text>
<text x="28" y="170" font-family="${SANS}" font-size="13" fill="${t.text}" fill-opacity=".85">${esc(p.desc[1])}</text>
<text x="28" y="188" font-family="${SANS}" font-size="11" letter-spacing="1" fill="${t.dim}">${esc(p.tags.join(' · '))}</text>
</svg>`;
}

// ---------- 邮箱按钮 380×60 ----------
function emailButton(t, email) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="380" height="60" viewBox="0 0 380 60" role="img" aria-label="Email: ${esc(email)}">
<rect x="0.5" y="0.5" width="379" height="59" rx="2" fill="${t.panel}" stroke="${t.line}"/>
<rect x="24" y="22" width="10" height="10" fill="${t.seal}"/>
<text x="48" y="25" font-family="${SANS}" font-size="10.5" letter-spacing="3" fill="${t.dim}">EMAIL</text>
<text x="48" y="45" font-family="${SERIF}" font-size="17" fill="${t.text}">${esc(email)}</text>
</svg>`;
}

function main() {
  const { projects } = JSON.parse(readFileSync(join(ROOT, 'scripts/projects.json'), 'utf8'));
  for (const [mode, t] of Object.entries(THEMES)) {
    write(`banner-${mode}.svg`, banner(t));
    for (const p of projects) write(`card-${p.id}-${mode}.svg`, card(p, t));
    write(`contact-email-${mode}.svg`, emailButton(t, 'silvite@modiconnect.cn'));
  }
}

main();
