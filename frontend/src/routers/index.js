import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import StudentList from "../pages/Student";
import StudentCreate from "../pages/StudentCreate";
import StudentEdit from "../pages/StudentEdit";

function MyRouter() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<StudentList />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/create" element={<StudentCreate />} />
            <Route path="/student/:id/edit" element={<StudentEdit />} />
        </Routes>
    )
}

export default MyRouter;