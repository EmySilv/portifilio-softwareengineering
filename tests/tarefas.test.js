const request = require('supertest');
const app = require('../src/app');

describe('API de Tarefas', () => {
  it('Deve criar uma nova tarefa', async () => {
    const response = await request(app).post('/tarefas').send({
      id: 101,
      titulo: 'Testar tarefa',
      descricao: 'Teste com Supertest',
      status: 'pendente',
      criado_por: 'test001'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toMatch(/Tarefa criada/i);
  });

  it('Deve retornar lista de tarefas', async () => {
    const response = await request(app).get('/tarefas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
