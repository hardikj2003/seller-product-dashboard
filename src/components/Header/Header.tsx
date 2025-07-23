import styles from "../Header/Header.module.css";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;