import css from './Header.module.css';

const Header = () => {

  return (
    <div id={css.container}>
      <h1 id={css.title}>Folder Maker</h1>
      <h2 id={css.subtitle}>- QMHS Workflow Automation -</h2>
    </div>
  )
}

export default Header;