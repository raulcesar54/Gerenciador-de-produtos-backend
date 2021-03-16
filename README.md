### MESTRES DA WEB - BACK END

#### Iniciar projeto
ao clonar projeto deve-se usar o comando abaixo para instalar as dependencias do projeto.
`$ yarn`

inicia a aplicação na porta **3333**
`$ yarn dev`

dados de acesso da base de dados fica no arquivo ormconfig.json
```
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "api_comercial",
  "entities":["./src/models/*.ts"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
```
####Rotas da aplicação
>/users

``POST`` cria um usuario para utilizar as demais rotas protegidas.

######body da requisição
```
{
	"name": "username",
	"email": "email@user.com.br",
	"password": "*****",
	"role":1
}```
role : 1 == admin, permisões de listagem e crud

------------



>/sessions

``POST`` gera token jwt para acessar rotas protegidas.

######body da requisição
```
{
	"email": "email@user.com.br",
	"password": "****"
}```

------------
>/skus

``POST`` cadastra um novo sku

######body da requisição
```
{
	"name": "SKUNAME"
}```
sku é utilizado para agrupar produtos, cada sku deve conter produtos com nomes unicos

``GET`` listagem de sku
tras a lista de sku, relacionando com os produtos cadastrados e agrupando os por sku.

------------




>/products

``POST`` salva um novo produto na tabela de produtos.

######body da requisição
```
{
	"name":"produto",
	"qty":1,
	"size":"M",
	"sku_id":"uuid"
}```
grava um produto na tabela de produtos, e relaciona ela com a tabela de sku, pelo sku_id

``GET`` listagem de produtos
tras a lista de todos produtos salvo no banco


