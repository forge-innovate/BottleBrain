import { ethers } from "ethers";
import React from "react";
import { useReportsQuery } from "./generated/graphql";

type Report = {
  id: string;
  index: number;
  input: any; //{index: number; epoch: {index: number; }
  payload: string;
};

export const Reports: React.FC = () => {
  const [result, reexecuteQuery] = useReportsQuery();
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Oh no... {error.message}</p>;

  if (!data || !data.reports) return <p>No reports</p>;

  const reports: Report[] = data.reports.edges
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
    <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => reexecuteQuery({ requestPolicy: "network-only" })}
      >
        Reload
      </button>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Input Index</th>
              <th className="px-4 py-2">Notice Index</th>
              <th className="px-4 py-2">Payload</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-2">
                  No reports
                </td>
              </tr>
            )}
            {reports.map((n: any) => (
              <tr key={`${n.input.index}-${n.index}`}>
                <td className="px-4 py-2">{n.input.index}</td>
                <td className="px-4 py-2">{n.index}</td>
                <td className="px-4 py-2">{n.payload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
