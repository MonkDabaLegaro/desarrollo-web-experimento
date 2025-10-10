/*
  # Crear tabla de siniestros

  1. Nueva Tabla
    - `siniestros`
      - `id` (uuid, primary key) - Identificador único del siniestro
      - `rut` (text) - RUT del asegurado
      - `nombre_completo` (text) - Nombre completo del asegurado
      - `direccion` (text) - Dirección del asegurado
      - `telefono` (text) - Teléfono de contacto
      - `correo` (text) - Correo electrónico
      - `numero_poliza` (text) - Número de póliza del seguro
      - `tipo_seguro` (text) - Tipo de seguro contratado
      - `marca` (text) - Marca del vehículo
      - `modelo` (text) - Modelo del vehículo
      - `patente` (text) - Patente del vehículo
      - `ano` (text) - Año del vehículo
      - `descripcion_siniestro` (text) - Descripción del siniestro
      - `estado` (text) - Estado actual del siniestro
      - `liquidador` (text) - Liquidador asignado
      - `grua` (text) - Grúa asignada
      - `taller` (text) - Taller asignado
      - `created_at` (timestamptz) - Fecha de creación
      - `updated_at` (timestamptz) - Fecha de última actualización

  2. Seguridad
    - Habilitar RLS en la tabla `siniestros`
    - Políticas para usuarios autenticados:
      - Pueden ver todos los siniestros
      - Pueden crear nuevos siniestros
      - Pueden actualizar siniestros existentes
*/

CREATE TABLE IF NOT EXISTS siniestros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rut text NOT NULL,
  nombre_completo text NOT NULL,
  direccion text NOT NULL,
  telefono text NOT NULL,
  correo text NOT NULL,
  numero_poliza text NOT NULL,
  tipo_seguro text NOT NULL,
  marca text NOT NULL,
  modelo text NOT NULL,
  patente text NOT NULL,
  ano text NOT NULL,
  descripcion_siniestro text NOT NULL,
  estado text DEFAULT 'Ingresado',
  liquidador text,
  grua text,
  taller text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE siniestros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all siniestros"
  ON siniestros
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create siniestros"
  ON siniestros
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update siniestros"
  ON siniestros
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_siniestros_estado ON siniestros(estado);
CREATE INDEX IF NOT EXISTS idx_siniestros_created_at ON siniestros(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_siniestros_rut ON siniestros(rut);
CREATE INDEX IF NOT EXISTS idx_siniestros_poliza ON siniestros(numero_poliza);
