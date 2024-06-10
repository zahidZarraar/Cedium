import { useSession } from "next-auth/react";
import Nav from "./components/Nav";

export default function Home() {

  // const { data: session } = useSession();

  // if (session) {
  //   console.log('logged in !');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

      <h1 className='text-3xl text-black text-center '>Cedium</h1>
    </main>
  );
}
