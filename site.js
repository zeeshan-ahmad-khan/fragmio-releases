// Fills in versions, links and channel from config.js (which the release automation keeps up to date).
(function () {
  var c = window.FRAGMIO || {};
  var all = function (sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  };
  var ch = (c.channel || "stable").toLowerCase();
  all("[data-download]", function (a) {
    if (c.downloadUrl) a.href = c.downloadUrl;
  });
  all("[data-releases]", function (a) {
    if (c.releasesUrl) {
      a.href = c.releasesUrl;
      a.target = "_blank";
      a.rel = "noopener";
    }
  });
  all("[data-version]", function (e) {
    if (c.version) e.textContent = c.version;
  });
  all("[data-date]", function (e) {
    if (c.date) e.textContent = c.date;
  });
  // version.json is what the app's update check reads, so it is always the newest release.
  // Use it for the version, date and channel (config.js is only the fallback).
  fetch("/version.json", { cache: "no-store" })
    .then(function (r) {
      return r.ok ? r.json() : null;
    })
    .then(function (v) {
      if (!v || !v.version) return;
      all("[data-version]", function (e) {
        e.textContent = v.version;
      });
      if (v.date) {
        var d = new Date(v.date + "T12:00:00");
        if (!isNaN(d))
          all("[data-date]", function (e) {
            e.textContent = d.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
          });
      }
      if (v.channel && v.channel !== ch) {
        ch = v.channel.toLowerCase();
        applyChannel();
      }
    })
    .catch(function () {});
  all("[data-year]", function (e) {
    e.textContent = new Date().getFullYear();
  });

  // Channel: alpha / beta show their badge; stable hides badges and beta-only text.
  function applyChannel() {
    all("[data-channel]", function (e) {
      e.classList.toggle("hidden", ch === "stable");
      if (ch !== "stable") e.textContent = ch.toUpperCase();
    });
    all("[data-channel-label]", function (e) {
      e.textContent = ch === "stable" ? "Free" : "Free " + ch;
    });
    all("[data-prerelease-only]", function (e) {
      e.classList.toggle("hidden", ch === "stable");
    });
  }
  applyChannel();

  // Support page
  var pay = document.getElementById("pay");
  if (pay) {
    if (c.razorpayUrl) pay.href = c.razorpayUrl;
    else pay.closest(".panel").classList.add("hidden");
  }
  var upi = document.getElementById("upi");
  if (upi) {
    if (c.upiId) upi.querySelector("span").textContent = c.upiId;
    else upi.classList.add("hidden");
  }
  var copy = document.getElementById("copy-upi");
  if (copy)
    copy.addEventListener("click", function () {
      try {
        navigator.clipboard.writeText(c.upiId);
        copy.textContent = "Copied";
      } catch (e) {}
    });

  // Feedback page: the app opens it with ?type=problem&app=1.16.3&channel=beta&os=Windows 11
  var q = new URLSearchParams(location.search);
  var title = document.getElementById("fb-title");
  if (title && q.get("type") === "problem") {
    title.textContent = "Report a problem";
    document.getElementById("fb-lead").textContent =
      "Tell us what happened and what you expected. Please attach the newest log file (Help → Open log folder in the app).";
  }
  var info = document.getElementById("fb-info");
  if (info && q.get("app")) {
    info.classList.remove("hidden");
    info.querySelector("span").textContent =
      "Fragmio " +
      q.get("app") +
      (q.get("channel") ? " " + q.get("channel") : "") +
      " · " +
      (q.get("os") || "");
  }
  var frame = document.getElementById("fb-frame");
  if (frame) {
    var open = document.getElementById("fb-open");
    if (c.feedbackFormUrl) {
      frame.src =
        c.feedbackFormUrl +
        (c.feedbackFormUrl.indexOf("?") < 0 ? "?" : "&") +
        "embedded=true";
      open.href = c.feedbackFormUrl;
    } else {
      frame.classList.add("hidden");
      open.classList.add("hidden");
      document.getElementById("fb-soon").classList.remove("hidden");
    }
  }

  // Tutorials: a thumbnail first; the YouTube player (privacy-enhanced) loads only when someone clicks play.
  var tuts = c.tutorials || [];
  all("[data-tutorials]", function (box) {
    var limit = +box.dataset.limit || tuts.length;
    if (!tuts.length) {
      box.innerHTML =
        '<div class="tut-empty">Tutorials are on the way.' +
        (c.youtubeChannel
          ? ' <a href="' +
            c.youtubeChannel +
            '" target="_blank" rel="noopener" style="color:var(--a)">Follow the YouTube channel</a> to see them first.'
          : "") +
        "</div>";
      return;
    }
    tuts.slice(0, limit).forEach(function (t) {
      if (!/^[\w-]{6,20}$/.test(t.id || "")) return;
      var card = document.createElement("div");
      card.className = "tut";
      var v = document.createElement("button");
      v.className = "v";
      v.type = "button";
      v.setAttribute("aria-label", "Play: " + (t.title || "tutorial"));
      v.innerHTML =
        '<img loading="lazy" alt="" src="https://i.ytimg.com/vi/' +
        t.id +
        '/hqdefault.jpg"><span class="pl"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>';
      v.onclick = function () {
        var f = document.createElement("iframe");
        f.src =
          "https://www.youtube-nocookie.com/embed/" +
          t.id +
          "?autoplay=1&rel=0";
        f.title = t.title || "Fragmio tutorial";
        f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        f.allowFullscreen = true;
        v.replaceWith(
          Object.assign(document.createElement("div"), { className: "v" }),
        );
        card.firstChild.appendChild(f);
      };
      var tt = document.createElement("div");
      tt.className = "t";
      tt.textContent = t.title || "";
      if (t.length) {
        var sm = document.createElement("small");
        sm.textContent = t.length;
        tt.appendChild(sm);
      }
      card.appendChild(v);
      card.appendChild(tt);
      box.appendChild(card);
    });
  });
})();
