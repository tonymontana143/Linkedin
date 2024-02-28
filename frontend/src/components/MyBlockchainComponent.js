import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import MyContractABI from './contracts/MyContractABI.json';

const MyBlockchainComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Инициализация web3 и контракта
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable(); // Запрашиваем доступ к аккаунту
          const accounts = await web3Instance.eth.getAccounts();
          const myContract = new web3Instance.eth.Contract(MyContractABI, 'YOUR_CONTRACT_ADDRESS');
          setWeb3(web3Instance);
          setContract(myContract);
          setAccounts(accounts);
          setLoading(false);
        } catch (error) {
          console.error("Error initializing web3:", error);
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const someContractFunction = async () => {
    if (contract) {
      // Пример чтения данных из контракта
      const result = await contract.methods.yourReadMethod().call();
      console.log(result);
      
      // Пример записи данных в контракт
      // Помните, что это изменит состояние блокчейна и потребует транзакцию
      // await contract.methods.yourWriteMethod(parameters).send({ from: accounts[0] });
    }
  };

  if (loading) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div>
      <h2>My Blockchain Component</h2>
      <button onClick={someContractFunction}>Interact with Contract</button>
    </div>
  );
};

export default MyBlockchainComponent;
