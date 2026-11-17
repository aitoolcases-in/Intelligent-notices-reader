/* Office Desk chat button for your website.
   Paste on any page, changing the address to where Office Desk runs:
   <script src="https://desk.yourfirm.in/widget.js" data-label="Ask us" defer></script> */
(function () {
  if (window.__officeDeskWidget) return;
  window.__officeDeskWidget = true;
  var me = document.currentScript;
  var base = new URL(me.src).origin;
  var label = (me && me.getAttribute("data-label")) || "Ask us";
  var color = (me && me.getAttribute("data-color")) || "#034620";

  var css = document.createElement("style");
  css.textContent =
    ".odw-btn{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));z-index:2147483000;display:flex;align-items:center;gap:8px;padding:12px 18px;border:0;border-radius:999px;background:" + color + ";color:#fff;font:600 15px/1 system-ui,-apple-system,'Segoe UI',sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.25);cursor:pointer}" +
    ".odw-btn:focus-visible{outline:3px solid #E2B04A;outline-offset:2px}" +
    ".odw-panel{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:calc(max(18px,env(safe-area-inset-bottom)) + 60px);z-index:2147483000;width:min(400px,calc(100vw - 36px));height:min(640px,calc(100vh - 110px));border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.3);background:#fff;display:none;flex-direction:column}" +
    ".odw-panel.open{display:flex}" +
    ".odw-head{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:" + color + ";color:#fff;font:600 15px/1.2 system-ui,-apple-system,'Segoe UI',sans-serif}" +
    ".odw-head a{color:#fff;font-weight:500;font-size:13px;margin-right:12px}" +
    ".odw-head button{background:none;border:0;color:#fff;font-size:22px;line-height:1;cursor:pointer;padding:2px 6px}" +
    ".odw-panel iframe{flex:1;border:0;width:100%}" +
    "@media (max-width:480px){.odw-panel{right:0;left:0;bottom:0;width:100vw;height:100%;border-radius:0}}";
  document.head.appendChild(css);

  var panel = document.createElement("div");
  panel.className = "odw-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", label);
  panel.innerHTML = '<div class="odw-head"><span></span><span><a target="_blank" rel="noopener">Sign in</a><button type="button" aria-label="Close">×</button></span></div>';
  panel.querySelector(".odw-head span").textContent = label;
  panel.querySelector("a").href = base + "/";
  var btn = document.createElement("button");
  btn.className = "odw-btn";
  btn.type = "button";
  btn.setAttribute("aria-expanded", "false");
  btn.textContent = label;

  var loaded = false;
  function toggle(open) {
    if (open && !loaded) {
      var f = document.createElement("iframe");
      f.src = base + "/?embed=1#ask";
      f.title = label;
      panel.appendChild(f);
      loaded = true;
    }
    panel.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  }
  btn.onclick = function () { toggle(!panel.classList.contains("open")); };
  panel.querySelector(".odw-head button").onclick = function () { toggle(false); btn.focus(); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("open")) toggle(false); });
  document.body.appendChild(panel);
  document.body.appendChild(btn);
})();
