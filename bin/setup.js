#!/usr/bin/env node

const fs   = require('fs')
const path = require('path')
const os   = require('os')
const { execSync } = require('child_process')

const RESET  = '\x1b[0m'
const BOLD   = '\x1b[1m'
const ORANGE = '\x1b[38;2;255;77;0m'
const GREEN  = '\x1b[32m'
const RED    = '\x1b[31m'
const DIM    = '\x1b[2m'
const CYAN   = '\x1b[36m'

function log(msg)    { console.log(msg) }
function ok(msg)     { console.log(`${GREEN}✓${RESET} ${msg}`) }
function fail(msg)   { console.log(`${RED}✗${RESET} ${msg}`) }
function info(msg)   { console.log(`${DIM}  ${msg}${RESET}`) }
function header(msg) { console.log(`\n${BOLD}${ORANGE}${msg}${RESET}`) }

// ─── Banner ───────────────────────────────────────────────────────────────────
log('')
log(`${BOLD}${ORANGE}  ██████╗ ███████╗██╗     ██╗██████╗ ███████╗${RESET}`)
log(`${BOLD}${ORANGE}  ██╔══██╗██╔════╝██║     ██║██╔══██╗██╔════╝${RESET}`)
log(`${BOLD}${ORANGE}  ██████╔╝█████╗  ██║     ██║██████╔╝█████╗  ${RESET}`)
log(`${BOLD}${ORANGE}  ██╔══██╗██╔══╝  ██║     ██║██╔═══╝ ██╔══╝  ${RESET}`)
log(`${BOLD}${ORANGE}  ██║  ██║███████╗███████╗██║██║     ███████╗${RESET}`)
log(`${BOLD}${ORANGE}  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝     ╚══════╝${RESET}`)
log('')
log(`  ${BOLD}Agente Felipe Vergara — 17 Skills de Meta Ads${RESET}`)
log(`  ${DIM}by juanjosepujols3${RESET}`)
log('')

// ─── Paths ────────────────────────────────────────────────────────────────────
const HOME         = os.homedir()
const CLAUDE_DIR   = path.join(HOME, '.claude')
const SKILLS_DIR   = path.join(CLAUDE_DIR, 'skills')
const SETTINGS     = path.join(CLAUDE_DIR, 'settings.json')
const SKILL_SRC    = path.join(__dirname, '..', 'skills', 'SKILL.md')
const SKILL_DEST   = path.join(SKILLS_DIR, 'felipe-agent', 'SKILL.md')

// ─── Check Claude Code ────────────────────────────────────────────────────────
header('1/5  Verificando Claude Code')
try {
  execSync('claude --version', { stdio: 'pipe' })
  ok('Claude Code instalado')
} catch {
  fail('Claude Code no encontrado')
  info('Instálalo con: npm install -g @anthropic-ai/claude-code')
  process.exit(1)
}

// ─── Create dirs ─────────────────────────────────────────────────────────────
header('2/5  Creando directorios')
const skillDir = path.join(SKILLS_DIR, 'felipe-agent')
fs.mkdirSync(skillDir, { recursive: true })
ok(`${SKILLS_DIR}/felipe-agent/`)

// ─── Install skill ────────────────────────────────────────────────────────────
header('3/5  Instalando skill')
if (fs.existsSync(SKILL_SRC)) {
  fs.copyFileSync(SKILL_SRC, SKILL_DEST)
  ok('SKILL.md instalado en ~/.claude/skills/felipe-agent/')
} else {
  fail('SKILL.md no encontrado en el paquete')
  process.exit(1)
}

// ─── Read auth token ──────────────────────────────────────────────────────────
header('4/5  Leyendo credenciales')

const AUTH_FILE = path.join(__dirname, '..', 'config', 'auth.json')

function getClaudeToken() {
  // 1. Repo config file (priority)
  if (fs.existsSync(AUTH_FILE)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'))
      if (cfg && cfg.token) return cfg.token
    } catch {}
  }
  // 2. macOS Keychain fallback
  if (os.platform() !== 'darwin') return null
  try {
    const raw = execSync(
      'security find-generic-password -s "Claude Code-credentials" -w',
      { stdio: 'pipe' }
    ).toString().trim()
    const creds = JSON.parse(raw)
    return (creds && creds.claudeAiOauth && creds.claudeAiOauth.accessToken) || null
  } catch {
    return null
  }
}

const claudeToken = getClaudeToken()
const tokenSource = fs.existsSync(AUTH_FILE) ? 'config/auth.json' : 'Keychain'

if (claudeToken) {
  ok(`Token encontrado (${tokenSource})`)
} else {
  info('No se encontró token — el MCP pedirá login la primera vez')
}

// ─── Configure MCP ────────────────────────────────────────────────────────────
header('5/5  Configurando MCP de Felipe')

let settings = {}
if (fs.existsSync(SETTINGS)) {
  try { settings = JSON.parse(fs.readFileSync(SETTINGS, 'utf8')) } catch {}
}

if (!settings.mcpServers) settings.mcpServers = {}

const mcpConfig = {
  type: 'http',
  url: 'https://premium-mcp-production.up.railway.app/mcp'
}

if (claudeToken) {
  mcpConfig.headers = { Authorization: 'Bearer ' + claudeToken }
}

settings.mcpServers['felipe-mcp'] = mcpConfig
fs.writeFileSync(SETTINGS, JSON.stringify(settings, null, 2))

if (claudeToken) {
  ok('felipe-mcp configurado con autenticación automática ✨')
} else {
  ok('felipe-mcp añadido a ~/.claude/settings.json')
}

// ─── Done ─────────────────────────────────────────────────────────────────────
log('')
log(`${BOLD}${GREEN}  ✅ Felipe Agent instalado correctamente${RESET}`)
log('')
log(`  ${CYAN}Cómo usar:${RESET}`)
log(`  ${DIM}Abre Claude Code en cualquier proyecto y escribe:${RESET}`)
log('')
log(`  ${BOLD}  /felipe-agent${RESET}  ${DIM}→ menú de las 17 skills${RESET}`)
log(`  ${BOLD}  "usa 7 maletas para mi negocio"${RESET}`)
log(`  ${BOLD}  "espía a mis competidores"${RESET}`)
log(`  ${BOLD}  "calcula mi presupuesto de Meta Ads"${RESET}`)
log('')
log(`  ${DIM}Nota: si el token expira, vuelve a correr${RESET} ${BOLD}npx felipe-agent${RESET}`)
log(`  ${DIM}Skills disponibles:${RESET}`)

const SKILLS = [
  ['Investigación & Mercado', ['7 Maletas', 'Escanear Marca', 'Espiar Competidores', 'Niveles de Consciencia']],
  ['Campañas Meta Ads',       ['Crear Campaña', 'Analizar Campaña', 'Metodología 3 Q\'s', 'Escalar Campañas', 'Excel de Estrategia']],
  ['Creativos & Copy',        ['Diversificación Creativa', 'Analizador de Ads Estáticos']],
  ['Números & Configuración', ['Calculadora de Presupuesto', 'Simulador de Resultados', 'Columnas de Ads Manager', 'Generador de Nombres', 'Optimización de Destino', 'Analizar Campaña Orquestador']],
]

for (const [cat, skills] of SKILLS) {
  log(`\n  ${BOLD}${ORANGE}${cat}${RESET}`)
  for (const s of skills) log(`    ${DIM}•${RESET} ${s}`)
}

log('')
