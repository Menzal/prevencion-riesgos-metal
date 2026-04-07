# Portal PRL: Prevención de Riesgos Laborales — Construcción y Metal

Sistema de gestión de información sobre Prevención de Riesgos Laborales (PRL) para los sectores de la construcción y la industria del metal, con especial atención a la Región de Murcia.

## Funcionalidades

- Gestión de riesgos laborales por sector y ubicación.
- Registro de cursos de formación PRL y gestión de inscripciones.
- Gestión de usuarios y empresas.
- **Informes semanales de novedades normativas** (BOE, BORM, INSST, medios especializados).

## API Endpoints

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| GET | `/api/informes` | Todos los informes semanales |
| GET | `/api/informes/ultimo` | Último informe semanal publicado |
| GET | `/api/informes/:id` | Informe por ID con sus novedades |
| POST | `/api/informes` | Crear nuevo informe semanal |
| GET | `/api/riesgos` | Listado de riesgos |
| GET | `/api/cursos` | Listado de cursos |
| GET | `/api/usuarios` | Listado de usuarios |
| GET | `/health` | Estado del servidor |

## Informes Semanales Disponibles

| Semana | Título | Novedades Clave |
| ------ | ------ | --------------- |
| 31/03 – 06/04/2026 | Informe Semanal PRL — Construcción y Metal | Anteproyecto reforma LPRL · Nueva Guía Técnica Vibraciones INSST · LEP Agentes Químicos 2026 · Cierre ISSL Murcia |

## Instalación

```bash
npm install
cp .env.example .env
# Configurar DATABASE_URL en .env
npm run dev
```

## Base de Datos

Ejecutar los scripts SQL en orden:

```bash
psql -U <usuario> -d <base_de_datos> -f src/database/schema.sql
psql -U <usuario> -d <base_de_datos> -f src/database/informes_semanales.sql
psql -U <usuario> -d <base_de_datos> -f src/database/data-metal.sql
```
