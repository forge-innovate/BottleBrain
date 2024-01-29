
import React, { FC, useState } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import Navbar from "./NavBar/NavBar";
import Container from "./Container";
import { GraphQLProvider } from "./GraphQL";
import { Input } from "./Input";
import { Inspect } from "./Inspect";
import { Vouchers } from "./Vouchers";
import { Reports } from "./Reports";
import { Notices } from "./Notices";
import configFile from "./config.json";
import { useWallets } from "@web3-onboard/react";


const config: any = configFile;

const injected: any = injectedModule();
init({
  wallets: [injected],
  chains: Object.entries(config).map(([k, v]: [string, any], i) => ({ id: k, token: v.token, label: v.label, rpcUrl: v.rpcUrl })),
  appMetadata: {
    name: "Cartesi Rollups Test DApp",
    icon: "<svg><svg/>",
    description: "Demo app for Cartesi Rollups",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});


const App: FC = () => {
  const [dappAddress, setDappAddress] = useState<string>("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

 

  return (
    <div className="">
      <Navbar />
      <Container>
        <GraphQLProvider>
         

         
          <Input dappAddress={dappAddress}  />
          <h2>Reports</h2>
          <Reports />
          <h2>Notices</h2>
          <Notices />
          <h2>Vouchers</h2>
          <Vouchers dappAddress={dappAddress} />
        </GraphQLProvider>
      </Container>
    </div>
  );
};

export default App;
