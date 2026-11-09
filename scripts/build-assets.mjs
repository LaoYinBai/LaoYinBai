// 生成 Silvite 主页的自定义 SVG 资产：品牌横幅、精选作品卡片、邮箱按钮、开发活动统计。
// 用法：node scripts/build-assets.mjs
// 可选环境变量：GITHUB_TOKEN（或 GH_TOKEN）仅用于提高 API 限额，不会写入任何文件。
// 统计部分失败时抛错退出（非 0），调用方可选择保留上一次生成的文件。

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'assets');
const USER = 'LaoYinBai';
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

const FONT = "'Segoe UI','Inter','Helvetica Neue',Arial,'PingFang SC','Microsoft YaHei',sans-serif";
const MONO = "'Cascadia Code','JetBrains Mono',Consolas,'SFMono-Regular',monospace";

const THEMES = {
  dark: {
    bg1: '#060912', bg2: '#0C1528', panel: '#0E1729', line: '#22304D',
    text: '#EAF2FF', muted: '#93A6C6', dim: '#4E6284',
    a: '#5EEAD4', b: '#818CF8', c: '#38BDF8', dot: '#1A2944',
    tagBg: '#162440', tagText: '#A6DCF5', ringStop: '#5EEAD4',
  },
  light: {
    bg1: '#F8FBFF', bg2: '#E9F1FC', panel: '#FFFFFF', line: '#D3DEEE',
    text: '#0B1322', muted: '#44566F', dim: '#8497B2',
    a: '#0E9F9A', b: '#5B5FE6', c: '#0284C7', dot: '#C9D8EC',
    tagBg: '#E7EFFA', tagText: '#1F4E86', ringStop: '#0E9F9A',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (name, svg) => {
  mkdirSync(ASSETS, { recursive: true });
  writeFileSync(join(ASSETS, name), svg.trim() + '\n', 'utf8');
  console.log('wrote assets/' + name);
};
const textWidth = (s) => [...s].reduce((w, c) => w + (c.charCodeAt(0) > 255 ? 13 : 7.2), 0);
const hexPoints = (cx, cy, r) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

// ---------- 品牌横幅 1200×320 ----------
function banner(t) {
  const flow = (d, cls) => `<path class="flow ${cls}" d="${d}"/>`;
  const node = (x, y, delay) => `<circle class="pulse" style="animation-delay:${delay}s" cx="${x}" cy="${y}" r="4" fill="${t.a}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="320" viewBox="0 0 1200 320" role="img" aria-label="SILVITE — Independent Developer">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.bg1}"/><stop offset="1" stop-color="${t.bg2}"/></linearGradient>
  <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.a}" stop-opacity="0"/><stop offset=".45" stop-color="${t.a}"/><stop offset="1" stop-color="${t.b}" stop-opacity="0"/></linearGradient>
  <linearGradient id="title" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.text}"/><stop offset="1" stop-color="${t.a}"/></linearGradient>
  <linearGradient id="hair" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.a}"/><stop offset="1" stop-color="${t.a}" stop-opacity="0"/></linearGradient>
  <radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${t.b}" stop-opacity=".28"/><stop offset="1" stop-color="${t.b}" stop-opacity="0"/></radialGradient>
  <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.25" fill="${t.dot}"/></pattern>
</defs>
<style>
  .flow{fill:none;stroke:url(#flow);stroke-width:2;stroke-linecap:round;stroke-dasharray:120 900;animation:run 6s linear infinite}
  .f2{animation-duration:8.5s;animation-delay:-3s;opacity:.7}
  .f3{animation-duration:11s;animation-delay:-6s;opacity:.45}
  @keyframes run{from{stroke-dashoffset:1020}to{stroke-dashoffset:0}}
  .pulse{animation:pulse 3.2s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:.2}50%{opacity:1}}
  .rise{animation:rise 1s cubic-bezier(.2,.7,.2,1) both}
  .r1{animation-delay:.05s}.r2{animation-delay:.2s}.r3{animation-delay:.32s}.r4{animation-delay:.44s}
  @keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .hair{transform-origin:76px 0;animation:grow 1.2s .5s cubic-bezier(.2,.7,.2,1) both}
  @keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @media (prefers-reduced-motion: reduce){*{animation:none!important}}
</style>
<rect width="1200" height="320" fill="url(#bg)"/>
<rect width="1200" height="320" fill="url(#dots)" opacity=".7"/>
<circle cx="1010" cy="160" r="280" fill="url(#glow)"/>
${flow('M-20 250 C240 150 420 300 640 200 S980 60 1220 130', '')}
${flow('M-20 90 C300 40 480 210 720 150 S1000 280 1220 230', 'f2')}
${flow('M-20 300 C260 260 520 120 780 170 S1060 40 1220 70', 'f3')}
${node(640, 200, 0)}${node(722, 152, 1.1)}${node(860, 262, 2.2)}${node(1080, 70, 0.6)}
<g>
  <polygon points="${hexPoints(1010, 160, 118)}" fill="none" stroke="${t.a}" stroke-opacity=".55" stroke-width="1.5"/>
  <polygon points="${hexPoints(1010, 160, 74)}" fill="none" stroke="${t.b}" stroke-opacity=".5" stroke-width="1" stroke-dasharray="4 7"/>
  <circle cx="1010" cy="160" r="5" fill="${t.a}"/>
  <animateTransform attributeName="transform" type="rotate" from="0 1010 160" to="360 1010 160" dur="48s" repeatCount="indefinite"/>
</g>
<text x="76" y="150" font-family="${FONT}" font-size="88" font-weight="800" letter-spacing="12" fill="${t.text}">SILVITE</text>
<rect x="76" y="172" width="360" height="2" rx="1" fill="url(#hair)"/>
<text x="76" y="212" font-family="${FONT}" font-size="22" font-weight="600" letter-spacing="5" fill="${t.a}">INDEPENDENT DEVELOPER</text>
<text x="76" y="246" font-family="${FONT}" font-size="18" fill="${t.text}">个人独立开发者</text>
<text x="76" y="282" font-family="${FONT}" font-size="15" fill="${t.muted}">独立开发跨设备互联、AI 翻译与可复用的工程护栏。</text>
</svg>`;
}

// ---------- 精选作品卡片 600×200 ----------
function card(p, t) {
  let x = 28;
  const pills = p.tags.map((tag) => {
    const w = textWidth(tag) + 22;
    const s = `<rect x="${x}" y="156" width="${w.toFixed(1)}" height="24" rx="12" fill="${t.tagBg}"/>` +
      `<text x="${(x + w / 2).toFixed(1)}" y="172" text-anchor="middle" font-family="${MONO}" font-size="11.5" fill="${t.tagText}">${esc(tag)}</text>`;
    x += w + 8;
    return s;
  }).join('');
  const border = p.highlight
    ? `<rect x="1" y="1" width="598" height="198" rx="18" fill="none" stroke="url(#ring)" stroke-width="1.6"/>`
    : `<rect x="0.5" y="0.5" width="599" height="199" rx="18" fill="none" stroke="${t.line}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200" viewBox="0 0 600 200" role="img" aria-label="${esc(p.title)}">
<defs>
  <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.a}"/><stop offset="1" stop-color="${t.b}"/></linearGradient>
  <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.a}"/><stop offset="1" stop-color="${t.b}"/></linearGradient>
  <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.a}" stop-opacity="0"/><stop offset=".5" stop-color="${t.a}" stop-opacity=".10"/><stop offset="1" stop-color="${t.a}" stop-opacity="0"/></linearGradient>
  <clipPath id="clip"><rect width="600" height="200" rx="18"/></clipPath>
</defs>
<style>
  .sheen{animation:sheen 8s ease-in-out infinite}
  @keyframes sheen{0%{transform:translateX(-220px)}55%,100%{transform:translateX(640px)}}
  @media (prefers-reduced-motion: reduce){*{animation:none!important}}
</style>
<rect width="600" height="200" rx="18" fill="${t.panel}"/>
<g clip-path="url(#clip)"><rect class="sheen" x="0" y="0" width="200" height="200" fill="url(#sheen)"/></g>
${border}
<rect x="28" y="22" width="44" height="3" rx="1.5" fill="url(#acc)"/>
<text x="572" y="34" text-anchor="end" font-family="${MONO}" font-size="11" letter-spacing="1.5" fill="${t.a}">${esc(p.kind.toUpperCase())}</text>
<text x="28" y="60" font-family="${FONT}" font-size="24" font-weight="700" fill="${t.text}">${esc(p.title)}</text>
<text x="28" y="84" font-family="${FONT}" font-size="14.5" font-weight="600" fill="${t.a}">${esc(p.subtitle)}</text>
<text x="28" y="116" font-family="${FONT}" font-size="13.5" fill="${t.muted}">${esc(p.desc[0])}</text>
<text x="28" y="136" font-family="${FONT}" font-size="13.5" fill="${t.muted}">${esc(p.desc[1])}</text>
${pills}
</svg>`;
}

// ---------- 邮箱按钮 360×64 ----------
function emailButton(email) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="380" height="64" viewBox="0 0 380 64" role="img" aria-label="Email: ${esc(email)}">
<defs>
  <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5EEAD4"/><stop offset="1" stop-color="#818CF8"/></linearGradient>
  <linearGradient id="fill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0E1729"/><stop offset="1" stop-color="#14203A"/></linearGradient>
</defs>
<style>
  .btn{animation:breathe 4s ease-in-out infinite}
  @keyframes breathe{0%,100%{stroke-opacity:.55}50%{stroke-opacity:1}}
  @media (prefers-reduced-motion: reduce){*{animation:none!important}}
</style>
<rect x="1" y="1" width="378" height="62" rx="31" fill="url(#fill)" stroke="url(#edge)" stroke-width="1.6" class="btn"/>
<g fill="none" stroke="#5EEAD4" stroke-width="1.8" stroke-linejoin="round">
  <rect x="30" y="22" width="22" height="16" rx="3"/>
  <polyline points="31,24 41,32 51,24"/>
</g>
<text x="66" y="26" font-family="${MONO}" font-size="10.5" letter-spacing="2" fill="#4E6284">EMAIL</text>
<text x="66" y="48" font-family="${FONT}" font-size="17" font-weight="600" fill="#EAF2FF">${esc(email)}</text>
<text x="352" y="38" text-anchor="end" font-family="${FONT}" font-size="18" fill="#5EEAD4">→</text>
</svg>`;
}

// ---------- 开发活动统计 800×200 ----------
const LANG_COLORS = ['#5EEAD4', '#818CF8', '#38BDF8', '#F472B6', '#FBBF24', '#34D399'];

async function ghJson(path) {
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'silvite-profile-builder' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${path} -> HTTP ${res.status}`);
  return res.json();
}

async function collectStats() {
  const repos = (await ghJson(`/users/${USER}/repos?per_page=100&type=owner&sort=pushed`)).filter((r) => !r.fork);
  if (repos.length === 0) throw new Error('no public repositories returned');
  const totals = {};
  for (const r of repos) {
    const langs = await ghJson(`/repos/${r.full_name}/languages`);
    for (const [name, bytes] of Object.entries(langs)) totals[name] = (totals[name] || 0) + bytes;
  }
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  const top = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([name, bytes]) => ({ name, pct: sum ? (bytes / sum) * 100 : 0 }));
  const lastPush = repos.map((r) => r.pushed_at).sort().at(-1).slice(0, 10);
  return { repoCount: repos.length, top, lastPush };
}

function statsSvg(s, t) {
  const W = 800, H = 200, barX = 270, barW = 500;
  let x = barX;
  const segs = s.top.map((l, i) => {
    const w = (l.pct / 100) * barW;
    const out = `<rect x="${x.toFixed(1)}" y="64" width="${Math.max(w, 1).toFixed(1)}" height="14" fill="${LANG_COLORS[i]}"/>`;
    x += w;
    return out;
  }).join('');
  const legend = s.top.map((l, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const lx = barX + col * 170, ly = 112 + row * 26;
    return `<circle cx="${lx + 5}" cy="${ly - 4}" r="4.5" fill="${LANG_COLORS[i]}"/>` +
      `<text x="${lx + 16}" y="${ly}" font-family="${FONT}" font-size="13" fill="${t.text}">${esc(l.name)}</text>` +
      `<text x="${lx + 150}" y="${ly}" text-anchor="end" font-family="${MONO}" font-size="12" fill="${t.muted}">${l.pct.toFixed(1)}%</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Public GitHub activity summary">
<defs><linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.a}" stop-opacity=".6"/><stop offset="1" stop-color="${t.b}" stop-opacity=".6"/></linearGradient></defs>
<rect x="0.5" y="0.5" width="799" height="199" rx="18" fill="${t.panel}" stroke="url(#edge)"/>
<text x="28" y="38" font-family="${MONO}" font-size="11.5" letter-spacing="2" fill="${t.a}">PUBLIC ACTIVITY</text>
<text x="28" y="98" font-family="${FONT}" font-size="44" font-weight="700" fill="${t.text}">${s.repoCount}</text>
<text x="28" y="122" font-family="${FONT}" font-size="13" fill="${t.muted}">公开原创仓库</text>
<text x="28" y="150" font-family="${MONO}" font-size="11.5" fill="${t.dim}">LAST PUSH</text>
<text x="28" y="168" font-family="${MONO}" font-size="13" fill="${t.text}">${s.lastPush}</text>
<text x="${barX}" y="38" font-family="${FONT}" font-size="13" fill="${t.muted}">主要语言（按代码字节统计）</text>
<rect x="${barX}" y="64" width="${barW}" height="14" rx="7" fill="${t.line}" opacity=".35"/>
<clipPath id="bar"><rect x="${barX}" y="64" width="${barW}" height="14" rx="7"/></clipPath>
<g clip-path="url(#bar)">${segs}</g>
${legend}
<text x="28" y="186" font-family="${FONT}" font-size="11" fill="${t.dim}">数据来自 GitHub API，由 GitHub Actions 每日刷新。</text>
</svg>`;
}

// ---------- 执行 ----------
async function main() {
  const { projects } = JSON.parse(readFileSync(join(ROOT, 'scripts/projects.json'), 'utf8'));

  for (const [mode, t] of Object.entries(THEMES)) {
    write(`banner-${mode}.svg`, banner(t));
    for (const p of projects) write(`card-${p.id}-${mode}.svg`, card(p, t));
  }
  write('contact-email.svg', emailButton('silvite@modiconnect.cn'));

  // 统计失败时抛错，由工作流决定保留旧文件；不写入半成品
  const stats = await collectStats();
  for (const [mode, t] of Object.entries(THEMES)) write(`stats-${mode}.svg`, statsSvg(stats, t));
  console.log(`stats: ${stats.repoCount} repos, top language ${stats.top[0]?.name}`);
}

main().catch((err) => {
  console.error('build-assets failed:', err.message);
  process.exit(1);
});
