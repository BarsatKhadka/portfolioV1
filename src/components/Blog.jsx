import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Blog() {
  const { slug } = useParams();

  // Blog content mapping - can be extended for more blogs
  const blogContent = {
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
