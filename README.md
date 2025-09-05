# Sistema de Asistencia Vehicular

## Descripción del Proyecto

Este es un sistema web para gestionar **siniestros vehiculares** que permite a los usuarios (administradores y clientes) interactuar con el sistema de manera eficiente.

### ¿Qué es un Siniestro?
Un **siniestro** es un evento imprevisto como un accidente de tránsito, robo, incendio o vandalismo que afecta a un vehículo asegurado. Este sistema permite registrar, consultar y gestionar estos eventos desde el reporte inicial hasta la resolución final.

## Estructura del Sistema

### Tipos de Usuario

#### 1. **Administrador (Call Center)**
- **Usuario**: `admin`
- **Contraseña**: `1234`
- **Acceso**: Completo al sistema
- **Funciones**: Registrar siniestros, consultar estados, ver reportes, gestionar casos

#### 2. **Cliente**
- **Usuario**: `cliente` 
- **Contraseña**: `5678`
- **Acceso**: Limitado para consultar sus propios siniestros
- **Funciones**: Ver estado de casos, información de contacto, servicios disponibles

### Páginas del Sistema

#### 1. **Página de Inicio** (`index.html`)
- **Propósito**: Landing page del sistema con información general
- **Contenido**: Descripción de servicios, beneficios, acceso al login
- **Acceso**: Público (no requiere autenticación)

#### 2. **Login** (`login.html`)
- **Propósito**: Página de autenticación donde los usuarios ingresan sus credenciales
- **Funcionalidad**: 
  - Verifica usuario y contraseña
  - Guarda el tipo de usuario en el navegador (localStorage)
  - Redirige automáticamente según el tipo de usuario
- **Tecnología**: HTML, CSS, JavaScript con localStorage para mantener la sesión

#### 3. **Panel Administrador** (`bienvenida.html`)
- **Propósito**: Dashboard principal para administradores del call center
- **Funcionalidades**:
  - **Estadísticas en tiempo real**: Muestra siniestros activos, completados, grúas disponibles
  - **Acciones rápidas**: Acceso directo a funciones principales
  - **Historial de actividad**: Últimas acciones realizadas en el sistema
- **Acceso**: Solo usuarios tipo "admin"
- **Diseño**: Tema azul profesional con tarjetas y gradientes

#### 4. **Portal Cliente** (`cliente.html`)  
- **Propósito**: Interfaz simplificada para clientes
- **Funcionalidades**:
  - Consultar estado de siniestros
  - Ver información de servicios y beneficios
  - Acceso a información de contacto
- **Acceso**: Solo usuarios tipo "cliente"
- **Diseño**: Interfaz amigable con información clara y accesible

#### 5. **Ingreso de Siniestro** (`ingreso.html`)
- **Propósito**: Formulario para registrar nuevos siniestros
- **Datos requeridos**:
  - **RUT del asegurado**: Con validación automática del formato chileno
  - **Número de póliza**: Identificador único de la póliza de seguro
  - **Tipo de daño**: Colisión, robo, incendio, vandalismo
  - **Tipo de vehículo**: Auto, camioneta, moto, camión
  - **Información de contacto**: Email y teléfono
  - **Documentos adjuntos**: Simulado para la demo
- **Funcionalidad**: Asignación automática de liquidador, grúa y taller

#### 6. **Consulta de Estado** (`consulta.html`)
- **Propósito**: Permite consultar el progreso de un siniestro
- **Funcionalidad**: 
  - Búsqueda por RUT y número de póliza
  - **Barra de progreso visual** con 3 estados:
    - 📁 **Ingresado**: Datos registrados en el sistema
    - 📋 **En Evaluación**: Liquidador asignado, evaluando daños
    - ✅ **Finalizado**: Proceso completado, vehículo entregado
  - Información detallada de grúa, taller y liquidador asignado
- **Acceso**: Administradores y clientes

#### 7. **Reportes** (`reporte.html`)
- **Propósito**: Dashboard con gráficos y estadísticas para análisis
- **Incluye**: 
  - **Gráfico de barras**: Cantidad de asistencias por mes
  - **Gráfico circular**: Distribución por tipos de vehículo
  - **Gráfico de líneas**: Desempeño de talleres en el tiempo
  - **Barras horizontales**: Distribución geográfica de siniestros
- **Acceso**: Solo administradores

## Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica de las páginas
- **CSS3**: Estilos modernos con gradientes, animaciones y diseño responsivo
- **JavaScript ES6+**: Lógica de la aplicación, validaciones y manejo de datos

### Almacenamiento
- **localStorage**: Simula una base de datos local en el navegador
- **JSON**: Formato de datos para almacenar información de siniestros

### Diseño
- **Sistema de colores**: Tema azul profesional (#2563eb como color principal)
- **Tipografía**: Fuentes del sistema (San Francisco, Segoe UI, Roboto)
- **Iconografía**: Imágenes PNG para representar estados y acciones
- **Responsive**: Compatible con dispositivos móviles y desktop

## Base de Datos Simulada

### Estructura de Datos
El archivo `ejemplo_registro.txt` define los campos que simula una base de datos real:

```
ID_usuario|RUT|Nombre|Correo|Teléfono|Dirección|Nro_Póliza|Inicio_Cobertura|Fin_Cobertura|Tipo_Cobertura|Patente|ID_Siniestro|Fecha_Siniestro|Hora_Siniestro|Lugar_Siniestro|Descripción_Evento|Estado_Siniestro|Observaciones|Liquidador|Grúa_Patente|Chofer_Grúa|Punto_Retiro|Punto_Destino|Taller|Fecha_Ingreso_Taller|Acta_Recepción|Presupuesto_Monto|Presupuesto_Descripción|Presupuesto_Tiempo|Presupuesto_Doc|Fecha_Entrega_Estimada|Fecha_Entrega_Real|Acta_Retiro|Acta_Rechazo|Fecha_Registro
```

### Campos Importantes

- **RUT**: Identificador único del cliente con formato chileno (12.345.678-9)
- **Número de Póliza**: Código que identifica la póliza de seguro
- **Estado del Siniestro**: 
  - `"Ingresado"`: Recién registrado en el sistema
  - `"En Evaluación"`: Liquidador asignado, evaluando daños
  - `"Finalizado"`: Proceso completado
- **Liquidador**: Persona especializada asignada para evaluar el siniestro
- **Grúa**: Servicio de grúa asignado para el traslado del vehículo
- **Taller**: Taller mecánico asignado para las reparaciones

## Flujo de Trabajo del Sistema

### 1. **Proceso de Autenticación**
1. Usuario accede a `login.html`
2. Ingresa credenciales (usuario/contraseña)
3. Sistema valida contra credenciales predefinidas
4. Se guarda el tipo de usuario en localStorage
5. Redirección automática:
   - **Admin** → `bienvenida.html` (Panel completo)
   - **Cliente** → `cliente.html` (Portal simplificado)

### 2. **Registro de Siniestro** (Solo Administradores)
1. Acceso desde el panel admin a `ingreso.html`
2. Completar formulario con datos obligatorios
3. **Validación automática del RUT**: Verifica formato y dígito verificador
4. **Asignación automática**: El sistema asigna liquidador, grúa y taller disponibles
5. Guardado en localStorage simulando base de datos
6. Confirmación con detalles del siniestro creado

### 3. **Consulta de Estado**
1. Ingreso de RUT y número de póliza
2. Búsqueda en la "base de datos" local (localStorage)
3. **Visualización del progreso** con barra de estados:
   - Iconos que cambian según el progreso
   - Colores que indican el estado actual
   - Información detallada de servicios asignados

## Características Técnicas

### Validación de RUT Chileno
El sistema incluye validación completa del RUT:
- **Formato**: Acepta con o sin puntos y guión
- **Algoritmo**: Calcula y verifica el dígito verificador
- **Formateo**: Muestra automáticamente con puntos y guión (12.345.678-9)

### Gestión de Sesiones
- **localStorage**: Mantiene la sesión activa entre páginas
- **Verificación automática**: Cada página verifica si el usuario está autenticado
- **Redirección inteligente**: Recuerda la página solicitada antes del login
- **Logout seguro**: Limpia todos los datos de sesión

### Sistema de Iconos
- **folder.png**: Representa datos ingresados o nuevos registros
- **list.png**: Indica procesos en curso o evaluación
- **Checkmark.png**: Muestra procesos completados o exitosos

### Diseño Responsivo
- **Mobile-first**: Optimizado para dispositivos móviles
- **Breakpoints**: Adaptación automática a diferentes tamaños de pantalla
- **Grid y Flexbox**: Layouts modernos que se adaptan al contenido
- **Navegación adaptativa**: Menú que se reorganiza en pantallas pequeñas

## Arquitectura del Código

### Organización de Archivos
```
/
├── index.html              # Página de inicio pública
├── login.html              # Autenticación
├── bienvenida.html          # Panel administrador
├── cliente.html            # Portal cliente
├── ingreso.html            # Registro de siniestros
├── consulta.html           # Consulta de estado
├── reporte.html            # Reportes y estadísticas
├── siniestro.html          # Gestión general
├── css/
│   ├── style.css           # Estilos generales del sistema
│   ├── admin.css           # Estilos específicos admin
│   ├── cliente.css         # Estilos específicos cliente
│   ├── ingreso.css         # Estilos formulario ingreso
│   ├── consulta.css        # Estilos consulta estado
│   ├── reporte.css         # Estilos reportes
│   └── siniestro.css       # Estilos gestión
├── js/
│   ├── login.js            # Lógica de autenticación
│   ├── admin.js            # Funciones panel admin
│   ├── cliente.js          # Funciones portal cliente
│   ├── siniestro.js        # Gestión de datos core
│   ├── ingreso.js          # Lógica formulario ingreso
│   ├── consulta.js         # Lógica consulta estado
│   └── reporte.js          # Lógica reportes
├── image/
│   ├── folder.png          # Icono para datos ingresados
│   ├── list.png            # Icono para procesos
│   └── Checkmark.png       # Icono para completado
└── ejemplo_registro.txt    # Estructura de datos
```

### Clases JavaScript Principales

#### `SiniestroManager`
Clase principal que gestiona todos los datos del sistema:
- **Métodos principales**:
  - `crearSiniestro()`: Registra un nuevo siniestro
  - `buscarSiniestro()`: Busca por RUT y póliza
  - `actualizarEstado()`: Cambia el estado de un siniestro
  - `getEstadisticas()`: Obtiene métricas del sistema

## Cómo Usar el Sistema

### Para Administradores
1. **Acceso**: Ir a `login.html`
2. **Login**: Usuario `admin`, contraseña `1234`
3. **Dashboard**: Acceso automático a `bienvenida.html`
4. **Funciones disponibles**:
   - Registrar nuevos siniestros
   - Consultar cualquier siniestro
   - Ver reportes y estadísticas
   - Gestionar el sistema completo

### Para Clientes
1. **Acceso**: Ir a `login.html`
2. **Login**: Usuario `cliente`, contraseña `5678`
3. **Portal**: Acceso automático a `cliente.html`
4. **Funciones disponibles**:
   - Consultar estado de sus siniestros
   - Ver información de servicios
   - Contactar soporte técnico

### Navegación del Sistema
- **Menú superior**: Navegación principal adaptativa según tipo de usuario
- **Breadcrumbs**: Indicadores visuales de la página actual
- **Botones de acción**: Accesos directos a funciones principales
- **Logout**: Disponible en todas las páginas autenticadas

## Próximos Pasos de Desarrollo

### ✅ Fase 1: Estructura Básica (Completada)
- [x] Sistema de login unificado
- [x] Páginas diferenciadas por tipo de usuario
- [x] Navegación coherente y responsiva
- [x] Diseño profesional con tema azul
- [x] Gestión de sesiones robusta

### 🔄 Fase 2: Funcionalidades Core (En Desarrollo)
- [ ] Validación completa de formularios
- [ ] Sistema de notificaciones en tiempo real
- [ ] Búsqueda avanzada de siniestros
- [ ] Exportación de reportes

### 📋 Fase 3: Funcionalidades Avanzadas (Planificada)
- [ ] Integración con APIs externas
- [ ] Sistema de notificaciones por email
- [ ] Dashboard interactivo con filtros
- [ ] Gestión de usuarios y permisos

## Características de Diseño

### Sistema de Colores
- **Azul Principal**: `#2563eb` - Botones primarios, enlaces activos
- **Azul Secundario**: `#1d4ed8` - Hover states, gradientes
- **Azul Claro**: `#3b82f6`, `#60a5fa` - Elementos secundarios
- **Grises**: `#f8f9fa`, `#e5e7eb` - Fondos y bordes
- **Verde**: `#10b981` - Estados completados
- **Amarillo**: `#fbbf24` - Alertas y advertencias

### Iconografía del Sistema
- **folder.png**: 
  - Representa datos nuevos o ingresados
  - Usado en: Nuevos siniestros, documentos, registros
- **list.png**: 
  - Indica procesos en curso o listas
  - Usado en: Evaluaciones, consultas, procesos
- **Checkmark.png**: 
  - Muestra completado o éxito
  - Usado en: Finalizados, confirmaciones, éxito

### Principios de Diseño
- **Consistencia**: Mismo patrón visual en todas las páginas
- **Jerarquía**: Uso de tamaños, colores y espaciado para guiar la atención
- **Accesibilidad**: Contraste adecuado, textos legibles, navegación clara
- **Responsive**: Adaptación fluida a diferentes dispositivos

## Seguridad y Validaciones

### Autenticación
- **Credenciales hardcodeadas**: Para propósitos de demostración
- **Sesiones locales**: Usando localStorage del navegador
- **Verificación por página**: Cada página verifica autenticación
- **Logout seguro**: Limpieza completa de datos de sesión

### Validaciones
- **RUT Chileno**: Algoritmo completo de validación con dígito verificador
- **Formularios**: Validación de campos obligatorios
- **Tipos de datos**: Verificación de formatos (email, teléfono)

## Tecnologías y Compatibilidad

### Navegadores Soportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Características Modernas Utilizadas
- **CSS Grid y Flexbox**: Para layouts adaptativos
- **CSS Custom Properties**: Para sistema de colores consistente
- **ES6+ JavaScript**: Clases, arrow functions, template literals
- **localStorage API**: Para persistencia de datos local

El sistema está diseñado para ser intuitivo, profesional y fácil de expandir, con una base sólida para futuras mejoras y funcionalidades adicionales.