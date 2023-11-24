var inputReader = require('readline-sync');
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://ethereum-goerli.publicnode.com"); //URL do provedor utilizado no deploy do contrato
const contractAddress = ""; //endereço do contrato

const contractABI = require('./build/contracts/SoftwareLicense.json'); // Importação do ABI do contrato
const { abi: ContractABI } = contractABI;

const contract = new ethers.Contract(contractAddress, ContractABI, provider);

//conectar com a carteira

//comprar a licença

//printar a chave