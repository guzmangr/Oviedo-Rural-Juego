
import { Parish, Level } from './types';

export const PARISHES: Parish[] = [
  {
    id: 'naranco',
    name: 'Naranco',
    description: 'Hogar del prerrománico asturiano, Patrimonio de la Humanidad.',
    image: 'https://guzmangr.github.io/OviedoRural/assets/img/parroquias/naranco.jpg',
    location: 'Norte',
    facts: ['Santa María del Naranco', 'Patrimonio UNESCO']
  },
  {
    id: 'trubia',
    name: 'Trubia',
    description: 'Corazón de la industria armamentística y ferroviaria.',
    image: 'https://guzmangr.github.io/OviedoRural/assets/img/parroquias/trubia.jpg',
    location: 'Oeste',
    facts: ['Real Fábrica de Armas', 'Puente de Hierro']
  },
  {
    id: 'olloniego',
    name: 'Olloniego',
    description: 'Conjunto medieval estratégico en el paso del río Nalón.',
    image: 'https://guzmangr.github.io/OviedoRural/assets/img/parroquias/olloniego.jpg',
    location: 'Sur',
    facts: ['Puente Medieval', 'Torre de Muñiz']
  },
  {
    id: 'san-claudio',
    name: 'San Claudio',
    description: 'Tradición alfarera y crecimiento residencial.',
    image: 'https://guzmangr.github.io/OviedoRural/assets/img/parroquias/sanclaudio.jpg',
    location: 'Oeste',
    facts: ['Fábrica de Loza', 'Iglesia de San Claudio']
  },
  {
    id: 'priorio',
    name: 'Priorio',
    description: 'Famosa por su castillo y el balneario de Las Caldas.',
    image: 'https://guzmangr.github.io/OviedoRural/assets/img/parroquias/priorio.jpg',
    location: 'Oeste',
    facts: ['Castillo de Priorio', 'Balneario de Las Caldas']
  }
];

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Nivel 1: Los Imprescindibles",
    description: "Comienza tu viaje por los monumentos más icónicos del entorno rural de Oviedo.",
    requiredScore: 3,
    reward: "Explorador del Naranco",
    icon: "fa-mountain-sun",
    questions: [
      {
        id: 101,
        text: "¿Cuál de estas joyas del prerrománico se encuentra en el Monte Naranco?",
        options: ["San Julián de los Prados", "Santa María del Naranco", "San Juan de Priorio", "Santa María la Real"],
        correctAnswer: "Santa María del Naranco",
        parishId: "naranco",
        explanation: "Santa María del Naranco fue originalmente un palacio real construido por Ramiro I."
      },
      {
        id: 102,
        text: "¿En qué parroquia se sitúa la famosa iglesia de San Miguel de Lillo?",
        options: ["Lillo", "Trubia", "Olloniego", "Piedramuelle"],
        correctAnswer: "Lillo",
        parishId: "lillo",
        explanation: "Lillo es la parroquia que alberga esta joya del siglo IX, situada a escasos metros de Santa María."
      },
      {
        id: 103,
        text: "¿Qué elemento es más representativo de la arquitectura tradicional en las parroquias rurales de Oviedo?",
        options: ["El Rascacielos", "El Hórreo", "El Faro", "La Lonja"],
        correctAnswer: "El Hórreo",
        parishId: "general",
        explanation: "El hórreo y la panera son las construcciones más emblemáticas de la arquitectura popular asturiana."
      },
      {
        id: 104,
        text: "¿Qué río atraviesa la parroquia de Trubia y confluye con el Nalón?",
        options: ["Río Trubia", "Río Nora", "Río Gafo", "Río Piles"],
        correctAnswer: "Río Trubia",
        parishId: "trubia",
        explanation: "La confluencia del río Trubia con el Nalón marcó el desarrollo industrial de la zona."
      }
    ]
  },
  {
    id: 2,
    title: "Nivel 2: Historia y Tradición",
    description: "Descubre el pasado industrial y los conjuntos medievales que guardan las parroquias.",
    requiredScore: 3,
    reward: "Guardián del Patrimonio",
    icon: "fa-hammer",
    questions: [
      {
        id: 201,
        text: "¿Qué industria transformó radicalmente la parroquia de Trubia en el siglo XVIII?",
        options: ["Minería de carbón", "Fábrica de armas", "Industria láctea", "Astilleros"],
        correctAnswer: "Fábrica de armas",
        parishId: "trubia",
        explanation: "La Real Fábrica de Armas de Trubia es uno de los complejos industriales más antiguos de España."
      },
      {
        id: 202,
        text: "Olloniego es famoso por su conjunto histórico. ¿Qué familia dio nombre a su palacio principal?",
        options: ["Los Bernaldo de Quirós", "Los Valdés", "Los Jovellanos", "Los Miranda"],
        correctAnswer: "Los Bernaldo de Quirós",
        parishId: "olloniego",
        explanation: "El Palacio de los Bernaldo de Quirós forma parte del conjunto medieval junto al puente viejo."
      },
      {
        id: 203,
        text: "¿Qué parroquia era mundialmente conocida por su fábrica de loza fundada en 1901?",
        options: ["San Claudio", "Agüeria", "Sograndio", "Caces"],
        correctAnswer: "San Claudio",
        parishId: "san-claudio",
        explanation: "La fábrica de loza de San Claudio fue un referente de diseño y calidad durante más de un siglo."
      },
      {
        id: 204,
        text: "¿Cuál es el patrón de la parroquia de Olloniego?",
        options: ["San Pelayo", "San Roque", "San Antonio", "Santiago"],
        correctAnswer: "San Pelayo",
        parishId: "olloniego",
        explanation: "San Pelayo es el patrón de Olloniego, cuya festividad se celebra con gran arraigo en la parroquia."
      }
    ]
  }
];
