import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";

export const metadata = {
  title: "Track-Daily - Dashboard",
};

const DashboardPage = () => {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
};
export default DashboardPage;
