-- ============================================================
-- Tabla: informes_semanales
-- Descripción: Almacena los informes normativos semanales PRL
--              para los sectores de construcción y metal.
-- ============================================================

CREATE TABLE IF NOT EXISTS informes_semanales (
    id              SERIAL PRIMARY KEY,
    semana_inicio   DATE NOT NULL,
    semana_fin      DATE NOT NULL,
    titulo          VARCHAR(255) NOT NULL,
    ambito          VARCHAR(100) NOT NULL DEFAULT 'España y Región de Murcia',
    resumen         TEXT,
    contenido_md    TEXT,
    url_pdf         VARCHAR(500),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS novedades_informe (
    id              SERIAL PRIMARY KEY,
    informe_id      INT REFERENCES informes_semanales(id) ON DELETE CASCADE,
    categoria       VARCHAR(50) NOT NULL,  -- 'BOE', 'BORM', 'INSST', 'MURCIA', 'SECTORIAL'
    titulo          VARCHAR(255) NOT NULL,
    descripcion     TEXT,
    urgencia        VARCHAR(20) DEFAULT 'MEDIA', -- 'ALTA', 'MEDIA', 'BAJA'
    impacto_sector  VARCHAR(50),  -- 'CONSTRUCCION', 'METAL', 'AMBOS'
    url_fuente      VARCHAR(500),
    fecha_publicacion DATE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Datos del informe semanal: 31/03/2026 - 06/04/2026
-- ============================================================

INSERT INTO informes_semanales
    (semana_inicio, semana_fin, titulo, ambito, resumen, url_pdf)
VALUES (
    '2026-03-31',
    '2026-04-06',
    'Informe Semanal de Novedades Normativas PRL: Construcción y Metal — Semana del 31 de marzo al 6 de abril de 2026',
    'España y Región de Murcia',
    'Semana marcada por la apertura del trámite de audiencia pública del anteproyecto de reforma de la LPRL, la publicación de la nueva Guía Técnica del INSST sobre vibraciones mecánicas y el cierre temporal de la sede del ISSL en Murcia en un contexto de preocupante aumento de la siniestralidad laboral regional.',
    '/informes/informe_semanal_prl_2026_04_06.pdf'
);

-- Novedades del informe (semana 31/03 - 06/04/2026)
-- Se asume que el informe recién insertado tiene id=1; ajustar si es necesario.

INSERT INTO novedades_informe
    (informe_id, categoria, titulo, descripcion, urgencia, impacto_sector, url_fuente, fecha_publicacion)
VALUES
(
    1,
    'NORMATIVA_NACIONAL',
    'Anteproyecto de Reforma de la Ley de Prevención de Riesgos Laborales (LPRL)',
    'El Ministerio de Trabajo ha abierto el trámite de audiencia pública del borrador del anteproyecto que modificará la Ley 31/1995, el Estatuto de los Trabajadores y el Reglamento de los Servicios de Prevención. Introduce riesgos psicosociales, cambio climático, perspectiva de género/edad, nueva figura de agentes territoriales de prevención y reduce el umbral para SPP en actividades del Anexo I a 150 trabajadores.',
    'ALTA',
    'AMBOS',
    'https://www.canalprl.com/2026/03/24/borrador-del-anteproyecto-de-ley-por-el-que-se-modifican-la-ley-de-prevencion-de-riesgos-laborales-el-estatuto-de-los-trabajadores-y-el-reglamento-de-los-servicios-de-prevencion/',
    '2026-03-16'
),
(
    1,
    'INSST',
    'Nueva Guía Técnica INSST sobre Vibraciones Mecánicas',
    'El INSST ha presentado la actualización de la Guía técnica para la evaluación y prevención de los riesgos relacionados con las vibraciones mecánicas, 15 años después de su primera edición. Solo el 61% de empresas con exposición confirmada habían identificado el riesgo y apenas el 12% había realizado evaluación específica. Incluye herramienta BaseVibra para PYMEs y nuevo protocolo de vigilancia sanitaria del Ministerio de Sanidad.',
    'ALTA',
    'AMBOS',
    'https://www.insst.es/noticias-insst/el-insst-alerta-sobre-los-riesgos-relacionados-con-las-vibraciones-en-el-trabajo-y-presenta-nuevas-herramientas-para-asegurar-una-protecci%C3%B3n-eficaz-de-las-personas-trabajadoras',
    '2026-03-30'
),
(
    1,
    'INSST',
    'Límites de Exposición Profesional para Agentes Químicos 2026',
    'Publicación de los LEP para agentes químicos en España 2026, aprobados el 30 de enero de 2026 por la CNSST. Actualización de la aplicación BDLEP. Especialmente relevante para empresas de metal (soldadura, tratamientos superficiales) y construcción (polvo de sílice, disolventes).',
    'ALTA',
    'AMBOS',
    'https://www.insst.es/noticias-insst',
    '2026-03-24'
),
(
    1,
    'MURCIA',
    'Cierre temporal de la sede del ISSL en El Palmar (Murcia)',
    'La sede del Instituto de Seguridad y Salud Laboral de la Región de Murcia ha cerrado temporalmente. El Gobierno regional lo atribuye a obras preventivas y planificadas; CCOO lo denuncia como consecuencia de un peligro grave e inminente y años de abandono. El personal opera en teletrabajo o reubicado. Contexto: 37 fallecimientos laborales en Murcia en 2025, frente a 21 en 2024.',
    'ALTA',
    'AMBOS',
    'https://murcia.empresas.de/ccoo-afirma-que-el-cierre-del-instituto-de-seguridad-laboral-se-debe-a-un-peligro-grave-e-inminente/',
    '2026-03-30'
),
(
    1,
    'SECTORIAL',
    'Preocupación en la construcción por el aumento del absentismo laboral',
    'Según el primer informe sectorial de la Confederación Nacional de la Construcción (CNC), el absentismo laboral se ha duplicado en la última década, con una tasa media superior al 6% (hasta el 15% en algunas empresas). Coste anual estimado: 3.565 millones de euros. Cada asalariado pierde una media de 113 horas anuales (14 jornadas). Las PYMEs soportan dos tercios del coste total.',
    'MEDIA',
    'CONSTRUCCION',
    'https://www.orm.es/noticias/preocupacion-en-la-construccion-por-el-aumento-del-absentismo-laboral/',
    '2026-04-05'
),
(
    1,
    'BOE',
    'BOE semana 31/03 - 06/04/2026: Sin novedades PRL específicas para construcción/metal',
    'La revisión del BOE durante la semana del 31 de marzo al 6 de abril de 2026 no ha arrojado la publicación de nuevos convenios colectivos sectoriales de ámbito estatal ni disposiciones normativas específicas de PRL para los sectores de construcción o metal.',
    'BAJA',
    'AMBOS',
    'https://www.boe.es',
    '2026-04-06'
),
(
    1,
    'BORM',
    'BORM semana 31/03 - 06/04/2026: Sin novedades PRL específicas para construcción/metal',
    'La revisión del Boletín Oficial de la Región de Murcia durante la semana del 31 de marzo al 6 de abril de 2026 no ha arrojado la publicación de nuevos convenios colectivos provinciales ni acuerdos específicos de PRL para los sectores de construcción o metal en la Región de Murcia.',
    'BAJA',
    'AMBOS',
    'https://www.borm.es',
    '2026-04-06'
);
