import React, { useState, ChangeEvent, FormEvent } from "react";
import { ethers } from "ethers";
import { useRollups } from "./useRollups";
import { useWallets } from "@web3-onboard/react";

interface IInputProps {
  dappAddress: string;
}

interface InputValues {
    [key: string]: string;
  }
  
  interface Errors {
    [key: string]: string;
  }
const parameters: string[] = [
    "fixed acidity",
    "volatile acidity",
    "citric acid",
    "residual sugar",
    "chlorides",
    "free sulfur dioxide",
    "total sulfur dioxide",
    "density",
    "pH",
    "sulphates",
    "alcohol"
  ];
export const Input: React.FC<IInputProps> = (props) => {
  const rollups = useRollups(props.dappAddress);
  const [connectedWallet] = useWallets();
  const [input, setInput] = useState<string>("");
  const [hexInput, setHexInput] = useState<boolean>(false);

  const [inputValues, setInputValues] = useState<InputValues>({});
  const [errors, setErrors] = useState<Errors>({});
  const isDecimal =(value: string): boolean => /^-?\d+(\.\d+)?$/.test(value);



  const handleInputChange = (parameter: string, value: string) => {
    setInputValues((prevValues) => ({ ...prevValues, [parameter]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [parameter]: !isDecimal(value) ? 'Please enter a valid  parameter' : '' }));
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(inputValues).some((value) => value.trim() === '')) {
        console.log('Please fill in all input fields.');
        return;
      }
  
    const numericValues: Record<string, number> = {};
    for (const parameter of parameters) {
        const inputValue = inputValues[parameter];
        numericValues[parameter] = isDecimal(inputValue) ? parseFloat(inputValue) : 0;
      }
      console.log('Numeric values:', numericValues);
    const serializedValues = JSON.stringify(numericValues);
    // Call addInput with the serialized values
    addInput(serializedValues);
 };

  const isLivePreviewEmpty = () => Object.values(inputValues).every(value => value === '');


  const sendAddress = async (str: string) => {
    if (rollups) {
      try {
        await rollups.relayContract.relayDAppAddress(props.dappAddress);
      } catch (e) {
        console.log(`${e}`);
      }
    }
  };

  const addInput = async (str: string) => {
    if (rollups) {
      try {
        let payload = ethers.utils.toUtf8Bytes(str);
        if (hexInput) {
          payload = ethers.utils.arrayify(str);
        }
        await rollups.inputContract.addInput(props.dappAddress, payload);
      } catch (e) {
        console.log(`${e}`);
      }
    }
  };

  return (
    <div>
      <div>

      <div className="flex justify-center items-center h-screen">
      <div className="max-w-3xl flex w-full space-x-8">
        <div className="w-full p-4">
          <h1 className="flex text-2xl font-bold mb-4 justify-center">
            WINE QUALITY
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-wrap">
            {parameters.map((parameter, index) => (
              <div key={parameter} className={`w-full md:w-1/2 mb-4 md:pr-2 ${index % 2 !== 0 ? 'md:pl-2' : ''}`}>
                <label className="block mb-2 uppercase font-bold text-blue-600">{parameter}:</label>
                <input
                  type="number"
                  className={`w-full p-2 border ${errors[parameter] ? 'border-red-500' : 'border-gray-300'} mb-2`}
                  placeholder={`Enter ${parameter.toLowerCase()}...`}
                  value={inputValues[parameter] || ''}
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(parameter, e.target.value)}
                />
                {errors[parameter] && <p className="text-red-500 text-sm">{errors[parameter]}</p>}
              </div>
            ))}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
              disabled={Object.values(errors).some((error) => error !== '')}
            >
              Submit
            </button>
          </form>
        </div>

        <div className={`w-full p-4 ${isLivePreviewEmpty() ? 'hidden' : 'md:w-1/2'}`}>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-20">Live Preview:</h2>
            <div className="p-4 border border-red-200 rounded-md shadow-blue-400 
            hover:shadow-blue-500 shadow-md cursor-pointer
             bg-gradient-to-br from-purple-500 to-indigo-700 text-white">
              {Object.entries(inputValues).map(([parameter, value]) => (
                <div key={parameter} className="flex  mb-2 justify-between">
                  <strong className='uppercase'> {parameter}:</strong>  {value}
                </div>
              ))}
            </div>
          </div>
        </div>  
      </div>
    </div>
      </div>
    </div>
  );
};
