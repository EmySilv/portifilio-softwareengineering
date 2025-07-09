SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_gestaoecontrole
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_gestaoecontrole` DEFAULT CHARACTER SET utf8 ;
USE `db_gestaoecontrole` ;

-- -----------------------------------------------------
-- Table `db_gestaoecontrole`.`tarefas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_gestaoecontrole`.`tarefas` (
  `id` INT NOT NULL,
  `titulo` VARCHAR(100) NOT NULL,
  `data` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `descricao` VARCHAR(225) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



USE `db_gestaoecontrole`;

INSERT INTO `tarefas` (`id`, `titulo`, `descricao`, `status`) VALUES
(1, 'Planejar reunião de equipe', 'Preparar a pauta e os materiais para a reunião semanal com a equipe de desenvolvimento.', 'pendente'),
(2, 'Responder e-mails pendentes', 'Verificar e responder todos os e-mails urgentes da caixa de entrada.', 'pendente'),
(3, 'Comprar suprimentos de escritório', 'Fazer a lista e ir à papelaria comprar canetas, papéis e cartuchos de impressora.', 'concluida'),
(4, 'Revisar relatório de vendas - Q2', 'Analisar os dados de vendas do segundo trimestre e elaborar um relatório detalhado.', 'em-andamento'),
(5, 'Agendar consulta com dentista', 'Ligar para o consultório do dentista para marcar a consulta de rotina.', 'nao-iniciado'),
(6, 'Desenvolver nova funcionalidade X', 'Implementar a funcionalidade de busca avançada no módulo de produtos.', 'em-andamento'),