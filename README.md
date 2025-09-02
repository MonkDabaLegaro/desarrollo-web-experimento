# Sistema de Asistencia Vehicular

## Descripción del Proyecto

Este es un sistema web para gestionar siniestros vehiculares que permite a los usuarios (administradores y clientes) interactuar con el sistema de manera eficiente.

## ¿Qué es un Sistema de Gestión de Siniestros?

Un **siniestro** es un evento imprevisto (como un accidente de tránsito, robo, incendio) que afecta a un vehículo asegurado. Este sistema permite:

- **Registrar** nuevos siniestros cuando ocurren
- **Consultar** el estado de siniestros existentes  
- **Gestionar** el proceso desde el reporte hasta la resolución
- **Generar reportes** para análisis y estadísticas

## Estructura del Sistema

### Tipos de Usuario

1. **Administrador (Call Center)**
   - Usuario: `admin`
   - Contraseña: `1234`
   - Acceso completo al sistema
   - Puede registrar siniestros, consultar estados y ver reportes

2. **Cliente**
   - Usuario: `cliente` 
   - Contraseña: `5678`
   - Acceso limitado para consultar sus propios siniestros
   - Puede ver el estado de sus casos

### Páginas Principales

#### 1. Login (login.html)
- **Propósito**: Página de entrada al sistema donde los usuarios se autentican
- **Funcionalidad**: Verifica credenciales y redirige según el tipo de usuario
- **Tecnología**: HTML, CSS, JavaScript con localStorage para mantener la sesión

#### 2. Panel Administrador (admin.html)
- **Propósito**: Dashboard principal para administradores del call center
- **Funcionalidades**:
  - Ver estadísticas en tiempo real
  - Acceso rápido a todas las funciones
  - Historial de actividad reciente
- **Acceso**: Solo usuarios tipo "admin"

#### 3. Portal Cliente (cliente.html)  
- **Propósito**: Interfaz simplificada para clientes
- **Funcionalidades**:
  - Consultar estado de siniestros
  - Ver información de contacto
  - Acceso a servicios básicos
- **Acceso**: Solo usuarios tipo "cliente"

#### 4. Ingreso de Siniestro (ingreso.html)
- **Propósito**: Formulario para registrar nuevos siniestros
- **Datos requeridos**:
  - RUT del asegurado
  - Número de póliza
  - Tipo de daño y vehículo
  - Información de contacto
  - Documentos adjuntos (simulado)

#### 5. Consulta de Estado (consulta.html)
- **Propósito**: Permite consultar el progreso de un siniestro
- **Funcionalidad**: 
  - Búsqueda por RUT y número de póliza
  - Visualización del progreso con barra de estado
  - Información de grúa, taller y liquidador asignado

#### 6. Reportes (reporte.html)
- **Propósito**: Dashboard con gráficos y estadísticas
- **Incluye**: Gráficos de barras, circulares y de líneas para análisis

## Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura de las páginas
- **CSS3**: Estilos y diseño responsivo
- **JavaScript**: Lógica de la aplicación y manejo de datos

### Almacenamiento
- **localStorage**: Para simular una base de datos local
- **JSON**: Formato de datos para almacenar información de siniestros

## Base de Datos Simulada

### Estructura de Datos (ejemplo_registro.txt)
El archivo `ejemplo_registro.txt` define la estructura de datos que simula una base de datos:

```
ID_usuario|RUT|Nombre|Correo|Teléfono|Dirección|Nro_Póliza|Inicio_Cobertura|Fin_Cobertura|Tipo_Cobertura|Patente|ID_Siniestro|Fecha_Siniestro|Hora_Siniestro|Lugar_Siniestro|Descripción_Evento|Estado_Siniestro|Observaciones|Liquidador|Grúa_Patente|Chofer_Grúa|Punto_Retiro|Punto_Destino|Taller|Fecha_Ingreso_Taller|Acta_Recepción|Presupuesto_Monto|Presupuesto_Descripción|Presupuesto_Tiempo|Presupuesto_Doc|Fecha_Entrega_Estimada|Fecha_Entrega_Real|Acta_Retiro|Acta_Rechazo|Fecha_Registro
```

### Campos Importantes

- **RUT**: Identificador único del cliente (formato chileno con validación)
- **Número de Póliza**: Identificador de la póliza de seguro
- **Estado del Siniestro**: Puede ser "Ingresado", "En Evaluación", "Finalizado"
- **Liquidador**: Persona asignada para evaluar el siniestro
- **Grúa/Taller**: Servicios asignados para la atención

## Flujo de Trabajo

### 1. Proceso de Login
1. Usuario ingresa credenciales en `login.html`
2. Sistema valida usuario y contraseña
3. Se guarda el tipo de usuario en localStorage
4. Redirección automática según el tipo:
   - Admin → `admin.html`
   - Cliente → `cliente.html`

### 2. Registro de Siniestro (Solo Administradores)
1. Acceso desde el panel admin a `ingreso.html`
2. Completar formulario con datos del cliente y siniestro
3. Validación automática del RUT chileno
4. Asignación automática de liquidador, grúa y taller
5. Guardado en localStorage simulando base de datos

### 3. Consulta de Estado
1. Ingreso de RUT y número de póliza
2. Búsqueda en la "base de datos" local
3. Visualización del progreso con iconos:
   - 📁 `folder.png`: Datos ingresados
   - 📋 `list.png`: En proceso
   - ✅ `Checkmark.png`: Completado

## Características Técnicas

### Validación de RUT
El sistema incluye validación completa del RUT chileno:
- Formato correcto (12.345.678-9)
- Cálculo y verificación del dígito verificador
- Formateo automático con puntos y guión

### Gestión de Sesiones
- Uso de `localStorage` para mantener la sesión activa
- Verificación automática de autenticación en cada página
- Redirección inteligente después del login

### Diseño Responsivo
- Compatible con dispositivos móviles y desktop
- Uso de CSS Grid y Flexbox para layouts adaptativos
- Colores y tipografía profesional

## Próximos Pasos

### Fase 1: Estructura Básica ✅
- [x] Arreglar sistema de login
- [x] Conectar páginas de bienvenida
- [x] Crear paneles diferenciados por tipo de usuario

### Fase 2: Funcionalidades Core
- [ ] Implementar registro completo de clientes
- [ ] Mejorar sistema de información de siniestros
- [ ] Integrar guardado en archivos JSON por tipo de siniestro

### Fase 3: Funcionalidades Avanzadas  
- [ ] Sistema de consultas y filtros
- [ ] Gráficas interactivas en reportes
- [ ] Notificaciones en tiempo real

## Cómo Usar el Sistema

1. **Iniciar**: Abrir `login.html` en el navegador
2. **Login como Admin**: Usar `admin/1234` para acceso completo
3. **Login como Cliente**: Usar `cliente/5678` para acceso limitado
4. **Navegar**: Usar el menú superior para acceder a diferentes secciones
5. **Registrar Siniestro**: Solo admins pueden acceder a `ingreso.html`
6. **Consultar**: Ambos tipos de usuario pueden consultar estados

## Archivos de Configuración

- `ejemplo_registro.txt`: Define la estructura de datos
- `css/`: Carpeta con todos los estilos
- `js/`: Carpeta con la lógica JavaScript
- `image/`: Iconos del sistema (Checkmark.png, folder.png, list.png)

El sistema está diseñado para ser intuitivo y fácil de usar, con una interfaz moderna que guía al usuario a través de cada proceso.