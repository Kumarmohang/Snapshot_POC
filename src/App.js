import "./App.css";
import { Web3Provider, InfuraProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import snapshot from "@snapshot-labs/snapshot.js";
import { ethers } from "ethers";

function App() {
  //const hub = "https://hub.snapshot.org"; // or https://testnet.snapshot.org for testnet

  const hub = "https://testnet.snapshot.org";
  const client = new snapshot.Client712(hub);
  const URL = `https://goerli.infura.io/v3/84919eaaed5a4d69a25598d76303923c`;
  const URL2 = "wss://goerli.infura.io/ws/v3/84919eaaed5a4d69a25598d76303923c";

  const provider = new InfuraProvider(
    "goerli",
    "84919eaaed5a4d69a25598d76303923c"
  ); //JsonRpcProvider(URL);
  // const provider = new ethers.providers.JsonRpcProvider(URL);

  const signer = new Wallet(
    "0x906fe371224a92f05fb0fe13f870c1d3afe68afb87229af1476ae16803c346b4",
    provider
  );

  // const new_signer = new Wallet(
  //   "0x621937a0781249e7500508995a1cf810823b1c31782fdc0319dc43209efd81be"
  // );

  // //const provider = new ethers.providers.WebSocketProvider(URL);
  // const signer = new ethers.Wallet(
  //   "0x621937a0781249e7500508995a1cf810823b1c31782fdc0319dc43209efd81be",
  //   provider
  // );
  // console.log({ signer });
  console.log({ signer });
  const account2 = signer.address;
  console.log(account2, "12345");
  console.log(provider);

  const Proposal = async () => {
    // const web3 = new Web3Provider(window.ethereum);
    // const [account] = await web3.listAccounts();
    const network = "5";
    const provider = snapshot.utils.getProvider(network);
    console.log("provider inside the function", provider);
    //console.log(await provider.listAccounts());
    const blockNumber = await provider.getBlockNumber();

    console.log({ blockNumber });
    // console.log("something is not working");
    // console.log(web3);
    // console.log(account);
    const receipt = await client.proposal(signer, account2, {
      space: "yam.eth",
      type: "single-choice", // define the voting system
      title: "health care",
      body: "This is the content of the proposal",
      choices: ["Alice", "Bob", "Carol"],
      start: 1682059583,
      end: 1682664383,
      snapshot: blockNumber,
      network: "5",
      plugins: JSON.stringify({}),
      app: "my-app", // provide the name of your project which is using this snapshot.js integration
    });

    console.log({ receipt });
  };

  const Space = async () => {
    const web3 = new Web3Provider(window.ethereum);
    const [account] = await web3.listAccounts();
    console.log("accout address ", account);
    const receipt = await client.space(web3, account, {
      space: "mohan.eth",
      settings: {
        name: "mohan.eth",
        network: "5",
        symbol: "XYZ",
        private: false,
        members: [],
        admins: ["0x0Bf3d06DE2b696b97610E4B8bA67A928efBeDD17"],
        categories: ["social", "media"],
        plugins: {
          hal: {},
        },
        children: [],
        voting: {
          hideAbstain: false,
        },
        strategies: [
          {
            name: "erc20-balance-of",
            network: "5",
            params: {
              address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
              symbol: "DAI",
              decimals: 18,
            },
          },
        ], // provide up to 8 strategies with their configuration
        validation: {
          name: "basic",
          params: {},
        },
        voteValidation: {
          name: "any",
          params: {},
        },
        filters: {
          minScore: 0,
          onlyMembers: false,
        },
        treasuries: [], // provide the organization's treasury account(s)
      },
    });
    console.log({ receipt });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="btn" onClick={Space}>
          {" "}
          <h1>Create Space</h1>
        </button>
        <button className="btn" onClick={Proposal}>
          {" "}
          <h1>Create Proposal</h1>
        </button>
      </header>
    </div>
  );
}

export default App;
