// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.
import { FC } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import configFile from "./config.json";

const config: any = configFile;

export const Network: any = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  return (
    <div className=" flex items-center space-x-4">
      {!wallet && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => connect()}
        >
          {connecting ? "Connecting" : "Connect"}
        </button>
      )}
      {wallet && (
        <div className="flex items-center space-x-2">
          {/* <label className="flex text-lg font-semibold text-gray-800">Chain</label> */}
          {settingChain ? (
            <span className="text-gray-600">Switching chain...</span>
          ) : (
            <div className="flex items-center space-x-2">
              <select
                className="border-collapse rounded-xl appearance-none p-3 max-w-fit text-white bg-blue-700 outline-none
                                text-center font-medium "
                onChange={({ target: { value } }) => {
                  if (config[value] !== undefined) {
                    setChain({ chainId: value });
                  } else {
                    alert("No deployment on this chain");
                  }
                }}
                value={connectedChain?.id}
              >
                {chains.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                className="bg-blue-600 text-white font-bold px-4 py-2 rounded-full 
                                hover:bg-blue-800 text-center shadow-md  hover:shadow-stone-200"
                onClick={() => disconnect(wallet)}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
