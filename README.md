# Felipe Agent

Agente Claude Code con las 17 skills de Felipe Vergara. Instalación en un comando, sin login, sin configuración manual.

## Instalación

```bash
git clone git@github.com:juanjosepujols3/felipe-agent.git
node felipe-agent/bin/setup.js
```

Eso es todo. El script:
- Verifica que tengas Claude Code instalado
- Instala la skill en `~/.claude/skills/felipe-agent/`
- Configura el MCP de Felipe con autenticación automática

## Uso en Claude Code

Después de instalar, en cualquier proyecto:

```
/felipe-agent           → muestra el menú completo
"usa 7 maletas para mi negocio en [URL]"
"espía a mis competidores"
"calcula mi presupuesto de Meta Ads"
"analiza este anuncio" + adjunta imagen
"revisa mis campañas" + adjunta CSV de Ads Manager
```

## Skills disponibles (17)

### Investigación & Mercado
| Skill | Qué hace |
|---|---|
| **7 Maletas** | Investiga clientes, competidores, reviews, redes sociales y anuncios |
| **Escanear Marca** | ADN de marca: colores, tono, avatar, propuesta de valor |
| **Espiar Competidores** | Anuncios activos en Meta Ad Library + IG + TikTok |
| **Niveles de Consciencia** | Diagnóstico de mercado frío/caliente + copy persuasivo |

### Campañas Meta Ads
| Skill | Qué hace |
|---|---|
| **Crear Campaña** | Estrategia completa desde cero (metodología Felipe) |
| **Analizar Campaña** | Diagnóstico con las 3 Q's |
| **Metodología 3 Q's** | Análisis vía CSV exportado de Ads Manager |
| **Escalar Campañas** | Plan de escalado vertical y horizontal |
| **Excel de Estrategia** | Estructura PECA con presupuestos, públicos y exclusiones |

### Creativos & Copy
| Skill | Qué hace |
|---|---|
| **Diversificación Creativa** | Matriz de 30 hooks con 16 Deseos de Reiss |
| **Analizador de Ads Estáticos** | Deconstrucción de 31 secciones de un anuncio |

### Números & Configuración
| Skill | Qué hace |
|---|---|
| **Calculadora de Presupuesto** | ROAS objetivo, número mágico, costo por resultado |
| **Simulador de Resultados** | 3 escenarios: conservador / moderado / optimista |
| **Columnas de Ads Manager** | Configuración exacta por tipo de campaña |
| **Generador de Nombres** | Nomenclatura estándar para campañas, adsets y anuncios |
| **Optimización de Destino** | Auditoría de landing pages, WhatsApp y formularios |
| **Analizar Campaña Orquestador** | Diagnóstico completo end-to-end |

## Requisitos

- Node.js 18+
- [Claude Code](https://claude.ai/code) instalado (`npm install -g @anthropic-ai/claude-code`)
- Acceso a este repo (repo privado — pide acceso al dueño)

## Estructura del repo

```
felipe-agent/
  bin/
    setup.js       ← instalador
  config/
    auth.json      ← API key (no compartir fuera del equipo)
  skills/
    SKILL.md       ← skill de Claude Code con las 17 skills
  package.json
  README.md
```
