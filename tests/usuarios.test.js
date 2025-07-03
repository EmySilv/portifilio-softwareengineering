const request = require('supertest');
const app = require('../src/app');

describe('API de Usuários', () => {
  it('Deve registrar um novo usuário', async () => {
    const response = await request(app).post('/usuarios/register').send({
      id: 'test001',
      username: 'usuarioTeste',
      email: 'teste@teste.com',
      senha: '1234'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toMatch(/Usuário registrado/i);
  });

  it('Deve falhar no login com senha incorreta', async () => {
    const response = await request(app).post('/usuarios/login').send({
      username: 'usuarioTeste',
      senha: 'senhaErrada'
    });

    expect(response.statusCode).toBe(401);
  });
});
