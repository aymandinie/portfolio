(function() {
  "use strict";
  var cv = document.getElementById("heroCanvas");
  if (!cv) return;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ctx = cv.getContext("2d");
  var dpr = Math.min(devicePixelRatio || 1, 2);
  var W = 0, H = 0, pts = [], raf = null;
  var mx = -9999, my = -9999, tmx = -9999, tmy = -9999;
  var blast = 0;
  var born = performance.now();
  var WORD = "ZAC";
  var COLOURS = [ "#3d7aff", "#6f9cff", "#9dbaff", "#ffffff" ];
  function sample() {
    var off = document.createElement("canvas");
    var size = Math.min(W * .78, 900);
    /* v2.1: also fit the height, so the letters never reach the hint line under the field */
    var fs = Math.min(Math.max(90, size / (WORD.length * .62)), H * .7);
    off.width = W;
    off.height = H;
    var o = off.getContext("2d");
    o.fillStyle = "#fff";
    o.textAlign = "center";
    o.textBaseline = "middle";
    o.font = "700 " + fs + 'px "SF Pro Display",-apple-system,"Helvetica Neue",Arial,sans-serif';
    o.fillText(WORD, W / 2, H / 2);
    var data = o.getImageData(0, 0, W, H).data;
    var gap = W < 700 ? 6 : 5;
    var found = [];
    for (var y = 0; y < H; y += gap) {
      for (var x = 0; x < W; x += gap) {
        if (data[(y * W + x) * 4 + 3] > 128) {
          found.push({
            hx: x + (Math.random() - .5) * 2,
            hy: y + (Math.random() - .5) * 2
          });
        }
      }
    }
    pts = found.map(function(f, i) {
      var edge = Math.random();
      var sx = edge < .5 ? Math.random() < .5 ? -60 : W + 60 : Math.random() * W;
      var sy = edge < .5 ? Math.random() * H : Math.random() < .5 ? -60 : H + 60;
      return {
        x: sx,
        y: sy,
        hx: f.hx,
        hy: f.hy,
        vx: 0,
        vy: 0,
        c: COLOURS[i % COLOURS.length],
        s: Math.random() < .12 ? 1.9 : 1.1,
        d: .055 + Math.random() * .05,
        f: .86 + Math.random() * .06
      };
    });
  }
  function size() {
    W = cv.clientWidth;
    H = cv.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sample();
  }
  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    mx += (tmx - mx) * .14;
    my += (tmy - my) * .14;
    if (blast > 0) blast *= .94;
    if (blast < .01) blast = 0;
    var intro = Math.min((now - born) / 900, 1);
    ctx.globalAlpha = intro;
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.vx += (p.hx - p.x) * p.d;
      p.vy += (p.hy - p.y) * p.d;
      var dx = p.x - mx, dy = p.y - my;
      var d2 = dx * dx + dy * dy;
      if (d2 < 26e3) {
        var d = Math.sqrt(d2) || 1;
        var force = (1 - d / 161) * 5.2;
        p.vx += dx / d * force;
        p.vy += dy / d * force;
      }
      if (blast > 0) {
        var bx = p.x - W / 2, by = p.y - H / 2;
        var bd = Math.sqrt(bx * bx + by * by) || 1;
        p.vx += bx / bd * blast * 2.4;
        p.vy += by / bd * blast * 2.4;
      }
      p.vx *= p.f;
      p.vy *= p.f;
      p.x += p.vx;
      p.y += p.vy;
      var off = Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy);
      var heat = Math.min(off / 90, 1);
      ctx.globalAlpha = intro * (.5 + heat * .5);
      ctx.fillStyle = p.c;
      var s = p.s * (1 + heat * 1.1);
      ctx.fillRect(p.x, p.y, s, s);
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }
  addEventListener("mousemove", function(e) {
    var r = cv.getBoundingClientRect();
    tmx = e.clientX - r.left;
    tmy = e.clientY - r.top;
  }, {
    passive: true
  });
  addEventListener("mouseleave", function() {
    tmx = -9999;
    tmy = -9999;
  });
  cv.addEventListener("pointerdown", function() {
    blast = 9;
  });
  addEventListener("resize", function() {
    size();
  }, {
    passive: true
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function(es) {
      es.forEach(function(e) {
        if (e.isIntersecting && !raf) raf = requestAnimationFrame(draw); else if (!e.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      });
    }, {
      threshold: .02
    }).observe(cv);
  }
  if (reduced) {
    size();
    ctx.clearRect(0, 0, W, H);
    pts.forEach(function(p) {
      ctx.fillStyle = p.c;
      ctx.fillRect(p.hx, p.hy, p.s, p.s);
    });
    return;
  }
  size();
  raf = requestAnimationFrame(draw);
})();
