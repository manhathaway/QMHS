import css from './Header.module.css';

const Header = () => {

  return (
    <div id={css.container}>
      <h1 id={css.title}>Sale Entry</h1>
      <h2 id={css.subtitle}>- QMHS Workflows -</h2>
    </div>
  )
}

export default Header;