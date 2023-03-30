import { Planta } from './planta.model';

export class Plantas {
  static MANJERICAO: Planta = {
    nome: 'Manjericão',
    luminosidade: 50,
    umidade: 86.67,
    temperatura: 20,
  };

  static SUCULENTA: Planta = {
    nome: 'Suculenta',
    luminosidade: 64,
    umidade: 34.53,
    temperatura: 32,
  };

  static CACTO: Planta = {
    nome: 'Cacto',
    luminosidade: 70,
    umidade: 22.5,
    temperatura: 30,
  };

  static ORQUIDEA: Planta = {
    nome: 'Orquídea',
    luminosidade: 120,
    umidade: 55,
    temperatura: 25,
  };

  static ALFACE: Planta = {
    nome: 'Alface',
    luminosidade: 60,
    umidade: 70,
    temperatura: 18,
  };

  static PLANTAS: Planta[] = [
    this.MANJERICAO,
    this.SUCULENTA,
    this.CACTO,
    this.ORQUIDEA,
    this.ALFACE,
  ];
}
