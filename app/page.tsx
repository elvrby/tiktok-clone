import Image from "next/image";
import Header from "@/components/header"
import Index from "@/components/index"

const Page: React.FC = () => {
  return (
    <main>
      <Header></Header>
      <Index></Index>
    </main>
  );
}
export default Page;