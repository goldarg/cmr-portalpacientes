
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Study, User } from './types';

const app = new Hono();

app.use('/*', cors());

// --- Mock Data (Moved to Server) ---
const USERS: User[] = [
  { dni: '12345678', fullName: 'Juan Pérez' },
  { dni: '87654321', fullName: 'María González' },
  { dni: '11223344', fullName: 'Carlos Rodriguez' },
];

const STUDIES: Study[] = [
  {
    id: 'st-001',
    title: 'Resonancia Magnética de Rodilla',
    specialty: 'Traumatología',
    date: '2023-10-15',
    doctorName: 'Dr. Esteban Quito',
    description: 'Se observa menisco interno con señal heterogénea compatible con ruptura horizontal del cuerno posterior. Ligamento cruzado anterior con señal conservada. Leve derrame articular. Se sugiere correlación clínica.',
    documentUrl: 'https://cdn.drapp.la/d0daa0ae.pdf',
  },
  {
    id: 'st-002',
    title: 'Análisis de Sangre Completo',
    specialty: 'Laboratorio',
    date: '2023-11-02',
    doctorName: 'Dra. Ana Bolena',
    description: 'Hemograma completo dentro de parámetros normales. Glucemia: 95 mg/dl. Colesterol Total: 180 mg/dl. Triglicéridos: 110 mg/dl. Función renal conservada. No se observan alteraciones significativas en la serie roja ni blanca.',
    documentUrl: 'https://cdn.drapp.la/d0daa0ae.pdf',
  },
  {
    id: 'st-003',
    title: 'Radiografía de Tórax (Frente y Perfil)',
    specialty: 'Radiología',
    date: '2023-09-20',
    doctorName: 'Dr. Ray X',
    description: 'Campos pulmonares con transparencia conservada. No se observan infiltrados pleuroparenquimatosos agudos. Silueta cardiomediastínica de configuración y tamaño normal. Senos costofrénicos libres. Estructuras óseas visualizadas sin lesiones líticas ni blásticas.',
    documentUrl: 'https://cdn.drapp.la/d0daa0ae.pdf',
  },
  {
    id: 'st-004',
    title: 'Ecografía Abdominal',
    specialty: 'Gastroenterología',
    date: '2023-12-10',
    doctorName: 'Dra. Eco G. Rafia',
    description: 'Hígado de tamaño, forma y ecoestructura conservada. No se observan lesiones focales. Vesícula biliar alitiásica de paredes finas. Vía biliar intra y extrahepática de calibre conservado. Páncreas y bazo sin particularidades. Ambos riñones de tamaño y morfología normal.',
    documentUrl: 'https://cdn.drapp.la/d0daa0ae.pdf',
  },
  {
    id: 'st-005',
    title: 'Electrocardiograma',
    specialty: 'Cardiología',
    date: '2023-10-05',
    doctorName: 'Dr. Corazón Valiente',
    description: 'Ritmo sinusal. Frecuencia cardíaca 75 lpm. Eje eléctrico normal. Intervalos PR y QT dentro de límites normales. No se observan signos de isquemia aguda ni necrosis previa. Repolarización ventricular conservada.',
    documentUrl: 'https://cdn.drapp.la/d0daa0ae.pdf',
  }
];

// --- API Routes ---

// Login
app.post('/api/login', async (c) => {
  const body = await c.req.json();
  const { dni } = body;
  
  const user = USERS.find(u => u.dni === dni);
  
  if (user) {
    return c.json({ success: true, user });
  } else {
    return c.json({ success: false, message: 'Usuario no encontrado' }, 401);
  }
});

// Get Studies
app.get('/api/studies', (c) => {
  return c.json(STUDIES);
});

// Get Single Study
app.get('/api/studies/:id', (c) => {
  const id = c.req.param('id');
  const study = STUDIES.find(s => s.id === id);
  
  if (study) {
    return c.json(study);
  } else {
    return c.json({ message: 'Estudio no encontrado' }, 404);
  }
});

export default app;
