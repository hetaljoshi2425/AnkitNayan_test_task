import styles from "./Home.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";


const Home = () => {
    return (
        <div className={styles.app}>
            <div className={styles.sidebarBox}>
                <Sidebar />
            </div>
            <div className={styles.rightBox}>
                <Outlet />
            </div>
        </div>
    );
}

export default Home;