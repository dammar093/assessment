import { type ReactNode } from "react";

export const AuthCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-100 max-w-1/2 p-4  mx-auto shadow rounded-md">
      <h2 className="text-center">Logo</h2>
      <div>{children}</div>
    </div>
  );
};
