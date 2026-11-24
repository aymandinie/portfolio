(function() {
  "use strict";
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function(v, a, b) {
    return Math.min(b, Math.max(a, v));
  };
  var subs = [];
  function tick() {
    for (var i = 0; i < subs.length; i++) subs[i]();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  function reveal() {
    var els = document.querySelectorAll(".r, .r-scale");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || reduced) {
      els.forEach(function(e) {
        e.classList.add("in");
      });
      return;
    }
    var io = new IntersectionObserver(function(ents) {
      ents.forEach(function(e) {
        var el = e.target;
        if (e.isIntersecting) {
          var d = parseInt(el.getAttribute("data-d") || "0", 10);
          el._t = setTimeout(function() {
            el.classList.add("in");
          }, d);
        } else {
          clearTimeout(el._t);
          if (el.getBoundingClientRect().top > 0) el.classList.remove("in");
        }
      });
    }, {
      threshold: .14,
      rootMargin: "0px 0px -8% 0px"
    });
    els.forEach(function(el) {
      if (!el.hasAttribute("data-d") && el.parentElement) {
        var sibs = [].slice.call(el.parentElement.children).filter(function(c) {
          return c.classList.contains("r") || c.classList.contains("r-scale");
        });
        if (sibs.length > 1) el.setAttribute("data-d", String(sibs.indexOf(el) * 90));
      }
      io.observe(el);
    });
  }
  function pinScrub() {
    var pins = [].slice.call(document.querySelectorAll(".pin"));
    if (!pins.length) return;
    pins.forEach(function(pin) {
      var slides = [].slice.call(pin.querySelectorAll(".pin__slide"));
      var dots = [].slice.call(pin.querySelectorAll(".pin__prog i"));
      if (!slides.length) return;
      pin.style.height = (slides.length + .6) * 100 + "svh";
      if (reduced) {
        slides.forEach(function(s) {
          s.classList.add("on");
        });
        return;
      }
      var cur = -1;
      subs.push(function() {
        var r = pin.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        var total = r.height - innerHeight;
        var p = clamp(-r.top / (total || 1), 0, .9999);
        var i = Math.min(slides.length - 1, Math.floor(p * slides.length));
        if (i === cur) return;
        cur = i;
        slides.forEach(function(s, j) {
          s.classList.toggle("on", j === i);
        });
        dots.forEach(function(d, j) {
          d.classList.toggle("on", j === i);
        });
      });
    });
  }
  function heroParallax() {
    var core = document.querySelector("[data-hero-visual]");
    var wash = document.querySelector(".hero__wash");
    if (!core || reduced) return;
    subs.push(function() {
      var y = scrollY;
      if (y > innerHeight * 1.2) return;
      var p = clamp(y / innerHeight, 0, 1);
      core.style.transform = "translate3d(0," + (-p * 90).toFixed(1) + "px,0) scale(" + (1 + p * .16).toFixed(4) + ")";
      core.style.opacity = String(clamp(1 - p * 1.25, 0, 1));
      if (wash) wash.style.transform = "translate(-50%,-50%) scale(" + (1 + p * .3).toFixed(3) + ")";
    });
  }
  function nav() {
    var burger = document.querySelector(".nav__burger");
    var sheet = document.querySelector(".sheet");
    if (burger && sheet) {
      burger.addEventListener("click", function() {
        var on = burger.classList.toggle("on");
        sheet.classList.toggle("on", on);
        document.body.classList.toggle("lock", on);
        burger.setAttribute("aria-expanded", String(on));
      });
      sheet.querySelectorAll("a").forEach(function(a) {
        a.addEventListener("click", function() {
          burger.classList.remove("on");
          sheet.classList.remove("on");
          document.body.classList.remove("lock");
        });
      });
      addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
          burger.classList.remove("on");
          sheet.classList.remove("on");
          document.body.classList.remove("lock");
        }
      });
    }
  }
  function rail() {
    document.querySelectorAll("[data-rail]").forEach(function(wrap) {
      var track = wrap.querySelector(".rail");
      var prev = wrap.querySelector("[data-rail-prev]");
      var next = wrap.querySelector("[data-rail-next]");
      if (!track) return;
      function step(dir) {
        var card = track.querySelector(".rail__card");
        var w = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * .8;
        track.scrollBy({
          left: dir * w,
          behavior: reduced ? "auto" : "smooth"
        });
      }
      if (prev) prev.addEventListener("click", function() {
        step(-1);
      });
      if (next) next.addEventListener("click", function() {
        step(1);
      });
    });
  }
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
  function marquee() {
    var t = document.querySelector("[data-logos]");
    if (!t) return;
    var base = "assets/clients-v2/", h = "";
    for (var p = 0; p < 4; p++) LOGOS.forEach(function(l) {
      h += '<div class="mq__i' + (l.flip ? " mq__i--flip" : "") + '">' + '<img src="' + base + l.f + '" alt="' + l.n + '" loading="lazy">' + "</div>";
    });
    t.innerHTML = h;
    if (reduced) return;
    var x = 0, w = 1;
    function measure() {
      w = t.scrollWidth / 2 || 1;
    }
    measure();
    addEventListener("resize", measure, {
      passive: true
    });
    addEventListener("load", measure);
    t.querySelectorAll("img").forEach(function(im) {
      if (!im.complete) im.addEventListener("load", measure, {
        once: true
      });
    });
    subs.push(function() {
      x -= .42;
      if (x <= -w) x += w;
      t.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
    });
  }
  function boot() {
    marquee();
    reveal();
    pinScrub();
    heroParallax();
    nav();
    rail();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
