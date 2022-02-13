import { Routes, Route } from "react-router-dom";
import './App.less';
import Admin from "./pages/admin/admin";
import Frame from './components/Frame';
import List from './pages/admin/activities/List/List';
import Edit from './pages/admin/activities/Edit/Edit';
import Message from './pages/admin/Message';



export default function App() {
  return (
    <div style={{ minWidth: "1000px" }}>
      <Frame>
        <Routes>
          <Route path="/message" element={<Message />} />
          <Route path="/activities" element={<List />} />
          <Route path="/activities/edit/*" element={<Edit />} />
          <Route path="/" element={<Admin />} />
        </Routes>
      </Frame>
    </div>
  );
}