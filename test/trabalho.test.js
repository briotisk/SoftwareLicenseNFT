const SoftwareLicense = artifacts.require("SoftwareLicense");
var sha256 = require('js-sha256');

contract('SoftwareLicense', ([owner, person1, person2, person3, person4, person5, person6, person7, person8, person9]) => {

    describe("Validação do contrato SoftwareLicense:", async () => {

      //OBS: No cenário 1 - verificar se o dinheiro está indo pra conta do dono do contrato
      it('Cenário 1', async () => {
        
        /**
         *      Testa se o preço da licença está de acordo com o especificado após a criação do contrato, também testa a função
         *  de compra da licença no caso em que a quantia correta é enviada para realizar a compra.
         */

        //convertendo o valor em gwei para big number
        const valorString = '200000000000000000';
        var BN = web3.utils.BN;
        const bigNumberObj = new BN(valorString);//instancia um objeto da classe BN para armazenaro o valor
        let purchaseOK;

        //Implantando o contrato com os argumentos desejados
        const meuContratoInstance = await SoftwareLicense.new(bigNumberObj, "BLOCKCHAIN", {from: owner});
    
        //acessa o valor da licença e verifica se é o mesmo passado como argumento na implantação do contrato
        const licensePrice = await meuContratoInstance.licensePrice();
        assert.equal(licensePrice.toString(), bigNumberObj.toString(), "O preço da licença não corresponde o valor esperado");
        
        //chama a função de compra, armazena o seu retorno e verifica se a compra foi bem sucedida
        purchaseOK = await meuContratoInstance.purchaseLicense({ from: person3, value: bigNumberObj });
        assert.isTrue(purchaseOK.receipt.status, "A função deveria retornar \"true\"");
        
      });
      
      it('Cenário 2', async () => {

        /**
        *      Testa o comportamento da função de compra quando a quantia errada é enviada para o contrato (deve acionar a 
        *  cláusula 'revert'). 
        */

        //convertendo o valor em gwei para big number
        const valorString = '180000000000000000';
        var BN = web3.utils.BN;
        const bigNumberObj = new BN(valorString);//instancia um objeto da classe BN para armazenaro o valor
        let purchaseOK;

        //Implantando o contrato com os argumentos desejados
        const meuContratoInstance = await SoftwareLicense.new(bigNumberObj, "SOFTWARE", {from: owner});

        //acessa o valor da licença e verifica se é o mesmo passado como argumento na implantação do contrato
        const licensePrice = await meuContratoInstance.licensePrice();
        assert.equal(licensePrice.toString(), bigNumberObj.toString(), "O preço da licença não corresponde o valor esperado");
      
        try {

          //chama a função de compra enviando o valor errado para a compra, armazena o seu retorno e verifica se a compra foi bem sucedida
          purchaseOK = await meuContratoInstance.purchaseLicense({ from: person2, value: bigNumberObj+1 });
          assert.isFalse(purchaseOK.receipt.status, "A função deveria retornar \"false\"");

          // Se a função não acionar um revert, o teste deve falhar
          assert.fail('A função não acionou um revert');

        } catch (error) {

          // Verifica se a mensagem de erro contém a string que indica que houve um acionamento da cláusula 'revert'
          assert.include(error.message, 'revert', 'A função não acionou um revert como esperado');

        }

      });

      it('Cenário 3', async () => {

        /**
        *      Testa a função de print da licença no caso ideal, onde a aquisição da licença já foi realizada (deve printar a chave)
        */

        //convertendo o valor em gwei para big number
        const valorString = '250000000000000000';
        var BN = web3.utils.BN;
        const bigNumberObj = new BN(valorString);//instancia um objeto da classe BN para armazenaro o valor
        let key;
        let purchaseOK;

        //Implantando o contrato com os argumentos desejados
        const meuContratoInstance = await SoftwareLicense.new(bigNumberObj, "LICENSE", {from: owner});

        //acessa o valor da licença e verifica se é o mesmo passado como argumento na implantação do contrato
        const licensePrice = await meuContratoInstance.licensePrice();
        assert.equal(licensePrice.toString(), bigNumberObj.toString(), "O preço da licença não corresponde o valor esperado");
      
        //chama a função de compra, armazena o seu retorno e verifica se a compra foi bem sucedida
        purchaseOK = await meuContratoInstance.purchaseLicense({ from: person3, value: bigNumberObj });
        assert.isTrue(purchaseOK.receipt.status, "A função deveria retornar \"true\"");
        
        //chama a função de impressão da chave do software sem que a compra da licença tenha sido efetuada antes e verifica se a impressão ocorre
        key = await meuContratoInstance.printSoftwareKey({ from: person3 });
        
        //verifica se a chave obtida é igual à sha256 da seed usada para criar a chave
        assert.equal(key.substring(2), sha256("LICENSE"), "A chave está incorreta");

        /**
         *    OBS: O retorno da função printSoftwareKey() do contrato é uma string que se inicia em "0x", porém o retorno do
         *  método sha256() é uma string com o valor hexadecimal puro, ou seja, sem o prefixo "0x", por isso, para a comparação
         *  ser efetiva, é preciso ignorar esse começo por meio do método substring.
         */
        
      });

      it('Cenário 4', async () => {

        /**
        *      Testa a função de print da licença no caso não ideal, onde a aquisição da licença não foi realizada (deve acionar o 'revert')
        */

        //convertendo o valor em gwei para big number
        const valorString = '125000000000000000';
        var BN = web3.utils.BN;
        const bigNumberObj = new BN(valorString);//instancia um objeto da classe BN para armazenaro o valor
        let printOK;

        //Implantando o contrato com os argumentos desejados
        const meuContratoInstance = await SoftwareLicense.new(bigNumberObj, "SOFTWARENAME", {from: owner});

        //acessa o valor da licença e verifica se é o mesmo passado como argumento na implantação do contrato
        const licensePrice = await meuContratoInstance.licensePrice();
        assert.equal(licensePrice.toString(), bigNumberObj.toString(), "O preço da licença não corresponde o valor esperado");
      
        try {

          //chama a função de impressão da chave do software sem que a compra da licença tenha sido efetuada antes e verifica se a impressão ocorre
          printOK = await meuContratoInstance.printSoftwareKey({ from: person2 });
          assert.isFalse(printOK.receipt.status, "A função deveria retornar \"false\"");

          // Se a função não acionar um revert, o teste deve falhar
          assert.fail('A função não acionou um revert');

        } catch (error) {

          // Verifica se a mensagem de erro contém a string que indica que houve um acionamento da cláusula 'revert'
          assert.include(error.message, 'revert', 'A função não acionou um revert como esperado');

        }
        
      });

    });

});
