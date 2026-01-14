# 🔐 Sistema de Control de Acceso por Planes - WeRem

## Descripción del Sistema

Se ha implementado un sistema completo de gestión de planes que controla el acceso a servicios según el plan seleccionado por el usuario.

---

## 📋 Planes y Permisos

### Plan BÁSICO (Gratuito)
Acceso a:
- ✓ Foro Seguro
- ✓ Guía de Uso
- ✓ Información legal básica
- ✓ Directorio de servicios

### Plan PRO (Recomendado)
Acceso a TODO del plan Básico + :
- ✓ Chat 24h con especialistas
- ✓ Asesoramiento Jurídico
- ✓ Apoyo Psicológico (hasta 4 sesiones/mes)
- ✓ Mentorías y redes de apoyo
- ✓ Talleres virtuales

### Plan PREMIUM (Máximo Apoyo)
Acceso a TODO los planes anteriores + :
- ✓ Chat prioritario 24/7
- ✓ Asesoramiento Jurídico ilimitado
- ✓ Apoyo Psicológico intensivo (semanal)
- ✓ Acompañamiento personalizado
- ✓ Talleres privados
- ✓ Recursos exclusivos

---

## 🔧 Componentes del Sistema

### 1. **plan-control.js** (Archivo JavaScript Principal)
Localización: `c:\Users\Usuario\OneDrive\Desktop\werem\plan-control.js`

Funciones principales:
- `obtenerPlanActual()` - Obtiene el plan guardado en localStorage
- `guardarPlan(plan)` - Guarda el plan seleccionado
- `tieneAcceso(servicio)` - Verifica si el usuario tiene acceso a un servicio
- `verificarAcceso(servicio, nombreServicio)` - Verifica acceso y bloquea si es necesario
- `mostrarAccesoDenegado()` - Muestra modal elegante de acceso denegado
- `mostrarIndicadorPlan()` - Muestra etiqueta con plan actual en la esquina superior derecha

### 2. **Páginas Modificadas**

#### planes.html
- Botones "Seleccionar Plan" guardan la opción en localStorage
- Redirige a servicios.html después de seleccionar
- Incluye tabla comparativa de planes

#### servicios.html
- Verifica acceso antes de abrir servicios
- Muestra badges indicando qué plan requiere cada servicio
- Bloquea acceso a servicios no permitidos

#### chat.html
- Verifica acceso al cargar la página
- Si no tiene acceso, muestra modal de acceso denegado
- Requiere plan Pro o Premium

#### juridico.html
- Verifica acceso al asesoramiento jurídico
- Requiere plan Pro o Premium

#### index.html, guia.html, formulario.html, legal.html, bibliografia.html
- Incluyen plan-control.js para mostrar indicador de plan

### 3. **Nueva Página: mi-plan.html**
Localización: `c:\Users\Usuario\OneDrive\Desktop\werem\mi-plan.html`

Características:
- Muestra plan actual del usuario
- Lista todos los servicios con su disponibilidad
- Opción para cambiar o actualizar plan
- Opción para limpiar plan (volver a elegir)

---

## 🎯 Flujo de Uso

### Primer Acceso (Sin Plan)
1. Usuario abre la web
2. Navega a "Planes"
3. Selecciona un plan (Básico, Pro o Premium)
4. Se guarda en localStorage
5. Aparece indicador del plan en esquina superior derecha
6. Usuario redirigido a servicios

### Con Plan Seleccionado
1. Usuario accede a cualquier página
2. Ve indicador del plan actual
3. Intenta acceder a un servicio
   - Si tiene acceso: se abre normalmente
   - Si NO tiene acceso: aparece modal atractivo sugiriendo actualizar

### Cambiar Plan
1. Usuario va a "Mi Plan"
2. Ve su plan actual y servicios disponibles
3. Puede ir a "Ver Todos los Planes" para cambiar
4. Selecciona nuevo plan, se guarda automáticamente

---

## 💾 Almacenamiento

Los datos se guardan en **localStorage** del navegador:
- `werem_plan` - Plan actual del usuario (basico, pro, premium)
- `werem_plan_fecha` - Fecha y hora de selección del plan

---

## 🎨 Características Visuales

### Indicador de Plan
- Ubicación: Esquina superior derecha
- Muestra: "Plan: [Nombre]"
- Color: Degradado de marca (Rosa-Púrpura)
- Aparece en todas las páginas cuando hay plan activo

### Modal de Acceso Denegado
- Icono: 🔒
- Título: "Acceso Restringido"
- Información: Qué plan requiere el servicio
- Botones: 
  - "Ver Planes y Actualizar" (Botón principal)
  - "Volver Atrás" (Botón secundario)
- Nota: Muestra plan actual del usuario

### Badges de Servicio
- Ubicación: Debajo del nombre de cada servicio en grid
- Información: "Requiere plan Pro o superior"
- Color: Amarillo dorado

---

## 🔄 Integración en Menú

El menú incluye nueva opción:
- "Planes" - Página para seleccionar/cambiar plan
- "Mi Plan" - Nueva página (opcional en menú)

---

## 📝 Ejemplos de Acceso

| Servicio | Básico | Pro | Premium |
|----------|--------|-----|---------|
| Foro | ✓ | ✓ | ✓ |
| Chat 24h | ✗ | ✓ | ✓ Prioritario |
| Asesoramiento Jurídico | Básico | ✓ Inicial | ✓ Ilimitado |
| Apoyo Psicológico | ✗ | ✓ 4/mes | ✓ Semanal |
| Mentorías | ✗ | ✓ | ✓ |
| Talleres | ✗ | ✓ | ✓ Privados |

---

## 🛡️ Seguridad

- Los datos se validan en cliente (JavaScript)
- No hay validación en servidor real (es una demostración)
- Para producción, se requeriría:
  - Backend que verifique planes
  - Autenticación real
  - Base de datos segura
  - Tokens JWT o similares

---

## 🚀 Cómo Probar

1. Abre `index.html`
2. Ve a "Planes"
3. Selecciona "Plan Básico"
4. Observa el indicador en la esquina superior derecha
5. Intenta acceder a "Chat" en servicios → Verás el modal de acceso denegado
6. Ve a "Mi Plan" para ver detalles
7. Selecciona "Plan Pro" para actualizar

---

## 📱 Responsive

El sistema es completamente responsive:
- El indicador de plan se adapta a móvil
- Modales se centran correctamente
- Grid de servicios se ajusta al tamaño de pantalla

---

**Sistema implementado exitosamente ✓**
