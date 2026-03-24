CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE empresas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE riesgos (
    id SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL,
    nivel INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE evaluaciones_riesgo (
    id SERIAL PRIMARY KEY,
    riesgo_id INT REFERENCES riesgos(id),
    usuario_id INT REFERENCES usuarios(id),
    evaluacion TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medidas_preventivas (
    id SERIAL PRIMARY KEY,
    evaluacion_id INT REFERENCES evaluaciones_riesgo(id),
    medida TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inscripciones_cursos (
    id SERIAL PRIMARY KEY,
    curso_id INT REFERENCES cursos(id),
    usuario_id INT REFERENCES usuarios(id),
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE incidentes (
    id SERIAL PRIMARY KEY,
    empresa_id INT REFERENCES empresas(id),
    descripcion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auditorias (
    id SERIAL PRIMARY KEY,
    empresa_id INT REFERENCES empresas(id),
    resultado TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);