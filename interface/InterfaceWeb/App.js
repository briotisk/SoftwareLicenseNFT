import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ethers } from 'ethers';

export default function App() {

  const [myAddress, setMyAddress] = useState("");
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

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
    
    // Cria uma instância ethers usando o provider ethereum
    const provider = new ethers.BrowserProvider(window.ethereum);
  
    try {

      // Tenta obter as contas do MetaMask
      const accounts = await provider.send('eth_requestAccounts', []);

    } catch (error) {

      // Se o MetaMask não estiver instalado ou se o usuário não der permissão, será lançado um erro
      console.error('Erro ao acessar contas do MetaMask:', error.message);

    }

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

      {isMetaMaskInstalled && (
        <View style={styles.metaMaskView}>
          <Text style={styles.metaMaskText}>Conect-se para continuar!</Text>
          <Button
            onPress={connect}
            title="Conectar"
            color="#add8e6"
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

    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  metaMaskView: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  metaMaskText: {
    fontWeight: 'bold',
  },
});