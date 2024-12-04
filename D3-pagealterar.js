// Função para cadastrar um novo item no estoque
function cadastrarItem() 
{// Recupera os valores dos campos do formulário
const nome = document.getElementById("inputproduto").value.trim();
const quantidade = parseInt(document.getElementById("inputquantidade").value);
const preco = parseFloat(document.getElementById("inputpreco").value);
// Valida os campos
if (!nome || quantidade <= 0 || preco <= 0 || isNaN(quantidade) || isNaN(preco)) 
{alert("Por favor, preencha os campos corretamente com valores válidos.");return;}
// Cria o objeto do novo material
const novoMaterial = { nome, quantidade, preco };
// Recupera o estoque do LocalStorage ou inicializa um vazio
let estoque = JSON.parse(localStorage.getItem("B3-estoque")) || [];
estoque.push(novoMaterial);
// Salva o estoque atualizado no LocalStorage
localStorage.setItem("B3-estoque", JSON.stringify(estoque));
// Exibe uma mensagem de sucesso
alert("Material cadastrado!");
// Limpa os dados do formulário
document.getElementById("formulario").reset();
// Atualiza a tabela de estoque
atualizarEstoque();}
    
// Função para carregar e exibir o estoque do LocalStorage
function carregarEstoque() {
const estoque = JSON.parse(localStorage.getItem("B3-estoque")) || [];
const tabelaEstoque = document.getElementById("tabelaEstoque");
if (tabelaEstoque) {const tbody = tabelaEstoque.querySelector("tbody");
// Limpa o conteúdo da tabela
tbody.innerHTML = ""; 
// Exibe mensagem para estoque vazio
if (estoque.length === 0) 
{const row = tbody.insertRow();
row.innerHTML = `<td colspan="4">O estoque está vazio.</td>`;return;}
// Adiciona os itens do estoque à tabela
estoque.forEach((item, index) => 
{const row = tbody.insertRow();row.innerHTML = 
`<td>${item.nome}</td>
<td>${item.quantidade}</td>
<td>R$ ${parseFloat(item.preco).toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td>
<td><button id="botaoeditar" onclick="editProduct(${index})">
<img id="imgalterar" width="25" height="25"
src="https://img.icons8.com/material-rounded/100/737373/create-new.png" alt="trash"/></button></td>`;});}}
// Atualiza a tabela de estoque sempre que necessário
function atualizarEstoque() 
{carregarEstoque();}
// Adiciona os eventos de carregamento de página e formulário
document.addEventListener("DOMContentLoaded", function () 
{// Carrega os dados do estoque ao carregar a página
carregarEstoque();
// Configura o formulário de cadastro
const formCadastro = document.getElementById("formulario");
if (formCadastro) {formCadastro.addEventListener("submit", function (e) 
{// Previne o envio padrão do formulário
e.preventDefault();
// Chama a função de cadastro
cadastrarItem();});}});

function deleteProduct(index) 
{// Carregar o estoque atual do localStorage
let estoque = JSON.parse(localStorage.getItem("B3-estoque")) || [];
// Remover o item pelo índice
estoque.splice(index, 1);
// Atualizar o estoque no localStorage
localStorage.setItem("B3-estoque", JSON.stringify(estoque));
// Exibir o estoque atualizado
carregarEstoque();}

//Função para editar um item no estoque
function editProduct(index) {
let estoque = JSON.parse(localStorage.getItem("B3-estoque")) || [];
const item = estoque[index];
// Preencher os campos do formulário com os dados do item selecionado
document.getElementById('nome').value = item.nome;
document.getElementById('quantidade').value = item.quantidade;
document.getElementById('preco').value = item.preco;
// Alterar a ação do formulário para salvar a edição
const form = document.getElementById("form");
form.onsubmit = function(event) 
{event.preventDefault();
// Atualizar os dados do item com os novos valores
item.nome = document.getElementById('nome').value.trim();
item.quantidade = document.getElementById('quantidade').value;
item.preco = document.getElementById('preco').value;
// Salvar o estoque atualizado no LocalStorage
localStorage.setItem("B3-estoque", JSON.stringify(estoque));
// Atualizar a tabela de estoque
carregarEstoque();
// Limpar o formulário
form.reset();
form.onsubmit = adicionarProduto;
//Restaurar a função original do formulário para cadastro de novo item
form.onsubmit = function(e) 
{e.preventDefault(); cadastrarItem();};};}
