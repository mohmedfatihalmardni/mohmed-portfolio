import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import TaskMaster from "./pages/TaskMaster";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Eventify from "./pages/Eventify";
import SkyCast from "./pages/SkyCast";
import CloudNotes from "./pages/CloudNotes";
import ExpenseBuddy from "./pages/ExpenseBuddy";
import RecipeFinder from "./pages/RecipeFinder";
import HabitTracker from "./pages/HabitTracker";
import AuthTasker from "./pages/AuthTasker";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
<Route
  path="/projects/eventify/"
  element={<Eventify />}
/><Route
  path="/projects/taskmaster-pro"
  element={<TaskMaster />}
/>
          <Route path="/projects/skycast" element={<SkyCast />} />

          <Route path="/projects/cloudnotes" element={<CloudNotes />} />

          <Route path="/projects/expensebuddy" element={<ExpenseBuddy />} />

          <Route path="/projects/recipefinder" element={<RecipeFinder />} />

          <Route path="/projects/habittracker" element={<HabitTracker />} />

          <Route path="/projects/authtasker" element={<AuthTasker />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;