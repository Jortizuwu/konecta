CREATE TABLE `product` (
	`id_product` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`reference` varchar(255) NOT NULL,
	`price` INT NOT NULL,
	`weight` INT NOT NULL,
	`category` varchar(255) NOT NULL,
	`stock` INT NOT NULL DEFAULT '0',
	`creation_date` DATE NOT NULL,
	PRIMARY KEY (`id_product`)
);

CREATE TABLE `sale` (
	`id_sale` INT NOT NULL AUTO_INCREMENT,
	`id_product` INT,
	`quantity` INT NOT NULL,
	PRIMARY KEY (`id_sale`)
);

ALTER TABLE `sale` ADD CONSTRAINT `sale_fk0` FOREIGN KEY (`id_product`) REFERENCES `product`(`id_product`);


-- quitar comentarios

-- Realizar una consulta que permita conocer cuál es el producto que más stock tiene.
SELECT MAX(product.stock) FROM product;

-- Realizar una consulta que permita conocer cuál es el producto más vendido.
SELECT sale.id_product, Sum(sale.quantity) AS resp FROM sale GROUP BY sale.id_product;
