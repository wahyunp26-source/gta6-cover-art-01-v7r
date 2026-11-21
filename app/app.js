"use strict";
/* VICE ROYALE — GTA 6 cover studio. Canvas 2D, offline, no network.
   Turns your photos into a multi-panel GTA-style poster and exports PNG.
   v7r: Royale layout (top-1 style big center hero), photoreal Sunset grade
   by default — the cover shows your photos as photos, never posterized. */

var SAMPLES = [
  { file: "samples/hero.jpg",    role: "THE DRIVER",  place: "CORAL BOULEVARD", time: "6:42 PM", note: "TOP DOWN, NO PLANS", fx: 0.5, fy: 0.48, zoom: 1.25 },
  { file: "samples/boss-new.jpg", role: "THE BOSS",    place: "PALM ROW",        time: "8:05 PM", note: "OWNS THE SKYLINE", fy: 0.30, zoom: 1.0 },
  { file: "samples/mechanic-new.jpg", role: "THE MECHANIC", place: "SUNSET GARAGE", time: "7:15 PM", note: "FIXES ANYTHING", fy: 0.42 },
  { file: "samples/captain-new.jpg", role: "THE CAPTAIN", place: "SANDS MARINA", time: "7:48 PM", note: "BOATS AND BAD IDEAS" },
  { file: "samples/rider-new.jpg", role: "THE RIDER",   place: "SANDS FREEWAY",   time: "7:05 PM", note: "NO BRAKES, NO REGRETS", fy: 0.42 },
  { file: "samples/fixer-new.jpg", role: "THE FIXER",  place: "NEON ROW",        time: "9:30 PM", note: "EVERYTHING HAS A PRICE", fy: 0.55 },
  { file: "samples/lookout-new.jpg", role: "THE LOOKOUT", place: "TOWER 9",       time: "6:10 PM", note: "LAST DIP OF THE DAY", fx: 0.58, fy: 0.42 },
  { file: "samples/getaway.jpg", role: "THE GETAWAY", place: "MIST LAKE",       time: "6:10 AM", note: "NO WAKE, NO TRACE" }
];
var ALT_PHOTOS = [
  "samples/alt-coast.jpg", "samples/alt-sea.jpg", "samples/alt-cliffs.jpg",
  "samples/alt-city.jpg", "samples/rider-new.jpg", "samples/alt-swim.jpg"
];
var ALL_PHOTOS = SAMPLES.map(function (s) { return s.file; }).concat(ALT_PHOTOS);

/* Layouts: rects are fractions of the cover [x, y, w, h]. */
var LAYOUTS = {
  "royale": { name: "Royale", desc: "Top-1 style: big center hero, 7 panels", titleY: 0.50,
    rects: [[0, 0, 0.23, 0.55], [0.23, 0, 0.40, 0.55], [0.63, 0, 0.185, 0.55], [0.815, 0, 0.185, 0.55],
            [0, 0.55, 0.23, 0.45], [0.23, 0.55, 0.40, 0.45], [0.63, 0.55, 0.37, 0.45]] },
  "vice-grid": { name: "Vice Grid", desc: "Hero left + 6 panels",
    rects: [[0, 0, 0.42, 1], [0.42, 0, 0.29, 0.333], [0.71, 0, 0.29, 0.333],
            [0.42, 0.333, 0.29, 0.333], [0.71, 0.333, 0.29, 0.333],
            [0.42, 0.667, 0.29, 0.333], [0.71, 0.667, 0.29, 0.333]] },
  "popout": { name: "Pop-Out Hero", desc: "Hero bursts out of the grid", popout: 0,
    rects: [[0, 0, 0.333, 0.5], [0.333, 0, 0.333, 0.5], [0.667, 0, 0.333, 0.5],
            [0, 0.5, 0.333, 0.5], [0.333, 0.5, 0.333, 0.5], [0.667, 0.5, 0.333, 0.5],
            [0.26, 0.14, 0.48, 0.72]] },
  "slant": { name: "Slant Cut", desc: "Diagonal panel dividers", slant: 0.055,
    rects: [[0, 0, 0.42, 1], [0.42, 0, 0.29, 0.333], [0.71, 0, 0.29, 0.333],
            [0.42, 0.333, 0.29, 0.333], [0.71, 0.333, 0.29, 0.333],
            [0.42, 0.667, 0.29, 0.333], [0.71, 0.667, 0.29, 0.333]] },
  "hero-left": { name: "Hero Left", desc: "Big hero, six stacked",
    rects: [[0, 0, 0.45, 1], [0.45, 0, 0.275, 0.333], [0.725, 0, 0.275, 0.333],
            [0.45, 0.333, 0.275, 0.333], [0.725, 0.333, 0.275, 0.333],
            [0.45, 0.667, 0.275, 0.333], [0.725, 0.667, 0.275, 0.333]] },
  "center-title": { name: "Center Title", desc: "Title is the middle panel", centerTitle: [0.333, 0.333, 0.334, 0.334],
    rects: [[0, 0, 0.333, 0.333], [0.333, 0, 0.333, 0.333], [0.667, 0, 0.333, 0.333],
            [0, 0.333, 0.333, 0.333], [0.667, 0.333, 0.333, 0.333],
            [0, 0.667, 0.333, 0.333], [0.333, 0.667, 0.333, 0.333], [0.667, 0.667, 0.333, 0.333]] },
  "film-strip": { name: "Film Strip", desc: "Two rows, title on the seam", titleY: 0.46,
    rects: [[0, 0, 0.25, 0.44], [0.25, 0, 0.25, 0.44], [0.5, 0, 0.25, 0.44], [0.75, 0, 0.25, 0.44],
            [0, 0.56, 0.333, 0.44], [0.333, 0.56, 0.333, 0.44], [0.667, 0.56, 0.333, 0.44]] },
  "triptych": { name: "Triptych", desc: "Three big frames + strip",
    rects: [[0, 0, 0.333, 0.72], [0.333, 0, 0.333, 0.72], [0.667, 0, 0.333, 0.72],
            [0, 0.72, 0.25, 0.28], [0.25, 0.72, 0.25, 0.28],
            [0.5, 0.72, 0.25, 0.28], [0.75, 0.72, 0.25, 0.28]] },
  "mosaic": { name: "Mosaic", desc: "Asymmetric collage",
    rects: [[0, 0, 0.55, 0.62], [0.55, 0, 0.225, 0.31], [0.775, 0, 0.225, 0.31],
            [0.55, 0.31, 0.45, 0.31],
            [0, 0.62, 0.333, 0.38], [0.333, 0.62, 0.333, 0.38], [0.667, 0.62, 0.333, 0.38]] }
};

var GRADES = {
  "sunset":   { name: "Sunset",      filter: "saturate(1.28) contrast(1.07) brightness(1.02) sepia(0.16)", warm: 0.10 },
  "neon":     { name: "Neon Nights", filter: "saturate(1.55) contrast(1.10) hue-rotate(-18deg)",          warm: 0.06 },
  "golden":   { name: "Golden Hour", filter: "sepia(0.30) saturate(1.32) contrast(1.05)",                warm: 0.12 },
  "chrome":   { name: "Chrome",      filter: "saturate(0.72) contrast(1.16) brightness(1.09)",           warm: 0.00 },
  "twilight": { name: "Twilight Gold", filter: "sepia(0.38) saturate(1.22) contrast(1.06)",              warm: 0.14 },
  "vicepink": { name: "Vice Pink",   filter: "saturate(1.45) contrast(1.06) hue-rotate(300deg)",          warm: 0.05 },
  "noir":     { name: "Noir",        filter: "grayscale(1) contrast(1.22) brightness(1.03)",             warm: 0.00 },
  "ink":      { name: "Painted Ink", filter: "saturate(1.18) contrast(1.06)", ink: true,                  warm: 0.00 }
};

var state = {
  layout: "royale",
  grade: "sunset",
  inkOutlines: false,
  size: "1920x1080",
  title: "VICE ROYALE",
  subtitle: "one last score",
  tagline: "SEVEN CREW · ONE COAST · NO WAY OUT",
  quote: "ROYALTY HAS A PRICE",
  quoteSource: "LEONIDA GAZETTE",
  vol: "VOL. 01",
  selected: 0,
  panels: SAMPLES.map(function (s) {
    return { photo: s.file, role: s.role, place: s.place, time: s.time, note: s.note, fx: s.fx || 0.5, fy: s.fy || 0.42, zoom: s.zoom || 1.1, img: null };
  })
};

var canvas, ctx;
var photoCache = {};

function $(id) { return document.getElementById(id); }

function loadPhoto(file) {
  if (photoCache[file]) return photoCache[file];
  var p = new Promise(function (resolve) {
    var img = new Image();
    img.onload = function () { resolve(img); };
    img.onerror = function () { resolve(null); };
    img.src = file;
  });
  photoCache[file] = p;
  return p;
}

function roundRectPath(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function starburstPath(c, cx, cy, rOuter, rInner, points) {
  c.beginPath();
  for (var i = 0; i < points * 2; i++) {
    var r = (i % 2 === 0) ? rOuter : rInner;
    var a = (Math.PI * i) / points - Math.PI / 2;
    var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
  }
  c.closePath();
}

/* Fixed barcode bars so every export is deterministic. */
var BARCODE_BARS = [3, 1, 2, 1, 1, 4, 1, 2, 2, 1, 3, 1, 1, 2, 4, 1, 1, 3, 2, 1, 1, 2, 1, 4, 2, 1, 3, 1, 2, 2, 1, 1, 3, 2, 1, 4, 1, 2, 1, 1, 3, 1, 2, 4, 1, 1, 2, 3];

function drawBarcode(c, x, y, w, h) {
  var total = 0, i;
  for (i = 0; i < BARCODE_BARS.length; i++) total += BARCODE_BARS[i] + 1;
  var unit = w / total, px = x;
  c.fillStyle = "#111";
  for (i = 0; i < BARCODE_BARS.length; i++) {
    c.fillRect(px, y, BARCODE_BARS[i] * unit, h);
    px += (BARCODE_BARS[i] + 1) * unit;
  }
}

function fitFont(c, text, maxWidth, startSize, family, weight) {
  var size = startSize;
  c.font = weight + " " + size + "px " + family;
  while (size > 10 && c.measureText(text).width > maxWidth) {
    size -= 2;
    c.font = weight + " " + size + "px " + family;
  }
  return size;
}

function drawCoverFit(c, img, dx, dy, dw, dh, fx, fy, zoom) {
  var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  var scale = Math.max(dw / iw, dh / ih) * zoom;
  var sw = dw / scale, sh = dh / scale;
  var sx = Math.max(0, Math.min(iw - sw, (fx * iw) - sw / 2));
  var sy = Math.max(0, Math.min(ih - sh, (fy * ih) - sh / 2));
  if (sw > iw) { sx = 0; sw = iw; }
  if (sh > ih) { sy = 0; sh = ih; }
  c.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

/* ---- main composition ---- */
function renderCover(c, W, H) {
  var layout = LAYOUTS[state.layout];
  var grade = GRADES[state.grade];
  var useInk = !!grade.ink || state.inkOutlines;
  var i;
  c.clearRect(0, 0, W, H);
  c.fillStyle = useInk ? "#f5ebc8" : "#160a1e";
  c.fillRect(0, 0, W, H);
  var slantX = layout.slant ? W * layout.slant * 0.28 : 0;
  /* the photo grid ends at 0.92 so the credits strip never covers a panel */
  var rects = layout.rects.map(function (r) { return [r[0], r[1] * 0.92, r[2], r[3] * 0.92]; });
  var n = rects.length;
  if (layout.popout !== undefined) {
    for (i = 0; i < 6; i++) {
      drawPanel(c, state.panels[i + 1], rects[i], W, H, grade, useInk, 0);
    }
    var hero = state.panels[0], hr = rects[6];
    var hx = hr[0] * W, hy = hr[1] * H, hw = hr[2] * W, hh = hr[3] * H;
    c.save();
    c.translate(hx + hw / 2, hy + hh / 2); c.rotate(-0.02);
    c.shadowColor = "rgba(0,0,0,0.55)"; c.shadowBlur = W * 0.02; c.shadowOffsetY = W * 0.008;
    c.fillStyle = "#fff"; c.fillRect(-hw / 2 - 6, -hh / 2 - 6, hw + 12, hh + 12);
    c.shadowColor = "transparent"; c.shadowBlur = 0; c.shadowOffsetY = 0;
    c.beginPath(); c.rect(-hw / 2, -hh / 2, hw, hh); c.clip();
    if (hero.img) {
      if (useInk) {
        var inkC = paintInkPanel(hero.img, Math.round(hw), Math.round(hh), hero.fx, hero.fy, hero.zoom, grade.filter);
        c.drawImage(inkC, -hw / 2, -hh / 2, hw, hh);
      } else {
        c.filter = grade.filter;
        drawCoverFit(c, hero.img, -hw / 2, -hh / 2, hw, hh, hero.fx, hero.fy, hero.zoom);
        c.filter = "none";
      }
    }
    c.restore();
    drawPanelLabels(c, hero, hx, hy, hw, hh, W, H, false, false);
  } else {
    for (i = 0; i < n; i++) {
      drawPanel(c, state.panels[i], rects[i], W, H, grade, useInk, slantX);
    }
  }
  drawOverlays(c, W, H, layout, useInk);
}

function drawOverlays(c, W, H, layout, useInk) {
  var u = W / 1920; /* scale unit */
  /* outer frame */
  c.save();
  c.strokeStyle = useInk ? "#f5ebc8" : "#ffc93c";
  c.lineWidth = Math.max(4, 8 * u);
  c.strokeRect(4 * u, 4 * u, W - 8 * u, H - 8 * u);
  c.strokeStyle = "rgba(20,10,28,0.85)";
  c.lineWidth = Math.max(2, 3 * u);
  c.strokeRect(10 * u, 10 * u, W - 20 * u, H - 20 * u);
  c.restore();
  /* press quote, top */
  c.save();
  c.textAlign = "center"; c.textBaseline = "middle";
  var qfs = Math.max(13, 22 * u);
  c.font = "700 " + qfs + "px \"Vice Bold\", sans-serif";
  c.fillStyle = "#ffc93c";
  var quoteText = "★★★★★  \u201C" + state.quote + "\u201D — " + state.quoteSource;
  var qw = c.measureText(quoteText).width;
  if (qw > W * 0.78) {
    c.font = "700 " + Math.max(11, Math.floor(qfs * (W * 0.78) / qw)) + "px \"Vice Bold\", sans-serif";
  }
  c.shadowColor = "rgba(0,0,0,0.8)"; c.shadowBlur = 6;
  c.fillText(quoteText, W * 0.44, H * 0.045);
  c.restore();
  /* VOL chip, top-right */
  c.save();
  c.font = "900 " + Math.max(13, 20 * u) + "px \"Vice Black\", sans-serif";
  var vw = c.measureText(state.vol).width + 26 * u;
  c.fillStyle = "#ffc93c";
  roundRectPath(c, W - vw - 18 * u, H * 0.022, vw, 34 * u, 4); c.fill();
  c.fillStyle = "#1a0b22"; c.textAlign = "center"; c.textBaseline = "middle";
  c.fillText(state.vol, W - vw / 2 - 18 * u, H * 0.022 + 17 * u);
  c.restore();
  /* title block */
  if (layout.centerTitle) {
    var tr = layout.centerTitle;
    var tx = tr[0] * W, ty = tr[1] * H * 0.92, tw = tr[2] * W, th = tr[3] * H * 0.92;
    c.fillStyle = useInk ? "#f5ebc8" : "#1c0b26";
    c.fillRect(tx, ty, tw, th);
    /* pale gold sunburst behind the title */
    c.save();
    c.beginPath(); c.rect(tx, ty, tw, th); c.clip();
    var scx = tx + tw / 2, scy = ty + th * 0.38;
    for (var si = 0; si < 16; si++) {
      c.fillStyle = si % 2 === 0 ? (useInk ? "#eed489" : "#2a1338") : (useInk ? "#f5ebc8" : "#1c0b26");
      c.beginPath(); c.moveTo(scx, scy);
      var sa0 = (si / 16) * Math.PI * 2, sa1 = ((si + 1) / 16) * Math.PI * 2;
      c.lineTo(scx + Math.cos(sa0) * tw, scy + Math.sin(sa0) * th);
      c.lineTo(scx + Math.cos(sa1) * tw, scy + Math.sin(sa1) * th);
      c.closePath(); c.fill();
    }
    c.restore();
    c.strokeStyle = "#ffc93c"; c.lineWidth = Math.max(2, 3 * u);
    c.strokeRect(tx + 4, ty + 4, tw - 8, th - 8);
    var ts = drawRetroTitle(c, state.title, tx + tw / 2, ty + th * 0.38, tw * 0.30, W);
    drawScript(c, state.subtitle, tx + tw / 2, ty + th * 0.38 + ts * 0.62, tw * 0.115, W);
    drawRibbon(c, tx + tw * 0.06, ty + th * 0.74, tw * 0.88, Math.max(26, 40 * u), state.tagline, W);
  } else {
    var titleY = H * (layout.titleY || 0.50);
    /* the title is the poster: bigger than v6 so it reads at a glance,
       the hero face stays clear above it (top row ends at 0.506 H) */
    var tSize = drawRetroTitle(c, state.title, W / 2, titleY, W * 0.125, W);
    /* script sits just below the title, clear of the bottom-row faces */
    drawScript(c, state.subtitle, W / 2, titleY + tSize * 0.80, W * 0.036, W);
    drawRibbon(c, W * 0.5 - Math.min(W * 0.34, 620 * u), titleY + tSize * 0.98, Math.min(W * 0.68, 1240 * u), Math.max(28, 44 * u), state.tagline, W);
  }
  /* starburst seal, bottom-right above the credits strip */
  drawStarburst(c, W * 0.925, H * 0.815, Math.max(34, 86 * u), "ORIGINAL", "COVER ART");
  /* bottom strip: COMING SOON + credits naming every role + barcode */
  var stripY = H * 0.925, stripH = H * 0.075;
  c.fillStyle = "rgba(12,6,18,0.94)";
  c.fillRect(0, stripY, W, stripH);
  c.fillStyle = "#ff5da2";
  c.font = "900 " + Math.max(14, 24 * u) + "px \"Vice Black\", sans-serif";
  c.textAlign = "left"; c.textBaseline = "middle";
  c.fillText("COMING SOON", 18 * u, stripY + stripH / 2);
  var shown = state.panels.slice(0, layout.rects.length);
  var credits = "A VICE ROYALE PICTURE · STARRING " + shown.map(function (p) { return p.role; }).join(" · ") + " · SHOT ON YOUR OWN CAMERA";
  c.fillStyle = "#f6ead9";
  var cfs = fitFont(c, credits, W * 0.62, Math.max(11, 17 * u), "\"Vice Sans\", sans-serif", "400");
  c.font = "400 " + cfs + "px \"Vice Sans\", sans-serif";
  c.textAlign = "center";
  c.fillText(credits, W * 0.47, stripY + stripH / 2);
  /* barcode: black bars on a white plate, like a real poster */
  c.fillStyle = "#f6ead9";
  c.fillRect(W * 0.885, stripY + stripH * 0.18, W * 0.095, stripH * 0.52);
  drawBarcode(c, W * 0.885, stripY + stripH * 0.18, W * 0.095, stripH * 0.52);
  c.fillStyle = "#f6ead9";
  c.font = "400 " + Math.max(9, 12 * u) + "px \"Vice Sans\", sans-serif";
  c.textAlign = "center";
  c.fillText("002113 122020", W * 0.9325, stripY + stripH * 0.86);
}

function drawRibbon(c, x, y, w, h, text, W) {
  c.save();
  c.fillStyle = "rgba(12,6,18,0.92)";
  c.beginPath();
  c.moveTo(x + h * 0.5, y); c.lineTo(x + w - h * 0.5, y); c.lineTo(x + w, y + h / 2);
  c.lineTo(x + w - h * 0.5, y + h); c.lineTo(x + h * 0.5, y + h); c.lineTo(x, y + h / 2);
  c.closePath(); c.fill();
  c.strokeStyle = "#ff2e88"; c.lineWidth = Math.max(1.5, 2.5 * (W / 1920)); c.stroke();
  c.fillStyle = "#fff";
  var fs = fitFont(c, text, w * 0.94, Math.max(12, h * 0.52), "\"Vice Bold\", sans-serif", "700");
  c.font = "700 " + fs + "px \"Vice Bold\", sans-serif";
  c.textAlign = "center"; c.textBaseline = "middle";
  c.fillText(text, x + w / 2, y + h / 2 + 1);
  c.restore();
}

/* ---- Painted / Ink: posterize to flat colour + Sobel ink outlines ---- */
function paintInkPanel(img, w, h, fx, fy, zoom, filter) {
  var cap = 640;
  var sw = Math.min(w, cap), sh = Math.max(2, Math.round((h * sw) / w));
  var off = document.createElement("canvas");
  off.width = sw; off.height = sh;
  var o = off.getContext("2d");
  o.filter = filter || "none";
  drawCoverFit(o, img, 0, 0, sw, sh, fx, fy, zoom);
  o.filter = "none";
  var data = o.getImageData(0, 0, sw, sh);
  var px = data.data, i, x, y;
  /* gentle 3x3 blur first: smooths skin and sky so the posterize reads as
     flat colour, not blotches */
  var bpx = new Uint8ClampedArray(px.length);
  for (y = 0; y < sh; y++) {
    for (x = 0; x < sw; x++) {
      var br = 0, bg = 0, bb = 0, bn = 0;
      for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
        var xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= sw || yy >= sh) continue;
        var j = (yy * sw + xx) * 4;
        br += px[j]; bg += px[j + 1]; bb += px[j + 2]; bn++;
      }
      var k = (y * sw + x) * 4;
      bpx[k] = br / bn; bpx[k + 1] = bg / bn; bpx[k + 2] = bb / bn; bpx[k + 3] = 255;
    }
  }
  var gray = new Float32Array(sw * sh);
  for (i = 0; i < sw * sh; i++) {
    gray[i] = 0.299 * bpx[i * 4] + 0.587 * bpx[i * 4 + 1] + 0.114 * bpx[i * 4 + 2];
  }
  var LEVELS = 6;
  function poster(v) { return Math.round((v / 255) * (LEVELS - 1)) * (255 / (LEVELS - 1)); }
  var out = o.createImageData(sw, sh);
  var op = out.data;
  for (y = 0; y < sh; y++) {
    for (x = 0; x < sw; x++) {
      var idx = y * sw + x;
      var gx = 0, gy = 0;
      if (x > 0 && x < sw - 1 && y > 0 && y < sh - 1) {
        gx = -gray[idx - sw - 1] - 2 * gray[idx - 1] - gray[idx + sw - 1]
           + gray[idx - sw + 1] + 2 * gray[idx + 1] + gray[idx + sw + 1];
        gy = -gray[idx - sw - 1] - 2 * gray[idx - sw] - gray[idx - sw + 1]
           + gray[idx + sw - 1] + 2 * gray[idx + sw] + gray[idx + sw + 1];
      }
      var mag = Math.sqrt(gx * gx + gy * gy) / 4;
      var edge = Math.max(0, Math.min(1, (mag - 50) / 80));
      var pr = poster(bpx[idx * 4]), pg = poster(bpx[idx * 4 + 1]), pb = poster(bpx[idx * 4 + 2]);
      op[idx * 4]     = pr * (1 - edge) + 26 * edge;
      op[idx * 4 + 1] = pg * (1 - edge) + 11 * edge;
      op[idx * 4 + 2] = pb * (1 - edge) + 34 * edge;
      op[idx * 4 + 3] = 255;
    }
  }
  o.putImageData(out, 0, 0);
  o.fillStyle = "rgba(245, 235, 205, 0.10)";
  o.fillRect(0, 0, sw, sh);
  return off;
}

/* ---- one photo panel ---- */
function drawPanel(c, panel, rect, W, H, grade, useInk, slantX) {
  var x = rect[0] * W, y = rect[1] * H, w = rect[2] * W, h = rect[3] * H;
  var gap = Math.max(3, W * 0.004);
  x += gap / 2; y += gap / 2; w -= gap; h -= gap;
  if (w <= 4 || h <= 4 || !panel.img) return;
  c.save();
  if (slantX) {
    c.beginPath();
    c.moveTo(x + slantX, y); c.lineTo(x + w + slantX, y);
    c.lineTo(x + w - slantX, y + h); c.lineTo(x - slantX, y + h);
    c.closePath(); c.clip();
  } else {
    c.beginPath(); c.rect(x, y, w, h); c.clip();
  }
  if (useInk) {
    var inkCanvas = paintInkPanel(panel.img, Math.round(w), Math.round(h), panel.fx, panel.fy, panel.zoom, grade.filter);
    c.drawImage(inkCanvas, x, y, w, h);
  } else {
    c.filter = grade.filter;
    drawCoverFit(c, panel.img, x, y, w, h, panel.fx, panel.fy, panel.zoom);
    c.filter = "none";
    if (grade.warm > 0) {
      var wg = c.createLinearGradient(x, y, x, y + h);
      wg.addColorStop(0, "rgba(255,140,40," + (grade.warm * 0.7) + ")");
      wg.addColorStop(1, "rgba(255,40,120," + (grade.warm * 0.5) + ")");
      c.fillStyle = wg; c.fillRect(x, y, w, h);
    }
  }
  var vg = c.createRadialGradient(x + w / 2, y + h / 2, Math.min(w, h) * 0.35, x + w / 2, y + h / 2, Math.max(w, h) * 0.75);
  vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(10,4,20,0.28)");
  c.fillStyle = vg; c.fillRect(x, y, w, h);
  c.restore();
  c.strokeStyle = "rgba(20,10,28,0.9)"; c.lineWidth = Math.max(2, W * 0.002);
  if (slantX) {
    c.beginPath();
    c.moveTo(x + slantX, y); c.lineTo(x + w + slantX, y);
    c.lineTo(x + w - slantX, y + h); c.lineTo(x - slantX, y + h);
    c.closePath(); c.stroke();
  } else {
    c.strokeRect(x, y, w, h);
  }
  drawPanelLabels(c, panel, x, y, w, h, W, H, rect[1] === 0, rect[1] + rect[3] >= 0.91);
}

function drawPanelLabels(c, panel, x, y, w, h, W, H, isTop, isBottom) {
  var chipH = Math.max(20, W * 0.016);
  var fs = Math.max(11, W * 0.011);
  /* top-row panels sit under the press-quote band; bottom-row panels carry
     their labels at the foot, clear of the title block */
  var topPad = isTop ? Math.max(30, H * 0.055) : 0;
  var chipY = isBottom ? y + h - 6 - chipH : y + 6 + topPad;
  /* role chip only — the top entries keep panels clean: no place/time bars
     on the cover itself (the editor still holds that data) */
  c.font = "700 " + fs + "px \"Vice Bold\", sans-serif";
  var tw = c.measureText(panel.role).width;
  var cw = tw + fs * 1.1;
  c.fillStyle = "rgba(12,6,18,0.92)";
  roundRectPath(c, x + 6, chipY, cw, chipH, 3); c.fill();
  c.fillStyle = "#ff2e88"; c.fillRect(x + 6, chipY, 4, chipH);
  c.fillStyle = "#fff"; c.textAlign = "left"; c.textBaseline = "middle";
  c.fillText(panel.role, x + 6 + fs * 0.7, chipY + chipH / 2 + 0.5);
}

/* ---- striped retro-chrome title ---- */
function drawRetroTitle(c, text, cx, cy, size, W) {
  c.save();
  c.textAlign = "center"; c.textBaseline = "middle";
  var s = fitFont(c, text, W * 0.96, size, "\"Vice Black\", sans-serif", "900");
  c.font = "900 " + s + "px \"Vice Black\", sans-serif";
  /* extrude shadow */
  c.fillStyle = "#2a0a3d";
  c.fillText(text, cx + s * 0.045, cy + s * 0.062);
  /* dark outline */
  c.lineJoin = "round";
  c.lineWidth = s * 0.085;
  c.strokeStyle = "#2a0a3d";
  c.strokeText(text, cx, cy);
  /* horizontal chrome stripes clipped to the glyphs */
  var g = c.createLinearGradient(0, cy - s * 0.56, 0, cy + s * 0.56);
  g.addColorStop(0.00, "#ffe45e"); g.addColorStop(0.20, "#ffe45e");
  g.addColorStop(0.20, "#ffb52e"); g.addColorStop(0.40, "#ffb52e");
  g.addColorStop(0.40, "#ff7a1a"); g.addColorStop(0.60, "#ff7a1a");
  g.addColorStop(0.60, "#ff2e88"); g.addColorStop(0.80, "#ff2e88");
  g.addColorStop(0.80, "#b967ff"); g.addColorStop(1.00, "#b967ff");
  c.fillStyle = g;
  c.fillText(text, cx, cy);
  c.restore();
  return s;
}

function drawScript(c, text, cx, cy, size, W) {
  c.save();
  c.translate(cx, cy); c.rotate(-0.035);
  var s = fitFont(c, text, W * 0.72, size, "\"Vice Script\", serif", "700");
  c.font = "700 italic " + s + "px \"Vice Script\", serif";
  c.textAlign = "center"; c.textBaseline = "middle";
  c.shadowColor = "rgba(255,46,136,0.85)"; c.shadowBlur = s * 0.35;
  var g = c.createLinearGradient(0, -s * 0.5, 0, s * 0.5);
  g.addColorStop(0, "#ffd7ea"); g.addColorStop(0.5, "#ff5da2"); g.addColorStop(1, "#ff2e88");
  c.fillStyle = g;
  c.fillText(text, 0, 0);
  c.restore();
  return s;
}

function drawStarburst(c, cx, cy, r, labelTop, labelBottom) {
  c.save();
  c.translate(cx, cy);
  starburstPath(c, 0, 0, r, r * 0.78, 16);
  c.fillStyle = "#ffc93c"; c.fill();
  c.lineWidth = Math.max(2, r * 0.05); c.strokeStyle = "#2a0a3d"; c.stroke();
  c.fillStyle = "#2a0a3d"; c.textAlign = "center"; c.textBaseline = "middle";
  c.font = "900 " + Math.round(r * 0.20) + "px \"Vice Black\", sans-serif";
  c.fillText(labelTop, 0, -r * 0.22);
  c.fillText(labelBottom, 0, r * 0.10);
  c.font = "700 " + Math.round(r * 0.16) + "px \"Vice Sans\", sans-serif";
  c.fillText("★★★", 0, r * 0.42);
  c.restore();
}


/* ---- UI wiring, export, boot ---- */
var renderTimer = null;
function requestRender() {
  if (renderTimer) clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 120);
}
function render() {
  if (!canvas || !ctx) return;
  var dims = state.size.split("x");
  var W = parseInt(dims[0], 10), H = parseInt(dims[1], 10);
  if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
  renderCover(ctx, W, H);
}

function buildSlots() {
  var box = $("photoSlots");
  box.innerHTML = "";
  state.panels.forEach(function (p, i) {
    var b = document.createElement("button");
    b.className = "slot" + (state.selected === i ? " on" : "");
    b.title = p.role + " — click to select, double-click to swap photo";
    var img = document.createElement("img");
    img.src = p.photo; img.alt = p.role;
    var sp = document.createElement("span");
    sp.textContent = p.role;
    b.appendChild(img); b.appendChild(sp);
    b.addEventListener("click", function () { selectPanel(i); });
    b.addEventListener("dblclick", function () { cyclePhoto(i); });
    box.appendChild(b);
  });
}

function selectPanel(i) {
  state.selected = i;
  var p = state.panels[i];
  $("zoomRange").value = Math.round(p.zoom * 100);
  $("fxRange").value = Math.round(p.fx * 100);
  $("fyRange").value = Math.round(p.fy * 100);
  buildSlots();
}

function cyclePhoto(i) {
  var p = state.panels[i];
  var idx = ALL_PHOTOS.indexOf(p.photo);
  var next = ALL_PHOTOS[(idx + 1) % ALL_PHOTOS.length];
  p.photo = next;
  loadPhoto(next).then(function (img) { p.img = img; buildSlots(); render(); });
}

function buildOptionGrid(elId, items, current, onPick) {
  var box = $(elId);
  box.innerHTML = "";
  Object.keys(items).forEach(function (key) {
    var b = document.createElement("button");
    b.className = current === key ? "on" : "";
    var nm = document.createElement("div"); nm.textContent = items[key].name;
    var ds = document.createElement("small"); ds.textContent = items[key].desc || "";
    b.appendChild(nm); b.appendChild(ds);
    b.addEventListener("click", function () { onPick(key); });
    box.appendChild(b);
  });
}

function refreshOptionGrids() {
  buildOptionGrid("layoutGrid", LAYOUTS, state.layout, function (k) {
    state.layout = k; $("layoutName").textContent = LAYOUTS[k].name;
    refreshOptionGrids(); render();
  });
  var gradeItems = {};
  Object.keys(GRADES).forEach(function (k) { gradeItems[k] = { name: GRADES[k].name, desc: GRADES[k].ink ? "flat colour + ink" : "" }; });
  buildOptionGrid("gradeGrid", gradeItems, state.grade, function (k) {
    state.grade = k; $("gradeName").textContent = GRADES[k].name;
    refreshOptionGrids(); render();
  });
  $("layoutName").textContent = LAYOUTS[state.layout].name;
  $("gradeName").textContent = GRADES[state.grade].name;
}

function exportPNG() {
  var dims = state.size.split("x");
  var W = parseInt(dims[0], 10), H = parseInt(dims[1], 10);
  var off = document.createElement("canvas");
  off.width = W; off.height = H;
  renderCover(off.getContext("2d"), W, H);
  off.toBlob(function (blob) {
    if (!blob) return;
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "vice-royale-" + state.size + ".png";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
  }, "image/png");
}

function applyParams() {
  var q = new URLSearchParams(location.search);
  if (q.get("layout") && LAYOUTS[q.get("layout")]) state.layout = q.get("layout");
  if (q.get("grade") && GRADES[q.get("grade")]) state.grade = q.get("grade");
  if (q.get("size") && /^\d+x\d+$/.test(q.get("size"))) state.size = q.get("size");
  if (q.get("ink") === "1") state.inkOutlines = true;
  if (q.get("title")) state.title = q.get("title").toUpperCase().slice(0, 14);
  if (q.get("shot") === "cover") document.body.classList.add("cover-only");
}

function bindUI() {
  $("sizeGroup").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-size]");
    if (!b) return;
    state.size = b.dataset.size;
    Array.prototype.forEach.call($("sizeGroup").children, function (x) { x.classList.toggle("on", x === b); });
    render();
  });
  $("downloadBtn").addEventListener("click", exportPNG);
  $("inkToggle").addEventListener("change", function (e) { state.inkOutlines = e.target.checked; render(); });
  $("inTitle").addEventListener("input", function (e) { state.title = e.target.value.toUpperCase() || "VICE ROYALE"; requestRender(); });
  $("inSub").addEventListener("input", function (e) { state.subtitle = e.target.value || ""; requestRender(); });
  $("inTag").addEventListener("input", function (e) { state.tagline = e.target.value.toUpperCase() || ""; requestRender(); });
  $("inQuote").addEventListener("input", function (e) { state.quote = e.target.value.toUpperCase() || ""; requestRender(); });
  $("inSource").addEventListener("input", function (e) { state.quoteSource = e.target.value.toUpperCase() || ""; requestRender(); });
  $("inVol").addEventListener("input", function (e) { state.vol = e.target.value.toUpperCase() || ""; requestRender(); });
  $("zoomRange").addEventListener("input", function (e) { state.panels[state.selected].zoom = e.target.value / 100; requestRender(); });
  $("fxRange").addEventListener("input", function (e) { state.panels[state.selected].fx = e.target.value / 100; requestRender(); });
  $("fyRange").addEventListener("input", function (e) { state.panels[state.selected].fy = e.target.value / 100; requestRender(); });
  $("autoFillBtn").addEventListener("click", function () {
    var files = ALL_PHOTOS.slice();
    for (var i = files.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = files[i]; files[i] = files[j]; files[j] = t; }
    state.panels.forEach(function (p, i) { p.photo = files[i % files.length]; });
    bootPhotos().then(function () { buildSlots(); render(); });
  });
  $("fileInput").addEventListener("change", function (e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      var img = new Image();
      img.onload = function () {
        var p = state.panels[state.selected];
        p.photo = r.result; p.img = img; buildSlots(); render();
      };
      img.src = r.result;
    };
    r.readAsDataURL(f);
  });
  var drag = null;
  canvas.addEventListener("pointerdown", function (e) {
    var rect = canvas.getBoundingClientRect();
    var px = (e.clientX - rect.left) / rect.width, py = (e.clientY - rect.top) / rect.height;
    var layout = LAYOUTS[state.layout];
    for (var i = 0; i < layout.rects.length; i++) {
      var r0 = layout.rects[i];
      var r = [r0[0], r0[1] * 0.92, r0[2], r0[3] * 0.92];
      if (px >= r[0] && px <= r[0] + r[2] && py >= r[1] && py <= r[1] + r[3]) {
        var pi = layout.popout !== undefined ? (i === 6 ? 0 : i + 1) : i;
        selectPanel(pi);
        drag = { panel: state.panels[pi], x0: e.clientX, y0: e.clientY, fx: state.panels[pi].fx, fy: state.panels[pi].fy };
        canvas.setPointerCapture(e.pointerId);
        break;
      }
    }
  });
  canvas.addEventListener("pointermove", function (e) {
    if (!drag) return;
    var rect = canvas.getBoundingClientRect();
    drag.panel.fx = Math.max(0, Math.min(1, drag.fx - (e.clientX - drag.x0) / rect.width * 0.9));
    drag.panel.fy = Math.max(0, Math.min(1, drag.fy - (e.clientY - drag.y0) / rect.height * 0.9));
    $("fxRange").value = Math.round(drag.panel.fx * 100);
    $("fyRange").value = Math.round(drag.panel.fy * 100);
    requestRender();
  });
  canvas.addEventListener("pointerup", function () { drag = null; });
}

function bootPhotos() {
  var jobs = state.panels.map(function (p) {
    return loadPhoto(p.photo).then(function (img) { p.img = img; });
  });
  return Promise.all(jobs);
}

function boot() {
  canvas = $("cover");
  ctx = canvas.getContext("2d");
  applyParams();
  $("inTitle").value = state.title;
  $("inSub").value = state.subtitle;
  $("inTag").value = state.tagline;
  $("inQuote").value = state.quote;
  $("inSource").value = state.quoteSource;
  $("inVol").value = state.vol;
  $("inkToggle").checked = state.inkOutlines;
  Array.prototype.forEach.call($("sizeGroup").children, function (x) { x.classList.toggle("on", x.dataset.size === state.size); });
  bindUI();
  buildSlots();
  refreshOptionGrids();
  selectPanel(0);
  var fontsReady = Promise.all([
    document.fonts.load("900 100px \"Vice Black\""),
    document.fonts.load("700 100px \"Vice Bold\""),
    document.fonts.load("400 100px \"Vice Sans\""),
    document.fonts.load("700 italic 100px \"Vice Script\"")
  ]).catch(function () { return null; });
  Promise.all([bootPhotos(), fontsReady]).then(function () { render(); });
  setTimeout(render, 2500);
}

document.addEventListener("DOMContentLoaded", boot);
