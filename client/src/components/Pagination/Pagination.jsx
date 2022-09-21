import styles from './Pagination.module.css'

export default function Pagination({countriesPerPage, allCountries, pagination, currentPage}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i)
    }
    return(
        <nav >
            <ul className={styles.crumbs}>
                {
                pageNumbers && pageNumbers.map(number => (
                <li className={styles.number} key={number}>
                    <button className={currentPage === number ? styles.crumb__active : styles.crumb} onClick={()=> pagination(number)}>{number}</button>
                </li>
                ))
                }
            </ul>
        </nav>
    )
};