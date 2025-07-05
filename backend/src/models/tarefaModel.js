// Definição simples da entidade Tarefa
class Tarefa {
  constructor(id, titulo, descricao, status, dataCriacao) {
    this.id = id;               // string UUID
    this.titulo = titulo;       // string
    this.descricao = descricao; // string
    this.status = status;       // string ("pendente", "concluida", etc)
    this.dataCriacao = dataCriacao; // Date
  }
}

module.exports = Tarefa;
