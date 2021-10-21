
- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
-- -----------------------------------------------------
-- Schema venta
-- -----------------------------------------------------
SHOW WARNINGS;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `fecha`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fecha` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `fecha` (
  `idfecha` INT NOT NULL,
  `fechaInicial` DATETIME NOT NULL,
  `fechaFinal` DATETIME NOT NULL,
  PRIMARY KEY (`idfecha`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `vendedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vendedor` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `vendedor` (
  `idvendedor` INT NOT NULL AUTO_INCREMENT,
  `nombreVendedor` VARCHAR(45) NOT NULL,
  `fecha_idfecha` INT NOT NULL,
  PRIMARY KEY (`idvendedor`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `producto` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `producto` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `producto` VARCHAR(45) NOT NULL,
  `stock` INT NOT NULL,
  `precio` DOUBLE NOT NULL,
  `cantidad` INT NOT NULL,
  `vendedor_idvendedor` INT NOT NULL,
  PRIMARY KEY (`idproducto`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cliente` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `cliente` (
  `idcliente` INT NOT NULL AUTO_INCREMENT,
  `nombreCliente` VARCHAR(45) NOT NULL,
  `documentoCliente` INT NOT NULL,
  `vendedor_idvendedor` INT NOT NULL,
  PRIMARY KEY (`idcliente`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mercado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mercado` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mercado` (
  `idmercado` INT NOT NULL,
  `tipoTienda` VARCHAR(45) NOT NULL,
  `producto_idproducto` INT NOT NULL,
  PRIMARY KEY (`idmercado`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `estado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `estado` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `estado` (
  `idestado` INT NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `producto_idproducto` INT NOT NULL,
  PRIMARY KEY (`idestado`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `totalVenta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `totalVenta` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `totalVenta` (
  `idtotalVenta` INT NOT NULL,
  `totalVenta` DOUBLE NOT NULL,
  `vendedor_idvendedor` INT NOT NULL,
  PRIMARY KEY (`idtotalVenta`))
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
