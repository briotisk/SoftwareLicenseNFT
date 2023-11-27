import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ethers } from 'ethers';
const ContractABI = require('../../build/contracts/SoftwareLicense.json');
const contractABI = ContractABI.abi;

export default function App() {

  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const contractAddress = "0x546d54521644cAf99e8858f37CDb2dfFcC600599";//colocar o endereço do contrato obtido no deploy
  const licensePrice = "0.0125";//colocar o preço da licença definido na hora do deploy
  const decimals = 18;//colocar o número de decimais do token(18 é o padrão)
  
  //const contractABI = [
  //  "function purchaseLicense() external payable hasNotPurchasedLicense ",
  //  "function printSoftwareKey() external view hasPurchasedLicense returns (bytes32)",
  //  "event LicensePurchased(address indexed buyer, uint256 timestamp)"
  //];//escrever aqui o ABI do contrato com todas as funções e eventos a serem usados

  async function checkMetaMaskInstalled() {

    // Verifica se a extensão ethereum está presente no window
    if (window.ethereum) {

     return true;

    } else {

      console.error('MetaMask não está instalado.');
      return false;

    }

  }

  async function connect() {
    try {
      // Verifica se o MetaMask está presente
      if (window.ethereum) {
        await window.ethereum.enable(); // Solicita permissão ao usuário para conectar o MetaMask
  
        // Cria um Signer a partir do MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum, "any");
        const signer = provider.getSigner();
  
        // Tenta obter as contas do MetaMask
        const accounts = await provider.listAccounts();
  
        // Recarrega a aplicação no caso em que o usuário troca de rede 
        provider.on("network", (newNetwork, oldNetwork) => {
          if (oldNetwork) window.location.reload();
        });
  
        setIsConnected(true);
      } else {
        console.error('MetaMask não está instalado.');
        setIsConnected(false);
      }
    } catch (error) {
      // Se o MetaMask não estiver instalado ou se o usuário não der permissão, será lançado um erro
      console.error('Erro ao acessar contas do MetaMask:', error.message);
      setIsConnected(false);
    }
  }

  /*
  async function connect() {
    
    // Cria uma instância ethers usando o provider ethereum
    const provider = new ethers.BrowserProvider(window.ethereum, "any");
  
    try {

      // Tenta obter as contas do MetaMask
      const accounts = await provider.send('eth_requestAccounts', []);

      //Recarrega a aplicação no caso emm que o usuário troca de rede 
      provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) window.location.reload();
      });

      setIsConnected(true);

    } catch (error) {

      // Se o MetaMask não estiver instalado ou se o usuário não der permissão, será lançado um erro
      console.error('Erro ao acessar contas do MetaMask:', error.message);

      setIsConnected(false);

    }

  }
*/
  async function purchaseLicense() {

    try {
      const provider = new ethers.BrowserProvider(window.ethereum, "any");
      const signer = provider.getSigner();

      // Primeiro, crie o contrato usando o ABI e o endereço
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      // Em seguida, conecte o contrato ao signer
      const contractSigner = contract.connect(signer);

      // Verifique se a função purchaseLicense existe no contrato
      if (!contractSigner.purchaseLicense) {
          console.error("A função purchaseLicense não foi encontrada no contrato.");
          return;
      }

      // Agora você pode chamar a função purchaseLicense
      const tx = await contractSigner.purchaseLicense({ value: ethers.parseUnits(licensePrice, decimals) });

      // Adicione um log para o hash da transação
      console.log("Transação enviada. Hash da transação:", tx.hash);

      // Agora você pode retornar o objeto de transação
      return tx;
  } catch (error) {
      console.error("Erro durante a execução da função purchaseLicense:", error);
  }
    //onst provider = new ethers.BrowserProvider(window.ethereum, "any");
    //onst signer = provider.getSigner();
    //onst contract = new ethers.Contract(contractAddress, contractABI, provider);
    //onst contractSigner = contract.connect(signer);
    //onst tx = await contractSigner.purchaseLicense({ value: ethers.parseUnits(licensePrice, decimals) });
    
    //console.log(tx);
    //return tx;

  }

  async function printLicense() {

    const provider = new ethers.BrowserProvider(window.ethereum, "any");
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const tx = await contract.printLicense();

    console.log(tx);
    return tx;

  }

  useEffect(() => {

    async function checkMetaMask() {

      try {

        // Chamada da função que verifica o MetaMask
        const installed = await checkMetaMaskInstalled();
        
        // Atualiza o estado com base no resultado da verificação
        setIsMetaMaskInstalled(installed);

      } catch (error) {

        console.error('Erro ao verificar o MetaMask:', error.message);

      }

    }

    // Chamada da função de verificação ao iniciar o componente
    checkMetaMask();

  }, []); // O array vazio [] assegura que o efeito só seja executado uma vez, sem depender de variáveis de estado


  return (

   <View style={styles.container}>

      {isMetaMaskInstalled && !isConnected &&(
        <View style={styles.metaMaskView}>
          <Text style={styles.metaMaskText}>Conecte-se para continuar!</Text>
          <Button
            onPress={connect}
            title="Conectar"
            color="#8da8ff"
          />
        </View>
      )}
 
      {!isMetaMaskInstalled && (
        <View style={styles.metaMaskView}>
          <Text style={styles.metaMaskText}>:(</Text>
          <Text style={styles.metaMaskText}>Parece que você não possui a Metamask instalada...</Text>
          <Text style={styles.metaMaskText}>Instale para continuar!</Text>
        </View>
      )}

      {isConnected &&(
        <View style={styles.metaMaskText}>
          <Text style={styles.metaMaskText}>O que deseja fazer?</Text>
        </View>
      )}

      {isConnected &&(
        <View style={styles.row}>
          <Button
            onPress={purchaseLicense}
            title="Comprar Licença"
            color="#8da8ff"
          />
          <View style={styles.horizontalMargin} />
          <Button
            onPress={printLicense}
            title="Imprimir Licença"
            color="#8da8ff"
          />
        </View>
      )}

    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaMaskView: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 5,
  },
  metaMaskText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  horizontalMargin: {
    marginHorizontal: 10,
  },
});