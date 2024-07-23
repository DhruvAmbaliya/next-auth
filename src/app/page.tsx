import React from "react";
import { getAllUser } from "@/utils/features";

const Page = async () => {
  const users = await getAllUser();
  return (
    <div>
      {users.map((user:any) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default Page;
