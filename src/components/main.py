import random

FILENAME = "firmware.hex"
NUM_INSTRUCTIONS = 200  # Length of the simulation run

def emit(val):
    return f"{val:08x}"

# --- STANDARD INSTRUCTIONS ---
def add(rd, rs1, rs2): 
    return emit((0x00 << 25) | (rs2 << 20) | (rs1 << 15) | (0x0 << 12) | (rd << 7) | 0x33)

def xor(rd, rs1, rs2): 
    return emit((0x00 << 25) | (rs2 << 20) | (rs1 << 15) | (0x4 << 12) | (rd << 7) | 0x33)

def sw_safe(rs2, imm): 
    # Write to safe low memory (0-128)
    imm_low = imm & 0x1F
    imm_high = (imm >> 5) & 0x7F
    return emit((imm_high << 25) | (rs2 << 20) | (0x0 << 15) | (0x2 << 12) | (imm_low << 7) | 0x23)

def addi(rd, rs1, imm):
    imm = imm & 0xFFF
    return emit((imm << 20) | (rs1 << 15) | (0x0 << 12) | (rd << 7) | 0x13)

# --- THE "I PASSED" MAGIC SEQUENCE ---
def finish_sequence():
    seq = []
    # We need to write 123456789 (0x075BCD15) to 0x20000000
    
    # 1. Load Address 0x20000000 into x1
    # LUI x1, 0x20000 (0x20000 << 12 = 0x20000000)
    seq.append(emit(0x200000b7)) 
    
    # 2. Load Data 123456789 into x2
    # Value is large, so we construct it:
    # LUI x2, 0x075BD (Upper 20 bits roughly) -> 0x075BD000
    seq.append(emit(0x075bd137))
    # ADDI x2, x2, -747 (0xD15 is -747 in 12-bit signed math? No, let's be safer)
    # Let's just build it simply with ADDI to avoid signed math headaches in Python:
    # 123456789 = 0x075BCD15.
    # LUI x2, 0x075BC -> 0x075BC000
    seq.append(emit(0x075bc137)) 
    # ADDI x2, x2, 0xD15 (3349) -> This will overflow 12-bit immediate limits!
    
    # EASIER WAY: Construct 123456789 using shifts or small adds.
    # LUI x2, 0x075BC (Value: 123453440)
    # ADDI x2, x2, 0x68A (Value: 1674) -> Total: 123455114 (Still short)
    
    # OK, FORCE FEED WAY: 
    # Load 123456789 directly into memory address 0x0 (which is initialized to 0)
    # then load it into a register, then write it to the magic address.
    # Actually, let's just use the exact hex instruction for: LI x2, 123456789
    # The assembler usually splits this into LUI + ADDIW.
    # 123456789 = 0x075BCD15.
    # LUI loads upper 20 bits. Lower 12 bits is 0xD15 (which is -747 signed).
    # So we need LUI 0x075BD, ADDI -747.
    
    # LUI x2, 0x75BD 
    seq.append(emit(0x075bd137))
    # ADDI x2, x2, -747 (0xD15 sign extended is 0xFFFFF D15)
    # -747 = 0xD15. Instruction: (0xD15 << 20) | ...
    seq.append(emit(0xd1510113))

    # 3. Store x2 (Data) to 0(x1) (Address)
    # SW x2, 0(x1)
    seq.append(emit(0x0020a023))

    # 4. TRAP! (Crash the CPU to signal "Look at me!")
    # Illegal Instruction (0xFFFFFFFF)
    seq.append("ffffffff")
    
    return seq

# --- GENERATOR ---
print(f"Generating Smart {FILENAME}...")
lines = []

# 1. Init
for r in range(1, 11):
    lines.append(addi(r, 0, r*100))

# 2. Workload
for _ in range(NUM_INSTRUCTIONS): 
    op = random.choice(['math', 'mem'])
    rd = random.randint(3, 10)  # Don't touch x1/x2, we need them for finish
    rs1 = random.randint(3, 10)
    rs2 = random.randint(3, 10)
    
    if op == 'math':
        sub_op = random.choice([add, xor])
        lines.append(sub_op(rd, rs1, rs2))
    elif op == 'mem':
        safe_addr = random.randint(0, 32) * 4 
        lines.append(sw_safe(rs2, safe_addr))

# 3. Add The Handshake Sequence
lines.extend(finish_sequence())

with open(FILENAME, 'w') as f:
    for l in lines:
        f.write(l + "\n")

print(f"Done. Created {FILENAME} (Smart Mode).")