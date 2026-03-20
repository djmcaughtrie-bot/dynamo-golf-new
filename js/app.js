/* ─────────────────────────────────────────────────────────────
   SHOT DATA — 14 shots across 4 categories
───────────────────────────────────────────────────────────── */
const SHOTS = [
  /* ── SHAPE ── */
  {
    id: 'fade', name: 'Fade', cat: 'shape', diff: 2,
    summary: 'Controlled left-to-right ball flight',
    setup: {
      ballPosition: 'Half ball forward of centre',
      stance: 'Slightly open — feet aligned left of target',
      weight: '50/50 at address, favouring lead side through impact',
      grip: 'Weakened — both hands rotated anti-clockwise'
    },
    clubface: 'Aimed at target (open relative to the swing path)',
    swingPath: 'Out-to-in relative to the target line',
    swingThought: 'Swing left, hold the face open',
    tempo: 'Smooth and controlled — resist the urge to steer',
    range: [
      'Exaggerate the open stance to feel the out-to-in path',
      'Focus on holding the face open through impact — resist closing it',
      'Use alignment sticks: feet aimed left, face aimed at the target'
    ],
    course: [
      'Go-to shot when the pin is tucked right or OB sits left',
      'Club up one to compensate for reduced distance',
      'Pre-set the face angle before taking your grip — not after'
    ],
    watchOut: 'Opening the face too much turns a controlled fade into a slice'
  },
  {
    id: 'draw', name: 'Draw', cat: 'shape', diff: 2,
    summary: 'Controlled right-to-left ball flight with extra roll',
    setup: {
      ballPosition: 'Half ball back of standard',
      stance: 'Slightly closed — feet aligned right of target',
      weight: 'Even at address, full release to the lead side',
      grip: 'Strengthened — both hands rotated clockwise'
    },
    clubface: 'Aimed at target (closed relative to the swing path)',
    swingPath: 'In-to-out, attacking from inside the target line',
    swingThought: 'Attack from the inside, release through',
    tempo: 'Aggressive through the ball — a passive swing produces a block',
    range: [
      'Place a headcover just outside the ball to groove the in-to-out path',
      'Feel the right forearm crossing over the left through impact',
      'Exaggerate the strong grip until the draw shape becomes reliable'
    ],
    course: [
      'Used when the pin is tucked left or the hole bends left',
      'Account for extra roll-out on landing — the ball will run further',
      'Aim right of the flag and trust the curve'
    ],
    watchOut: 'Over-rotating the hands through impact produces a snap hook'
  },
  {
    id: 'hook', name: 'Hook', cat: 'shape', diff: 3,
    summary: 'Aggressive sharp curve — for dogleg escapes and tree avoidance',
    setup: {
      ballPosition: 'Back of centre',
      stance: 'Significantly closed',
      weight: 'Loaded trail side going back, full aggressive release through',
      grip: 'Very strong — both hands well clockwise'
    },
    clubface: 'Aggressively closed to path through impact',
    swingPath: 'Aggressive in-to-out with full hip rotation and early release',
    swingThought: 'Commit fully — half a hook goes dead left',
    tempo: 'Aggressive and fully committed — hesitation kills this shot',
    range: [
      'Only attempt after the draw is reliable — the hook is an extension of it',
      'Practise around real obstacles so the shot has purpose and context',
      'Focus on the early release — let the right hand fire under the left'
    ],
    course: [
      'Used deliberately to curve around trees or a sharp dogleg left',
      'Aim well right — the ball will move significantly more than a draw',
      'Never attempt under pressure without prior dedicated practice'
    ],
    watchOut: 'Half-committed hooks go dead straight left — full commitment or play a draw instead'
  },
  {
    id: 'slice', name: 'Intentional Slice', cat: 'shape', diff: 3,
    summary: 'Severe left-to-right curve — navigate obstacles blocking the direct line',
    setup: {
      ballPosition: 'Centre to slightly forward',
      stance: 'Dramatically open — feet aimed well left of target',
      weight: 'Stays on lead side throughout',
      grip: 'Very weak — hands significantly rotated anti-clockwise'
    },
    clubface: 'Open to path, slicing steeply across the ball from outside-in',
    swingPath: 'Steep out-to-in cut across the ball, swinging along the foot line',
    swingThought: 'Aim far left, swing along the feet, hold the face open',
    tempo: 'Steep and controlled — swing along the feet, not at the target',
    range: [
      'The positions feel far more extreme than they look — trust the exaggeration',
      'Drop a club well left of the feet to confirm the path is truly out-to-in',
      'Expect significant distance loss — this is an escape shot'
    ],
    course: [
      'Used when an obstacle sits directly in the line to the target',
      'Club up at least two to compensate for the severe distance loss',
      'Trust the curve — it will move further than expected'
    ],
    watchOut: 'Half measures produce a weak fade — the positions must be more extreme than feels right'
  },

  /* ── CONTROL ── */
  {
    id: 'punch', name: 'Punch', cat: 'control', diff: 2,
    summary: 'Low boring flight — under wind or beneath tree branches',
    setup: {
      ballPosition: 'Two balls back of centre',
      stance: 'Narrower than normal, square',
      weight: 'Favouring lead side throughout',
      grip: 'Choke down one inch — firmer than normal'
    },
    clubface: 'De-lofted at address — hands pressed forward at setup',
    swingPath: 'Three-quarter backswing, firm lead wrist through impact, finish low',
    swingThought: 'Hands lead, club follows — quiet finish',
    tempo: 'Controlled — compress the ball, do not add speed',
    range: [
      'Practise the low finish first — club wrapping over the shoulder means the hands have flipped',
      'Focus on the pressed hands at address before every rep',
      'Alternate between normal shots and punches to feel the contrast'
    ],
    course: [
      'Club up one to two clubs to compensate for reduced loft',
      'Pick a specific low window or gap to aim at — visualise the flight',
      'Check wind direction — a crosswind may require a different shape'
    ],
    watchOut: 'A half-hearted punch comes out fat — full commitment through the ball is essential'
  },
  {
    id: 'knockdown', name: 'Knockdown', cat: 'control', diff: 2,
    summary: 'Controlled longer iron flight — the wind-cheater',
    setup: {
      ballPosition: 'One ball back of centre',
      stance: 'Slightly narrower, square',
      weight: '55% lead at address',
      grip: 'Normal pressure — slightly firmer in lead hand'
    },
    clubface: 'Slightly de-lofted — hands one inch ahead of standard',
    swingPath: 'Full backswing, three-quarter follow-through — hands stop below shoulder height',
    swingThought: 'Full turn back, quiet finish through',
    tempo: 'Smooth and even — never try to hit harder into the wind',
    range: [
      'Use a 7-iron to practise the quiet finish before moving to longer clubs',
      'Check the finish: hands should stop at or below shoulder height',
      'Pair with a fade shape for maximum control in a left-to-right wind'
    ],
    course: [
      'The most reliable shot in a strong headwind — trust the lower flight',
      'Club up two to three clubs — the ball still needs to reach the target',
      'Aim straight — reduced loft minimises spin-induced curve'
    ],
    watchOut: 'Adding swing speed causes the ball to balloon higher — slower and smoother is better'
  },
  {
    id: 'stinger', name: 'Stinger', cat: 'control', diff: 3,
    summary: 'Penetrating low tee shot — position over distance',
    setup: {
      ballPosition: 'Two inches further back than standard driver position',
      stance: 'Normal width, square',
      weight: 'Centred and stable through impact',
      grip: 'Normal — ball teed slightly lower than usual'
    },
    clubface: 'Square to slightly closed — compressed steeply through the ball',
    swingPath: 'Full turn, steep compression, hold the follow-through low',
    swingThought: 'Full turn, hold the finish low — point the club at the target',
    tempo: 'Powerful but controlled — the held finish is the key, not added speed',
    range: [
      'Practise extensively before attempting on the course — this is an advanced shot',
      'Focus on the held finish: club points at the target, not over the left shoulder',
      'Tee the ball progressively lower to find the right height for your swing'
    ],
    course: [
      'Used when position matters more than distance — tight fairways, strong wind',
      'Never debut under pressure — prior practice is non-negotiable',
      'Accept shorter distance in exchange for predictable low flight'
    ],
    watchOut: 'Debuting this shot under pressure is a recipe for disaster — extensive prior practice required'
  },

  /* ── SHORT GAME ── */
  {
    id: 'chip-run', name: 'Chip & Run', cat: 'shortgame', diff: 1,
    summary: 'Foundational around-the-green shot — no wrist hinge',
    setup: {
      ballPosition: 'Back of stance, inside trail foot',
      stance: 'Narrow, lead foot flared open',
      weight: '70–80% on lead side — stays there throughout',
      grip: 'Normal pressure — grip end points at lead hip at finish'
    },
    clubface: 'Square — never open on a chip and run',
    swingPath: 'Pure shoulder rotation — zero wrist hinge',
    swingThought: 'Grip end to lead hip — feel the putting stroke',
    tempo: 'Smooth and unhurried — this is a putting stroke with an iron',
    range: [
      'Practise with 7-iron, 9-iron and pitching wedge to feel the different roll ratios',
      'Check the finish: grip end pointing at the lead hip confirms correct release',
      'Pick a specific landing spot 3 feet onto the green — not the hole'
    ],
    course: [
      'Default shot whenever there is green to work with and no obstacle to carry',
      'Select club based on landing-to-hole distance: more green = less-lofted club',
      'Land 3 feet onto the green — this is a chip, not a pitch'
    ],
    watchOut: 'Lead wrist breaking down (scooping) pops the ball up — keep it firm throughout'
  },
  {
    id: 'pitch', name: 'Pitch', cat: 'shortgame', diff: 2,
    summary: 'Mid-height shot for 20–80 yard approaches — hinge and hold',
    setup: {
      ballPosition: 'Centre to slightly forward',
      stance: 'Slightly open and narrower than full swing',
      weight: '55% lead at address, building to 70%+ through impact',
      grip: 'Normal pressure — wrist hinge is required'
    },
    clubface: 'Square to slightly open — let the loft do the work',
    swingPath: 'Wrist hinge going back, lead hand carries through — no flip at impact',
    swingThought: 'Hinge back, carry the tray through',
    tempo: 'Even — distance controlled by swing length, not speed',
    range: [
      'Practise three distances using the same swing speed — vary backswing length only',
      'Check for ball-first contact: you should see a small divot after the ball position',
      'Alternate chips and pitches to clearly feel the difference in wrist action'
    ],
    course: [
      'Used when green is not available to run the ball, or an obstacle must be carried',
      'Distance controlled by backswing length only — never add speed',
      'Identify a specific landing spot and fully commit to it'
    ],
    watchOut: 'Scooping at impact — if the ball flies high and short, the wrists have flipped'
  },
  {
    id: 'flop', name: 'Flop', cat: 'shortgame', diff: 3,
    summary: 'Maximum height from a tight lie — only when absolutely necessary',
    setup: {
      ballPosition: 'Forward in stance',
      stance: 'Wide and dramatically open — feet 25–30 degrees left of target',
      weight: 'Even at address, releasing freely through',
      grip: 'Open the face before gripping — never after'
    },
    clubface: 'Dramatically open — pointing at the sky at address',
    swingPath: 'Along the foot line with full release — face slides under the ball',
    swingThought: 'Commit to the full swing — deceleration kills this shot',
    tempo: 'Full and committed — the swing is larger than feels comfortable',
    range: [
      'Open the face before taking your grip — this is non-negotiable',
      'The swing feels enormous for the distance produced — trust it',
      'Practise from tight lies only — fluffy lies mask poor technique'
    ],
    course: [
      'Only when absolutely necessary: tight lie, no wind, lob wedge all present',
      'Release 1 or Release 2 is almost always the lower-risk alternative',
      'Commit fully — there is no such thing as a half-committed flop shot'
    ],
    watchOut: 'Any deceleration results in a skull, shank, or heavy contact — commit or choose a safer shot'
  },
  {
    id: 'bunker', name: 'Greenside Bunker', cat: 'shortgame', diff: 2,
    summary: 'The splash shot — ball rides out on displaced sand',
    setup: {
      ballPosition: 'Just forward of centre',
      stance: 'Wide and open, feet dug into the sand for stability',
      weight: '60% on lead side',
      grip: 'Open face before gripping — normal pressure'
    },
    clubface: 'Open before gripping — aims right of the target',
    swingPath: 'Along the foot line, entering the sand 2 inches behind the ball',
    swingThought: 'Hit the sand 2 inches behind the ball — finish high',
    tempo: 'Nearly full swing — most amateurs significantly under-commit',
    range: [
      'Draw a line in the sand 2 inches behind the ball to practise the entry point',
      'Finish with the club high — stopping in the sand means more swing is needed',
      'Vary the depth of sand taken to feel how it affects height and distance'
    ],
    course: [
      'Finish high — quitting through the shot leaves the club buried in the sand',
      'The ball is not struck directly — it rides out on displaced sand',
      'From deep bunkers, open the face more and swing steeper'
    ],
    watchOut: 'Quitting through the shot leaves the club buried — commit fully to the finish'
  },

  /* ── SPECIALTY LIES ── */
  {
    id: 'uphill', name: 'Uphill Lie', cat: 'specialty', diff: 2,
    summary: 'Ball on an upward slope — adds loft, pulls left',
    setup: {
      ballPosition: 'Toward the high side (forward)',
      stance: 'Normal width, spine tilted to match the slope',
      weight: 'Favouring trail foot for balance on the slope',
      grip: 'Normal — firmer to maintain control on uneven ground'
    },
    clubface: 'Square to target — the slope adds effective loft automatically',
    swingPath: 'Follow the slope upward on the follow-through — do not fight the hill',
    swingThought: 'Swing with the slope, aim right',
    tempo: 'Smooth — balance is the priority on uneven ground',
    range: [
      'Practise the spine tilt — it feels exaggerated but is necessary',
      'The slope adds effective loft — club down one or two before swinging',
      'Focus on balance through the swing rather than trying to add distance'
    ],
    course: [
      'Club down one to two clubs — the slope adds effective loft',
      'Aim right of target — the slope will pull the ball left',
      'Accept a shorter, more controlled swing for better contact and balance'
    ],
    watchOut: 'Failing to adjust aim — the slope will pull every shot left of the target'
  },
  {
    id: 'downhill', name: 'Downhill Lie', cat: 'specialty', diff: 2,
    summary: 'Ball on a downward slope — removes loft, pushes right',
    setup: {
      ballPosition: 'Back toward the low side',
      stance: 'Normal width, spine tilted into the downslope',
      weight: 'Slightly toward lead foot, following the slope',
      grip: 'Normal — firm to maintain control'
    },
    clubface: 'Square — the slope removes effective loft automatically',
    swingPath: 'Chase the ball down the slope on the follow-through — do not fall back',
    swingThought: 'Chase the ball downhill — stay on top of it',
    tempo: 'Controlled — resist the urge to fall back during the swing',
    range: [
      'Practise the spine tilt into the slope — it feels unnatural at first',
      'The slope removes loft — club up one or two before swinging',
      'Focus on the chase-down follow-through: club stays low after impact'
    ],
    course: [
      'Club up one to two clubs — the slope removes effective loft',
      'Aim left of target — the slope will push the ball right',
      'Take a shorter swing to maintain balance and contact quality'
    ],
    watchOut: 'Falling back into the hill through impact — the most common error on this lie'
  },
  {
    id: 'rough', name: 'Rough Escape', cat: 'specialty', diff: 2,
    summary: 'Getting out of thick rough and back into play',
    setup: {
      ballPosition: 'Centre to slightly back',
      stance: 'Normal width, square',
      weight: 'Slightly favouring lead side',
      grip: 'Firmer than normal — rough will try to close the face'
    },
    clubface: 'Slightly open at address — pre-compensates for closure by the rough',
    swingPath: 'Steeper than normal to avoid grass snagging the hosel on the downswing',
    swingThought: 'Commit through the rough — escape first',
    tempo: 'Aggressive — the rough absorbs a significant amount of energy',
    range: [
      'Use heavy rough at the range to feel how much the grass resists',
      'Practise the firmer grip pressure until it feels natural under your hands',
      'Focus on the steeper downswing — the club must cut through, not sweep'
    ],
    course: [
      'Priority is getting back into play — aim at the widest part of the fairway',
      'Distance drops 20–40% in heavy rough — club up significantly',
      'From very thick rough, take a sand wedge and accept a shorter escape'
    ],
    watchOut: 'Decelerating causes the club to get dragged and buried — commit aggressively through the rough'
  }
];

const CAT_LABELS = {
  shape:     'Shape',
  control:   'Control',
  shortgame: 'Short Game',
  specialty: 'Specialty'
};

/* ─────────────────────────────────────────────────────────────
   RELEASE DATA — Dan Grieve's 3 Releases
───────────────────────────────────────────────────────────── */
const RELEASES = [
  {
    id: 'r1', num: 1, name: 'Chip & Run', tagline: 'No wrist release', colour: 'claret',
    principle: 'The grip end of the club points at the lead hip in the follow-through. Hands lead the clubhead throughout. It feels like a long putting stroke — shoulders rock, arms follow, hands do nothing independently.',
    when: 'Any time there is green between the ball and the hole and no obstacle to carry. This is always the first option to consider and the lowest-risk shot available.',
    shots: [
      { name: 'Standard Chip & Run', desc: 'Narrow stance, weight on lead side throughout. No wrist hinge whatsoever. Grip butt points at the lead hip at the finish — this is the single checkpoint. Club selection drives roll ratio: a 7-iron rolls much further than a pitching wedge.' },
      { name: 'Long Chip (20–30m)', desc: 'Same motion extended — slightly wider stance, slightly longer arm swing, still zero wrist hinge. The error from long range is adding wrist hinge because the shot feels too big. The answer: make the shoulder motion longer, not add hands.' },
      { name: 'Tight Lie', desc: 'Ball position slightly further back, face stays square or very slightly de-lofted — never opened. Opening the face on a tight lie lets the bounce cause a thin. A lower-lofted club (8 or 9 iron) is more forgiving than a wedge from hardpan.' },
      { name: 'From Rough', desc: 'Firmer grip to resist face closure by the grass. Face slightly open at address to pre-compensate for the closure at impact. Slightly steeper approach. A ball sitting up in thin rough can come out as a flier — aim the landing spot accordingly.' }
    ]
  },
  {
    id: 'r2', num: 2, name: 'Pitch', tagline: 'Hinge and hold', colour: 'blue',
    principle: 'The wrists hinge going back, then the lead hand pulls through with the angle held — the hands do not flip or fully release. It feels like carrying a tray: wrists load going back, then the tray is carried through without tipping it.',
    when: 'When an obstacle needs to be carried, when the ball needs to land on a specific part of the green and stop relatively quickly, or for controlled approaches from 20 to 80 yards.',
    shots: [
      { name: 'Standard Pitch', desc: 'Ball centre to slightly forward, slightly open stance, weight 55% lead building to 70%+ through impact. Noticeable wrist hinge at the top. Lead hand pulls through with the angle maintained. Distance by swing length only — never speed.' },
      { name: 'High vs Low Pitch', desc: 'Same Release 2 motion, varied trajectory. High: ball forward, face slightly open — swing stays the same. Low: ball back, hands slightly forward. The hands do not create the height — ball position and face angle do, and the swing remains consistent.' },
      { name: 'Checking/Spinning Pitch', desc: 'Requires clean lie, clean grooves, steeper descending blow with ball-first contact. Face stays square — spin comes from crisp descending contact, not from opening the face. From rough, spin is essentially impossible: grass between face and ball kills the friction.' },
      { name: 'From Rough', desc: 'Face slightly open at address (rough closes it at impact), steeper downswing, firmer grip. A ball sitting up can produce a flier — less spin, more pace. Club down and aim short of the flag to account for the extra run.' }
    ]
  },
  {
    id: 'r3', num: 3, name: 'Lob & Bunker', tagline: 'Full release', colour: 'gold',
    principle: 'The clubface passes through under the ball. Hands release completely — the clubhead overtakes the hands. It feels like throwing a frisbee low under something — a full, uninhibited release of the face through the hitting zone.',
    when: 'Maximum height is needed over a close obstacle, the ball needs to land very softly, or you are in a greenside bunker. This is the highest-risk release — only use it when Release 1 or 2 genuinely cannot do the job.',
    shots: [
      { name: 'Lob Shot', desc: 'High, soft-landing shot using the natural 60° lof of a lob wedge. Unlike the flop, no dramatic face opening required — trust the loft. Soft hands allow the full release to happen naturally. Covers 20–60 yards. Any hesitation produces a thin or shank.' },
      { name: 'Flop Shot', desc: 'Most advanced, highest-risk shot in the section. Face opened dramatically before gripping. Wide, open stance — feet 30° left. Swing travels along the foot line, face slides under the ball. Much larger swing than feels comfortable. Only when tight lie, no wind, lob wedge. Decelerating produces a skull every time.' },
      { name: 'Greenside Bunker', desc: 'Face opened before gripping, wide open stance, feet dug into the sand for stability. Swing enters the sand 2 inches behind the ball — the ball rides out on displaced sand. Nearly full swing required. Most amateurs underestimate how much swing is needed. Finish high: quitting buries the club.' },
      { name: 'Plugged Lie (Fried Egg)', desc: 'The opposite of everything else in Release 3. Face closed or square — not open. Stance square or slightly closed. Steep V-shaped chop behind the ball with minimal follow-through. Ball comes out lower with more run — aim further from the hole. Using an open-face splash on a plugged ball makes it worse.' }
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   DECISION TREE
───────────────────────────────────────────────────────────── */
const DT_QUESTIONS = [
  {
    q: 'Is there a clear path to run the ball along the green — no obstacle to carry?',
    yes: { result: 'r1' },
    no: 1
  },
  {
    q: 'Do you need to carry an obstacle, and is a medium-height shot sufficient?',
    yes: { result: 'r2' },
    no: 2
  },
  {
    q: 'Are you in a greenside bunker?',
    yes: { result: 'r3', note: 'Standard splash or plugged-lie technique depending on the lie' },
    no:  { result: 'r3', note: 'Only when Release 1 and Release 2 genuinely cannot do the job' }
  }
];

const RELEASE_RESULT_LABELS = {
  r1: 'Release 1 — Chip & Run',
  r2: 'Release 2 — Pitch',
  r3: 'Release 3 — Lob & Bunker'
};

/* ─────────────────────────────────────────────────────────────
   RENDER: SHOT GRID
───────────────────────────────────────────────────────────── */
function renderShots(cat) {
  const grid = document.getElementById('shotsGrid');
  const filtered = cat === 'all' ? SHOTS : SHOTS.filter(s => s.cat === cat);

  grid.innerHTML = filtered.map((shot, i) => `
    <article
      class="shot-card"
      data-id="${shot.id}"
      data-cat="${shot.cat}"
      style="--i:${i}"
      role="button"
      tabindex="0"
      aria-label="View ${shot.name} details"
    >
      <div class="sc-top">
        <span class="sc-badge ${shot.cat}">${CAT_LABELS[shot.cat]}</span>
        <div class="sc-diff" aria-label="Difficulty: ${shot.diff} of 3">
          ${[1,2,3].map(n => `<span class="dot ${n <= shot.diff ? 'filled' : ''}"></span>`).join('')}
        </div>
      </div>
      <h3 class="sc-name">${shot.name}</h3>
      <p class="sc-thought">"${shot.swingThought}"</p>
      <p class="sc-summary">${shot.summary}</p>
      <span class="sc-arrow" aria-hidden="true">→</span>
    </article>
  `).join('');

  /* click / keyboard handlers */
  grid.querySelectorAll('.shot-card').forEach(card => {
    const open = () => openPanel(card.dataset.id);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  /* scroll reveal */
  requestAnimationFrame(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    grid.querySelectorAll('.shot-card').forEach(c => obs.observe(c));
  });
}

/* ─────────────────────────────────────────────────────────────
   DETAIL PANEL
───────────────────────────────────────────────────────────── */
function openPanel(id) {
  const shot = SHOTS.find(s => s.id === id);
  if (!shot) return;

  const panel   = document.getElementById('shotPanel');
  const inner   = document.getElementById('panelInner');
  const overlay = document.getElementById('panelOverlay');

  inner.innerHTML = `
    <div class="panel-scroll">
      <button class="panel-close" id="panelClose" aria-label="Close">✕</button>

      <div class="panel-head">
        <span class="panel-badge ${shot.cat}">${CAT_LABELS[shot.cat]}</span>
        <div class="panel-diff" aria-label="Difficulty: ${shot.diff} of 3">
          ${[1,2,3].map(n => `<span class="dot ${n <= shot.diff ? 'filled' : ''}"></span>`).join('')}
        </div>
      </div>

      <h2 class="panel-title">${shot.name}</h2>
      <p class="panel-summary">${shot.summary}</p>

      <div class="panel-thought">
        <span class="thought-label">Swing thought</span>
        <blockquote>"${shot.swingThought}"</blockquote>
      </div>

      <div class="panel-section">
        <h4 class="panel-section-title">Setup</h4>
        <div class="setup-grid">
          <div class="setup-item">
            <span class="setup-label">Ball position</span>
            <span>${shot.setup.ballPosition}</span>
          </div>
          <div class="setup-item">
            <span class="setup-label">Stance</span>
            <span>${shot.setup.stance}</span>
          </div>
          <div class="setup-item">
            <span class="setup-label">Weight</span>
            <span>${shot.setup.weight}</span>
          </div>
          <div class="setup-item">
            <span class="setup-label">Grip</span>
            <span>${shot.setup.grip}</span>
          </div>
        </div>
      </div>

      <div class="panel-section">
        <h4 class="panel-section-title">Technique</h4>
        <div class="tech-grid">
          <div class="tech-item">
            <span class="tech-label">Club face</span>
            <span>${shot.clubface}</span>
          </div>
          <div class="tech-item">
            <span class="tech-label">Swing path</span>
            <span>${shot.swingPath}</span>
          </div>
          <div class="tech-item">
            <span class="tech-label">Tempo</span>
            <span>${shot.tempo}</span>
          </div>
        </div>
      </div>

      <div class="panel-mode-toggle" role="tablist" aria-label="Key points view">
        <button class="mode-btn active" data-mode="range" role="tab" aria-selected="true">Range</button>
        <button class="mode-btn" data-mode="course" role="tab" aria-selected="false">On the Course</button>
      </div>

      <div class="panel-keys" id="panelKeys">
        ${shot.range.map(k => `
          <div class="key-point">
            <span class="key-dot" aria-hidden="true"></span>
            <span>${k}</span>
          </div>
        `).join('')}
      </div>

      <div class="panel-watchout">
        <span class="watchout-label">Watch out</span>
        <p>${shot.watchOut}</p>
      </div>
    </div>
  `;

  panel.removeAttribute('aria-hidden');
  overlay.classList.add('active');
  document.body.classList.add('panel-open');

  /* mode toggle */
  const keysEl = inner.querySelector('#panelKeys');
  inner.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      inner.querySelectorAll('.mode-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const points = btn.dataset.mode === 'range' ? shot.range : shot.course;
      keysEl.innerHTML = points.map(k => `
        <div class="key-point">
          <span class="key-dot" aria-hidden="true"></span>
          <span>${k}</span>
        </div>
      `).join('');
    });
  });

  /* close */
  inner.querySelector('#panelClose').addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel, { once: true });
  inner.querySelector('#panelClose').focus();
}

function closePanel() {
  document.getElementById('shotPanel').setAttribute('aria-hidden', 'true');
  document.getElementById('panelOverlay').classList.remove('active');
  document.body.classList.remove('panel-open');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

/* ─────────────────────────────────────────────────────────────
   CATEGORY FILTER
───────────────────────────────────────────────────────────── */
function initFilter() {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderShots(btn.dataset.cat);
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   RENDER: RELEASES
───────────────────────────────────────────────────────────── */
function renderReleases() {
  const grid = document.getElementById('releasesGrid');

  grid.innerHTML = RELEASES.map(r => `
    <div class="release-card rc-${r.colour}">
      <div class="rc-header">
        <span class="rc-num">0${r.num}</span>
        <div class="rc-title-block">
          <h3 class="rc-name">${r.name}</h3>
          <span class="rc-tagline">${r.tagline}</span>
        </div>
      </div>

      <p class="rc-principle">${r.principle}</p>

      <div class="rc-when">
        <span class="rc-when-label">When to use</span>
        <p>${r.when}</p>
      </div>

      <button class="rc-toggle" data-release="${r.id}" aria-expanded="false" aria-controls="shots-${r.id}">
        <span class="rc-toggle-label">View 4 shots</span>
        <span class="rc-arrow" aria-hidden="true">↓</span>
      </button>

      <div class="rc-shots" id="shots-${r.id}" hidden>
        ${r.shots.map((s, i) => `
          <div class="rc-shot">
            <span class="rc-shot-num">0${i + 1}</span>
            <div class="rc-shot-body">
              <h4>${s.name}</h4>
              <p>${s.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.rc-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id      = btn.dataset.release;
      const shotsEl = document.getElementById(`shots-${id}`);
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !expanded);
      btn.querySelector('.rc-arrow').textContent     = expanded ? '↓' : '↑';
      btn.querySelector('.rc-toggle-label').textContent = expanded ? 'View 4 shots' : 'Hide shots';
      shotsEl.hidden = expanded;
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   DECISION TREE
───────────────────────────────────────────────────────────── */
function initDecisionTree() {
  const stepsEl  = document.getElementById('dtSteps');
  const resultEl = document.getElementById('dtResult');
  const resetBtn = document.getElementById('dtReset');

  function showQuestion(qi) {
    const q    = DT_QUESTIONS[qi];
    const step = document.createElement('div');
    step.className = 'dt-step';
    step.innerHTML = `
      <p class="dt-q">
        <span class="dt-qnum">0${qi + 1}</span>
        ${q.q}
      </p>
      <div class="dt-btns">
        <button class="dt-btn dt-yes" data-qi="${qi}" data-ans="yes">Yes</button>
        <button class="dt-btn dt-no"  data-qi="${qi}" data-ans="no">No</button>
      </div>
    `;
    stepsEl.appendChild(step);

    /* animate in */
    requestAnimationFrame(() => step.classList.add('visible'));

    step.querySelectorAll('.dt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        step.querySelectorAll('.dt-btn').forEach(b => {
          b.disabled = true;
          b.classList.toggle('chosen', b === btn);
        });

        const outcome = q[btn.dataset.ans];
        if (typeof outcome === 'number') {
          showQuestion(outcome);
        } else {
          showResult(outcome);
        }
      });
    });
  }

  function showResult(outcome) {
    const release = RELEASES.find(r => r.id === outcome.result);
    resultEl.innerHTML = `
      <div class="dt-result-card rc-${release.colour}">
        <span class="dt-result-label">Your release</span>
        <h3>${RELEASE_RESULT_LABELS[outcome.result]}</h3>
        ${outcome.note ? `<p class="dt-result-note">${outcome.note}</p>` : ''}
        <p class="dt-result-principle">${release.principle}</p>
      </div>
    `;
    resetBtn.hidden = false;
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  resetBtn.addEventListener('click', () => {
    stepsEl.innerHTML  = '';
    resultEl.innerHTML = '';
    resetBtn.hidden    = true;
    showQuestion(0);
  });

  showQuestion(0);
}

/* ─────────────────────────────────────────────────────────────
   NAV ACTIVE STATE
───────────────────────────────────────────────────────────── */
const navLinks = document.querySelectorAll('nav ul a');
const sections = document.querySelectorAll('main section[id]');

new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(l => l.removeAttribute('data-active'));
    const link = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
    if (link) link.setAttribute('data-active', '');
  });
}, { threshold: 0.4 }).observe;

// simple approach that works
sections.forEach(section => {
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.removeAttribute('data-active'));
      const link = document.querySelector(`nav ul a[href="#${section.id}"]`);
      if (link) link.setAttribute('data-active', '');
    });
  }, { threshold: 0.4 }).observe(section);
});

/* ─────────────────────────────────────────────────────────────
   HERO PARALLAX
───────────────────────────────────────────────────────────── */
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    heroBgText.style.transform = `translateY(calc(-50% + ${window.pageYOffset * 0.28}px))`;
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────────
   SCROLL TO TOP
───────────────────────────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.pageYOffset > 500);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─────────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────────── */
renderShots('all');
initFilter();
renderReleases();
initDecisionTree();

/* ─────────────────────────────────────────────────────────────
   PRACTICE PLANNER
───────────────────────────────────────────────────────────── */
const WEAK_AREAS = [
  'Driver accuracy', 'Fairway woods', 'Long irons', 'Mid irons',
  'Short irons', 'Wedge distance control', 'Spinning wedges',
  'Chipping (Release 1)', 'Pitching (Release 2)', 'Lob shot (Release 3)',
  'Greenside bunkers', 'Fairway bunkers', 'Awkward lies',
  'Course management', 'Putting — reading', 'Putting — pace',
  'Mental game', 'Grip fundamentals'
];

const practiceState = {
  selected:  new Set(),
  duration:  60,
  skill:     'intermediate',
  equipment: 'full range',
  focus:     ''
};

/* ── Pills ── */
function renderPracticeWeakAreas() {
  const grid = document.getElementById('pillGrid');
  grid.innerHTML = WEAK_AREAS.map(area =>
    `<button class="weak-pill" data-area="${area}" aria-pressed="false">${area}</button>`
  ).join('');

  grid.querySelectorAll('.weak-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const area = pill.dataset.area;
      if (practiceState.selected.has(area)) {
        practiceState.selected.delete(area);
        pill.setAttribute('aria-pressed', 'false');
        pill.classList.remove('selected');
      } else {
        practiceState.selected.add(area);
        pill.setAttribute('aria-pressed', 'true');
        pill.classList.add('selected');
      }
      syncPillHint();
      syncGenerateBtn();
    });
  });
}

function syncPillHint() {
  const hint  = document.getElementById('pillHint');
  const count = practiceState.selected.size;
  hint.textContent = count === 0
    ? 'Select at least one area to continue.'
    : `${count} area${count > 1 ? 's' : ''} selected`;
  hint.classList.toggle('hint--has-selection', count > 0);
}

function syncGenerateBtn() {
  document.getElementById('generateBtn').disabled = practiceState.selected.size === 0;
}

/* ── Config button groups ── */
function initConfigGroups() {
  function wireGroup(id, stateKey, parser) {
    document.getElementById(id).querySelectorAll('.btn-group-item').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById(id).querySelectorAll('.btn-group-item').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        practiceState[stateKey] = parser ? parser(btn.dataset.value) : btn.dataset.value;
      });
    });
  }

  wireGroup('durationGroup', 'duration', v => parseInt(v, 10));
  wireGroup('skillGroup',    'skill');
  wireGroup('equipGroup',    'equipment');

  document.getElementById('focusInput').addEventListener('input', e => {
    practiceState.focus = e.target.value.trim();
  });
}

/* ── Generate button ── */
document.getElementById('generateBtn').addEventListener('click', () => {
  const key = localStorage.getItem('anthropic_api_key');
  if (!key) { openApiModal(); } else { runGenerate(key); }
});

async function runGenerate(apiKey) {
  const btn      = document.getElementById('generateBtn');
  const resultEl = document.getElementById('planResult');

  btn.disabled = true;
  btn.querySelector('.generate-label').textContent = 'Generating\u2026';
  btn.querySelector('.generate-icon').textContent  = '';
  btn.classList.add('loading');

  resultEl.hidden = false;
  resultEl.innerHTML = `
    <div class="plan-loading">
      <div class="plan-spinner"></div>
      <p>Building your session\u2026</p>
    </div>
  `;
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const areas  = [...practiceState.selected].join(', ');
  const prompt = [
    'You are an expert golf coach. Build a personalised, timed practice plan.',
    '',
    'Weak areas: ' + areas,
    'Duration: ' + practiceState.duration + ' minutes',
    'Skill level: ' + practiceState.skill,
    'Equipment available: ' + practiceState.equipment,
    'Specific focus: ' + (practiceState.focus || 'None'),
    '',
    'All block durations including warmup and cooldown must sum to exactly ' + practiceState.duration + ' minutes.',
    'Respond ONLY in JSON, no markdown:',
    '{',
    '  "sessionTitle": "",',
    '  "sessionGoal": "",',
    '  "warmup": { "duration": 5, "description": "" },',
    '  "blocks": [{ "title": "", "duration": 10, "shots": [""], "drill": "", "reps": "", "focus": "", "progression": "" }],',
    '  "cooldown": { "duration": 5, "description": "" },',
    '  "coachNote": ""',
    '}'
  ].join('\n');

  try {
    const raw  = await callAnthropicAPI(prompt, apiKey);
    const plan = JSON.parse(raw.replace(/```json|```/g, '').trim());
    renderPlan(plan);
  } catch (err) {
    resultEl.innerHTML = `
      <div class="plan-error">
        <strong>Generation failed.</strong>
        <p>${err.message || 'Check your API key and try again.'}</p>
        ${err.isAuth ? '<button class="plan-error-rekey" id="planRekey">Update API Key</button>' : ''}
      </div>
    `;
    document.getElementById('planRekey')?.addEventListener('click', openApiModal);
  } finally {
    btn.disabled = practiceState.selected.size === 0;
    btn.querySelector('.generate-label').textContent = 'Generate Plan';
    btn.querySelector('.generate-icon').textContent  = '\u2192';
    btn.classList.remove('loading');
  }
}

async function callAnthropicAPI(prompt, apiKey) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':          'application/json',
      'x-api-key':             apiKey,
      'anthropic-version':     '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-6',
      max_tokens: 2000,
      messages:   [{ role: 'user', content: prompt }]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e   = new Error(err.error?.message || `HTTP ${res.status}`);
    e.isAuth  = res.status === 401;
    throw e;
  }

  const data = await res.json();
  return data.content.map(c => c.text || '').join('');
}

/* ── Render plan ── */
function renderPlan(plan) {
  const resultEl = document.getElementById('planResult');

  resultEl.innerHTML = `
    <div class="plan-inner">
      <div class="plan-top">
        <div class="plan-top-meta">
          <span class="section-tag">Your session</span>
          <span class="plan-duration-badge">${practiceState.duration} min</span>
        </div>
        <h2 class="plan-title">${plan.sessionTitle}</h2>
        <div class="plan-goal-block">
          <span class="plan-goal-label">Session goal</span>
          <p>${plan.sessionGoal}</p>
        </div>
      </div>

      <div class="plan-block warmup-block">
        <div class="plan-block-header">
          <span class="block-type-label">Warm-up</span>
          <span class="block-time-badge">${plan.warmup.duration} min</span>
        </div>
        <p class="block-simple-desc">${plan.warmup.description}</p>
      </div>

      <div class="plan-blocks-list">
        ${plan.blocks.map((block, i) => `
          <div class="plan-block practice-block">
            <div class="plan-block-header">
              <span class="block-index">0${i + 1}</span>
              <h3 class="block-title">${block.title}</h3>
              <span class="block-time-badge">${block.duration} min</span>
            </div>
            ${block.shots && block.shots.length ? `
              <div class="block-shots-row">
                ${block.shots.map(s => `<span class="block-shot-tag">${s}</span>`).join('')}
              </div>
            ` : ''}
            <div class="block-details-grid">
              <div class="block-detail-row">
                <span class="bd-label">Drill</span>
                <span class="bd-value">${block.drill}</span>
              </div>
              <div class="block-detail-row">
                <span class="bd-label">Reps</span>
                <span class="bd-value">${block.reps}</span>
              </div>
              <div class="block-detail-row">
                <span class="bd-label">Focus</span>
                <span class="bd-value">${block.focus}</span>
              </div>
              <div class="block-detail-row block-detail-row--prog">
                <span class="bd-label">Progression</span>
                <span class="bd-value">${block.progression}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="plan-block cooldown-block">
        <div class="plan-block-header">
          <span class="block-type-label">Cool-down</span>
          <span class="block-time-badge">${plan.cooldown.duration} min</span>
        </div>
        <p class="block-simple-desc">${plan.cooldown.description}</p>
      </div>

      <div class="coach-note-block">
        <span class="coach-note-label">Coach note</span>
        <p>${plan.coachNote}</p>
      </div>

      <div class="plan-actions-row">
        <button class="plan-another-btn" id="planAnotherBtn">\u21ba Plan Another Session</button>
        <button class="plan-rekey-btn" id="planRekeyBtn">Update API Key</button>
      </div>
    </div>
  `;

  document.getElementById('planAnotherBtn').addEventListener('click', () => {
    resultEl.hidden = true;
    resultEl.innerHTML = '';
    document.getElementById('practiceForm').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('planRekeyBtn').addEventListener('click', openApiModal);
}

/* ── API Key Modal ── */
function openApiModal() {
  const input    = document.getElementById('apiKeyInput');
  const existing = localStorage.getItem('anthropic_api_key');
  if (existing) input.value = existing;
  document.getElementById('apiModal').removeAttribute('aria-hidden');
  document.getElementById('apiModalOverlay').classList.add('active');
  input.focus();
}

function closeApiModal() {
  document.getElementById('apiModal').setAttribute('aria-hidden', 'true');
  document.getElementById('apiModalOverlay').classList.remove('active');
}

document.getElementById('apiModalSave').addEventListener('click', () => {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (!key) return;
  localStorage.setItem('anthropic_api_key', key);
  closeApiModal();
  runGenerate(key);
});

document.getElementById('apiModalCancel').addEventListener('click', closeApiModal);

document.getElementById('apiModalOverlay').addEventListener('click', closeApiModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('apiModal').getAttribute('aria-hidden') !== 'true') {
    closeApiModal();
  }
});

/* ── Init ── */
renderPracticeWeakAreas();
initConfigGroups();
