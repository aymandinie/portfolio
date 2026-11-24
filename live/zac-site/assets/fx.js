(function() {
  "use strict";
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(pointer:fine)").matches;
  var clamp = function(v, a, b) {
    return Math.min(b, Math.max(a, v));
  };
  var lerp = function(a, b, t) {
    return a + (b - a) * t;
  };
  var CLIPS = {
    hero: "assets/video/home-hero-dust-plane.mp4",
    scrub: "assets/video/home-dept-server-macro.mp4",
    glass: "assets/video/sw-results-network-drift.mp4"
  };
  var SY = window.scrollY, VEL = 0, subs = [];
  function frame() {
    var prev = SY;
    SY = reduced ? window.scrollY : lerp(SY, window.scrollY, .11);
    if (Math.abs(window.scrollY - SY) < .05) SY = window.scrollY;
    VEL = SY - prev;
    for (var i = 0; i < subs.length; i++) subs[i]();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  function srect(el) {
    var r = el.getBoundingClientRect(), d = window.scrollY - SY;
    return {
      top: r.top + d,
      bottom: r.bottom + d,
      height: r.height
    };
  }
  function attach(video, src, onFail) {
    if (!video || reduced || !src) {
      onFail && onFail();
      return;
    }
    var done = false;
    function ok() {
      if (done) return;
      done = true;
      video.classList.add("ready");
      video.loop = false;
      video.autoplay = false;
      video.removeAttribute("autoplay");
      try {
        video.pause();
      } catch (e) {}
    }
    function bad() {
      if (done) return;
      done = true;
      video.style.display = "none";
      onFail && onFail();
    }
    video.addEventListener("loadeddata", ok, {
      once: true
    });
    video.addEventListener("error", bad, {
      once: true
    });
    setTimeout(function() {
      if (!done && video.readyState < 2) bad();
    }, 6e3);
    video.muted = true;
    video.playsInline = true;
    if (!video.getAttribute("src") && src) {
      video.src = src;
      video.load();
    }
    if (video.readyState >= 2) ok();
  }
  function parallax() {
    if (reduced) return;
    var items = [].slice.call(document.querySelectorAll("[data-px]")).map(function(el) {
      return {
        el: el,
        f: parseFloat(el.getAttribute("data-px")) || .12,
        base: el.getAttribute("data-px-base") || "",
        y: 0
      };
    });
    if (!items.length) return;
    subs.push(function() {
      var vh = innerHeight;
      for (var i = 0; i < items.length; i++) {
        var it = items[i], r = srect(it.el);
        if (r.bottom < -vh * .5 || r.top > vh * 1.5) continue;
        var prog = (r.top + r.height / 2 - vh / 2) / vh;
        it.y = lerp(it.y, -prog * it.f * 100, .16);
        it.el.style.transform = (it.base ? it.base + " " : "") + "translate3d(0," + it.y.toFixed(2) + "px,0)";
      }
    });
  }
  function zoomScale() {
    if (reduced) return;
    var items = [].slice.call(document.querySelectorAll("[data-zoomscale]")).map(function(el) {
      return {
        el: el,
        a: parseFloat(el.getAttribute("data-zoomscale")) || .14,
        s: 1
      };
    });
    if (!items.length) return;
    subs.push(function() {
      var vh = innerHeight;
      for (var i = 0; i < items.length; i++) {
        var it = items[i], r = srect(it.el);
        if (r.bottom < -vh * .4 || r.top > vh * 1.4) continue;
        var prog = clamp(Math.abs((r.top + r.height / 2 - vh / 2) / vh), 0, 1);
        it.s = lerp(it.s, 1 + prog * it.a, .14);
        it.el.style.transform = "scale(" + it.s.toFixed(4) + ")";
      }
    });
  }
  function heroBed() {
    var bed = document.querySelector("[data-herobed]");
    if (!bed) return;
    attach(bed.querySelector("video"), CLIPS.hero, function() {
      var fb = bed.querySelector(".herobed__fb");
      if (fb) fb.classList.add("on");
    });
    if (reduced) return;
    var intro = 0, t0 = performance.now();
    var planes = [].slice.call(document.querySelectorAll("[data-plane]")).map(function(el) {
      return {
        el: el,
        f: parseFloat(el.getAttribute("data-plane")) || 0,
        y: 0
      };
    });
    subs.push(function() {
      var e = clamp((performance.now() - t0) / 2200, 0, 1);
      intro = 1 - Math.pow(1 - e, 3);
      var p = clamp(SY / innerHeight, 0, 1.2);
      var s = 1.34 - intro * .34 + p * .12;
      bed.style.transform = "translate3d(0," + (p * 60).toFixed(1) + "px,0) scale(" + s.toFixed(4) + ")";
      bed.style.opacity = String(clamp(1 - p * .85, 0, 1) * (.25 + intro * .75));
      for (var i = 0; i < planes.length; i++) {
        var pl = planes[i];
        pl.y = lerp(pl.y, p * pl.f * 190, .16);
        pl.el.style.transform = "translate3d(0," + pl.y.toFixed(1) + "px,0)";
        pl.el.style.opacity = String(clamp(1 - p * 1.5, 0, 1));
      }
    });
  }
  function zoomThru() {
    var sec = document.querySelector("[data-zoom]");
    if (!sec) return;
    var text = sec.querySelector("#zoomText");
    var bed = sec.querySelector(".zoom__bed");
    var after = sec.querySelector(".zoom__after");
    var inner = after ? after.firstElementChild : null;
    var hint = sec.querySelector(".zoom__hint");
    var len = parseFloat(sec.getAttribute("data-zoom")) || 5;
    sec.style.height = len * 100 + "svh";
    if (reduced) {
      if (after) {
        after.classList.add("on");
        after.style.opacity = 1;
      }
      return;
    }
    var s = 1, o = 0;
    subs.push(function() {
      var r = srect(sec);
      if (r.bottom < -300 || r.top > innerHeight + 300) return;
      var p = clamp(-r.top / (r.height - innerHeight || 1), 0, 1);
      var zp = clamp(p / .62, 0, 1);
      var eased = zp * zp * (3 - 2 * zp);
      s = lerp(s, 1 + Math.pow(eased, 2.2) * 88, .16);
      if (text) text.setAttribute("transform", "translate(50 50) scale(" + s.toFixed(3) + ") translate(-50 -50)");
      if (bed) bed.style.transform = "scale(" + (1.05 + p * .34).toFixed(4) + ") translate3d(0," + (-p * 90).toFixed(1) + "px,0)";
      var op = clamp((p - .55) / .2, 0, 1);
      o = lerp(o, op, .14);
      if (after) {
        after.style.opacity = o.toFixed(3);
        after.classList.toggle("on", o > .02);
      }
      if (inner) {
        var drift = clamp((p - .78) / .22, 0, 1);
        inner.style.transform = "translate3d(0," + ((1 - o) * 40 - drift * 70).toFixed(1) + "px,0) scale(" + (1 + drift * .06).toFixed(4) + ")";
      }
      if (hint) hint.style.opacity = String(clamp(1 - p * 6, 0, 1));
    });
  }
  function scrubVideo() {
    document.querySelectorAll("[data-scrub]").forEach(function(sec) {
      var media = sec.querySelector(".scrub__media");
      var vid = sec.querySelector(".scrub__vid");
      var fb = sec.querySelector(".scrub__fb");
      var lines = [].slice.call(sec.querySelectorAll(".scrub__line"));
      var bars = [].slice.call(sec.querySelectorAll(".scrub__dots b"));
      var len = parseFloat(sec.getAttribute("data-scrub")) || 5.6;
      sec.style.height = len * 100 + "svh";
      var live = false;
      attach(vid, CLIPS[sec.getAttribute("data-clip")] || CLIPS.scrub, function() {
        if (fb) fb.classList.add("on");
      });
      if (vid) vid.addEventListener("loadeddata", function() {
        live = true;
        vid.pause();
        vid.loop = false;
      });
      if (reduced) {
        lines.forEach(function(l) {
          l.style.opacity = 1;
        });
        if (fb) fb.classList.add("on");
        return;
      }
      var n = lines.length;
      subs.push(function() {
        var r = srect(sec);
        if (r.bottom < -300 || r.top > innerHeight + 300) return;
        var p = clamp(-r.top / (r.height - innerHeight || 1), 0, 1);
        if (live && vid.duration) {
          var want = p * (vid.duration - .05);
          if (Math.abs(vid.currentTime - want) > .02) vid.currentTime = want;
        }
        if (media) media.style.transform = "scale(" + (1.08 + p * .2).toFixed(4) + ") translate3d(" + (-p * 40).toFixed(1) + "px," + (-p * 70).toFixed(1) + "px,0)";
        var slot = 1 / n;
        for (var i = 0; i < n; i++) {
          var local = (p - i * slot) / slot, a = 0;
          if (local > -.16 && local < 1.16) {
            if (local < .16) a = clamp((local + .16) / .32, 0, 1); else if (local > .84) a = clamp((1.16 - local) / .32, 0, 1); else a = 1;
          }
          var el = lines[i];
          el.style.opacity = a.toFixed(3);
          el.style.transform = "translate3d(0," + ((1 - a) * 30).toFixed(1) + "px,0) scale(" + (.985 + a * .015).toFixed(4) + ")";
          el.style.pointerEvents = a > .6 ? "auto" : "none";
          if (bars[i]) bars[i].style.transform = "scaleX(" + clamp(local, 0, 1).toFixed(3) + ")";
        }
      });
    });
  }
  function glassBed() {
    document.querySelectorAll(".glassbed").forEach(function(bed) {
      var media = bed.querySelector(".glassbed__media");
      var vid = bed.querySelector(".glassbed__vid");
      var fb = bed.querySelector(".glassbed__fb");
      attach(vid, CLIPS.glass, function() {
        if (fb) fb.style.display = "block";
      });
      if (vid) vid.addEventListener("loadeddata", function() {
        if (fb) fb.style.display = "none";
      });
      if (reduced || !media) return;
      subs.push(function() {
        var r = srect(bed);
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        var prog = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        media.style.transform = "scale(1.1) translate3d(0," + (-prog * 9).toFixed(1) + "%,0)";
      });
    });
  }
  function logoDrag() {
    var LOGOS = [ {
      n: "fourU",
      f: "4u.png",
      flip: false
    }, {
      n: "Aspial Production",
      f: "aspial.png",
      flip: true
    }, {
      n: "Confetti",
      f: "confetti.png",
      flip: true
    }, {
      n: "Great Heart Charity",
      f: "greatheart.png",
      flip: true
    }, {
      n: "ModernMed",
      f: "modernmed.png",
      flip: true
    }, {
      n: "Qurutiki",
      f: "rurtiki.png",
      flip: false
    }, {
      n: "Ticco",
      f: "ticco.png",
      flip: false
    } ];
    var track = document.querySelector("[data-logotrack]");
    if (!track) return;
    var base = "assets/clients-v2/", h = "";
    for (var p = 0; p < 3; p++) LOGOS.forEach(function(l) {
      h += '<div class="logos__i' + (l.flip ? " logos__i--flip" : "") + '">' + '<img src="' + base + l.f + '" alt="' + l.n + '" loading="lazy" draggable="false">' + "</div>";
    });
    track.innerHTML = h;
    var auto = .55, paused = 0, half = 0;
    function half_() {
      half = track.scrollWidth / 3 || 1;
    }
    half_();
    addEventListener("resize", half_, {
      passive: true
    });
    addEventListener("load", half_);
    track.querySelectorAll("img").forEach(function(im) {
      if (!im.complete) im.addEventListener("load", half_, {
        once: true
      });
    });
    track.addEventListener("mouseenter", function() {
      paused = 1;
    });
    track.addEventListener("mouseleave", function() {
      paused = 0;
    });
    var pos = 0, primed = false, target = 0, easing = false;
    subs.push(function() {
      if (reduced) return;
      if (!primed) {
        half_();
        if (half > 10) {
          pos = half;
          primed = true;
        } else return;
      }
      if (down) {
        pos = track.scrollLeft;
        target = pos;
        easing = false;
        return;
      }
      if (easing) {
        pos = lerp(pos, target, .12);
        if (Math.abs(target - pos) < .5) {
          pos = target;
          easing = false;
        }
        if (pos >= half * 2) {
          pos -= half;
          target -= half;
        }
        if (pos < 0) {
          pos += half;
          target += half;
        }
        track.scrollLeft = pos;
        return;
      }
      if (paused) {
        pos = track.scrollLeft;
        return;
      }
      pos += auto;
      if (pos >= half * 2) pos -= half;
      track.scrollLeft = pos;
    });
    var down = false, sx = 0, sl = 0;
    track.addEventListener("pointerdown", function(e) {
      down = true;
      sx = e.clientX;
      sl = track.scrollLeft;
      track.classList.add("drag");
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener("pointermove", function(e) {
      if (!down) return;
      track.scrollLeft = sl - (e.clientX - sx);
    });
    [ "pointerup", "pointercancel", "pointerleave" ].forEach(function(ev) {
      track.addEventListener(ev, function() {
        down = false;
        track.classList.remove("drag");
      });
    });
    function step(dir) {
      var one = track.querySelector(".logos__i");
      var w = one ? one.getBoundingClientRect().width + 70 : 300;
      target = pos + dir * w * 2;
      easing = true;
    }
    var prev = document.querySelector("[data-logo-prev]");
    var next = document.querySelector("[data-logo-next]");
    if (prev) prev.addEventListener("click", function() {
      step(-1);
    });
    if (next) next.addEventListener("click", function() {
      step(1);
    });
  }
  function megaCta() {
    var sec = document.querySelector(".megacta");
    if (!sec || reduced) return;
    var rings = [].slice.call(sec.querySelectorAll(".megacta__rings i"));
    if (fine) {
      var tcx = 50, tcy = 50, ccx = 50, ccy = 50;
      sec.addEventListener("mousemove", function(e) {
        var r = sec.getBoundingClientRect();
        tcx = (e.clientX - r.left) / r.width * 100;
        tcy = (e.clientY - r.top) / r.height * 100;
      });
      subs.push(function() {
        ccx = lerp(ccx, tcx, .12);
        ccy = lerp(ccy, tcy, .12);
        sec.style.setProperty("--cx", ccx.toFixed(2) + "%");
        sec.style.setProperty("--cy", ccy.toFixed(2) + "%");
      });
    }
    subs.push(function() {
      var r = srect(sec);
      if (r.bottom < 0 || r.top > innerHeight) return;
      var p = clamp(1 - (r.top + r.height / 2 - innerHeight / 2) / innerHeight, 0, 2);
      rings.forEach(function(ring, i) {
        var k = .3 + i * .26;
        ring.style.transform = "scale(" + (.55 + p * k).toFixed(4) + ")";
        ring.style.opacity = String(clamp(1 - Math.abs(p - 1) * 1.1, 0, 1) * (.9 - i * .16));
      });
    });
  }
  function footerFx() {
    var foot = document.querySelector(".foot");
    if (!foot || reduced) return;
    var mark = foot.querySelector(".foot__logomark") || foot.querySelector(".foot__wordmark span");
    var glow = foot.querySelector(".foot__glow");
    subs.push(function() {
      var r = srect(foot);
      if (r.top > innerHeight) return;
      var p = clamp((innerHeight - r.top) / (r.height + innerHeight), 0, 1);
      if (mark) mark.style.transform = "translate3d(0," + ((1 - p) * 46).toFixed(1) + "px,0)";
      if (glow) glow.style.transform = "translateX(-50%) scale(" + (.8 + p * .35).toFixed(3) + ")";
    });
  }
  function toTop() {
    var btn = document.querySelector(".totop");
    if (!btn) return;
    btn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: reduced ? "auto" : "smooth"
      });
    });
    subs.push(function() {
      btn.classList.toggle("on", SY > innerHeight * 1.2);
    });
  }
  function mhead() {
    document.querySelectorAll("[data-mhead]").forEach(function(t) {
      if (reduced) return;
      var dir = parseFloat(t.getAttribute("data-mhead")) || 1;
      var x = 0, w = 1;
      function measure() {
        w = t.scrollWidth / 2 || 1;
      }
      measure();
      addEventListener("resize", measure, {
        passive: true
      });
      addEventListener("load", measure);
      subs.push(function() {
        x -= (.5 + Math.abs(VEL) * .12) * dir;
        if (dir > 0 && x <= -w) x += w;
        if (dir < 0 && x >= 0) x -= w;
        t.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
      });
    });
  }
  setTimeout(function() {
    document.querySelectorAll("[data-chars],[data-words]").forEach(function(el) {
      el.classList.add("split-ready");
    });
  }, 1200);
  function videoSpeed() {}
  function boot() {
    document.documentElement.classList.add("fx-ready");
    videoSpeed();
    heroBed();
    zoomThru();
    scrubVideo();
    glassBed();
    parallax();
    zoomScale();
    logoDrag();
    megaCta();
    footerFx();
    toTop();
    mhead();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();

(function() {
  "use strict";
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function(v, a, b) {
    return Math.min(b, Math.max(a, v));
  };
  var subs = [];
  (function loop() {
    for (var i = 0; i < subs.length; i++) subs[i]();
    requestAnimationFrame(loop);
  })();
  function splitChars(el) {
    if (el.dataset.split) return;
    el.dataset.split = "1";
    var html = el.innerHTML.split(/<br\s*\/?>/i).map(function(line) {
      return line.trim().split(" ").map(function(word) {
        var chars = word.split("").map(function(c) {
          return '<span class="ch">' + c + "</span>";
        }).join("");
        return '<span style="display:inline-block;white-space:nowrap">' + chars + "</span>";
      }).join('<span class="ch">&nbsp;</span>');
    }).join("<br>");
    el.innerHTML = html;
  }
  function playChars(el, base) {
    var chars = el.querySelectorAll(".ch");
    for (var i = 0; i < chars.length; i++) {
      chars[i].style.animationDelay = base + i * 22 + "ms";
      chars[i].classList.add("ch--in");
    }
  }
  function resetChars(el) {
    var chars = el.querySelectorAll(".ch");
    for (var i = 0; i < chars.length; i++) chars[i].classList.remove("ch--in");
  }
  var heads = [].slice.call(document.querySelectorAll("[data-chars]"));
  heads.forEach(function(h) {
    splitChars(h);
    h.classList.add("split-ready");
  });
  if (reduced) {
    heads.forEach(function(h) {
      playChars(h, 0);
    });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(es) {
      es.forEach(function(e) {
        if (e.isIntersecting) playChars(e.target, 0); else if (e.target.getBoundingClientRect().top > 0) resetChars(e.target);
      });
    }, {
      threshold: .2
    });
    heads.forEach(function(h) {
      if (h.closest(".hero")) setTimeout(function() {
        playChars(h, 220);
      }, 60); else io.observe(h);
    });
  }
  var btn = document.querySelector("[data-ctareveal]");
  if (btn && !reduced) {
    var sec = btn.closest(".megacta");
    subs.push(function() {
      var r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      var p = clamp((innerHeight - r.top) / (innerHeight * .85), 0, 1);
      var e = p * p * (3 - 2 * p);
      btn.style.transform = "scale(" + (.24 + e * .76).toFixed(4) + ")";
      btn.style.opacity = e.toFixed(3);
      btn.style.filter = "blur(" + ((1 - e) * 7).toFixed(2) + "px)";
    });
  }
  if (!reduced) {
    var secs = [].slice.call(document.querySelectorAll("[data-sec]"));
    subs.push(function() {
      var vh = innerHeight;
      for (var i = 0; i < secs.length; i++) {
        var el = secs[i], r = el.getBoundingClientRect();
        if (r.bottom < -vh * .3 || r.top > vh * 1.3) continue;
        var enter = clamp((vh - r.top) / (vh * .55), 0, 1);
        var exit = clamp(r.bottom / (vh * .55), 0, 1);
        var k = Math.min(enter, exit);
        var e = k * k * (3 - 2 * k);
        el.style.opacity = (.35 + e * .65).toFixed(3);
        el.style.transform = "scale(" + (.975 + e * .025).toFixed(4) + ")";
      }
    });
  }
})();

(function() {
  "use strict";
  var SEL = ".herobed__fb,.scrub__fb,.glassbed__fb,.bed__fb,.bedstill,.bed__still,.scrub__still";
  function layersFor(v) {
    var host = v.parentElement, out = [], hops = 0;
    while (host && hops++ < 4) {
      out = out.concat([].slice.call(host.querySelectorAll(SEL)));
      if (out.length) break;
      host = host.parentElement;
    }
    return out.filter(function(e) {
      return !e.contains(v);
    });
  }
  function bind(v) {
    var layers = layersFor(v), shown = false;
    if (!layers.length) return;
    function hide() {
      if (shown) return;
      shown = true;
      layers.forEach(function(e) {
        e.style.setProperty("opacity", "0", "important");
        e.style.setProperty("visibility", "hidden", "important");
        e.style.setProperty("animation", "none", "important");
        e.style.pointerEvents = "none";
      });
    }
    function show() {
      shown = false;
      layers.forEach(function(e) {
        e.style.removeProperty("opacity");
        e.style.removeProperty("visibility");
        e.style.removeProperty("animation");
        e.style.pointerEvents = "";
      });
    }
    v.addEventListener("playing", hide);
    v.addEventListener("timeupdate", function() {
      if (v.currentTime > .04) hide();
    });
    v.addEventListener("error", show);
    v.addEventListener("emptied", show);
    if (v.currentTime > .04 && !v.paused) hide();
  }
  function scan() {
    [].slice.call(document.querySelectorAll("video")).forEach(bind);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan); else scan();
})();

(function() {
  if (document.querySelector(".rprog")) return;
  function mount() {
    if (document.querySelector(".rprog")) return;
    var host = document.body;
    if (!host) return;
    var el = document.createElement("div");
    el.className = "rprog";
    el.setAttribute("role", "progressbar");
    el.setAttribute("aria-label", "Reading progress");
    el.setAttribute("aria-valuemin", "0");
    el.setAttribute("aria-valuemax", "100");
    el.setAttribute("aria-valuenow", "0");
    var bar = document.createElement("i");
    el.appendChild(bar);
    host.appendChild(el);
    var last = -1, raf = 0;
    function tick() {
      raf = 0;
      var doc = document.documentElement;
      var max = Math.max(doc.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      var y = window.pageYOffset || doc.scrollTop || 0;
      var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
      var v = Math.round(p * 100);
      if (v !== last) {
        last = v;
        el.setAttribute("aria-valuenow", String(v));
      }
      if (max > 240) el.classList.add("rprog--on"); else el.classList.remove("rprog--on");
    }
    function req() {
      if (!raf) raf = requestAnimationFrame(tick);
    }
    window.addEventListener("scroll", req, {
      passive: true
    });
    window.addEventListener("resize", req);
    window.addEventListener("load", req);
    if (window.ResizeObserver) {
      try {
        new ResizeObserver(req).observe(document.body);
      } catch (e) {}
    }
    tick();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();

(function() {
  "use strict";
  var reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;
  function hostFor(v) {
    var el = v;
    while (el && el !== document.body) {
      if (el.matches && el.matches("section,[data-scrub],[data-sec],.hero,.glassbed,.beat,.band")) return el;
      el = el.parentElement;
    }
    return v.parentElement || v;
  }
  function mount() {
    var vids = [].slice.call(document.querySelectorAll("video")).filter(function(v) {
      return !v.classList.contains("scrub__vid");
    });
    [].slice.call(document.querySelectorAll("video")).forEach(function(v) {
      v.autoplay = false;
      v.removeAttribute("autoplay");
      v.loop = false;
      v.removeAttribute("loop");
      v.muted = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      try {
        v.pause();
      } catch (e) {}
      v.addEventListener("play", function() {
        if (!v.dataset.fxAllowPlay) {
          try {
            v.pause();
          } catch (e) {}
        }
      });
    });
    if (!vids.length) return;
    var items = vids.map(function(v) {
      return {
        v: v,
        host: hostFor(v),
        t: -1
      };
    });
    function tick() {
      var vh = innerHeight;
      for (var i = 0; i < items.length; i++) {
        var it = items[i], v = it.v;
        if (v.readyState < 2 || !v.duration || !isFinite(v.duration)) continue;
        var r = it.host.getBoundingClientRect();
        if (r.bottom < -vh * .5 || r.top > vh * 1.5) continue;
        var hostTop = r.top + window.scrollY;
        var start = Math.max(hostTop - vh, 0);
        var end = hostTop + r.height;
        var p = (window.scrollY - start) / (end - start || 1);
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        var want = p * (v.duration - .05);
        if (it.t < 0 || Math.abs(want - it.t) > .03) {
          it.t = want;
          try {
            if (v.seekable && v.seekable.length) v.currentTime = want;
          } catch (e) {}
        }
      }
      requestAnimationFrame(tick);
    }
    if (reduced) {
      items.forEach(function(it) {
        try {
          it.v.currentTime = 0;
        } catch (e) {}
      });
      return;
    }
    requestAnimationFrame(tick);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();

(function() {
  function hostFor(c) {
    var h = c.closest(".scrub__stage, .line__stage, .zoom__stage");
    if (h) return h;
    var prev = c.previousElementSibling;
    if (prev && prev.classList && prev.classList.contains("well")) return prev;
    return c.closest("section, .mhead") || c.parentElement;
  }
  function pin() {
    var cs = document.querySelectorAll(".credit");
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i];
      if (c.getAttribute("data-pinned")) continue;
      var host = hostFor(c);
      if (!host) continue;
      if (c.parentElement !== host || host.lastElementChild !== c) host.appendChild(c);
      if (getComputedStyle(host).position === "static") host.classList.add("credit-host");
      c.classList.add("credit--pin");
      if (host.classList.contains("well")) c.classList.add("credit--inset");
      c.setAttribute("data-pinned", "1");
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", pin); else pin();
})();

(function() {
  "use strict";
  var SEL = "main section.megacta video, main section.wcta video, main section.edepth video";
  function strip() {
    [].slice.call(document.querySelectorAll(SEL)).forEach(function(v) {
      try {
        v.pause();
        v.removeAttribute("src");
        v.load();
      } catch (e) {}
      if (v.parentNode) v.parentNode.removeChild(v);
    });
  }
  strip();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", strip);
})();

(function() {
  "use strict";
  function kick() {
    [].slice.call(document.querySelectorAll("video")).forEach(function(v) {
      if (v.readyState >= 2 && !v.dataset.fxKicked) {
        v.dataset.fxKicked = "1";
        try {
          v.dispatchEvent(new Event("loadeddata"));
        } catch (e) {}
      }
    });
  }
  if (document.readyState === "complete") kick(); else addEventListener("load", kick, {
    once: true
  });
  setTimeout(kick, 1500);
})();
