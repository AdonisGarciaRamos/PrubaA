
//Laboratorio: Define la estructura de un laboratorio, con propiedades nombre y software.
//El código está estructurado de manera que cumple con los principios SOLID, como la separación de responsabilidades y la modularidad de las clases y funciones.
interface Laboratorio {
  nombre: string;
  software: string[];
}
//Participante: Define la estructura de un participante, con propiedades como nombre, modalidad, laboratorio, computadora y softwareRequerido.
//Hay una asociación entre las clases Participante y Laboratorio, donde un participante tiene asociado un laboratorio.
interface Participante {
  nombre: string;
  modalidad: string;
  laboratorio: Laboratorio;
  computadora: Computadora;
  softwareRequerido: string[];
}
//Computadora: Define la estructura de una computadora, con propiedades nombre y softwareInstalado
interface Computadora {
  nombre: string;
  softwareInstalado: string[];
}
//Se utilizó el polimorfismo al definir el método softwareInstalado en las clases decoradoras, que anulan la implementación de la clase base ComputadoraDecorator.
class Categoria {
  constructor(public nombre: string, public laboratorios: Laboratorio[]) {}
  public obtenerLaboratorioDisponible(): Laboratorio | undefined {
    // Lógica para obtener un laboratorio disponible según los cupos
    // Puedes usar datos aleatorios o implementar tu propia lógica
    if (this.laboratorios.length > 0) {
      return this.laboratorios[0]; // Devuelve el primer laboratorio disponible por simplicidad
    }
    return undefined;
  }
}
//Se aplicó el patrón Singleton en la clase Concurso, donde se asegura que solo exista una instancia de la clase y se accede a través del método estático getInstance().
class Concurso {
  private static instance: Concurso;
  private participantes: Participante[] = [];
//Implementa el patrón Singleton.
  private constructor() {}

  public static getInstance(): Concurso {
    if (!Concurso.instance) {
      Concurso.instance = new Concurso();
    }
    return Concurso.instance;
  }
//Tiene una lista de participantes (participantes).
  public registrarParticipante(participante: Participante): void {
    this.participantes.push(participante);
  }
//El método registrarParticipante() registra un participante en el concurso.
  public mostrarDetalleParticipantes(): void {
    for (const participante of this.participantes) {
      console.log('Nombre del participante:', participante.nombre);
      console.log('Modalidad del concurso:', participante.modalidad);
      console.log('Laboratorio:', participante.laboratorio.nombre);
      console.log('Computadora utilizada:', participante.computadora.nombre);
      console.log('Software instalado por el laboratorio:', participante.laboratorio.software);
      console.log('Software requerido por el participante:', participante.softwareRequerido);
      console.log('-------------------------');
    }
  }
}
//El método mostrarDetalleParticipantes() muestra el detalle de los participantes registrados en el concurso.
//Se aplicó herencia en las clases ComputadoraDecorator y las clases decoradoras (LogicaBasicaDecorator, LogicaAvanzadaDecorator, EmpresarialDecorator y RetosDecorator) 
//donde las clases decoradoras extienden de la clase base ComputadoraDecorator.

abstract class ComputadoraDecorator implements Computadora {
  constructor(protected computadora: Computadora) {}
//mplementa la interfaz Computadora.
  public get nombre(): string {
    return this.computadora.nombre;
  }
//Tiene una propiedad computadora de tipo Computadora que representa la computadora base a decorar.
//Define los métodos nombre y softwareInstalado, que son implementados por las clases hijas.
  public get softwareInstalado(): string[] {
    return this.computadora.softwareInstalado;
  }
}
//Se aplicó el patrón Decorator en las clases decoradoras (LogicaBasicaDecorator, LogicaAvanzadaDecorator, EmpresarialDecorator y RetosDecorator), 
//donde se agregan funcionalidades adicionales a las computadoras base mediante la composición con otras clases.
class LogicaBasicaDecorator extends ComputadoraDecorator {
  public get softwareInstalado(): string[] {
    const software = this.computadora.softwareInstalado.slice();
    software.push('Software adicional para lógica básica');
    return software;
  }
}

class LogicaAvanzadaDecorator extends ComputadoraDecorator {
  public get softwareInstalado(): string[] {
    const software = this.computadora.softwareInstalado.slice();
    software.push('Software adicional para lógica avanzada');
    return software;
  }
}

class EmpresarialDecorator extends ComputadoraDecorator {
  public get softwareInstalado(): string[] {
    const software = this.computadora.softwareInstalado.slice();
    software.push('Software adicional para empresarial');
    return software;
  }
}
//Extienden de ComputadoraDecorator.
//Sobrescriben el método softwareInstalado para agregar software adicional específico a cada categoría.
class RetosDecorator extends ComputadoraDecorator {
  public get softwareInstalado(): string[] {
    const software = this.computadora.softwareInstalado.slice();
    software.push('Software adicional para retos');
    return software;
  }
}
//Hay una relación de agregación entre la clase Categoria y la clase Laboratorio, donde una categoría contiene uno o varios laboratorios.
const laboratorioLogicaBasica: Laboratorio = {
  nombre: 'Laboratorio de Lógica Básica',
  software: ['Software general 1', 'Software general 2'],
};

const laboratorioLogicaAvanzada: Laboratorio = {
 nombre: 'Laboratorio de Lógica Avanzada',
  software: ['Software general 1', 'Software general 2'],
};

const laboratorioEmpresarial: Laboratorio = {
  nombre: 'Laboratorio Empresarial',
  software: ['Software general 1', 'Software general 2'],
};

const laboratorioRetos: Laboratorio = {
  nombre: 'Laboratorio de Retos',
  software: ['Software general 1', 'Software general 2'],
};
//Se crean instancias de laboratorios (laboratorioLogicaBasica, laboratorioLogicaAvanzada, etc.).
//Se crean instancias de categorías (categoriaLogica, categoriaEmpresarial, etc.) pasando los laboratorios correspondientes.
const categoriaLogica: Categoria = new Categoria('Lógica', [laboratorioLogicaBasica, laboratorioLogicaAvanzada]);
const categoriaEmpresarial: Categoria = new Categoria('Empresarial', [laboratorioEmpresarial]);
const categoriaRetos: Categoria = new Categoria('Retos', [laboratorioRetos]);
//Se crean instancias de participantes (participante1, participante2, etc.) con datos de nombre, modalidad, laboratorio, computadora y software requerido.
const participante1: Participante = {
  nombre: 'Juan',
  modalidad: 'Lógica',
  laboratorio: categoriaLogica.obtenerLaboratorioDisponible()!,
  computadora: new LogicaBasicaDecorator({ nombre: 'Computadora 1', softwareInstalado: [] }),
  softwareRequerido: ['Software específico 1', 'Software específico 2'],
};

const participante2: Participante = {
  nombre: 'María',
  modalidad: 'Empresarial',
  laboratorio: categoriaEmpresarial.obtenerLaboratorioDisponible()!,
  computadora: new EmpresarialDecorator({ nombre: 'Computadora 2', softwareInstalado: [] }),
  softwareRequerido: ['Software específico 1', 'Software específico 3'],
};

const concurso = Concurso.getInstance();
concurso.registrarParticipante(participante1);
concurso.registrarParticipante(participante2);
//Se muestra el detalle de los participantes registrados utilizando mostrarDetalleParticipantes().
concurso.mostrarDetalleParticipantes();
