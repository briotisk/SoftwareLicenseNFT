const SoftwareLicense = artifacts.require("SoftwareLicense");
const BigNumber = require('bignumber.js');

contract('SoftwareLicense', ([owner, person1, person2, person3, person4, person5, person6, person7, person8, person9]) => {

    let contractInstance;

    before(async () => {
        contractInstance = await SoftwareLicense.deployed();
    });

    describe("Validação do contrato SoftwareLicense:", async () => {

        //it('Licença obtida com sucesso!', async function () {
        //    //comprar e obter a licença
        //    let license;
        //    let purchaseOK;
        //    purchaseOK = await contractInstance.purchaseLicense({ from: person1, value: 2 });
        //    //license = await contractInstance.printSoftwareKey({ from: person2 });
        //    console.log(purchaseOK);
        //    assert.isTrue(purchaseOK, "A função deveria retornar -true-");
        //});

        it('Deve acessar a variável pública', async () => {

            //convertendo o valor em gwei para big number
            const valorString = '200000000000000000';
            const bigNumberObj = new BigNumber(valorString);
            let purchaseOK;

            //Implantando o contrato com os argumentos desejados
            const meuContratoInstance = await SoftwareLicense.new(bigNumberObj, "LICENSE", {from: owner});
        
            const licensePrice = await meuContratoInstance.licensePrice();
            purchaseOK = await meuContratoInstance.purchaseLicense({ from: person4, value: bigNumberObj });
            assert.isTrue(purchaseOK.receipt.status, "A função deveria retornar \"true-\"");
            console.log(licensePrice);
            console.log("=================================");
            console.log(bigNumberObj);
            //assert.equal(licensePrice, bigNumberObj, "A variável pública não tem o valor esperado");

          });

    });

});
