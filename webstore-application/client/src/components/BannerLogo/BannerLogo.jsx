import { Link } from "react-router-dom";

import styles from './BannerLogo.module.css';

export default function BannerLogo () {
    return (
        <div className={styles.bannerLogo}>
            <Link to="/">
                <img src="\img\Header.jpg" alt="Solar System Geek Banner Logo" title='Take Me Home'/>
            </Link>
        </div>
    );
}