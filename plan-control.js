/**
 * Sistema de Control de Planes - WeRem
 * Gestiona el acceso a servicios según el plan del usuario
 */

// Definición de permisos por plan
const serviciosDisponibles = {
  basico: {
    formulario: true,
    guia: true,
    index: true,
    planes: true,
    mi_plan: true,
    foro: true
  },
  pro: {
    formulario: true,
    guia: true,
    index: true,
    planes: true,
    mi_plan: true,
    servicios: true,
    chat: true,
    juridico: true,
    psicologico: true,
    mentorias: true,
    taller: true,
    foro: true
  },
  premium: {
    formulario: true,
    guia: true,
    index: true,
    planes: true,
    mi_plan: true,
    servicios: true,
    chat: true,
    juridico: true,
    psicologico: true,
    mentorias: true,
    taller: true,
    foro: true,
    acompanamiento: true
  }
};

/**
 * Obtener el plan actual del usuario
 */
function obtenerPlanActual() {
  const plan = localStorage.getItem('werem_plan');
  return plan || null;
}

/**
 * Guardar el plan seleccionado
 */
function guardarPlan(plan) {
  localStorage.setItem('werem_plan', plan);
  localStorage.setItem('werem_plan_fecha', new Date().toISOString());
}

/**
 * Verificar si el usuario tiene acceso a un servicio
 */
function tieneAcceso(servicio) {
  const plan = obtenerPlanActual();
  
  if (!plan) {
    return false; // Sin plan = sin acceso
  }
  
  if (!serviciosDisponibles[plan]) {
    return false; // Plan no válido
  }
  
  return serviciosDisponibles[plan][servicio] === true;
}

/**
 * Verificar acceso y bloquear si es necesario
 */
function verificarAcceso(servicio, nombreServicio = '') {
  if (!tieneAcceso(servicio)) {
    mostrarAccesoDenegado(servicio, nombreServicio);
    return false;
  }
  return true;
}

/**
 * Mostrar pantalla de acceso denegado
 */
function mostrarAccesoDenegado(servicio, nombreServicio = '') {
  const titulo = nombreServicio || servicio.charAt(0).toUpperCase() + servicio.slice(1);
  
  const html = `
    <div class="acceso-denegado-overlay">
      <div class="acceso-denegado-modal">
        <div class="acceso-denegado-icono">🔒</div>
        <h2>Acceso Restringido</h2>
        <p>El servicio <strong>"${titulo}"</strong> no está disponible en tu plan actual.</p>
        
        <div class="acceso-denegado-info">
          <h3>¿Qué necesitas hacer?</h3>
          <ul>
            <li><strong>Plan Básico:</strong> Acceso limitado a recursos e información</li>
            <li><strong>Plan Pro:</strong> Chat 24h, asesoramiento jurídico y apoyo psicológico</li>
            <li><strong>Plan Premium:</strong> Atención integral con acompañamiento personalizado</li>
          </ul>
        </div>
        
        <div class="acceso-denegado-acciones">
          <button onclick="window.location.href='planes.html'" class="btn-actualizar">
            Ver Planes y Actualizar
          </button>
          <button onclick="window.history.back()" class="btn-volver">
            Volver Atrás
          </button>
        </div>
        
        <p class="acceso-denegado-nota">Tu plan actual: <strong>${obtenerPlanActual() || 'Sin plan'}</strong></p>
      </div>
    </div>
  `;
  
  // Limpiar el contenido y mostrar el modal
  document.body.innerHTML = html;
  
  // Agregar estilos si no existen
  agregarEstilosAccesoDenegado();
}

/**
 * Agregar estilos para el modal de acceso denegado
 */
function agregarEstilosAccesoDenegado() {
  if (document.getElementById('acceso-denegado-styles')) {
    return; // Ya existen los estilos
  }
  
  const style = document.createElement('style');
  style.id = 'acceso-denegado-styles';
  style.innerHTML = `
    .acceso-denegado-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(200, 74, 112, 0.3), rgba(75, 50, 120, 0.3));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: Arial, sans-serif;
    }
    
    .acceso-denegado-modal {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      animation: slideInUp 0.3s ease-out;
    }
    
    @keyframes slideInUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .acceso-denegado-icono {
      font-size: 48px;
      margin-bottom: 20px;
    }
    
    .acceso-denegado-modal h2 {
      color: #c84a70;
      margin: 0 0 10px 0;
      font-size: 24px;
    }
    
    .acceso-denegado-modal > p {
      color: #666;
      margin-bottom: 20px;
    }
    
    .acceso-denegado-info {
      background: #f5f5f5;
      border-left: 4px solid #c84a70;
      padding: 15px;
      margin: 20px 0;
      text-align: left;
      border-radius: 6px;
    }
    
    .acceso-denegado-info h3 {
      margin-top: 0;
      color: #333;
      font-size: 14px;
    }
    
    .acceso-denegado-info ul {
      margin: 0;
      padding-left: 20px;
    }
    
    .acceso-denegado-info li {
      font-size: 12px;
      color: #666;
      margin: 8px 0;
    }
    
    .acceso-denegado-acciones {
      display: flex;
      gap: 10px;
      margin-top: 30px;
      flex-wrap: wrap;
    }
    
    .btn-actualizar,
    .btn-volver {
      flex: 1;
      padding: 12px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      transition: all 0.3s ease;
      min-width: 150px;
    }
    
    .btn-actualizar {
      background: #c84a70;
      color: white;
    }
    
    .btn-actualizar:hover {
      background: #a63a60;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(200, 74, 112, 0.3);
    }
    
    .btn-volver {
      background: #e0e0e0;
      color: #333;
    }
    
    .btn-volver:hover {
      background: #d0d0d0;
    }
    
    .acceso-denegado-nota {
      font-size: 12px;
      color: #999;
      margin-top: 20px;
      margin-bottom: 0;
    }
  `;
  
  document.head.appendChild(style);
}

/**
 * Mostrar indicador de plan en la página
 */
function mostrarIndicadorPlan() {
  const plan = obtenerPlanActual();
  
  if (!plan) {
    return; // Sin plan, no mostrar indicador
  }
  
  const indicador = document.createElement('div');
  indicador.id = 'plan-indicator';
  indicador.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: linear-gradient(135deg, #c84a70, #4b3278);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  `;
  
  const planTexto = plan.charAt(0).toUpperCase() + plan.slice(1);
  indicador.textContent = `Plan: ${planTexto}`;
  
  document.body.appendChild(indicador);
}

/**
 * Inicializar el sistema de planes al cargar la página
 */
function inicializarSistemaPlan() {
  mostrarIndicadorPlan();
}

// Ejecutar al cargar el documento
document.addEventListener('DOMContentLoaded', inicializarSistemaPlan);
