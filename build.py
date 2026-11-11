# Builds the four pages from one shared header and footer. Run: python3 build.py
HEAD = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta name="theme-color" content="#3E5C76">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<header class="top"><div class="wrap">
  <a class="brand" href="/"><img src="/logo.svg" alt="">Fragmio <span class="beta">Beta</span></a>
  <nav class="links">
    <a href="/#features"{on_f}>Features</a>
    <a href="/feedback"{on_fb}>Feedback</a>
    <a href="/support"{on_s}>Support</a>
    <a class="btn primary small" href="/download">Download</a>
  </nav>
</div></header>
<main>
'''
FOOT = '''</main>
<footer class="bottom"><div class="wrap">
  <div class="made">Made with <span class="heart">♥</span> by <a href="/support">Zak</a> · © <span data-year></span> Fragmio</div>
  <nav><a href="/download">Download</a><a data-releases href="#">All releases</a><a href="/feedback">Feedback</a><a href="/feedback?type=problem">Report a problem</a><a href="/support">Support</a></nav>
</div></footer>
<script src="/config.js"></script>
<script src="/site.js"></script>
</body>
</html>
'''
def icon(d): return f'<div class="ico"><svg viewBox="0 0 24 24">{d}</svg></div>'

ILLUS = '''<svg class="illus" viewBox="0 0 820 300" role="img" aria-label="One long video split into short vertical clips">
  <rect x="20" y="30" width="780" height="54" rx="10" fill="var(--sunken)" stroke="var(--line)"/>
  <g fill="var(--accent-2)" opacity=".35">
    <rect x="34" y="44" width="70" height="26" rx="4"/><rect x="112" y="44" width="70" height="26" rx="4"/><rect x="190" y="44" width="70" height="26" rx="4"/>
    <rect x="268" y="44" width="70" height="26" rx="4"/><rect x="346" y="44" width="70" height="26" rx="4"/><rect x="424" y="44" width="70" height="26" rx="4"/>
    <rect x="502" y="44" width="70" height="26" rx="4"/><rect x="580" y="44" width="70" height="26" rx="4"/><rect x="658" y="44" width="70" height="26" rx="4"/><rect x="736" y="44" width="50" height="26" rx="4"/>
  </g>
  <g fill="none" stroke="var(--accent)" stroke-width="3">
    <rect x="104" y="36" width="130" height="42" rx="6"/><rect x="346" y="36" width="150" height="42" rx="6"/><rect x="590" y="36" width="120" height="42" rx="6"/>
  </g>
  <g stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 6" fill="none" opacity=".6">
    <path d="M169 80 C169 130 205 130 205 160"/><path d="M421 80 V160"/><path d="M650 80 C650 130 625 130 625 160"/>
  </g>
  <g>
    <rect x="155" y="160" width="100" height="130" rx="12" fill="var(--surface)" stroke="var(--line)"/>
    <rect x="165" y="185" width="80" height="80" rx="6" fill="var(--accent-2)" opacity=".55"/>
    <rect x="175" y="170" width="60" height="7" rx="3" fill="var(--accent)"/>
    <rect x="371" y="160" width="100" height="130" rx="12" fill="var(--surface)" stroke="var(--line)"/>
    <rect x="379" y="168" width="84" height="54" rx="5" fill="var(--accent-2)" opacity=".55"/><rect x="379" y="228" width="84" height="54" rx="5" fill="var(--accent)" opacity=".45"/>
    <rect x="575" y="160" width="100" height="130" rx="12" fill="var(--surface)" stroke="var(--line)"/>
    <rect x="585" y="172" width="80" height="106" rx="6" fill="var(--accent-2)" opacity=".55"/>
    <rect x="595" y="256" width="60" height="10" rx="3" fill="var(--surface)" opacity=".9"/>
  </g>
</svg>'''

pages = {}
pages['index'] = ('Fragmio: turn one long video into many short clips', 'Free offline Windows app: cut one long video into Shorts, Reels and TikTok clips, add text and frames, export them all at once.', 'f', f'''
<div class="wrap hero">
  <span class="beta">Free beta · Windows</span>
  <h1>One long video.<br>Many short clips.</h1>
  <p class="lead">Fragmio cuts your podcast, stream or talk into vertical clips for Shorts, Reels, TikTok, LinkedIn and Facebook, all on your own computer.</p>
  <div class="cta"><a class="btn primary" href="/download">Download for Windows</a><a class="btn" href="#features">See what it does</a></div>
  <small>Version <span data-version></span> · Windows 10 and 11 · Works offline</small>
  {ILLUS}
</div>
<section id="features"><div class="wrap">
  <h2>Everything for short clips, in one place</h2>
  <p class="sub">Mark the moments, frame them for the phone, style them, and export them all in one go.</p>
  <div class="grid">
    <div class="card">{icon('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/>')}<h3>Mark clips fast</h3><p>Set in and out points with the keyboard, name each clip, and change its speed.</p></div>
    <div class="card">{icon('<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M3 8v8M21 8v8"/>')}<h3>Frame for any app</h3><p>9:16, 4:5, 1:1 or 16:9. Fill, On background, Split and Trio layouts.</p></div>
    <div class="card">{icon('<path d="M5 6V4h14v2M12 4v16M9 20h6"/>')}<h3>Text that looks good</h3><p>15 text styles, highlighted words, any font on your computer, and your own saved styles.</p></div>
    <div class="card">{icon('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>')}<h3>Frames and templates</h3><p>30 ready-made templates and 30 frames. Change the colours, then save your own.</p></div>
    <div class="card">{icon('<path d="M4 17l6-6 4 4 6-8"/><path d="M14 7h6v6"/>')}<h3>Export everything at once</h3><p>MP4 up to 4K, using your graphics card when it can. What you see is what you get.</p></div>
    <div class="card">{icon('<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/>')}<h3>Private by design</h3><p>No account, no uploads, no tracking. Your videos never leave your computer.</p></div>
  </div>
</div></section>
<section class="band"><div class="wrap">
  <h2>How it works</h2>
  <p class="sub">From a one-hour recording to a week of posts.</p>
  <ol class="steps">
    <li><b>Open your video</b><br><span style="color:var(--muted)">Pick an MP4. Fragmio shows it on a timeline with the sound wave.</span></li>
    <li><b>Mark the clips</b><br><span style="color:var(--muted)">Press I and O to mark each moment. Make as many as you like.</span></li>
    <li><b>Frame and style</b><br><span style="color:var(--muted)">Choose the layout, add titles and captions, or apply a template.</span></li>
    <li><b>Export</b><br><span style="color:var(--muted)">All clips export together, ready to upload.</span></li>
  </ol>
</div></section>
<section><div class="wrap privacy">
  <div>
    <h2>Your videos stay yours</h2>
    <p class="sub" style="margin-bottom:0">Fragmio is a desktop app, not a website. Everything happens on your computer.</p>
  </div>
  <ul class="checks">
    <li>Works fully offline</li>
    <li>Connects only when you click <b>Check for updates</b>, and sends nothing about you</li>
    <li>No account, no sign-in, no watermark</li>
    <li>Free during the beta</li>
  </ul>
</div></section>
<section class="band"><div class="wrap" style="text-align:center">
  <h2>Try the beta</h2>
  <p class="sub" style="margin:0 auto 24px">It's free while in beta. Tell us what breaks, and what you'd like next.</p>
  <div class="cta"><a class="btn primary" href="/download">Download for Windows</a><a class="btn" href="/feedback">Send feedback</a></div>
</div></section>
''')

pages['download'] = ('Download Fragmio for Windows', 'Download the free Fragmio beta for Windows 10 and 11.', '', '''
<div class="wrap page">
  <h1>Download Fragmio</h1>
  <p class="lead">Free during the beta. For Windows 10 and 11 (64-bit).</p>
  <div class="two">
    <div class="panel">
      <h2 style="margin:0">Fragmio <span data-version></span> <span class="beta">Beta</span></h2>
      <div class="meta"><span>Released <span data-date></span></span><span>Windows installer (.exe)</span></div>
      <a class="btn primary" data-download href="#">Download the installer</a>
      <p style="margin:14px 0 0;font-size:14px;color:var(--muted)">Opens the newest release on GitHub. Under <b>Assets</b>, click <code>Fragmio-…-setup.exe</code>. <a data-releases href="#">Older versions</a></p>
      <h3 style="margin:28px 0 8px">Install</h3>
      <ol class="plain">
        <li>Run the downloaded file.</li>
        <li>If Windows says <b>"Windows protected your PC"</b>, click <b>More info → Run anyway</b>. This shows because Fragmio is new, not because anything is wrong.</li>
        <li>Open Fragmio, start a new project and pick a video.</li>
      </ol>
    </div>
    <div style="display:grid;gap:16px;align-content:start">
      <div class="panel">
        <h3 style="margin:0 0 8px">Needs</h3>
        <ul class="checks"><li>Windows 10 or 11, 64-bit</li><li>8 GB memory or more</li><li>An NVIDIA graphics card makes exports faster, but isn't needed</li></ul>
      </div>
      <div class="note"><b>Updating:</b> in Fragmio, click <b>Help → Check for updates</b>. Install the new version over the old one; your projects and saved styles stay.</div>
    </div>
  </div>
</div>
''')

pages['support'] = ('Support Zak, the maker of Fragmio', 'Fragmio is made by one person. If it saves you time, you can support it directly.', 's', '''
<div class="wrap page">
  <h1>Support Fragmio</h1>
  <p class="lead">Hi, I'm Zak. I build Fragmio on my own. If it saves you time, a small contribution helps me keep it going and make it better.</p>
  <div class="two">
    <div class="panel">
      <h2 style="margin:0 0 6px">Pay with UPI</h2>
      <p style="margin:0 0 18px;color:var(--muted)">Scan with any UPI app: Google Pay, PhonePe, Paytm or your bank's app.</p>
      <div class="qr"><img src="/support-qr.png" alt="UPI QR code" onerror="this.replaceWith('Your QR code goes here (support-qr.png)')"></div>
      <p id="upi" class="upi" style="margin-top:16px">UPI ID: <span></span> <button id="copy-upi" class="btn small" type="button">Copy</button></p>
    </div>
    <div style="display:grid;gap:16px;align-content:start">
      <div class="panel">
        <h3 style="margin:0 0 8px">Card, netbanking or wallet</h3>
        <p style="margin:0 0 16px;color:var(--muted)">A secure payment page by Razorpay.</p>
        <a id="pay" class="btn primary" href="#" target="_blank" rel="noopener">Support with Razorpay</a>
      </div>
      <div class="note">Can't pay? That's fine. <b>Sharing Fragmio</b> with a friend or <a href="/feedback">sending feedback</a> helps just as much.</div>
    </div>
  </div>
</div>
''')

pages['feedback'] = ('Send feedback about Fragmio', 'Tell us what works, what breaks, and what you want next in Fragmio.', 'fb', '''
<div class="wrap page">
  <h1 id="fb-title">Send feedback</h1>
  <p class="lead" id="fb-lead">What do you like, what's confusing, and what should Fragmio do next? Every message is read.</p>
  <p id="fb-info" class="note hidden" style="margin:-12px 0 20px">Your version: <b><span></span></b>. Please mention it in the form.</p>
  <div class="panel">
    <iframe id="fb-frame" class="form-frame" title="Feedback form" loading="lazy"></iframe>
    <div id="fb-soon" class="hidden"><h3 style="margin-top:0">The feedback form is coming soon</h3><p style="color:var(--muted);margin:0">Thanks for wanting to help. Please check back in a few days.</p></div>
    <p style="margin:16px 0 0"><a id="fb-open" target="_blank" rel="noopener" href="#">Open the form in a new tab</a></p>
  </div>
</div>
''')

for name, (title, desc, on, body) in pages.items():
    h = HEAD.format(title=title, desc=desc, on_f=' class="on"' if on=='f' else '', on_fb=' class="on"' if on=='fb' else '', on_s=' class="on"' if on=='s' else '')
    open(f'{name}.html','w').write(h + body + FOOT)
print('built', list(pages))
