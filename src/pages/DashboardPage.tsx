import CreatePropertyForm from "../components/PropertyForm";
import { useAuth } from "../context/AuthContext";
import PropertyList from "../context/PropetyList";

const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <div>
      <div>Hello, {user?.name}</div>
      <CreatePropertyForm />
      <PropertyList />
    </div>
  );
};

export default DashboardPage;
