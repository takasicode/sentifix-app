import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Dashboard">
      <Header>
        <Aside></Aside>
      </Header>
    </Layout>
  );
}
