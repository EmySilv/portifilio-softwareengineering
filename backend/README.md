# 💻  Da Gestão ao Controle de Qualidade.

Projeto desenvolvido para a disciplina de Software Engineering para gestão e controle de qualidade de um sistema desenvolvido pela empresa TechFlow Solutions.

## 📍 Objetivos
O objetivo é otimizar os processos de controle de estoque, integrando todas as operações em uma única plataforma acessível, segura e com interface intuitiva, considerando que os usuários têm pouco conhecimento técnico.

## Metodologias utilizadas
As metodologias para criação do sistema foram o Scrum e o Kanban, que juntas formam o ScrunBan, como alguns chamam. Que nada mais é que a junção das duas metodologias ágeis, visando a melhor eficiencia do projeto, com monitoramento constante com Dailys Sprint e a utilização do Quadro kanban.

## Clonar o repositório
`Comando:` git clone https://github.com/EmySilv/portifilio-softwareengineering.git

## Configure o banco de dados
Pegue o modelo que está disponivel na pasta: `backend\src\database\db_gestaecontrole.sql`
Certifique-se de que está na home do seu xampp e cole o modelo, executando o mesmo

## Inicializando o sistema
Para inicializar o sistema verifique se está no caminho `C:Seuusuario\portifolio-softwareengineering\backend\` e execute o seguinte comando para instalar as dependências do packege.json: `npm install`

Após isso, entre no caminho `C:Seuusuario\portifolio-softwareengineering\backend\src\` e execute o comando `node server.js`, assim iniciará o backend.

Com a extensão do *Five Server* instalada clique com botão direito sobre o index.html no caminho `frontend\html\index.html`, abra o arquivo com o *Five Server* ou pelo caminho `http://127.0.0.1:5500/frontend/html/index.html` no seu navegador. Isso iniciará o frontend e assim poderá utiliza-lo.