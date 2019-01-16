# Migração do Ponto de Controle

Script de migração da coleção `controlpoints` do projeto Relog Solution

Coleção antiga:
```json
{
    ...
    "lat" : -26.6228003,
    "lng" : -48.7193204,
    ...
}
```

Coleção nova:
```json
{
    ...
    "geofence" : {
        "coordinates" : [ 
            {
                "lat" : -26.6228003,
                "lng" : -48.7193204,
            }
        ],
        "radius" : 1000,
        "type" : "c"
    },
    ...
}
```

## Getting Started

Essas instruções vão auxiliar a rodar o script de migração, é bem simples.

### Pré-requisitos

Realizar o dump do banco da cebrace em *produção*

```sh
mongodump --port 33048 -db cebrace
```

Passar o dump em *produção* para a sua pasta *local*

Se existir o banco com o nome `cebrace` *localmente*, temos que remover ele e rodar o mongorestore
```sh
mongorestore -db cebrace <caminho da pasta>
```

Pronto! Agora é só rodar o script

### Instalando

Passo a passo do que você precisa fazer para rodar o script

Instale as dependências do projeto

```
npm install
```

E rode o script

```
npm start
```

Pronto! A collection _controlpoints_ estará migrada e agora é só preciso realizar o dump *localmente*, passar arquivo do dump para *produção* e rodar o mongorestore em *produção*
```sh
mongorestore --port 33048 -db cebrace <caminho da pasta do dump>
```

## Authors

* **Sérgio Santos** - *geofence-migration* - [giorgiosaints](https://github.com/giorgiosaints)