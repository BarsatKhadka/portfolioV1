import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Blog() {
  const { slug } = useParams();

  // Blog content mapping - can be extended for more blogs
  const blogContent = {
    'reverse-engineering-an-asic-from-its-layout': {
      title: 'Reverse-Engineering an ASIC From Its Layout',
      content: (
        <div className="text-sm lg:text-[16px] leading-[1.9] space-y-6">

          <p className="text-[#6b7280] text-sm italic border-l-4 border-[#e5e7eb] pl-4">
            August 2026 &bull; Technical
          </p>

          <p>
            Jane Street published a puzzle: they designed a chip, ran it through a real physical
            design flow, and released only the <strong>GDS</strong> &mdash; the geometry file a
            foundry would use to actually manufacture it. Every human-readable name was stripped
            along the way. Your job is to work out what the chip does and make its{' '}
            <code className="font-mono text-[13px]">success</code> output go high.
          </p>

          <p>
            This is a writeup of how I did that: recovering a netlist from raw polygons, proving
            the recovery was faithful, and then solving the thing that turned out to be hiding
            inside.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">What you actually get</h2>

          <p>
            One file matters: <code className="font-mono text-[13px]">puzzle.gds</code>. It is
            1.4&nbsp;MB of rectangles &mdash; roughly 50,000 of them &mdash; describing about
            200&nbsp;&times;&nbsp;353&nbsp;&micro;m of silicon in SkyWater&apos;s open 130&nbsp;nm
            process. No module names, no signal names, no comments. Just shapes on layers.
          </p>

          <p>The chip exposes six signals:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li><code className="font-mono text-[13px]">clk</code>, <code className="font-mono text-[13px]">rst_n</code>, <code className="font-mono text-[13px]">enable</code> &mdash; the usual controls</li>
            <li><code className="font-mono text-[13px]">I</code> &mdash; a one-bit serial input</li>
            <li><code className="font-mono text-[13px]">O[7:0]</code> &mdash; an eight-bit output</li>
            <li><code className="font-mono text-[13px]">success</code> &mdash; the &ldquo;you got it&rdquo; flag</li>
          </ul>

          <p>
            So it is a lock. You feed it bits and it decides. There is also a recording of somebody
            entering a wrong answer, and a <code className="font-mono text-[13px]">warmup/</code>{' '}
            directory containing a small practice design <em>with its original source</em> &mdash;
            which turns out to be the most valuable file in the repository.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Step 1: A netlist out of geometry</h2>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-4">The lucky break</h3>

          <p>
            A GDS is hierarchical, and this one kept the names of the <strong>standard cells</strong>{' '}
            &mdash; the pre-made logic bricks the chip is assembled from:
          </p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`sky130_fd_sc_hd__nand2_2   at (177.10, 92.48)
sky130_fd_sc_hd__dfrtp_2   at ( 26.22, 38.08)
... 726 more`}
          </pre>

          <p>
            That is a real gift. Identifying gates from raw polygons is the part everyone expects to
            be hard, and it was already done. <strong>728 logic cells</strong>, plus 676 well taps
            and 204 decaps that carry no signal and can be dropped.
          </p>

          <p>
            Better still, each cell&apos;s own drawing carries text labels naming its pins &mdash;{' '}
            <code className="font-mono text-[13px]">&quot;A&quot;</code> at (175.005, 90.950), and
            so on. So the entire problem collapses to one question:{' '}
            <strong>which pins are wired together?</strong> That, the flow really did erase.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-4">The geometry problem</h3>

          <p>
            Routing lives on six conductor layers: li1 (local interconnect) and met1 through met5.
            Between adjacent layers sit <em>cuts</em> &mdash; vias &mdash; which are the only places
            two layers connect.
          </p>

          <p>The extraction algorithm is three lines of idea:</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Flatten every conductor polygon to top-level coordinates.</li>
            <li>Union-find shapes that <strong>overlap on the same layer</strong>.</li>
            <li>For every via cut, union the shape below it with the shape above it.</li>
          </ol>

          <p>
            Same-layer overlap means connected; different layers mean nothing without a cut. That is
            the entire physics of it. I used <strong>gdstk</strong> to read and flatten the GDS and{' '}
            <strong>shapely</strong> with an STRtree to make the 50,000-shape overlap test fast. It
            runs in about 2.5 seconds.
          </p>

          <p>
            Then, for each cell instance, look up which blob covers each pin label &mdash; and you
            have connectivity.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-4">Did it work?</h3>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`cut li1 ->met1 : 19764/19764 bridged
cut met1->met2 :  6869/6869  bridged
cut met2->met3 :  3423/3423  bridged
cut met3->met4 :  3159/3159  bridged
cut met4->met5 :   108/108   bridged`}
          </pre>

          <p>
            <strong>33,323 of 33,323 vias landed on metal on both sides.</strong> If the layer map
            or the coordinate transforms were wrong, vias would be floating in space. None were.
          </p>

          <p>
            The recovered design: 728 functional cells across 69 types, 92 flip-flops, 734 nets,
            zero combinational loops, zero multiply-driven nets, and exactly one net with no driver
            (more on that at the end).
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Step 2: What the gates do</h2>

          <p>
            A netlist is useless without cell semantics, so I pulled the functional models for all
            63 cell types from the open SkyWater PDK.
          </p>

          <p>
            One trap worth flagging: <strong>the human-readable equations in the PDK headers are not
            reliable.</strong>
          </p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`nor3:   Y = !(A | B | C | !D)      <- nor3 has no D input
nor3b:  Y = (!(A | B)) & !C)       <- unbalanced parentheses`}
          </pre>

          <p>
            Below those comments, though, each model has a <em>structural</em> body built from
            Verilog primitives, which is unambiguous. I parse the structural bodies and ignore the
            prose entirely.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Step 3: Proving the reconstruction is faithful</h2>

          <p>
            This is the step that matters most, and it is exactly why the warm-up directory exists.
            Anyone can produce <em>an</em> answer. The real question is why you should believe it.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-4">Test 1 &mdash; the warm-up, where the answer is known</h3>

          <p>
            The warm-up ships a small design run through the same flow, including its original
            Verilog, which says the design asserts its output when{' '}
            <code className="font-mono text-[13px]">A + B == 496</code>. So: run the identical
            pipeline on the warm-up GDS, which has names stripped exactly like the puzzle, and check
            against the known answer. I tested all 65,536 input pairs.
          </p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`ERRORS=0   S_high_count=15 (expected 15)`}
          </pre>

          <p>
            Zero mismatches. Fifteen is right: with eight-bit operands,{' '}
            <code className="font-mono text-[13px]">a + b == 496</code> has exactly fifteen
            solutions.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-4">Test 2 &mdash; their own recording</h3>

          <p>
            The provided VCD records a wrong attempt. Decoding the{' '}
            <code className="font-mono text-[13px]">O</code> bus as ASCII gave the first real clue
            about the chip:
          </p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`0x54 0x52 0x59 0x20 0x41 0x47 0x41 0x49 0x4E
  T    R    Y   ' '   A    G    A    I    N`}
          </pre>

          <p>
            The chip talks back. So I replayed the same stimulus through my reconstruction and
            compared <code className="font-mono text-[13px]">O</code> and{' '}
            <code className="font-mono text-[13px]">success</code> at every sample:{' '}
            <strong>0 mismatches over 624 golden samples</strong>, same characters at the same clock
            ticks.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-4">Test 3 &mdash; a real simulator, none of my code</h3>

          <p>
            Finally I emitted a gate-level Verilog netlist and ran it under Icarus Verilog against
            the official SkyWater cell models, with none of my own code in the loop:
          </p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`== warm-up netlist vs known answer, all 65536 pairs ==
ERRORS=0  S_high_count=15 (expected 15)

== puzzle netlist ==
VCD wrong input: success=0  message="TRY AGAIN"`}
          </pre>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Step 4: The protocol</h2>

          <p>Reading clock edges out of the VCD makes the interface obvious:</p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`edges 0-2    rst_n = 0            reset
edge  3      rst_n = 1
edges 4-124  enable = 1           <- 121 bits shifted in on I
edge  125    enable = 0           <- message begins immediately`}
          </pre>

          <p>
            <strong>121 input bits.</strong> Tracing back from{' '}
            <code className="font-mono text-[13px]">success</code> shows a sticky flag whose set
            condition is a wide AND tree &mdash; and that tree decomposes into two groups of{' '}
            <em>eleven</em> near-identical two-bit comparisons, each checking a counter equals two.
            Eleven of one thing, eleven of another, everything compared against two. I did not read
            that correctly until later.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Step 5: Solving</h2>

          <p>
            121 bits is 2<sup>121</sup> possibilities. Brute force is not on the table.
          </p>

          <p>
            I first checked whether the state update was linear over GF(2) &mdash; if it were an
            LFSR or a CRC, Gaussian elimination would crack it instantly. It is not: twenty out of
            twenty linearity predictions failed. Genuinely nonlinear. So, SAT.
          </p>

          <p>
            I unrolled the netlist over 129 clock cycles and Tseitin-encoded every gate from its
            primitive structure, giving a gate-exact CNF of <strong>370,618 clauses</strong> over{' '}
            <strong>109,256 variables</strong>, plus one extra clause:{' '}
            <code className="font-mono text-[13px]">success = 1</code>.
          </p>

          <p>
            CaDiCaL returned an answer in <strong>15 milliseconds</strong>. Adding a blocking clause
            and re-solving returned UNSAT &mdash; the key is unique.
          </p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`cycle 121 | 0x28 '('  success=1
cycle 122 | 0x2a '*'  success=1
cycle 123 | 0x20 ' '  success=1
cycle 124 | 0x54 'T'  success=1
...
cycle 135 | 0x29 ')'  success=1`}
          </pre>

          <p className="text-lg">
            <strong>(* TWO STARS *)</strong>
          </p>

          <p>
            An OCaml comment, which for Jane Street is about as on-brand as it gets.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Step 6: The puzzle inside the puzzle</h2>

          <p>Then I looked at the key itself. <strong>121 = 11 &times; 11.</strong></p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`. . . . . . . * . * .
* . . . . * . . . . .
. . . . . . . * . * .
* . * . . . . . . . .
. . . . * . * . . . .
. . * . . . . . * . .
. . . . * . . . . . *
. * . . . . * . . . .
. . . * . . . . . . *
. . . . . * . . * . .
. * . * . . . . . . .`}
          </pre>

          <p>
            Exactly two stars in every row. Exactly two in every column. No two stars touching, not
            even diagonally. It is a <strong>Star Battle</strong> &mdash; and &ldquo;TWO
            STARS&rdquo; had been telling me the whole time. The eleven-plus-eleven pairs of
            &ldquo;counter equals two&rdquo; in the success tree were the column counters and the
            region counters.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Step 7: Recovering the regions</h2>

          <p>
            Star Battle also needs irregular regions, two stars each. Those are baked into the
            chip&apos;s logic, so I extracted them by probing: shift in a grid with a single star at
            cell <em>i</em>, diff the 92-bit flop state against the empty grid, repeat for all 121
            cells. Cells feeding the same counter belong to the same region.
          </p>

          <p>Eleven flops partition the 121 cells exactly, with nothing left over:</p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`A A A A A B B C D D E
A A F A A B C C D D E
A A F B B B B C C D E
A A F B G G G E C C E
F A F B G E E E E E E
F F F B G G G E H H H
B B B B B B G E H I I
B J J J G G G E H I I
B J J K E E E E H I I
B B J K K E E E H H H
B J J K E E E E E E E`}
          </pre>

          <p>
            Sizes A=14 B=21 C=7 D=5 E=28 F=8 G=11 H=9 I=6 J=8 K=4, summing to 121, every region
            orthogonally contiguous, as a well-formed Star Battle requires.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Step 8: Closing the loop</h2>

          <p>
            The last check. I took the recovered region map, wrote a plain Star Battle solver using
            the standard rules, and made no reference to the circuit at all.
          </p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`independent Star Battle solutions: 1
matches chip solution: True`}
          </pre>

          <p>
            One solution, and it is the same grid the SAT solver pulled out of the transistors. The
            puzzle in the silicon and the puzzle on paper agree.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">What else is hiding in there</h2>

          <p>
            The chip has more to say than pass or fail. Feeding it degenerate grids produces
            different replies, and one string is reachable only by reading the logic:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li><code className="font-mono text-[13px]">TRY AGAIN</code> &mdash; any ordinary wrong grid</li>
            <li><code className="font-mono text-[13px]">EMPTY SKY</code> &mdash; all 121 bits zero</li>
            <li><code className="font-mono text-[13px]">BIG BANG</code> &mdash; all 121 bits one</li>
            <li><code className="font-mono text-[13px]">(* TWO STARS *)</code> &mdash; the correct grid</li>
            <li>
              <code className="font-mono text-[13px]">TWO&quot;NOT TOUCH</code> &mdash; the alternate
              name for Star Battle, encoded in the output generator but{' '}
              <strong>unreachable from any input</strong>. I proved that with SAT: constrain the
              output bus to those bytes over a free starting state and it is satisfiable; do the
              same over reachable states and it is UNSAT. A dead string you can only find by
              reverse-engineering the ROM.
            </li>
          </ul>

          <p>
            There are quieter ones too. The provided VCD is dated{' '}
            <code className="font-mono text-[13px]">Sat Dec 31 23:59:60 2016</code> &mdash; a real
            leap second &mdash; and its version field reads &ldquo;Leave no stone unturned!&rdquo;.
            And the warm-up&apos;s magic constant, 496, is the third perfect number.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Loose ends</h2>

          <p>
            One net has no driver in my extraction. Two input pins in the output-generator block are
            routed to each other on met1 and met2, but the source connection is not recovered.
            Everything else in the design connects cleanly, so I suspect a routing pattern my
            overlap rule does not cover rather than anything deliberate.
          </p>

          <p>
            It is provably irrelevant here: both polarities reproduce the golden waveform exactly,
            and both produce the same unique solution and the same message. I tied it off explicitly
            in the emitted netlist with a comment rather than papering over it.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Tools</h2>

          <p>
            Everything is free and open source, which is clearly deliberate on Jane Street&apos;s
            part: <strong>gdstk</strong> to read and flatten the GDS, <strong>shapely</strong> for
            geometry and spatial indexing, the <strong>SkyWater sky130 PDK</strong> for cell
            semantics, <strong>python-sat</strong> with CaDiCaL for solving,{' '}
            <strong>Icarus Verilog</strong> for independent verification, and{' '}
            <strong>KLayout</strong> and <strong>Surfer</strong> for looking at things. Total
            pipeline runtime from GDS to answer: under five seconds.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">What I would tell someone starting this</h2>

          <p>
            Do the warm-up first, properly. It is not busywork &mdash; it is the only thing that
            tells you your extractor is right before you point it at a design where you cannot check
            the answer. Two of my early bugs would have produced plausible, completely wrong
            netlists, and the warm-up caught both.
          </p>

          <p>
            And you do not need to understand the circuit to solve it. I never did, not until
            afterwards. Rebuild it exactly, prove the rebuild is faithful against known answers, then
            let a SAT solver do the reasoning. The insight that it was a Star Battle came from
            staring at the 121-bit key and noticing 11 &times; 11.
          </p>

        </div>
      )
    },
    'why-traditional-rl-will-not-yield-agi': {
      title: 'Why Traditional Reinforcement Learning Will Not Yield AGI',
      content: (
        <div className="text-sm lg:text-[16px] leading-[1.9] space-y-6">

          {/* ── Human intro ── */}
          <p className="text-[#6b7280] text-sm italic border-l-4 border-[#e5e7eb] pl-4">
            April 2026 &bull; Essay
          </p>

          <p>
            Let me start with something personal. I remember the first time I genuinely asked myself: <em>what would it take for a machine to be as smart as a person?</em> Not smart at chess. Not smart at recognizing cats in photos. Smart the way a curious ten-year-old is smart — able to pick up a new game in five minutes, laugh at a joke they've never heard before, and ask "but <em>why</em>?" about anything.
          </p>

          <p>
            That question has orbited my thinking ever since. And lately, as I spend more time in ML research, I keep arriving at the same uncomfortable conclusion: the dominant paradigm we've used to chase machine intelligence — reinforcement learning — is not going to get us there. Not in its traditional form. Not even close.
          </p>

          <p>
            This isn't a hot take against RL. It's done extraordinary things. It's also, I think, hitting a wall that no amount of bigger compute or cleverer reward shaping will break through. Here's why.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          {/* ── What is AGI ── */}
          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-2">First, what are we even talking about?</h2>

          <p>
            AGI — Artificial General Intelligence — is one of those terms that everyone uses and nobody fully agrees on. So let me be honest about what I mean when I use it, because the definition shapes the whole argument.
          </p>

          <p>
            I don't mean a machine that scores 100% on every benchmark. Benchmarks are narrow by design. I mean something that can <em>learn to do new things</em> the way humans do: by watching, asking, reading, experimenting — and then actually <em>understanding</em> what it learned well enough to use it somewhere else entirely.
          </p>

          <p>
            Think about how you learned to drive. Maybe you watched other people drive for years before you ever touched a steering wheel. You understood, roughly, what the goal was (get to a place without hitting things), what the controls did, and what the consequences of bad decisions looked like. When you finally sat in the driver's seat, you weren't starting from zero. You brought an enormous scaffolding of prior knowledge — physics, social norms, spatial reasoning, self-preservation — and the actual "learning to drive" part was just fitting a thin new layer on top of all of that.
          </p>

          <p>
            No RL agent does anything remotely like this. That gap is what I want to examine.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          {/* ── What RL actually is ── */}
          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-2">What traditional RL actually does</h2>

          <p>
            At its core, reinforcement learning is elegant and simple: an agent acts in an environment, receives a scalar reward signal, and updates its behavior to maximize the expected sum of future rewards. That's it. Everything else — policy gradients, Q-learning, actor-critic methods, PPO — is engineering layered on top of that loop.
          </p>

          <p>
            The framework is grounded in a mathematical object called a Markov Decision Process (MDP): states, actions, transitions, and rewards. Solve the MDP, and you've "solved" the task. It's a beautiful abstraction. It's also an abstraction that quietly assumes things about the world that are catastrophically wrong at the scale of general intelligence.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          {/* ── The problems ── */}
          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-2">The problems — one by one</h2>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-2">1. The reward specification problem</h3>

          <p>
            Every RL system needs someone to define what "good" looks like as a scalar number. This sounds trivial. It is not. The economist Charles Goodhart captured it in what became Goodhart's Law: <em>when a measure becomes a target, it ceases to be a good measure.</em>
          </p>

          <p>
            RL systems find this with ruthless efficiency. Robots trained to run fast find ways to be "tall" (measured as center of mass height) instead. Agents optimized for game scores find exploits the designers never imagined. OpenAI's boat-racing agent, trained to maximize score, learned to spin in circles collecting bonuses rather than finishing the race. It wasn't cheating — it was doing exactly what it was told. The reward was wrong.
          </p>

          <p>
            Now scale this problem up. What reward do you specify for "be a good general assistant"? For "understand the world"? For "be curious"? Human values aren't a scalar. They're a tangled, context-dependent, culturally-embedded web of preferences, and we don't know how to compress them into a number without losing everything important.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-2">2. Sample inefficiency</h3>

          <p>
            AlphaGo needed roughly 30 million games of self-play before it surpassed world-champion human players. A child can learn the rules of Go in an afternoon and be playing reasonably within a few days. The human brain runs on about 20 watts. A data center runs on megawatts.
          </p>

          <p>
            This asymmetry isn't just a hardware problem. It reflects something deep: humans don't learn from raw experience. We learn from <em>structured experience mediated by prior knowledge, language, culture, and rich internal models</em>. When you tell a child "the goal is to surround your opponent's stones," they immediately bring years of spatial reasoning, strategic intuition, and social theory of mind to bear. The RL agent starts from nothing, every time.
          </p>

          <p>
            This might improve with better algorithms. But the degree of improvement required isn't incremental — it's many orders of magnitude. That suggests the gap isn't about optimization efficiency. It's architectural.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-2">3. Brittle generalization</h3>

          <p>
            Train an RL agent to walk on flat terrain. Change the floor texture slightly — it falls over. Move the goal one meter to the left — it fails. This is not a caricature: it is the consistent, documented result across years of robotics and game-playing RL research.
          </p>

          <p>
            The agent learns a function from observations to actions that happens to produce high reward in the training distribution. It doesn't build a model of <em>why</em> its actions worked. It doesn't understand that "walking" is a strategy for navigating physical space given certain biomechanical constraints. It has a very complicated lookup table.
          </p>

          <p>
            Humans, meanwhile, generalize effortlessly across contexts that share underlying structure, even when the surface features are completely different. This is because we reason about causes, not just correlations.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-2">4. No causal understanding</h3>

          <p>
            Judea Pearl, the computer scientist and philosopher who developed the mathematical theory of causation, draws a hierarchy: association (seeing), intervention (doing), and counterfactual (imagining). Traditional RL operates almost entirely at the first level. It sees correlations between states, actions, and rewards. It can intervene — that's what taking an action is — but it cannot reason about counterfactuals in the way humans naturally do.
          </p>

          <p>
            "What would have happened if I had turned left instead?" is a simple question for a human driver. It's structurally outside what a standard RL agent can answer, because answering it requires a causal model of the environment, not just a policy.
          </p>

          <p>
            Without causal reasoning, you cannot have genuine planning. You can have lookahead search (which is what tree-search methods like AlphaZero do), but that requires a perfect simulator — another thing the real world doesn't provide.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-2">5. The transfer problem</h3>

          <p>
            A system that learns to play Go cannot play chess. A system that learns to manipulate blocks cannot fold laundry. Every new task requires starting from scratch, with millions of samples, and a new reward function.
          </p>

          <p>
            AGI, by definition, must transfer knowledge across domains. Humans do this constantly — we apply game theory to salary negotiations, use cooking intuitions in chemistry labs, and understand new languages by analogy to ones we already know. The machinery that enables this transfer is not a reward signal. It's something closer to a structured, compositional, symbolic-ish world model built over a lifetime of embodied experience.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-2">6. The environment stationarity assumption</h3>

          <p>
            MDPs assume the environment's transition and reward functions are fixed. The real world is not stationary. Other agents are learning and adapting. Social contexts shift. Physical conditions change. Goals evolve. An agent optimizing against a fixed world model will, over time, be optimizing against a fiction.
          </p>

          <p>
            Multi-agent RL addresses some of this, but introduces its own problems — emergent coordination failures, Nash equilibria that are locally stable but globally catastrophic, and combinatorial explosions in joint state spaces.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          {/* ── What AGI requires ── */}
          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-2">What AGI actually requires</h2>

          <p>
            I want to be careful not to just list problems without gesturing at what a solution might look like. My read, after absorbing a lot of research across cognitive science, AI, and philosophy of mind, is something like this:
          </p>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>World models</strong>, not just policies. An agent that builds and maintains an internal model of how the world works — causally, not just statistically — can plan, simulate, and reason about situations it has never encountered.
            </li>
            <li>
              <strong>Compositional, hierarchical representations.</strong> Intelligence seems to rely on the ability to combine concepts into new concepts, and to reason at multiple levels of abstraction simultaneously. Language is the most obvious example of this; so is mathematics.
            </li>
            <li>
              <strong>Intrinsic motivation and curiosity</strong> as primary drives, not as supplementary rewards bolted onto an extrinsic signal. Children explore because exploring is intrinsically interesting, and this exploration builds the foundation from which task-specific skills emerge cheaply.
            </li>
            <li>
              <strong>Few-shot learning from sparse, rich data.</strong> Not millions of rollouts. Reading a paragraph. Watching a demonstration once. Asking a clarifying question.
            </li>
            <li>
              <strong>Social and linguistic grounding.</strong> Human intelligence is not individual. It is deeply embedded in language, culture, and social interaction. Any system that ignores this is building on an impoverished substrate.
            </li>
          </ul>

          <hr className="border-[#e5e7eb] my-2" />

          {/* ── What might work ── */}
          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-2">So what might actually work?</h2>

          <p>
            I don't have a clean answer here — if I did, I'd be writing a paper, not an essay. But I think the most promising threads combine elements that traditional RL explicitly does not have:
          </p>

          <p>
            <strong>Large language models as a substrate.</strong> LLMs encode a vast amount of world knowledge, causal structure, and compositional reasoning in a form that transfers astonishingly well across domains. They are not RL systems. They are compression engines for human thought. The interesting question is whether RL can be used <em>on top of</em> this substrate (as in RLHF) rather than as a foundation — and whether that hybrid can generalize in ways neither component could alone.
          </p>

          <p>
            <strong>Causal RL and world models.</strong> Work on model-based RL, particularly systems like Dreamer, and on causal representation learning, points toward agents that build structured internal models rather than memorizing stimulus-response mappings. This is a much harder optimization target, but it may be the right one.
          </p>

          <p>
            <strong>Meta-learning.</strong> Learning to learn — rather than learning a fixed policy — is a structural shift that directly targets the sample efficiency and transfer problems. Systems like MAML frame the goal as finding parameter initializations that can adapt rapidly to new tasks from a small number of examples. This is closer in spirit to how biological learning seems to work.
          </p>

          <hr className="border-[#e5e7eb] my-2" />

          {/* ── Conclusion ── */}
          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-2">The uncomfortable conclusion</h2>

          <p>
            I want to end with the thing I actually believe, stated plainly: reinforcement learning is a tool for solving well-specified optimization problems in known environments. It is a remarkable tool. It has produced systems that beat the best humans at Go, Dota 2, and StarCraft. It will continue to produce remarkable engineering achievements.
          </p>

          <p>
            But AGI — if it's possible at all — is not a well-specified optimization problem. It is not a problem with a fixed reward function, a stationary environment, and an infinite supply of training rollouts. It is the problem of building something that can understand, learn, and reason across the entire messy complexity of the world the way humans do.
          </p>

          <p>
            The reason I care about this isn't defeatism. It's the opposite. If we correctly identify why our current tools fall short, we can build better ones. The history of science is mostly the history of finding out that the intuitive framework was wrong, and then building a better one. I think we're at that moment in AI.
          </p>

          <p>
            Traditional RL got us here. Getting further will require something different.
          </p>

        </div>
      )
    },
    'converting-netlist-to-vcd-and-vcd-to-saif': {
      title: 'Converting Netlist to VCD and VCD to SAIF: An Open Source Flow',
      content: (
        <div className="text-sm lg:text-[16px] leading-[1.9] space-y-6">
          <p>
            In the world of digital ASIC design, getting to a placed and routed netlist is a massive achievement. But your job isn't done yet. One crucial question remains: <strong>How much power will this chip consume?</strong>
          </p>

          <p>
            To answer this accurately using static power analysis tools (like OpenSTA within OpenROAD), you can't just look at the static netlist. You need to know how often the signals are actually switching. You need <strong>dynamic toggle activity</strong>.
          </p>

          <p>
            In commercial flows, this is standard. In the open-source ecosystem, it used to be a significant hurdle. Today, thanks to tools like Icarus Verilog and a fantastic utility called <strong>wave2saif</strong>, we have a robust, fully open-source path to generate this data.
          </p>

          <p>
            This post will guide you through the flow of simulating a gate-level netlist to generate a VCD file, and converting that VCD into the SAIF format required by power analysis tools.
          </p>

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">The Acronyms: VCD vs. SAIF</h2>

          <p>
            Before diving into the tools, let's clarify what we are generating.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>VCD (Value Change Dump)</strong>: An ASCII-based format that records every single signal change at specific timestamps during a simulation. It is extremely detailed and, consequently, can become massive (gigabytes or even terabytes) for long simulations.
            </li>
            <li>
              <strong>SAIF (Switching Activity Interchange Format)</strong>: An industry-standard format optimized for power analysis. Instead of recording when every event happens, it records probabilities: how much time a signal spent high (T1), how much time it spent low (T0), and how many times it toggled (TC). It is significantly smaller and faster for power tools to parse.
            </li>
          </ul>

          <p>
            Our goal is to use simulation to get the detailed VCD, and then condense it into SAIF.
          </p>

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">The Open Source Toolchain</h2>

          <p>
            To achieve this flow, we need three main components:
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>The Simulator</strong>: Icarus Verilog (iverilog/vvp). The standard for open-source Verilog simulation.
            </li>
            <li>
              <strong>The Bridge</strong>: wave2saif. A crucial tool that parses VCD and calculates the SAIF probabilities.
            </li>
            <li>
              <strong>The Data</strong>: Your gate-level netlist (e.g., output from OpenROAD), standard cell Verilog models (e.g., SkyWater 130), and a testbench.
            </li>
          </ol>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-4">Setting up wave2saif</h3>

          <p>
            While Icarus Verilog is available in most package managers, wave2saif is a newer, specialized tool developed by the Surfer Project. It fills a critical gap in the open-source flow.
          </p>

          <p>
            You will need to grab the binaries or build it from source.
          </p>

          <p>
            👉 <a href="https://gitlab.com/surfer-project/wave2saif" target="_blank" rel="noopener noreferrer" className="text-[#1e40af] hover:underline">Download wave2saif here</a>
          </p>

          <p>
            Check their releases page for pre-built binaries appropriate for your OS, or follow their instructions to build using Rust's cargo.
          </p>

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">The Workflow: Step-by-Step</h2>

          <p>
            The process involves two distinct phases: running the simulation and performing the conversion.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-4">Phase 1: Gate-Level Simulation (Netlist to VCD)</h3>

          <p>
            To get accurate switching activity, we must simulate the post-implementation netlist, not the RTL. This means the simulator needs to know about the actual standard cells used (AND gates, Flip-Flops, etc.).
          </p>

          <p>
            We use Icarus Verilog in two stages: compilation (iverilog) and execution (vvp).
          </p>

          <h4 className="text-lg lg:text-xl font-semibold mt-4 mb-2">1. Compilation</h4>
          <p className="mb-2">We combine the testbench, the design netlist, and the standard cell behavioral models.</p>
          
          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`iverilog -o sim_gate.out \\
    -DFUNCTIONAL -DUNIT_DELAY=#1 \\
    testbench.v \\
    design.nl.v \\
    primitives.v \\
    sky130_fd_sc_hd.v`}
          </pre>

          <h4 className="text-lg lg:text-xl font-semibold mt-4 mb-2">2. Execution</h4>
          <p className="mb-2">We run the compiled executable. The testbench must be set up to dump VCD data (usually using $dumpfile and $dumpvars system tasks in Verilog).</p>
          
          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`vvp sim_gate.out`}
          </pre>

          <p>
            This leads to the generation of a potentially very large .vcd file.
          </p>

          <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-4">Phase 2: The Conversion (VCD to SAIF)</h3>

          <p>
            This is where wave2saif shines. It reads the massive time-domain VCD file and calculates the toggle statistics needed for SAIF.
          </p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`/path/to/wave2saif -o design.saif output.vcd`}
          </pre>

          <p>
            The resulting .saif file is compact and ready to be fed into a power analysis engine.
          </p>

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Automating the Flow with Python</h2>

          <p>
            Doing these steps manually for every design iteration is tedious and error-prone, especially when dealing with complex file paths or designs that require firmware loading (like a RISC-V CPU).
          </p>

          <p>
            Below is a Python script that automates this entire process. It handles defining paths based on the design name, compiling the right files, managing optional firmware hex files, running the simulation, and finally, executing the VCD-to-SAIF conversion.
          </p>

          <p>
            Review the script below to see how it orchestrates the command-line tools we just discussed.
          </p>

          <pre className="bg-[#f5f5f5] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`import os
import subprocess
import sys

# --- Configuration and Argument Parsing ---
if len(sys.argv) < 2:
    print("Error: You must provide the Run Tag as an argument!")
    print("Usage: python gen_saif.py <RUN_TAG> (e.g., picorv32_run1)")
    sys.exit(1)

FILENAME = sys.argv[1]  # Example input: "picorv32_test_run"

# Configuration mapping for different design needs
DESIGN_CONFIG = {
    "picorv32": {
        "tb_file": "testbench.v",
        "vcd_file": "testbench.vcd",
        "needs_firmware": True
    },
    "aes": {
        "tb_file": "tb_aes.v",
        "vcd_file": "tb_aes.vcd",
        "needs_firmware": False # AES is hardware-only, no C code needed
    }
}

# --- Path Definitions ---
PROJECT_ROOT = os.getcwd()
# Assuming a standard OpenLane/OpenROAD directory structure
RUN_DIR = os.path.join(PROJECT_ROOT, "runs", FILENAME)
PLACEMENT_DIR = os.path.join(RUN_DIR, "11-openroad-detailedplacement")

# Extract design name from the run tag (assuming "designname_tag" format)
DESIGN_NAME = FILENAME.split("_")[0]
DESIGN_SRC_DIR = os.path.join(PROJECT_ROOT, "designs", DESIGN_NAME)

if DESIGN_NAME not in DESIGN_CONFIG:
    print(f"Error: Design '{DESIGN_NAME}' not found in DESIGN_CONFIG.")
    sys.exit(1)

current_config = DESIGN_CONFIG[DESIGN_NAME]

# Input Files
NETLIST_PATH = os.path.join(PLACEMENT_DIR, f"{DESIGN_NAME}.nl.v")
TESTBENCH_PATH = os.path.join(DESIGN_SRC_DIR, "tb", current_config["tb_file"])
FIRMWARE_PATH = os.path.join(DESIGN_SRC_DIR, "firmware", "firmware.hex")
# Standard Cell PDK models
PRIMITIVES_PATH = os.path.join(PROJECT_ROOT , "designs" , "primitives.v")
SKY130_PATH = os.path.join(PROJECT_ROOT,  "designs", "sky130_fd_sc_hd.v")

# Tools
# Ensure wave2saif binary is placed here or change path
WAVE2SAIF_PATH = os.path.join(PROJECT_ROOT,  "wave2saif")

# Output files (Saved inside the run folder for organization)
SIM_EXEC = os.path.join(RUN_DIR, "sim_gate.out")
VCD_FILE = os.path.join(RUN_DIR, current_config["vcd_file"])
SAIF_FILE = os.path.join(RUN_DIR, f"{DESIGN_NAME}.saif")


def run_command(cmd, cwd=None):
    """Helper to run shell commands and verify success"""
    print(f"[RUNNING]: {' '.join(cmd)}")
    try:
        # capture_output=True hides stdout unless there's an error.
        # Change to False to see simulator output in real-time.
        result = subprocess.run(cmd, cwd=cwd, check=True, text=True, capture_output=True)
        # print(result.stdout) # Uncomment for verbose logs during runs
    except subprocess.CalledProcessError as e:
        print(f"[ERROR]: Command failed!\\n{e.stderr}")
        sys.exit(1)

# --- Main Execution Flow ---

print(f"--- Starting SAIF Generation flow for design: {DESIGN_NAME} ---")

# 1. Compile with Icarus Verilog (iverilog)
print("Step 1: Compiling Netlist and Testbench...")
iverilog_cmd = [
    "iverilog",
    "-o", SIM_EXEC,
    "-DFUNCTIONAL",     # Standard defines for gate-level sim
    "-DUNIT_DELAY=#1",
    TESTBENCH_PATH,
    NETLIST_PATH,
    PRIMITIVES_PATH,
    SKY130_PATH
]
run_command(iverilog_cmd)


# Ensure wave2saif executable permissions
if os.path.exists(WAVE2SAIF_PATH):
    subprocess.run(["chmod", "+x", WAVE2SAIF_PATH])
else:
    print(f"[ERROR] wave2saif tool not found at specified path: {WAVE2SAIF_PATH}")
    print("Please download binaries from https://gitlab.com/surfer-project/wave2saif")
    sys.exit(1)


# 2. Run Simulation (vvp) to generate VCD
print(f"Step 2: Running simulation to generate {VCD_FILE}...")
vvp_cmd = ["vvp", SIM_EXEC]

# Handle optional firmware loading for CPU designs
if current_config["needs_firmware"]:
    if not os.path.exists(FIRMWARE_PATH):
        print(f"[ERROR]: Firmware hex file not found at {FIRMWARE_PATH}")
        sys.exit(1)
    # Passing firmware path as an argument to the simulation
    vvp_cmd.append(f"+firmware={FIRMWARE_PATH}")

# Run VVP inside the RUN_DIR so VCD is dumped there correctly
run_command(vvp_cmd, cwd=RUN_DIR)

# Verify VCD was created
if not os.path.exists(VCD_FILE):
    print(f"[ERROR] VCD file was not generated at {VCD_FILE}. Check simulation logs.")
    sys.exit(1)


# 3. Convert VCD to SAIF (wave2saif)
print(f"Step 3: Converting VCD to SAIF...")
wave2saif_cmd = [
    WAVE2SAIF_PATH,
    "-o", SAIF_FILE,
    VCD_FILE
]
run_command(wave2saif_cmd)

print(f"--- SUCCESS ---")
print(f"SAIF file generated at: {SAIF_FILE}")
# Optional: Clean up the massive VCD file to save space
# os.remove(VCD_FILE)`}
          </pre>

          <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4">Conclusion</h2>

          <p>
            Thanks to the maturation of open-source tools and utility players like wave2saif, gathering accurate power data for your ASIC designs is no longer blocked by expensive license fees. By combining Icarus Verilog for simulation and wave2saif for data condensation, you can generate the inputs necessary for advanced power analysis in OpenROAD.
          </p>
        </div>
      )
    }
  };

  const currentBlog = blogContent[slug];

  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-white text-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[#1e40af] hover:text-[#1e3a8a] mb-8 transition-colors"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Blog Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#1e40af] hover:text-[#1e3a8a] mb-8 transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">
            {currentBlog.title}
          </h1>

          {currentBlog.content}
        </article>
      </div>
    </div>
  );
}
