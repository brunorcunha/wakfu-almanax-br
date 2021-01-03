# Wakfu - Almanax (Português do Brasil)
[![Netlify Status](https://api.netlify.com/api/v1/badges/53b5cb69-e480-44e5-b25a-bd78d137fa4a/deploy-status)](https://app.netlify.com/sites/almanax/deploys)

Projeto desenvolvido em VueJS para exibição dos dados do almanax traduzidos para português.

<p style="text-align: center;">
  <a href="https://almanax.netlify.app" target="_blank">
    [ Confira a Demo ]
  </a>
</p>

![screen](https://user-images.githubusercontent.com/3453372/103476667-9844a200-4d96-11eb-8c43-962b13f05b75.png)

## Começando

As instruções abaixo farão com que você tenha uma cópia local em execução na sua máquina para fins de estudos.

### Pré-requisitos

Você precisará de algumas coisas antes de continuar.

```
- Última versão do NodeJS.
- Alguma IDE (Editor) para alterar/executar o código.
- O Git para clonar o projeto e enviar pull requests.
```

## Instalando

Com tudo pronto e instalado, clone o projeto para alguma pasta específica.

```
git clone https://github.com/brunorcunha/wakfu-almanax-br.git
```

Acesse a pasta do projeto para executar os próximos comandos.

```
npm i
```

NPM é nosso gerenciador de pacotes do Node e o comando `npm i` é uma abreviação de `npm install`, que irá instalar todas as dependencias do projeto.

```
npm start
```
O comando `npm start` irá executar o projeto.

## Rodando os testes

Para executar os testes unitários, utilize o comando:

```
npm run unit
```

Sempre rode os testes para manter a aplicação funcionando, excepcionalmente antes de fazer um pull request.

## Deploy

Deploy é quando o código é organizado para a produção. A produção é o código que os usuários finais poderão ter acesso.

```
npm run build
```

O projeto já está configurado para deploy automático na Netlify assim que a Master (branch) é atualizada.
