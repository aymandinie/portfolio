(function() {
  "use strict";
  var dlg = document.getElementById("certdlg");
  if (!dlg) return;
  document.querySelectorAll(".accred__c--partner .accred__act").forEach(function(act) {
    if (act.querySelector("[data-cert]")) return;
    var proto = document.querySelector(".accred__view[data-cert]");
    if (!proto) return;
    var b = proto.cloneNode(true);
    var t = act.closest(".accred__c").querySelector(".accred__t");
    var title = t ? t.textContent.trim() : "OpenAI Select Partner";
    b.setAttribute("data-cert", "openai-cert.jpg");
    b.setAttribute("data-cert-title", title);
    b.setAttribute("aria-label", "View certificate: " + title);
    act.appendChild(b);
  });
  var img = dlg.querySelector("[data-certimg]");
  var titleEl = dlg.querySelector("[data-certtitle]");
  var closeBtn = dlg.querySelector("[data-certclose]");
  var opener = null;
  if (typeof dlg.showModal !== "function") {
    document.querySelectorAll("[data-cert]").forEach(function(b) {
      var a = document.createElement("a");
      a.className = b.className;
      a.href = "assets/certs/" + b.getAttribute("data-cert");
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = b.innerHTML;
      b.parentNode.replaceChild(a, b);
    });
    return;
  }
  function open(btn) {
    var file = btn.getAttribute("data-cert");
    var label = btn.getAttribute("data-cert-title") || "";
    if (!file) return;
    opener = btn;
    titleEl.textContent = label;
    img.setAttribute("alt", label + " certificate");
    img.setAttribute("src", "assets/certs/" + file);
    dlg.showModal();
    try {
      closeBtn.focus({
        preventScroll: true
      });
    } catch (e) {
      closeBtn.focus();
    }
  }
  document.querySelectorAll("[data-cert]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      open(btn);
    });
  });
  dlg.addEventListener("close", function() {
    img.removeAttribute("src");
    if (opener && document.contains(opener)) {
      try {
        opener.focus({
          preventScroll: true
        });
      } catch (e) {
        opener.focus();
      }
    }
    opener = null;
  });
  closeBtn.addEventListener("click", function() {
    dlg.close();
  });
  dlg.addEventListener("click", function(e) {
    if (e.target === dlg) dlg.close();
  });
})();
