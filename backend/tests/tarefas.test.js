const request = require('supertest');
const app = require('../src/app');

describe('API de Tarefas', () => {
  it('Deve criar uma nova tarefa', async () => {
    const response = await request(app).post('/api/tarefas/').send({
      titulo: 'Testar tarefa',
      descricao: 'Teste com Supertest',
      status: 'pendente'
    });

    expect(response.statusCode).toBe(201);
  });

  it('Deve retornar lista de tarefas', async () => {
    const response = await request(app).get('/api/tarefas/');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
