import { ethers } from "ethers";
import React from "react";
import { useEffect } from "react";
import { useNoticesQuery } from "./generated/graphql";
import ProgressBar from "./ProgressBar";

type Notice = {
  id: string;
  index: number;
  input: any; //{index: number; epoch: {index: number; }
  payload: string;
};

const NoticeTable: React.FC<{ notices: Notice[] }> = ({ notices }) => (
  <div>
    <ProgressBar value={notices[notices.length - 1]?.payload} />
    <table className="w-full table-auto mt-4">
      <thead>
        <tr>
          {/* <th className="px-4 py-2">Input Index</th>
        <th className="px-4 py-2">Notice Index</th> */}
          {/* <th className="px-4 py-2">Input Payload</th> */}
          {/* <th className="px-4 py-2">Payload</th> */}
        </tr>
      </thead>
      <tbody>
        {notices.length === 0 && (
          <tr>
            <td colSpan={3} className="px-4 py-2">
              No result yet
            </td>
          </tr>
        )}
        {notices.length > 0 && (
          <tr
            key={`${notices[notices.length - 1].input.index}-${
              notices[notices.length - 1].index
            }`}
          >
            <td className="px-4 py-2">
              {/* {notices[notices.length - 1].input.index + 1} */}
              Value
            </td>
            <td className="px-4 py-2">{notices[notices.length - 1].payload}</td>
            <td className="px-4 py-2">
              {parseInt(notices[notices.length - 1].payload) >= 0 &&
              parseInt(notices[notices.length - 1].payload) <= 3
                ? "POOR"
                : parseInt(notices[notices.length - 1].payload) > 3 &&
                  parseInt(notices[notices.length - 1].payload) <= 6
                ? "AVERAGE"
                : "GOOD"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export const Notices: React.FC = () => {
  const [result, reexecuteQuery] = useNoticesQuery();

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Oh no... {error.message}</p>;

  if (!data || !data.notices) return <p>No notices</p>;

  const notices: Notice[] = data.notices.edges
    .map((node: any) => {
      const n = node.node;
      let inputPayload = n?.input.payload;
      if (inputPayload) {
        try {
          inputPayload = ethers.utils.toUtf8String(inputPayload);
        } catch (e) {
          inputPayload = inputPayload + " (hex)";
        }
      } else {
        inputPayload = "(empty)";
      }
      let payload = n?.payload;
      if (payload) {
        try {
          payload = ethers.utils.toUtf8String(payload);
        } catch (e) {
          payload = payload + " (hex)";
        }
      } else {
        payload = "(empty)";
      }
      return {
        id: `${n?.id}`,
        index: parseInt(n?.index),
        payload: `${payload}`,
        input: n ? { index: n.input.index, payload: inputPayload } : {},
      };
    })
    .sort((b: any, a: any) => {
      if (a.input.index === b.input.index) {
        return b.index - a.index;
      } else {
        return b.input.index - a.input.index;
      }
    });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => reexecuteQuery({ requestPolicy: "network-only" })}
      >
        Reload
      </button> */}
      <NoticeTable notices={notices} />
    </div>
  );
};
