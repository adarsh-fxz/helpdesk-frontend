import MyProfile from '../components/MyProfile';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <MyProfile />
      </div>
    </div>
  );
};

export default Dashboard;   