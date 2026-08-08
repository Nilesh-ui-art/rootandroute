/* Root & Route — Terminal Playground. Fully simulated: no network, no real files. */
(function () {
  'use strict';
  var screen = document.getElementById('term-screen');
  var input = document.getElementById('term-input');
  if (!screen || !input) return;

  var promptEl = document.getElementById('term-prompt');
  var USER = 'trainee', HOST = 'basecamp';

  // ---------- Virtual filesystem ----------
  var FS = {
    '/home/trainee': { type: 'dir', children: ['readme.txt', 'notes', 'trail-map.txt', '.hidden-cache'] },
    '/home/trainee/readme.txt': { type: 'file', content:
      'Welcome to the Root & Route practice shell.\n\nThis machine is simulated — nothing you do here is real,\nso experiment freely. Useful starters:\n\n  help          list every command this shell speaks\n  ls            look around\n  cat <file>    read a file\n  ping <host>   check if something answers\n\nTip: arrow-up recalls your previous commands, Tab completes.' },
    '/home/trainee/trail-map.txt': { type: 'file', content:
      'Suggested route through the missions (left panel):\n  1. First Steps        — moving around a filesystem\n  2. Know Thyself       — whoami, hostname, ip addr\n  3. Is It Up?          — ping and what latency means\n  4. Name Detective     — nslookup and DNS\n  5. The Long Road      — traceroute, hop by hop\nEach mission links to the trail post that explains the why.' },
    '/home/trainee/.hidden-cache': { type: 'file', content:
      'You found the hidden file! Files starting with a dot are\nhidden from plain ls — that is why ls -a exists.\nThis is also where attackers love to stash things,\nwhich is why "check for hidden files" appears in every\nincident-response checklist.' },
    '/home/trainee/notes': { type: 'dir', children: ['dns.txt', 'ports.txt'] },
    '/home/trainee/notes/dns.txt': { type: 'file', content:
      'DNS = the internet\'s phone book.\nNames -> numbers. When it breaks, everything "is down"\nbut the network is usually fine.\nFull story: /posts/dns-the-internets-phone-book.html' },
    '/home/trainee/notes/ports.txt': { type: 'file', content:
      'Ports worth memorising early:\n  22  SSH        53  DNS\n  80  HTTP      443  HTTPS\n  25  SMTP     3389  RDP\nA firewall rule like "allow TCP/443" names both the\ndelivery method and the flat number.' }
  };
  var cwd = '/home/trainee';

  // ---------- Simulated network ----------
  var NET = {
    'rootandroute.online': { ip: '185.199.108.153', up: true, base: 14 },
    'localhost':           { ip: '127.0.0.1', up: true, base: 0.05 },
    'gateway.home':        { ip: '192.168.1.1', up: true, base: 2 },
    'fileserver.basecamp.lan': { ip: '10.10.4.20', up: true, base: 1 },
    'printer.basecamp.lan':    { ip: '10.10.4.31', up: false, base: 0 },
    'example.com':         { ip: '93.184.215.14', up: true, base: 88 }
  };
  function resolveHost(h) {
    if (NET[h]) return NET[h];
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) {
      for (var k in NET) if (NET[k].ip === h) return NET[k];
      return { ip: h, up: false, base: 0, unknownIp: true };
    }
    return null;
  }

  // ---------- Output helpers (textContent only — user input is never parsed as HTML) ----------
  function line(text, cls) {
    var div = document.createElement('div');
    div.className = 'term-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    screen.appendChild(div);
  }
  function lines(text, cls) { String(text).split('\n').forEach(function (t) { line(t, cls); }); }
  function scroll() { screen.scrollTop = screen.scrollHeight; }

  // ---------- Path helpers ----------
  function normalize(p) {
    if (!p) return cwd;
    if (p === '~') return '/home/trainee';
    if (p.slice(0, 2) === '~/') p = '/home/trainee/' + p.slice(2);
    if (p[0] !== '/') p = cwd + '/' + p;
    var parts = [];
    p.split('/').forEach(function (seg) {
      if (!seg || seg === '.') return;
      if (seg === '..') parts.pop(); else parts.push(seg);
    });
    return '/' + parts.join('/');
  }
  function shortCwd() { return cwd.replace('/home/trainee', '~'); }
  function setPrompt() {
    var t = USER + '@' + HOST + ':' + shortCwd() + '$';
    promptEl.textContent = t;
    var title = document.querySelector('.term-title');
    if (title) title.textContent = USER + '@' + HOST + ': ' + shortCwd();
  }

  // ---------- Commands ----------
  var CMDS = {
    help: { desc: 'list available commands', fn: function () {
      lines('Available commands:\n  Files:      ls [-a] [-l], cd <dir>, pwd, cat <file>, mkdir <dir>, touch <file>, echo <text>\n  Identity:   whoami, hostname, date, history\n  Network:    ping [-c N] <host>, nslookup <name>, traceroute <host>, ip addr\n  Shell:      clear, help\n\nThis is a teaching shell — a safe subset of real Linux. Same syntax, zero risk.');
    }},
    pwd: { desc: 'print working directory', fn: function () { line(cwd); }},
    whoami: { desc: 'current user', fn: function () { line(USER); }},
    hostname: { desc: 'machine name', fn: function () { line(HOST); }},
    date: { desc: 'current date/time', fn: function () { line(new Date().toString()); }},
    clear: { desc: 'clear the screen', fn: function () { screen.textContent = ''; }},
    echo: { desc: 'print text', fn: function (args) { line(args.join(' ')); }},
    history: { desc: 'command history', fn: function () {
      history.forEach(function (h, i) { line('  ' + (i + 1) + '  ' + h); });
    }},
    ls: { desc: 'list directory', fn: function (args) {
      var all = args.indexOf('-a') !== -1 || args.indexOf('-la') !== -1 || args.indexOf('-al') !== -1;
      var long = args.indexOf('-l') !== -1 || args.indexOf('-la') !== -1 || args.indexOf('-al') !== -1;
      var target = normalize(args.filter(function (a) { return a[0] !== '-'; })[0] || '.');
      var node = FS[target];
      if (!node) return line('ls: cannot access \'' + target + '\': No such file or directory', 'term-err');
      if (node.type === 'file') return line(target.split('/').pop());
      node.children.slice().sort().forEach(function (c) {
        if (!all && c[0] === '.') return;
        var child = FS[target + '/' + c];
        var isDir = child && child.type === 'dir';
        if (long) {
          var size = isDir ? 4096 : (child ? child.content.length : 0);
          line((isDir ? 'drwxr-xr-x' : '-rw-r--r--') + '  1 trainee trainee ' + String(size).padStart(6) + ' Aug  8 09:00 ' + c, isDir ? 'term-dir' : null);
        } else {
          line(c + (isDir ? '/' : ''), isDir ? 'term-dir' : null);
        }
      });
    }},
    cd: { desc: 'change directory', fn: function (args) {
      var target = normalize(args[0] || '~');
      var node = FS[target];
      if (!node) return line('cd: no such file or directory: ' + (args[0] || '~'), 'term-err');
      if (node.type !== 'dir') return line('cd: not a directory: ' + args[0], 'term-err');
      cwd = target; setPrompt();
    }},
    cat: { desc: 'read a file', fn: function (args) {
      if (!args[0]) return line('cat: which file? usage: cat <file>', 'term-err');
      var target = normalize(args[0]);
      var node = FS[target];
      if (!node) return line('cat: ' + args[0] + ': No such file or directory', 'term-err');
      if (node.type === 'dir') return line('cat: ' + args[0] + ': Is a directory', 'term-err');
      lines(node.content);
    }},
    mkdir: { desc: 'make directory', fn: function (args) {
      if (!args[0]) return line('mkdir: missing operand', 'term-err');
      var target = normalize(args[0]);
      if (FS[target]) return line('mkdir: cannot create directory \'' + args[0] + '\': File exists', 'term-err');
      var parent = target.slice(0, target.lastIndexOf('/')) || '/';
      if (!FS[parent] || FS[parent].type !== 'dir') return line('mkdir: cannot create directory \'' + args[0] + '\': No such file or directory', 'term-err');
      FS[target] = { type: 'dir', children: [] };
      FS[parent].children.push(target.split('/').pop());
    }},
    touch: { desc: 'create empty file', fn: function (args) {
      if (!args[0]) return line('touch: missing file operand', 'term-err');
      var target = normalize(args[0]);
      if (FS[target]) return;
      var parent = target.slice(0, target.lastIndexOf('/')) || '/';
      if (!FS[parent] || FS[parent].type !== 'dir') return line('touch: cannot touch \'' + args[0] + '\': No such file or directory', 'term-err');
      FS[target] = { type: 'file', content: '' };
      FS[parent].children.push(target.split('/').pop());
    }},
    'ip': { desc: 'ip addr — show addresses', fn: function (args) {
      if (args[0] !== 'addr' && args[0] !== 'a') return line('ip: this shell supports \'ip addr\'', 'term-err');
      lines('1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500\n    inet 192.168.1.42/24 brd 192.168.1.255 scope global dynamic eth0');
      line('# 192.168.1.42 is a private address — the postal-system post explains the /24.', 'term-note');
    }},
    ping: { desc: 'ping a host', fn: function (args, done) {
      var count = 4;
      var ci = args.indexOf('-c');
      if (ci !== -1 && args[ci + 1]) { count = Math.min(parseInt(args[ci + 1], 10) || 4, 8); args.splice(ci, 2); }
      var host = args.filter(function (a) { return a[0] !== '-'; })[0];
      if (!host) { line('usage: ping [-c count] <host>', 'term-err'); return done(); }
      var target = resolveHost(host);
      if (!target) { line('ping: ' + host + ': Name or service not known', 'term-err'); line('# The name failed to resolve — that is a DNS matter. Try: nslookup ' + host, 'term-note'); return done(); }
      line('PING ' + host + ' (' + target.ip + ') 56(84) bytes of data.');
      var sent = 0, rcvd = 0, times = [];
      var iv = setInterval(function () {
        sent++;
        if (target.up) {
          var t = +(target.base + Math.random() * target.base * 0.4 + 0.1).toFixed(1);
          times.push(t); rcvd++;
          line('64 bytes from ' + target.ip + ': icmp_seq=' + sent + ' ttl=' + (target.base < 5 ? 64 : 54) + ' time=' + t + ' ms');
        } else {
          line('Request timeout for icmp_seq ' + sent, 'term-err');
        }
        scroll();
        if (sent >= count) {
          clearInterval(iv);
          var loss = Math.round(((sent - rcvd) / sent) * 100);
          line('--- ' + host + ' ping statistics ---');
          line(sent + ' packets transmitted, ' + rcvd + ' received, ' + loss + '% packet loss');
          if (times.length) {
            var min = Math.min.apply(null, times), max = Math.max.apply(null, times);
            var avg = +(times.reduce(function (a, b) { return a + b; }, 0) / times.length).toFixed(1);
            line('rtt min/avg/max = ' + min + '/' + avg + '/' + max + ' ms');
          }
          if (!target.up && !target.unknownIp) line('# No reply — the name resolved, but the device is not answering. Down, blocked, or ignoring ping.', 'term-note');
          done();
        }
      }, 320);
    }, async: true },
    nslookup: { desc: 'DNS lookup', fn: function (args) {
      var host = args[0];
      if (!host) return line('usage: nslookup <name>', 'term-err');
      line('Server:\t\t192.168.1.1');
      line('Address:\t192.168.1.1#53');
      line('');
      var target = NET[host];
      if (!target) {
        line('** server can\'t find ' + host + ': NXDOMAIN', 'term-err');
        line('# NXDOMAIN = the phone book has no entry for that name.', 'term-note');
        return;
      }
      line('Non-authoritative answer:');
      line('Name:\t' + host);
      line('Address: ' + target.ip);
      line('# Name -> number. That translation is all DNS is. Full story: the DNS post on the trail.', 'term-note');
    }},
    traceroute: { desc: 'trace the route to a host', fn: function (args, done) {
      var host = args[0];
      if (!host) { line('usage: traceroute <host>', 'term-err'); return done(); }
      var target = resolveHost(host);
      if (!target) { line('traceroute: unknown host ' + host, 'term-err'); return done(); }
      line('traceroute to ' + host + ' (' + target.ip + '), 30 hops max');
      var hops = target.base < 5
        ? [['1  gateway.home (192.168.1.1)', 2]]
        : [['1  gateway.home (192.168.1.1)', 2], ['2  10.60.0.1 (10.60.0.1)', 8], ['3  isp-core-lon.net (81.139.4.7)', 11], ['4  peering-lon2.net (195.66.224.19)', 12], ['5  ' + host + ' (' + target.ip + ')', target.base]];
      var i = 0;
      var iv = setInterval(function () {
        var h = hops[i];
        var t = function () { return ' ' + (+(h[1] + Math.random() * 2).toFixed(1)) + ' ms'; };
        line(' ' + h[0] + t() + t() + t());
        scroll();
        i++;
        if (i >= hops.length) {
          clearInterval(iv);
          line('# Each line is a router your packets crossed. Hop 1 is your own gateway — the first suspect when everything is down.', 'term-note');
          done();
        }
      }, 380);
    }, async: true },
    sudo: { desc: '', fn: function () { line(USER + ' is not in the sudoers file. This incident will be reported. (Not really — but on a real machine, it would be. Least privilege in action.)'); }},
    rm: { desc: '', fn: function (args) {
      if (args.indexOf('-rf') !== -1 && (args.indexOf('/') !== -1 || args.indexOf('/*') !== -1)) {
        return line('rm: nice try. Even the simulator has change enablement.', 'term-note');
      }
      var target = normalize(args.filter(function (a) { return a[0] !== '-'; })[0] || '');
      var node = FS[target];
      if (!node) return line('rm: cannot remove: No such file or directory', 'term-err');
      if (node.type === 'dir' && args.indexOf('-r') === -1) return line('rm: cannot remove \'' + target.split('/').pop() + '\': Is a directory (try rm -r)', 'term-err');
      delete FS[target];
      var parent = target.slice(0, target.lastIndexOf('/'));
      var name = target.split('/').pop();
      if (FS[parent]) FS[parent].children = FS[parent].children.filter(function (c) { return c !== name; });
    }},
    ssh: { desc: '', fn: function () { line('ssh: connection refused. (The playground stops at the water\'s edge — real remote access is a lesson for a real lab.)', 'term-note'); }}
  };

  // ---------- Missions ----------
  var MKEY = 'rr-term-missions';
  function mload() { try { return JSON.parse(localStorage.getItem(MKEY)) || {}; } catch (e) { return {}; } }
  function msave(d) { try { localStorage.setItem(MKEY, JSON.stringify(d)); } catch (e) {} }

  var MISSIONS = [
    { id: 'steps', name: '1. First Steps', post: null, steps: [
      { text: 'Look around your home directory. List what\'s here.', hint: 'The command is two letters: ls', check: function (c) { return c.cmd === 'ls'; } },
      { text: 'There\'s a notes directory. Move into it.', hint: 'cd notes', check: function (c) { return c.cmd === 'cd' && cwd === '/home/trainee/notes'; } },
      { text: 'Read the ports file.', hint: 'cat ports.txt', check: function (c) { return c.cmd === 'cat' && c.raw.indexOf('ports') !== -1; } },
      { text: 'Go back home, then reveal the hidden files.', hint: 'cd ~ then ls -a — hidden files start with a dot', check: function (c) { return c.cmd === 'ls' && c.args.indexOf('-a') !== -1 && cwd === '/home/trainee'; } },
      { text: 'Read the hidden cache file you just found.', hint: 'cat .hidden-cache', check: function (c) { return c.cmd === 'cat' && c.raw.indexOf('.hidden-cache') !== -1; } }
    ]},
    { id: 'identity', name: '2. Know Thyself', post: 'ip-addresses-postal-system', postName: 'IP Addresses: The Postal System of the Internet', steps: [
      { text: 'Every diagnosis starts with "who and where am I?" Find out which user you are.', hint: 'whoami', check: function (c) { return c.cmd === 'whoami'; } },
      { text: 'Now the machine\'s name.', hint: 'hostname', check: function (c) { return c.cmd === 'hostname'; } },
      { text: 'The big one: find this machine\'s IP address.', hint: 'ip addr', check: function (c) { return c.cmd === 'ip' && (c.args[0] === 'addr' || c.args[0] === 'a'); } }
    ]},
    { id: 'ping', name: '3. Is It Up?', post: 'tcp-vs-udp-tracked-delivery-vs-paper-planes', postName: 'TCP vs UDP', steps: [
      { text: 'Check whether this site\'s server answers: ping rootandroute.online', hint: 'ping rootandroute.online (Ctrl+C not needed — it stops at 4)', check: function (c) { return c.cmd === 'ping' && c.raw.indexOf('rootandroute.online') !== -1; } },
      { text: 'Now ping your gateway — the first hop out of any network: gateway.home', hint: 'ping gateway.home — note how much lower the latency is', check: function (c) { return c.cmd === 'ping' && c.raw.indexOf('gateway.home') !== -1; } },
      { text: 'The office printer is printer.basecamp.lan. Ping it and read the result carefully.', hint: 'ping printer.basecamp.lan — timeouts ARE the answer', check: function (c) { return c.cmd === 'ping' && c.raw.indexOf('printer.basecamp.lan') !== -1; } }
    ]},
    { id: 'dns', name: '4. Name Detective', post: 'dns-the-internets-phone-book', postName: 'DNS: The Internet\'s Phone Book', steps: [
      { text: 'Translate a name into a number: nslookup rootandroute.online', hint: 'nslookup rootandroute.online', check: function (c) { return c.cmd === 'nslookup' && c.raw.indexOf('rootandroute.online') !== -1; } },
      { text: 'Now look up a name that doesn\'t exist — try nslookup tea.basecamp.lan — and read the error.', hint: 'Any made-up name works. NXDOMAIN is the phone book shrugging.', check: function (c) { return c.cmd === 'nslookup' && c.args[0] && !NET[c.args[0]]; } },
      { text: 'Prove the DNS-vs-network distinction: ping the IP 185.199.108.153 directly.', hint: 'ping 185.199.108.153 — works without DNS entirely', check: function (c) { return c.cmd === 'ping' && c.raw.indexOf('185.199.108.153') !== -1; } }
    ]},
    { id: 'trace', name: '5. The Long Road', post: 'bgp-how-the-internet-decides-where-to-send-things', postName: 'BGP: How the Internet Routes', steps: [
      { text: 'See every router between you and example.com: traceroute example.com', hint: 'traceroute example.com', check: function (c) { return c.cmd === 'traceroute' && c.raw.indexOf('example.com') !== -1; } },
      { text: 'Now trace to something local — the fileserver — and compare the hop count.', hint: 'traceroute fileserver.basecamp.lan — one hop vs five tells a story', check: function (c) { return c.cmd === 'traceroute' && c.raw.indexOf('fileserver') !== -1; } }
    ]}
  ];

  var active = null, stepIdx = 0;
  var objBox = document.getElementById('term-objective');
  var objText = document.getElementById('objective-text');
  var objHint = document.getElementById('objective-hint');
  var hintBtn = document.getElementById('objective-hint-btn');
  var listEl = document.getElementById('mission-list');

  function renderMissions() {
    var done = mload();
    listEl.textContent = '';
    MISSIONS.forEach(function (m) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mission-btn' + (active && active.id === m.id ? ' is-active' : '') + (done[m.id] ? ' is-done' : '');
      b.textContent = (done[m.id] ? '✓ ' : '') + m.name;
      b.addEventListener('click', function () { startMission(m); });
      listEl.appendChild(b);
    });
  }
  function startMission(m) {
    active = m; stepIdx = 0;
    objBox.hidden = false;
    showStep();
    renderMissions();
    line('', null);
    line('▸ Mission started: ' + m.name + ' — objective is in the left panel.', 'term-note');
    scroll();
    input.focus();
  }
  function showStep() {
    objText.textContent = active.steps[stepIdx].text;
    objHint.hidden = true;
    objHint.textContent = active.steps[stepIdx].hint;
  }
  hintBtn.addEventListener('click', function () { objHint.hidden = !objHint.hidden; });

  function checkMission(parsed) {
    if (!active) return;
    var step = active.steps[stepIdx];
    if (!step.check(parsed)) return;
    stepIdx++;
    if (stepIdx < active.steps.length) {
      line('✓ Objective complete. Next objective is up in the panel.', 'term-ok');
      showStep();
    } else {
      var done = mload(); done[active.id] = true; msave(done);
      line('★ Mission complete: ' + active.name, 'term-ok');
      if (active.post) line('  The full story behind these commands: /posts/' + active.post + '.html — "' + active.postName + '"', 'term-note');
      active = null;
      objBox.hidden = true;
      renderMissions();
    }
  }

  // ---------- Input loop ----------
  var history = [], hIdx = -1, busy = false;

  function run(raw) {
    var parts = raw.trim().split(/\s+/);
    var cmd = parts[0], args = parts.slice(1);
    var parsed = { cmd: cmd, args: args, raw: raw.trim() };
    var entry = CMDS[cmd];
    if (!entry) {
      line(cmd + ': command not found. Type help to see what this shell speaks.', 'term-err');
      return finish(parsed);
    }
    if (entry.async) {
      busy = true; input.disabled = true;
      entry.fn(args, function () { busy = false; input.disabled = false; input.focus(); finish(parsed); });
    } else {
      entry.fn(args);
      finish(parsed);
    }
  }
  function finish(parsed) { checkMission(parsed); scroll(); }

  input.addEventListener('keydown', function (e) {
    if (busy) return;
    if (e.key === 'Enter') {
      var raw = input.value;
      line(promptEl.textContent + ' ' + raw, 'term-cmd');
      input.value = '';
      if (raw.trim()) { history.push(raw.trim()); hIdx = history.length; run(raw); }
      else scroll();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hIdx > 0) { hIdx--; input.value = history[hIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIdx < history.length - 1) { hIdx++; input.value = history[hIdx]; }
      else { hIdx = history.length; input.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      var val = input.value;
      var parts = val.split(/\s+/);
      var frag = parts[parts.length - 1];
      if (!frag) return;
      var pool;
      if (parts.length === 1) pool = Object.keys(CMDS);
      else {
        var dir = FS[cwd];
        pool = dir ? dir.children.slice() : [];
        for (var k in NET) pool.push(k);
      }
      var hits = pool.filter(function (p) { return p.indexOf(frag) === 0; });
      if (hits.length === 1) {
        parts[parts.length - 1] = hits[0];
        input.value = parts.join(' ') + (parts.length === 1 ? ' ' : '');
      } else if (hits.length > 1) {
        line(hits.join('   '), 'term-note'); scroll();
      }
    }
  });

  document.getElementById('term-window').addEventListener('click', function () { if (!busy) input.focus(); });

  // ---------- Boot ----------
  lines('Root & Route practice shell — simulated, safe, yours to break.\nType help for commands, cat readme.txt to start, or pick a mission on the left.\n');
  setPrompt();
  renderMissions();
})();
