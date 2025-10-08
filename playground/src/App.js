
// rm -rf build

// npm cache clean --force

// npm run build

// firebase deploy
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./pages/components/Sidebar";
import TrialDetailsPage from "./pages/TrialDetails";
import EmployeesPage from "./pages/Employees";
import SubscribersPage from "./pages/Subscribers";
import AdminCalendar from "./pages/AdminCalendar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" font-poppins flex-1 bg-background p-6">
        <Routes> 
          <Route path="/" element={<SubscribersPage />} />
<Route path="/admin/subscribers" element={<SubscribersPage />} />
          <Route path="/admin/employees" element={<EmployeesPage />} />
          <Route path="/admin/trials" element={<TrialDetailsPage />} />
          <Route path="/admin/calendar" element={<AdminCalendar />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;


// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";

// function App() {
//   return (
//     // <div className="font-poppins bg-background min-h-screen">
   
      
//       {/* <Routes>
//   <Route path="/" element={<HomePage />} />
//       </Routes> */}
//     // </div>
    
//   );
// }

// export default App;
