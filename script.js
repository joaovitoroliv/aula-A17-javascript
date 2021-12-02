// Aula A17
// Retomar conceitos da ultima aula: Anonymous functions, currying e closures
// Mas também Aprender sobre Fetch API, Conceito de Promises e formato JSON

// Retomada da função findIndex
const flavors = ['vanilla', 'chocolate', 'strawberry', 'green tea'];
// Define uma funçao teste que vai verificar cada elemento da lista (retorna true se passar no teste)
function isStrawberry(element){
  // retorna true ou false
  return (element === 'strawberry');
}
// The testing function can take element, inedx, and arrays as parameteres but we only using element
const indexOfStrawberry = flavors.findIndex(isStrawberry);
console.log('O Strawberry esta localizado na posicao '+ indexOfStrawberry + ' do array');

// Usando função anonima para limpar a funcao de call back
const index = flavors.findIndex( function (element) { return element === 'strawberry'; });
console.log(index);

// Simplificando ainda mais usando arrow function
// Consigo tirar o paranteses de (element) pois só tem um parametro
// Consigo tirar as chaves {} da funcao pois só tenho uma instrução
const index2 = flavors.findIndex(element => element === 'strawberry');
console.log(index2);

// Case-insensitive search - Converter todos para letra minuscula para fazer a busca
const index3 = flavors.findIndex(element => element.toLowerCase() === 'strawberry');
// O que é muito mais interessante que um for-loop
for (let i = 0; i < flavors.length; i++){
  if (flavors[i].toLowerCase() === 'strawberry'){
    break;
  }
}

// Currying:
// - Quero saber na função se o elemento da lista é igual um input do usuário
// Solução: criar uma função que segura o flavor como parametro e cria uma funcao para testar esse parametro
function createFlavorTest (flavor){
  // CLOSURE - função dentro de função
  function isFlavor (element){
    return element === flavor;
  }
  // CURRYING - Retornando a função interna
  return isFlavor;
}
// Cria uma função para testar o 'strawberry'
const isStrawberry2 = createFlavorTest('strawberry');
const isVanilla = createFlavorTest('vanilla');
// Crio uma função com callback que irá me retornar onde está strawberry
const indexOfFlavor = flavors.findIndex(isStrawberry);
const indexofFlavor2 = flavors.findIndex(isVanilla);
console.log(isStrawberry2);
console.log(indexOfFlavor);
console.log(isVanilla);
console.log(indexofFlavor2);

// Como carregar dados de arquivos externos (planilhas por exemplo)
// - Carregar uma lista de imagens dentro do meu código JS
// Opção 1: API Hipotética (fake) de nome loadFromFile
// Ex: const contents = loadFromFile('images.txt');
// Alguns problemas: 
// - A Lista está no servidor e existe uma demora para carregar. Solução: Resolver de forma ASSÍNCRONA
//   - Ou seja, Não quero parar o meu código JS de funcionar, enquanto os arquivos estao sendo carregados meu JS está rodando outras tarefas.
// - Pode ser que meu código nem encontre o meu arquivo no servidor
function onSucess (response){
  const body = response.text;
  // ...
}
// Passando duas callbacks functions: a primeira se eu consegui carregar o arquivo executa onSucess, a segunda se falhei executa onFail
// CODE: loadFromFile('images.txt' , onSucess, onFail);

// API FETCH: A api fetch é a api usada para carregar recursos externos (text, json, etc) no browser
//  - Carregar images.txt
// CODE: fetch('images.txt');
//   - Essa api tomou o lugar de uma outra que era utilizada antigamente: 'XMLHttpRequest', ainda funcional mas dificil de usar.
// - O que faz essa fetch(): retorna uma 'Promise' - o que é um 'Promise'?

// Promises and .then():
// - Um objeto utilizado para gerenciar objetos assincronos
// - Possui um método then() que possibilita vc anexar funçoes para executar caso encontre o arquivo executa 'onSucess' e caso de um erro executa 'onError'
// - Possibilita a construção de 'chains' de uma função assincrona (cadeias de resultados de funçao assincrona)
// EXEMPLO: Pegar a stream da Webcam do usuário utilizando getUserMedia
// - Antigamente: navigator.getUserMedia (usa callback)
// - Recentemente: navigator.mediaDevices.getUserMedia
//   - Retorna uma Promise

// Primeiro exemplo usando callback direto sem receber Promise:
// Video que captura uma tag do tipo video no HTML:

// const video = document.querySelector('video');
// // Parametro stream por Default
// function onCameraOpen(stream){
//   video.srcObject = stream;
// }
// // Parametro error pode Default
// function onError(error){
//   console.log(error);
// }
// // Habilita o video pra true, onCameraOpen se der certo, se nao der vai pra onError
// navigator.getUserMedia({ video: true }, onCameraOpen, onError);

// getUserMedia usando Promise - USAR ESSA!
const video2 = document.querySelector('video');
function onCameraOpen2(stream){
  video2.srcObject = stream;
}
function onError2(error){
  console.log(error);
}
// Esse modo trabalha de forma assincrona, com promise, pode ser que aconteça ou não.
// - A promise  é utilizada para tratar requisições assincronas. Pode ser que demore para os dados chegarem, mas ela aguarda até que eles venham ou até que dê algum erro, sem travar a execução do resto do código.
navigator.mediaDevices.getUserMedia({ video: true }).then(onCameraOpen2, onError2);

// Real Fetch API
function onSucess(response){
  //...
}
function onFail(response){
  //...
}
// tenta pegar o arquivo images.txt. Em sucesso executa onSucess, em falha executa onFail.
fetch('images.txt').then(onSucess, onFail);
// outra forma de escrever:
const promise = fetch('images.txt');
promise.then(onSucess, onFail);

// Sintaxe da Promise:
// - Pode ter três estados:
//   - pending: estado inicial, nem funcionou e nem deu erro ainda
//   - fulfilled: a operação foi completada com sucesso
//   - rejected: a operação falhou.
// - Para usar os handlers temos que usar o .then()

// Usando Fetch:
console.log('Usando o Fetch');
function onSucess2(response){
  // Se tudo der certo iremos receber um status com o código de status 200 (HTTP Status Codes)
  console.log(response.status);
  // Como pegar o conteudo do arquivo? Usando o .text() que irá retornar outra Promise
  // Acessando a promise com .then(function)
  response.text().then(onStreamProcessed);
}

function onStreamProcessed(text){
  console.log(text);
}

function onError(error){
  console.log('Error: ' + error);
}
// Error 200 - OK 
fetch('images.txt').then(onSucess2, onError2);

// Podemos reescrever o código anterior usando Encadeamento de Promises:
function onStreamProcessed_(text){
  console.log(text);
}

function onResponse (response){
  return response.text();
}

function onError_ (error){
  console.log('Error ' + error);
}
fetch ('images.txt').then(onResponse, onError_).then(onStreamProcessed_);

// Exemplo mais completo:
function onStreamProcessedComplete(text){
  const urls = text.split('\n');
  for (const url of urls){
    const image = document.createElement('img');
    image.src = url;
    document.body.append(image);
  }
}
function onSucessComplete(response){
  // Promise
  response.text().then(onStreamProcessedComplete);
}
function onErrorComplete(error){
  console.log('Error: ' + error);
}
fetch('images.txt').then(onSucessComplete, onErrorComplete);

// Como criar um Servidor HTTP Simples para carregar as imagens