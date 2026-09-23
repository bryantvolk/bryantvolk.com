(() => {
  const pre = document.getElementById("cat");
  if (!pre) return;

  const W = 40;
  const H = 9;
  const art = (s) => s.split("\n").slice(1, -1);

  // Side-view art is drawn head-right; the other direction is mirrored so the two can't drift apart.
  const SWAP = { "(": ")", ")": "(", "/": "\\", "\\": "/", "<": ">", ">": "<", "`": "'", "'": "`" };
  const mirror = (rows) => {
    const w = Math.max(...rows.map((r) => r.length));
    return rows.map((r) => [...r.padEnd(w)].reverse().map((c) => SWAP[c] || c).join(""));
  };

  const SIDE_A = art(String.raw`
(\      /\_/\
 \\____( o.o )
  (        _/
  /_/-'-\_\
`);
  const SIDE_B = art(String.raw`
 /)     /\_/\
//_____( o.o )
  (        _/
   |_|   |_|
`);
  const LEAP = art(String.raw`
        /\_/\
 ______( o.o )
/(         _/
 //      //
`);
  const FRONT = art(String.raw`
 /\_/\
( o.o )
 > ^ <
(_) (_)
`);
  const BACK = art(String.raw`
 /\_/\  ,
(     )//
(     )/
 (_ _)
`);
  const STRETCH = art(String.raw`
 ,
(\\___
 \    '-. /\_/\
  |    '-( o.o )
  |_|   _(")(")
`);
  const YAWN = STRETCH.map((r) => r.replace("o.o", "-O-"));
  // Drawn head-left, mirrored so it keeps the stretch's head-right facing.
  const LOAF = mirror(art(String.raw`
 /\_/\_____
( o.o )    \
(")(")______)~
`));
  const CURL = mirror(art(String.raw`
 /\_/\_____
( -.- )    \
(")(")______)~
`));
  const CURL_FLICK = mirror(art(String.raw`
 /\_/\_____
( -.- )    \_
(")(")______)/
`));
  const BED = [
    " .-~~~~~~~~~~~~~~~~-. ",
    "(                    )",
    " `-~~~~~~~~~~~~~~~~-' ",
  ];

  const BED_X = (W - BED[0].length) / 2;
  const BED_Y = H - BED.length;
  const FLOOR = H - 4; // 4-row cat standing on the ground line
  const ON_BED = BED_Y - 2; // 4-row cat with its feet inside the rim
  const LYING = ON_BED + 1; // 3-row curl, same bottom row
  // Offsets centre each pose on the 22-wide bed.
  const SIDE_X = BED_X + 4;
  const FACE_X = BED_X + 7;
  const CURL_X = BED_X + 4;
  const STRETCH_X = BED_X + 3;
  const STOP_X = BED_X - SIDE_A[1].length; // last floor spot clear of the bed

  const walk = (from, to, ms) =>
    Array.from({ length: to - from + 1 }, (_, i) => [i % 2 ? SIDE_B : SIDE_A, from + i, FLOOR, ms]);

  // [cat rows, x, y, ms, z marks as [[text, dx, dy], ...] relative to the cat]
  const TIMELINE = [
    ...walk(-14, STOP_X, 150),
    [SIDE_A, STOP_X, FLOOR, 450], // eyes the bed
    [LEAP, STOP_X + 5, BED_Y - 4, 140], // leap rows stay above the rim
    [LEAP, STOP_X + 11, BED_Y - 5, 140],
    [SIDE_B, SIDE_X, ON_BED, 320],
    // One full circle (right, toward us, left, away, right), then a half turn to face us.
    [FRONT, FACE_X, ON_BED, 320],
    [mirror(SIDE_A), SIDE_X, ON_BED, 260],
    [mirror(SIDE_B), SIDE_X, ON_BED, 260],
    [BACK, FACE_X, ON_BED, 320],
    [SIDE_A, SIDE_X, ON_BED, 260],
    [SIDE_B, SIDE_X, ON_BED, 260],
    [STRETCH, STRETCH_X, ON_BED - 1, 450], // rump up, chest down, paws forward
    [YAWN, STRETCH_X, ON_BED - 1, 800],
    [STRETCH, STRETCH_X, ON_BED - 1, 300],
    [LOAF, CURL_X, LYING, 450],
    [CURL, CURL_X, LYING, 500],
  ];
  // Loops after TIMELINE until a click: z's rise from the head and fade, one tail flick per cycle.
  const z1 = ["z", 12, -1];
  const z2 = ["z", 13, -2];
  const z3 = ["Z", 14, -3];
  const IDLE = [
    [CURL, CURL_X, LYING, 600, [z1]],
    [CURL, CURL_X, LYING, 600, [z2, z1]],
    [CURL, CURL_X, LYING, 600, [z3, z2, z1]],
    [CURL, CURL_X, LYING, 600, [z3, z2]],
    [CURL_FLICK, CURL_X, LYING, 600, [z3]],
    [CURL, CURL_X, LYING, 700, []],
  ];
  const REST = IDLE[0];

  const compose = ([cat, cx, cy, , marks = []]) => {
    const grid = Array.from({ length: H }, () => Array(W).fill(null).map(() => [" ", ""]));
    // A solid sprite's inner spaces are opaque, so the cat hides the rim behind it.
    const stamp = (rows, x0, y0, cls, solid) =>
      rows.forEach((row, dy) => {
        const first = row.search(/\S/);
        const last = row.trimEnd().length - 1;
        [...row].forEach((ch, dx) => {
          const x = x0 + dx;
          const y = y0 + dy;
          const visible = ch !== " " || (solid && dx > first && dx < last);
          if (visible && x >= 0 && x < W && y >= 0 && y < H) grid[y][x] = [ch, cls];
        });
      });
    stamp(BED, BED_X, BED_Y, "bed");
    stamp(cat, cx, cy, "cat", true);
    for (const [text, dx, dy] of marks) stamp([text], cx + dx, cy + dy, "cat");
    return grid;
  };

  const render = (frame) => {
    const out = document.createDocumentFragment();
    compose(frame).forEach((row, y) => {
      let run = "";
      let cls = "";
      const flush = () => {
        if (!run) return;
        const node = cls ? document.createElement("span") : document.createTextNode(run);
        if (cls) {
          node.className = cls;
          node.textContent = run;
        }
        out.appendChild(node);
        run = "";
      };
      for (const [ch, c] of row) {
        const next = ch === " " ? cls : c; // spaces join whichever run they sit in
        if (next !== cls) flush();
        cls = next;
        run += ch;
      }
      flush();
      if (y < H - 1) out.appendChild(document.createTextNode("\n"));
    });
    pre.replaceChildren(out);
  };

  let timer = 0;
  const play = (i) => {
    clearTimeout(timer);
    const frame = TIMELINE[i] || IDLE[(i - TIMELINE.length) % IDLE.length];
    render(frame);
    timer = setTimeout(play, frame[3], i + 1);
  };

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    render(REST);
    return;
  }
  pre.addEventListener("click", () => play(0));
  play(0);
})();
