/* Root & Route — Check Your Bearings quiz */
(function () {
  'use strict';

  // ---- Question bank. tier: basecamp|trailhead|ridge|summit; post: slug for "read more"
  var BANK = [
    // Hardware
    {q:"A user's laptop is fast when it starts, but crawls once they have lots of apps and tabs open. What are they most likely short of?", o:["Storage space","RAM","CPU cores","Battery health"], a:1, tier:"basecamp", cat:"Hardware", post:"ram-vs-storage-two-kinds-of-memory", e:"RAM is the desk, storage is the filing cabinet. Lots of open apps = a full desk, so the machine starts using slow disk as fake desk space and everything wades through mud."},
    {q:"Why does swapping an old hard drive (HDD) for an SSD make a computer feel dramatically faster?", o:["SSDs hold more data","SSDs have no moving parts to wait for","SSDs use less electricity","SSDs run cooler"], a:1, tier:"basecamp", cat:"Hardware", post:"ssd-vs-hdd-explained", e:"An HDD physically swings an arm over spinning platters for every scattered file. An SSD is pure electronics — grabbing thousands of small files is essentially instant."},
    {q:"A PC randomly reboots — but only during games or heavy workloads. Which component deserves suspicion first?", o:["The keyboard","The power supply","The network card","The monitor"], a:1, tier:"trailhead", cat:"Hardware", post:"power-supplies-the-ignored-component", e:"Crashes that correlate with load point to power (or heat): a marginal PSU sags exactly when every component demands maximum power at once."},
    {q:"What runs first when you press the power button?", o:["Windows","The antivirus","The firmware (BIOS/UEFI)","The web browser"], a:2, tier:"trailhead", cat:"Hardware", post:"bios-uefi-firmware-explained", e:"Firmware on the motherboard wakes the hardware, counts the RAM, finds a bootable drive, and only then hands over to the operating system."},
    {q:"A laptop's trackpad is bulging upward slightly. What's the correct diagnosis?", o:["Worn trackpad — replace it","Swollen battery — safety issue, stop using it","Too many stickers","Overtightened screws"], a:1, tier:"trailhead", cat:"Hardware", post:"supporting-laptops-vs-desktops", e:"A bulging trackpad or keyboard is the classic sign of a swollen lithium battery pushing from underneath — a genuine safety issue, not a cosmetic one."},
    {q:"Two identical-looking USB-C ports: one drives two 4K monitors, the other won't drive any. What most likely explains it?", o:["One is broken","Different capabilities behind the same connector (e.g. Thunderbolt vs basic USB-C)","The monitor cable is upside down","Static electricity"], a:1, tier:"basecamp", cat:"Hardware", post:"field-guide-to-ports-usb-hdmi-thunderbolt", e:"The connector shape no longer tells you the capability. Thunderbolt and full-featured USB-C ports carry display traffic; basic ones may not — check the symbols and the spec sheet."},
    {q:"When troubleshooting hardware, why should you change only ONE thing at a time?", o:["It's faster","Otherwise you can't tell which change fixed it","Warranty rules require it","To save electricity"], a:1, tier:"trailhead", cat:"Hardware", post:"beginners-method-diagnosing-hardware", e:"Swap three things at once and the fix teaches you nothing — you can't prevent recurrence or explain the fault. One variable at a time is the whole discipline."},
    {q:"Which task is a GPU dramatically better at than a CPU?", o:["Running one long chain of dependent decisions","The same simple calculation across millions of independent data points","Reading files from disk","Connecting to Wi-Fi"], a:1, tier:"trailhead", cat:"Hardware", post:"what-is-a-gpu-really-for", e:"GPUs are thousands of simple workers in parallel — perfect for pixels and neural networks, wasted on step-by-step sequential logic."},

    // Networking
    {q:"A device's IP address starts with 169.254. What does that tell you instantly?", o:["It's a server","It asked for an address and no DHCP server answered","It has a virus","It's using IPv6"], a:1, tier:"trailhead", cat:"Networking", post:"dhcp-explained-simply", e:"169.254.x.x is the self-assigned emergency address a device gives itself when the DHCP conversation fails. The diagnosis is handed to you in the number."},
    {q:"Websites won't load by name, but pinging a raw IP address works fine. What's broken?", o:["The firewall","DNS","The Wi-Fi password","The power supply"], a:1, tier:"basecamp", cat:"Networking", post:"dns-the-internets-phone-book", e:"Classic DNS failure: the network is fine, but nothing can translate names into addresses. The phone book burned down; the phones still work."},
    {q:"Traffic between two PCs on the same office network is handled by a…", o:["Router","Switch","Modem","VPN"], a:1, tier:"basecamp", cat:"Networking", post:"routers-vs-switches-who-does-what", e:"Traffic staying inside the network is switching; traffic leaving the network is routing. Same building = the switch's job."},
    {q:"Why can't someone on the internet directly reach your laptop at home without port forwarding?", o:["Your ISP blocks everything","NAT — the router has no record of an inbound conversation to forward","Laptops are invisible","Antivirus stops it"], a:1, tier:"trailhead", cat:"Networking", post:"nat-how-your-house-shares-one-address", e:"NAT only forwards replies to conversations that devices inside started. An unsolicited inbound connection matches no table entry, so it dies at the router."},
    {q:"Why do video calls prefer UDP even though it can lose packets?", o:["UDP is encrypted","A late re-sent packet is worse than a lost one in real time","UDP is newer","TCP doesn't work on Wi-Fi"], a:1, tier:"trailhead", cat:"Networking", post:"tcp-vs-udp-tracked-delivery-vs-paper-planes", e:"Re-sending a frame from half a second ago is useless — the moment has passed. Real-time apps prefer a fresh glitch over a perfect but late frame."},
    {q:"Your Wi-Fi is great near the router but dies in the kitchen. Which is the LEAST likely culprit?", o:["The microwave's interference","Metal appliances reflecting signal","Thick walls","The router's IP address"], a:3, tier:"basecamp", cat:"Networking", post:"wifi-why-your-signal-dies-in-the-kitchen", e:"Wi-Fi is radio, so physics rules: interference, metal, and walls all weaken it. The router's IP address has nothing to do with signal strength."},
    {q:"How many usable device addresses does a /24 network give you?", o:["24","254","256","65,000"], a:1, tier:"ridge", cat:"Networking", post:"subnetting-without-tears", e:"A /24 leaves 8 bits for hosts = 256 addresses, minus two reserved (network and broadcast) = 254 usable. The first three numbers are the street; the last is the door."},
    {q:"A well-configured firewall rule list should end with what?", o:["Allow everything else","Deny everything else","A comment","A backup rule"], a:1, tier:"basecamp", cat:"Networking", post:"firewalls-bouncers-with-a-guest-list", e:"Default deny: list the small set of things explicitly permitted, and everything unlisted bounces. You can't enumerate the infinite list of bad things."},
    {q:"A corporate VPN's main job is to…", o:["Make you anonymous online","Extend the office network securely to remote devices","Speed up your internet","Block adverts"], a:1, tier:"trailhead", cat:"Networking", post:"vpns-private-tunnel-public-road", e:"A remote-access VPN is a very long encrypted cable to the office: your laptop behaves as if it were plugged in at a desk inside the building."},

    // Security
    {q:"Ransomware locking every file in a company is primarily an attack on which corner of the CIA triad?", o:["Confidentiality","Integrity","Availability","Authentication"], a:2, tier:"basecamp", cat:"Security", post:"cia-triad-explained", e:"The data isn't leaked or changed — the rightful users just can't reach it. That's an availability attack (modern crews add confidentiality by stealing data first)."},
    {q:"An email from 'IT' asks you to update payment details urgently. The single most protective response is…", o:["Reply asking if it's real","Check the spelling carefully","Verify via a different channel — call the known number","Forward it to a colleague"], a:2, tier:"basecamp", cat:"Security", post:"phishing-why-smart-people-click", e:"Attackers control the channel they contacted you on; they rarely control a second one. Switching channels to verify breaks the script."},
    {q:"Why does MFA still protect you when your password is stolen?", o:["It changes your password automatically","The attacker also needs something you physically have","It hides your password","It blocks foreign countries"], a:1, tier:"basecamp", cat:"Security", post:"passwords-are-broken-what-mfa-fixes", e:"MFA demands evidence from two different species — something you know AND something you have. Stealing both at once requires a fundamentally different attack."},
    {q:"What makes a worm scarier than a classic virus?", o:["It's invisible","It spreads by itself, no human action needed","It only attacks servers","It changes its name"], a:1, tier:"basecamp", cat:"Security", post:"malware-field-guide-to-the-species", e:"A worm scans and infects on its own, and every victim starts scanning too. That compounding is why 'wormable' is the scariest word in a vulnerability report."},
    {q:"In public-key encryption, your public key is best described as…", o:["A password","An open padlock anyone can snap shut","A secret code word","A backup key"], a:1, tier:"trailhead", cat:"Security", post:"encryption-locked-boxes-public-padlocks", e:"Anyone can lock a box with your open padlock — but snapping it shut doesn't let them open it. Only your private key does."},
    {q:"Least privilege exists mainly to…", o:["Stop staff wasting time","Limit how much damage one compromised account can do","Save on software licences","Make audits shorter"], a:1, tier:"trailhead", cat:"Security", post:"least-privilege-nobody-gets-all-the-keys", e:"Assume some account will eventually fall. Least privilege is blast-radius engineering: a phished standard user costs far less than a phished domain admin."},
    {q:"Why does releasing a security patch start a race?", o:["Vendors compete to patch first","Attackers reverse-engineer the patch to build exploits for unpatched systems","Patches expire","Users race to uninstall"], a:1, tier:"basecamp", cat:"Security", post:"patching-boring-thing-preventing-breaches", e:"A patch is a public confession of a broken lock. Attackers diff patched vs unpatched code, build the exploit, and scan for everyone who hasn't updated yet."},
    {q:"Someone in hi-vis carrying a big box follows you through the secure door. That technique is called…", o:["Baiting","Tailgating","Pretexting","Quid pro quo"], a:1, tier:"trailhead", cat:"Security", post:"social-engineering-hacking-people", e:"Tailgating exploits politeness — nobody wants to shut a door on someone with full hands. Physical access is catastrophic access."},
    {q:"'A threat uses an ___ against a ___, creating risk.' Fill the blanks.", o:["exploit / vulnerability","vulnerability / exploit","risk / threat","patch / firewall"], a:0, tier:"trailhead", cat:"Security", post:"vulnerability-exploit-threat-getting-words-right", e:"The burglar (threat) uses the lock-picking technique (exploit) against the broken lock (vulnerability). Risk is where they all meet reality."},
    {q:"Why do organisations ship logs off each machine to central storage?", o:["Local disks are slow","Attackers routinely delete local logs to cover their tracks","It's cheaper","Logs are illegal to keep locally"], a:1, tier:"trailhead", cat:"Security", post:"logs-security-camera-footage-of-your-network", e:"Footage stored inside the building can be wiped by the burglar. Central copies the attacker can't quietly edit are the counter-move."},

    // Advanced
    {q:"Zero trust replaces 'where are you?' with which question?", o:["How fast is your connection?","Who are you, on what device, doing what, right now?","Which building are you in?","What's your password?"], a:1, tier:"ridge", cat:"Advanced", post:"zero-trust-explained-like-youre-smart-but-new", e:"Network location stopped being evidence of trustworthiness. Zero trust evaluates identity, device health, and context — on every request."},
    {q:"In a TLS handshake, what stops an impostor server pretending to be your bank?", o:["A strong password","The certificate, signed by an authority your browser already trusts","The firewall","A CAPTCHA"], a:1, tier:"summit", cat:"Advanced", post:"what-happens-in-a-tls-handshake", e:"The certificate chain: your browser trusts built-in CAs, the CA vouches for the key, the key speaks for the domain. Warnings mean the chain snapped."},
    {q:"In the Kerberos festival analogy, a 'golden ticket' attack means the attacker stole…", o:["One venue ticket","A wristband","The box office's master stamp — they can print wristbands for anyone","The festival map"], a:2, tier:"summit", cat:"Advanced", post:"kerberos-without-the-migraine", e:"Stealing the krbtgt key lets attackers forge tickets for any user, real or invented — total domain compromise, fixed only by re-keying the box office twice."},
    {q:"BGP hijacks work because classic BGP…", o:["Is encrypted too heavily","Trusts route announcements without verifying them","Only runs on old routers","Requires passwords"], a:1, tier:"summit", cat:"Advanced", post:"bgp-how-the-internet-decides-where-to-send-things", e:"The internet's routing is gossip on the honour system: routers historically believed whatever their neighbours announced. RPKI is the ongoing fix."},
    {q:"DNS tunnelling smuggles stolen data out of a network by…", o:["Emailing it slowly","Encoding it inside DNS lookups, which firewalls almost never block","Printing it","Hiding it in images"], a:1, tier:"ridge", cat:"Advanced", post:"dns-attacks-poisoning-tunnelling-hijacking", e:"Everything breaks without DNS, so it's the one protocol guaranteed to pass. Data walks out disguised as phone-book lookups — which is why mature teams inspect DNS traffic."},
    {q:"In hybrid identity, 'source of authority' explains why…", o:["Cloud accounts are faster","You often can't edit a synced user's attributes in the cloud portal","Passwords expire","MFA is optional"], a:1, tier:"summit", cat:"Advanced", post:"hybrid-identity-users-in-two-worlds", e:"Synced objects are owned by on-prem AD — the master. The portal shows a copy; the answer to 'why can't I change this here?' lives downstairs."},
    {q:"Before enabling a new conditional access policy, the professional habit is to…", o:["Enable it on Friday evening","Run it in report-only mode first","Delete old policies","Email all users"], a:1, tier:"ridge", cat:"Advanced", post:"conditional-access-if-this-then-that-security", e:"Report-only shows what a policy WOULD do without locking anyone out. That, plus break-glass accounts, are the two non-negotiable habits of the trade."},
    {q:"Microsegmentation exists mainly to stop which attacker behaviour?", o:["Phishing","Lateral (east-west) movement between internal systems","Password guessing","DDoS attacks"], a:1, tier:"summit", cat:"Advanced", post:"beyond-vlans-microsegmentation-east-west", e:"Perimeters inspect north-south traffic; attackers spread sideways inside flat zones. Per-workload default-deny puts a lock on every room, not just every floor."},
    {q:"Why do modern ransomware crews steal data BEFORE encrypting anything?", o:["To test the network speed","Double extortion — backups no longer save you from the leak threat","To slow the encryption down","They don't"], a:1, tier:"ridge", cat:"Advanced", post:"anatomy-of-a-ransomware-attack", e:"Pay to decrypt, pay again so the data isn't published. It's why 'we restored from backups' no longer ends the incident — it's a breach now, not just an outage."},
    {q:"An alert rule that fires 50 false alarms a day is dangerous because…", o:["It uses too much CPU","Humans learn to ignore it — alert fatigue","It fills the disk","It slows the network"], a:1, tier:"summit", cat:"Advanced", post:"from-logs-to-alerts-detection-engineering", e:"Famous breaches have post-mortems where the alert fired and nobody looked. A rule that cries wolf trains people to ignore it — functionally worse than no rule."}
  ];

  var TIER_LABEL = {basecamp:"Basecamp", trailhead:"Trailhead", ridge:"Ridge", summit:"Summit"};
  var TIER_CLASS = {basecamp:"badge-basecamp", trailhead:"badge-trailhead", ridge:"badge-ridge", summit:"badge-summit"};
  var RANKS = [
    {min:0, name:"Lost in the Car Park", blurb:"Everyone starts here — genuinely. The Trail Log's Basecamp posts were written for exactly this moment. Pick one, read it, hike again."},
    {min:3, name:"Found the Trailhead", blurb:"The fundamentals are forming. Reread the explanations you missed above — each links to the full post that makes it stick."},
    {min:6, name:"Ridge Walker", blurb:"Solid. You're connecting concepts across topics, which is the actual skill. The Summit posts are ready when you are."},
    {min:9, name:"Summit Ready", blurb:"Excellent bearings. If this stuff is clicking, you're ready for the Ridge and Summit posts — and honestly, for interview questions too."}
  ];

  var app = document.getElementById('quiz-app');
  if (!app) return;

  var els = {
    start: document.getElementById('quiz-start'),
    play: document.getElementById('quiz-play'),
    end: document.getElementById('quiz-end'),
    begin: document.getElementById('quiz-begin'),
    progress: document.getElementById('quiz-progress'),
    score: document.getElementById('quiz-score'),
    trailFill: document.getElementById('quiz-trail-fill'),
    qmeta: document.getElementById('quiz-qmeta'),
    question: document.getElementById('quiz-question'),
    options: document.getElementById('quiz-options'),
    feedback: document.getElementById('quiz-feedback'),
    verdict: document.getElementById('quiz-verdict'),
    explain: document.getElementById('quiz-explain'),
    readmore: document.getElementById('quiz-readmore'),
    next: document.getElementById('quiz-next'),
    rank: document.getElementById('quiz-rank'),
    final: document.getElementById('quiz-final'),
    rankBlurb: document.getElementById('quiz-rank-blurb'),
    again: document.getElementById('quiz-again'),
    share: document.getElementById('quiz-share'),
    shareDone: document.getElementById('quiz-share-done'),
    review: document.getElementById('quiz-review')
  };

  var round = [], idx = 0, score = 0, results = [];
  var ROUND_SIZE = 10;

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function startRound() {
    round = shuffle(BANK).slice(0, ROUND_SIZE);
    idx = 0; score = 0; results = [];
    els.start.hidden = true;
    els.end.hidden = true;
    els.play.hidden = false;
    showQuestion();
  }

  function showQuestion() {
    var q = round[idx];
    els.progress.textContent = 'Question ' + (idx + 1) + ' of ' + ROUND_SIZE;
    els.score.textContent = 'Score: ' + score;
    els.trailFill.style.width = ((idx / ROUND_SIZE) * 100) + '%';
    els.qmeta.innerHTML = '<span class="badge ' + TIER_CLASS[q.tier] + '">' + TIER_LABEL[q.tier] + '</span><span class="tag">' + q.cat + '</span>';
    els.question.textContent = q.q;
    els.feedback.hidden = true;
    els.options.innerHTML = '';

    // Shuffle option order but track the correct one
    var order = shuffle(q.o.map(function (_, i) { return i; }));
    order.forEach(function (origIdx) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.type = 'button';
      btn.textContent = q.o[origIdx];
      btn.addEventListener('click', function () { answer(origIdx, btn, q); });
      els.options.appendChild(btn);
    });
    els.question.focus && els.question.setAttribute('tabindex', '-1');
  }

  function answer(chosen, btn, q) {
    var correct = chosen === q.a;
    if (correct) score++;
    results.push({q: q, correct: correct});

    var buttons = els.options.querySelectorAll('.quiz-option');
    buttons.forEach(function (b) {
      b.disabled = true;
      if (b.textContent === q.o[q.a]) b.classList.add('is-correct');
    });
    if (!correct) btn.classList.add('is-wrong');

    els.verdict.textContent = correct
      ? ['Spot on.', 'Nailed it.', 'Correct — onwards.', 'That\u2019s the one.'][Math.floor(Math.random() * 4)]
      : 'Not this time — the marked answer is the one.';
    els.verdict.className = 'quiz-verdict ' + (correct ? 'ok' : 'no');
    els.explain.textContent = q.e;
    els.readmore.innerHTML = 'Read the full post: <a href="posts/' + q.post + '.html">' + q.post.replace(/-/g, ' ') + ' →</a>';
    els.score.textContent = 'Score: ' + score;
    els.next.textContent = (idx === ROUND_SIZE - 1) ? 'See my rank →' : 'Next question →';
    els.feedback.hidden = false;
    els.next.focus();
  }

  function endRound() {
    els.play.hidden = true;
    els.end.hidden = false;
    els.trailFill.style.width = '100%';

    var rank = RANKS[0];
    RANKS.forEach(function (r) { if (score >= r.min) rank = r; });
    els.rank.textContent = rank.name;
    els.final.textContent = score + ' / ' + ROUND_SIZE;
    els.rankBlurb.textContent = rank.blurb;
    els.shareDone.hidden = true;

    // Review of missed questions
    var missed = results.filter(function (r) { return !r.correct; });
    if (missed.length) {
      var html = '<span class="eyebrow">Worth rereading</span><ul class="quiz-review-list">';
      missed.forEach(function (r) {
        html += '<li><a href="posts/' + r.q.post + '.html">' + r.q.post.replace(/-/g, ' ') + '</a></li>';
      });
      html += '</ul>';
      els.review.innerHTML = html;
      els.review.hidden = false;
    } else {
      els.review.innerHTML = '<span class="eyebrow">Clean sweep</span><p style="margin-top:0.6rem;">Nothing missed. Hike it again — the questions are drawn fresh each round.</p>';
      els.review.hidden = false;
    }
  }

  els.begin.addEventListener('click', startRound);
  els.again.addEventListener('click', startRound);
  els.next.addEventListener('click', function () {
    idx++;
    if (idx >= ROUND_SIZE) endRound(); else showQuestion();
  });
  els.share.addEventListener('click', function () {
    var rankName = els.rank.textContent;
    var text = 'I scored ' + score + '/' + ROUND_SIZE + ' (' + rankName + ') on the Root & Route trail quiz \u26F0 Check your bearings: https://rootandroute.online/quiz.html';
    function done() { els.shareDone.hidden = false; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  });
})();
