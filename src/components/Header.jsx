import css from './Header.module.css';
import qmhs_logo from '../resources/qmhs_logo.png';

const Header = () => {

  return (
    <div id={css.container}>
      <img src={qmhs_logo} />
      <div id={css.titleContainer}>
        <h1 id={css.title}>Sale Entry</h1>
        <h2 id={css.subtitle}>Workflows</h2>
      </div>
    </div>
  )
}

export default Header;