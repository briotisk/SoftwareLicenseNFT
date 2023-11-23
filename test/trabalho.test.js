const SoftwareLicense = artifacts.require("SoftwareLicense");

contract('SoftwareLicense', ([owner, person1, person2, person3, person4, person5, person6, person7, person8, person9]) => {

    let contractInstance;

    before(async () => {
        contractInstance = await SoftwareLicense.deployed();
    });

    describe("Validação do contrato SoftwareLicense:", async () => {

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
            const meuContratoInstance = await SoftwareLicense.new(bigNumberObj, "LICENSE", {from: owner});
        
            //acessa o valor da licença e verifica se é o mesmo passado como argumento na implantação do contrato
            const licensePrice = await meuContratoInstance.licensePrice();
            assert.equal(licensePrice.toString(), bigNumberObj.toString(), "A variável pública não tem o valor esperado");

            //chama a função de compra, armazena o seu retorno e verifica se a compra foi bem sucedida
            purchaseOK = await meuContratoInstance.purchaseLicense({ from: person4, value: bigNumberObj });
            assert.isTrue(purchaseOK.receipt.status, "A função deveria retornar \"true\"");

        });

        //Cenários a serem testados:

        //OBS: No cenárrio 1 - verificar se o dinheiro está indo pra conta do dono do contrato

        /**
         *      Testar o comportamento da função de compra quando a quantia errada é enviada para o contrato (deve acionar a 
         *  cláusula 'revert'). 
         */

        /**
         *      Testar a função de print da licença no caso ideal, onde o msg.sender já adquiriu a licença (deve printar a chave)
         */

        /**
         *      Testar a função de print da licença no caso em que o msg.sender não adquiriu a licença (deve acionar o 'revert')
         */

        /**
         *      Testar a função withdrawFunds() quando o owner do contrato a executa (deve realizar a transferência)
         */

        /**
         *      Testar a função withdrawFunds() quando alguém além do owner do contrato a executa (deve acionar o 'revert')
         */

/*
Exemplo de teste onde deve haver o acionamento da cláusula 'revert':

    it('Deve acionar um revert', async () => {

        const meuContratoInstance = await MeuContrato.new();

        try {
          // Chame uma função que deve acionar um revert
          await meuContratoInstance.funcaoQueDeveReverter({ from: accounts[0] });

          // Se a função não acionar um revert, falhe no teste
          assert.fail('A função não acionou um revert');
        } catch (error) {
          // Verifique se a mensagem de erro contém a string esperada
          assert.include(
            error.message,
            'revert',
            'A função não acionou um revert como esperado'
          );
        }
    });

*/

    });

});
