export interface Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
}

export interface Usuario {
  filter: any;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: Endereco;
  id: number;
}

export interface Acesso {
  id: number;
  email: string;
  senha: string;
}