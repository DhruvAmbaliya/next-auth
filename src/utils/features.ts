
export const getAllUser = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if(!res.ok) return new Error("somthing went wrong ")
  return await res.json();
}