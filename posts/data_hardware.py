# Root & Route — IT Hardware posts
POSTS = [
dict(
slug="what-a-cpu-actually-does",
title="What a CPU Actually Does All Day",
dek="It's not a brain. It's a very fast, very obedient clerk — and that distinction changes how you think about slow computers.",
desc="What a CPU actually does, explained for beginners: cores, clock speed, and why 'the brain of the computer' is a misleading analogy.",
keywords="what does a CPU do, CPU explained for beginners, cores vs clock speed, why is my computer slow",
tier="basecamp", cat="hardware", tags=["Hardware", "Fundamentals"], minutes=6,
body="""
    <p>Every explanation of computers starts the same way: "the CPU is the brain." It's a comforting analogy and it's mostly wrong. Brains think, imagine, and get distracted. A CPU does exactly one thing: it fetches an instruction, executes it, and fetches the next one — billions of times per second, without ever understanding any of it.</p>

    <p>A better picture: the CPU is a clerk at a desk, working through an enormous inbox of tiny slips of paper. Each slip says something laughably simple: <em>add these two numbers. Copy this value over there. If this number is zero, jump to slip 4,082.</em> The magic isn't in any single slip — it's that the clerk processes a few billion slips a second, and out of that avalanche of trivial steps, a spreadsheet opens or a video plays.</p>

    <h2>Cores: more clerks, not smarter clerks</h2>
    <p>When you see "8-core CPU," that means eight clerks sharing the desk. More cores help when work can be split into independent piles — rendering video, running several apps at once. They help less when a task is one long chain of steps where each depends on the last; a second clerk can't help you read a book faster.</p>

    <h2>Clock speed: how fast each clerk works</h2>
    <p>Gigahertz measures how many work cycles a core completes per second. 3.5&nbsp;GHz means roughly 3.5 billion cycles. But comparing chips on clock speed alone is like comparing two employees only by typing speed — a modern core does far more useful work per cycle than one from a decade ago. That's why a new 3&nbsp;GHz chip can flatten an old 4&nbsp;GHz one.</p>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">When a computer feels slow, the CPU is the culprit far less often than people assume. Open the task manager and look: nine times out of ten the bottleneck is memory pressure, a struggling disk, or one misbehaving process — not a "weak" processor.</p>
    </div>

    <h2>Why this matters in real support work</h2>
    <p>Understanding the clerk model changes how you diagnose problems. 100% CPU usage doesn't mean the machine is broken — it means the inbox is full. The useful question is <em>what's filling it</em>: a legitimate heavy task, a runaway process stuck in a loop, or malware quietly mining in the background. Task Manager on Windows (or <code>top</code> on Linux/Mac) tells you exactly which process is generating the paperwork.</p>

    <p>And when someone asks whether they need a "faster computer," you now know the real questions: is the work parallel (more cores help) or sequential (faster cores help)? Or is the CPU sitting half-idle while an old hard drive drip-feeds it data — in which case a new processor fixes nothing at all?</p>
"""),

dict(
slug="ram-vs-storage-two-kinds-of-memory",
title="RAM vs Storage: Why Your Computer Has Two Kinds of Memory",
dek="The desk-and-filing-cabinet model that ends the 'I have 512GB of RAM' confusion forever.",
desc="RAM vs storage explained simply: why computers have two kinds of memory, what each does, and how to tell which one you're short of.",
keywords="RAM vs storage difference, what is RAM for beginners, memory vs hard drive, how much RAM do I need",
tier="basecamp", cat="hardware", tags=["Hardware", "Fundamentals"], minutes=6,
body="""
    <p>Ask a room of non-technical people how much memory their laptop has and half will say something like "512 gigabytes" — quoting their storage. It's the single most common hardware mix-up, and it persists because both things are technically "memory." The difference is what they're <em>for</em>.</p>

    <h2>The desk and the filing cabinet</h2>
    <p>Storage — your SSD or hard drive — is the filing cabinet. It holds everything you own: every document, photo, and application, and it keeps them when the power goes off. It's big, but getting a file out of it is a comparatively slow trip across the room.</p>

    <p>RAM is the desk. When you open a document, the computer pulls a copy from the cabinet and spreads it out on the desk, because you can only actually <em>work</em> on things that are on the desk. RAM is blisteringly fast, much smaller, and — this is the crucial part — it's wiped clean every time the power goes off. Nothing lives permanently in RAM. It's workspace, not shelf space.</p>

    <h2>What "running out" looks like for each</h2>
    <ul>
      <li><strong>Out of storage:</strong> you can't save new files, updates fail, and the machine may complain openly. Annoying, but obvious.</li>
      <li><strong>Out of RAM:</strong> sneakier. The desk is full, so the computer starts using a corner of the slow filing cabinet as fake desk space (called <em>paging</em> or <em>swap</em>). Everything still works — just miserably. Windows take seconds to switch, the fan spins up, and the whole machine feels like it's wading through mud.</li>
    </ul>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">That "slow after lunch" laptop with forty browser tabs open? Classic RAM exhaustion. Each tab is another stack of paper on the desk. Closing tabs genuinely fixes it — it isn't an IT superstition.</p>
    </div>

    <h2>The question to ask before recommending upgrades</h2>
    <p>Because the two shortages feel different, the fix is different. A machine that's slow when many apps are open needs more RAM. A machine that's slow to boot and open programs — but fine once they're running — usually needs its old spinning hard drive replaced with an SSD. Upgrading the wrong one spends money and changes nothing, which is why this distinction is one of the first genuinely useful diagnostic skills in IT support.</p>

    <p>Quick check on Windows: Task Manager → Performance tab. If "Memory" sits above ~85% during normal use, the desk is too small. If the disk sits at 100% while memory is comfortable, the cabinet is the bottleneck.</p>
"""),

dict(
slug="ssd-vs-hdd-explained",
title="SSDs vs Hard Drives: The Record Player and the Notebook",
dek="One has a spinning disk and a moving arm; the other has no moving parts at all. That single difference explains almost everything.",
desc="SSD vs HDD explained for beginners: how each actually stores data, why SSDs are faster, and when a hard drive still makes sense.",
keywords="SSD vs HDD difference, how does an SSD work, hard drive vs solid state, should I upgrade to SSD",
tier="basecamp", cat="hardware", tags=["Hardware"], minutes=6,
body="""
    <p>A traditional hard drive (HDD) is, mechanically speaking, a tiny record player. Inside the case, metal platters spin at 5,400 or 7,200 revolutions per minute while a read/write arm physically swings across them to find data — like dropping a needle onto the exact groove of a song. It's a genuine marvel of precision engineering. It is also, unavoidably, <em>mechanical</em>, and mechanical means slow and fragile.</p>

    <p>A solid-state drive (SSD) throws out the entire record player. Data is stored as electrical charges in flash memory chips — the same family of technology as a USB stick, but faster and more durable. No spinning, no arm, no waiting for the right part of the disk to rotate into position. Asking an SSD for data is less like finding a song on vinyl and more like glancing at an open notebook.</p>

    <h2>Why the difference is so dramatic</h2>
    <ul>
      <li><strong>Random access:</strong> booting an OS or opening an app means grabbing thousands of small files scattered everywhere. An HDD's arm must physically travel for each one; an SSD grabs them all essentially instantly. This is why swapping an HDD for an SSD makes an old laptop feel reborn — often more than any other single upgrade.</li>
      <li><strong>Durability:</strong> drop a running laptop with an HDD and the arm can strike the platter — data gone. An SSD has nothing to crash into itself.</li>
      <li><strong>Silence and power:</strong> nothing spins, so nothing hums, and batteries last longer.</li>
    </ul>

    <h2>So why do hard drives still exist?</h2>
    <p>Price per terabyte. Big HDDs remain far cheaper for bulk storage, which is why they still fill backup servers, CCTV recorders, and archives — places where capacity matters more than speed. The pattern you'll see everywhere in IT: SSD for the operating system and working files, HDD (or cloud storage) for the archive.</p>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">One behavioural difference matters for support work: HDDs usually fail <em>noisily and gradually</em> — clicking, grinding, slowing down — giving you warning to rescue data. SSDs more often fail <em>suddenly and silently</em>. The lesson is the same for both, though: backups, not luck.</p>
    </div>

    <p>If you remember one thing: moving parts are the enemy of speed and reliability. Almost every major leap in storage — and in computing generally — has come from removing something that physically moves.</p>
"""),

dict(
slug="motherboard-explained",
title="The Motherboard: The City Your Components Live In",
dek="CPU, RAM, storage, and graphics are the famous residents. The motherboard is the roads, plumbing, and postal service connecting them.",
desc="What a motherboard actually does, explained simply: sockets, slots, chipsets, and why compatibility matters more than the board itself.",
keywords="what does a motherboard do, motherboard explained beginners, motherboard compatibility, chipset explained",
tier="basecamp", cat="hardware", tags=["Hardware"], minutes=6,
body="""
    <p>The motherboard gets described as "the main circuit board," which is true and tells you nothing. Here's the more useful frame: if the CPU, RAM, and storage are the important residents of a city, the motherboard is the city itself — the road network, the power grid, the zoning rules about what can be built where.</p>

    <h2>A quick tour of the districts</h2>
    <ul>
      <li><strong>The CPU socket</strong> — a precisely shaped plot of land that fits exactly one family of processors. An Intel chip won't sit in an AMD socket, and even within one brand, generations change sockets. This is compatibility rule number one.</li>
      <li><strong>RAM slots</strong> — long thin slots near the CPU, keyed so memory sticks only fit one way, and only the right generation (DDR4 sticks won't fit DDR5 slots — the notch is deliberately in a different place).</li>
      <li><strong>Storage connections</strong> — SATA ports for traditional drives, and small M.2 slots where modern SSDs lie flat against the board like a stick of gum.</li>
      <li><strong>PCIe slots</strong> — the big expansion slots, most famously for graphics cards, but also for network cards and other add-ons.</li>
      <li><strong>The chipset</strong> — a traffic-control chip that manages communication between everything that isn't wired directly to the CPU. Board model names (B650, Z790…) mostly describe which chipset is running the traffic lights.</li>
    </ul>

    <h2>The lesson hiding in all of this: compatibility is physical</h2>
    <p>New starters often treat PC components like groceries — pick good ones, put them in a basket. The motherboard is why that fails. It decides which CPU generation fits, which RAM type works, how many drives connect, and even what size case the whole build needs. Experienced builders pick the CPU and motherboard as a <em>pair</em>, then everything else around them.</p>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">In support work, "motherboard failure" is the diagnosis of last resort — partly because it's hard to prove (you diagnose it by ruling everything else out) and partly because on laptops the board, with soldered CPU and often soldered RAM, effectively <em>is</em> the computer. That's why the repair quote for a dead laptop board so often approaches the price of a new machine.</p>
    </div>

    <p>You rarely think about roads until one closes. Same with motherboards: invisible while working, and the explanation for a surprising number of "impossible" faults — random reboots, ports that die one by one, machines that won't power on with no other cause — when they're not.</p>
"""),

dict(
slug="what-is-a-gpu-really-for",
title="GPUs: Why Graphics Cards Now Run More Than Graphics",
dek="One professor doing calculus versus a thousand students doing arithmetic — and why that second model ended up running AI.",
desc="What a GPU actually is and why graphics cards are used for AI and machine learning, explained with a simple beginner-friendly analogy.",
keywords="what is a GPU, GPU vs CPU difference, why are GPUs used for AI, graphics card explained beginners",
tier="trailhead", cat="hardware", tags=["Hardware"], minutes=7,
body="""
    <p>A CPU, as covered earlier on this trail, is a handful of extremely fast, extremely clever workers. A GPU is the opposite bet: thousands of workers, each individually slow and simple, all working at once. Neither design is "better" — they're built for different shapes of problem, and understanding which shape is which explains the last decade of computing.</p>

    <h2>Why graphics needed a different kind of worker</h2>
    <p>Think about what drawing a screen involves. A modern display has millions of pixels, and for a game running at 60 frames per second, every one of them needs its colour recalculated 60 times a second. Here's the key property: <strong>each pixel's calculation is independent</strong>. Pixel three million doesn't need to wait for pixel one. The work is embarrassingly parallel — a phrase engineers genuinely use.</p>

    <p>Handing that to a CPU is like asking four brilliant professors to fill in a million-cell spreadsheet by hand. They're overqualified and outnumbered. A GPU is a lecture hall of a thousand students each doing simple arithmetic simultaneously — vastly more effective for this specific shape of task.</p>

    <h2>The accidental revolution</h2>
    <p>Around the mid-2000s, researchers noticed something: lots of important problems have that same shape. Simulating weather, modelling proteins, and — most consequentially — training neural networks are all built on enormous grids of numbers being multiplied together, where each small calculation is independent. The hardware built to draw video game explosions turned out to be almost perfectly shaped for machine learning. That accident is a large part of why AI progress accelerated when it did, and why a graphics-card company became one of the most valuable businesses on Earth.</p>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">Rule of thumb for which chip suits which job: if the task is one long chain of decisions where each step depends on the last, that's CPU territory. If it's the same simple operation stamped across millions of independent data points, that's GPU territory.</p>
    </div>

    <h2>Where you'll meet GPUs in real IT work</h2>
    <p>Even outside gaming and AI teams, GPUs show up in ordinary infrastructure: CAD and design workstations, video editing rigs, virtual desktop infrastructure (where one server's GPU is sliced up between many users), and increasingly in cloud bills — GPU-enabled virtual machines cost several times their ordinary siblings, so knowing when a workload actually needs one is a genuinely valuable skill. Plenty of money gets wasted renting lecture halls for jobs that needed one professor.</p>
"""),

dict(
slug="power-supplies-the-ignored-component",
title="Power Supplies: The Most Ignored Part That Causes the Weirdest Faults",
dek="Nobody brags about their PSU. But when one goes marginal, it produces the most confusing symptoms in all of hardware.",
desc="Why power supplies matter, what wattage and efficiency ratings mean, and how a failing PSU causes random crashes and reboots.",
keywords="power supply explained, PSU wattage how much, random reboots cause, failing power supply symptoms",
tier="trailhead", cat="hardware", tags=["Hardware", "Troubleshooting"], minutes=6,
body="""
    <p>Ask an enthusiast about their PC and they'll tell you the CPU, the graphics card, maybe the RAM speed. Nobody leads with the power supply. Yet the PSU is the component every other component depends on, and — this is the part that matters for anyone doing support — a <em>marginal</em> one produces the strangest, most misleading faults in all of hardware.</p>

    <h2>What it actually does</h2>
    <p>Wall power is high-voltage alternating current. Computer components want low-voltage direct current, delivered with obsessive steadiness. The PSU converts one into the other and holds those output voltages stable no matter what the machine is doing — idle at the desktop one second, every component demanding maximum power the next. That word <em>stable</em> is doing all the work. Components don't just need enough power; they need it clean and constant.</p>

    <h2>Why a dying PSU is a master of disguise</h2>
    <p>A fully dead power supply is the easy case: nothing turns on, diagnosis done. A <em>failing</em> one is the nightmare, because it still works — mostly. Voltages sag for milliseconds under load. And the symptoms look like anything except a power problem:</p>
    <ul>
      <li>Random reboots with no error message — but only during games or heavy work</li>
      <li>Crashes that look exactly like RAM faults or driver bugs</li>
      <li>A machine that runs fine for weeks, then blue-screens twice in a day</li>
      <li>Faults that vanish when an engineer tests the machine (idle load = voltages fine)</li>
    </ul>
    <p>This is why experienced technicians keep a known-good spare PSU on the shelf: for intermittent hardware gremlins, swapping it in is often faster than any amount of software diagnosis.</p>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">Diagnostic heuristic worth memorising: <strong>crashes that correlate with load</strong> — starting a game, exporting video, all cores spinning up — point toward power or heat. Crashes that strike at random, including at idle, point more toward memory or software.</p>
    </div>

    <h2>Decoding the label</h2>
    <p>Two things on a PSU spec sheet matter for most purposes. <strong>Wattage</strong> is total capacity — the building's electrical service. It should comfortably exceed the system's peak draw, with headroom, because running any supply flat-out at its limit shortens its life and its stability. <strong>The 80&nbsp;Plus rating</strong> (Bronze, Gold, Platinum…) measures efficiency — how little power is wasted as heat during conversion. Higher tiers loosely correlate with build quality, which is why "don't cheap out on the PSU" is one of the few hardware proverbs that has stayed true for twenty years.</p>
"""),

dict(
slug="beginners-method-diagnosing-hardware",
title="A Beginner's Method for Diagnosing Hardware Faults",
dek="You don't need encyclopaedic knowledge to troubleshoot hardware. You need a repeatable method and the discipline to change one thing at a time.",
desc="A structured beginner method for diagnosing computer hardware problems: isolate, swap, and test one variable at a time.",
keywords="how to diagnose hardware problems, PC troubleshooting method, computer won't turn on checklist, hardware fault isolation",
tier="trailhead", cat="hardware", tags=["Hardware", "Troubleshooting"], minutes=7,
body="""
    <p>Watch an experienced technician work on a dead machine and it looks like intuition. It mostly isn't. It's a method — one so consistent you can learn its skeleton in an afternoon, then spend a career filling in the details. The method has three rules.</p>

    <h2>Rule 1: Establish what actually happens</h2>
    <p>"It's dead" describes at least four different faults. Before touching anything, observe precisely: Do fans spin? Any lights? Any beeps? Does anything appear on screen, even briefly? Each answer eliminates whole categories. Fans spinning but no display is a completely different investigation from total silence — the first suggests graphics, RAM, or display; the second points at power delivery. Vague symptom, vague diagnosis. Precise symptom, short list.</p>

    <h2>Rule 2: Simplify to the minimum, then rebuild</h2>
    <p>A computer that won't start with six components attached might start with three. Strip to the minimum bootable configuration — motherboard, CPU, one stick of RAM, power — and test. If it lives, add components back <strong>one at a time</strong>, testing after each, until the fault returns. Whatever you just added is your suspect. If even the minimum won't start, your suspect list is already down to three or four items.</p>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">The discipline that separates good troubleshooters from frustrated ones: <strong>change one variable at a time</strong>. Swap the RAM <em>and</em> reseat the graphics card <em>and</em> update the BIOS, and when the machine boots you've learned nothing — you can't tell which change fixed it, so you can't prevent it recurring or explain it in the ticket.</p>
    </div>

    <h2>Rule 3: Swap with known-good, not with guesses</h2>
    <p>The fastest way to convict a component is to replace it with one you <em>know</em> works — and the fastest way to clear it is to try it in a machine you know works. This is why workshops keep a shelf of boring, verified spares: a PSU, a RAM stick, a display cable, a spare drive. Two swap-tests often close an investigation that hours of speculation couldn't.</p>

    <h2>The cheat sheet of prior probabilities</h2>
    <p>Method beats memorisation, but knowing what usually fails helps you order your tests. Roughly, from most to least likely: <strong>cables and connections</strong> (reseat everything first — it's free), <strong>storage drives</strong> (the moving-parts and wear-out champions), <strong>power supplies</strong>, <strong>RAM</strong>, fans and cooling, and only then, rarely, CPUs and motherboards. Statistically, "it's probably the cable" is the most useful sentence in hardware support — check the free things first.</p>

    <p>None of this requires deep electronics knowledge. It requires observation, one-variable discipline, and a small shelf of known-good parts. The encyclopaedia comes later, on its own, one solved ticket at a time.</p>
"""),

dict(
slug="bios-uefi-firmware-explained",
title="BIOS, UEFI, and Firmware: The Software That Runs Before Software",
dek="Something has to wake the hardware up and find the operating system. Meet the code that runs before anything you'd recognise as a computer.",
desc="BIOS, UEFI and firmware explained for beginners: what runs before the operating system, what Secure Boot does, and when to update firmware.",
keywords="what is BIOS UEFI difference, firmware explained, secure boot explained, should I update BIOS",
tier="trailhead", cat="hardware", tags=["Hardware", "Fundamentals"], minutes=6,
body="""
    <p>Here's a puzzle beginners rarely stop to notice: the operating system lives on the storage drive… but something has to know how to <em>read the storage drive</em> before any operating system is running. What reads the thing that everything else loads from? The answer is firmware — permanent software burned into a chip on the motherboard, awake the instant power arrives.</p>

    <h2>The night-watchman routine</h2>
    <p>Press the power button and the firmware runs the same checklist every time: check the CPU responds, count the RAM, take inventory of connected drives and devices (old-timers call this POST — the power-on self test), then find a drive containing an operating system, hand control over, and step back. The whole handover takes a few seconds. Those beeps an old PC makes when RAM is missing? That's the firmware reporting a failed checklist in the only language available before graphics exist.</p>

    <h2>BIOS vs UEFI: same job, forty years apart</h2>
    <p><strong>BIOS</strong> is the 1980s original — keyboard-only blue screens, tight limits (it can't even boot from drives over 2TB). <strong>UEFI</strong> is its modern replacement: mouse support, faster startup, big-drive support, and networking before the OS even loads. Everything made in the last decade uses UEFI, though everyone still says "the BIOS" the way people still say "hang up" about phones. In practice the terms get used interchangeably; in exams and documentation, the distinction matters.</p>

    <h2>Secure Boot — the firmware as doorman</h2>
    <p>UEFI's most consequential feature: before handing over control, it checks the operating system's <em>digital signature</em> — proof the OS hasn't been tampered with. This blocks a particularly nasty malware family (bootkits) that infect the startup process itself to load before any antivirus can. When Windows 11 demanded Secure Boot and TPM support as installation requirements, this firmware layer suddenly became every IT department's problem.</p>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">Firmware updates follow a different rule from normal updates. A failed app update is an inconvenience; a failed firmware update — power cut mid-flash — can permanently kill a motherboard. The professional convention: update firmware to fix a specific problem or patch a security advisory, not just because a newer version exists. When you do, use mains power, never battery.</p>
    </div>

    <p>You'll meet firmware constantly in real work: changing boot order to reinstall an OS, enabling virtualisation for developers, troubleshooting Secure Boot conflicts, and pushing coordinated firmware updates across a fleet. It's a small layer — but it's the foundation every other layer stands on.</p>
"""),

dict(
slug="supporting-laptops-vs-desktops",
title="Why Supporting Laptops Is a Different Job From Supporting Desktops",
dek="Same operating system, same apps — completely different failure modes. Batteries, hinges, heat, and the economics of soldered everything.",
desc="Laptop vs desktop support differences: batteries, thermal throttling, docking stations, and why laptop repairs are economically different.",
keywords="laptop support vs desktop, laptop battery degradation, thermal throttling explained, docking station problems",
tier="trailhead", cat="hardware", tags=["Hardware", "Support"], minutes=7,
body="""
    <p>On paper, a laptop is a desktop that folds. In a support queue, they're barely the same species. Most corporate device estates are overwhelmingly laptops now, so the differences below aren't trivia — they're the texture of daily support work.</p>

    <h2>1. Batteries: the only component guaranteed to fail</h2>
    <p>Every laptop battery is dying from the day it's made; chemistry allows no exceptions. A few hundred charge cycles in, capacity fades noticeably — and a worn battery doesn't just shorten runtime. It can cause sudden shutdowns at "30%" remaining and, in swollen form, physically push the trackpad or keyboard out of the chassis. A bulging trackpad is a battery emergency, not a trackpad fault: swollen lithium cells are a genuine safety issue. Stop using the machine and have the battery replaced.</p>

    <h2>2. Heat has nowhere to go</h2>
    <p>Desktops have room-sized airflow by comparison. Laptops cram the same class of components against a keyboard, so they survive by <strong>thermal throttling</strong> — deliberately slowing the CPU when temperatures climb. This produces one of the most common and most misdiagnosed complaints in support: "my laptop gets slow after twenty minutes." That's not software rot; that's physics. Dust-clogged fans, dried thermal paste, or literally using it on a duvet (blocking the vents) all make it worse. The fix is often a can of air, not a reimage.</p>

    <h2>3. Moving parts, moving machine</h2>
    <p>Desktops sit still for years. Laptops get dropped, sat on, rained on, and flexed open ten times a day. Hinges crack, cables that route through hinges fray (the classic "screen flickers at certain angles" fault), and ports wear loose from thousands of insertions. Physical damage is a routine ticket category that barely exists for desktops — and it's why device policies care so much about cases and careful handling.</p>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">Then there's the docking station: the accessory responsible for a stunning share of "my laptop is broken" tickets that are actually "my dock/cable/firmware is broken." Monitors not detected, Ethernet dead, USB devices vanishing — before touching the laptop, test it <em>without</em> the dock. Thirty seconds, and it cuts the search space in half.</p>
    </div>

    <h2>4. The economics of soldered everything</h2>
    <p>In most desktops you can swap RAM, storage, PSU, even the CPU. In modern thin laptops, RAM is usually soldered to the board and sometimes storage too — so there's often no meaningful upgrade path, and a board failure means replacing a part that costs most of a new machine. This single fact drives fleet strategy: it's why organisations buy laptops with the RAM they'll need in year four, not year one, and why "repair vs replace" maths tips toward replace far sooner than desktop-era instincts suggest.</p>
"""),

dict(
slug="field-guide-to-ports-usb-hdmi-thunderbolt",
title="USB, HDMI, DisplayPort, Thunderbolt: A Field Guide to Ports",
dek="The shape of the plug no longer tells you what the port can do — and that one fact explains half of all docking-station tickets.",
desc="USB-C, HDMI, DisplayPort and Thunderbolt explained simply: why identical-looking ports behave differently and how to read the symbols.",
keywords="USB-C vs Thunderbolt difference, HDMI vs DisplayPort, USB port symbols meaning, why won't my monitor work USB-C",
tier="basecamp", cat="hardware", tags=["Hardware", "Support"], minutes=6,
body="""
    <p>There was a brief, beautiful era when ports were honest: the shape told you the function. Round plug, keyboard. Blue trapezoid, monitor. That era is over. Today the same oval USB-C socket might charge a laptop, drive two 4K monitors, and move data at 40 gigabits — or do almost none of those things — and <em>nothing about its shape tells you which</em>. This single fact generates a remarkable share of modern support tickets.</p>

    <h2>USB: one name, many speeds</h2>
    <p>USB is a family, not a thing. The rectangular USB-A plug and the oval USB-C plug are just <em>connectors</em>; the speed and abilities depend on the generation behind the port (USB 2.0's ~480 megabits up through modern versions at 10–40 gigabits). Practical translation: a USB-C port on a budget laptop and a USB-C port on a workstation can differ in capability by a factor of eighty while looking identical.</p>

    <h2>Thunderbolt: USB-C's overachieving sibling</h2>
    <p><strong>Thunderbolt</strong> uses the same USB-C connector but guarantees the premium everything: 40Gbps data, multiple displays, laptop charging, even external graphics — look for the lightning-bolt symbol beside the port. This is the port that makes single-cable docking stations actually work. And it's the answer to the classic mystery, "the dock works on my colleague's laptop but not mine": one machine has Thunderbolt, the other has an ordinary USB-C port that can't carry the same display traffic. Same plug, different port, hence the confusion.</p>

    <h2>The display ports</h2>
    <p><strong>HDMI</strong> rules TVs and meeting rooms; it carries video plus audio and everyone has the cable. <strong>DisplayPort</strong> is its office-focused cousin — generally better for high refresh rates and for daisy-chaining multiple monitors, which is why business monitors and docks prefer it. Both also travel <em>inside</em> USB-C via something called Alt Mode, which is how a bare USB-C-to-HDMI cable can work with no adapter electronics at all… on ports that support it. (There's the honesty problem again.)</p>

    <div class="callout">
      <span class="eyebrow">Trail note</span>
      <p style="margin:0;">Practical triage for "my second monitor doesn't work": check the port's symbols first (lightning bolt = Thunderbolt, a D-in-a-circle = DisplayPort support), then check the spec sheet for the exact laptop model, <em>then</em> suspect the cable — cheap USB-C cables often carry power but not display signals. The plug fitting proves almost nothing anymore.</p>
    </div>

    <p>The general skill here isn't memorising standards tables. It's internalising the one modern rule: <strong>capability lives in the port and the cable, not the connector shape</strong> — and knowing to check both before declaring hardware faulty.</p>
"""),
]
