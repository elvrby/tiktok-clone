import Image from "next/image";
import Header from "@/components/header"
import Index from "@/components/index"
import FooterMobile from "@/components/Mobile/footer";

const Page: React.FC = () => {
  return (
    <main className="relative min-h-screen">
      <Header></Header>
      <Index></Index>

        <FooterMobile></FooterMobile>
    </main>
  );
}
export default Page;